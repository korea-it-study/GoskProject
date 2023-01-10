package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
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


}
