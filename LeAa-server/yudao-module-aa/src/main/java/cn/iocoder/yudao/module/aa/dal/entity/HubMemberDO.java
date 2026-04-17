package cn.iocoder.yudao.module.aa.dal.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@TableName("aa_hub_member")
public class HubMemberDO extends BaseDO {

    @TableId(type = IdType.AUTO)
    private Long id;

    private Long hubId;

    private Long userId;

    private LocalDateTime joinTime;

}
