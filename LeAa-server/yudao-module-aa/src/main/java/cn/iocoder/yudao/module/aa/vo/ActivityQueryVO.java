package cn.iocoder.yudao.module.aa.vo;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ActivityQueryVO {

    private String title;

    private String type;

    private String location;

    private LocalDateTime startTimeFrom;

    private LocalDateTime startTimeTo;

    private String status;

    private Long creatorId;

    private Integer pageNo;

    private Integer pageSize;

}
