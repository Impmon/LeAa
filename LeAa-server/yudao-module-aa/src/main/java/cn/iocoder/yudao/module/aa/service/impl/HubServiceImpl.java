package cn.iocoder.yudao.module.aa.service.impl;

import cn.iocoder.yudao.module.aa.dal.entity.HubDO;
import cn.iocoder.yudao.module.aa.dal.entity.HubMemberDO;
import cn.iocoder.yudao.module.aa.dal.entity.HubTagDO;
import cn.iocoder.yudao.module.aa.dal.mapper.HubMapper;
import cn.iocoder.yudao.module.aa.dal.mapper.HubMemberMapper;
import cn.iocoder.yudao.module.aa.dal.mapper.HubTagMapper;
import cn.iocoder.yudao.module.aa.service.HubService;
import cn.iocoder.yudao.module.aa.vo.HubCreateVO;
import cn.iocoder.yudao.module.aa.vo.HubQueryVO;
import cn.iocoder.yudao.module.aa.vo.HubUpdateVO;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class HubServiceImpl extends ServiceImpl<HubMapper, HubDO> implements HubService {

    private final HubMemberMapper hubMemberMapper;
    private final HubTagMapper hubTagMapper;

    public HubServiceImpl(HubMemberMapper hubMemberMapper, HubTagMapper hubTagMapper) {
        this.hubMemberMapper = hubMemberMapper;
        this.hubTagMapper = hubTagMapper;
    }

    @Transactional
    @Override
    public Long createHub(HubCreateVO createVO) {
        HubDO hubDO = new HubDO();
        BeanUtils.copyProperties(createVO, hubDO);
        hubDO.setMembers(0);
        save(hubDO);

        // 添加标签
        if (createVO.getTags() != null && !createVO.getTags().isEmpty()) {
            for (String tag : createVO.getTags()) {
                HubTagDO tagDO = new HubTagDO();
                tagDO.setHubId(hubDO.getId());
                tagDO.setTag(tag);
                hubTagMapper.insert(tagDO);
            }
        }

        return hubDO.getId();
    }

    @Transactional
    @Override
    public void updateHub(Long id, HubUpdateVO updateVO) {
        HubDO hubDO = getById(id);
        if (hubDO == null) {
            throw new RuntimeException("据点不存在");
        }
        BeanUtils.copyProperties(updateVO, hubDO);
        updateById(hubDO);

        // 更新标签
        if (updateVO.getTags() != null) {
            // 删除旧标签
            LambdaQueryWrapper<HubTagDO> wrapper = new LambdaQueryWrapper<>();
            wrapper.eq(HubTagDO::getHubId, id);
            hubTagMapper.delete(wrapper);

            // 添加新标签
            for (String tag : updateVO.getTags()) {
                HubTagDO tagDO = new HubTagDO();
                tagDO.setHubId(id);
                tagDO.setTag(tag);
                hubTagMapper.insert(tagDO);
            }
        }
    }

    @Override
    public void deleteHub(Long id) {
        removeById(id);
    }

    @Override
    public HubDO getHub(Long id) {
        return getById(id);
    }

    @Override
    public IPage<HubDO> pageHub(HubQueryVO queryVO) {
        LambdaQueryWrapper<HubDO> wrapper = new LambdaQueryWrapper<>();
        if (queryVO.getName() != null) {
            wrapper.like(HubDO::getName, queryVO.getName());
        }
        if (queryVO.getLocation() != null) {
            wrapper.like(HubDO::getLocation, queryVO.getLocation());
        }
        if (queryVO.getCreatorId() != null) {
            wrapper.eq(HubDO::getCreatorId, queryVO.getCreatorId());
        }
        Page<HubDO> page = new Page<>(queryVO.getPageNo(), queryVO.getPageSize());
        return page(page, wrapper);
    }

    @Override
    public List<HubDO> listHub(HubQueryVO queryVO) {
        LambdaQueryWrapper<HubDO> wrapper = new LambdaQueryWrapper<>();
        if (queryVO.getName() != null) {
            wrapper.like(HubDO::getName, queryVO.getName());
        }
        if (queryVO.getLocation() != null) {
            wrapper.like(HubDO::getLocation, queryVO.getLocation());
        }
        if (queryVO.getCreatorId() != null) {
            wrapper.eq(HubDO::getCreatorId, queryVO.getCreatorId());
        }
        return list(wrapper);
    }

    @Transactional
    @Override
    public void joinHub(Long hubId, Long userId) {
        HubDO hubDO = getById(hubId);
        if (hubDO == null) {
            throw new RuntimeException("据点不存在");
        }

        // 检查是否已经加入
        LambdaQueryWrapper<HubMemberDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HubMemberDO::getHubId, hubId);
        wrapper.eq(HubMemberDO::getUserId, userId);
        HubMemberDO existingMember = hubMemberMapper.selectOne(wrapper);
        if (existingMember != null) {
            throw new RuntimeException("您已经加入了该据点");
        }

        // 创建成员记录
        HubMemberDO memberDO = new HubMemberDO();
        memberDO.setHubId(hubId);
        memberDO.setUserId(userId);
        hubMemberMapper.insert(memberDO);

        // 更新据点成员数量
        hubDO.setMembers(hubDO.getMembers() + 1);
        updateById(hubDO);
    }

    @Transactional
    @Override
    public void leaveHub(Long hubId, Long userId) {
        LambdaQueryWrapper<HubMemberDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HubMemberDO::getHubId, hubId);
        wrapper.eq(HubMemberDO::getUserId, userId);
        HubMemberDO memberDO = hubMemberMapper.selectOne(wrapper);
        if (memberDO == null) {
            throw new RuntimeException("您未加入该据点");
        }

        hubMemberMapper.delete(wrapper);

        // 更新据点成员数量
        HubDO hubDO = getById(hubId);
        hubDO.setMembers(hubDO.getMembers() - 1);
        updateById(hubDO);
    }

    @Override
    public void addHubTag(Long hubId, String tag) {
        HubDO hubDO = getById(hubId);
        if (hubDO == null) {
            throw new RuntimeException("据点不存在");
        }

        // 检查标签是否已存在
        LambdaQueryWrapper<HubTagDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HubTagDO::getHubId, hubId);
        wrapper.eq(HubTagDO::getTag, tag);
        HubTagDO existingTag = hubTagMapper.selectOne(wrapper);
        if (existingTag != null) {
            throw new RuntimeException("标签已存在");
        }

        HubTagDO tagDO = new HubTagDO();
        tagDO.setHubId(hubId);
        tagDO.setTag(tag);
        hubTagMapper.insert(tagDO);
    }

    @Override
    public void removeHubTag(Long hubId, String tag) {
        LambdaQueryWrapper<HubTagDO> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HubTagDO::getHubId, hubId);
        wrapper.eq(HubTagDO::getTag, tag);
        hubTagMapper.delete(wrapper);
    }

}
