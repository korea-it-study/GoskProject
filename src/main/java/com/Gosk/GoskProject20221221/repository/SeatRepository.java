package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.seat.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import org.apache.ibatis.annotations.Mapper;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Mapper
public interface SeatRepository {
    public ReservedSeat reservedSelect(String reservedSeatId);
    public Seat seatSelect(String seatId);
    public int paySeat(Seat seat);
    public int payReserved (ReservedSeat reservedSeat);
    public int payLocker(Locker locker);
    public List<String> getLocker();
    public int deleteLocker(Date now);

    public String getUserLocker(int userId);

}
