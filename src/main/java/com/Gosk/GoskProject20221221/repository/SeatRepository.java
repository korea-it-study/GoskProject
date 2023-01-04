package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SeatRepository {
    public Seat seatSelect(String seatId);
    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);
}
