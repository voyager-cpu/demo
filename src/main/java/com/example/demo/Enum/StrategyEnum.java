package com.example.demo.Enum;

import java.util.Arrays;
import java.util.Optional;

public enum StrategyEnum {
    /**
     * 策略枚举类
     */
    STRATEGY_A(1, "strategyA"),
    STRATEGY_B(2, "strategyB");

    private Integer code;

    private String name;


    StrategyEnum(Integer code, String name) {
        this.code = code;
        this.name = name;
    }

    //返回策略名称  当枚举找不到时会出现空指针异常 不推荐使用
    public static StrategyEnum getByCode(Integer code) {
        StrategyEnum[] values = StrategyEnum.values();
        for (StrategyEnum strategyEnum : values) {
            if (strategyEnum.getCode().equals(code)) {
                return strategyEnum;
            }
        }
        return null;
    }


    //使用stream流处理返回策略类型，不会出现空指针异常
    public  static Optional<StrategyEnum> getByCodeSafe(Integer code){
       return Arrays.stream(values()).filter(strategyEnum->strategyEnum.code == code).findFirst();
    }

    /**
     * Getter method for property <tt>code</tt>.
     *
     * @return property value of code
     */
    public Integer getCode() {
        return code;
    }

    /**
     * Getter method for property <tt>name</tt>.
     *
     * @return property value of name
     */
    public String getName() {
        return name;
    }



}