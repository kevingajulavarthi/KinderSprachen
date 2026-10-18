# KinderSprachen — Fun German Learning Platform

> *"Learn German. Play. Discover!"*

**KinderSprachen** is an interactive, playful educational web application designed specifically for young children aged 4 to 7 to learn German (Deutsch) naturally through games, stories, speech, and colorful exploration with **Leo the Lion**.

---

## 🌟 Core Features & Pages

1. **Home Page**:
   - Welcoming hero with Leo the lion mascot
   - Quick interactive audio preview cards across 8 learning themes
   - 3–7 minute bite-sized lesson philosophy
   - Interface toggle between English (EN) and German (DE)

2. **Learning Dashboard**:
   - Child-friendly learning path with 10 connected lesson nodes
   - Real-time progress metrics: Level, Daily Goal bar, Completed Lessons, Stars earned, Words learned, and Streak
   - Visual illustrated adventure map banner

3. **Interactive Lesson Player (6-Step Structured Learning)**:
   - **Step 1: Look** — Large friendly illustration with German word and English meaning
   - **Step 2: Listen** — German speech audio playback
   - **Step 3: Repeat** — Oral repetition practice with voice input or tap confirmation
   - **Step 4: Play** — 3-choice matching activity with cheerful chime feedback
   - **Step 5: Remember / Mini Chat** — Conversational reinforcement
   - **Step 6: Celebrate** — Confetti, stars, fanfare chords, and next lesson navigation

4. **German Alphabet (Das Alphabet)**:
   - All 26 standard alphabet letters (A–Z) with German pronunciations and example words
   - Dedicated explainer and cards for special German characters: **Ä, Ö, Ü** (Umlaute) and **ß** (Eszett)
   - 3 interactive mini-games: *Find Missing Letter*, *Match Upper/Lowercase*, and *Listen & Select*

5. **German Vocabulary World**:
   - 16 themed categories: Animals, Colors, Numbers, Fruits, Vegetables, Family, Toys, Clothes, Body Parts, Food & Drinks, School, Weather, Transport, Nature, Greetings, and Everyday Fun
   - Over 100 vocabulary cards featuring natural German articles (*der, die, das*), pronunciation phonetic guide, audio playback, favorite star toggles, and instant mini-quizzes

6. **Play & Learn Games Arena (10 Fully Playable Games)**:
   - *Game 1: Picture Match*
   - *Game 2: Listen & Pick*
   - *Game 3: Memory Cards*
   - *Game 4: Word Builder*
   - *Game 5: Color Quest*
   - *Game 6: Count with Leo*
   - *Game 7: Animal Sounds*
   - *Game 8: German Bingo*
   - *Game 9: Odd One Out*
   - *Game 10: Daily Challenge*

7. **German Storybooks (Geschichten)**:
   - 5 illustrated beginner stories:
     1. *Leo und die Katze*
     2. *Der rote Apfel*
     3. *Ein Tag im Zoo*
     4. *Mein bunter Regenbogen*
     5. *Gute Nacht, kleiner Bär*
   - Tap-to-speak vocabulary highlights, page-by-page German narration, and comprehension quizzes

8. **Speaking Practice (Sprech-Werkstatt)**:
   - 10 essential everyday German phrases
   - Audio pronunciation with phonetic guides
   - Safe microphone practice with instant positive feedback and non-mic alternative

9. **Achievements & Rewards**:
   - Badges earned through real progress: First Word, Alphabet Explorer, Animal Expert, Color Champion, Number Star, Story Reader, Listening Hero, and 7 Lessons Completed
   - Star accumulation and celebration animations

10. **Parent Dashboard**:
    - Protected by a child-proof math challenge (Parent Gate)
    - Learning analytics (lessons finished, words learned, practice streak)
    - Speech rate slider (0.6x to 1.1x) and audio sound effects toggle
    - Daily goal selector and progress reset controls
    - Child safety and privacy verification

---

## 🔒 Child Safety & Privacy Guarantees

- **Zero Data Collection**: No names, birthdays, addresses, or photos requested.
- **Zero Third-Party Tracking**: No advertisements or analytics trackers.
- **Local Persistence**: All learning progress is stored solely in the user's browser via `localStorage`.
- **Protected Settings**: Sensitive parental settings and reset controls are locked behind a math challenge.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom Fredoka & Nunito typography
- **Audio & SFX**: Browser SpeechSynthesis API (`de-DE`) + Web Audio API synthesizer for chimes and fanfares
- **Animations**: CSS keyframes + Canvas Confetti
- **Icons**: Lucide React

---

## 🚀 Development & Deployment

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Deploy the generated `dist/` directory to Vercel, Netlify, or any static hosting platform.
