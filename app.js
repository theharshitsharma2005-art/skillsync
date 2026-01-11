// Version: demo-seed-v2

/* SkillSync MVP (Game UI)
   - Default storage: localStorage
   - Optional Google Sign-in: Firebase Auth (if configured)
*/


const STORAGE_KEY = "skillsync_players_v1";
const AUTH_KEY = "skillsync_auth_v1";

/** -------- Demo data (ONLY 3 as requested) -------- */
const DEMO_PLAYERS = [
  {
    id: "demo-jaivardhan",
    name: "Jaivardhan Singh",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Frontend-focused builder who likes fast prototypes and clean UI systems.",
    skills: ["React", "UI/UX", "JavaScript", "Figma"],
    interests: ["Hackathons", "Open Source", "Product Design"],
    availability: "6–8 hrs/week",
    source: "demo"
  },
  {
    id: "demo-priyansh",
    name: "Priyansh Tiwari",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Execution-first teammate who enjoys shipping MVPs and pitching ideas.",
    skills: ["DSA", "Frontend", "Firebase", "Pitching"],
    interests: ["Hackathons", "Startups", "AI"],
    availability: "8–12 hrs/week",
    source: "demo"
  },
  {
    id: "demo-harshit",
    name: "Harshit Sharma",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Backend-leaning problem solver focused on scalable systems and teamwork.",
    skills: ["Node.js", "APIs", "Database", "Git"],
    interests: ["System Design", "Web Dev", "Competitive Coding"],
    availability: "6–8 hrs/week",
    source: "demo"
  },

  // 🔽 NEW DEMO PLAYERS 🔽

  {
    id: "demo-aditya",
    name: "Aditya Agarwal",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Logic-driven programmer with strong interest in algorithms and clean code.",
    skills: ["C++", "DSA", "Problem Solving"],
    interests: ["Competitive Coding", "Hackathons"],
    availability: "6–8 hrs/week",
    source: "demo"
  },
  {
    id: "demo-rajat",
    name: "Rajat Mittal",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Curious learner exploring backend systems and API integrations.",
    skills: ["Java", "APIs", "MySQL"],
    interests: ["Backend Dev", "Startups"],
    availability: "5–7 hrs/week",
    source: "demo"
  },
  {
    id: "demo-ayush",
    name: "Ayush Pandia",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Creative thinker interested in UI design and frontend development.",
    skills: ["HTML", "CSS", "JavaScript"],
    interests: ["Web Design", "UI/UX"],
    availability: "6–8 hrs/week",
    source: "demo"
  },
  {
    id: "demo-antima",
    name: "Antima Acharya",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Detail-oriented team player with interest in databases and testing.",
    skills: ["SQL", "Testing", "Documentation"],
    interests: ["Quality Assurance", "Databases"],
    availability: "4–6 hrs/week",
    source: "demo"
  },
  {
    id: "demo-khushi",
    name: "Khushi Maurya",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Product-minded learner passionate about design thinking and teamwork.",
    skills: ["Figma", "UI Research", "Presentation"],
    interests: ["Product Design", "Startups"],
    availability: "6–8 hrs/week",
    source: "demo"
  },
  {
    id: "demo-jasmine",
    name: "Jasmine Sharma",
    college: "BIT Mesra, Jaipur Campus",
    year: "1st Year",
    branch: "CSE",
    bio: "Tech enthusiast exploring AI concepts and Python programming.",
    skills: ["Python", "Basics of ML", "Data Analysis"],
    interests: ["Artificial Intelligence", "Learning"],
    availability: "7–9 hrs/week",
    source: "demo"
  }
];

/** -------- Teams demo (no fake stats) -------- */
const DEMO_TEAMS = [
  {
    id: "team-alpha",
    name: "Team Alpha",
    idea: "Hackathon Project",
    requiredSkills: ["React", "Firebase", "UI/UX"],
    members: 3,
    status: "Open to Join"
  },
  {
    id: "bytebuilders",
    name: "ByteBuilders",
    idea: "AI Study Planner",
    requiredSkills: ["Frontend", "APIs", "Prompting"],
    members: 2,
    status: "Looking for Teammates"
  }
];

/** -------- Elements -------- */
const pages = {
  home: document.querySelector('#page-home'),
  players: document.querySelector('#page-players'),
  teams: document.querySelector('#page-teams'),
  signin: document.querySelector('#page-signin'),
};

const playersGrid = document.querySelector("#playersGrid");
const teamsGrid = document.querySelector("#teamsGrid");
const playerSearch = document.querySelector("#playerSearch");
const btnResetDemo = document.querySelector("#btnResetDemo");
const profileForm = document.querySelector("#profileForm");

const hudInitials = document.querySelector("#hudInitials");
const hudName = document.querySelector("#hudName");
const hudSub = document.querySelector("#hudSub");
const btnGoogleSignIn = document.querySelector("#btnGoogleSignIn");
const btnSignOut = document.querySelector("#btnSignOut");

/** -------- Simple router -------- */
function getRoute() {
  const hash = window.location.hash || "#/home";
  const route = hash.replace("#/", "").split("?")[0];
  return route || "home";
}

function setActiveNav(route) {
  document.querySelectorAll(".nav__link").forEach(a => {
    a.classList.toggle("is-active", a.dataset.route === route);
  });
}

function showPage(route) {
  Object.keys(pages).forEach(key => {
    pages[key].hidden = key !== route;
  });
  setActiveNav(route);
  // focus main for accessibility
  const app = document.querySelector("#app");
  app && app.focus({ preventScroll: true });
}

/** -------- Storage helpers -------- */
function loadPlayers() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...DEMO_PLAYERS];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [...DEMO_PLAYERS];
    // Ensure demo players exist (but don't duplicate)
    const ids = new Set(parsed.map(p => p.id));
    const merged = [...parsed];
    DEMO_PLAYERS.forEach(d => { if (!ids.has(d.id)) merged.unshift(d); });
    return merged;
  } catch {
    return [...DEMO_PLAYERS];
  }
}

function savePlayers(players) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

function resetToDemo() {
  localStorage.removeItem(STORAGE_KEY);
  renderPlayers(loadPlayers());
  toast("Demo reset. Back to the 3 default players.");
}

function loadAuth() {
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}
function saveAuth(auth) {
  if (!auth) localStorage.removeItem(AUTH_KEY);
  else localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
}

/** -------- UI helpers -------- */
function initialsFromName(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] || "?";
  const b = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (a + b).toUpperCase();
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.forEach(c => node.append(c));
  return node;
}

function tagPill(text, variant = "tag") {
  const cls = variant === "skill" ? "tag tag--skill" : variant === "green" ? "tag tag--green" : "tag";
  return el("span", { class: cls }, [document.createTextNode(text)]);
}

function escapeText(s) {
  return String(s ?? "").replace(/[<>]/g, "");
}

/** -------- Render: Players -------- */
function matchesQuery(player, q) {
  if (!q) return true;
  const hay = [
    player.name,
    player.college,
    player.year,
    player.branch,
    player.bio,
    ...(player.skills || []),
    ...(player.interests || []),
    player.availability
  ].join(" ").toLowerCase();
  return hay.includes(q.toLowerCase());
}

function renderPlayers(players, q = "") {
  playersGrid.innerHTML = "";

  const filtered = players.filter(p => matchesQuery(p, q));
  if (filtered.length === 0) {
    playersGrid.append(
      el("div", { class: "panel", style: "grid-column:1/-1" }, [
        el("div", { class: "panel__head" }, [
          el("div", { class: "panel__title" }, [document.createTextNode("No matches")])
        ]),
        el("div", { class: "panel__body muted" }, [
          document.createTextNode("Try a different search: name, skill, or interest.")
        ])
      ])
    );
    return;
  }

  filtered.forEach(player => {
    const topLeft = el("div", {}, [
      el("h3", { class: "playerCard__name" }, [document.createTextNode(player.name)]),
      el("div", { class: "playerCard__meta" }, [
        document.createTextNode(`${player.college} • ${player.year} • ${player.branch}`)
      ])
    ]);

    const initials = el("div", { class: "initials", title: "No avatars — initials only" }, [
      document.createTextNode(initialsFromName(player.name))
    ]);

    const skillTags = el("div", { class: "tags" }, (player.skills || []).map(s => tagPill(s, "skill")));
    const interestTags = el("div", { class: "tags" }, (player.interests || []).map(i => tagPill(i, "tag")));

    const actions = el("div", { class: "cardActions" }, [
      el("button", {
        class: "btn btn--ghost",
        type: "button",
        onclick: () => toast(`Messaging UI is MVP placeholder.\nPlayer: ${player.name}`)
      }, [document.createTextNode("Message")]),
      el("button", {
        class: "btn btn--secondary",
        type: "button",
        onclick: () => toast(`Connect request sent (demo).\nPlayer: ${player.name}`)
      }, [document.createTextNode("Connect")])
    ]);

    const card = el("article", { class: "playerCard" }, [
      el("div", { class: "playerCard__top" }, [
        topLeft,
        initials
      ]),
      el("div", { class: "playerCard__body" }, [
        el("div", { class: "kv" }, [
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Bio")]),
            el("div", { class: "muted" }, [document.createTextNode(player.bio)])
          ]),
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Skills")]),
            skillTags
          ]),
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Interests")]),
            interestTags
          ]),
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Weekly availability")]),
            el("div", { class: "tags" }, [tagPill(player.availability, "green")])
          ])
        ]),
        actions
      ])
    ]);

    playersGrid.append(card);
  });
}

/** -------- Render: Teams -------- */
function renderTeams(teams) {
  teamsGrid.innerHTML = "";
  teams.forEach(t => {
    const req = el("div", { class: "tags" }, (t.requiredSkills || []).map(s => tagPill(s, "skill")));

    const statusPill = t.status.toLowerCase().includes("open")
      ? tagPill(t.status, "green")
      : tagPill(t.status, "tag");

    const card = el("article", { class: "teamCard" }, [
      el("div", { class: "teamCard__top" }, [
        el("div", {}, [
          el("h3", { class: "teamCard__name" }, [document.createTextNode(t.name)]),
          el("div", { class: "teamCard__meta" }, [document.createTextNode(t.idea)])
        ]),
        el("div", { class: "tags" }, [statusPill])
      ]),
      el("div", { class: "teamCard__body" }, [
        el("div", { class: "kv" }, [
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Required skills")]),
            req
          ]),
          el("div", { class: "kvRow" }, [
            el("div", { class: "kvLabel" }, [document.createTextNode("Member count")]),
            el("div", { class: "tags" }, [tagPill(String(t.members), "tag")])
          ])
        ]),
        el("div", { class: "cardActions" }, [
          el("button", {
            class: "btn btn--primary",
            type: "button",
            onclick: () => toast(`Request to join sent (demo).\nTeam: ${t.name}`)
          }, [document.createTextNode("Request to Join")])
        ])
      ])
    ]);

    teamsGrid.append(card);
  });
}

/** -------- Progress bars animation -------- */
function animateBars() {
  document.querySelectorAll(".bar").forEach(bar => {
    const val = Number(bar.dataset.bar || 0);
    const fill = bar.querySelector(".bar__fill");
    if (fill) requestAnimationFrame(() => fill.style.width = Math.max(0, Math.min(100, val)) + "%");
  });
}

/** -------- Toast (simple) -------- */
let toastTimer = null;
function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const box = el("div", { class: "toast" }, [
    el("div", { class: "toast__title" }, [document.createTextNode("SkillSync")]),
    el("div", { class: "toast__msg" }, [document.createTextNode(message)])
  ]);

  document.body.append(box);
  requestAnimationFrame(() => box.classList.add("toast--show"));

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    box.classList.remove("toast--show");
    setTimeout(() => box.remove(), 250);
  }, 2400);
}

/** Inject toast styles quickly (keeps CSS file clean) */
(function injectToastCSS(){
  const css = `
    .toast{
      position:fixed; right:18px; bottom:18px;
      width:min(340px, calc(100% - 36px));
      border-radius:18px;
      padding:12px 12px;
      border:1px solid rgba(17,24,39,.14);
      background: rgba(255,255,255,.85);
      backdrop-filter: blur(10px);
      box-shadow: 0 18px 60px rgba(17,24,39,.18), 0 0 26px rgba(37,99,235,.20);
      transform: translateY(12px);
      opacity:0;
      transition: transform .2s ease, opacity .2s ease;
      z-index:999;
    }
    .toast--show{transform: translateY(0); opacity:1;}
    .toast__title{font-weight:1000; margin-bottom:4px}
    .toast__msg{opacity:.85; white-space:pre-wrap; line-height:1.35}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
})();
/** -------- Auth (Firebase) -------- */
const USE_FIREBASE = true;

const firebaseConfig = {
  apiKey: "AIzaSyB_ijx5Le2xHJighQD6SKuIymD_g_qcXhI",
  authDomain: "skill-sync-56623.firebaseapp.com",
  projectId: "skill-sync-56623",
  storageBucket: "skill-sync-56623.appspot.com",
  messagingSenderId: "412903850980",
  appId: "1:412903850980:web:fe5b1de0ec41bb0785bdf1"
};

let fbAuth = null;

function initFirebaseIfAvailable() {
  if (!USE_FIREBASE) return;

  if (typeof firebase === "undefined") {
    console.error("❌ Firebase SDK not loaded");
    return;
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  fbAuth = firebase.auth();
  console.log("✅ Firebase initialized");
}

async function signInWithGoogle() {
  if (!fbAuth) {
    toast("Firebase not ready yet. Refresh once.");
    console.error("fbAuth is null");
    return;
  }

  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await fbAuth.signInWithPopup(provider);
    const user = result.user;

    const auth = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      provider: "google"
    };

    saveAuth(auth);
    applyAuthToHUD(auth);
    toast(`Welcome ${auth.name}`);
  } catch (err) {
    console.error(err);
    toast("Google sign-in failed");
  }
}


async function signOut() {
  if (USE_FIREBASE && fbAuth) {
    try { await fbAuth.signOut(); } catch {}
  }
  saveAuth(null);
  applyAuthToHUD(null);
  toast("Signed out.");
}

function applyAuthToHUD(auth) {
     // 🔹 Update Sign-In message if Google auth is active
  const signInNote = document.querySelector("#page-signin .muted");
  if (signInNote && auth && auth.provider === "google") {
    signInNote.textContent = "You're signed in with Google ✅";
  }
  if (!auth) {
    hudInitials.textContent = "?";
    hudName.textContent = "Guest";
    hudSub.textContent = "Not signed in";
    btnSignOut.hidden = true;
    return;
  }
  hudInitials.textContent = initialsFromName(auth.name);
  hudName.textContent = auth.name;
  hudSub.textContent = auth.email ? escapeText(auth.email) : "Signed in";
  btnSignOut.hidden = false;

  // Helpful: auto-fill form name if empty
  const nameField = profileForm?.querySelector('[name="fullName"]');
  if (nameField && !nameField.value) nameField.value = auth.name;
}

/** -------- Create Profile -> add to Active Players -------- */
function normalizeCSV(input) {
  return String(input || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 10); // keep MVP clean
}

function createPlayerFromForm(form) {
  const data = new FormData(form);
  const name = String(data.get("fullName") || "").trim();

  return {
    id: "p-" + Date.now().toString(36),
    name,
    college: String(data.get("college") || "").trim(),
    year: String(data.get("year") || "").trim(),
    branch: String(data.get("branch") || "").trim(),
    bio: String(data.get("bio") || "").trim(),
    skills: normalizeCSV(data.get("skills")),
    interests: normalizeCSV(data.get("interests")),
    availability: String(data.get("availability") || "").trim(),
    source: "local"
  };
}

function upsertPlayer(player) {
  const players = loadPlayers();
  // Remove any same-name local profile to avoid duplicates
  const filtered = players.filter(p => !(p.source === "local" && p.name.toLowerCase() === player.name.toLowerCase()));
  filtered.unshift(player);
  savePlayers(filtered);
  return filtered;
}

/** -------- Events -------- */
window.addEventListener("hashchange", () => {
  const route = getRoute();
  showPage(route);
  if (route === "home") animateBars();
});

playerSearch?.addEventListener("input", (e) => {
  const q = e.target.value || "";
  renderPlayers(loadPlayers(), q);
});

btnResetDemo?.addEventListener("click", resetToDemo);

btnGoogleSignIn?.addEventListener("click", async () => {
  try { await signInWithGoogle(); }
  catch (e) { console.warn(e); toast("Sign-in failed (check Firebase config)."); }
});

btnSignOut?.addEventListener("click", async () => {
  await signOut();
});

profileForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const player = createPlayerFromForm(profileForm);

  // Hard constraint: no avatars/faces => okay
  // Also: keep it realistic => no fake stats here
  const updated = upsertPlayer(player);
  renderPlayers(updated);

  toast(`Profile created: ${player.name}`);

  // Go to players page
  window.location.hash = "#/players";
  profileForm.reset();
});

/** -------- Boot -------- */
(function init(){
  initFirebaseIfAvailable();

  // Apply auth from storage on load
  const auth = loadAuth();
  applyAuthToHUD(auth);

  // Render initial pages
  const players = loadPlayers();
  renderPlayers(players);
  renderTeams(DEMO_TEAMS);

  const route = getRoute();
  showPage(route);
  if (route === "home") animateBars();

  // Smooth anchor scroll for "Start Your Journey" (hero -> #why)
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const href = a.getAttribute("href");
    if (href && href.startsWith("#") && !href.startsWith("#/")) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
})();








