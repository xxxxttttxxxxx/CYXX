const SESSION_KEY = "love_site_session_v1";

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function login(username, password) {
  const user = SITE_USERS.find(u => u.username === username);
  if (!user) return false;

  const hash = await sha256(password);
  if (hash !== user.passwordHash) return false;

  localStorage.setItem(SESSION_KEY, JSON.stringify({
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    loginAt: new Date().toISOString()
  }));
  return true;
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

function requireLogin() {
  const session = getSession();
  if (!session) location.href = "./index.html";
  return session;
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.href = "./index.html";
}
