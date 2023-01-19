package com.Gosk.GoskProject20221221.dto.User;

import com.Gosk.GoskProject20221221.domain.user.UserSeat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Data
public class UserSeatRespDto {
    private int userId;
    private String userPhone;
    private String seatId;
    private String reservedSeatId;
}
