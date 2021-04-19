# Home-Assistant-AddOn

## 通过 Docker 安装

-   **使用 host 网络用于发现和控制 DIY 和局域网设备**
-   **暂不支持端口映射，请确保 3000 端口空闲**

1. `git clone https://gitee.com/eWeLink/Home-Assistant-AddOn.git`
2. `cd Home-Assistant-AddOn/eWeLink_Smart_Home/`
3. `docker build . -t ewelink_smart_home`
4. 运行以下代码，将`yourHomeAssistantUrl`替换成当前网络下的 HomeAssistant 地址，将`yourHomeAssistantAuth`替换成您在 HA 里创建的长期令牌

```
docker run -d \
    --restart=always \
    --network host \
    -e HA_URL=yourHomeAssistantUrl \
    -e AUTH=yourHomeAssistantAuth \
    ewelink_smart_home
```

5. 访问`3000`端口
