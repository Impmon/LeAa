package cn.iocoder.yudao.module.aa.vo;

import lombok.Data;

@Data
public class HubQueryVO {

    private String name;

    private String location;

    private String tag;

    private Long creatorId;

    private Integer pageNo;

    private Integer pageSize;

}
