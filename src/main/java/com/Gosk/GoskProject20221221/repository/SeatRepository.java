package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SeatRepository {
    public List<ReservedSeat> reservedSelect();
    public List<Seat> seatSelect();
    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);
}
