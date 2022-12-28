package com.Gosk.GoskProject20221221.controller.Index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexPageController {

    @GetMapping("/index")
    public String index() {
        return "index";
    }
}
