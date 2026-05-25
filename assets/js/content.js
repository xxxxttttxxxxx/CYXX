/*
  网站内容配置。
  改文字、加故事、加日记、加相册，主要改这里。
*/

const SITE_CONTENT = {
  hero: {
    title: "这里是只属于我们的星球",
    subtitle: "记录我们的故事、旅行、日常、纪念日，以及每一个值得被好好保存的瞬间。"
  },

  story: [
    {
      date: "2020-05-20",
      title: "故事开始的那一天",
      text: "把这里改成你们第一次认识、第一次约会或者确定关系的故事。"
    },
    {
      date: "2021-02-14",
      title: "第一次认真准备的惊喜",
      text: "这里可以写情人节、生日、旅行或任何你想保存的回忆。"
    },
    {
      date: "2024-10-01",
      title: "一起走过更远的地方",
      text: "把你们一起旅行、搬家、结婚、生活中的重要节点写进来。"
    }
  ],

  album: [
    {
      title: "我们的第一张照片",
      src: "uploads/album/photo1.jpg"
    },
    {
      title: "一次很开心的旅行",
      src: "uploads/album/photo2.jpg"
    },
    {
      title: "普通但珍贵的一天",
      src: "uploads/album/photo3.jpg"
    }
  ],

  diary: [
    {
      date: "2026-01-01",
      title: "新的一年",
      text: "新年第一篇日记，可以写你想对她说的话。"
    },
    {
      date: "2026-02-14",
      title: "今天也很爱你",
      text: "把这里改成你的日常记录。"
    }
  ],

  privateText: "这里默认只有 admin 角色登录后显示。适合写只给你和老婆看的话。注意：GitHub Pages 是静态网站，不要放真正敏感的隐私资料。"
};
