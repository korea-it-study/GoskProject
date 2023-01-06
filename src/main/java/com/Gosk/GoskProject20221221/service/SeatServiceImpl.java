package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.seat.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.dto.seat.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.ReservedSeatRespDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatReqDto;
import com.Gosk.GoskProject20221221.dto.seat.SeatRespDto;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.Map;


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
<<<<<<< HEAD
    public List<String> useSeat() throws Exception {

        return seatRepository.seatSelect();
    }

    @Override
    public List<String> useReservedSeat() throws Exception {

        return seatRepository.reservedSelect();
=======
    public boolean payLocker(LockerReqDto lockerReqDto) {
        Locker locker = lockerReqDto.toLockerEntity();
        int result = seatRepository.payLocker(locker);

        return result != 0;
    }

    @Override
    public List<String> getLocker() {
        List<String> names = seatRepository.getLocker();
        System.out.println("사물함 사용중 =========" + names);

        return names;
    }

    @Override
    public int deleteLocker(Date now) {

        return seatRepository.deleteLocker(now);
    }

    @Override
    public String getUserLocker(int userId) {

        return seatRepository.getUserLocker(userId);
>>>>>>> origin/mungi
    }


}
