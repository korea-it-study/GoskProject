package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserRepository {

    public int join(User user);
    public User userSelect(String userPhone);

    public int updateTime(User user);

    public List<User> allUser();
}
