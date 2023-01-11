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

    @Scheduled(cron = "0 0 22 * * *") ///매일 22시에 사물함, 기간권, 원데이 삭제
    public void timeoutLocker() {
        int timeoutList = seatService.scheduledDeleteLocker(new Date());
        int timeoutCommutationList = seatService.scheduledDeleteCommutation(new Date());
        int closingOnedayList = seatService.closingTimeOneday();
        System.out.println( new Date() + " 사물함 삭제개수 " + timeoutList);
        System.out.println(new Date() + " 기간권 삭제 개수 " + timeoutCommutationList);
        System.out.println(new Date() + "영업 마갑입니다. 원데이 일괄 퇴실" + closingOnedayList);
    }


    @Scheduled(cron = "0 * 10-22 * * *") //10시부터 22시까지 1분 마다 원데이 퇴식
    public void timeoutOneday(){
        int timeoutList = seatService.scheduledDeleteOneday(new Date());
        System.out.println(new Date() + " 원데이 삭제 개수 " + timeoutList);
    }



}
