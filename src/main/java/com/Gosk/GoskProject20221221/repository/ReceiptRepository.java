package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Receipt;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReceiptRepository {
    public int payReceipt(Receipt receipt);
}
