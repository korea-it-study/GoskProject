package com.Gosk.GoskProject20221221.controller.Time;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/time")
@Controller
public class TimePageController {

    @GetMapping("/oneday")
    public String oneday() {
        return "time_oneday";
    }
    @GetMapping("/commuter")
    public String commuter() {
        return "time_commuter";
    }
    @GetMapping("/reserved")
    public String reserved() {
        return "time_reserved";
    }
}
