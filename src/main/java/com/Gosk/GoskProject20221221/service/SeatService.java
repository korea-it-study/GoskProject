package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);
}
