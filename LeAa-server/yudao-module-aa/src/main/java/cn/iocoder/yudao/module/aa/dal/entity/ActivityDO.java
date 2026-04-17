package cn.iocoder.yudao.module.aa.dal.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@TableName("aa_activity")
public class ActivityDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String title;

    private String type;

    private BigDecimal budgetPerPerson;

    private Integer maxParticipants;

    private Integer currentParticipants;

    private LocalDateTime startTime;

    private String location;

    private String description;

    private String image;

    private Long creatorId;

    private String icebreakerQuestion;

    private String status;

}
