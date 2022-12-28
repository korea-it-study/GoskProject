package com.Gosk.GoskProject20221221.controller.Account;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/account")
@Controller
public class AccountPageController {

    @GetMapping("/join")
    public String join() {
        return "account_join";
    }
    @GetMapping("/login")
    public String login() {
        return "account_login";
    }
    @GetMapping("/joinCheck")
    public String logout() {
        return "account_join_check";
    }
}
