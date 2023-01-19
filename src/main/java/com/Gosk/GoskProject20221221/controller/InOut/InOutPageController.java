package com.Gosk.GoskProject20221221.controller.InOut;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller

public class InOutPageController {

    @GetMapping("/enter")
    public String in(Model model){
        return "in";
    }
    @GetMapping("/out")
    public String out() {return "out";}

}
