package com.Gosk.GoskProject20221221.controller.Account.api;


import com.Gosk.GoskProject20221221.dto.CMRespDto;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.service.UserService;
import com.Gosk.GoskProject20221221.service.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RequestMapping("/api/account")
@RestController
@RequiredArgsConstructor
public class AccountApi {

    private final UserService userService;

    @PostMapping("/join/checkDuplicate")
    public ResponseEntity<?> joinCheckDuplicate(@RequestBody UserReqDto userReqDto) throws Exception {
        log.info("[UserApi] userInfoData :::::::::::::::::::::::::::::::: {}", userReqDto);
        userService.checkDuplicationUserPhone(userReqDto.getUserPhone());

        return ResponseEntity.ok(new CMRespDto<>(1, "userPhone duplicate check success", null));
    }

    @PostMapping("/join") // 회원가입
    public ResponseEntity<?> userJoin(@RequestBody UserReqDto userReqDto, BindingResult bindingResult) throws Exception {

        userService.userJoin(userReqDto);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "Successfully joined", null));
    }

    @GetMapping("/principal/member") // 아이디 검증
    public ResponseEntity<?> getPrincipalMember(@AuthenticationPrincipal PrincipalDetails principalDetails) {
//        log.info("[userApi] getPrincipalMember 데이터 :::::::: {}", principalDetails);

        return ResponseEntity.ok().body(new CMRespDto<>(1, "login userInfo", principalDetails == null ? "" : principalDetails));
    }

    @PostMapping("/principal/password") // 비밀번호 검증
    public ResponseEntity<?> getPrincipalPassword(@AuthenticationPrincipal PrincipalDetails principalDetails, @RequestBody Map<String, Object> userPwMap) throws Exception {
//        log.info("1 [userApi] getPrincipalPassword 데이터 :::::::: {}", principalDetails);

        boolean pwchk = new BCryptPasswordEncoder().matches((String)userPwMap.get("pwchk"), principalDetails.getUser().getUser_pw());

//        log.info("2 [userApi] getPrincipalPassword 비번 :::::::: {}", pwchk);

        if(pwchk) {
            return ResponseEntity.ok().body(new CMRespDto<>(1, "password check", pwchk));
        }else {
            return ResponseEntity.badRequest().body(new CMRespDto<>(1, "password check error", pwchk));
        }
    }

}
