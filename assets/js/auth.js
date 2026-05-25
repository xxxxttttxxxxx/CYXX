const SESSION_KEY = "love_site_session_v1";

async function sha256(text) {
  // HTTPS / github.io 环境优先使用浏览器原生加密；HTTP 环境自动降级为内置算法。
  if (window.crypto && crypto.subtle && window.TextEncoder) {
    try {
      const data = new TextEncoder().encode(text);
      const hash = await crypto.subtle.digest("SHA-256", data);
      return [...new Uint8Array(hash)].map(b => b.toString(16).padStart(2, "0")).join("");
    } catch (e) {
      // 某些 http 自定义域名下 crypto.subtle 不可用，继续使用 fallback。
    }
  }
  return sha256Fallback(text);
}

function utf8Bytes(str) {
  if (typeof TextEncoder !== "undefined") return Array.from(new TextEncoder().encode(str));
  const encoded = unescape(encodeURIComponent(str));
  return Array.from(encoded).map(ch => ch.charCodeAt(0));
}

function rotr(x, n) {
  return (x >>> n) | (x << (32 - n));
}

function sha256Fallback(str) {
  const K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  let H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
  const bytes = utf8Bytes(str);
  const bitLen = bytes.length * 8;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) bytes.push(0);
  // 当前密码长度远小于 2^32 bit，高 32 位填 0。
  bytes.push(0,0,0,0);
  bytes.push((bitLen >>> 24) & 255, (bitLen >>> 16) & 255, (bitLen >>> 8) & 255, bitLen & 255);

  for (let chunk = 0; chunk < bytes.length; chunk += 64) {
    const w = new Array(64);
    for (let i = 0; i < 16; i++) {
      const j = chunk + i * 4;
      w[i] = ((bytes[j] << 24) | (bytes[j+1] << 16) | (bytes[j+2] << 8) | bytes[j+3]) >>> 0;
    }
    for (let i = 16; i < 64; i++) {
      const s0 = (rotr(w[i-15], 7) ^ rotr(w[i-15], 18) ^ (w[i-15] >>> 3)) >>> 0;
      const s1 = (rotr(w[i-2], 17) ^ rotr(w[i-2], 19) ^ (w[i-2] >>> 10)) >>> 0;
      w[i] = (w[i-16] + s0 + w[i-7] + s1) >>> 0;
    }

    let [a,b,c,d,e,f,g,h] = H;
    for (let i = 0; i < 64; i++) {
      const S1 = (rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25)) >>> 0;
      const ch = ((e & f) ^ (~e & g)) >>> 0;
      const temp1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
      const S0 = (rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22)) >>> 0;
      const maj = ((a & b) ^ (a & c) ^ (b & c)) >>> 0;
      const temp2 = (S0 + maj) >>> 0;

      h = g; g = f; f = e; e = (d + temp1) >>> 0;
      d = c; c = b; b = a; a = (temp1 + temp2) >>> 0;
    }

    H[0] = (H[0] + a) >>> 0;
    H[1] = (H[1] + b) >>> 0;
    H[2] = (H[2] + c) >>> 0;
    H[3] = (H[3] + d) >>> 0;
    H[4] = (H[4] + e) >>> 0;
    H[5] = (H[5] + f) >>> 0;
    H[6] = (H[6] + g) >>> 0;
    H[7] = (H[7] + h) >>> 0;
  }

  return H.map(x => x.toString(16).padStart(8, "0")).join("");
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
