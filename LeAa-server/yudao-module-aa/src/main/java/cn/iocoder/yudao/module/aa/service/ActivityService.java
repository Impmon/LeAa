package cn.iocoder.yudao.module.aa.service;

import cn.iocoder.yudao.module.aa.dal.entity.ActivityDO;
import cn.iocoder.yudao.module.aa.vo.ActivityCreateVO;
import cn.iocoder.yudao.module.aa.vo.ActivityQueryVO;
import cn.iocoder.yudao.module.aa.vo.ActivityUpdateVO;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

public interface ActivityService extends IService<ActivityDO> {

    /**
     * 创建活动
     */
    Long createActivity(ActivityCreateVO createVO);

    /**
     * 更新活动
     */
    void updateActivity(Long id, ActivityUpdateVO updateVO);

    /**
     * 删除活动
     */
    void deleteActivity(Long id);

    /**
     * 获取活动详情
     */
    ActivityDO getActivity(Long id);

    /**
     * 分页查询活动
     */
    IPage<ActivityDO> pageActivity(ActivityQueryVO queryVO);

    /**
     * 列表查询活动
     */
    List<ActivityDO> listActivity(ActivityQueryVO queryVO);

    /**
     * 报名活动
     */
    void joinActivity(Long activityId, Long userId, String answer);

    /**
     * 取消报名
     */
    void cancelJoinActivity(Long activityId, Long userId);

    /**
     * 开始活动
     */
    void startActivity(Long activityId);

    /**
     * 结束活动
     */
    void endActivity(Long activityId);

    /**
     * 取消活动
     */
    void cancelActivity(Long activityId);

}
