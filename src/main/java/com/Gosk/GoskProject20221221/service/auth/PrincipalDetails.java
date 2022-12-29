package com.Gosk.GoskProject20221221.service.auth;

import com.Gosk.GoskProject20221221.domain.user.User;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Slf4j
public class PrincipalDetails implements UserDetails {

    private User user;

    public PrincipalDetails(User user) {
        this.user = user;
    }

    public void setPrincipal(User user) {
        this.user = user;
    }

     @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

//         log.info("getRole 들고오나? :::::::::::::::::::::::::::::::: {}", user.getRole().getRole());

        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(() -> user.getRole().getRole());

//        log.info("getRole 들고오나? :::::::::::::::::::::::::::::::: {}", user.getRole().getRole());

//         return null;
         return authorities;
    }

    @Override
    public String getPassword() {
        return user.getUser_pw(); // 시큐리티 가져갈 비번
    }

    @Override
    public String getUsername() {
        return user.getUser_phone(); // 시큐리티 가져갈 아이디
    }

    @Override
    public boolean isAccountNonExpired() { // 계정 만료 여부
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // 계정 잠김 여부
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // 비밀번호 만료 여부 (5회 이상 틀렸을 때)
        return true;
    }

    @Override
    public boolean isEnabled() { // 계정 활성화 여부
        return true;
    }
}
