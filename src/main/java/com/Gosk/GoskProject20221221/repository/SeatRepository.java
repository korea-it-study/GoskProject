package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
import com.Gosk.GoskProject20221221.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import javax.swing.*;
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

    public SeatInfo getBasicSeatDetail(String seatId);
    public SpecialSeatInfo getSpecialSeatDetail(String seatId);
    public int payReserved (ReservedSeat reservedSeat);
    public int payLocker(Locker locker);

    public int timeoutLocker(Date now);
    public int timeoutCommutation(Date now);
    public int updateUserDate(Date now);
    public int timeoutOneday(Date now);
    public int closingOneday();
    public int timeoutReserve(Date now);

    public List<Integer> getReservedUser(List<String> arr);
    public List<Integer> getSeatUser(List<String> arr);
    public List<Integer> getLockerUser(List<String> arr);
//    public int[] seatGetUser(List<String> arr);


    public int forcedExit(List<Integer> arr);




    public int insertSeat(List<String> arr);
    public int insertSpecial(List<String> arr);

}
