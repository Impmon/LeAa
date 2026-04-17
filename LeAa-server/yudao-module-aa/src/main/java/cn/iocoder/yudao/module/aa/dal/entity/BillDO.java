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
@TableName("aa_bill")
public class BillDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long activityId;

    private BigDecimal totalAmount;

    private Long creatorId;

    private String status;

}
