/*
  网站基础配置。
  修改这里后，上传覆盖同名文件即可生效。

  当前管理员账号：chenyifeng
  当前密码：chenyifeng

  想换密码：
  1. 打开 tools/password.html
  2. 输入新密码，生成 SHA-256
  3. 把下面 passwordHash 替换掉

  提醒：GitHub Pages 是静态网站，登录属于前端门锁，不要放身份证、银行卡、私密照片等敏感内容。
*/
const SITE_CONFIG = {
  siteTitle: "我们的专属网站",
  coupleNames: "陈一峰和老婆",
  anniversaryDate: "2020-05-20",
  footerText: "愿我们把平凡日子过成浪漫长诗。"
};

const SITE_USERS = [
  {
    username: "chenyifeng",
    displayName: "陈一峰",
    role: "admin",
    passwordHash: "b4cf8af27c87226cfbbb811d5d69e29e54e85d153aeb83625e685832df6c2006"
  }
];
