package com.Gosk.GoskProject20221221.service;

import com.Gosk.GoskProject20221221.dto.seat.LockerRespDto;
import com.Gosk.GoskProject20221221.repository.MoveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


public interface MoveService {

    public LockerRespDto getLockerDetail(String lockerId);
    public int MoveLocker(String lockerId);
    }


