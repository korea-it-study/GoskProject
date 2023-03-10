package com.Gosk.GoskProject20221221.service.seat;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.seat.ReservedSeat;
import com.Gosk.GoskProject20221221.domain.seat.Seat;
import com.Gosk.GoskProject20221221.domain.seat.SeatInfo;
import com.Gosk.GoskProject20221221.domain.seat.SpecialSeatInfo;
import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerReqDto;
import com.Gosk.GoskProject20221221.dto.seat.*;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
    public List<SeatRespDto> allSeat() throws Exception {
        List<Seat> useSeatList = seatRepository.seatSelect();
        List<SeatRespDto> useSeatRespDtoList = new ArrayList<>();
        useSeatList.forEach(useSeat ->{
            useSeatRespDtoList.add(useSeat.toSeatRespDto());
        });
        return useSeatRespDtoList;
    }

    @Override
    public List<String> useSeat() {
        return seatRepository.useSeat();
    }

    @Override
    public List<String> usableSeat() {
        return seatRepository.usableSeat();
    }

    @Override
    public List<ReservedSeatRespDto> allReservedSeat() throws Exception {
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
    public List<String> useReservedSeat() {
        return seatRepository.useReserved();
    }

    @Override
    public List<String> usableReserved() {
        return seatRepository.usableReserved();
    }

    @Override
    public SeatInfoRespDto getBasicSeatDetail(String seatId) {
        SeatInfo seatInfo = seatRepository.getBasicSeatDetail(seatId);

        //???????????????
        if(seatInfo.getUser_time() != 0){
            return SeatInfoRespDto.builder()
                    .userId(seatInfo.getUser_id())
                    .userPhone(seatInfo.getUser_phone())
                    .userTime(calcLeft(seatInfo.getUser_time()))
                    .build();

            //????????????
        }else if(seatInfo.getSeat_total_time() != null){
            return SeatInfoRespDto.builder()
                    .userId(seatInfo.getUser_id())
                    .seatTotalTime(getSeatTotalTime(seatInfo.getSeat_total_time()))
                    .userPhone(seatInfo.getUser_phone())
                    .build();
        }
        return seatInfo.toSeatInfoRespDto();
    }
    private String getSeatTotalTime(LocalDateTime seat_total_time) {

        return seat_total_time.format(DateTimeFormatter.ofPattern("HH:mm:ss"));
    }
    private String calcLeft(int amount){
        int hour = amount/(60*60);
        int minute = amount/60-(hour*60);
        int second = amount%60;
        return hour+"??????"+minute+"???"+second+"???";
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
    public int scheduledUpdateLocker(Date now) {
        return seatRepository.timeoutLocker(now);
    }

    @Override
    public int scheduledUpdateCommutation(Date now) {
        //????????? ?????? ?????????
        //????????? -> ?????? -> ???????????? ?????? -> ?????? ???????????? ?????? ??????
        //?????? ?????? ?????? -> ?????? ?????? ?????? -> ???????????? ??????
        //??????????????? ?????? ?????? -> ???????????? ??????????????? ???????????? -> ?????????????????? update

        return seatRepository.timeoutCommutation(now);
    }

    @Override
    public int scheduledUpdateOnedayAndTime(Date now) {
        return seatRepository.timeoutOnedayAndTime(now);
    }
    @Override
    public int closingTimeOneday() {
        return seatRepository.closingOneday();
    }
    @Override
    public int scheduleUpdateReserve(Date now) {
        return seatRepository.timeoutReserve(now);
    }

    @Override
    public boolean enter(InOutReqDto reqDto) {

        return seatRepository.enter(reqDto) != 0;
    }

    @Override
    public int forcedExit(List<String> arr) {
        List<String> newArr = new ArrayList<>();
        List<Integer> userIdArr;
        int result = 0;
        //???????????????
        if(arr.get(0).contains("reserve")){

            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("reserve")));
            });
            //id?????????
            userIdArr = seatRepository.getReservedUser(newArr);
            result = seatRepository.forcedExit(userIdArr);

            //???????????????
        }else if(arr.get(0).contains("seat")){

            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("seat")));
            });
            userIdArr = seatRepository.getSeatUser(newArr);
            result = seatRepository.forcedExit(userIdArr);
            //???????????????
        }else{

            arr.forEach(seat ->{
                newArr.add(seat.substring(0,seat.indexOf("locker")));
            });
            userIdArr = seatRepository.getLockerUser(newArr);
            result = seatRepository.forcedExit(userIdArr);
        }
        return result;
    }


    //    @Override
//    public int insertSeat(List<String> arr) {
////        int seat = seatRepository.insertSeat(arr);
//        int special = seatRepository.insertSpecial(arr);
//        return special;
//    }


}
