// ── Usuarios de la demo ───────────────────────────────────────────────────
const USERS = [
  { username: "admin",  password: "upp2025",  role: "admin",  name: "Administrador" },
  { username: "viewer", password: "nube123",  role: "viewer", name: "Visitante" }
];

const SESSION_KEY = "cloud_gallery_session";

// ── Helpers ───────────────────────────────────────────────────────────────
function saveSession(user) {
  const session = { username: user.username, role: user.role, name: user.name, ts: Date.now() };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  const session = JSON.parse(raw);
  // Expira en 2 horas
  if (Date.now() - session.ts > 2 * 60 * 60 * 1000) {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session;
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

function requireAuth() {
  const session = getSession();
  if (!session) {
    window.location.href = "login.html";
    return null;
  }
  return session;
}

function login(username, password) {
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return false;
  saveSession(user);
  return true;
}
