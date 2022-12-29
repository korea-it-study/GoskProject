package com.Gosk.GoskProject20221221.controller.Account;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Nullable;

@RequestMapping("/account")
@Controller
public class AccountPageController {

    @GetMapping("/join")
    public String join() {
        return "account/account_join";
    }
    @RequestMapping("/login")
    public String login(Model model, @RequestParam @Nullable String error) {

        if(error != null) {
            model.addAttribute("error", error.equals("auth") ? "아이디 또는 비밀번호가 잘못되었습니다." : "");
        }

        return "account/account_login";
    }

    @GetMapping("/joinCheck")
    public String logout() {
        return "account/account_join_check";
    }

}
