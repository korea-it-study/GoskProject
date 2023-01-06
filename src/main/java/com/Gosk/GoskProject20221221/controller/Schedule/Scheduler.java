package com.Gosk.GoskProject20221221.controller.Schedule;

import com.Gosk.GoskProject20221221.service.seat.SeatService;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@RequiredArgsConstructor
public class Scheduler {
    private final SeatService seatService;

    @Scheduled(cron = "0 0 22 * * *") ///매일 22시에 실행
    public void timeout() {
        int timeoutList = seatService.scheduledDeleteLocker(new Date());
        System.out.println( new Date() + " 삭제개수" + timeoutList);
    }


}
