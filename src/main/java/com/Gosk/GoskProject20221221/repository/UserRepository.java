package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.user.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserRepository {

    public int join(User user);
    public User userSelect(String userPhone);
}
