package com.example.demo.Enum;

import java.util.Arrays;
import java.util.Optional;

public enum ReplaceEnum {
    /**
     * 字符替换枚举类
     */
    REPLACE_CODE("ccc","b"),

    REPLACE_CODEB("bbb","a");

    private String replaceCode;


    private String replaceValue;


    ReplaceEnum(String replaceCode,String replaceValue) {
        this.replaceCode = replaceCode;
        this.replaceValue = replaceValue;
    }

    //返回重复字符替换值  当枚举找不到时会出现空指针异常 不推荐使用
    public static ReplaceEnum getReplaceCode(String replaceCode) {
        ReplaceEnum[] values = ReplaceEnum.values();
        for (ReplaceEnum replaceEnum : values) {
            if (replaceEnum.getReplaceCode().equals(replaceCode)) {
                return replaceEnum;
            }
        }
        return null;
    }

    //使用stream流处理返回重复字符替换值，不会出现空指针异常
    public  static Optional<ReplaceEnum> getReplaceCodeSafe(String replaceCode){
        return Arrays.stream(values()).filter(replaceEnum->replaceEnum.replaceCode.equals(replaceCode)).findFirst();
    }

    public String getReplaceCode() {
        return replaceCode;
    }

    public String getReplaceValue() {
        return replaceValue;
    }
}