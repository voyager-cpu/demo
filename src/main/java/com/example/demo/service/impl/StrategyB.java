package com.example.demo.service.impl;

import com.example.demo.service.Strategy;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.example.demo.Enum.ReplaceEnum;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 策略方法B
 */
@Service(value = "strategyB")
public class StrategyB implements Strategy {

    //使用正则表达式匹配字符串中3个连续重复的字符，区分大小写，查找到重复字符，则去根据替换规则替换重复字符串
    @Override
    public void method(String str) {
        String replacement = "";
        Pattern pattern = Pattern.compile("([a-zA-Z])\\1{2}");
        Matcher matcher = pattern.matcher(str);
        while(matcher.find()){
            String found = matcher.group(0);
            //获取替换类型中的value
            Optional<ReplaceEnum> replaceEnum = ReplaceEnum.getReplaceCodeSafe(found);
            if(replaceEnum.isPresent()){
                replacement = replaceEnum.get().getReplaceValue();
            }else{
                replacement = "";
            }
            str = matcher.replaceFirst(replacement);
            matcher.reset(str);
            //当最后一处重复字符替换后，不输出替换规则，只输出结果
            if(StringUtils.hasText(replacement)){
                System.out.println("->  "+str+", "+found +"  is replaced by  "+replacement);
            }else{
                System.out.println("->  "+str);
            }
        }
    }

    static String computeReplacement(String in){
        switch (in){
            case "ccc" : return "b";
            case "bbb" : return "a";
            default: return "";
        }
    }
}
