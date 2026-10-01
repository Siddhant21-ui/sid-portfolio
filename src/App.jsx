import { useEffect, useRef, useState } from "react";
import Intro from "./components/Intro";
import {
  KickOff, FirstTeam, Finals, Attributes, Cabinet, Transfer, KitRoom,
  PlayerCard, Jersey,
} from "./components/Screens";
import { useKit, useScreen } from "./hooks";
import { profile, experience, projects, cardStats, trophies, kits, era } from "./data";

/* Main menu — each mode opens its own screen. */
const MODES = [
  { id: "kickoff", label: "Kick-off", sub: "Player profile & about me", min: "0'", icon: "◉", Screen: KickOff },
  { id: "first-team", label: "First Team", sub: "Experience & internship", min: "15'", icon: "►", Screen: FirstTeam },
  { id: "finals", label: "The Finals", sub: "Projects & builds", min: "30'", icon: "⚔", Screen: Finals },
  { id: "attributes", label: "Player Attributes", sub: "Skills & tools", min: "55'", icon: "◆", Screen: Attributes },
  { id: "cabinet", label: "Trophy Cabinet", sub: "Achievements & education", min: "70'", icon: "★", Screen: Cabinet },
  { id: "transfer", label: "Transfer Request", sub: "Get in touch", min: "90+'", icon: "✦", Screen: Transfer },
  { id: "kit-room", label: "Kit Room", sub: "Options · change the theme", min: "HT", icon: "⚙", Screen: KitRoom },
];
const IDS = MODES.map((m) => m.id);
const YEAR = new Date().getFullYear();

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [kit, setKit, cycleKit] = useKit();
  const [screen, go] = useScreen(IDS);
  const [focus, setFocus] = useState(0);
  const [toast, setToast] = useState(null);
  const firstKit = useRef(true);

  const current = MODES.find((m) => m.id === screen) || null;
  const idx = current ? IDS.indexOf(current.id) : -1;

  // When returning to the menu, highlight the screen we came from.
  useEffect(() => {
    if (idx >= 0) setFocus(idx);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [idx]);

  // "Kit changed" toast, like an in-game notification.
  useEffect(() => {
    if (firstKit.current) { firstKit.current = false; return; }
    const k = kits.find((x) => x.id === kit);
    setToast(k);
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [kit]);

  // Keyboard controls.
  useEffect(() => {
    if (!introDone) return;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key;
      const lower = key.toLowerCase();

      if (lower === "k") { cycleKit(e.shiftKey ? -1 : 1); return; }

      // Kit Room: 1/2/3 equip a kit.
      if (current?.id === "kit-room" && ["1", "2", "3"].includes(key)) {
        setKit(kits[Number(key) - 1].id);
        return;
      }

      const n = Number(key);
      if (n >= 1 && n <= MODES.length) { go(MODES[n - 1].id); return; }

      if (!current) {
        // Main menu navigation.
        if (key === "ArrowDown" || lower === "s") { e.preventDefault(); setFocus((f) => (f + 1) % MODES.length); }
        else if (key === "ArrowUp" || lower === "w") { e.preventDefault(); setFocus((f) => (f - 1 + MODES.length) % MODES.length); }
        else if (key === "Enter" || key === " " || key === "ArrowRight" || lower === "d") { e.preventDefault(); go(MODES[focus].id); }
      } else {
        // Inside a screen.
        if (key === "Escape" || key === "Backspace") { e.preventDefault(); go(null); }
        else if (key === "ArrowRight" || lower === "e") go(MODES[(idx + 1) % MODES.length].id);
        else if (key === "ArrowLeft" || lower === "q") go(MODES[(idx - 1 + MODES.length) % MODES.length].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [introDone, current, idx, focus, go, cycleKit, setKit]);

  const kitObj = kits.find((k) => k.id === kit);

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}

      <header className="hud">
        <button className="hud__score" onClick={() => go(null)} aria-label="Main menu">
          <span className="hud__team">SID</span>
          <span className="hud__clock">{current ? current.min : "KO"}</span>
          <span className="hud__team hud__team--muted">BUGS</span>
        </button>
        <div className="hud__crumb">
          <button onClick={() => go(null)}>Main Menu</button>
          {current && <><i>›</i><b>{current.label}</b></>}
        </div>
        <div className="kitpick" role="radiogroup" aria-label="Kit">
          {kits.map((k) => (
            <button
              key={k.id}
              role="radio"
              aria-checked={kit === k.id}
              className={kit === k.id ? "on" : ""}
              onClick={() => setKit(k.id)}
              title={`${k.name} ${k.season}`}
            >
              <span className="kitpick__sw" style={{ background: k.shirt, borderColor: k.trim }} />
              <span className="kitpick__label">{k.name}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="stage">
        {current ? (
          <div className="screen" key={current.id}>
            <div className="tabs">
              <button className="tabs__back" onClick={() => go(null)}>◀ Back <kbd>Esc</kbd></button>
              <div className="tabs__list">
                {MODES.map((m) => (
                  <button key={m.id} className={m.id === current.id ? "on" : ""} onClick={() => go(m.id)}>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <current.Screen min={current.min} kit={kit} setKit={setKit} />
            <div className="screen__nav">
              <button className="btn" onClick={() => go(MODES[(idx - 1 + MODES.length) % MODES.length].id)}>
                ◀ {MODES[(idx - 1 + MODES.length) % MODES.length].label}
              </button>
              <button className="btn btn--primary" onClick={() => go(MODES[(idx + 1) % MODES.length].id)}>
                {MODES[(idx + 1) % MODES.length].label} ▶
              </button>
            </div>
          </div>
        ) : (
          <Menu focus={focus} setFocus={setFocus} go={go} kitObj={kitObj} />
        )}
      </main>

      <p className="legal">
        © {YEAR} {profile.firstName} {profile.lastName} · Fan-inspired design celebrating the 2016/17 & 2017/18 seasons. Not affiliated with or endorsed by Real Madrid C.F.
      </p>

      <footer className="hints" aria-hidden="true">
        {current ? (
          <>
            <span><kbd>Esc</kbd> Back</span>
            <span><kbd>◀</kbd><kbd>▶</kbd> / <kbd>Q</kbd><kbd>E</kbd> Switch screen</span>
            <span><kbd>1</kbd>–<kbd>7</kbd> Jump</span>
            <span><kbd>K</kbd> Change kit</span>
          </>
        ) : (
          <>
            <span><kbd>▲</kbd><kbd>▼</kbd> / <kbd>W</kbd><kbd>S</kbd> Navigate</span>
            <span><kbd>Enter</kbd> Select</span>
            <span><kbd>1</kbd>–<kbd>7</kbd> Jump</span>
            <span><kbd>K</kbd> Change kit</span>
          </>
        )}
      </footer>

      <div className={`toast ${toast ? "toast--show" : ""}`} role="status" aria-live="polite">
        {toast && (
          <>
            <span className="kitpick__sw" style={{ background: toast.shirt, borderColor: toast.trim }} />
            Kit changed · <b>{toast.name} {toast.season}</b>
          </>
        )}
      </div>
    </>
  );
}

function Menu({ focus, setFocus, go, kitObj }) {
  const m = MODES[focus];
  return (
    <div className="menu screen" key="menu">
      <div className="menu__left">
        <div className="menu__title" data-reveal>
          <p className="eyebrow">Portfolio 26/27 · {profile.location}</p>
          <h1>{profile.firstName}<br /><span>{profile.lastName}</span></h1>
          <p className="menu__role">{profile.position} <i>×</i> {profile.role}</p>
        </div>

        <p className="menu__label" data-reveal style={{ "--i": 1 }}>Main Menu // Select Mode</p>
        <nav className="menu__list" aria-label="Main menu">
          {MODES.map((mode, i) => (
            <button
              key={mode.id}
              className={`menu__item ${i === focus ? "on" : ""}`}
              onMouseEnter={() => setFocus(i)}
              onFocus={() => setFocus(i)}
              onClick={() => go(mode.id)}
              data-reveal
              style={{ "--i": i + 2 }}
            >
              <span className="menu__icon">{mode.icon}</span>
              <span className="menu__text">
                <b>{mode.label}{mode.tag && <em>{mode.tag}</em>}</b>
                <small>{mode.sub}</small>
              </span>
              <span className="menu__key">{i + 1}</span>
            </button>
          ))}
        </nav>
      </div>

      <aside className="preview" data-reveal style={{ "--i": 3 }}>
        <div className="preview__inner" key={m.id}>
          <div className="preview__head">
            <span className="preview__min">{m.min}</span>
            <div>
              <p className="eyebrow">Mode {focus + 1} of {MODES.length}</p>
              <h2>{m.label}</h2>
            </div>
          </div>
          <div className="preview__body"><Preview id={m.id} kitObj={kitObj} /></div>
          <button className="btn btn--primary preview__go" onClick={() => go(m.id)}>
            Enter {m.label} <kbd>Enter</kbd>
          </button>
        </div>
        <div className="preview__ticker">
          {era.slice(0, 3).map((t) => <span key={t}>★ {t}</span>)}
        </div>
      </aside>
    </div>
  );
}

function Preview({ id, kitObj }) {
  switch (id) {
    case "kickoff":
      return (
        <div className="pv pv--card">
          <PlayerCard compact />
          <p>{profile.objective}</p>
        </div>
      );
    case "first-team": {
      const x = experience[0];
      return (
        <div className="pv">
          <div className="pv__stamp"><span>Official</span><b>{x.org}</b><small>{x.title} · {x.period}</small></div>
          <p>{x.points[0]}</p>
          <p className="pv__status">● Currently playing</p>
        </div>
      );
    }
    case "finals":
      return (
        <div className="pv">
          {projects.map((p) => (
            <div className="pv__match" key={p.name}>
              <span>{p.venue}</span>
              <b>{p.name}</b>
              <em>{p.scoreline.left} – {p.scoreline.right}</em>
            </div>
          ))}
        </div>
      );
    case "attributes":
      return (
        <div className="pv">
          {cardStats.slice(0, 4).map((s) => (
            <div className="bar" key={s.key}>
              <div className="bar__label"><span>{s.label}</span><b>{s.value}</b></div>
              <div className="bar__track"><span style={{ "--w": `${s.value}%` }} /></div>
            </div>
          ))}
        </div>
      );
    case "cabinet":
      return (
        <div className="pv">
          <div className="pv__big"><b>{trophies.length}</b><span>pieces of silverware</span></div>
          {trophies.filter((t) => t.tier === "major").map((t) => (
            <p key={t.title} className="pv__trophy">★ {t.title}</p>
          ))}
        </div>
      );
    case "transfer":
      return (
        <div className="pv">
          <p className="pv__lead">Open to internships & junior pentesting roles.</p>
          <p className="pv__mail">{profile.email}</p>
          <p className="pv__status">● Transfer window open</p>
        </div>
      );
    case "kit-room":
      return (
        <div className="pv pv--kit">
          <Jersey kit={kitObj} size={150} />
          <p>Wearing: <b>{kitObj.name} {kitObj.season}</b><br />{kits.length} kits available. Press <kbd>K</kbd> to cycle.</p>
        </div>
      );
    default:
      return null;
  }
}
