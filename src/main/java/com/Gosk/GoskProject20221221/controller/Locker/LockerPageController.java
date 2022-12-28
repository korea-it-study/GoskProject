package com.Gosk.GoskProject20221221.controller.Locker;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/locker")
@Controller
public class LockerPageController {

    @GetMapping("/check")
    public String check() {
        return "locker_check";
    }

    @GetMapping("/time")
    public String time() {
        return "locker_time";
    }
}
