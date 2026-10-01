import {
  profile, cardStats, experience, projects, skills, trophies, academy, kits,
} from "../data";

const overall = Math.round(cardStats.reduce((a, s) => a + s.value, 0) / cardStats.length);

/* ───────── Shared bits ───────── */

export function ScreenHead({ min, kicker, title }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-head__min">{min}</span>
      <div>
        <p className="eyebrow">{kicker}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export function PlayerCard({ compact = false }) {
  return (
    <div className={`card ${compact ? "card--compact" : ""}`} aria-label="Player card">
      <div className="card__shine" aria-hidden="true" />
      <div className="card__top">
        <div>
          <div className="card__ovr">{overall}</div>
          <div className="card__pos">PEN</div>
        </div>
        <div className="card__num">{profile.number}</div>
      </div>
      <div className="card__name">{profile.nickname.toUpperCase()}</div>
      <div className="card__stats">
        {cardStats.map((s) => (
          <div key={s.key} title={s.label}><b>{s.value}</b> <span>{s.key}</span></div>
        ))}
      </div>
      <div className="card__foot">Season 26/27 · Academy graduate ’27</div>
    </div>
  );
}

/** Back-of-shirt jersey: name + number, no crest or sponsor. */
export function Jersey({ kit, size = 160 }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className="jersey" aria-hidden="true">
      <path
        d="M70 18 L42 28 L8 62 L30 92 L48 78 L48 186 L152 186 L152 78 L170 92 L192 62 L158 28 L130 18 Q100 34 70 18 Z"
        fill={kit.shirt} stroke={kit.trim} strokeWidth="4" strokeLinejoin="round"
      />
      {kit.pattern && (
        <>
          <defs>
            <pattern id={`diag-${kit.id}`} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="3.5" height="9" fill={kit.trim} />
            </pattern>
          </defs>
          {/* diagonal graphics across shoulders and sleeves */}
          <path d="M70 20 L44 30 L12 62 L30 86 L48 72 L56 46 Z" fill={`url(#diag-${kit.id})`} opacity="0.9" />
          <path d="M130 20 L156 30 L188 62 L170 86 L152 72 L144 46 Z" fill={`url(#diag-${kit.id})`} opacity="0.9" />
        </>
      )}
      <path d="M70 18 Q100 30 130 18" fill="none" stroke={kit.trim} strokeWidth="7" strokeLinecap="round" />
      <path d="M8 62 L30 92" stroke={kit.trim} strokeWidth="9" />
      <path d="M192 62 L170 92" stroke={kit.trim} strokeWidth="9" />
      <text x="100" y="74" textAnchor="middle" fill={kit.number} fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="22" letterSpacing="3">
        {profile.nickname.toUpperCase()}
      </text>
      <text x="100" y="158" textAnchor="middle" fill={kit.number} fontFamily="Barlow Condensed, sans-serif" fontWeight="800" fontSize="88">
        {profile.number}
      </text>
      {kit.detail && (
        <text x="100" y="178" textAnchor="middle" fill={kit.number} opacity="0.85" fontFamily="Barlow Condensed, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">
          {kit.detail}
        </text>
      )}
    </svg>
  );
}

/* ───────── Screens ───────── */

export function KickOff({ min }) {
  return (
    <section className="hero">
      <div className="hero__copy" data-reveal>
        <p className="eyebrow">{min} · Player Profile · {profile.location}</p>
        <h1 className="hero__name">{profile.firstName}<br /><span>{profile.lastName}</span></h1>
        <p className="hero__role">{profile.position} <i>×</i> {profile.role}</p>
        <p className="hero__obj">{profile.objective}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#/finals">See the Finals</a>
          <a className="btn" href={profile.cv} download>Download CV</a>
        </div>
      </div>
      <div data-reveal style={{ "--i": 2 }}><PlayerCard /></div>
    </section>
  );
}

export function FirstTeam({ min }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Experience" title="First Team" />
      {experience.map((x, i) => (
        <article key={x.org} className="signing" data-reveal style={{ "--i": i + 1 }}>
          <div className="signing__stamp">
            <span>Official</span>
            <b>{x.org}</b>
            <small>{x.period}</small>
          </div>
          <div className="signing__body">
            <p className="eyebrow">{x.title}</p>
            <h3>{x.headline}</h3>
            <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
            <div className="tags">{x.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        </article>
      ))}
    </section>
  );
}

export function Finals({ min }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Projects" title="The Finals" />
      <div className="finals">
        {projects.map((p, i) => (
          <article key={p.name} className="final" data-reveal style={{ "--i": i + 1 }}>
            <header className="final__head">
              <span className="final__venue">{p.venue}</span>
              <span className="final__date">{p.period}</span>
            </header>
            <h3>{p.name}</h3>
            <p className="final__sub">{p.subtitle}</p>
            <div className="scoreline">
              <div><b>{p.scoreline.left}</b><span>{p.scoreline.leftLabel}</span></div>
              <i>–</i>
              <div><b>{p.scoreline.right}</b><span>{p.scoreline.rightLabel}</span></div>
            </div>
            <div className="final__stats">
              {p.stats.map((s) => <div key={s.label}><b>{s.value}</b><span>{s.label}</span></div>)}
            </div>
            <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
            <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Attributes({ min }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Skills" title="Player Attributes" />
      <div className="attrs">
        <div className="attrs__bars" data-reveal style={{ "--i": 1 }}>
          {cardStats.map((s) => (
            <div className="bar" key={s.key}>
              <div className="bar__label"><span>{s.label}</span><b>{s.value}</b></div>
              <div className="bar__track"><span style={{ "--w": `${s.value}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="attrs__groups" data-reveal style={{ "--i": 2 }}>
          {skills.map((g) => (
            <div key={g.group} className="group">
              <p className="eyebrow">{g.group}</p>
              <div className="tags tags--lg">{g.items.map((i) => <span key={i}>{i}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cabinet({ min }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Achievements & Education" title="Trophy Cabinet" />
      <div className="cabinet">
        {trophies.map((t, i) => (
          <div key={t.title} className={`trophy trophy--${t.tier}`} data-reveal style={{ "--i": i + 1 }}>
            <svg viewBox="0 0 48 48" className="trophy__icon" aria-hidden="true">
              <path d="M14 6h20v8a10 10 0 0 1-20 0V6Z" />
              <path d="M14 9H7v3a7 7 0 0 0 7 7M34 9h7v3a7 7 0 0 1-7 7" fill="none" />
              <path d="M24 24v8M17 42h14l-2-10H19l-2 10Z" />
            </svg>
            <div>
              <span className="trophy__year">{t.year}</span>
              <h3>{t.title}</h3>
              <p>{t.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="academy" data-reveal style={{ "--i": trophies.length + 1 }}>
        <p className="eyebrow">The Academy</p>
        <h3>{academy.degree}</h3>
        <p>{academy.school} · {academy.period}</p>
        <p className="academy__note">{academy.note}</p>
        {academy.cgpa && <span className="academy__cgpa">CGPA {academy.cgpa}</span>}
      </div>
    </section>
  );
}

export function Transfer({ min }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Contact" title="Transfer Request" />
      <div className="transfer__box" data-reveal style={{ "--i": 1 }}>
        <p className="transfer__lead">
          Open to internships and junior roles in <b>web application penetration testing</b>, red teaming and
          vulnerability research. If your squad needs someone who thinks like the attacker — let’s talk.
        </p>
        <div className="transfer__links">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a className="btn" href={profile.tryhackme} target="_blank" rel="noreferrer">TryHackMe ↗</a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </div>
      </div>
    </section>
  );
}

export function KitRoom({ min, kit, setKit }) {
  return (
    <section className="section">
      <ScreenHead min={min} kicker="Options · Theme" title="Kit Room" />
      <div className="kitroom">
        {kits.map((k, i) => (
          <button
            key={k.id}
            className={`kitcard ${kit === k.id ? "kitcard--on" : ""}`}
            onClick={() => setKit(k.id)}
            data-reveal
            style={{ "--i": i + 1 }}
            aria-pressed={kit === k.id}
          >
            <span className="kitcard__badge">{kit === k.id ? "Equipped" : `Press ${i + 1}`}</span>
            <Jersey kit={k} size={170} />
            <span className="kitcard__name">{k.name} <small>{k.season}</small></span>
            <span className="kitcard__note">{k.note}</span>
          </button>
        ))}
      </div>
      <p className="kitroom__hint" data-reveal style={{ "--i": 5 }}>
        Tip: press <kbd>K</kbd> anywhere to cycle kits, <kbd>Shift</kbd> + <kbd>K</kbd> to go back.
      </p>
    </section>
  );
}
