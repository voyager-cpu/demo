package com.example.demo.service.impl;

import com.example.demo.service.Strategy;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


/**
 * 策略方法A
 */
@Service(value = "strategyA")
public class StrategyA implements Strategy {

    //使用正则表达式匹配字符串中3个连续重复的字符，区分大小写，查找到重复字符，则去除重复字符
    @Override
    public void method(String str) {
           Pattern pattern = Pattern.compile("([a-zA-Z])\\1{2}");
           Matcher matcher = pattern.matcher(str);
           while(matcher.find()){
               str = matcher.replaceFirst("");
               //重新替换原字符串
               matcher.reset(str);
               System.out.println("->  "+str);
           }
    }
}
