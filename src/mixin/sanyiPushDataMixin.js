/*
 * @Author: duanhuaqing
 * @Date: 2022-08-23 09:15:02
 * @LastEditTime: 2022-12-08 15:59:47
 * @Description: mq推送数据 混合
 */
import {
  MQTT_EXCHANGE,
  MQTT_PASSWORD,
  MQTT_SERVICE,
  MQTT_USERNAME,
  MQTT_VIRTUAL_HOSR,
} from "@/config/mqtt";
import { fetchCustomList } from "@/api/LargeScreen";
import Stomp from "stompjs";
import * as service from "@/api/sanyi/sanyi";
export default {
  data() {
    return {};
  },
  async created() {
    await this.getCustomList();
  },
  methods: {
    // 连接MQTT
    connect() {
      this.client = Stomp.client(MQTT_SERVICE);
      const headers = {
        login: MQTT_USERNAME,
        passcode: MQTT_PASSWORD,
        host: MQTT_VIRTUAL_HOSR,
      };
      this.client.debug = null; //调试
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
    // 连接上MQTT
    onConnected(frame) {
      const headers = {
        durable: false, //持久化
        autoDelete: true, //是否自动删除
        exclusive: false,
      };
      this.client.subscribe(MQTT_EXCHANGE, this.responseCallback, headers);
    },
    // 设备状态统计
    async initEquipmentStatus() {
      try {
        let params = {
          departId: this.departId,
        };
        const { result, success } = await service.selectEquipmentRtStatus(
          params
        );
        if (!success) {
          this.$message.warning(res.message);
          return;
        }
        if (!result) {
          return;
        }
        this.equipmentList = result.masterList;
        this.cncList = result.statusList;
        this.equipmentList = this.equipmentList.reduce((acc, item) => {
          // 组合单双控制器数据，并且将自定义状态的字段一并组合
          const statusArr = this.cncList
            .filter((i) => {
              return i.equipmentId === item.code;
            })
            .map((i) => ({
              ...i,
              ...this.statusCardList.find((j) => j.statusCode === i.statusCode),
            }));
          // 获取多控制器最小权重值，状态优先级设置 statusPriority: 越小权重越高
          const minStatusPriority = Math.min.apply(
            Math,
            statusArr.map((i) => i.statusPriority)
          );
          // 根据最小权重值取当前显示对象
          const statusItem = statusArr.find(
            (i) => i.statusPriority === minStatusPriority
          );
          // 解构赋值
          const {
            statusCode,
            statusName,
            cncId = "",
            statusPriority,
            displayColor,
          } = statusItem;
          acc.push({
            ...item,
            cncId,
            statusCode,
            cncStatusCode: statusCode,
            statusName,
            displayColor,
            statusPriority,
            controllNumber: statusArr.length,
          });
          return acc;
        }, []);
        console.log("this.equipmentList.length", this.equipmentList.length);
        this.equTotal = this.equipmentList.length;
        this.setStatusCardList();
      } catch (error) {}
    },
    async getCustomList() {
      const { result } = await fetchCustomList({});
      const statusCardList = [
        {
          key: "run_count",
          prop: "run",
          name: "运行",
          total: 0,
          textColor: "#000304",
          borderColor: "transparent #47F63F",
          bgColor: "#47F63F",
          statusCode: 1,
          imgUrl1: require("@/assets/wuhanShip/yunxing1.png"),
          imgUrl2: require("@/assets/wuhanShip/yunxing2.png"),
        },
        {
          key: "std_count",
          prop: "downtime",
          name: "待机",
          total: 0,
          textColor: "#000304",
          borderColor: "transparent #FAAD14",
          bgColor: "#FAAD14",
          statusCode: 2,
          imgUrl1: require("@/assets/wuhanShip/daiji1.png"),
          imgUrl2: require("@/assets/wuhanShip/daiji2.png"),
        },
        {
          key: "alarm_count",
          prop: "fault",
          name: "报警",
          total: 0,
          textColor: "#000304",
          borderColor: "transparent #FF3552",
          bgColor: "#FF3552",
          statusCode: 3,
          imgUrl1: require("@/assets/wuhanShip/baojing1.png"),
          imgUrl2: require("@/assets/wuhanShip/baojing2.png"),
        },
        {
          key: "stop_count",
          prop: "standby",
          name: "停机",
          total: 0,
          textColor: "#86bdff",
          borderColor: "transparent #474D58",
          bgColor: "#474D58",
          statusCode: 4,
          imgUrl1: require("@/assets/wuhanShip/tingji1.png"),
          imgUrl2: require("@/assets/wuhanShip/tingji2.png"),
        },
      ];
      this.statusCardList = result
        .map((item) => ({
          ...statusCardList.find((i) => i.statusCode === item.statusCode),
          ...item,
        }))
        .filter(
          (item) =>
            item.statusCode === 1 ||
            item.statusCode === 2 ||
            item.statusCode === 3 ||
            item.statusCode === 4
        );
    },
    // testMqPushData() {
    //   // 测试数据勿动
    //   return {
    //     type: "STATUS",
    //     data: {
    //       cncId: "FC_3C7B5D01E491ED085E31C3894B92C468",
    //       controllerId: "100300130046",
    //       controllerName: "100300130046",
    //       dtuId: "FB-A002-BF97E39",
    //       equipmentId: "100300130046",
    //       statusCode: Math.floor(Math.random() * (4 - 1 + 1)) + 1,
    //       tenantId: 1002,
    //     },
    //   };
    // },
    //接收消息
    // responseCallback(frame) {
    //   if (!frame || !frame.body) return;
    //   let result = JSON.parse(frame.body);
    //   if (!result) return;
    //   // result = this.testMqPushData() //  打开则Mock测试MQ推送状态（仅限三花租户）
    //   const { type, data } = result;
    //   /*
    //     type:
    //       YIELD: 产量
    //       EFFICIENCY: 效能
    //       PARAM 参数
    //       STATUS 状态
    //       WORK_ORDER: 工单提醒（奥的斯大屏）
    //     data: 数据
    //   */
    //   switch (type) {
    //     case "STATUS":
    //       console.log("STATUS", data);
    //       result = this.testMqPushData(); //  打开则Mock测试MQ推送状态（仅限三花租户）
    //       this.equipmentList.forEach((item, index) => {
    //         if (
    //           item.cncId === data.cncId &&
    //           item.cncStatusCode !== data.statusCode
    //         ) {
    //           const { statusCode, statusName, statusPriority, displayColor } =
    //             this.statusCardList.find(
    //               (i) => i.statusCode === data.statusCode
    //             );
    //           if (item.axisNumber && Number(item.axisNumber) > 1) {
    //             if (statusPriority < item.statusPriority) {
    //               item.cncStatusCode = statusCode;
    //               item.statusName = statusName;
    //               item.name = statusName;
    //               item.displayColor = displayColor;
    //               item.statusPriority = statusPriority;
    //             }
    //           } else {
    //             item.cncStatusCode = statusCode;
    //             item.statusName = statusName;
    //             item.name = statusName;
    //             item.displayColor = displayColor;
    //             item.statusPriority = statusPriority;
    //           }
    //           // 武汉船舶大屏需要刷新列表
    //           if (this.screenType === "wuhanShip") {
    //             this.getCenter2Data();
    //           }
    //         }
    //       });
    //       // 合本大屏需要设备消息
    //       if (this.screenType === "hebenScreen") {
    //         this.equipmentMessage = { ...data };
    //       }
    //       this.setStatusCardList(true);
    //       break;
    //     case "PARAM":
    //       break;
    //     case "YIELD":
    //       break;
    //     case "EFFICIENCY":
    //       break;
    //   }

    //   // 奥的斯大屏需要添加工单提醒
    //   if (this.screenType === "otisScreen") {
    //     if (type === "WORK_ORDER") {
    //       this.$message({ message: data, type: "warning", duration: 5000 });
    //     }
    //   }
    // },
    setStatusCardList() {
      this.statusCardList = this.statusCardList.map((item) => ({
        ...item,
        total: item.statusCode === -1 ? item.total : 0,
      }));
      for (const [index1, item1] of this.equipmentList.entries()) {
        for (const [index2, item2] of this.statusCardList.entries()) {
          if (item1.cncStatusCode === item2.statusCode) {
            item1.displayColor = item2.displayColor;
            item2.total = item2.total === 0 ? 1 : item2.total + 1;
          }
        }
      }
    },
    //链接失败
    onFailed(frame) {
      console.log("MQ 链接失败: " + frame);
    },
    //释放连接队列
    disconnect() {
      if (this.client) {
        this.client.disconnect();
      }
    },
  },
};
