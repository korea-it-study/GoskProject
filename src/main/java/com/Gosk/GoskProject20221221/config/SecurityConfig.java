package com.Gosk.GoskProject20221221.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.concurrent.ExecutionException;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.httpBasic().disable();
        http.authorizeRequests()
//                -------------------------page-------------------------
                .antMatchers("/admin/**")
                .hasRole(("ADMIN"))

                .antMatchers("/index", "/account/login")
                .permitAll() // 전원 접근 가능

                .antMatchers("/")
                .access("hasRole('USER') or hasRole('ADMIN')")

                .antMatchers("/api/**")
                .permitAll()

                .anyRequest() // antMatchers 이외의 다른 요청들
                .denyAll() // 전원 접근 권한 차단

                .and()
                .formLogin() //폼로그인
                .usernameParameter("user_phone")
                .passwordParameter("user_pw")
                .loginPage("/account/login") // 우리가 만든 로그인 페이지
                .loginProcessingUrl("/account/login")
                .failureHandler(null) // 로그인 실패
                .defaultSuccessUrl("/index");
    }
}
