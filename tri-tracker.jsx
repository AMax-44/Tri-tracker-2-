import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0a0e1a", surface: "#131929", card: "#1a2236", border: "#1e2d45",
  swim: "#00c9c8", bike: "#f5a623", run: "#f05f57", strength: "#a78bfa",
  text: "#e8eef8", muted: "#6b7fa3", success: "#22d3a0",
};

// ── WORKOUT PLANS ─────────────────────────────────────────────────────────
// Each discipline has phase-based plans with weekly progressions
const WORKOUTS = {
  swim: {
    icon: "🏊", color: "#00c9c8",
    phases: [
      {
        phase: 1, label: "Foundation", subtitle: "Weeks 1–16 · Build water confidence & technique",
        keyRule: "Never sacrifice form for distance. Technique now = speed later.",
        weeks: [
          { range: "Weeks 1–2", duration: "20 min", sets: [
            { set: "Warm-up", detail: "4 × 25m easy freestyle. Rest 30s between each. Focus: relaxed breathing." },
            { set: "Drill 1 — Catch-up", detail: "4 × 25m catch-up drill. One arm extends fully before the other pulls. Develops long stroke." },
            { set: "Drill 2 — Kick only", detail: "2 × 25m kick with board. Flutter kick, toes pointed. Rest 45s." },
            { set: "Cool-down", detail: "2 × 25m very easy backstroke or walk in pool." },
          ]},
          { range: "Weeks 3–4", duration: "25 min", sets: [
            { set: "Warm-up", detail: "200m easy (4 × 50m). Rest 20s between each." },
            { set: "Drill — Fingertip drag", detail: "4 × 25m fingertip drag: drag fingertips along surface on recovery. Builds high elbow." },
            { set: "Main set", detail: "4 × 50m freestyle. Rest 45s. Focus: breathing every 3 strokes (bilateral)." },
            { set: "Cool-down", detail: "100m easy backstroke." },
          ]},
          { range: "Weeks 5–8", duration: "30–35 min", sets: [
            { set: "Warm-up", detail: "300m easy (6 × 50m). Rest 15s." },
            { set: "Drill set", detail: "4 × 25m choice of drill (catch-up, fingertip drag, or side kick). Rest 30s." },
            { set: "Main set", detail: "6 × 50m at comfortable effort. Rest 30s. Target: complete each without stopping." },
            { set: "Build", detail: "2 × 100m. Rest 60s. Focus: consistent stroke, not speed." },
            { set: "Cool-down", detail: "100m easy." },
          ]},
          { range: "Weeks 9–12", duration: "40 min", sets: [
            { set: "Warm-up", detail: "400m easy. Mix freestyle and backstroke." },
            { set: "Drill set", detail: "4 × 50m: 25m drill + 25m swim. Rest 20s." },
            { set: "Main set", detail: "3 × 200m at steady effort. Rest 90s. Goal: no wall grabs mid-length." },
            { set: "Sprint finish", detail: "4 × 25m at strong effort. Rest 30s." },
            { set: "Cool-down", detail: "100m easy." },
          ]},
          { range: "Weeks 13–16", duration: "45 min", sets: [
            { set: "Warm-up", detail: "400m easy." },
            { set: "Drill set", detail: "4 × 50m your weakest drill. Rest 20s." },
            { set: "Main set", detail: "1 × 400m continuous. Rest 2 min. Then 4 × 100m at steady pace. Rest 45s." },
            { set: "Cool-down", detail: "200m easy. Milestone: 400m continuous swim ✅" },
          ]},
        ],
        tips: ["If you can't complete a set, rest more — don't skip it", "Bilateral breathing (every 3 strokes) is worth learning early", "Swim slower than feels necessary for the first 4 weeks"],
      },
      {
        phase: 2, label: "Build", subtitle: "Weeks 17–42 · Distance & open water confidence",
        keyRule: "One long swim per week. One drill/technique swim. Increase distance max 10% per week.",
        weeks: [
          { range: "Weeks 17–20", duration: "50 min", sets: [
            { set: "Warm-up", detail: "400m easy." },
            { set: "Drill set", detail: "4 × 50m sighting drill (lift head every 6 strokes). Prepares for open water." },
            { set: "Main set", detail: "3 × 300m steady. Rest 90s. Target: 300m in under 7 min." },
            { set: "Cool-down", detail: "200m easy." },
          ]},
          { range: "Weeks 21–28", duration: "55–60 min", sets: [
            { set: "Warm-up", detail: "500m easy." },
            { set: "Main set A", detail: "1 × 800m steady. Rest 3 min." },
            { set: "Main set B", detail: "4 × 100m at race effort. Rest 45s." },
            { set: "Cool-down", detail: "200m easy." },
          ]},
          { range: "Weeks 29–42", duration: "60 min", sets: [
            { set: "Warm-up", detail: "500m easy." },
            { set: "Main set", detail: "1 × 1500m continuous. Target: complete without stopping." },
            { set: "Speed set", detail: "4 × 50m fast. Rest 30s." },
            { set: "Cool-down", detail: "200m easy. Milestone: 1.5km swim ✅" },
          ]},
        ],
        tips: ["Book an open water swim session when you hit 1km continuous", "Wetsuits add buoyancy — try one before race day, not on it", "Sight every 10 strokes in open water (bilateral breathing helps)"],
      },
      {
        phase: 3, label: "Race Prep", subtitle: "Weeks 43–76 · Race-pace & race-simulation",
        keyRule: "Swim 1.9km in training before race day. At least once.",
        weeks: [
          { range: "Weeks 43–60", duration: "60 min", sets: [
            { set: "Warm-up", detail: "400m easy." },
            { set: "Race pace set", detail: "4 × 400m at goal race pace. Rest 2 min." },
            { set: "Sprint finish", detail: "4 × 50m hard. Rest 30s. (Simulates surge at swim exit)" },
            { set: "Cool-down", detail: "200m easy." },
          ]},
          { range: "Weeks 61–76", duration: "65 min", sets: [
            { set: "Warm-up", detail: "400m easy." },
            { set: "Race sim", detail: "1 × 1900m at race effort. This IS your race distance. Own it." },
            { set: "Cool-down", detail: "200m very easy. Shake it out." },
          ]},
        ],
        tips: ["Practice T1: get out of pool, remove wetsuit, run 400m. Do this in training.", "Race morning: warm up 400m if allowed. It makes a huge difference.", "Seed yourself honestly at race start — don't get swum over"],
      },
    ],
  },

  bike: {
    icon: "🚴", color: "#f5a623",
    phases: [
      {
        phase: 1, label: "Foundation", subtitle: "Weeks 1–16 · Build aerobic base on the spin bike",
        keyRule: "Zone 2 only. If you can't hold a conversation, you're going too hard.",
        weeks: [
          { range: "Weeks 1–2", duration: "30–40 min", sets: [
            { set: "Warm-up", detail: "5 min easy spin, resistance 1–2. Legs only waking up." },
            { set: "Main block", detail: "20 min steady Zone 2. Resistance where breathing is comfortable. Cadence 80–90 RPM." },
            { set: "Interval intro", detail: "4 × 1 min slightly harder effort, 1 min easy. Just a taste." },
            { set: "Cool-down", detail: "5 min easy spin. Stretch quads and calves after." },
          ]},
          { range: "Weeks 3–6", duration: "45 min", sets: [
            { set: "Warm-up", detail: "8 min progressive. Start easy, add resistance each 2 min." },
            { set: "Main block", detail: "30 min Zone 2 steady. Target HR: 60–70% max (roughly 220 minus your age)." },
            { set: "Cadence drill", detail: "5 × 1 min high cadence (100+ RPM, low resistance). Rest 1 min easy between." },
            { set: "Cool-down", detail: "7 min easy." },
          ]},
          { range: "Weeks 7–12", duration: "50–55 min", sets: [
            { set: "Warm-up", detail: "10 min progressive." },
            { set: "Main block", detail: "35 min Zone 2. Practice staying in zone — resist urge to push harder." },
            { set: "Strength intervals", detail: "3 × 5 min at moderate-hard effort (Zone 3). Rest 3 min easy between." },
            { set: "Cool-down", detail: "5 min easy." },
          ]},
          { range: "Weeks 13–16", duration: "60 min", sets: [
            { set: "Warm-up", detail: "10 min progressive." },
            { set: "Long steady block", detail: "45 min Zone 2 continuous. Build your biggest aerobic session yet." },
            { set: "Cool-down", detail: "5 min easy spin." },
          ]},
        ],
        tips: ["Saddle height: knee slightly bent at bottom of pedal stroke — get this right early", "Cadence matters more than resistance. Spin, don't grind.", "Zone 2 feels embarrassingly easy. That's correct."],
      },
      {
        phase: 2, label: "Build", subtitle: "Weeks 17–42 · Transition to road bike, longer rides",
        keyRule: "Get your road bike by Week 20. You need outdoor riding before race day.",
        weeks: [
          { range: "Weeks 17–22", duration: "75 min", sets: [
            { set: "Warm-up", detail: "10 min easy." },
            { set: "Main block", detail: "55 min steady with 3 × 8 min at Zone 3 (harder but sustainable). 4 min easy between." },
            { set: "Cool-down", detail: "10 min easy." },
          ]},
          { range: "Weeks 23–32", duration: "90 min", sets: [
            { set: "Warm-up", detail: "15 min progressive." },
            { set: "Main block", detail: "60 min Zone 2 base, then 3 × 5 min race pace efforts. Rest 5 min between." },
            { set: "Brick prep", detail: "Final 5 min: increase cadence, lower resistance — prep legs for the run." },
            { set: "Cool-down", detail: "10 min easy." },
          ]},
          { range: "Weeks 33–42", duration: "90–105 min", sets: [
            { set: "Outdoor ride goal", detail: "60–80km at aerobic pace. Aim for 2:30–3:00 hrs. Bring nutrition." },
            { set: "Nutrition practice", detail: "Drink every 15 min. Eat every 30–40 min (banana, bar, gel). Practice this NOW." },
            { set: "Cadence target", detail: "Hold 85–95 RPM on flats. Don't let cadence drop on hills — shift down." },
          ]},
        ],
        tips: ["Helmet, lights, and sunscreen before every outdoor ride", "Learn to eat and drink while riding — practice in training", "Hills: resist the urge to smash them. Stay aerobic."],
      },
      {
        phase: 3, label: "Race Prep", subtitle: "Weeks 43–76 · 90km simulation & race pace",
        keyRule: "Ride 90km in training at least twice. Know your nutrition plan.",
        weeks: [
          { range: "Weeks 43–60", duration: "2:30–3:00 hrs", sets: [
            { set: "Race sim ride", detail: "70–80km at goal race effort. Bring 2 bottles, 3 gels or bars. Eat to plan." },
            { set: "Brick run", detail: "Immediately after: 20–30 min run at easy pace. Legs will feel weird — this is normal." },
          ]},
          { range: "Weeks 61–76", duration: "3:00+ hrs", sets: [
            { set: "Full distance simulation", detail: "90km ride followed by 45 min run. This is your race day rehearsal." },
            { set: "Race nutrition", detail: "Use exactly what will be on the race course. No experimenting on race day." },
          ]},
        ],
        tips: ["Taper your long rides 2–3 weeks before race day", "Check tyre pressure before every outdoor ride", "Aero position: get comfortable in drops for 90km"],
      },
    ],
  },

  run: {
    icon: "🏃", color: "#f05f57",
    phases: [
      {
        phase: 1, label: "Foundation", subtitle: "Weeks 1–16 · Run/walk to continuous running",
        keyRule: "The run/walk method is not a crutch — it's science. Jeff Galloway used it to get millions across finish lines.",
        weeks: [
          { range: "Weeks 1–2", duration: "20 min", sets: [
            { set: "Warm-up", detail: "5 min brisk walk. Swing arms, loosen hips." },
            { set: "Run/walk intervals", detail: "8 × (1 min jog + 2 min walk). Jog = conversational pace. If breathing hard, slow down." },
            { set: "Cool-down", detail: "3 min easy walk. Calf stretch, quad stretch, hip flexor stretch — 30s each side." },
          ]},
          { range: "Weeks 3–4", duration: "25 min", sets: [
            { set: "Warm-up", detail: "5 min walk." },
            { set: "Run/walk intervals", detail: "7 × (2 min jog + 1 min walk). You should finish feeling like you could do more." },
            { set: "Cool-down", detail: "3 min walk + stretch routine." },
          ]},
          { range: "Weeks 5–7", duration: "28 min", sets: [
            { set: "Warm-up", detail: "5 min walk." },
            { set: "Run/walk intervals", detail: "5 × (3 min jog + 1 min walk). Watch pace: aim for 7–8 min/km. Slow is fine." },
            { set: "Cool-down", detail: "3 min walk + stretch." },
          ]},
          { range: "Weeks 8–10", duration: "30 min", sets: [
            { set: "Warm-up", detail: "5 min walk." },
            { set: "Run/walk intervals", detail: "4 × (5 min jog + 1 min walk). First milestone: 5 min continuous run." },
            { set: "Cool-down", detail: "4 min walk + stretch. Hip flexors and achilles especially." },
          ]},
          { range: "Weeks 11–13", duration: "35 min", sets: [
            { set: "Warm-up", detail: "5 min walk." },
            { set: "Extended run", detail: "3 × (8 min jog + 1 min walk). If one interval feels hard, that's fine. Finish it." },
            { set: "Cool-down", detail: "4 min walk + stretch." },
          ]},
          { range: "Weeks 14–16", duration: "30 min", sets: [
            { set: "Warm-up", detail: "5 min walk." },
            { set: "Continuous run target", detail: "20 min continuous run. Go slow. Shuffle if you have to. Do not walk unless in pain." },
            { set: "Cool-down", detail: "5 min walk. This is a milestone — 20 min no-stop run ✅" },
          ]},
        ],
        tips: [
          "Shin splints are a warning sign — reduce volume, not intensity first",
          "Run on grass or trail when possible in first 8 weeks (lower impact)",
          "Never increase weekly run time by more than 10%",
          "Two rest days between runs in weeks 1–4",
        ],
      },
      {
        phase: 2, label: "Build", subtitle: "Weeks 17–42 · Build to 10km",
        keyRule: "One long run per week. One short easy run. Never two hard runs back to back.",
        weeks: [
          { range: "Weeks 17–22", duration: "35–40 min", sets: [
            { set: "Warm-up", detail: "5 min walk + 5 min easy jog." },
            { set: "Main run", detail: "25–30 min continuous at easy pace (Zone 2). Aim: comfortable enough to talk." },
            { set: "Strides", detail: "4 × 20 sec accelerations on flat ground. Rest 40 sec. Builds leg turnover." },
            { set: "Cool-down", detail: "5 min walk + full stretch routine." },
          ]},
          { range: "Weeks 23–32", duration: "45–50 min", sets: [
            { set: "Warm-up", detail: "10 min easy jog." },
            { set: "Tempo block", detail: "3 × 5 min at comfortably hard pace (Zone 3). Rest 3 min easy jog between." },
            { set: "Easy finish", detail: "10 min easy jog." },
            { set: "Cool-down", detail: "5 min walk + stretch." },
          ]},
          { range: "Weeks 33–42", duration: "55–60 min", sets: [
            { set: "Long run", detail: "50–60 min easy pace. Build toward 10km. Walk 1 min every 15 min if needed." },
            { set: "Run nutrition", detail: "For runs over 45 min: carry water and take a gel at 30 min. Practice this." },
          ]},
        ],
        tips: ["Add a second run day (easy 25 min) from week 20 onward", "Cadence target: 170–180 steps per minute (use a metronome app)", "Running off the bike feels terrible at first — it gets better"],
      },
      {
        phase: 3, label: "Race Prep", subtitle: "Weeks 43–76 · Half marathon pace & brick runs",
        keyRule: "The 70.3 run is 21.1km after 1.9km swim and 90km bike. Train accordingly.",
        weeks: [
          { range: "Weeks 43–60", duration: "60–75 min", sets: [
            { set: "Warm-up", detail: "10 min easy." },
            { set: "Race pace intervals", detail: "4 × 2km at goal race pace. Rest 3 min walk/jog between." },
            { set: "Cool-down", detail: "10 min easy jog + stretch." },
          ]},
          { range: "Weeks 61–76", duration: "75–90 min", sets: [
            { set: "Long run", detail: "15–18km at easy/aerobic pace. Don't run 21km before race day — trust your training." },
            { set: "Post-brick run", detail: "After your long bike: 20–40 min at easy pace. Your legs will adapt." },
          ]},
        ],
        tips: ["Taper run volume (but not intensity) 2–3 weeks before race", "Race day run: start slower than you think. The back half of a 70.3 run is brutal if you go out too fast.", "Wear your race shoes in training for 8+ weeks before race day"],
      },
    ],
  },

  strength: {
    icon: "💪", color: "#a78bfa",
    phases: [
      {
        phase: 1, label: "Foundation", subtitle: "Weeks 1–16 · Injury prevention & movement patterns",
        keyRule: "This is not about getting big. It's about making your joints bulletproof for 18 months of training.",
        weeks: [
          { range: "Weeks 1–4", duration: "25–30 min", sets: [
            { set: "Glute bridges", detail: "3 × 15 reps. Lie on back, feet flat, drive hips up, squeeze glutes at top. Rest 60s. Protects knees and lower back." },
            { set: "Bodyweight squats", detail: "3 × 12 reps. Feet shoulder-width, toes slightly out. Sit back like a chair. Keep chest up." },
            { set: "Push-ups", detail: "3 × 8–10 reps (knees if needed). Builds shoulder stability for swim." },
            { set: "Dead bug", detail: "3 × 8 reps each side. Lie on back, extend opposite arm/leg, keep lower back flat. Core control." },
            { set: "Calf raises", detail: "3 × 20 reps (on step if possible). Injury-proofs Achilles for running." },
          ]},
          { range: "Weeks 5–8", duration: "30 min", sets: [
            { set: "Single-leg glute bridge", detail: "3 × 10 each leg. Harder version — isolates glute med. Prevents IT band issues." },
            { set: "Reverse lunges", detail: "3 × 10 each leg. Step back, lower back knee toward floor. Control the descent." },
            { set: "Push-ups", detail: "3 × 12. Aim for full version by week 8." },
            { set: "Bird-dog", detail: "3 × 10 each side. On all fours, extend opposite arm and leg. Hold 2 sec. Spine neutral." },
            { set: "Plank", detail: "3 × 20–30 sec. Straight line from head to heel. Don't hold breath." },
          ]},
          { range: "Weeks 9–16", duration: "35 min", sets: [
            { set: "Bulgarian split squat", detail: "3 × 8 each leg. Rear foot elevated on chair. Best single-leg strength exercise for triathletes." },
            { set: "Push-ups with rotation", detail: "3 × 8 each side. At top of push-up, rotate to side plank. Swim-specific." },
            { set: "Side plank", detail: "3 × 20 sec each side. Hip stays up — lateral core for run stability." },
            { set: "Hip flexor lunge stretch hold", detail: "3 × 30 sec each side. Cyclists get chronically tight hip flexors. Fix this now." },
            { set: "Superman hold", detail: "3 × 10 reps. Lie face down, lift arms and legs. Lower back endurance for bike position." },
          ]},
        ],
        tips: ["Sore the next day = good. Sharp pain during = stop immediately", "This session is your most important injury prevention tool", "Never skip it because it feels easy — that's the point"],
      },
      {
        phase: 2, label: "Build", subtitle: "Weeks 17–42 · Add resistance, maintain mobility",
        keyRule: "Add resistance bands or light dumbbells. Keep mobility work as your warmup.",
        weeks: [
          { range: "Weeks 17–30", duration: "35–40 min", sets: [
            { set: "Goblet squat", detail: "3 × 12. Hold dumbbell or backpack at chest. Deeper squat, more glute activation." },
            { set: "Romanian deadlift", detail: "3 × 10. Hinge at hip, push bum back, feel hamstrings. Key for run power." },
            { set: "Resistance band pull-apart", detail: "3 × 15. Band in both hands, pull apart at chest height. Shoulder health for swim." },
            { set: "Copenhagen plank", detail: "3 × 10 sec each side. Inner thigh & adductor strength — prevents groin injuries." },
            { set: "Calf raises on step", detail: "3 × 20 slow reps. Eccentric (slow lower) — loads Achilles safely." },
          ]},
          { range: "Weeks 31–42", duration: "40 min", sets: [
            { set: "Step-ups with knee drive", detail: "3 × 10 each leg. Step onto box or stair, drive opposite knee up. Run-specific power." },
            { set: "Dumbbell row", detail: "3 × 10 each arm. Knee on bench, pull elbow past hip. Swim pull strength." },
            { set: "Lateral band walks", detail: "3 × 15 steps each direction. Band above knees, squat position, step sideways. Glute med strength." },
            { set: "Plank variations", detail: "3 × 30 sec: regular, left side, right side. Core endurance for long bike." },
          ]},
        ],
        tips: ["By Phase 2 you should feel strength in your bike climb and run stride", "Mobility: spend 5 min on hips and thoracic spine before every session", "Strength reduces perceived effort — everything else gets easier"],
      },
      {
        phase: 3, label: "Race Prep", subtitle: "Weeks 43–76 · Maintain, don't build",
        keyRule: "Drop to 1 strength session per week. Maintain what you've built. Don't add new exercises close to race.",
        weeks: [
          { range: "Weeks 43–73", duration: "30 min", sets: [
            { set: "Maintenance circuit", detail: "2 rounds: Goblet squat × 10, Romanian deadlift × 10, Push-up × 10, Side plank × 20s each, Calf raise × 15. Minimal rest." },
            { set: "Mobility", detail: "10 min: hip flexor stretch, thoracic rotation, ankle circles. Non-negotiable." },
          ]},
          { range: "Weeks 74–76 (Race taper)", duration: "20 min", sets: [
            { set: "Light activation only", detail: "Glute bridges × 15, bodyweight squats × 10, band pull-aparts × 15. Wake up the muscles, don't load them." },
          ]},
        ],
        tips: ["Don't try new exercises in the last 6 weeks before race day", "DOMS (muscle soreness) before a race = problem. Keep it light.", "Strength is your insurance policy — keep paying the premium"],
      },
    ],
  },
};

// ── PHASES / SCHEDULE ─────────────────────────────────────────────────────
const PHASES = [
  { id: 1, name: "Phase 1", label: "Foundation", months: "Months 1–4", goal: "Build the habit, aerobic base & injury-proof your body.", weeks: 16 },
  { id: 2, name: "Phase 2", label: "Build", months: "Months 5–10", goal: "Extend duration, introduce brick sessions.", weeks: 26 },
  { id: 3, name: "Phase 3", label: "Race Prep", months: "Months 11–18", goal: "Race-specific volume, simulate race conditions.", weeks: 34 },
];

const WEEK_TEMPLATE = [
  { day: "Mon", discipline: "swim",     label: "Swim",     icon: "🏊", duration: 45, note: "Focus on technique. Drills > distance." },
  { day: "Tue", discipline: "bike",     label: "Bike",     icon: "🚴", duration: 45, note: "Zone 2 only — conversational pace." },
  { day: "Wed", discipline: "run",      label: "Run/Walk", icon: "🏃", duration: 30, note: "2 min run / 1 min walk intervals." },
  { day: "Thu", discipline: "strength", label: "Strength", icon: "💪", duration: 30, note: "Squats, lunges, glute bridges, planks, push-ups." },
  { day: "Fri", discipline: "swim",     label: "Swim",     icon: "🏊", duration: 45, note: "Build continuous distance." },
  { day: "Sat", discipline: "rest",     label: "Rest",     icon: "😴", duration: 0,  note: "Active recovery — walk, stretch, sleep." },
  { day: "Sun", discipline: "bike",     label: "Bike",     icon: "🚴", duration: 60, note: "Longer steady effort. Stay in Zone 2." },
];

const DISCIPLINE_COLOR = { swim: COLORS.swim, bike: COLORS.bike, run: COLORS.run, strength: COLORS.strength, rest: COLORS.muted };

const MILESTONES = [
  { week: 4, label: "Swim 400m continuous" },
  { week: 8, label: "Run 20 min no walk breaks" },
  { week: 12, label: "Bike 60 min steady" },
  { week: 16, label: "First Sprint Tri test race" },
  { week: 24, label: "Swim 1.5km / Bike 60km / Run 10km — each separately" },
  { week: 36, label: "Enter a Half Ironman event 🎯" },
];

// ── Helpers ───────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-AU", { day: "numeric", month: "short" });

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ── Shared UI ─────────────────────────────────────────────────────────────
const btnStyle = { border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center" };

function Card({ children, style = {} }) {
  return <div style={{ background: COLORS.card, borderRadius: 12, padding: "14px 16px", marginBottom: 12, border: `1px solid ${COLORS.border}`, ...style }}>{children}</div>;
}
function Badge({ color, children }) {
  return <span style={{ background: color + "22", color, border: `1px solid ${color}55`, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{children}</span>;
}
function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return <div style={{ background: COLORS.border, borderRadius: 4, height: 6, overflow: "hidden" }}><div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 4, transition: "width .4s" }} /></div>;
}
function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{ display: "flex", borderBottom: `1px solid ${COLORS.border}`, background: COLORS.surface }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{ flex: 1, padding: "14px 4px", border: "none", background: "none", color: active === t.id ? COLORS.swim : COLORS.muted, fontSize: 11, fontWeight: active === t.id ? 700 : 400, borderBottom: active === t.id ? `2px solid ${COLORS.swim}` : "2px solid transparent", cursor: "pointer", transition: "color .2s" }}>
          <div style={{ fontSize: 18, marginBottom: 2 }}>{t.icon}</div>
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── WORKOUT DETAIL MODAL ──────────────────────────────────────────────────
function WorkoutModal({ discipline, weekNum, onClose }) {
  const plan = WORKOUTS[discipline];
  if (!plan) return null;
  const phase = weekNum <= 16 ? 0 : weekNum <= 42 ? 1 : 2;
  const phaseData = plan.phases[phase];
  const weekData = phaseData.weeks.find((_, i) => i === phaseData.weeks.length - 1) ||
    phaseData.weeks.reduce((best, w, i) => {
      const startWk = parseInt(w.range.match(/\d+/)?.[0] || "1");
      return startWk <= ((phase === 0 ? weekNum : phase === 1 ? weekNum - 16 : weekNum - 42)) ? i : best;
    }, 0);
  const wData = typeof weekData === "number" ? phaseData.weeks[weekData] : weekData;
  const color = plan.color;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000a", zIndex: 100, display: "flex", alignItems: "flex-end" }} onClick={onClose}>
      <div style={{ background: COLORS.bg, borderRadius: "16px 16px 0 0", width: "100%", maxHeight: "88vh", overflowY: "auto", padding: "0 0 32px" }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ position: "sticky", top: 0, background: COLORS.surface, padding: "16px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>{plan.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ color, fontWeight: 700, fontSize: 16 }}>{discipline.toUpperCase()} — {phaseData.label}</div>
            <div style={{ color: COLORS.muted, fontSize: 12 }}>{phaseData.subtitle}</div>
          </div>
          <button onClick={onClose} style={{ ...btnStyle, background: COLORS.border, color: COLORS.muted, width: 32, height: 32, borderRadius: "50%", fontSize: 16 }}>✕</button>
        </div>

        <div style={{ padding: "16px" }}>
          {/* Key rule */}
          <div style={{ background: color + "15", border: `1px solid ${color}40`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
            <div style={{ color, fontSize: 11, fontWeight: 700, marginBottom: 4 }}>KEY RULE</div>
            <div style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.5 }}>{phaseData.keyRule}</div>
          </div>

          {/* Today's session */}
          <div style={{ color: COLORS.text, fontWeight: 700, marginBottom: 10 }}>
            Today's Session <span style={{ color: COLORS.muted, fontWeight: 400, fontSize: 12 }}>({wData?.range})</span>
          </div>
          {wData?.duration && (
            <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 12 }}>⏱ Target: {wData.duration}</div>
          )}
          {wData?.sets?.map((s, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <div style={{ color, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{s.set}</div>
              <div style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.6 }}>{s.detail}</div>
            </Card>
          ))}

          {/* Tips */}
          <div style={{ color: COLORS.text, fontWeight: 700, marginBottom: 10, marginTop: 4 }}>💡 Tips for this phase</div>
          {phaseData.tips?.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
              <div style={{ color, flexShrink: 0, marginTop: 2 }}>▸</div>
              <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5 }}>{t}</div>
            </div>
          ))}

          {/* All weeks in phase (collapsed) */}
          <ProgressionView phaseData={phaseData} color={color} />
        </div>
      </div>
    </div>
  );
}

function ProgressionView({ phaseData, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <button onClick={() => setOpen(o => !o)} style={{ ...btnStyle, background: COLORS.surface, color: COLORS.muted, border: `1px solid ${COLORS.border}`, width: "100%", padding: "12px", fontSize: 13 }}>
        {open ? "▲ Hide" : "▼ Show"} full phase progression
      </button>
      {open && phaseData.weeks.map((w, i) => (
        <Card key={i} style={{ marginTop: 10 }}>
          <div style={{ color, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>{w.range} {w.duration ? `· ${w.duration}` : ""}</div>
          {w.sets?.map((s, j) => (
            <div key={j} style={{ marginBottom: 8 }}>
              <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 12 }}>{s.set}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>{s.detail}</div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}

// ── TODAY TAB ─────────────────────────────────────────────────────────────
function TodayTab({ logs, onLog, startDate, weekNum }) {
  const todayStr = today();
  const dayOfWeek = new Date().getDay();
  const dayMap = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
  const sessionIdx = dayMap[dayOfWeek];
  const session = WEEK_TEMPLATE[sessionIdx];
  const alreadyLogged = logs.some(l => l.date === todayStr);
  const [duration, setDuration] = useState(session.duration || 30);
  const [notes, setNotes] = useState("");
  const [feel, setFeel] = useState(3);
  const [done, setDone] = useState(false);
  const [showWorkout, setShowWorkout] = useState(false);

  function submit() { onLog({ date: todayStr, discipline: session.discipline, duration, feel, notes }); setDone(true); }
  const color = DISCIPLINE_COLOR[session.discipline];

  return (
    <div style={{ padding: "16px 14px" }}>
      {showWorkout && <WorkoutModal discipline={session.discipline} weekNum={weekNum} onClose={() => setShowWorkout(false)} />}
      <div style={{ color: COLORS.muted, fontSize: 12, marginBottom: 4 }}>
        {new Date().toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })}
      </div>
      <div style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, marginBottom: 16 }}>
        Week {weekNum} · {session.icon} {session.label}
      </div>

      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 32 }}>{session.icon}</span>
          <div>
            <Badge color={color}>{session.discipline.toUpperCase()}</Badge>
            <div style={{ color: COLORS.text, fontWeight: 600, marginTop: 4 }}>{session.label}</div>
          </div>
          {session.duration > 0 && <div style={{ marginLeft: "auto", color, fontSize: 20, fontWeight: 700 }}>{session.duration}<span style={{ fontSize: 12, color: COLORS.muted }}> min</span></div>}
        </div>
        <div style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 12 }}>{session.note}</div>
        {WORKOUTS[session.discipline] && (
          <button onClick={() => setShowWorkout(true)} style={{ ...btnStyle, background: color + "22", color, border: `1px solid ${color}55`, padding: "10px 16px", fontSize: 13, fontWeight: 700, width: "100%" }}>
            📋 View today's workout plan
          </button>
        )}
      </Card>

      {alreadyLogged || done ? (
        <Card style={{ textAlign: "center", padding: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✅</div>
          <div style={{ color: COLORS.success, fontWeight: 700, fontSize: 16 }}>Session logged!</div>
          <div style={{ color: COLORS.muted, fontSize: 13, marginTop: 4 }}>Rest up. See you tomorrow.</div>
        </Card>
      ) : session.discipline === "rest" ? (
        <Card style={{ textAlign: "center", padding: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>😴</div>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>Rest day. Recovery is training too.</div>
        </Card>
      ) : (
        <Card>
          <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 12 }}>Log this session</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: COLORS.muted, fontSize: 12, display: "block", marginBottom: 6 }}>DURATION (minutes)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={() => setDuration(d => Math.max(5, d - 5))} style={{ ...btnStyle, background: COLORS.border, color: COLORS.text, width: 36, height: 36 }}>−</button>
              <span style={{ color: COLORS.text, fontSize: 22, fontWeight: 700, minWidth: 40, textAlign: "center" }}>{duration}</span>
              <button onClick={() => setDuration(d => d + 5)} style={{ ...btnStyle, background: COLORS.border, color: COLORS.text, width: 36, height: 36 }}>+</button>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ color: COLORS.muted, fontSize: 12, display: "block", marginBottom: 6 }}>HOW DID IT FEEL?</label>
            <div style={{ display: "flex", gap: 8 }}>
              {["😩","😕","😐","🙂","💪"].map((e, i) => (
                <button key={i} onClick={() => setFeel(i + 1)} style={{ flex: 1, padding: "8px 0", border: `2px solid ${feel === i+1 ? color : COLORS.border}`, borderRadius: 8, background: feel === i+1 ? color + "22" : "transparent", fontSize: 20, cursor: "pointer" }}>{e}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: COLORS.muted, fontSize: 12, display: "block", marginBottom: 6 }}>NOTES (optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="How'd it go? Any pain? PBs?" style={{ width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "10px 12px", color: COLORS.text, fontSize: 14, resize: "none", height: 72, boxSizing: "border-box" }} />
          </div>
          <button onClick={submit} style={{ ...btnStyle, background: color, color: "#000", width: "100%", padding: "14px", fontWeight: 700, fontSize: 15 }}>✓ Mark Complete</button>
        </Card>
      )}
    </div>
  );
}

// ── WORKOUTS TAB ──────────────────────────────────────────────────────────
function WorkoutsTab({ weekNum }) {
  const [selected, setSelected] = useState(null);
  const disciplines = ["swim", "bike", "run", "strength"];
  return (
    <div style={{ padding: "16px 14px" }}>
      {selected && <WorkoutModal discipline={selected} weekNum={weekNum} onClose={() => setSelected(null)} />}
      <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Workout Plans</div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>Beginner-progressive. Tap a discipline.</div>
      {disciplines.map(d => {
        const plan = WORKOUTS[d];
        const phase = weekNum <= 16 ? 0 : weekNum <= 42 ? 1 : 2;
        const pd = plan.phases[phase];
        return (
          <button key={d} onClick={() => setSelected(d)} style={{ ...btnStyle, width: "100%", background: COLORS.card, border: `1px solid ${COLORS.border}`, marginBottom: 12, padding: "16px", textAlign: "left", borderRadius: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: plan.color + "20", border: `2px solid ${plan.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{plan.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 15 }}>{d.charAt(0).toUpperCase() + d.slice(1)}</div>
                <div style={{ color: plan.color, fontSize: 11, fontWeight: 700 }}>{pd.label}</div>
                <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 2 }}>{pd.subtitle.split("·")[1]?.trim()}</div>
              </div>
              <div style={{ color: COLORS.muted, fontSize: 20 }}>›</div>
            </div>
          </button>
        );
      })}
      <Card style={{ background: COLORS.surface }}>
        <div style={{ color: COLORS.swim, fontWeight: 700, fontSize: 12, marginBottom: 8 }}>📍 YOU ARE HERE — Week {weekNum}</div>
        <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6 }}>
          {weekNum <= 16 ? "Phase 1: Foundation. Every plan shows your beginner-level sessions. Focus on building habits, not performance." : weekNum <= 42 ? "Phase 2: Build. Sessions are longer and more structured. Brick sessions starting soon." : "Phase 3: Race Prep. Race-specific work. Trust your base." }
        </div>
      </Card>
    </div>
  );
}

// ── PROGRAM TAB ───────────────────────────────────────────────────────────
function ProgramTab() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{ padding: "16px 14px" }}>
      <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Your 18-Month Plan</div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 16 }}>Couch → Half Ironman 70.3</div>
      {PHASES.map(p => (
        <Card key={p.id} style={{ cursor: "pointer" }}>
          <div onClick={() => setOpen(open === p.id ? null : p.id)} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: COLORS.swim + "22", border: `2px solid ${COLORS.swim}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.swim, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{p.id}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: COLORS.text, fontWeight: 700 }}>{p.name} — {p.label}</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>{p.months}</div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 18 }}>{open === p.id ? "▲" : "▼"}</div>
          </div>
          {open === p.id && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>{p.goal}</div>
              <div style={{ color: COLORS.text, fontWeight: 600, fontSize: 12, marginBottom: 8 }}>WEEKLY SCHEDULE</div>
              {WEEK_TEMPLATE.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ color: COLORS.muted, fontSize: 11, width: 28 }}>{s.day}</div>
                  <div style={{ fontSize: 16 }}>{s.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: COLORS.text, fontSize: 13 }}>{s.label}</div>
                    <div style={{ color: COLORS.muted, fontSize: 11 }}>{s.note}</div>
                  </div>
                  {s.duration > 0 && <Badge color={DISCIPLINE_COLOR[s.discipline]}>{s.duration}m</Badge>}
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
      <div style={{ color: COLORS.text, fontWeight: 700, marginBottom: 10, marginTop: 4 }}>Key Milestones</div>
      {MILESTONES.map((m, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <div style={{ background: COLORS.swim + "22", color: COLORS.swim, borderRadius: 8, padding: "4px 8px", fontSize: 11, fontWeight: 700, minWidth: 52, textAlign: "center" }}>Wk {m.week}</div>
          <div style={{ color: COLORS.text, fontSize: 13 }}>{m.label}</div>
        </div>
      ))}
      <Card style={{ marginTop: 4 }}>
        <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 8 }}>Equipment timeline</div>
        {[
          { when: "Now", item: "Running shoes (fitted at a run store)", icon: "👟" },
          { when: "Week 1", item: "Heart rate monitor (Garmin or chest strap)", icon: "❤️" },
          { when: "Month 5", item: "Road or hybrid bike", icon: "🚴" },
          { when: "Month 8", item: "Wetsuit (second-hand is fine)", icon: "🤿" },
          { when: "Month 10", item: "Tri shorts for brick sessions", icon: "🩳" },
        ].map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>{e.icon}</span>
            <div>
              <div style={{ color: COLORS.muted, fontSize: 11 }}>{e.when}</div>
              <div style={{ color: COLORS.text, fontSize: 13 }}>{e.item}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── TRACK TAB ─────────────────────────────────────────────────────────────
function TrackTab({ logs, startDate }) {
  const totalByDiscipline = {};
  logs.forEach(l => { totalByDiscipline[l.discipline] = (totalByDiscipline[l.discipline] || 0) + (l.duration || 0); });
  const recentLogs = [...logs].reverse().slice(0, 15);
  return (
    <div style={{ padding: "16px 14px" }}>
      <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Activity Log</div>
      {logs.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
          <div style={{ color: COLORS.muted, fontSize: 14 }}>No sessions logged yet.<br />Complete today's session to get started.</div>
        </Card>
      ) : (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            {Object.entries(totalByDiscipline).map(([disc, mins]) => (
              <Card key={disc} style={{ marginBottom: 0 }}>
                <div style={{ color: DISCIPLINE_COLOR[disc] || COLORS.muted, fontSize: 20 }}>{{ swim: "🏊", bike: "🚴", run: "🏃", strength: "💪" }[disc] || "🏋️"}</div>
                <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 18 }}>{Math.floor(mins / 60)}h {mins % 60}m</div>
                <div style={{ color: COLORS.muted, fontSize: 11, textTransform: "uppercase" }}>{disc}</div>
              </Card>
            ))}
          </div>
          <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 10 }}>Recent sessions</div>
          {recentLogs.map((l, i) => (
            <Card key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 24 }}>{{ swim: "🏊", bike: "🚴", run: "🏃", strength: "💪" }[l.discipline] || "🏋️"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <Badge color={DISCIPLINE_COLOR[l.discipline] || COLORS.muted}>{l.discipline}</Badge>
                  <span style={{ color: COLORS.muted, fontSize: 12 }}>{fmtDate(l.date)}</span>
                </div>
                {l.notes && <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{l.notes}</div>}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: COLORS.text, fontWeight: 700 }}>{l.duration}m</div>
                <div style={{ fontSize: 16 }}>{"😩😕😐🙂💪"[(l.feel || 3) - 1]}</div>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

// ── WEIGHT TAB ────────────────────────────────────────────────────────────
function WeightTab({ weights, onLog }) {
  const [kg, setKg] = useState("");
  function submit() { if (!kg || isNaN(parseFloat(kg))) return; onLog({ date: today(), kg: parseFloat(kg) }); setKg(""); }
  const sorted = [...weights].sort((a, b) => a.date.localeCompare(b.date));
  const latest = sorted[sorted.length - 1];
  const first = sorted[0];
  const change = latest && first && latest !== first ? (latest.kg - first.kg).toFixed(1) : null;
  return (
    <div style={{ padding: "16px 14px" }}>
      <div style={{ color: COLORS.text, fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Weight Tracker</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        <Card style={{ marginBottom: 0, textAlign: "center" }}>
          <div style={{ color: COLORS.muted, fontSize: 11 }}>CURRENT</div>
          <div style={{ color: COLORS.text, fontSize: 28, fontWeight: 700 }}>{latest ? latest.kg : "—"}</div>
          <div style={{ color: COLORS.muted, fontSize: 12 }}>kg</div>
        </Card>
        <Card style={{ marginBottom: 0, textAlign: "center" }}>
          <div style={{ color: COLORS.muted, fontSize: 11 }}>CHANGE</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: change === null ? COLORS.muted : parseFloat(change) <= 0 ? COLORS.success : COLORS.run }}>{change === null ? "—" : (parseFloat(change) > 0 ? "+" : "") + change}</div>
          <div style={{ color: COLORS.muted, fontSize: 12 }}>kg since start</div>
        </Card>
      </div>
      {sorted.length > 1 && (
        <Card style={{ marginBottom: 16 }}>
          <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 10 }}>WEIGHT TREND</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 60 }}>
            {sorted.slice(-12).map((w, i, arr) => {
              const min = Math.min(...arr.map(x => x.kg));
              const max = Math.max(...arr.map(x => x.kg));
              const range = max - min || 1;
              const h = Math.max(8, ((w.kg - min) / range) * 50);
              const isLast = i === arr.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{ color: COLORS.muted, fontSize: 9 }}>{isLast ? w.kg : ""}</div>
                  <div style={{ width: "100%", height: h, borderRadius: "3px 3px 0 0", background: isLast ? COLORS.swim : COLORS.border }} />
                </div>
              );
            })}
          </div>
        </Card>
      )}
      <Card>
        <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 12 }}>Log today's weight</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input type="number" step="0.1" value={kg} onChange={e => setKg(e.target.value)} placeholder="e.g. 84.5" style={{ flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 14px", color: COLORS.text, fontSize: 18, fontWeight: 700 }} />
          <span style={{ color: COLORS.muted }}>kg</span>
          <button onClick={submit} style={{ ...btnStyle, background: COLORS.swim, color: "#000", padding: "12px 20px", fontWeight: 700 }}>Save</button>
        </div>
      </Card>
      {sorted.length > 0 && (
        <>
          <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 10 }}>History</div>
          {[...sorted].reverse().slice(0, 10).map((w, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <div style={{ color: COLORS.muted, fontSize: 13 }}>{fmtDate(w.date)}</div>
              <div style={{ color: COLORS.text, fontWeight: 700 }}>{w.kg} kg</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────
export default function TriTracker() {
  const [tab, setTab] = useState("today");
  const [logs, setLogs] = useLocalStorage("tri_logs", []);
  const [weights, setWeights] = useLocalStorage("tri_weights", []);
  const [startDate] = useLocalStorage("tri_start", today());

  function addLog(entry) { setLogs(prev => [...prev.filter(l => l.date !== entry.date), entry]); }
  function addWeight(entry) { setWeights(prev => [...prev.filter(w => w.date !== entry.date), entry]); }

  const TABS = [
    { id: "today",    label: "Today",    icon: "📅" },
    { id: "workouts", label: "Workouts", icon: "🏋️" },
    { id: "program",  label: "Program",  icon: "📋" },
    { id: "track",    label: "Activity", icon: "📊" },
    { id: "weight",   label: "Weight",   icon: "⚖️" },
  ];

  const streak = (() => {
    if (!logs.length) return 0;
    const dates = new Set(logs.map(l => l.date));
    let s = 0; let d = new Date();
    while (true) { const ds = d.toISOString().slice(0, 10); if (dates.has(ds)) { s++; d.setDate(d.getDate() - 1); } else break; }
    return s;
  })();

  const start = startDate ? new Date(startDate) : new Date();
  const diffDays = Math.floor((new Date() - start) / 86400000);
  const weekNum = Math.max(1, Math.ceil((diffDays + 1) / 7));
  const phase = weekNum <= 16 ? PHASES[0] : weekNum <= 42 ? PHASES[1] : PHASES[2];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", maxWidth: 430, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif", color: COLORS.text, display: "flex", flexDirection: "column" }}>
      <div style={{ background: COLORS.surface, padding: "16px 16px 12px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ color: COLORS.swim, fontSize: 11, fontWeight: 700, letterSpacing: 2, marginBottom: 2 }}>TRI TRACKER</div>
            <div style={{ color: COLORS.text, fontWeight: 700, fontSize: 16 }}>{phase.name}: {phase.label}</div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {streak > 0 && <div style={{ textAlign: "center" }}><div style={{ color: COLORS.bike, fontWeight: 700, fontSize: 18 }}>🔥{streak}</div><div style={{ color: COLORS.muted, fontSize: 10 }}>STREAK</div></div>}
            <div style={{ textAlign: "center" }}><div style={{ color: COLORS.swim, fontWeight: 700, fontSize: 18 }}>Wk {weekNum}</div><div style={{ color: COLORS.muted, fontSize: 10 }}>OF 76</div></div>
          </div>
        </div>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={weekNum} max={76} color={COLORS.swim} />
          <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 4 }}>{Math.round((weekNum / 76) * 100)}% of 18-month plan</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tab === "today"    && <TodayTab logs={logs} onLog={addLog} startDate={startDate} weekNum={weekNum} />}
        {tab === "workouts" && <WorkoutsTab weekNum={weekNum} />}
        {tab === "program"  && <ProgramTab />}
        {tab === "track"    && <TrackTab logs={logs} startDate={startDate} />}
        {tab === "weight"   && <WeightTab weights={weights} onLog={addWeight} />}
      </div>
      <div style={{ position: "sticky", bottom: 0 }}>
        <TabBar tabs={TABS} active={tab} onChange={setTab} />
      </div>
    </div>
  );
}
