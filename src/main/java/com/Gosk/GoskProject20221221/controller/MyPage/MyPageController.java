package com.Gosk.GoskProject20221221.controller.MyPage;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MyPageController {

    @GetMapping("/mypage")
    public String myInfo() {
        return "mypage";
    }
}
