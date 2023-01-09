package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;

import java.util.List;

import java.util.Date;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);

    public List<String> useSeat() throws Exception;

    public List<String> useReservedSeat() throws Exception;
    public boolean payLocker(LockerReqDto lockerReqDto);

    public int scheduledDeleteLocker(Date now);


}
