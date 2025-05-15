package com.example.demo;

import com.example.demo.utill.StrategyContext;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest()
class DemoApplicationTests {
    @Autowired
    private StrategyContext context;

    @Test
    public  void testServiceMethod() {
        /***
         *
         * #Stage 1 Test  use StrategyA
         * ****/
        //  Param: code:1     str-Testing strings
        //  use  2 repeated characters，The expectation is to operate normally and the output is equal to the input
        context.getInstance(1).method("aabccbbad");

        //  Param: code:1     str-Testing strings
        //  use  normal string, Expect normal operation, output results step by step to remove duplicates
        context.getInstance(1).method("aabcccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, with only the first three duplicate letters removed from the output
        context.getInstance(1).method("aabccccbbad");

        //  use  6 repeated characters,This is expected to work, output results step by step to remove duplicates
        context.getInstance(1).method("aabccccccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,Expected to work correctly, case sensitive, and without 3 consecutive repeating characters
        context.getInstance(1).method("aabCccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and just removed "ccc",and keep bBad
        context.getInstance(1).method("aabcccbBad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and characters will not be removed
        context.getInstance(1).method("aabcCccBbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(1).method("aab1ccccbbad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(1).method("aab1bccccB bad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep " "
        context.getInstance(1).method("aab1bc  cccB bad");

        //  Param: code:1     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep "***"
        context.getInstance(1).method("aab1bc***cccB bad");


        /***
         *
         * #Stage 2 Test,
         *
         ***/

        //  use  2 repeated characters，The expectation is to operate normally and the output is equal to the input
        context.getInstance(2).method("aabccbbad");

        //  Param: code:2     str-Testing strings
        //  use  normal string, Expect normal operation, output results step by step to remove duplicates
        context.getInstance(2).method("aabcccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, with only the first three duplicate letters removed from the output
        context.getInstance(2).method("aabccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  6 repeated characters,This is expected to work, output results step by step to remove duplicates
        context.getInstance(2).method("aabccccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,Expected to work correctly, case sensitive, and without 3 consecutive repeating characters
        context.getInstance(2).method("aabCccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and just removed "ccc",and keep bBad
        context.getInstance(2).method("aabcccbBad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, and characters will not be removed
        context.getInstance(2).method("aabcCccBbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(2).method("aab1ccccbbad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, removed "ccc"  ,keep the number characters
        context.getInstance(2).method("aab1bccccB bad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep " "
        context.getInstance(2).method("aab1bc  cccB bad");

        //  Param: code:2     str-Testing strings
        //  use  4 repeated characters,This is expected to work, Test special characters removed "ccc",keep "***"
        context.getInstance(2).method("aab1bc***cccB bad");
    }

}
