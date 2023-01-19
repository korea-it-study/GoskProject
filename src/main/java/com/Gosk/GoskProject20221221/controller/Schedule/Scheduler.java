package com.Gosk.GoskProject20221221.controller.Schedule;

import com.Gosk.GoskProject20221221.service.seat.SeatService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.SQLOutput;
import java.time.LocalDateTime;
import java.util.Date;


@Component
@RequiredArgsConstructor
@Slf4j
public class Scheduler {
    private final SeatService seatService;

    @Scheduled(cron = "0 0 22 * * *") ///매일 22시에 사물함, 기간권, 지정석 만료시 삭제, 원데이 일괄 삭제
    public void timeoutLocker() {
        Date now = new Date();
        int timeoutLockerList = seatService.scheduledUpdateLocker(now);
        int timeoutCommutationList = seatService.scheduledUpdateCommutation(now);
        int timeoutReserveList = seatService.scheduleUpdateReserve(now);
        int closingOnedayList = seatService.closingTimeOneday();

        log.info("Scheduler ::::::: {}", now + " 사물함 삭제개수 " + timeoutLockerList);
        log.info("Scheduler ::::::: {}", now + " 기간권 삭제 개수 " + timeoutCommutationList);
        log.info("Scheduler ::::::: {}", now + " 지정석 삭제 개수" + timeoutReserveList);
        log.info("Scheduler ::::::: {}", now + "영업 마갑입니다. 원데이 일괄 퇴실" + closingOnedayList);

    }


    @Scheduled(cron = "0 * 10-22 * * *") //10시부터 22시까지 1분 마다 원데이 퇴실
    public void timeoutOnedayAndTime(){
        int timeoutList = seatService.scheduledUpdateOnedayAndTime(new Date());
        log.info("Scheduler ::::::: {}", new Date() + "원데이 삭제 개수 " + timeoutList);

    }




}
