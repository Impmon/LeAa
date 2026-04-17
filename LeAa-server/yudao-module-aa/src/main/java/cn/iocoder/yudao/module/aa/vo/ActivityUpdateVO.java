package cn.iocoder.yudao.module.aa.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ActivityUpdateVO {

    private String title;

    private String type;

    private BigDecimal budgetPerPerson;

    private Integer maxParticipants;

    private LocalDateTime startTime;

    private String location;

    private String description;

    private String image;

    private String icebreakerQuestion;

    private String status;

}
