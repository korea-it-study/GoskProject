package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
import com.Gosk.GoskProject20221221.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.Date;
import java.util.List;

@Mapper
public interface SeatRepository {
    public List<ReservedSeat> reservedSelect();
    public List<Seat> seatSelect();
    public int paySeat(Seat seat);

    public SeatInfo getBasicSeatDetail(String seatId);
    public SpecialSeatInfo getSpecialSeatDetail(String seatId);
    public int payReserved (ReservedSeat reservedSeat);
    public int payLocker(Locker locker);

    public int deleteLocker(Date now);
    public int deleteCommutation(Date now);
    public int updateUserDate(Date now);
    public int deleteOneday(Date now);
    public int closingDelete();
    public int deleteReserve(Date now);
    public int forcedExitReserve(List<String> arr);
    public int forcesExitSeat(List<String> arr);
    public int forcedExitLocker(List<String> arr);

    //일반석 userNullset하고 영수증 바꾸기
    public String userNullSet(String seatId);

//    public int userReceiptSet()

}
