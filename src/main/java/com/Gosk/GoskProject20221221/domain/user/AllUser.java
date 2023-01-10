package com.Gosk.GoskProject20221221.domain.user;

import com.Gosk.GoskProject20221221.dto.User.UserRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AllUser {
    private int user_id;
    private String user_phone;
    private String user_pw;
    private String seat_id;
    private String reserved_seat_id;

    public UserRespDto toAllUserList() {
        return UserRespDto.builder()
                .userId(user_id)
                .userPw(user_pw)
                .userPhone(user_phone)
                .seatId(seat_id)
                .reservedSeatId(reserved_seat_id)
                .build();
    }
}
