# Love Site - GitHub Pages 直接上传版

这是纯静态网站包，适合 GitHub Pages。
不用云服务器，不用 PHP，不用数据库，不用 npm，不用编译。

## 重要限制

GitHub Pages 是静态网站托管，只托管 HTML、CSS、JavaScript 文件。
这个版本的“登录”是前端门锁，适合防止普通访客随手进入，但不等于真正的服务器级账号系统。

不要把身份证、银行卡、隐私照、私密文件放进公开 GitHub Pages 仓库。

## 默认账号

- 账号：me，密码：1314520，角色：admin
- 账号：wife，密码：5201314，角色：admin
- 账号：guest，密码：love2026，角色：guest

上线后请修改 `assets/js/config.js` 里的用户密码哈希。

## 修改网站内容

- 网站标题、纪念日、账号：`assets/js/config.js`
- 首页文字、故事、日记、相册图片列表：`assets/js/content.js`
- 样式：`assets/css/style.css`
- 照片：放到 `uploads/album/`

## GitHub Pages 上传步骤

1. GitHub 新建仓库，例如：`love-site`
2. 上传本文件夹内所有文件，不要只上传 zip
3. 仓库 Settings → Pages
4. Source 选择 Deploy from a branch
5. Branch 选择 main，Folder 选择 /(root)，Save
6. 等 1-3 分钟
7. 打开 `https://你的GitHub用户名.github.io/love-site/`

## 绑定自己的域名

在仓库 Settings → Pages → Custom domain 填你的域名。
然后去域名 DNS 管理处设置：

如果用 www：
- 类型：CNAME
- 主机记录：www
- 值：你的GitHub用户名.github.io

如果用根域名：
- 类型：A
- 主机记录：@
- 值：GitHub Pages 官方 IP

以 GitHub Docs 当前页面为准。
