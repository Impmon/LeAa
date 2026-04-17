package cn.iocoder.yudao.module.aa.vo;

import lombok.Data;

import java.util.List;

@Data
public class HubUpdateVO {

    private String name;

    private String description;

    private String location;

    private String image;

    private List<String> tags;

}
