package com.Gosk.GoskProject20221221.controller.Admin;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/admin")
@Controller
public class AdminPageController {
    @GetMapping("/userlist")
    public String userlist() {
        return "admin/userlist";
    }
    @GetMapping("/seatlist")
    public String seatlist() {
        return "admin/seatlist";
    }
    @GetMapping("/productlist")
    public String productlist() {
        return "admin/productlist";
    }

    @GetMapping("/saleslist")
    public String statistics() {
        return "admin/saleslist";
    }
}
