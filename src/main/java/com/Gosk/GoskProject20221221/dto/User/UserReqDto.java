package com.Gosk.GoskProject20221221.dto.User;

import com.Gosk.GoskProject20221221.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserReqDto {
    private int userId;
    private int roleId;
    private String userPhone;
    private String userPw;
    private String userTime;
    private String userDate;
    private LocalDateTime userCreateDate;
    private LocalDateTime userUpdateDate;

    // 회원가입 유저 정보 입력
    public User toUserEntity() {
        return User.builder()
                .user_id(userId)
                .user_phone(userPhone)
                .user_pw(new BCryptPasswordEncoder().encode(userPw))
                .user_create_date(userCreateDate)
                .user_update_date(userUpdateDate)
                .build();
    }

    //정액권 구매시 유저 남은시간 업데이트

    public User toUpdateTime() {

        return User.builder()
                .user_id(userId)
                .user_time(userTime)
                .user_date(userDate)
                .build();
    }
}
