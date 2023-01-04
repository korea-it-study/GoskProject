package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SeatRepository {
    public ReservedSeat reservedSelect(String reservedSeatId);
    public Seat seatSelect(String seatId);
    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);
}
