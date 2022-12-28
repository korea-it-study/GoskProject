package com.Gosk.GoskProject20221221.controller.Seat;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SeatPageController {

    @GetMapping("/seat")
    public String check() {
        return "seat";
    }
}
