// All content below is original and fictional, created for this fan-guide site.
// It is not affiliated with, and does not depict, any existing franchise.

const TYPE_CHART = [
  { name: "Ember", icon: "🔥", color: "#a8320f", strong: "Verdant", weak: "Tide" },
  { name: "Tide", icon: "💧", color: "#0e5aa8", strong: "Ember", weak: "Volt" },
  { name: "Volt", icon: "⚡", color: "#a8790c", strong: "Tide", weak: "Stone" },
  { name: "Stone", icon: "🪨", color: "#5c4526", strong: "Volt", weak: "Gale" },
  { name: "Gale", icon: "🌪️", color: "#166b5c", strong: "Stone", weak: "Frost" },
  { name: "Frost", icon: "❄️", color: "#0e6ea8", strong: "Gale", weak: "Verdant" },
  { name: "Verdant", icon: "🌿", color: "#1e7a4d", strong: "Frost", weak: "Umbra" },
  { name: "Umbra", icon: "🌙", color: "#4a2e9e", strong: "Verdant", weak: "Ember" }
];

const SPIN_PARTS = [
  { icon: "🧿", name: "Core", desc: "Sets base weight and top-line stats." },
  { icon: "⭕", name: "Ring", desc: "Leans the build toward attack or defense." },
  { icon: "🌀", name: "Driver", desc: "Attack, Defense, Stamina, or Balance spin style." },
  { icon: "🔷", name: "Fusion chip", desc: "Slot for a bonded Wyldkin's special ability." }
];

const TROPES = [
  {
    title: "The rival",
    body: "A recurring opponent whose growth mirrors the hero's own. Rivals push the protagonist to improve and often become allies later in the story."
  },
  {
    title: "The training arc",
    body: "A pause in the plot dedicated to visible improvement — new techniques, harder discipline, or a mentor teaching a lesson the hero wasn't ready for before."
  },
  {
    title: "The power-up reveal",
    body: "A hidden ability or transformation unlocked at the story's most dramatic moment, usually tied to an emotional breakthrough rather than just training."
  },
  {
    title: "The chosen one",
    body: "A protagonist marked by prophecy, bloodline, or accident as uniquely capable of facing the story's central threat — common in fantasy-leaning arcs."
  },
  {
    title: "The found family",
    body: "A team that starts as strangers or rivals and becomes each other's found family, often the emotional core the final battle is fought to protect."
  },
  {
    title: "The cost of power",
    body: "Especially common in sci-fi framing: new strength comes with a price — physical, ethical, or personal — that the story makes the hero reckon with."
  }
];

const WYLDKIN = [
  { name: "Flarion", type: "Ember", color: "#c23f13", icon: "🔥", blurb: "A quick-tempered Wyldkin that channels heat into short, explosive bursts of speed." },
  { name: "Nerelle", type: "Tide", color: "#1467c2", icon: "💧", blurb: "Calm and defensive, Nerelle wears down opponents with patience rather than power." },
  { name: "Gustrix", type: "Gale", color: "#1c8a76", icon: "🌪️", blurb: "Rarely seen standing still — Gustrix's whole strategy is outrunning the problem." },
  { name: "Terroc", type: "Stone", color: "#7a5c33", icon: "🪨", blurb: "Slow to move, nearly impossible to knock down. Terroc wins fights of attrition." }
];

const BLADERS = [
  {
    name: "Kaiden Voss",
    role: "Emberclan — Attack specialist",
    color: "#c23f13",
    icon: "🔥",
    blurb: "A shonen-coded rival archetype: loud, competitive, and always chasing the next opponent who can push him further."
  },
  {
    name: "Wren Ashari",
    role: "Starweavers — Balance specialist",
    color: "#5934c2",
    icon: "🌙",
    blurb: "Fantasy-leaning and quietly strategic, Wren treats every duel as a puzzle to be solved before it's fought."
  }
];

const GEAR = [
  { tag: "Driver", name: "Vanta Driver", desc: "A Stamina-lean driver with a wide flat base built to resist knockouts." },
  { tag: "Ring", name: "Aegis Ring", desc: "Heavy defensive ring that raises collision resistance at the cost of top speed." },
  { tag: "Fusion chip", name: "Ember Surge chip", desc: "Channels a bonded Ember-type Wyldkin's burst ability into a one-time speed spike." }
];

const QUIZ_QUESTIONS = [
  {
    q: "A tough match is going against you. What's your first move?",
    options: [
      { text: "Recalculate the matchup — there's a smarter play here.", scores: { collect: 2, spin: 0, story: 0 } },
      { text: "Go all-in on the riskiest, flashiest option.", scores: { collect: 0, spin: 2, story: 1 } },
      { text: "Dig deep — this is a growth moment.", scores: { collect: 0, spin: 1, story: 2 } }
    ]
  },
  {
    q: "Pick a pre-battle ritual.",
    options: [
      { text: "Double-check your team's type coverage.", scores: { collect: 2, spin: 0, story: 0 } },
      { text: "Fine-tune your gear one more time.", scores: { collect: 0, spin: 2, story: 0 } },
      { text: "Hype yourself up with your team by your side.", scores: { collect: 0, spin: 0, story: 2 } }
    ]
  },
  {
    q: "What's most satisfying about winning?",
    options: [
      { text: "Watching a long-term plan finally pay off.", scores: { collect: 2, spin: 1, story: 0 } },
      { text: "The split-second reflex play that clinched it.", scores: { collect: 0, spin: 2, story: 0 } },
      { text: "Seeing how far you and your team have come.", scores: { collect: 0, spin: 0, story: 2 } }
    ]
  },
  {
    q: "Choose a strength to bring into a fight.",
    options: [
      { text: "Patience.", scores: { collect: 2, spin: 0, story: 1 } },
      { text: "Speed.", scores: { collect: 0, spin: 2, story: 0 } },
      { text: "Heart.", scores: { collect: 0, spin: 0, story: 2 } }
    ]
  },
  {
    q: "Pick your ideal arena.",
    options: [
      { text: "A quiet field where strategy can breathe.", scores: { collect: 2, spin: 0, story: 0 } },
      { text: "A hazard-filled stadium with no room to relax.", scores: { collect: 0, spin: 2, story: 0 } },
      { text: "Anywhere your whole team can be together.", scores: { collect: 0, spin: 0, story: 2 } }
    ]
  }
];

const QUIZ_RESULTS = {
  collect: {
    icon: "🧬",
    title: "You're a Collect & Battle strategist",
    body: "You think in matchups and long games. You'd rather out-plan an opponent than out-hype them — team building is where you shine."
  },
  spin: {
    icon: "🌀",
    title: "You're a Spin Duel competitor",
    body: "Fast, decisive, and a little bit fearless. You want the fight resolved in seconds, not turns — tuning your build is half the fun."
  },
  story: {
    icon: "🎬",
    title: "You're here for the story",
    body: "For you, the battle is a vehicle for growth and connection. You'll remember the bond, the rivalry, and the arc long after the final blow."
  }
};

const POLL_OPTIONS = [
  { id: "types", label: "A deep dive on type match-ups" },
  { id: "stadiums", label: "Stadium hazard strategy guide" },
  { id: "tropes", label: "More anime trope breakdowns" },
  { id: "characters", label: "More original character profiles" }
];
