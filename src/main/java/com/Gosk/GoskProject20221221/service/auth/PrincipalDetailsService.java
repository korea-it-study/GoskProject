package com.Gosk.GoskProject20221221.service.auth;

import com.Gosk.GoskProject20221221.domain.user.User;
import com.Gosk.GoskProject20221221.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userPhone) throws UsernameNotFoundException {

        User user = userRepository.userSelect(userPhone);
        log.info("로그인 중복 체크 : {}", userPhone);

        if (user == null) {
            log.error("아이디 정보 없음");
            throw new UsernameNotFoundException("존재하지 않는 아이디입니다.");
        }

        System.out.println(user);

        return new PrincipalDetails(user);
    }
}
