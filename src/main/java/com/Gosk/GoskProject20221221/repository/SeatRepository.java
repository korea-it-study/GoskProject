package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface SeatRepository {
    public List<ReservedSeat> reservedSelect();
    public List<String> useReserved();
    public List<String> usableReserved();
    public List<Seat> seatSelect();
    public List<String> useSeat();
    public List<String> usableSeat();


    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);

    // 사용여부 업데이트
    public int payLocker(Locker locker);



    public SeatInfo getBasicSeatDetail(String seatId);
    public SpecialSeatInfo getSpecialSeatDetail(String seatId);



    public int timeoutLocker(Date now);
    public int timeoutCommutation(Date now);

    public int timeoutOnedayAndTime(Date now);
    public int timeoutReserve(Date now);
    public int closingOneday();


    // seatId로 userId 들고오기
    public List<Integer> getReservedUser(List<String> arr);
    public List<Integer> getSeatUser(List<String> arr);
    public List<Integer> getLockerUser(List<String> arr);




    public int enter(InOutReqDto reqDto);
    public int forcedExit(List<Integer> arr);


}
