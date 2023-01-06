package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.seat.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatRespDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;

import java.util.List;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);

    public List<String> useSeat() throws Exception;

    public List<String> useReservedSeat() throws Exception;
    public boolean payLocker(LockerReqDto lockerReqDto);
    public List<String> getLocker();
    public int deleteLocker(Date now);
    public String getUserLocker(int userId);

}
