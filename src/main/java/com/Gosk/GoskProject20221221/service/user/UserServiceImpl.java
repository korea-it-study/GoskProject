package com.Gosk.GoskProject20221221.service.user;

import com.Gosk.GoskProject20221221.domain.user.User;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.dto.User.UserRespDto;
import com.Gosk.GoskProject20221221.dto.User.UserSeatRespDto;
import com.Gosk.GoskProject20221221.exception.CustomValidationException;
import com.Gosk.GoskProject20221221.repository.SeatRepository;
import com.Gosk.GoskProject20221221.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public boolean checkDuplicationUserPhone(String userPhone) {

//        log.info("[2 UserServiceImpl] 아이디 중복체크 :::::::::::::: {}", userPhone);

        User user = userRepository.userSelect(userPhone);

//        log.info("[1 UserServiceImpl] 아이디 중복체크 :::::::::::::: {}", user);

        if (user != null) { // 아이디가 기존에 이미 있다면, (중복)
            Map<String, String> errorMap = new HashMap<String, String>();

            errorMap.put("duplicateFlag", "이미 가입된 아이디입니다");
            throw new CustomValidationException("DuplicateMainUsername MainUsername", errorMap);
        }
        return true;
    }

    @Override // 회원가입
    public boolean userJoin(UserReqDto userReqDto) throws Exception {

        User userEntity = userReqDto.toUserEntity();

        int result = userRepository.join(userEntity);

        if(result == 0) {
          log.info("에러!");
        }else if(userEntity.getUser_pw().length() != 4) {
            log.info("비밀번호 자릿수 에러!");
        }

        return false;
    }

    @Override // 정액권 구매시 user date, user time
    public boolean userUpdateTime(UserReqDto userReqDto) throws Exception {
        User userTimeEntity = userReqDto.toUpdateTime();

        int result = userRepository.updateTime(userTimeEntity);

        return result != 0;
    }

    @Override
    public List<UserRespDto> allUserList() throws Exception {

        List<UserRespDto> userList = new ArrayList<>();

        userRepository.allUser().forEach(user -> {
            userList.add(user.toAllUserList());
        });

        return userList;
    }

    @Override
    public List<UserSeatRespDto> userSeatInfo(int userId) throws Exception {

        List<UserSeatRespDto> userSeatList = new ArrayList<>();

        userRepository.seatInfo(userId).forEach(userSeat -> {
            userSeatList.add(userSeat.toSeatInfo());
        });

        return userSeatList;
    }

    @Override
    public boolean userModify(UserReqDto userReqDto) throws Exception {

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        User user = userRepository.preModUserSelect(userReqDto.getUserId()); // 기존의 user 정보 들고오기

//        System.out.println("user :::: " + user);
        //업데이트 전 유저 데이터를 들고옴

       if(userReqDto.getUserPhone() == ""){ // 수정 데이터에서 폰번호 입력 안했을 시
            userReqDto.setUserPhone(user.getUser_phone()); // 기존 데이터에서 가져온 폰번호 입력

       }else if(userReqDto.getUserPw() == "") { // 수정데이터에서 패스워드 입력 안했을 시
           userReqDto.setUserPw(user.getUser_pw()); // 기존 데이터에서 가져온 폰 번호 입력
       }

       User userMod = User.builder()                // 수정된 데이터를 다시 User로 빌드
               .user_id(userReqDto.getUserId())
               .user_phone(userReqDto.getUserPhone())
               .user_pw(bCryptPasswordEncoder.encode(userReqDto.getUserPw()))
               .build();

//        System.out.println("userMod :::::" + userMod);

        int result = userRepository.modifyUser(userMod);

        return result != 0;
    }

    @Override
    public boolean userDelete(int userId) throws Exception {

        int result = userRepository.deleteUser(userId);
        userRepository.deleteSeatUser(userId);
        userRepository.deleteReservedUser(userId);

        return result != 0;
    }


}
