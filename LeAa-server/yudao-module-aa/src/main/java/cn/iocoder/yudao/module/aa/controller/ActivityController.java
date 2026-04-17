package cn.iocoder.yudao.module.aa.controller;

import cn.iocoder.yudao.module.aa.service.ActivityService;
import cn.iocoder.yudao.module.aa.vo.ActivityCreateVO;
import cn.iocoder.yudao.module.aa.vo.ActivityQueryVO;
import cn.iocoder.yudao.module.aa.vo.ActivityUpdateVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/aa/activity")
public class ActivityController {

    @Resource
    private ActivityService activityService;

    @PostMapping("/create")
    public Long createActivity(@RequestBody ActivityCreateVO createVO) {
        return activityService.createActivity(createVO);
    }

    @PutMapping("/update/{id}")
    public void updateActivity(@PathVariable Long id, @RequestBody ActivityUpdateVO updateVO) {
        activityService.updateActivity(id, updateVO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }

    @GetMapping("/get/{id}")
    public Object getActivity(@PathVariable Long id) {
        return activityService.getActivity(id);
    }

    @PostMapping("/page")
    public Object pageActivity(@RequestBody ActivityQueryVO queryVO) {
        return activityService.pageActivity(queryVO);
    }

    @PostMapping("/list")
    public Object listActivity(@RequestBody ActivityQueryVO queryVO) {
        return activityService.listActivity(queryVO);
    }

    @PostMapping("/join/{id}")
    public void joinActivity(@PathVariable Long id, @RequestParam Long userId, @RequestParam String answer) {
        activityService.joinActivity(id, userId, answer);
    }

    @PostMapping("/cancel-join/{id}")
    public void cancelJoinActivity(@PathVariable Long id, @RequestParam Long userId) {
        activityService.cancelJoinActivity(id, userId);
    }

    @PostMapping("/start/{id}")
    public void startActivity(@PathVariable Long id) {
        activityService.startActivity(id);
    }

    @PostMapping("/end/{id}")
    public void endActivity(@PathVariable Long id) {
        activityService.endActivity(id);
    }

    @PostMapping("/cancel/{id}")
    public void cancelActivity(@PathVariable Long id) {
        activityService.cancelActivity(id);
    }

}
