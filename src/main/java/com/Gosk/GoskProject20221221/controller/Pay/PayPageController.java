package com.Gosk.GoskProject20221221.controller.Pay;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class PayPageController {

    @GetMapping("/pay")
    public String payment() {
        return "pay";
    }

}
