package com.Gosk.GoskProject20221221.dto.User;

import jdk.jfr.Registered;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserRespDto {

    private int userId;
    private int roleId;
    private String userPhone;
    private String userPw;
    private String userTime;
    private String userDate;
    private LocalDateTime userCreateDate;
    private LocalDateTime userUpdateDate;
}
