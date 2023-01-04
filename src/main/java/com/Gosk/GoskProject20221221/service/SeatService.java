package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatRespDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;

import java.util.List;

public interface SeatService {
    public boolean paySeat(SeatReqDto seatReqDto);
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto);

    public List<SeatRespDto> useSeat();

    public List<ReservedSeatRespDto> useReservedSeat();
}
