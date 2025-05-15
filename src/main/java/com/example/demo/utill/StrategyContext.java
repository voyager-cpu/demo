package com.example.demo.utill;

import com.example.demo.Enum.StrategyEnum;
import com.example.demo.service.Strategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;


//上下文切换类
@Component
public class StrategyContext {
    private final Map<String, Strategy> strategyMap = new ConcurrentHashMap<>();
    @Autowired
    private ApplicationContext applicationContext;

    @PostConstruct
    private void init() {
        strategyMap.putAll(applicationContext.getBeansOfType(Strategy.class));
    }

    //获取
    public Strategy getInstance(Integer code) {
        String beanName = StrategyEnum.getByCode(code).getName();
        return this.getInstanceByBeanName(beanName);
    }

    private Strategy getInstanceByBeanName(String beanName) {
        if (!StringUtils.isEmpty(beanName)) {
            return strategyMap.get(beanName);
        }
        return null;
    }

}