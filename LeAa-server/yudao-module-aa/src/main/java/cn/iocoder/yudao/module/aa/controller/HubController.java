package cn.iocoder.yudao.module.aa.controller;

import cn.iocoder.yudao.module.aa.service.HubService;
import cn.iocoder.yudao.module.aa.vo.HubCreateVO;
import cn.iocoder.yudao.module.aa.vo.HubQueryVO;
import cn.iocoder.yudao.module.aa.vo.HubUpdateVO;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping("/api/aa/hub")
public class HubController {

    @Resource
    private HubService hubService;

    @PostMapping("/create")
    public Long createHub(@RequestBody HubCreateVO createVO) {
        return hubService.createHub(createVO);
    }

    @PutMapping("/update/{id}")
    public void updateHub(@PathVariable Long id, @RequestBody HubUpdateVO updateVO) {
        hubService.updateHub(id, updateVO);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteHub(@PathVariable Long id) {
        hubService.deleteHub(id);
    }

    @GetMapping("/get/{id}")
    public Object getHub(@PathVariable Long id) {
        return hubService.getHub(id);
    }

    @PostMapping("/page")
    public Object pageHub(@RequestBody HubQueryVO queryVO) {
        return hubService.pageHub(queryVO);
    }

    @PostMapping("/list")
    public Object listHub(@RequestBody HubQueryVO queryVO) {
        return hubService.listHub(queryVO);
    }

    @PostMapping("/join/{id}")
    public void joinHub(@PathVariable Long id, @RequestParam Long userId) {
        hubService.joinHub(id, userId);
    }

    @PostMapping("/leave/{id}")
    public void leaveHub(@PathVariable Long id, @RequestParam Long userId) {
        hubService.leaveHub(id, userId);
    }

    @PostMapping("/add-tag/{id}")
    public void addHubTag(@PathVariable Long id, @RequestParam String tag) {
        hubService.addHubTag(id, tag);
    }

    @PostMapping("/remove-tag/{id}")
    public void removeHubTag(@PathVariable Long id, @RequestParam String tag) {
        hubService.removeHubTag(id, tag);
    }

}
