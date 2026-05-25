# love you thousand years

这是 GitHub Pages 直接上传版，不用服务器，不用 PHP，不用数据库，不用 npm。

## 当前内容

- 网站标题：love you thousand years
- 名字：徐腾啸 × 陈意峰
- 纪念日：2026.02.11
- 风格：温柔粉色系 + 高级奶油风
- 已加入：故事时间线、重要日期、相册、日记、愿望清单、给陈意峰的一封信、私密空间、留言墙

## 登录账号

账号按你提供的信息配置在：

```text
assets/js/config.js
```

为了安全，README 不直接公开写密码。你如果要改账号密码，也是在 `assets/js/config.js` 里改。

## 怎么上传

解压后，不要上传外层文件夹。进入文件夹里面，选中这些内容上传到 GitHub 仓库根目录：

```text
assets
index.html
home.html
tools
uploads
README.md
.nojekyll
CNAME
```

上传后点 `Commit changes`，等 1 到 3 分钟刷新网站。

## 怎么改内容

改基础信息、账号：

```text
assets/js/config.js
```

改故事、日记、相册、愿望、文案：

```text
assets/js/content.js
```

改颜色和排版：

```text
assets/css/style.css
```

上传照片：

```text
uploads/album/
```

然后在 `assets/js/content.js` 里把图片路径改成对应文件名。

## 重要提醒

GitHub Pages 是静态网站，登录只是前端门锁，不是服务器级私密系统。不要上传身份证、银行卡、非常私密照片、真实隐私文件。
