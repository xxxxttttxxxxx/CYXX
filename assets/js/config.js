/*
  网站基础配置。
  修改这里后，上传覆盖同名文件即可生效。

  默认密码：
  me    / 1314520
  wife  / 5201314
  guest / love2026

  想换密码：
  1. 打开 tools/password.html
  2. 输入新密码，生成 SHA-256
  3. 把下面 passwordHash 替换掉
*/
const SITE_CONFIG = {
  siteTitle: "我们的专属网站",
  coupleNames: "我和老婆",
  anniversaryDate: "2020-05-20",
  footerText: "愿我们把平凡日子过成浪漫长诗。"
};

const SITE_USERS = [
  {
    username: "me",
    displayName: "老公",
    role: "admin",
    passwordHash: "48818c6e6eb2ba468317d76accf24e92dd47e6c09c7db349356fad01d834015e"
  },
  {
    username: "wife",
    displayName: "老婆",
    role: "admin",
    passwordHash: "c04d6e34aab689c5c0e68eb51753c843e032efa7c16427f8642ee07ab946e981"
  },
  {
    username: "guest",
    displayName: "亲友",
    role: "guest",
    passwordHash: "dec89333d5dc23daf46cd46f607751ffda0c502c1c469ddd5dfe69b3bf79e7e9"
  }
];
