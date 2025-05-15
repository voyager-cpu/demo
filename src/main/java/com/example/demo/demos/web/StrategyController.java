package com.example.demo.demos.web;

import com.example.demo.utill.StrategyContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StrategyController {
    @Autowired
    private StrategyContext context;



    /**
     * RequestParam  code: 策略类型 1 选用第一种策略去除字符串中3个重复的字符  2 ：策略类型二 使用指定的字符替换3个重复的字符
     *               str:  待处理的字符串
     */
    @RequestMapping("/method")
    public void method(@RequestParam Integer code,@RequestParam  String str) {
         context.getInstance(code).method(str);
    }
}