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

    public int updateLocker(Date now);
    public int updateCommutation(Date now);
    public int updateUserDate(Date now);
    public int updateOneday(Date now);

    public int closingDelete();

    public int deleteReserve(Date now);
    //seat에서 0된거 다 삭제
    public int delete0Seat();
    public int delete0Reserve();
    public int delete0Locker();
    //지정석을 user_id 0으로 바꾸고 영수증 사용종료
    public int forcedExitReserve(List<String> arr);

    //일반석 user_id 0으로 바꾸고 userNullset 하고 영수증 사용종료
    public int forcedExitSeat(List<String> arr);
    //사물함 user_id 0으로 바꾸고  영수증 사용종료
    public int forcedExitLocker(List<String> arr);



}
