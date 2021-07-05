# eWeLink Smart Home

## Help

-   如果遇到`Failed to call service switch/turn_on. Service not found.`的问题。建议使用 HomeAssistant 自带的 Addon`File editor`编辑`configuration.yaml`。在文件尾部追加以下内容：

```
switch:
  - platform: template
    switches:
      ewelink_virtual_switch:
        turn_on:
          service: switch.turn_on
        turn_off:
          service: switch.turn_off

```

---

-   如果遇到`Failed to call service cover.open_cover. Service not found.`的问题。建议使用 HomeAssistant 自带的 Addon`File editor`编辑`configuration.yaml`。在文件尾部追加以下内容：

```
cover:
  - platform: template
    covers:
      ewelink_virtual_cover:
        open_cover:
          service: cover.open_cover
        close_cover:
          service: cover.close_cover
        stop_cover:
          service: cover.stop_cover
        set_cover_position:
          service: cover.set_cover_position
```

保存成功后重启 HomeAssistant 即可
