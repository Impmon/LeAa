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
@TableName("aa_hub")
public class HubDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private String name;

    private String description;

    private Integer members;

    private String location;

    private String image;

    private Long creatorId;

}
