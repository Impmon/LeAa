package cn.iocoder.yudao.module.aa.dal.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@TableName("aa_bill_item")
public class BillItemDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long billId;

    private Long userId;

    private BigDecimal amount;

    private String status;

}
