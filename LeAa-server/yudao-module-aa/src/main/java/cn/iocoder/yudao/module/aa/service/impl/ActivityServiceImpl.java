package cn.iocoder.yudao.module.aa.service.impl;

import cn.iocoder.yudao.module.aa.dal.entity.ActivityDO;
import cn.iocoder.yudao.module.aa.dal.entity.ActivityParticipantDO;
import cn.iocoder.yudao.module.aa.dal.mapper.ActivityMapper;
import cn.iocoder.yudao.module.aa.dal.mapper.ActivityParticipantMapper;
import cn.iocoder.yudao.module.aa.service.ActivityService;
import cn.iocoder.yudao.module.aa.vo.ActivityCreateVO;
import cn.iocoder.yudao.module.aa.vo.ActivityQueryVO;
import cn.iocoder.yudao.module.aa.vo.ActivityUpdateVO;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ActivityServiceImpl extends ServiceImpl<ActivityMapper, ActivityDO> implements ActivityService {

    private final ActivityParticipantMapper activityParticipantMapper;

    public ActivityServiceImpl(ActivityParticipantMapper activityParticipantMapper) {
        this.activityParticipantMapper = activityParticipantMapper;
    }

    @Override
    public Long createActivity(ActivityCreateVO createVO) {
        ActivityDO activityDO = new ActivityDO();
        BeanUtils.copyProperties(createVO, activityDO);
        activityDO.setCurrentParticipants(0);
        activityDO.setStatus("PENDING");
        save(activityDO);
        return activityDO.getId();
    }

    @Override
    public void updateActivity(Long id, ActivityUpdateVO updateVO) {
        ActivityDO activityDO = getById(id);
        if (activityDO == null) {
            throw new RuntimeException("活动不存在");
        }
        BeanUtils.copyProperties(updateVO, activityDO);
        updateById(activityDO);
    }

    @Override
    public void deleteActivity(Long id) {
        removeById(id);
    }

    @Override
    public ActivityDO getActivity(Long id) {
        return getById(id);
    }

    @Override
    public IPage<ActivityDO> pageActivity(ActivityQueryVO queryVO) {
        LambdaQueryWrapper<ActivityDO> wrapper = new LambdaQueryWrapper<>();
        if (queryVO.getTitle() != null) {
            wrapper.like(ActivityDO::getTitle, queryVO.getTitle());
        }
        if (queryVO.getType() != null) {
            wrapper.eq(ActivityDO::getType, queryVO.getType());
        }
        if (queryVO.getLocation() != null) {
            wrapper.like(ActivityDO::getLocation, queryVO.getLocation());
        }
        if (queryVO.getStartTimeFrom() != null) {
            wrapper.ge(ActivityDO::getStartTime, queryVO.getStartTimeFrom());
        }
        if (queryVO.getStartTimeTo() != null) {
            wrapper.le(ActivityDO::getStartTime, queryVO.getStartTimeTo());
        }
        if (queryVO.getStatus() != null) {
            wrapper.eq(ActivityDO::getStatus, queryVO.getStatus());
        }
        if (queryVO.getCreatorId() != null) {
            wrapper.eq(ActivityDO::getCreatorId, queryVO.getCreatorId());
        }
        Page<ActivityDO> page = new Page<>(queryVO.getPageNo(), queryVO.getPageSize());
        return page(page, wrapper);
    }

    @Override
    public List<ActivityDO> listActivity(ActivityQueryVO queryVO) {
        LambdaQueryWrapper<ActivityDO> wrapper = new LambdaQueryWrapper<>();
        if (queryVO.getTitle() != null) {
            wrapper.like(ActivityDO::getTitle, queryVO.getTitle());
        }
        if (queryVO.getType() != null) {
            wrapper.eq(ActivityDO::getType, queryVO.getType());
        }
        if (queryVO.getLocation() != null) {
            wrapper.like(ActivityDO::getLocation, queryVO.getLocation());
        }
        if (queryVO.getStartTimeFrom() != null) {
            wrapper.ge(ActivityDO::getStartTime, queryVO.getStartTimeFrom());
        }
        if (queryVO.getStartTimeTo() != null) {
            wrapper.le(ActivityDO::getStartTime, queryVO.getStartTimeTo());
        }
        if (queryVO.getStatus() != null) {
            wrapper.eq(ActivityDO::getStatus, queryVO.getStatus());
        }
        if (queryVO.getCreatorId() != null) {
            wrapper.eq(ActivityDO::getCreatorId, queryVO.getCreatorId());
        }
        return list(wrapper);
    }

    @Transactional
    @Override
    public void joinActivity(Long activityId, Long userId, String answer) {
        ActivityDO activityDO = getById(activityId);
        if (activityDO == null) {
            throw new RuntimeException("活动不存在");
        }
        if (!"PENDING".equals(activityDO.getStatus())) {
            throw new RuntimeException("活动已开始或已结束");
        }
        if (activityDO.getCurrentParticipants() >= activityDO.getMaxParticipants()) {
            throw new RuntimeException("活动人数已满");
        }

        // 检查是否已经报名
        LambdaQueryWrapper<ActivityParticipantDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ActivityParticipantDO::getActivityId, activityId);
        wrapper.eq(ActivityParticipantDO::getUserId, userId);
        ActivityParticipantDO existingParticipant = activityParticipantMapper.selectOne(wrapper);
        if (existingParticipant != null) {
            throw new RuntimeException("您已经报名了该活动");
        }

        // 创建参与者记录
        ActivityParticipantDO participantDO = new ActivityParticipantDO();
        participantDO.setActivityId(activityId);
        participantDO.setUserId(userId);
        participantDO.setAnswer(answer);
        participantDO.setDepositStatus("PENDING");
        participantDO.setDepositAmount(activityDO.getBudgetPerPerson().multiply(new java.math.BigDecimal(0.2)));
        participantDO.setStatus("JOINED");
        activityParticipantMapper.insert(participantDO);

        // 更新活动当前参与人数
        activityDO.setCurrentParticipants(activityDO.getCurrentParticipants() + 1);
        updateById(activityDO);
    }

    @Transactional
    @Override
    public void cancelJoinActivity(Long activityId, Long userId) {
        LambdaQueryWrapper<ActivityParticipantDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ActivityParticipantDO::getActivityId, activityId);
        wrapper.eq(ActivityParticipantDO::getUserId, userId);
        ActivityParticipantDO participantDO = activityParticipantMapper.selectOne(wrapper);
        if (participantDO == null) {
            throw new RuntimeException("您未报名该活动");
        }

        activityParticipantMapper.delete(wrapper);

        // 更新活动当前参与人数
        ActivityDO activityDO = getById(activityId);
        activityDO.setCurrentParticipants(activityDO.getCurrentParticipants() - 1);
        updateById(activityDO);
    }

    @Override
    public void startActivity(Long activityId) {
        ActivityDO activityDO = getById(activityId);
        if (activityDO == null) {
            throw new RuntimeException("活动不存在");
        }
        activityDO.setStatus("ONGOING");
        updateById(activityDO);
    }

    @Override
    public void endActivity(Long activityId) {
        ActivityDO activityDO = getById(activityId);
        if (activityDO == null) {
            throw new RuntimeException("活动不存在");
        }
        activityDO.setStatus("COMPLETED");
        updateById(activityDO);
    }

    @Override
    public void cancelActivity(Long activityId) {
        ActivityDO activityDO = getById(activityId);
        if (activityDO == null) {
            throw new RuntimeException("活动不存在");
        }
        activityDO.setStatus("CANCELLED");
        updateById(activityDO);
    }

}
