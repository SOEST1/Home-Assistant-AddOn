# Home-Assistant-AddOn

## 通过 Add-on 安装

-   参考[Wiki](https://gitee.com/eWeLink/Home-Assistant-AddOn/wikis/%E4%BD%BF%E7%94%A8%E7%AE%80%E4%BB%8B?sort_id=3862199)

## 通过 Docker 安装

-   **使用 host 网络用于发现和控制 DIY 和局域网设备**
-   **暂不支持端口映射，请确保宿主机的 3000 端口处于空闲状态**

1. `git clone https://gitee.com/eWeLink/Home-Assistant-AddOn.git`
2. `cd Home-Assistant-AddOn/eWeLink_Smart_Home/`
3. `docker build . -t ewelink_smart_home`
4. 运行以下代码，将`yourHomeAssistantUrl`替换成当前网络下的 HomeAssistant 地址

```
docker run -d \
    --restart=always \
    --network host \
    -e HA_URL=yourHomeAssistantUrl \
    ewelink_smart_home
```

-   示例

```
  docker run -d \
  --restart=always \
  --network host \
  -e HA_URL=http://192.168.1.100:8123 \
  ewelink_smart_home
```

5. 访问`3000`端口
