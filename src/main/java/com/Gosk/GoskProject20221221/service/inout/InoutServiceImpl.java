package com.Gosk.GoskProject20221221.service.inout;

import com.Gosk.GoskProject20221221.domain.Locker;
import com.Gosk.GoskProject20221221.domain.user.InInfo;
import com.Gosk.GoskProject20221221.dto.User.InInfoRespDto;
import com.Gosk.GoskProject20221221.dto.locker.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.InoutRepository;
import com.Gosk.GoskProject20221221.repository.LockerRepository;
import com.Gosk.GoskProject20221221.service.locker.LockerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class InoutServiceImpl implements InoutService {

    private final InoutRepository inoutRepository;



    @Override
    public InInfoRespDto getInfo(int userId) {

        if(inoutRepository.getInfo(userId) != null){
            InInfo info = inoutRepository.getInfo(userId);

            //시간권이면 입실데이터
            if(Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_time() > 0){
                int time = info.getUser_time();
                int hour = time / 3600;
                int minute = time % 3600 /60 ;
                int second = time % 3600 % 60;

                LocalDateTime now = LocalDateTime.now();
                LocalDateTime closing = LocalDateTime.of(now.getYear(),now.getMonth(),now.getDayOfMonth(),22,0);
                if(now.plusSeconds(time).isBefore(closing)){
                    //시간 더했을때 오늘 마감시간 안에 끝나면
                    //이 사람의 퇴실시간을 지정주자 ->
                    ;
                    return InInfoRespDto.builder()
                            .userId(userId)
                            .userTime(time)
                            .seatId(null)
                            .receiptTime(info.getReceipt_time())
                            .receiptKinds("시간권")
                            .seatTotalTime(now.plusSeconds(time)) //퇴실예정시간
                            .leftTime(hour + " 시간 " + minute + " 분")
                            .build();

                }else{
                    return InInfoRespDto.builder()
                            .userId(userId)
                            .userTime(time)
                            .seatId(null)
                            .receiptTime(info.getReceipt_time())
                            .receiptKinds("시간권")
                            .seatTotalTime(null)
                            .build();
                }

                //정액권 기간제이면
            }else if(Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_day() > 0 ){
                return InInfoRespDto.builder()
                        .userId(userId)
                        .userDate(info.getUser_date()) //사용 만료 일자
                        .receiptKinds("기간권")
                        .receiptDay(info.getReceipt_day())
                        .seatId(null)
                        .build();
                //지정석
            }else if(Objects.equals(info.getReceipt_kinds(), "지정석")) {
                return InInfoRespDto.builder()
                        .userId(userId)
                        .reservedSeatId(info.getReserved_seat_id())
                        .reservedTotalTime(info.getReserved_total_time())
                        .receiptDay(info.getReceipt_day())
                        .build();
                //원데이
            }else{
                return InInfoRespDto.builder()
                        .userId(userId)
                        .seatId(info.getSeat_id())
                        .seatTotalTime(info.getSeat_total_time())
                        .receiptTime(info.getReceipt_time())
                        .receiptKinds("원데이")
                        .build();
            }

        }else{
            return new InInfoRespDto();
        }

    }
}
