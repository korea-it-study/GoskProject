package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeatRepository {
    public List<String> reservedSelect();
    public List<String> seatSelect();
    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);
}
