package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.seat.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;

import java.time.LocalDateTime;
import java.util.List;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);
    public boolean payLocker(LockerReqDto lockerReqDto);
    public List<String> getLocker();

}
