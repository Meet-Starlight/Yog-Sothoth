import fs from 'fs';  

export class example extends plugin {  
  constructor() {  
    super({  
      name: "存档",  
      dsc: "存档功能",  
      event: "message",  
      priority: -100,  
      rule: [    
        { reg: "#创建存档", fnc: "createSave" },  
        { reg: "#查看存档", fnc: "viewSave" },  
      ],  
    });  
  }  

  async createSave(e) {  
    const userId = e.user_id; // 获取微信号  
    const savePath = `C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth/save/${userId}.json`;  

    // 初始存档数据  
    const saveData = {  
      "旅馆等级": 0,  
      "旅馆房间数": 1,  
      "房间等级": 1,  
      "山林探索": "未解锁",  
      "矿洞挖掘": "未解锁",  
      "每日客人等级": "普通",  
      "每日客人数量": 1,  
      "最高可获取神谕等级": "2级",  
      "普通神谕数量": 0,  
      "至高神谕数量": 0,  
      "san值": 100,  
      "恶值": 0,  
      "灵魂数": 0,  
      "初始时段": "Week0",  
      "金币数": 1000,  
      "庭院委托数量": 0,  
      "星野商店": "未开放",  
      "旅社开放楼层": 1,  
      "炼金等级": 0,  
      "炼金最高可获得材料品质": "白色",  
      "灵魂炼金": "未开放",  
      "屠杀": "未开放",  
      "员工": ["小叶子 人造人女仆"],  
      "员工好感度": 0  
    };  

    // 将存档数据写入JSON文件  
    fs.writeFile(savePath, JSON.stringify(saveData, null, 2), 'utf8', (err) => {  
      if (err) {  
        console.error(err);  
        e.reply("存档创建失败！");  
      } else {  
        e.reply("存档创建成功，欢迎您继承教授的遗产，努力经营庭院，完成每一次精灵族的评级，距离变回常人还有300天");
      }  
    });  
  }  

  async viewSave(e) {  
    const userId = e.user_id; // 获取微信号  
    const savePath = `C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth/save/${userId}.json`;  

    // 读取存档文件  
    fs.readFile(savePath, 'utf8', (err, data) => {  
      if (err) {  
        console.error(err);  
        e.reply("未找到您的存档！");  
      } else {  
        const saveData = JSON.parse(data);  
        let message = "您的存档信息：\n";  
        for (const [key, value] of Object.entries(saveData)) {  
          message += `${key}：${value}\n`;  
        }  
        e.reply(message);  
      }  
    });  
  }  
}