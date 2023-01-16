package com.Gosk.GoskProject20221221.domain.user;

import com.Gosk.GoskProject20221221.dto.User.UserRespDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class User {

    private int user_id;
    private int role_id;
    private Role role;
    private String user_phone;
    private String user_pw;
    private String user_time;
    private String user_date;
    private LocalDateTime user_create_date;
    private LocalDateTime user_update_date;

    public UserRespDto toAllUserList() {
        return UserRespDto.builder()
                .userId(user_id)
                .userPw(user_pw)
                .userPhone(user_phone)
                .build();
    }
}
