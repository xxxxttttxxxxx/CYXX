const session = requireLogin();

document.getElementById("siteName").textContent = SITE_CONFIG.siteTitle;
document.title = SITE_CONFIG.siteTitle;
document.getElementById("heroTitle").textContent = SITE_CONTENT.hero.title;
document.getElementById("heroSubtitle").textContent = SITE_CONTENT.hero.subtitle;
document.getElementById("footerText").textContent = SITE_CONFIG.footerText;
document.getElementById("anniversaryText").textContent = `${SITE_CONFIG.coupleNames} · ${SITE_CONFIG.anniversaryDate}`;

const days = Math.max(0, Math.floor((Date.now() - new Date(SITE_CONFIG.anniversaryDate).getTime()) / 86400000));
document.getElementById("daysTogether").textContent = days.toString();

document.getElementById("logoutBtn").addEventListener("click", logout);

const storyList = document.getElementById("storyList");
SITE_CONTENT.story.forEach(item => {
  const div = document.createElement("div");
  div.className = "timeline-item";
  div.innerHTML = `
    <div class="timeline-date">${escapeHtml(item.date)}</div>
    <div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `;
  storyList.appendChild(div);
});

const albumGrid = document.getElementById("albumGrid");
SITE_CONTENT.album.forEach(item => {
  const div = document.createElement("div");
  div.className = "photo";
  div.innerHTML = `
    <img src="${escapeAttribute(item.src)}" alt="${escapeAttribute(item.title)}" onerror="this.style.display='none'">
    <span>${escapeHtml(item.title)}</span>
  `;
  albumGrid.appendChild(div);
});

const diaryList = document.getElementById("diaryList");
SITE_CONTENT.diary.forEach(item => {
  const div = document.createElement("article");
  div.className = "card";
  div.innerHTML = `
    <h3>${escapeHtml(item.title)}</h3>
    <p><strong>${escapeHtml(item.date)}</strong></p>
    <p>${escapeHtml(item.text)}</p>
  `;
  diaryList.appendChild(div);
});

const privateSection = document.getElementById("private");
const privateLink = document.getElementById("privateLink");
if (session.role !== "admin") {
  privateSection.remove();
  privateLink.remove();
} else {
  document.getElementById("privateContent").textContent = SITE_CONTENT.privateText;
}

const messageKey = "love_site_messages_v1";
const messageInput = document.getElementById("messageInput");
const messageBtn = document.getElementById("messageBtn");
const messageList = document.getElementById("messageList");

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(messageKey)) || [];
  } catch {
    return [];
  }
}

function saveMessages(messages) {
  localStorage.setItem(messageKey, JSON.stringify(messages));
}

function renderMessages() {
  messageList.innerHTML = "";
  const messages = loadMessages();
  if (!messages.length) {
    const empty = document.createElement("article");
    empty.className = "card";
    empty.innerHTML = "<p>还没有留言。注意：GitHub Pages 没有数据库，留言只保存在当前浏览器里。</p>";
    messageList.appendChild(empty);
    return;
  }

  messages.slice().reverse().forEach(item => {
    const div = document.createElement("article");
    div.className = "card";
    div.innerHTML = `
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.time)}</p>
      <p>${escapeHtml(item.text)}</p>
    `;
    messageList.appendChild(div);
  });
}

messageBtn.addEventListener("click", () => {
  const text = messageInput.value.trim();
  if (!text) return;
  const messages = loadMessages();
  messages.push({
    name: session.displayName || session.username,
    time: new Date().toLocaleString("zh-CN"),
    text
  });
  saveMessages(messages);
  messageInput.value = "";
  renderMessages();
});

renderMessages();

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, s => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[s]));
}

function escapeAttribute(str) {
  return escapeHtml(str).replace(/`/g, "&#096;");
}
