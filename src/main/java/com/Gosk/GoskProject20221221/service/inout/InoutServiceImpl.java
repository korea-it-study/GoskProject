package com.Gosk.GoskProject20221221.service.inout;

import com.Gosk.GoskProject20221221.HourMinute;
import com.Gosk.GoskProject20221221.domain.user.InOutInfo;
import com.Gosk.GoskProject20221221.dto.User.InOutInfoRespDto;

import com.Gosk.GoskProject20221221.dto.seat.InOutReqDto;
import com.Gosk.GoskProject20221221.repository.InoutRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class InoutServiceImpl implements InoutService {

    private final InoutRepository inoutRepository;



    @Override
    public InOutInfoRespDto getInInfo(int userId) {

        if(inoutRepository.getInInfo(userId) != null){
            LocalDateTime now = LocalDateTime.now();
            System.out.println("userID: " + userId);
            InOutInfo info = inoutRepository.getInInfo(userId);

            //시간권이면
            if(Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_time() > 0){
                int time = info.getUser_time();
                HourMinute hourMinute = getHourMinute(time);

                LocalDateTime closing = LocalDateTime.of(now.getYear(),now.getMonth(),now.getDayOfMonth(),22,0);

                if(now.plusSeconds(time).isBefore(closing)){
                    //시간 더했을때 오늘 마감시간 안에 끝나면
                    //이 사람의 퇴실시간을 지정주자 ->

                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .userTime(time)
                            .leftTime(hourMinute.getHour() + " 시간 " + hourMinute.getMinute() + " 분")
                            .seatId(info.getSeat_id())
                            .receiptTime(info.getReceipt_time())
                            .receiptDay(0)
                            .receiptKinds("시간권")
                            .seatTotalTime(now.plusSeconds(time)) //퇴실예정시간 나중에 같이 update해줘야
                            .build();

                }else{
                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .userTime(time)
                            .leftTime(hourMinute.getHour() + " 시간 " + hourMinute.getMinute() + " 분")
                            .seatId(info.getSeat_id())
                            .receiptTime(info.getReceipt_time())
                            .receiptDay(0)
                            .receiptKinds("시간권")
                            .seatTotalTime(null)
                            .build();
                }

                //정액권 기간제이면
            }else if(Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_day() > 0 ){
                return InOutInfoRespDto.builder()
                        .userId(userId)
                        .userDate(info.getUser_date()) //사용 만료 일자
                        .receiptKinds("기간권")
                        .receiptDay(info.getReceipt_day())
                        .seatId(null)
                        .seatTotalTime(null)
                        .build();

                //지정석
            }else if(Objects.equals(info.getReceipt_kinds(), "지정석")) {
                return InOutInfoRespDto.builder()
                        .userId(userId)
                        .reservedSeatId(info.getReserved_seat_id())
                        .reservedTotalTime(info.getReserved_total_time())
                        .receiptDay(info.getReceipt_day())
                        .receiptKinds("지정석")
                        .build();

                //원데이
            }else{
                return InOutInfoRespDto.builder()
                        .userId(userId)
                        .seatId(info.getSeat_id())
                        .seatTotalTime(info.getSeat_total_time())
                        .receiptTime(info.getReceipt_time())
                        .receiptKinds("원데이")
                        .build();
            }

        }else{
            System.out.println("user id가 없다.");
            return new InOutInfoRespDto();
        }
    }

    private HourMinute getHourMinute(int secondTime){
        return HourMinute.builder()
                .hour(secondTime / 3600)
                .minute(secondTime % 3600 / 60)
                .second(secondTime % 3600 % 60)
                .build();
    }

    @Override
    public InOutInfoRespDto getOutInfo(int userId) {

        //해당 id가 없거나, 사용중인 내역이 없거나, 사물함만 사용중이면 null
        if(inoutRepository.getInInfo(userId) != null) {
            LocalDateTime now = LocalDateTime.now();
            InOutInfo info = inoutRepository.getInInfo(userId);


            //시간권이면
            if (Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_time() > 0) {
                int userTime = info.getUser_time();
                //입실 안했는데 퇴실 누름
                if(info.getSeat_start_time() == null){
                    HourMinute leftTime = getHourMinute(userTime);

                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .leftTime(leftTime.getHour() + "시간" + leftTime.getMinute() + "분")
                            .seatId(null)
                            .receiptKinds("시간권")
                            .receiptTime(info.getReceipt_time())
                            .build();

                }else{
                    LocalDateTime seatStartTime = info.getSeat_start_time();
                    Duration duration = Duration.between(seatStartTime, now);

                    int afterUserSecond = userTime - (int) duration.getSeconds(); //사용하고 남은 초 update해줘야돼
                    HourMinute leftTime = getHourMinute(afterUserSecond); //사용하고 남은 시간 표시용

                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .leftTime(leftTime.getHour() + "시간" + leftTime.getMinute() + "분")
                            .afterUserSecond(afterUserSecond)
                            .seatId(info.getSeat_id())
                            .receiptKinds("시간권")
                            .receiptTime(info.getReceipt_time())
                            .build();

                }

            }else if(Objects.equals(info.getReceipt_kinds(), "정액권") && info.getReceipt_day() > 0 ){
                //입실 안했는데 퇴실 누름
                if(info.getSeat_start_time() == null){
                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .userDate(info.getUser_date())
                            .seatId(null)
                            .receiptKinds("기간권")
                            .receiptDay(info.getReceipt_day())
                            .build();
                }else{
                    return InOutInfoRespDto.builder()
                            .userId(userId)
                            .userDate(info.getUser_date())
                            .seatId(info.getSeat_id())
                            .receiptKinds("기간권")
                            .receiptDay(info.getReceipt_day())
                            .build();
                }

                //지정석
            }else if(Objects.equals(info.getReceipt_kinds(), "지정석")) {
                return InOutInfoRespDto.builder()
                        .userId(userId)
                        .reservedSeatId(info.getReserved_seat_id())
                        .reservedTotalTime(info.getReserved_total_time())
                        .receiptDay(info.getReceipt_day())
                        .receiptKinds("지정석")
                        .build();

                //원데이
            }else{
                return InOutInfoRespDto.builder()
                        .userId(userId)
                        .seatId(info.getSeat_id())
                        .seatTotalTime(info.getSeat_total_time())
                        .receiptTime(info.getReceipt_time())
                        .receiptKinds("원데이")
                        .build();
            }
        }else{
            System.out.println("userId 조회 안된다.");
            return new InOutInfoRespDto();
        }


    }

    @Override
    public boolean terminateOnday(int userId) {
        return inoutRepository.terminateOneday(userId) != 0;
    }

    @Override
    public boolean terminateReserved(int userId) {
        return inoutRepository.terminateReserved(userId) != 0;
    }

    @Override
    public boolean terminateCommutation(int userId) {
        return inoutRepository.terminateCommutation(userId) != 0;
    }


    @Override
    public boolean exitTime(InOutReqDto inOutReqDto) {
        return inoutRepository.exitTime(inOutReqDto) != 0;
    }

    @Override
    public boolean exitDay(InOutReqDto inOutReqDto) {
        return inoutRepository.exitDay(inOutReqDto) != 0;
    }


}
