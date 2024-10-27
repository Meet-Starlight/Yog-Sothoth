import puppeteer from "../../../lib/puppeteer/puppeteer.js";
import { resources } from '../model/path.js';
import fs from "fs";

export class example extends plugin {
  constructor() {
    super({
      name: "神谕",
      dsc: "随机神谕",
      event: "message",
      priority: -100,
      rule: [{ reg: "#神谕占卜", fnc: "divination" }],
    });

    // 加载 JSON 文件
    this.cards = JSON.parse(
      fs.readFileSync(
        `C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth/config/神谕.json`,
        "utf-8"
      )
    );
    this.selectedDivinations = [];
  }

  async divination(e) {
    e.reply("占卜有风险，算命需谨慎.....");

    const availableCards = this.getAvailableCards();
    if (availableCards.length < 3) {
      e.reply("没有足够的卡牌供选择。");
      return;
    }

    const selectedCards = [];
    while (selectedCards.length < 3) {
      const randomIndex = Math.floor(Math.random() * availableCards.length);
      const card = availableCards[randomIndex];

      if (!selectedCards.some((selected) => selected.Effect === card.Effect)) {
        selectedCards.push(card);
      }
    }

    // 准备渲染数据
    const data = {
      cards: selectedCards.map((card) => {
        return {
          name: card.name,
          text: card.Effect,
          span: card.main,
          data: card.Description,
          // img: card.img,
        };
      }),
    };

    //截取渲染后的HTML页面截图
    let img = await puppeteer.screenshot("神谕占卜图", {
      tplFile: `C:/Users/Administrator/Desktop/wuyi/yunzai/Yunzai/plugins/Yog-Sothoth/resources/HTML/zhanbu.html`,
      // tplFile: `${resources}/HTML/zhanbu.html`,
      imgType: "png",
      quality: 100,
      data: data,
    });

    // 发送截图
    await e.reply(img);
  }

  getAvailableCards() {
    return Object.keys(this.cards)
      .filter((key) => key.includes("一星") || key.includes("二星"))
      .map((key) => ({ name: key, ...this.cards[key] }));
  }
}
