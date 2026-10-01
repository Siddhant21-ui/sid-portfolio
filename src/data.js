// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file, not the components.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Siddhant",
  lastName: "Mehta",
  nickname: "Sid",
  number: 7, // shirt number on the player card
  position: "Offensive Security",
  role: "Web App Pentesting · Vulnerability Research",
  objective:
    "Growing into an offensive security professional who breaks web applications before attackers do — with my sights set on red-team operations and adversarial security research.",
  location: "Mohali, Punjab · India",
  email: "siddhantmehta498@gmail.com",
  linkedin: "https://www.linkedin.com/in/siddhant-mehta-761765287/",
  tryhackme: "https://tryhackme.com/p/Cloak",
  github: "https://github.com/Siddhant21-ui",
  // Put a phone-free copy of your CV at public/Siddhant_Mehta_CV.pdf
  cv: "/Siddhant_Mehta_CV.pdf",
};

// Player-card attributes (self-assessed, 0–99). Keep these honest —
// an interviewer WILL ask you to justify a 90.
export const cardStats = [
  { key: "WEB", label: "Web App Testing", value: 78 },
  { key: "REC", label: "Recon", value: 74 },
  { key: "EXP", label: "Exploitation", value: 70 },
  { key: "PY", label: "Python", value: 76 },
  { key: "NET", label: "Network Analysis", value: 68 },
  { key: "CTF", label: "CTF Mentality", value: 84 },
];

export const experience = [
  {
    org: "ThreatWorx",
    title: "Intern",
    period: "Dec 2025 – Present",
    headline: "Signed: vulnerability data, made readable",
    points: [
      "Building a prototype vulnerability-data visualization tool in Python that aggregates an organization's security-assessment findings through the ThreatWorx API.",
      "Implementing time-based and category-specific filtering so findings can be sliced by when they appeared and what kind of risk they are.",
    ],
    tags: ["Python", "REST API", "Data Visualization", "Vulnerability Management"],
  },
];

export const projects = [
  {
    venue: "Final I",
    name: "Active Deception Framework",
    subtitle: "Web Attack Detection",
    period: "Jul 2026 – Present",
    scoreline: { left: "94.3%", leftLabel: "Detection recall", right: "0", rightLabel: "False positives" },
    stats: [
      { value: "99", label: "Seeded trials" },
      { value: "11,880", label: "Attack sessions" },
      { value: "88.9 → 94.3%", label: "Recall uplift" },
    ],
    points: [
      "Conceived the core idea: response-side \"bait\" probes and a consistent decoy environment that actively provoke attackers into revealing themselves, instead of waiting passively for evidence.",
      "Owned offensive testing — SQL injection, IDOR, SSRF, credential stuffing and CSRF against the team's target app, including browser-driven and LLM-agent adversaries — to build the attack corpus and stress-test the detection engine.",
    ],
    tags: ["Deception", "SQLi", "IDOR", "SSRF", "CSRF", "LLM Agents"],
  },
  {
    venue: "Final II",
    name: "Audio Steganography & Crypto Tool",
    subtitle: "Covert channel research",
    period: "Jul 2025 – Nov 2025",
    scoreline: { left: "FFT", leftLabel: "Frequency domain", right: "WAV", rightLabel: "Carrier" },
    stats: [
      { value: "CLI", label: "Python utility" },
      { value: "B64 → Hz", label: "Custom mapping" },
      { value: "Encrypted", label: "Payloads" },
    ],
    points: [
      "Built a command-line Python utility that uses the Fast Fourier Transform to inject and extract encrypted payloads inside WAV frequencies.",
      "Designed a custom Base64-to-frequency mapping to obfuscate text, simulating real-world data-exfiltration techniques.",
    ],
    tags: ["Python", "FFT", "Steganography", "Cryptography", "Exfiltration"],
  },
];

export const skills = [
  { group: "Weapons of choice", items: ["Burp Suite", "SQLmap", "Metasploit", "Nmap", "Wireshark"] },
  { group: "Language", items: ["Python"] },
  { group: "Training ground", items: ["Kali Linux", "Postman"] },
  { group: "Mentality", items: ["Critical Thinking", "Problem Solving", "Emotional Intelligence", "Communication"] },
];

export const trophies = [
  { title: "TryHackMe — Top 4%", detail: "Global ranking · 115 rooms · 321-day streak", year: "Ongoing", tier: "major" },
  { title: "Love at First Breach CTF", detail: "Top 50 finisher — Web App Sec & AI prompt injection", year: "2026", tier: "major" },
  { title: "E-Suraksha Hackathon", detail: "Top 10 nationwide", year: "2023", tier: "major" },
  { title: "Hacker Holidays", detail: "Web, AI Security, Cloud, Forensics & OSINT challenges", year: "Completed", tier: "minor" },
  { title: "Microsoft SC-900", detail: "Security, Compliance & Identity Fundamentals", year: "Certified", tier: "minor" },
  { title: "Cybersecurity 101", detail: "TryHackMe learning path", year: "Certified", tier: "minor" },
];

export const academy = {
  degree: "B.E. Computer Science — Information Security",
  school: "Chandigarh University, Mohali",
  period: "2023 – 2027",
  note: "Specialization delivered in partnership with IBM",
  cgpa: "7.58", // set to null to hide
};

// The era the theme celebrates.
export const era = [
  "Cardiff · 3 Jun 2017 · 4–1",
  "La Liga 2016/17",
  "Kyiv · 26 May 2018 · 3–1",
  "Club World Cup 2016 & 2017",
  "UEFA Super Cup 2016 & 2017",
  "Supercopa 2017",
];

// Kits = site themes. Colours live in styles.css under [data-kit="..."].
export const kits = [
  { id: "home", name: "Home", season: "17/18", shirt: "#ffffff", trim: "#2aa9bd", number: "#0b7480", note: "White with sky-blue trim" },
  { id: "away", name: "Away", season: "16/17", shirt: "#4a2a80", trim: "#ffffff", number: "#ffffff", detail: "CARDIFF 2017", note: "Purple — worn in the 4–1 Cardiff final" },
  { id: "third", name: "Third", season: "16/17", shirt: "#121417", trim: "#2ec4e6", number: "#2ec4e6", pattern: true, note: "Black with Solar Blue diagonal graphics" },
];
