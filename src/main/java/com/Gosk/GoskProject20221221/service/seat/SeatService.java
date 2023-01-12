package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.dto.seat.*;

import java.util.List;

import java.util.Date;
import java.util.Set;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);

    public List<SeatRespDto> useSeat() throws Exception;

    public List<ReservedSeatRespDto> useReservedSeat() throws Exception;

    public SeatInfoRespDto getBasicSeatDetail(String seatId);
    public SeatInfoRespDto getSpecialSeatDetail(String seatId);
    public boolean payLocker(LockerReqDto lockerReqDto);

    public int scheduledDeleteLocker(Date now);
    public int scheduledDeleteCommutation(Date now);
    public int scheduledDeleteOneday(Date now);
    public int closingTimeOneday();
    public int scheduledDeleteReserve(Date now);
    public int forcedExit(List<String> arr);

}
