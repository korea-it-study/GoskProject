package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.dto.seat.*;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.validation.constraints.Null;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
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
    public List<SeatRespDto> useSeat() throws Exception {
        List<Seat> useSeatList = seatRepository.seatSelect();
        List<SeatRespDto> useSeatRespDtoList = new ArrayList<>();
        useSeatList.forEach(useSeat ->{
            useSeatRespDtoList.add(useSeat.toSeatRespDto());
        });
        return useSeatRespDtoList;
    }

    @Override
    public List<ReservedSeatRespDto> useReservedSeat() throws Exception {
        List<ReservedSeat> useReservedSeats = seatRepository.reservedSelect();


        if(useReservedSeats.size() > 0){
            List<ReservedSeatRespDto> useReservedRespDtoList = new ArrayList<>();
            useReservedSeats.forEach(useReserve -> {
                useReservedRespDtoList.add(useReserve.toRespDto());
            });
            return useReservedRespDtoList;
        }
        return null;
    }

    @Override

    public SeatInfoRespDto getBasicSeatDetail(String seatId) {
        SeatInfo seatInfo = seatRepository.getBasicSeatDetail(seatId);
        //정액권이면
        if(seatInfo.getUser_time() != 0){
            return SeatInfoRespDto.builder()
                    .userId(seatInfo.getUser_id())
                    .userPhone(seatInfo.getUser_phone())
                    .userTime(calcLeft(seatInfo.getUser_time()))
                    .build();
            //원데이면
        }else if(seatInfo.getSeat_total_time() != null){
            return SeatInfoRespDto.builder()
                    .userId(seatInfo.getUser_id())
                    .seatTotalTime(getSeatTotalTime(seatInfo.getSeat_total_time()))
                    .userPhone(seatInfo.getUser_phone())
                    .build();
        }
        return seatInfo.toSeatInfoRespDto(); //아니면 userDate만 있는 dto 생성
    }
    private String getSeatTotalTime(LocalDateTime seat_total_time) {

        return seat_total_time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
    private String calcLeft(int amount){
        int hour = amount/(60*60);
        int minute = amount/60-(hour*60);
        int second = amount%60;
        return hour+"시간"+minute+"분"+second+"초";
    }

    @Override
    public SeatInfoRespDto getSpecialSeatDetail(String seatId) {
        SpecialSeatInfo specialSeatInfo = seatRepository.getSpecialSeatDetail(seatId);
        return SeatInfoRespDto.builder()
                .userId(specialSeatInfo.getUser_id())
                .reservedSeatTotalTime(specialSeatInfo.getReserved_total_time())
                .userPhone(specialSeatInfo.getUser_phone())
                .build();
    }

    @Override
    public boolean payLocker(LockerReqDto lockerReqDto) {
        Locker locker = lockerReqDto.toLockerEntity();
        int result = seatRepository.payLocker(locker);

        return result != 0;
    }


    @Override
    public int scheduledDeleteLocker(Date now) {
        seatRepository.updateLocker(now);
        return seatRepository.delete0Locker();
    }

    //여기서 싹다 삭제됨 원데이 까지
    @Override
    public int scheduledDeleteCommutation(Date now) {
        seatRepository.updateCommutation(now);
        return seatRepository.delete0Seat();
    }

    @Override
    public int scheduledDeleteOneday(Date now) {
        seatRepository.updateOneday(now);
        return seatRepository.delete0Seat();
    }

    @Override
    public int closingTimeOneday() {
        seatRepository.closingDelete();
        return seatRepository.delete0Seat();
    }

    //날짜되면 지정석 지우기
    @Override
    public int scheduledDeleteReserve(Date now) {
        return seatRepository.deleteReserve(now);
    }

    @Override
    public int forcedExit(List<String> arr) {

        List<String> newArr = new ArrayList<>();
        int result = 0;

        //지정석 삭제
        if(arr.get(0).contains("reserve")){
            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("reserve")));
            });
            result = seatRepository.forcedExitReserve(newArr);
            seatRepository.delete0Reserve();

        //일반석 삭제
        }else if(arr.get(0).contains("seat")){

            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("seat")));
            });
            result = seatRepository.forcedExitSeat(newArr);
            seatRepository.delete0Seat();

        //사물함 삭제
        }else{

            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("locker")));
            });
            result = seatRepository.forcedExitLocker(newArr);
            seatRepository.delete0Locker();
        }
        return result;
    }
}
