package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.domain.user.User;
import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override // 회원가입
    public boolean userJoin(UserReqDto userReqDto) throws Exception {

        User userEntity = userReqDto.toUserEntity();

        int result = userRepository.join(userEntity);

        return result != 0;
    }
}
