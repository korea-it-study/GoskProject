package com.Gosk.GoskProject20221221.service.user;

import com.Gosk.GoskProject20221221.dto.User.UserReqDto;
import com.Gosk.GoskProject20221221.dto.User.UserRespDto;
import com.Gosk.GoskProject20221221.dto.User.UserSeatRespDto;
import com.Gosk.GoskProject20221221.service.auth.PrincipalDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

public interface UserService {
    public boolean checkDuplicationUserPhone(String userPhone);
    public boolean userJoin(UserReqDto userReqDto) throws Exception;
    public boolean userUpdateTime(UserReqDto userReqDto) throws Exception;
    public List<UserRespDto> allUserList() throws Exception;
    public List<UserSeatRespDto> userSeatInfo(int userId) throws Exception;
    public boolean userModify(UserReqDto userReqDto) throws Exception;

}
