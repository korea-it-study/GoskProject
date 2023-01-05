package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatRespDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements SeatService {

    private final SeatRepository seatRepository;

    @Override
    public boolean paySeat(SeatReqDto seatReqDto) {

        Seat seatEntity = seatReqDto.toSeatEntity();

        int result = seatRepository.paySeat(seatEntity);

        return result != 0;
    }

    @Override
    public boolean payReservedSeat(ReservedSeatReqDto reservedSeatReqDto) {

        ReservedSeat reservedEntity = reservedSeatReqDto.toReservedEntity();

        int result = seatRepository.payReserved(reservedEntity);

        return result != 0;
    }

    @Override
    public List<String> useSeat() throws Exception {

        return seatRepository.seatSelect();
    }

    @Override
    public List<String> useReservedSeat() throws Exception {

        return seatRepository.reservedSelect();
    }


}
