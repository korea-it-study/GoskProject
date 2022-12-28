package com.Gosk.GoskProject20221221.controller.Account.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final UserService userService;

    @PostMapping("/join") // 회원가입
    public ResponseEntity<?> userJoin(@RequestBody UserReqDto userReqDto) throws Exception {

        userService.userJoin(userReqDto);
        log.info("[userApi] userInfoData 데이터 : {}", userReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully joined", null));
    }

}
