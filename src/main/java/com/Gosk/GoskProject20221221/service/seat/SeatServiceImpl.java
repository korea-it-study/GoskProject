package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

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

     @Override
    public boolean payLocker(LockerReqDto lockerReqDto) {
        Locker locker = lockerReqDto.toLockerEntity();
        int result = seatRepository.payLocker(locker);

        return result != 0;
    }



    @Override
    public int scheduledDeleteLocker(Date now) {
        return seatRepository.deleteLocker(now);
    }




}
