// 随机一张官方CG图或二创
import fs from 'fs';
import path from 'path';

export class example extends plugin {
  constructor() {
    super({
      name: 'CG',
      dsc: '随机CG',
      event: 'message',
      priority: -100,
      rule: [{
        reg: "#随机CG",
        fnc: 'cg'
      }]
    });
  }

  async cg(e) {
    const dir = 'C:\\Users\\Administrator\\Desktop\\wuyi\\yunzai\\Yunzai\\plugins\\Yog-Sothoth\\resources\\img';
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.error('读取图片目录失败: ', err);
        return;
      }

      // 筛选出图片文件（可根据后缀名进行筛选）  
      const images = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));
      if (images.length === 0) {
        this.reply('没有找到任何图片！');
        return;
      }

      const randomImage = images[Math.floor(Math.random() * images.length)];
      const imgPath = path.join(dir, randomImage);

      e.reply(segment.image(imgPath));
    });
  }
}
