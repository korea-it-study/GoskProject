package com.Gosk.GoskProject20221221.controller.Schedule;

import com.Gosk.GoskProject20221221.service.seat.SeatService;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.SQLOutput;
import java.util.Date;


@Component
@RequiredArgsConstructor
public class Scheduler {
    private final SeatService seatService;

    @Scheduled(cron = "0 15 18 * * *") ///매일 22시에 사물함, 기간권, 지정석 만료시 삭제, 원데이 일괄 삭제
    public void timeoutLocker() {
        Date now = new Date();
        int closingOnedayList = seatService.closingTimeOneday();
        int timeoutLockerList = seatService.scheduledDeleteLocker(now);
        int timeoutCommutationList = seatService.scheduledDeleteCommutation(now);
        int timeoutReserveList = seatService.scheduledDeleteReserve(now);

        System.out.println( now + " 사물함 삭제개수 " + timeoutLockerList);
        System.out.println(now + " 기간권 삭제 개수 " + timeoutCommutationList);
        System.out.println(now + " 지정석 삭제 개수" + timeoutReserveList);
        System.out.println(now + "영업 마갑입니다. 원데이 일괄 퇴실" + closingOnedayList);
    }


    @Scheduled(cron = "0 * 10-22 * * *") //10시부터 22시까지 1분 마다 원데이 퇴식
    public void timeoutOneday(){
        int timeoutList = seatService.scheduledDeleteOneday(new Date());
        System.out.println(new Date() + " 원데이 삭제 개수 " + timeoutList);
    }



}
