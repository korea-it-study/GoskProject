package com.Gosk.GoskProject20221221.controller.Admin.api;

import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/admin")
@RestController
@RequiredArgsConstructor
public class UserListApi {

    private final UserService userService;

    @GetMapping("/userList")
    public ResponseEntity<?> allUserList() throws Exception {

        return ResponseEntity.ok().body(new CMRespDto<>(1, "userList Success load", userService.allUserList()));
    }
}
