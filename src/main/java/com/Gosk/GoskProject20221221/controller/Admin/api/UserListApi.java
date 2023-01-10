package com.Gosk.GoskProject20221221.controller.Admin.api;

import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/seatInfo/{userId}")
    public ResponseEntity<?> seatInfo(@PathVariable int userId) throws Exception {
        return ResponseEntity.ok().body(new CMRespDto<>(1, "seatInfo load sucess", userService.userSeatInfo(userId)));
    }

    @PutMapping("/userModify/{userId}")
    public  ResponseEntity<?> userModify(@PathVariable int userId, UserReqDto userReqDto) throws Exception {
        return ResponseEntity.ok().body(new CMRespDto<>(1, "userInfo load success", userService.userModify(userReqDto)));
    }
}
