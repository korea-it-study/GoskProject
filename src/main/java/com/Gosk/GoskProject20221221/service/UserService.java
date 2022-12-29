package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.User.UserReqDto;

public interface UserService {
    public boolean checkDuplicationUserPhone(String userPhone);
    public boolean userJoin(UserReqDto userReqDto) throws Exception;


}
