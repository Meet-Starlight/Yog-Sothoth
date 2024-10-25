// 神谕占卜
import fs from 'fs';
export class example extends plugin {
  constructor() {
    super({
      name: "CG",
      dsc: "随机CG",
      event: "message",
      priority: -100,
      rule: [
        { reg: "#神谕占卜", fnc: "divination" },
      ],
    });

    this.cards = JSON.parse(
      fs.readFileSync("C:\\Users\\Administrator\\Desktop\\wuyi\\yunzai\\Yunzai\\plugins\\Yog-Sothoth\\config\\神谕.json", "utf-8")
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

    setTimeout(() => {
      let response = "";
      selectedCards.forEach((card, index) => {
        response += `${index + 1}: 卡牌名 ${card.name}\n效果 ${
          card.Effect
        }\n描述 ${card.Description}\n\n`;
      });
      e.reply(response);
    }, 1000);
  }

  getAvailableCards() {
    return Object.keys(this.cards)
      .filter((key) => key.includes("一星") || key.includes("二星"))
      .map((key) => ({ name: key, ...this.cards[key] }));
  }
}
