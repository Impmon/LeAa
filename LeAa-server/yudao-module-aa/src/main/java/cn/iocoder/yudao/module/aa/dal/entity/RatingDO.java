package cn.iocoder.yudao.module.aa.dal.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@TableName("aa_rating")
public class RatingDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long activityId;

    private Long raterId;

    private Long ratedId;

    private Integer score;

    private String comment;

    private String tags;

}
