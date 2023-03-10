package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.*;

import java.util.List;

import java.util.Date;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);

    public List<SeatRespDto> allSeat() throws Exception;
    public List<String> useSeat();
    public List<String> usableSeat();

    public List<ReservedSeatRespDto> allReservedSeat() throws Exception;
    public List<String> useReservedSeat();
    public List<String> usableReserved();


    public SeatInfoRespDto getBasicSeatDetail(String seatId);
    public SeatInfoRespDto getSpecialSeatDetail(String seatId);
    public boolean payLocker(LockerReqDto lockerReqDto);

    public int scheduledUpdateLocker(Date now);
    public int scheduledUpdateCommutation(Date now);
    public int scheduledUpdateOnedayAndTime(Date now);

    public int closingTimeOneday();
    public int scheduleUpdateReserve(Date now);

    public boolean enter(InOutReqDto reqDto);
    public int forcedExit(List<String> arr);





//    public int insertSeat(List<String> arr);

}
