package com.Gosk.GoskProject20221221.repository;

import com.Gosk.GoskProject20221221.domain.Receipt;
import com.Gosk.GoskProject20221221.domain.TimePrice;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReceiptRepository {
    public int payReceipt(Receipt receipt);

    public List<Receipt> getReceipt(int userId);

    public List<Receipt> getSalesListSelect() throws Exception;

}
