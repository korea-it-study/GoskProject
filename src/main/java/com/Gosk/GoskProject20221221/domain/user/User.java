package com.Gosk.GoskProject20221221.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

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
}
