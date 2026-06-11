fun ApiClient.fetchAllPages(pageSize: Int = 1000): Sequence<List<Any>> {
    // 先获取第一页（用来获取 total）
    val firstPage = retrySync { fetchPage(0, pageSize) }
    val total = firstPage.total
    val totalPages = ceil(total.toDouble() / pageSize).toInt()

    return sequence {
        // 产出第一页数据
        yield(firstPage.data)

        // 产出剩余页
        for (page in 1 until totalPages) {
            val response = retrySync { fetchPage(page, pageSize) }
            yield(response.data)
        }
    }
}

// 使用示例
val apiClient: ApiClient = ...

apiClient.fetchAllPages(1000)
    .forEach { pageData ->
        process(pageData)  // 处理每页数据
    }


class PageIterator(
    private val api: ApiClient,
    private val pageSize: Int = 1000
) : Iterator<List<Any>> {
    private var currentPage = 0
    private var total = -1
    private var fetchedCount = 0

    init {
        fetchFirstPageWithRetry()
    }

    // 首次调用（获取 total 及第一页数据）
    private fun fetchFirstPageWithRetry() {
        val firstPage = retryWithBackoff {
            api.fetchPage(0, pageSize)
        }
        total = firstPage.total
        fetchedCount = firstPage.data.size
        currentPage = 0
    }

    override fun hasNext(): Boolean = fetchedCount < total

    override fun next(): List<Any> {
        if (!hasNext()) throw NoSuchElementException()
        currentPage++
        // 后续每一页也带重试
        val response = retryWithBackoff {
            api.fetchPage(currentPage, pageSize)
        }
        fetchedCount += response.data.size
        return response.data
    }
}

fun <T> retryWithBackoff(
    maxRetries: Int = 3,
    initialDelayMs: Long = 500,
    maxDelayMs: Long = 5000,
    retryable: (Exception) -> Boolean = { true },  // 默认所有异常都重试
    block: () -> T
): T {
    var currentDelay = initialDelayMs
    repeat(maxRetries - 1) { attempt ->
        try {
            return block()
        } catch (e: Exception) {
            if (!retryable(e)) throw e  // 不可重试异常直接抛出
            // 可记录日志
            Thread.sleep(currentDelay)
            currentDelay = minOf(currentDelay * 2, maxDelayMs)
        }
    }
    return block()
}

val response = retryWithBackoff(
    retryable = { e -> 
        e is IOException || 
        (e is HttpException && e.code() in 500..599)
    }
) {
    api.fetchPage(page, pageSize)
}



fun main() {
    val api = object : ApiClient {
        override fun fetchPage(page: Int, size: Int): PageResponse {
            // 模拟可能失败的 API
            if (page == 2 && Random.nextBoolean()) throw IOException("Network error")
            return PageResponse(total = 5000, data = List(size) { "data_$page" })
        }
    }

    val iterator = PageIterator(api, pageSize = 1000)
    iterator.forEach { pageData ->
        println("处理一页，大小：${pageData.size}")
    }
}


fun <T> retryWithBackoff(
    maxRetries: Int = 3,
    initialDelayMs: Long = 500,
    maxDelayMs: Long = 5000,
    block: () -> T
): T {
    var currentDelay = initialDelayMs
    repeat(maxRetries - 1) { attempt ->
        try {
            return block()
        } catch (e: Exception) {
            if (!isRetryable(e)) {
                throw e  // 不可重试的异常直接抛出
            }
            
            // 可重试异常，记录日志并等待
            println("API call failed (attempt ${attempt + 1}/$maxRetries): ${e.message}")
            Thread.sleep(currentDelay)
            currentDelay = minOf(currentDelay * 2, maxDelayMs)
        }
    }
    // 最后一次尝试
    return block()
}

// 判断异常是否可重试
private fun isRetryable(e: Exception): Boolean {
    return when (e) {
        is HttpException -> {
            // 只重试 5xx 服务器错误和 429 限流
            e.code in 500..599 || e.code == 429
        }
        is IOException -> {
            // 网络层面的 IO 异常（超时、连接失败等）
            true
        }
        else -> {
            // 其他异常（如 JSON 解析错误）不重试
            false
        }
    }
}


fun main() {
    // 创建 OkHttp 客户端
    val apiClient = OkHttpApiClient("https://api.example.com/data")
    
    // 创建分页迭代器
    val iterator = PageIterator(
        api = apiClient,
        pageSize = 1000
    )
    
    // 遍历所有数据
    var pageNum = 0
    iterator.forEach { pageData ->
        println("处理第 ${pageNum++} 页，数据量: ${pageData.size}")
        // 处理每页数据...
    }
}


class OkHttpApiClient(
    private val baseUrl: String,
    private val headers: Map<String, String> = emptyMap(),
    private val connectTimeout: Long = 30,
    private val readTimeout: Long = 30,
    private val gson: Gson = Gson()
) : ApiClient {
    
    private val client: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .connectTimeout(connectTimeout, TimeUnit.SECONDS)
            .readTimeout(readTimeout, TimeUnit.SECONDS)
            .writeTimeout(readTimeout, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            .addInterceptor { chain ->
                val original = chain.request()
                val requestBuilder = original.newBuilder()
                
                // 添加自定义 headers
                headers.forEach { (key, value) ->
                    requestBuilder.addHeader(key, value)
                }
                
                chain.proceed(requestBuilder.build())
            }
            .build()
    }
    
    override fun fetchPage(page: Int, size: Int): PageResponse {
        val url = "$baseUrl?page=$page&size=$size"
        val request = Request.Builder()
            .url(url)
            .get()
            .build()
        
        return client.newCall(request).execute().use { response ->
            when {
                response.isSuccessful -> {
                    val body = response.body?.string()
                        ?: throw IOException("Empty response body")
                    gson.fromJson(body, PageResponse::class.java)
                }
                else -> {
                    throw HttpException(
                        code = response.code,
                        message = "Request failed: ${response.code} - ${response.message}"
                    )
                }
            }
        }
    }
}

