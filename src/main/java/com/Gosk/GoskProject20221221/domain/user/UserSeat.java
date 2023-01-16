package com.Gosk.GoskProject20221221.domain.user;

import com.Gosk.GoskProject20221221.dto.User.UserSeatRespDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class UserSeat {
    private int user_id;
    private String user_phone;
    private String seat_id;
    private String reserved_seat_id;

    public UserSeatRespDto toSeatInfo() {
        return UserSeatRespDto.builder()
                .userId(user_id)
                .userPhone(user_phone)
                .seatId(seat_id)
                .reservedSeatId(reserved_seat_id)
                .build();
    }
}
