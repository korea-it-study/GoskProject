package com.Gosk.GoskProject20221221.controller.InOut;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class InOutPageController {

    @GetMapping("/inout")
    public String inOut(){
        return "inout";
    }

}
