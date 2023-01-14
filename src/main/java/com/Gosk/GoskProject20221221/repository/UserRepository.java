package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.user.User;
import com.Gosk.GoskProject20221221.domain.user.UserSeat;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserRepository {

    public int join(User user);
    public User userSelect(String userPhone);
    public User preModUserSelect(int userId);
    public int updateTime(User user);
    public List<User> allUser();
    public List<UserSeat> seatInfo(int userId);
    public int modifyUser(User user);
    public int deleteUser(int userId);
    public int deleteSeatUser(int userId);
    public int deleteReservedUser(int userId);
}

