# eWeLink Smart Home

## Help

-   如果遇到`Failed to call service switch/turn_on. Service not found.`的问题。建议使用`File editor`编辑`configuration.yaml`。在文件尾部追加以下内容：

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
