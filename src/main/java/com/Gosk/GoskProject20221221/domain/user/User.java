package com.Gosk.GoskProject20221221.domain.user;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class User {
    private int user_id;
    private int role_id;
    private Role role;
    private String seat_num;
    private String reserved_num;
    private String locker_num;
    private String user_phone;
    private String user_pw;
    private LocalDateTime user_time;
    private LocalDateTime user_date;
    private LocalDateTime user_locker_date;
    private LocalDateTime user_create_date;
    private LocalDateTime user_update_date;
}
