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
