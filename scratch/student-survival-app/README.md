# 🎓 Student Survival App 🧑🎓🔥

> **Tagline:** “Survive college. One deadline at a time. 😂”  
> **Subtitle:** “Because college is already hard enough 😭”  
> **Made by students, for students ❤️**  
> *“Now go study... or at least pretend to. 😂”*

---

## 🌟 Overview

The **Student Survival App** is a modern, responsive, mobile-first web application built with collegiate humor, mathematically exact attendance engines, real-time exam countdown tickers, canteen trackers, and an interactive **“Should I Sleep or Study?” Survival AI**.

The app uses the hand-drawn notebook illustration **“Life of a Student”** (depicting the teacher sitting on Mid, Quiz, Project, Assignments, and the crushed student) as its visual identity:
1. **App Icon / Logo**: Rounded-square crops across the loading splash, login card, top header, profile, and browser favicon.
2. **Main Background**: Full-screen cover (`background-size: cover; background-position: center; background-attachment: fixed;`) with a dark translucent glassmorphism overlay that maintains AAA text readability while keeping the cartoon illustration clearly visible.

---

## 🚀 Quick Launch (Zero Build Step Required)

The application is completely self-contained with no heavy node modules or build steps required.

### Locations Available:
1. **Recommended Workspace**:  
   `C:\Users\DELL\.gemini\antigravity\scratch\student-survival-app\index.html`
2. **Desktop Shortcut Folder**:  
   `C:\Users\DELL\OneDrive\Desktop\student survival\student-survival-app\index.html`

### How to Run:
- Double-click **`index.html`** or open it in any modern browser (**Google Chrome, Microsoft Edge, Brave, Safari, Firefox**).
- You can also set `C:\Users\DELL\.gemini\antigravity\scratch\student-survival-app` as your active workspace.

---

## 🎯 Feature Highlights & Architecture

### 1. ⏳ Animated Loading / Splash Screen
- Shows the cropped **“Life of a Student”** logo with a glowing pulse effect.
- Progress bar smoothly animates from `0%` to `100%` over 2.5 seconds.
- Randomly cycles through funny student loading messages with smooth fades:
  - *“📚 Finding your motivation... ERROR 404.”*
  - *“☕ Brewing academic survival mode...”*
  - *“😭 Checking how many assignments you forgot...”*
  - *“🧠 Waking up your last remaining brain cell...”*
  - *“📅 Calculating how badly you're behind...”*
  - *“🚨 Detecting upcoming deadlines...”*
  - *“😴 Checking whether you should sleep or study...”*
  - *“📚 Loading syllabus... Please don't panic.”*
  - *“☕ Connecting to caffeine server...”*
  - *“🎓 Preparing your survival mode...”*
- Includes a **“Skip to App &rarr;”** button for instant access.

### 2. 🔐 1. Login / Welcome Page
- Frosted glassmorphism card centered over the “Life of a Student” desk background.
- Fields:
  - 👤 **Student Name** (pre-populated with *Aarav Sharma*)
  - 📧 **College Email** (*aarav.sharma@college.edu*)
  - 🔒 **Password** (optional, with zero stress)
  - ☑ **Remember me** (saved to `localStorage`)
- Buttons:
  - 🚀 **Enter Survival Mode**
  - 🎒 **Continue as Guest** (instant 1-click access)
- Post-login greeting toast:
  - *“Welcome back, [Student Name]! 👋 Ready to survive another day? 🔥”*
  - *“Your assignments missed you. 😭”*

### 3. 🏠 2. Home Dashboard
- Dynamic greeting: *“Hey [Student Name]! 👋 Ready to survive today?”*
- **🎓 Academic Survival Score (0–100)**: Real-time weighted algorithm combining attendance health (45%), assignment backlog (35%), and nearest exam proximity (20%) with an animated SVG radial progress ring.
- **🔥 Daily Student Wisdom**: Shuffleable collegiate quotes (*“Attendance is temporary. Backlogs are forever.”*).
- **Summary Cards**:
  - 📊 **Attendance Health**: e.g., Overall 78% (🟢 Safe), with advice: *“⚠️ Attend a few more classes to stay chill!”*
  - 📝 **Assignments**: Pending count + Next critical deadline ticker (*“DBMS — 2 days left”*).
  - 🍔 **Canteen Status**: 🟢 OPEN / 🔴 CLOSED live indicator + Maggi availability notice.
  - 📅 **Today's Timetable**: Automatically highlights current day of the week with time slots (09:00 DBMS, 10:00 DS, 11:00 Break, 12:00 Java, 02:00 COA).
  - ⏳ **Next Exam**: Dynamic live ticking countdown clock (**Days : Hours : Mins : Secs**).
- **😂 SHOULD I SLEEP OR STUDY? Button**:
  - Triggers witty verdicts (*“📚 STUDY! Your exam is closer than you think.”*, *“😴 SLEEP! Your brain has officially submitted a leave application.”*, *“☕ 30 minutes study → 10 minutes break → repeat.”*, etc.).

### 4. 📊 3. Attendance Calculator
- Real-time mathematical engine:
  $$\text{Attendance } \% = \left(\frac{\text{Attended}}{\text{Total}}\right) \times 100$$
- **Automatic Status Badging**:
  - 🟢 **Safe**: $\ge 75\%$
  - 🟡 **Warning**: $65\% - 74\%$
  - 🔴 **Danger**: $< 65\%$
- **Exact Bunk & Rescue Math**:
  - If $\ge 75\%$: Calculates exactly how many classes you can bunk without dropping below 75%:
    $$\text{Safe Bunks} = \left\lfloor \frac{\text{Attended} - 0.75 \times \text{Total}}{0.75} \right\rfloor$$
  - If $< 75\%$: Calculates exactly how many consecutive classes you must attend to recover:
    $$\text{Classes Needed} = \left\lceil \frac{0.75 \times \text{Total} - \text{Attended}}{0.25} \right\rceil$$
- **Quick Logging**:
  - `+1 Present 🟢` (increments attended & total)
  - `+1 Absent 🔴` (increments total only)
- **Standalone Bunk Simulator**: Test hypothetical numbers before bunking!
- Full CRUD: Add Subject, Edit, and Delete.

### 5. 📝 4. Assignment Countdown
- Pre-populated with realistic core computer engineering courses:
  - DBMS
  - Data Structures (DS)
  - Digital System Design (DSD)
  - Value Added Course (VAC)
  - OOP / Java
  - Computer Organization & Architecture (COA)
- Urgency badges:
  - 🔥 Due today (<24 hours)
  - ⚠️ 2 days left
  - 🟢 7 days left
  - 💀 Overdue
  - ✅ Completed
- Sorted automatically by closest deadline.
- Filter pills: **All**, **🔥 Due Today / Soon**, **⏳ Pending**, and **✅ Completed**.
- Celebratory audio chime upon completion.

### 6. 🍔 5. Canteen Status Hub
- Live Status: **🟢 OPEN** or **🔴 CLOSED** (Operating Hours: 08:00 AM – 06:00 PM).
- Dynamic messages:
  - OPEN: *“🍔 Your wallet is in danger.”*
  - CLOSED: *“😭 RIP. Survive until tomorrow.”*
- Interactive Toggle: Switch between OPEN and CLOSED for demonstrations.
- Official Student Menu with realistic prices:
  - 🍜 Maggi — ₹40
  - 🥪 Sandwich — ₹50
  - 🍕 Pizza — ₹80
  - ☕ Cold Coffee — ₹50
  - 🥤 Cold Drink — ₹30
  - 🍟 French Fries — ₹60
  - 🥟 Samosa (2 pcs) — ₹25
  - 🧃 Cutting Chai — ₹15
  - 🥐 Veg Patties — ₹25
- **Canteen Bill & Bunk Calculator**: Add snacks to calculate total damage to pocket money!

### 7. 📅 6. Weekly Timetable
- Days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday.
- Automatically selects and highlights the current day of the week.
- Shows time slot, lecture name, room/hall, and instructor.
- Add Class, Edit Class, Delete Class.

### 8. ⏳ 7. Live Exam Countdown
- Every second live ticking clock:
  - **DAYS : HOURS : MINUTES : SECONDS**
- Urgency indicator:
  - 🚨 Panic Mode (< 3 days)
  - ⏳ Approaching
- Exam hall location and syllabus focus notes.
- Add Exam, Edit Exam, Delete Exam.

### 9. 😂 8. Should I Sleep or Study? (Survival AI Engine)
- Dedicated diagnostic wizard:
  - 😴 Sleep hours last night (0 to 12h slider)
  - 📚 Syllabus pending % (0% to 100% slider)
  - 🧠 Brain status selector (Zombie 🧟, Drowsy 🥱, OK 🙂, Caffeinated ⚡)
- Generates smart humorous verdicts based on your real fatigue vs deadline urgency.
- **Built-in 20-Minute Emergency Power Nap Timer** with start/pause/reset and synthesized wake-up alarm!

### 10. 📱 9. Mobile Bottom Navigation
- Native app feel with mobile-friendly bottom navigation:
  - 🏠 Home
  - 📊 Attend
  - 📝 Tasks (with red notification badge)
  - 📅 Schedule
  - ⏳ Exams
- Touch-friendly targets ($\ge 44$px).

### 11. 🚪 12. Profile & Logout
- Student profile view and edit modal.
- Reset to Sample Data button (re-seeds realistic demo state anytime).
- Logout confirmation dialog:
  - *“Are you sure you want to escape Survival Mode? 😂”*
  - **Stay 😭** | **Logout 🚪**

### 12. 🔊 Web Audio API Sound Synthesizer
- Zero external MP3/audio files needed; uses clean synthesized browser oscillators:
  - Crisp subtle pop on clicks
  - Celebratory victory chime on task completion
  - Soft alert buzz
  - Wake-up alarm bell
- Sound mute/unmute toggle in header and profile settings.

---

## 📂 File Structure

```
student-survival-app/
│
├── index.html                   # Mobile-first semantic HTML5 SPA with Tailwind CDN
├── styles.css                   # Glassmorphism, animations, cover background positioning
├── app.js                       # Modular state machine, math engine, tickers, audio synthesizer
├── README.md                    # Detailed documentation & presentation guide
│
├── assets/
│   ├── life-of-a-student.jpg   # The uploaded hand-drawn notebook illustration
│   ├── logo.jpg                # Logo asset
│   └── student-life-logo.svg   # Vector logo asset
```

---

## 🎓 College Project Presentation Checklist

When presenting this application to teachers, classmates, or project evaluators:

1. **The Artwork Story**: Point out that the background and logo are the exact notebook illustration *“Life of a Student”*, showing the Teacher sitting on Mid, Quiz, Project, Assignments, and the crushed Student.
2. **Attendance Math**: Open Attendance. Point to DBMS (80%) showing you can safely bunk 2 classes. Then point to COA (60%) showing you need to attend 21 consecutive classes to rescue your 75% requirement. Click `+1 Present` to show real-time mathematical reactivity.
3. **Task Completion**: Go to Tasks, click the checkbox on an assignment, and listen for the synthesized victory chime and watch the Academic Survival Score update.
4. **Sleep vs Study**: Open the Survival AI, slide sleep down to 2 hours, select “Zombie 🧟”, and watch it prescribe sleep and activate the 20-minute power nap timer.
5. **Canteen**: Open Canteen, toggle between OPEN and CLOSED, and check off Maggi + Cold Drink to calculate the bill.
6. **Mobile Responsiveness**: Resize your browser or open Developer Tools (`Ctrl+Shift+M`) to show the bottom navigation bar and touch ergonomics.
7. **Local Storage**: Refresh the browser page (`F5`) to demonstrate that all changes, attendances, and tasks persist seamlessly.

---

*Survive College. One Deadline at a Time. 😂🔥*
