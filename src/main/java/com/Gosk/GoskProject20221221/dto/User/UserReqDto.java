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
    private String seatNum;
    private String reservedNum;
    private String lockerNum;
    private String userPhone;
    private String userPw;
    private LocalDateTime userTime;
    private LocalDateTime userDate;
    private LocalDateTime userCreateDate;
    private LocalDateTime userUpdateDate;

    public User toUserEntity() {
        return User.builder()
                .user_id(userId)
                .user_phone(userPhone)
                .user_pw(new BCryptPasswordEncoder().encode(userPw))
                .user_create_date(userCreateDate)
                .user_update_date(userUpdateDate)
                .build();
    }
}
