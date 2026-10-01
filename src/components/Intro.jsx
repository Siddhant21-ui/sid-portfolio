import { useEffect, useState } from "react";
import { profile } from "../data";

/** Tunnel walk-out intro. Click, Esc, Enter or Space to skip. */
export default function Intro({ onDone }) {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [step, setStep] = useState(0); // 0 tunnel, 1 lineup, 2 kick-off
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reduced) { onDone(); return; }
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 1800);
    const t3 = setTimeout(finish, 2700);
    const onKey = (e) => { if (["Escape", "Enter", " "].includes(e.key)) finish(); };
    window.addEventListener("keydown", onKey);
    return () => { [t1, t2, t3].forEach(clearTimeout); window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setLeaving(true);
    setTimeout(onDone, 450);
  }

  const lines = ["Walking out of the tunnel", "Confirming the line-up", "Kick-off"];

  return (
    <div className={`intro ${leaving ? "intro--out" : ""}`} onClick={finish} role="presentation">
      <button className="intro__skip" onClick={finish}>Skip ›</button>
      <div className="intro__lights" aria-hidden="true" />
      <div className="intro__body">
        <p className="eyebrow">Matchday // Portfolio 26/27</p>
        <div className="intro__number">{profile.number}</div>
        <h1 className="intro__name">{profile.firstName} {profile.lastName}</h1>
        <p className="intro__status">
          {lines[step]}<span className="dots" />
        </p>
        <div className="intro__bar"><span style={{ width: `${(step + 1) * 33.4}%` }} /></div>
      </div>
      <p className="intro__note">Fan-inspired design · Not affiliated with Real Madrid C.F.</p>
    </div>
  );
}
