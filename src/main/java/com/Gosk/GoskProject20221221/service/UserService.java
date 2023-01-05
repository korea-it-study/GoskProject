package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

public interface UserService {
    public boolean checkDuplicationUserPhone(String userPhone);
    public boolean userJoin(UserReqDto userReqDto) throws Exception;
    public boolean userUpdateTime(UserReqDto userReqDto) throws Exception;

}
