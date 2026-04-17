package cn.iocoder.yudao.module.aa.service;

import cn.iocoder.yudao.module.aa.dal.entity.HubDO;
import cn.iocoder.yudao.module.aa.vo.HubCreateVO;
import cn.iocoder.yudao.module.aa.vo.HubQueryVO;
import cn.iocoder.yudao.module.aa.vo.HubUpdateVO;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface HubService extends IService<HubDO> {

    /**
     * 创建据点
     */
    Long createHub(HubCreateVO createVO);

    /**
     * 更新据点
     */
    void updateHub(Long id, HubUpdateVO updateVO);

    /**
     * 删除据点
     */
    void deleteHub(Long id);

    /**
     * 获取据点详情
     */
    HubDO getHub(Long id);

    /**
     * 分页查询据点
     */
    IPage<HubDO> pageHub(HubQueryVO queryVO);

    /**
     * 列表查询据点
     */
    List<HubDO> listHub(HubQueryVO queryVO);

    /**
     * 加入据点
     */
    void joinHub(Long hubId, Long userId);

    /**
     * 退出据点
     */
    void leaveHub(Long hubId, Long userId);

    /**
     * 添加据点标签
     */
    void addHubTag(Long hubId, String tag);

    /**
     * 删除据点标签
     */
    void removeHubTag(Long hubId, String tag);

}
