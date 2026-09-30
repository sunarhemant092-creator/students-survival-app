/**
 * 🎓 Student Survival App 🧑🎓🔥
 * Tagline: “Survive college. One deadline at a time. 😂”
 * 
 * Complete modular client-side application engine
 * - State management with localStorage persistence
 * - Realistic college sample data
 * - Rigorous mathematical attendance calculations
 * - Real-time countdown tickers (ticking every second)
 * - Sleep or Study Survival AI decision engine
 * - Web Audio API sound synthesis
 * - Mobile bottom nav & responsive tab routing
 */

const App = (function() {
  'use strict';

  // ==========================================
  // 1. DEFAULT REALISTIC SAMPLE DATA & INDIAN STUDENTS
  // ==========================================
  const DEFAULT_INDIAN_STUDENTS = [
    {
      name: 'Aman Sharma',
      username: 'aman_sharma',
      email: 'aman.sharma@college.edu',
      password: 'password123',
      college: 'Delhi Technological University (DTU)',
      branch: 'Computer Science & Engineering',
      semester: 'Semester 4',
      target: 75,
      subjects: [
        { id: 'sub-1', name: 'DBMS (CS301)', total: 40, attended: 32 },
        { id: 'sub-2', name: 'Data Structures (DS)', total: 36, attended: 27 },
        { id: 'sub-3', name: 'Digital System Design (DSD)', total: 32, attended: 22 },
        { id: 'sub-4', name: 'Value Added Course (VAC)', total: 20, attended: 18 },
        { id: 'sub-5', name: 'OOP / Java', total: 42, attended: 36 },
        { id: 'sub-6', name: 'COA (CS304)', total: 35, attended: 21 },
      ],
      profileQuote: 'Balancing Maggi, DBMS & 75% attendance since 2024.'
    },
    {
      name: 'Priya Patel',
      username: 'priya_patel',
      email: 'priya.patel@nit.ac.in',
      password: 'priyapassword',
      college: 'National Institute of Technology (NIT Trichy)',
      branch: 'Information Technology',
      semester: 'Semester 4',
      target: 80,
      subjects: [
        { id: 'sub-1', name: 'Database Management Systems', total: 40, attended: 36 },
        { id: 'sub-2', name: 'Data Structures & Algorithms', total: 38, attended: 34 },
        { id: 'sub-3', name: 'Web Technologies', total: 30, attended: 27 },
        { id: 'sub-4', name: 'Software Engineering', total: 25, attended: 23 },
        { id: 'sub-5', name: 'OOP / Java', total: 40, attended: 37 },
        { id: 'sub-6', name: 'Computer Networks', total: 35, attended: 30 },
      ],
      profileQuote: 'Always sits in the front row, still borrows notes from seniors.'
    },
    {
      name: 'Rahul Verma',
      username: 'rahul_v',
      email: 'rahul.verma@vit.edu.in',
      password: 'rahulpass2026',
      college: 'Vellore Institute of Technology (VIT)',
      branch: 'Electronics & Communication',
      semester: 'Semester 4',
      target: 75,
      subjects: [
        { id: 'sub-1', name: 'Signals & Systems', total: 40, attended: 24 },
        { id: 'sub-2', name: 'Analog Circuits', total: 38, attended: 25 },
        { id: 'sub-3', name: 'Digital Electronics', total: 35, attended: 22 },
        { id: 'sub-4', name: 'Microprocessors', total: 32, attended: 20 },
        { id: 'sub-5', name: 'Control Systems', total: 30, attended: 23 },
        { id: 'sub-6', name: 'Engineering Math IV', total: 45, attended: 28 },
      ],
      profileQuote: 'Living dangerously at 65% attendance. Professional class negotiator.'
    },
    {
      name: 'Ananya Iyer',
      username: 'ananya_iyer',
      email: 'ananya.iyer@bits-pilani.ac.in',
      password: 'ananyapass',
      college: 'BITS Pilani',
      branch: 'AI & Data Science',
      semester: 'Semester 6',
      target: 85,
      subjects: [
        { id: 'sub-1', name: 'Machine Learning', total: 38, attended: 36 },
        { id: 'sub-2', name: 'Deep Learning', total: 32, attended: 29 },
        { id: 'sub-3', name: 'Natural Language Processing', total: 30, attended: 28 },
        { id: 'sub-4', name: 'Big Data Analytics', total: 34, attended: 31 },
        { id: 'sub-5', name: 'AI Ethics & Governance', total: 20, attended: 19 },
      ],
      profileQuote: 'Coding models by day, crying over loss functions by night.'
    },
    {
      name: 'Rohan Gupta',
      username: 'rohan_gupta',
      email: 'rohan.gupta@iitd.ac.in',
      password: 'rohanpass',
      college: 'Indian Institute of Technology (IIT Delhi)',
      branch: 'Computer Science & Engineering',
      semester: 'Semester 4',
      target: 75,
      subjects: [
        { id: 'sub-1', name: 'Operating Systems', total: 38, attended: 28 },
        { id: 'sub-2', name: 'Compiler Design', total: 34, attended: 24 },
        { id: 'sub-3', name: 'Design & Analysis of Algorithms', total: 40, attended: 31 },
        { id: 'sub-4', name: 'Computer Architecture', total: 36, attended: 25 },
        { id: 'sub-5', name: 'Computer Networks', total: 32, attended: 24 },
      ],
      profileQuote: 'Academic comeback scheduled for 2:00 AM every exam night.'
    }
  ];

  const DEFAULT_STUDENT = {
    name: 'Aman Sharma',
    username: 'aman_sharma',
    email: 'aman.sharma@college.edu',
    password: 'password123',
    college: 'Delhi Technological University (DTU)',
    branch: 'Computer Science & Engineering',
    semester: 'Semester 4',
    target: 75,
    isLoggedIn: false,
    rememberMe: true,
    soundEnabled: true,
  };

  const DEFAULT_SUBJECTS = [
    { id: 'sub-1', name: 'DBMS (CS301)', total: 40, attended: 32 },       // 80.0% - Safe (can miss 2)
    { id: 'sub-2', name: 'Data Structures (DS)', total: 36, attended: 27 },// 75.0% - Safe (0 margin)
    { id: 'sub-3', name: 'Digital System Design (DSD)', total: 32, attended: 22 }, // 68.75% - Warning (need 8)
    { id: 'sub-4', name: 'Value Added Course (VAC)', total: 20, attended: 18 },    // 90.0% - Safe (can miss 4)
    { id: 'sub-5', name: 'OOP / Java', total: 42, attended: 36 },           // 85.7% - Safe (can miss 6)
    { id: 'sub-6', name: 'COA (CS304)', total: 35, attended: 21 },         // 60.0% - Danger (need 21)
  ];

  // Helper to generate dates relative to today
  function getFutureDate(daysAhead, hours = 23, mins = 59) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    d.setHours(hours, mins, 0, 0);
    return d.toISOString();
  }

  const DEFAULT_ASSIGNMENTS = [
    {
      id: 'asg-1',
      title: 'DBMS Normalization & ER Diagram Project',
      subject: 'DBMS',
      dueDate: getFutureDate(2, 23, 59), // 2 days left
      priority: 'High',
      completed: false,
    },
    {
      id: 'asg-2',
      title: 'Red-Black Trees & Heap Sort Implementation',
      subject: 'Data Structures (DS)',
      dueDate: getFutureDate(0, 23, 59), // Due today!
      priority: 'High',
      completed: false,
    },
    {
      id: 'asg-3',
      title: 'Sequential Circuit State Machine Design',
      subject: 'Digital System Design (DSD)',
      dueDate: getFutureDate(5, 17, 0), // 5 days left
      priority: 'Medium',
      completed: false,
    },
    {
      id: 'asg-4',
      title: 'Java Multithreading & Socket Programming Lab',
      subject: 'OOP / Java',
      dueDate: getFutureDate(7, 23, 59), // 7 days left
      priority: 'Medium',
      completed: false,
    },
    {
      id: 'asg-5',
      title: 'MIPS Instruction Pipeline & Cache Simulation',
      subject: 'Computer Organization & Architecture (COA)',
      dueDate: getFutureDate(11, 23, 59),
      priority: 'Low',
      completed: false,
    },
    {
      id: 'asg-6',
      title: 'Ethics & Sustainable Tech Case Study',
      subject: 'Value Added Course (VAC)',
      dueDate: getFutureDate(-2, 23, 59),
      priority: 'Low',
      completed: true,
    }
  ];

  const DEFAULT_CANTEEN = {
    isOpen: true,
    openingHours: '08:00 AM – 06:00 PM',
    menu: [
      { id: 'm-1', name: 'Maggi', emoji: '🍜', price: 40, category: 'Comfort Food' },
      { id: 'm-2', name: 'Grilled Sandwich', emoji: '🥪', price: 50, category: 'Quick Bites' },
      { id: 'm-3', name: 'Cheese Pizza', emoji: '🍕', price: 80, category: 'Cheat Meal' },
      { id: 'm-4', name: 'Cold Coffee', emoji: '☕', price: 50, category: 'Caffeine Rush' },
      { id: 'm-5', name: 'Cold Drink', emoji: '🥤', price: 30, category: 'Beverages' },
      { id: 'm-6', name: 'Crispy French Fries', emoji: '🍟', price: 60, category: 'Snacks' },
      { id: 'm-7', name: 'Samosa (2 pcs)', emoji: '🥟', price: 25, category: 'Campus Classic' },
      { id: 'm-8', name: 'Cutting Chai', emoji: '🧃', price: 15, category: 'Life Support' },
      { id: 'm-9', name: 'Veg Patties', emoji: '🥐', price: 25, category: 'Quick Bites' },
    ]
  };

  const DEFAULT_TIMETABLE = [
    // Monday
    { id: 'tt-1', day: 'Monday', time: '09:00 - 10:00', subject: 'DBMS', room: 'Room 302', faculty: 'Dr. Sharma' },
    { id: 'tt-2', day: 'Monday', time: '10:00 - 11:00', subject: 'Data Structures (DS)', room: 'Room 305', faculty: 'Prof. Anjali' },
    { id: 'tt-3', day: 'Monday', time: '11:00 - 12:00', subject: 'Break / Canteen Rush ☕', room: 'Campus Lawn', faculty: 'Self Care' },
    { id: 'tt-4', day: 'Monday', time: '12:00 - 01:00', subject: 'OOP / Java', room: 'Room 401', faculty: 'Dr. Kulkarni' },
    { id: 'tt-5', day: 'Monday', time: '02:00 - 04:00', subject: 'COA Lab', room: 'Hardware Lab B', faculty: 'Prof. Mehta' },

    // Tuesday
    { id: 'tt-6', day: 'Tuesday', time: '09:00 - 10:00', subject: 'Digital System Design (DSD)', room: 'Room 204', faculty: 'Prof. Rao' },
    { id: 'tt-7', day: 'Tuesday', time: '10:00 - 11:00', subject: 'OOP / Java', room: 'Room 401', faculty: 'Dr. Kulkarni' },
    { id: 'tt-8', day: 'Tuesday', time: '11:00 - 12:00', subject: 'Break / Maggi Time 🍜', room: 'Canteen', faculty: 'Chef Raju' },
    { id: 'tt-9', day: 'Tuesday', time: '12:00 - 01:00', subject: 'Data Structures (DS)', room: 'Room 305', faculty: 'Prof. Anjali' },
    { id: 'tt-10', day: 'Tuesday', time: '02:00 - 04:00', subject: 'DBMS Lab', room: 'Software Lab 2', faculty: 'Dr. Sharma' },

    // Wednesday
    { id: 'tt-11', day: 'Wednesday', time: '09:00 - 10:00', subject: 'DBMS', room: 'Room 302', faculty: 'Dr. Sharma' },
    { id: 'tt-12', day: 'Wednesday', time: '10:00 - 11:00', subject: 'Data Structures (DS)', room: 'Room 305', faculty: 'Prof. Anjali' },
    { id: 'tt-13', day: 'Wednesday', time: '11:00 - 12:00', subject: 'Break / Caffeine Refuel ☕', room: 'Canteen', faculty: 'Campus' },
    { id: 'tt-14', day: 'Wednesday', time: '12:00 - 01:00', subject: 'OOP / Java', room: 'Room 401', faculty: 'Dr. Kulkarni' },
    { id: 'tt-15', day: 'Wednesday', time: '02:00 - 03:00', subject: 'Computer Organization (COA)', room: 'Room 304', faculty: 'Prof. Mehta' },

    // Thursday
    { id: 'tt-16', day: 'Thursday', time: '09:00 - 10:00', subject: 'Value Added Course (VAC)', room: 'Seminar Hall 1', faculty: 'Guest Faculty' },
    { id: 'tt-17', day: 'Thursday', time: '10:00 - 11:00', subject: 'COA', room: 'Room 304', faculty: 'Prof. Mehta' },
    { id: 'tt-18', day: 'Thursday', time: '11:00 - 12:00', subject: 'Break / Power Nap 😴', room: 'Library', faculty: 'Librarian Shhh' },
    { id: 'tt-19', day: 'Thursday', time: '12:00 - 01:00', subject: 'DSD', room: 'Room 204', faculty: 'Prof. Rao' },
    { id: 'tt-20', day: 'Thursday', time: '02:00 - 04:00', subject: 'Data Structures Lab', room: 'CS Lab 1', faculty: 'Prof. Anjali' },

    // Friday
    { id: 'tt-21', day: 'Friday', time: '09:00 - 10:00', subject: 'OOP / Java', room: 'Room 401', faculty: 'Dr. Kulkarni' },
    { id: 'tt-22', day: 'Friday', time: '10:00 - 11:00', subject: 'DBMS', room: 'Room 302', faculty: 'Dr. Sharma' },
    { id: 'tt-23', day: 'Friday', time: '11:00 - 12:00', subject: 'Break 🥤', room: 'Canteen', faculty: 'Everyone' },
    { id: 'tt-24', day: 'Friday', time: '12:00 - 01:00', subject: 'Digital System Design (DSD)', room: 'Room 204', faculty: 'Prof. Rao' },
    { id: 'tt-25', day: 'Friday', time: '02:00 - 03:30', subject: 'VAC Project Review', room: 'Seminar Hall 2', faculty: 'Mentor Team' },

    // Saturday
    { id: 'tt-26', day: 'Saturday', time: '09:30 - 11:00', subject: 'Doubt Clearing & Catch-up', room: 'Library Pod 4', faculty: 'Study Group' },
    { id: 'tt-27', day: 'Saturday', time: '11:00 - 01:00', subject: 'Coding Club & Hackathon Prep', room: 'Innovation Cell', faculty: 'Seniors' }
  ];

  const DEFAULT_EXAMS = [
    {
      id: 'ex-1',
      subject: 'OOP / Java',
      date: getFutureDate(12, 10, 0), // 12 days 6 hours
      hall: 'CS Block Room 401',
      syllabus: 'Inheritance, Polymorphism, Exception Handling, Collections & Threads'
    },
    {
      id: 'ex-2',
      subject: 'DBMS',
      date: getFutureDate(16, 14, 0),
      hall: 'Main Examination Hall A',
      syllabus: 'Relational Algebra, SQL, Normalization (1NF-BCNF), ACID & Transactions'
    },
    {
      id: 'ex-3',
      subject: 'Data Structures (DS)',
      date: getFutureDate(20, 10, 0),
      hall: 'Auditorium Hall B',
      syllabus: 'Stacks, Queues, Linked Lists, Trees, AVL Trees, Graphs & Algorithms'
    },
    {
      id: 'ex-4',
      subject: 'Computer Organization & Architecture (COA)',
      date: getFutureDate(24, 10, 0),
      hall: 'Auditorium Hall C',
      syllabus: 'ALU Design, Instruction Formats, Pipelining, Hazard Resolution & Cache'
    },
    {
      id: 'ex-5',
      subject: 'Digital System Design (DSD)',
      date: getFutureDate(28, 14, 0),
      hall: 'Electronics Wing 105',
      syllabus: 'K-Maps, Combinational & Sequential Circuits, Flip-Flops, Counters'
    },
    {
      id: 'ex-6',
      subject: 'Value Added Course (VAC)',
      date: getFutureDate(32, 10, 0),
      hall: 'Seminar Hall 1',
      syllabus: 'Professional Ethics, Technical Writing, Industry Standards & ESG'
    }
  ];

  const FUNNY_SPLASH_MESSAGES = [
    '“📚 Finding your motivation... ERROR 404.”',
    '“☕ Brewing academic survival mode...”',
    '“😭 Checking how many assignments you forgot...”',
    '“🧠 Waking up your last remaining brain cell...”',
    '“📅 Calculating how badly you\'re behind...”',
    '“🚨 Detecting upcoming deadlines...”',
    '“😴 Checking whether you should sleep or study...”',
    '“📚 Loading syllabus... Please don\'t panic.”',
    '“☕ Connecting to caffeine server...”',
    '“🎓 Preparing your survival mode...”',
  ];

  const STUDENT_QUOTES = [
    '“Attendance is temporary. Backlogs are forever.”',
    '“Study now, panic less later.”',
    '“College runs on deadlines and caffeine.”',
    '“Assignment deadline: 11:59 PM. Motivation arrives: 11:45 PM.”',
    '“One day or day one? Definitely one night before the exam.”',
    '“A 75% attendance isn\'t a goal, it\'s an extreme sport.”',
    '“Engineering is 10% coding and 90% asking seniors for assignment solutions.”',
    '“Sleep is for the weak. Backlogs are for the brave.”',
    '“Dear syllabus, please be gentle. I have a fragile will to live.”',
    '“Canteen Maggi tastes 10x better during an ongoing lecture.”',
  ];

  const SLEEP_STUDY_RESPONSES = [
    { title: '📚 STUDY!', text: '“Your exam is closer than you think. Open that PDF right now!”', badge: 'Critical Academic Priority', color: 'rose' },
    { title: '😴 SLEEP!', text: '“Your brain has officially submitted a leave application. Sleep now, conquer tomorrow!”', badge: 'Severe Brain Drain', color: 'indigo' },
    { title: '☕ 30 MIN STUDY → 10 MIN BREAK', text: '“Pomodoro technique activated! 30 mins study, 10 mins Maggi break, then repeat.”', badge: 'Balanced Survival', color: 'amber' },
    { title: '🚨 PANIC LEVEL: Academic', text: '“Start studying NOW. Close Instagram, put your phone in another room!”', badge: 'Code Red', color: 'rose' },
    { title: '😴 SLEEP!', text: '“Tomorrow-you will thank you. A zombie cannot pass data structures.”', badge: 'Recovery Mode', color: 'cyan' },
    { title: '📝 FINISH ASSIGNMENT FIRST', text: '“Finish the pending assignment first. Then sleep peacefully without guilt.”', badge: 'Deadline Duty', color: 'amber' },
    { title: '☕ COFFEE + STUDY + REGRET', text: '“Coffee + Study + Regret = College Life. Grab a cup and make the comeback!”', badge: 'College Reality', color: 'indigo' },
    { title: '😭 CAUGHT IN 4K', text: '“You opened this app instead of studying. Nice. Now close it and read page 1.”', badge: 'Procrastinator Alert', color: 'rose' },
  ];

  // ==========================================
  // 2. AUDIO SYNTHESIS ENGINE (Web Audio API)
  // ==========================================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playSound(type) {
    if (!state.student.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        // Crisp subtle tap
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'success') {
        // High celebratory victory chime
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.24); // C6
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else if (type === 'alert') {
        // Soft cautionary beep
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.setValueAtTime(280, now + 0.1);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'alarm') {
        // Gentle alarm bell
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1174.66, now + 0.15);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      }
    } catch (e) {
      console.warn('Audio synthesis note:', e);
    }
  }

  // ==========================================
  // 3. PERSISTENT STATE MANAGEMENT
  // ==========================================
  const STORAGE_KEY = 'student_survival_app_data_v2';

  let state = {
    student: { ...DEFAULT_STUDENT },
    subjects: [...DEFAULT_SUBJECTS],
    assignments: [...DEFAULT_ASSIGNMENTS],
    canteen: { ...DEFAULT_CANTEEN },
    timetable: [...DEFAULT_TIMETABLE],
    exams: [...DEFAULT_EXAMS],
    activeTab: 'home',
    selectedTimetableDay: 'Wednesday',
    assignmentFilter: 'all',
    selectedBrainStatus: 'zombie',
    reminderIntervalMinutes: 3,
    notifBarVisible: true,
    notifCycleActive: true,
    desktopNotifEnabled: false,
    currentNotifIndex: 0,
    activeAlerts: [],
    registeredUsers: [],
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.student) state.student = { ...DEFAULT_STUDENT, ...parsed.student };
        if (parsed.subjects && parsed.subjects.length) state.subjects = parsed.subjects;
        if (parsed.assignments && parsed.assignments.length) state.assignments = parsed.assignments;
        if (parsed.canteen) state.canteen = { ...DEFAULT_CANTEEN, ...parsed.canteen };
        if (parsed.timetable && parsed.timetable.length) state.timetable = parsed.timetable;
        if (parsed.exams && parsed.exams.length) state.exams = parsed.exams;
        if (parsed.reminderIntervalMinutes) state.reminderIntervalMinutes = parsed.reminderIntervalMinutes;
        if (typeof parsed.notifBarVisible === 'boolean') state.notifBarVisible = parsed.notifBarVisible;
        if (typeof parsed.desktopNotifEnabled === 'boolean') state.desktopNotifEnabled = parsed.desktopNotifEnabled;
        if (parsed.registeredUsers && Array.isArray(parsed.registeredUsers)) state.registeredUsers = parsed.registeredUsers;
      }
    } catch (err) {
      console.error('Error loading state from localStorage:', err);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        student: state.student,
        subjects: state.subjects,
        assignments: state.assignments,
        canteen: state.canteen,
        timetable: state.timetable,
        exams: state.exams,
        reminderIntervalMinutes: state.reminderIntervalMinutes,
        notifBarVisible: state.notifBarVisible,
        desktopNotifEnabled: state.desktopNotifEnabled,
        registeredUsers: state.registeredUsers,
      }));
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  }

  // ==========================================
  // 4. TOAST NOTIFICATIONS
  // ==========================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-3.5 rounded-2xl text-xs font-bold text-white shadow-2xl flex items-center gap-2 border animate-fade-in transition-all duration-300 pointer-events-auto ${
      type === 'success' ? 'bg-emerald-900/90 border-emerald-500/50 text-emerald-100' :
      type === 'danger' ? 'bg-rose-900/90 border-rose-500/50 text-rose-100' :
      type === 'warning' ? 'bg-amber-900/90 border-amber-500/50 text-amber-100' :
      'bg-indigo-900/90 border-indigo-500/50 text-indigo-100'
    }`;

    toast.innerHTML = `
      <span class="text-base">${type === 'success' ? '✅' : type === 'danger' ? '🚨' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // ==========================================
  // 5. SPLASH SCREEN LIFECYCLE (2-3 seconds)
  // ==========================================
  let splashTimer = null;
  let splashQuoteInterval = null;

  function initSplash() {
    const splashScreen = document.getElementById('splash-screen');
    const progressBar = document.getElementById('splash-progress-bar');
    const progressPercent = document.getElementById('splash-progress-percent');
    const quoteEl = document.getElementById('splash-quote');
    const statusText = document.getElementById('splash-status-text');

    if (!splashScreen) return;

    let progress = 0;
    let messageIndex = 0;

    // Cycle funny student messages
    splashQuoteInterval = setInterval(() => {
      if (quoteEl) {
        messageIndex = (messageIndex + 1) % FUNNY_SPLASH_MESSAGES.length;
        quoteEl.style.opacity = '0';
        setTimeout(() => {
          quoteEl.textContent = FUNNY_SPLASH_MESSAGES[messageIndex];
          quoteEl.style.opacity = '1';
        }, 150);
      }
    }, 750);

    const stepDuration = 25; // 25ms * 100 = 2500ms = 2.5 seconds total
    splashTimer = setInterval(() => {
      progress += 1;
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (progressPercent) progressPercent.textContent = `${progress}%`;

      if (progress === 30 && statusText) statusText.textContent = 'Calculating attendance shortage...';
      if (progress === 60 && statusText) statusText.textContent = 'Checking pending deadlines...';
      if (progress === 85 && statusText) statusText.textContent = 'Summoning survival spirit 🔥';

      if (progress >= 100) {
        clearInterval(splashTimer);
        clearInterval(splashQuoteInterval);
        dismissSplash();
      }
    }, stepDuration);
  }

  function skipSplash() {
    if (splashTimer) clearInterval(splashTimer);
    if (splashQuoteInterval) clearInterval(splashQuoteInterval);
    dismissSplash();
  }

  function dismissSplash() {
    const splashScreen = document.getElementById('splash-screen');
    if (!splashScreen) return;

    splashScreen.style.opacity = '0';
    splashScreen.style.transition = 'opacity 0.4s ease-out';

    setTimeout(() => {
      splashScreen.classList.add('hidden');
      if (state.student.isLoggedIn) {
        showMainApp();
      } else {
        showAuthScreen();
      }
    }, 400);
  }

  // ==========================================
  // 6. AUTHENTICATION & LOGIN (SIGN IN, CREATE ACCOUNT, DEMO LOGINS)
  // ==========================================
  function showAuthScreen() {
    const authScreen = document.getElementById('auth-screen');
    const mainApp = document.getElementById('main-app');
    if (authScreen) authScreen.classList.remove('hidden');
    if (mainApp) mainApp.classList.add('hidden');

    // Pre-populate if saved in state
    const idInput = document.getElementById('login-identifier');
    const passInput = document.getElementById('login-password');
    const rememberCheckbox = document.getElementById('login-remember');

    if (idInput) idInput.value = state.student.username || state.student.email || 'aman_sharma';
    if (passInput) passInput.value = state.student.password || 'password123';
    if (rememberCheckbox) rememberCheckbox.checked = state.student.rememberMe !== false;

    switchAuthTab('signin');
  }

  function switchAuthTab(tab) {
    playSound('click');
    const tabSignIn = document.getElementById('tab-auth-signin');
    const tabSignUp = document.getElementById('tab-auth-signup');
    const panelSignIn = document.getElementById('auth-panel-signin');
    const panelSignUp = document.getElementById('auth-panel-signup');

    if (tab === 'signin') {
      if (tabSignIn) tabSignIn.classList.add('active');
      if (tabSignUp) tabSignUp.classList.remove('active');
      if (panelSignIn) panelSignIn.classList.remove('hidden');
      if (panelSignUp) panelSignUp.classList.add('hidden');
    } else {
      if (tabSignUp) tabSignUp.classList.add('active');
      if (tabSignIn) tabSignIn.classList.remove('active');
      if (panelSignUp) panelSignUp.classList.remove('hidden');
      if (panelSignIn) panelSignIn.classList.add('hidden');
    }
  }

  function handleLogin(event) {
    if (event) event.preventDefault();
    playSound('click');

    const idInput = document.getElementById('login-identifier');
    const passInput = document.getElementById('login-password');
    const rememberCheckbox = document.getElementById('login-remember');

    const identifier = idInput ? idInput.value.trim().toLowerCase() : '';
    const password = passInput ? passInput.value.trim() : '';
    const remember = rememberCheckbox ? rememberCheckbox.checked : true;

    if (!identifier) {
      showToast('Please enter your username or college email! 👤', 'warning');
      return;
    }

    // Check demo accounts first
    const demoFound = DEFAULT_INDIAN_STUDENTS.find(s => 
      s.username.toLowerCase() === identifier || s.email.toLowerCase() === identifier
    );

    // Check registered accounts
    const registeredFound = (state.registeredUsers || []).find(u => 
      (u.username && u.username.toLowerCase() === identifier) || (u.email && u.email.toLowerCase() === identifier)
    );

    const user = demoFound || registeredFound;

    if (user) {
      state.student = {
        ...state.student,
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        college: user.college || state.student.college,
        branch: user.branch || state.student.branch,
        semester: user.semester || state.student.semester,
        target: user.target || 75,
        isLoggedIn: true,
        rememberMe: remember,
      };

      if (user.subjects && user.subjects.length) {
        state.subjects = JSON.parse(JSON.stringify(user.subjects));
      }
    } else {
      // Allow custom guest login with typed identifier
      const cleanName = identifier.includes('@') ? identifier.split('@')[0] : identifier;
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      state.student = {
        ...state.student,
        name: formattedName,
        username: identifier,
        email: identifier.includes('@') ? identifier : `${identifier}@college.edu`,
        password: password || 'pass123',
        isLoggedIn: true,
        rememberMe: remember,
      };
    }

    saveState();
    playSound('success');

    showToast(`Welcome back, ${state.student.name}! 👋 Ready to survive another day? 🔥`, 'success');
    showToast(`“Your assignments missed you. 😭”`, 'warning');

    showMainApp();
  }

  function handleSignUp(event) {
    if (event) event.preventDefault();
    playSound('click');

    const name = document.getElementById('signup-name').value.trim();
    const username = document.getElementById('signup-username').value.trim().toLowerCase();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const college = document.getElementById('signup-college').value.trim();
    const branch = document.getElementById('signup-branch').value;
    const semester = document.getElementById('signup-semester').value;
    const target = parseInt(document.getElementById('signup-target').value, 10) || 75;

    if (!name || !username || !email || !password) {
      showToast('Please fill in all required fields! ✍️', 'warning');
      return;
    }

    if (password !== confirmPassword) {
      playSound('alert');
      showToast('Passwords do not match! Please check again 🔒', 'danger');
      return;
    }

    // Check if username or email already registered
    const exists = (state.registeredUsers || []).some(u => u.username === username || u.email === email);
    if (exists) {
      showToast('An account with this username/email already exists! Please sign in 🔑', 'warning');
      switchAuthTab('signin');
      return;
    }

    const newUser = {
      name,
      username,
      email,
      password,
      college,
      branch,
      semester,
      target,
    };

    if (!state.registeredUsers) state.registeredUsers = [];
    state.registeredUsers.push(newUser);

    // Set as active student
    state.student = {
      ...state.student,
      name,
      username,
      email,
      password,
      college,
      branch,
      semester,
      target,
      isLoggedIn: true,
      rememberMe: true,
    };

    saveState();
    playSound('success');

    showToast(`🎉 Account created! Welcome to Survival Mode, ${name}! 🔥`, 'success');
    showToast(`Target Attendance: ${target}% • College: ${college} 🙏`, 'info');

    showMainApp();
  }

  function quickDemoLogin(username) {
    playSound('click');
    const demo = DEFAULT_INDIAN_STUDENTS.find(s => s.username === username);
    if (!demo) return;

    // Pre-fill inputs
    const idInput = document.getElementById('login-identifier');
    const passInput = document.getElementById('login-password');
    if (idInput) idInput.value = demo.username;
    if (passInput) passInput.value = demo.password;

    state.student = {
      ...state.student,
      name: demo.name,
      username: demo.username,
      email: demo.email,
      password: demo.password,
      college: demo.college,
      branch: demo.branch,
      semester: demo.semester,
      target: demo.target,
      isLoggedIn: true,
      rememberMe: true,
    };

    if (demo.subjects && demo.subjects.length) {
      state.subjects = JSON.parse(JSON.stringify(demo.subjects));
    }

    saveState();
    playSound('success');

    showToast(`Logged in as ${demo.name} (${demo.college})! 🎓`, 'success');
    if (demo.profileQuote) {
      showToast(`“${demo.profileQuote}” 😂`, 'warning');
    }

    showMainApp();
  }

  function openDemoCredentialsModal() {
    playSound('click');
    openModal('modal-demo-credentials');
  }

  function loginAsGuest() {
    playSound('click');
    state.student.name = 'Alex Rivers';
    state.student.username = 'guest_survivor';
    state.student.email = 'alex.guest@college.edu';
    state.student.college = 'Delhi Technological University (DTU)';
    state.student.branch = 'Computer Science & Engineering';
    state.student.semester = 'Semester 4';
    state.student.isLoggedIn = true;
    saveState();

    playSound('success');
    showToast(`Welcome, Guest Survivor! 👋 Mode: Maximum Adrenaline 🔥`, 'success');
    showMainApp();
  }

  function showMainApp() {
    const authScreen = document.getElementById('auth-screen');
    const mainApp = document.getElementById('main-app');
    if (authScreen) authScreen.classList.add('hidden');
    if (mainApp) mainApp.classList.remove('hidden');

    updateHeaderUI();
    renderAll();
  }

  function promptLogout() {
    playSound('alert');
    closeModal('modal-profile');
    openModal('modal-logout-confirm');
  }

  function confirmLogout() {
    playSound('click');
    closeModal('modal-logout-confirm');
    state.student.isLoggedIn = false;
    saveState();

    showToast('Escaped Survival Mode! See you next semester 😂', 'info');
    showAuthScreen();
  }

  // ==========================================
  // 7. ROUTING & NAVIGATION
  // ==========================================
  function navigate(tabId) {
    playSound('click');
    state.activeTab = tabId;

    // Hide all pages
    const pages = document.querySelectorAll('.page-section');
    pages.forEach(p => p.classList.add('hidden'));

    // Show selected page
    const targetPage = document.getElementById(`page-${tabId}`);
    if (targetPage) targetPage.classList.remove('hidden');

    // Update desktop nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update mobile nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      if (btn.dataset.tab === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================
  // 8. ATTENDANCE MATH ENGINE
  // ==========================================
  /**
   * Exact attendance math:
   * % = (attended / total) * 100
   * Target: 75% (0.75)
   * 
   * If >= 75%:
   *   Can safely bunk = Math.floor((attended - 0.75 * total) / 0.75)
   * If < 75%:
   *   Classes needed to attend consecutively = Math.ceil((0.75 * total - attended) / (1 - 0.75))
   */
  function calculateSubjectAttendance(total, attended, target = 75) {
    const totalNum = parseInt(total, 10) || 0;
    const attNum = parseInt(attended, 10) || 0;
    const targetRatio = target / 100;

    if (totalNum <= 0) {
      return {
        percent: 0,
        status: 'Safe',
        statusColor: 'emerald',
        safeBunks: 0,
        classesNeeded: 0,
      };
    }

    const percent = ((attNum / totalNum) * 100);
    const roundedPercent = Math.round(percent * 10) / 10;

    let status = 'Safe';
    let statusColor = 'emerald';

    if (roundedPercent >= 75) {
      status = 'Safe';
      statusColor = 'emerald';
    } else if (roundedPercent >= 65) {
      status = 'Warning';
      statusColor = 'amber';
    } else {
      status = 'Danger';
      statusColor = 'rose';
    }

    let safeBunks = 0;
    let classesNeeded = 0;

    if (attNum / totalNum >= targetRatio) {
      // How many can I miss without dropping below targetRatio:
      // (attNum) / (totalNum + x) >= targetRatio
      // attNum >= targetRatio * totalNum + targetRatio * x
      // x <= (attNum - targetRatio * totalNum) / targetRatio
      safeBunks = Math.floor((attNum - targetRatio * totalNum) / targetRatio);
      if (safeBunks < 0) safeBunks = 0;
    } else {
      // How many must attend consecutively:
      // (attNum + y) / (totalNum + y) >= targetRatio
      // attNum + y >= targetRatio * totalNum + targetRatio * y
      // y * (1 - targetRatio) >= targetRatio * totalNum - attNum
      // y = Math.ceil((targetRatio * totalNum - attNum) / (1 - targetRatio))
      classesNeeded = Math.ceil((targetRatio * totalNum - attNum) / (1 - targetRatio));
      if (classesNeeded < 0) classesNeeded = 0;
    }

    return {
      percent: roundedPercent,
      status,
      statusColor,
      safeBunks,
      classesNeeded,
    };
  }

  function renderAttendance() {
    const listEl = document.getElementById('attendance-subjects-list');
    if (!listEl) return;

    let totalAllClasses = 0;
    let totalAllAttended = 0;
    let aggregatedSafeBunks = 0;
    let aggregatedRescue = 0;

    listEl.innerHTML = '';

    state.subjects.forEach(sub => {
      totalAllClasses += sub.total;
      totalAllAttended += sub.attended;

      const math = calculateSubjectAttendance(sub.total, sub.attended, 75);
      if (math.safeBunks > 0) aggregatedSafeBunks += math.safeBunks;
      if (math.classesNeeded > 0) aggregatedRescue += math.classesNeeded;

      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-5 border border-white/15 shadow-xl flex flex-col justify-between';
      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 class="font-heading font-black text-base text-white">${escapeHtml(sub.name)}</h4>
              <span class="text-xs text-slate-400 font-mono">${sub.attended} / ${sub.total} classes attended</span>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-${math.statusColor}-500/20 text-${math.statusColor}-300 border border-${math.statusColor}-500/30 flex items-center gap-1">
              ${math.status === 'Safe' ? '🟢 Safe' : math.status === 'Warning' ? '🟡 Warning' : '🔴 Danger'}
            </span>
          </div>

          <!-- Progress Bar -->
          <div class="my-3">
            <div class="flex justify-between text-xs font-bold mb-1">
              <span class="text-slate-300">Attendance</span>
              <span class="text-${math.statusColor}-400 font-mono text-sm">${math.percent}%</span>
            </div>
            <div class="w-full bg-white/10 h-2.5 rounded-full overflow-hidden relative">
              <!-- 75% target threshold indicator -->
              <div class="absolute top-0 bottom-0 left-[75%] w-0.5 bg-white/40 z-10" title="75% minimum"></div>
              <div class="h-full bg-gradient-to-r ${
                math.statusColor === 'emerald' ? 'from-emerald-500 to-cyan-400' :
                math.statusColor === 'amber' ? 'from-amber-500 to-rose-400' :
                'from-rose-600 to-rose-400'
              } rounded-full transition-all duration-500" style="width: ${Math.min(math.percent, 100)}%;"></div>
            </div>
          </div>

          <!-- Exact Advice Badge -->
          <div class="p-3 rounded-xl bg-white/5 border border-white/10 my-3">
            ${
              math.status === 'Safe' ? `
                <div class="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <span>😎 Bunk Allowance:</span>
                  <span class="font-mono text-white bg-emerald-500/30 px-1.5 py-0.2 rounded">${math.safeBunks} more classes</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1">You can safely skip without falling below 75%.</p>
              ` : `
                <div class="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                  <span>🚨 Shortage Alert:</span>
                  <span class="font-mono text-white bg-rose-500/30 px-1.5 py-0.2 rounded">Attend next ${math.classesNeeded} classes</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-1">Must attend consecutively to reach 75%!</p>
              `
            }
          </div>
        </div>

        <!-- Quick Logging Action Buttons -->
        <div class="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
          <div class="flex items-center gap-1.5">
            <button onclick="App.logAttendance('${sub.id}', true)" title="Attended today's class" class="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 font-bold text-xs transition active:scale-95">
              +1 Present 🟢
            </button>
            <button onclick="App.logAttendance('${sub.id}', false)" title="Missed / Bunked class" class="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/30 text-rose-300 font-bold text-xs transition active:scale-95">
              +1 Absent 🔴
            </button>
          </div>
          <div class="flex items-center gap-1">
            <button onclick="App.openEditSubjectModal('${sub.id}')" title="Edit Subject" class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs transition">
              ✏️
            </button>
            <button onclick="App.deleteSubject('${sub.id}')" title="Delete Subject" class="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs transition">
              🗑️
            </button>
          </div>
        </div>
      `;
      listEl.appendChild(card);
    });

    // Update Aggregated KPI numbers
    const overallPercent = totalAllClasses > 0 ? Math.round((totalAllAttended / totalAllClasses) * 1000) / 10 : 0;
    const overallMath = calculateSubjectAttendance(totalAllClasses, totalAllAttended, 75);

    const totalPercentEl = document.getElementById('att-total-percent');
    const totalBadgeEl = document.getElementById('att-total-status-badge');
    const totalRatioEl = document.getElementById('att-total-ratio');
    const safeBunksCountEl = document.getElementById('att-safe-bunks-count');
    const shortageRescueEl = document.getElementById('att-shortage-rescue-count');

    if (totalPercentEl) totalPercentEl.textContent = `${overallPercent}%`;
    if (totalBadgeEl) {
      totalBadgeEl.textContent = overallMath.status;
      totalBadgeEl.className = `px-2 py-0.5 rounded-full text-xs font-bold bg-${overallMath.statusColor}-500/20 text-${overallMath.statusColor}-300`;
    }
    if (totalRatioEl) totalRatioEl.textContent = `${totalAllAttended} / ${totalAllClasses} total lectures attended`;
    if (safeBunksCountEl) safeBunksCountEl.textContent = aggregatedSafeBunks;
    if (shortageRescueEl) shortageRescueEl.textContent = aggregatedRescue;

    // Also update Dashboard attendance card
    updateDashboardAttendance(overallPercent, overallMath);
  }

  function logAttendance(subjectId, attended) {
    const sub = state.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    sub.total += 1;
    if (attended) {
      sub.attended += 1;
      playSound('success');
      showToast(`Logged Present for ${sub.name}! 🎉`, 'success');
    } else {
      playSound('alert');
      showToast(`Logged Absent for ${sub.name}! 💀`, 'warning');
    }

    saveState();
    renderAttendance();
    renderDashboard();
  }

  function calculateSimulator() {
    const totalInput = document.getElementById('sim-total');
    const attendedInput = document.getElementById('sim-attended');
    const targetInput = document.getElementById('sim-target');

    const total = parseInt(totalInput ? totalInput.value : 40, 10) || 1;
    const attended = parseInt(attendedInput ? attendedInput.value : 32, 10) || 0;
    const target = parseInt(targetInput ? targetInput.value : 75, 10) || 75;

    const math = calculateSubjectAttendance(total, attended, target);

    const percentText = document.getElementById('sim-percent-text');
    const adviceText = document.getElementById('sim-advice-text');

    if (percentText) {
      percentText.textContent = `${math.percent}% — ${math.status === 'Safe' ? '🟢 Safe' : math.status === 'Warning' ? '🟡 Warning' : '🔴 Danger'}`;
      percentText.className = `text-2xl font-black font-heading text-${math.statusColor}-400`;
    }

    if (adviceText) {
      if (math.status === 'Safe') {
        adviceText.textContent = `You can safely miss ${math.safeBunks} more classes! 😎`;
        adviceText.className = 'text-xs font-bold text-emerald-300 sm:text-right';
      } else {
        adviceText.textContent = `You must attend the next ${math.classesNeeded} classes without missing! 🚨`;
        adviceText.className = 'text-xs font-bold text-rose-300 sm:text-right';
      }
    }
  }

  function openAddSubjectModal() {
    playSound('click');
    const titleEl = document.getElementById('modal-subject-title');
    const idInput = document.getElementById('sub-id');
    const nameInput = document.getElementById('sub-name');
    const totalInput = document.getElementById('sub-total');
    const attInput = document.getElementById('sub-attended');

    if (titleEl) titleEl.textContent = '➕ Add Subject';
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (totalInput) totalInput.value = '40';
    if (attInput) attInput.value = '30';

    openModal('modal-subject');
  }

  function openEditSubjectModal(subjectId) {
    playSound('click');
    const sub = state.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    const titleEl = document.getElementById('modal-subject-title');
    const idInput = document.getElementById('sub-id');
    const nameInput = document.getElementById('sub-name');
    const totalInput = document.getElementById('sub-total');
    const attInput = document.getElementById('sub-attended');

    if (titleEl) titleEl.textContent = '✏️ Edit Subject';
    if (idInput) idInput.value = sub.id;
    if (nameInput) nameInput.value = sub.name;
    if (totalInput) totalInput.value = sub.total;
    if (attInput) attInput.value = sub.attended;

    openModal('modal-subject');
  }

  function saveSubject(event) {
    if (event) event.preventDefault();
    playSound('click');

    const id = document.getElementById('sub-id').value;
    const name = document.getElementById('sub-name').value.trim();
    const total = parseInt(document.getElementById('sub-total').value, 10) || 0;
    const attended = parseInt(document.getElementById('sub-attended').value, 10) || 0;

    if (!name) return;

    if (id) {
      const existing = state.subjects.find(s => s.id === id);
      if (existing) {
        existing.name = name;
        existing.total = total;
        existing.attended = Math.min(attended, total);
      }
      showToast(`Subject ${name} updated!`, 'success');
    } else {
      const newSubject = {
        id: 'sub-' + Date.now(),
        name,
        total,
        attended: Math.min(attended, total),
      };
      state.subjects.push(newSubject);
      showToast(`Added ${name} to your subjects!`, 'success');
    }

    saveState();
    closeModal('modal-subject');
    renderAttendance();
    renderDashboard();
  }

  function deleteSubject(subjectId) {
    const sub = state.subjects.find(s => s.id === subjectId);
    if (!sub) return;

    if (confirm(`Are you sure you want to delete ${sub.name}? 🗑️`)) {
      playSound('click');
      state.subjects = state.subjects.filter(s => s.id !== subjectId);
      saveState();
      renderAttendance();
      renderDashboard();
      showToast(`Deleted ${sub.name}`, 'info');
    }
  }

  // ==========================================
  // 9. ASSIGNMENTS COUNTDOWN
  // ==========================================
  function getAssignmentRemainingText(dueIso) {
    const now = new Date().getTime();
    const due = new Date(dueIso).getTime();
    const diff = due - now;

    if (diff < 0) {
      const overdueDays = Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
      return {
        badge: '💀 Overdue',
        badgeColor: 'rose',
        text: overdueDays === 0 ? 'Overdue by hours!' : `Overdue by ${overdueDays} day${overdueDays > 1 ? 's' : ''}`,
        isOverdue: true,
        isDueToday: false,
      };
    }

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (diffHours <= 24) {
      return {
        badge: '🔥 Due today',
        badgeColor: 'rose',
        text: `${diffHours} hours remaining! Panic mode on.`,
        isOverdue: false,
        isDueToday: true,
      };
    } else if (diffDays <= 2) {
      return {
        badge: '⚠️ 2 days left',
        badgeColor: 'amber',
        text: `${diffDays} days left. Time to open the doc.`,
        isOverdue: false,
        isDueToday: false,
      };
    } else if (diffDays <= 7) {
      return {
        badge: `🟢 ${diffDays} days left`,
        badgeColor: 'cyan',
        text: `${diffDays} days remaining. Plenty of time... or is it?`,
        isOverdue: false,
        isDueToday: false,
      };
    } else {
      return {
        badge: `🟢 ${diffDays} days left`,
        badgeColor: 'indigo',
        text: `${diffDays} days remaining. Chill for now.`,
        isOverdue: false,
        isDueToday: false,
      };
    }
  }

  function renderAssignments() {
    const listEl = document.getElementById('assignments-list');
    if (!listEl) return;

    // Sort assignments: pending first, then by nearest deadline, completed last
    const sorted = [...state.assignments].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

    // Filter
    const filtered = sorted.filter(a => {
      if (state.assignmentFilter === 'urgent') {
        const rem = getAssignmentRemainingText(a.dueDate);
        return !a.completed && (rem.isDueToday || rem.isOverdue);
      }
      if (state.assignmentFilter === 'pending') return !a.completed;
      if (state.assignmentFilter === 'completed') return a.completed;
      return true; // 'all'
    });

    listEl.innerHTML = '';

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="glass-card rounded-2xl p-8 text-center border border-white/10 text-slate-400">
          <span class="text-4xl block mb-2">🎉</span>
          <p class="text-sm font-bold text-white">No assignments in this category!</p>
          <p class="text-xs text-slate-400 mt-1">Enjoy the peace while it lasts. 😂</p>
        </div>
      `;
      return;
    }

    filtered.forEach(asg => {
      const rem = getAssignmentRemainingText(asg.dueDate);
      const formattedDate = new Date(asg.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const card = document.createElement('div');
      card.className = `glass-card rounded-2xl p-4 sm:p-5 border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        asg.completed ? 'opacity-60 border-white/5 bg-slate-900/40' : 'border-white/15'
      }`;

      card.innerHTML = `
        <div class="flex items-start gap-3 flex-1">
          <!-- Checkbox Button -->
          <button onclick="App.toggleAssignmentComplete('${asg.id}')" title="${asg.completed ? 'Mark pending' : 'Mark complete'}" class="mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition flex-shrink-0 ${
            asg.completed ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/30 hover:border-emerald-400 text-transparent'
          }">
            ✓
          </button>

          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                ${escapeHtml(asg.subject)}
              </span>
              ${
                asg.completed ? `
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    ✅ Completed
                  </span>
                ` : `
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-${rem.badgeColor}-500/20 text-${rem.badgeColor}-300 border border-${rem.badgeColor}-500/30">
                    ${rem.badge}
                  </span>
                  <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold text-slate-400 bg-white/5">
                    ${asg.priority} Priority
                  </span>
                `
              }
            </div>

            <h4 class="font-heading font-black text-sm sm:text-base text-white ${asg.completed ? 'line-through text-slate-400' : ''}">
              ${escapeHtml(asg.title)}
            </h4>

            <div class="text-xs text-slate-400 flex items-center gap-3">
              <span>📅 Due: ${formattedDate}</span>
              ${!asg.completed ? `<span class="text-${rem.badgeColor}-300 font-semibold">${rem.text}</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2 self-end sm:self-center">
          <button onclick="App.toggleAssignmentComplete('${asg.id}')" class="px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
            asg.completed ? 'bg-white/10 hover:bg-white/15 text-slate-300' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
          }">
            <span>${asg.completed ? '↩️ Undo' : '✅ Done'}</span>
          </button>
          <button onclick="App.openEditAssignmentModal('${asg.id}')" title="Edit Assignment" class="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs transition">
            ✏️
          </button>
          <button onclick="App.deleteAssignment('${asg.id}')" title="Delete Assignment" class="p-1.5 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs transition">
            🗑️
          </button>
        </div>
      `;

      listEl.appendChild(card);
    });

    // Update assignment badge count
    const pendingCount = state.assignments.filter(a => !a.completed).length;
    const badgeEl = document.getElementById('badge-assignments-count');
    const mobileBadgeEl = document.getElementById('mobile-badge-tasks');
    if (badgeEl) badgeEl.textContent = pendingCount;
    if (mobileBadgeEl) {
      if (pendingCount > 0) mobileBadgeEl.classList.remove('hidden');
      else mobileBadgeEl.classList.add('hidden');
    }
  }

  function toggleAssignmentComplete(asgId) {
    const asg = state.assignments.find(a => a.id === asgId);
    if (!asg) return;

    asg.completed = !asg.completed;
    saveState();

    if (asg.completed) {
      playSound('success');
      showToast(`🎉 Marked "${asg.title}" as completed! Survival score increased!`, 'success');
    } else {
      playSound('click');
      showToast(`Marked "${asg.title}" as pending. Back to the grind! 📝`, 'info');
    }

    renderAssignments();
    renderDashboard();
  }

  function filterAssignments(filterType) {
    playSound('click');
    state.assignmentFilter = filterType;

    document.querySelectorAll('.assign-filter-btn').forEach(btn => {
      if (btn.dataset.assignFilter === filterType) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    renderAssignments();
  }

  function openAddAssignmentModal() {
    playSound('click');
    const titleEl = document.getElementById('modal-assign-title');
    const idInput = document.getElementById('assign-id');
    const titleInput = document.getElementById('assign-title');
    const subSelect = document.getElementById('assign-subject');
    const dateInput = document.getElementById('assign-date');
    const prioritySelect = document.getElementById('assign-priority');

    if (titleEl) titleEl.textContent = '➕ Add Assignment';
    if (idInput) idInput.value = '';
    if (titleInput) titleInput.value = '';
    if (subSelect) subSelect.value = 'DBMS';
    
    // Default 3 days from now
    const d = new Date();
    d.setDate(d.getDate() + 3);
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];
    if (prioritySelect) prioritySelect.value = 'Medium';

    openModal('modal-assignment');
  }

  function openEditAssignmentModal(asgId) {
    playSound('click');
    const asg = state.assignments.find(a => a.id === asgId);
    if (!asg) return;

    const titleEl = document.getElementById('modal-assign-title');
    const idInput = document.getElementById('assign-id');
    const titleInput = document.getElementById('assign-title');
    const subSelect = document.getElementById('assign-subject');
    const dateInput = document.getElementById('assign-date');
    const prioritySelect = document.getElementById('assign-priority');

    if (titleEl) titleEl.textContent = '✏️ Edit Assignment';
    if (idInput) idInput.value = asg.id;
    if (titleInput) titleInput.value = asg.title;
    if (subSelect) subSelect.value = asg.subject;
    if (dateInput) dateInput.value = asg.dueDate.split('T')[0];
    if (prioritySelect) prioritySelect.value = asg.priority;

    openModal('modal-assignment');
  }

  function saveAssignment(event) {
    if (event) event.preventDefault();
    playSound('click');

    const id = document.getElementById('assign-id').value;
    const title = document.getElementById('assign-title').value.trim();
    const subject = document.getElementById('assign-subject').value;
    const dateVal = document.getElementById('assign-date').value;
    const priority = document.getElementById('assign-priority').value;

    if (!title || !dateVal) return;

    const dueIso = new Date(dateVal + 'T23:59:00').toISOString();

    if (id) {
      const existing = state.assignments.find(a => a.id === id);
      if (existing) {
        existing.title = title;
        existing.subject = subject;
        existing.dueDate = dueIso;
        existing.priority = priority;
      }
      showToast(`Updated assignment: ${title}!`, 'success');
    } else {
      const newAsg = {
        id: 'asg-' + Date.now(),
        title,
        subject,
        dueDate: dueIso,
        priority,
        completed: false,
      };
      state.assignments.push(newAsg);
      showToast(`New assignment "${title}" added! Don't forget it 💀`, 'success');
    }

    saveState();
    closeModal('modal-assignment');
    renderAssignments();
    renderDashboard();
  }

  function deleteAssignment(asgId) {
    const asg = state.assignments.find(a => a.id === asgId);
    if (!asg) return;

    if (confirm(`Delete assignment "${asg.title}"? 🗑️`)) {
      playSound('click');
      state.assignments = state.assignments.filter(a => a.id !== asgId);
      saveState();
      renderAssignments();
      renderDashboard();
      showToast(`Deleted assignment: ${asg.title}`, 'info');
    }
  }

  // ==========================================
  // 10. CANTEEN STATUS & MENU
  // ==========================================
  function renderCanteen() {
    const heroBadge = document.getElementById('canteen-hero-badge');
    const heroText = document.getElementById('canteen-hero-text');
    const funnyMessage = document.getElementById('canteen-funny-message');
    const toggleActionBtn = document.getElementById('canteen-toggle-action-btn');
    const menuGrid = document.getElementById('canteen-menu-grid');
    const calcItemsContainer = document.getElementById('canteen-calculator-items');

    const isOpen = state.canteen.isOpen;

    // Header Pill
    const headerPill = document.getElementById('header-canteen-pill');
    if (headerPill) {
      headerPill.textContent = isOpen ? 'OPEN' : 'CLOSED';
      headerPill.className = `ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
        isOpen ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
      }`;
    }

    // Hero Badge & Humor
    if (heroBadge && heroText) {
      if (isOpen) {
        heroBadge.className = 'px-6 py-3 rounded-2xl text-xl sm:text-2xl font-black font-heading bg-emerald-500/20 text-emerald-300 border-2 border-emerald-500/40 shadow-xl flex items-center gap-2';
        heroText.textContent = '🟢 OPEN';
        if (funnyMessage) funnyMessage.textContent = '“🍔 Your wallet is in danger.”';
        if (toggleActionBtn) toggleActionBtn.textContent = 'Switch to CLOSED';
      } else {
        heroBadge.className = 'px-6 py-3 rounded-2xl text-xl sm:text-2xl font-black font-heading bg-rose-500/20 text-rose-300 border-2 border-rose-500/40 shadow-xl flex items-center gap-2';
        heroText.textContent = '🔴 CLOSED';
        if (funnyMessage) funnyMessage.textContent = '“😭 RIP. Survive until tomorrow.”';
        if (toggleActionBtn) toggleActionBtn.textContent = 'Switch to OPEN';
      }
    }

    // Render Menu Cards
    if (menuGrid) {
      menuGrid.innerHTML = '';
      state.canteen.menu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl p-4 border border-white/15 flex items-center justify-between gap-3 shadow-md hover:border-amber-400/40 transition';
        card.innerHTML = `
          <div class="flex items-center gap-3">
            <span class="text-3xl p-2.5 rounded-xl bg-white/10">${item.emoji}</span>
            <div>
              <h4 class="font-heading font-black text-sm text-white">${escapeHtml(item.name)}</h4>
              <span class="text-[11px] text-slate-400">${item.category}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-base font-black text-amber-400 font-mono">₹${item.price}</div>
            <button onclick="App.addCanteenToOrder(${item.price})" class="mt-1 px-2 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white transition active:scale-95">
              + Order
            </button>
          </div>
        `;
        menuGrid.appendChild(card);
      });
    }

    // Render Calculator Checkbox Items
    if (calcItemsContainer) {
      calcItemsContainer.innerHTML = '';
      state.canteen.menu.slice(0, 6).forEach(item => {
        const box = document.createElement('label');
        box.className = 'p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer flex items-center gap-2 text-xs font-bold text-white select-none transition';
        box.innerHTML = `
          <input type="checkbox" data-canteen-price="${item.price}" onchange="App.recalculateCanteenBill()" class="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-800 border-white/20">
          <span>${item.emoji} ₹${item.price}</span>
        `;
        calcItemsContainer.appendChild(box);
      });
    }
  }

  function toggleCanteenStatus() {
    playSound('click');
    state.canteen.isOpen = !state.canteen.isOpen;
    saveState();

    if (state.canteen.isOpen) {
      playSound('success');
      showToast('🍔 Canteen is now OPEN! Run before the Maggi finishes!', 'success');
    } else {
      playSound('alert');
      showToast('😭 Canteen is now CLOSED! Survive until tomorrow.', 'warning');
    }

    renderCanteen();
    renderDashboard();
  }

  let canteenOrderTotal = 0;
  function addCanteenToOrder(price) {
    playSound('click');
    canteenOrderTotal += price;
    updateCanteenBillDisplay();
    showToast(`Added item to your survival tab! (+₹${price})`, 'info');
  }

  function recalculateCanteenBill() {
    playSound('click');
    let sum = 0;
    document.querySelectorAll('[data-canteen-price]').forEach(input => {
      if (input.checked) {
        sum += parseInt(input.dataset.canteenPrice, 10) || 0;
      }
    });
    canteenOrderTotal = sum;
    updateCanteenBillDisplay();
  }

  function updateCanteenBillDisplay() {
    const billEl = document.getElementById('canteen-total-bill');
    if (billEl) billEl.textContent = `₹${canteenOrderTotal}`;
  }

  // ==========================================
  // 11. TIMETABLE
  // ==========================================
  function renderTimetable() {
    const selectedDay = state.selectedTimetableDay;
    const headingEl = document.getElementById('timetable-selected-day-heading');
    const countEl = document.getElementById('timetable-classes-count');
    const listEl = document.getElementById('timetable-day-list');

    if (headingEl) headingEl.textContent = `${selectedDay}'s Schedule`;

    // Highlight active day button
    document.querySelectorAll('.timetable-day-btn').forEach(btn => {
      if (btn.dataset.day === selectedDay) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const dayClasses = state.timetable.filter(t => t.day.toLowerCase() === selectedDay.toLowerCase());
    if (countEl) countEl.textContent = `${dayClasses.length} Class${dayClasses.length === 1 ? '' : 'es'}`;

    if (!listEl) return;
    listEl.innerHTML = '';

    if (dayClasses.length === 0) {
      listEl.innerHTML = `
        <div class="p-8 text-center text-slate-400">
          <span class="text-4xl block mb-2">🏖️</span>
          <p class="text-sm font-bold text-white">No classes scheduled for ${selectedDay}!</p>
          <p class="text-xs text-slate-400 mt-1">Legitimate day to sleep or study without guilt. 😂</p>
        </div>
      `;
      return;
    }

    dayClasses.forEach(item => {
      const isBreak = item.subject.toLowerCase().includes('break');
      const card = document.createElement('div');
      card.className = `p-4 rounded-2xl border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
        isBreak
          ? 'bg-amber-500/10 border-amber-500/25 text-amber-200'
          : 'bg-white/5 border-white/10 hover:border-cyan-400/40 text-white'
      }`;

      card.innerHTML = `
        <div class="flex items-center gap-4">
          <div class="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-center min-w-[110px]">
            <span class="text-xs font-mono font-bold text-cyan-300">${escapeHtml(item.time)}</span>
          </div>
          <div>
            <h4 class="font-heading font-black text-sm sm:text-base text-white flex items-center gap-2">
              <span>${isBreak ? '☕' : '📚'}</span>
              <span>${escapeHtml(item.subject)}</span>
            </h4>
            <div class="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
              <span>📍 ${escapeHtml(item.room)}</span>
              ${item.faculty ? `<span>👨🏫 ${escapeHtml(item.faculty)}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-1.5 self-end sm:self-center">
          <button onclick="App.openEditClassModal('${item.id}')" title="Edit Class" class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs transition">
            ✏️
          </button>
          <button onclick="App.deleteClass('${item.id}')" title="Delete Class" class="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs transition">
            🗑️
          </button>
        </div>
      `;

      listEl.appendChild(card);
    });
  }

  function selectTimetableDay(day) {
    playSound('click');
    state.selectedTimetableDay = day;
    renderTimetable();
  }

  function openAddClassModal() {
    playSound('click');
    const titleEl = document.getElementById('modal-class-title');
    const idInput = document.getElementById('class-id');
    const daySelect = document.getElementById('class-day');
    const timeInput = document.getElementById('class-time');
    const subInput = document.getElementById('class-subject');
    const roomInput = document.getElementById('class-room');
    const facultyInput = document.getElementById('class-faculty');

    if (titleEl) titleEl.textContent = '➕ Add Class';
    if (idInput) idInput.value = '';
    if (daySelect) daySelect.value = state.selectedTimetableDay;
    if (timeInput) timeInput.value = '10:00 - 11:00';
    if (subInput) subInput.value = '';
    if (roomInput) roomInput.value = 'Room 302';
    if (facultyInput) facultyInput.value = '';

    openModal('modal-class');
  }

  function openEditClassModal(classId) {
    playSound('click');
    const item = state.timetable.find(t => t.id === classId);
    if (!item) return;

    const titleEl = document.getElementById('modal-class-title');
    const idInput = document.getElementById('class-id');
    const daySelect = document.getElementById('class-day');
    const timeInput = document.getElementById('class-time');
    const subInput = document.getElementById('class-subject');
    const roomInput = document.getElementById('class-room');
    const facultyInput = document.getElementById('class-faculty');

    if (titleEl) titleEl.textContent = '✏️ Edit Class';
    if (idInput) idInput.value = item.id;
    if (daySelect) daySelect.value = item.day;
    if (timeInput) timeInput.value = item.time;
    if (subInput) subInput.value = item.subject;
    if (roomInput) roomInput.value = item.room;
    if (facultyInput) facultyInput.value = item.faculty || '';

    openModal('modal-class');
  }

  function saveClass(event) {
    if (event) event.preventDefault();
    playSound('click');

    const id = document.getElementById('class-id').value;
    const day = document.getElementById('class-day').value;
    const time = document.getElementById('class-time').value.trim();
    const subject = document.getElementById('class-subject').value.trim();
    const room = document.getElementById('class-room').value.trim();
    const faculty = document.getElementById('class-faculty').value.trim();

    if (!time || !subject) return;

    if (id) {
      const existing = state.timetable.find(t => t.id === id);
      if (existing) {
        existing.day = day;
        existing.time = time;
        existing.subject = subject;
        existing.room = room;
        existing.faculty = faculty;
      }
      showToast(`Updated timetable entry for ${subject}!`, 'success');
    } else {
      const newClass = {
        id: 'tt-' + Date.now(),
        day,
        time,
        subject,
        room,
        faculty,
      };
      state.timetable.push(newClass);
      showToast(`Added ${subject} to ${day}!`, 'success');
    }

    state.selectedTimetableDay = day;
    saveState();
    closeModal('modal-class');
    renderTimetable();
    renderDashboard();
  }

  function deleteClass(classId) {
    const item = state.timetable.find(t => t.id === classId);
    if (!item) return;

    if (confirm(`Remove ${item.subject} from timetable? 🗑️`)) {
      playSound('click');
      state.timetable = state.timetable.filter(t => t.id !== classId);
      saveState();
      renderTimetable();
      renderDashboard();
      showToast(`Removed ${item.subject}`, 'info');
    }
  }

  // ==========================================
  // 12. EXAM COUNTDOWN (Live ticker every second)
  // ==========================================
  let examTickerInterval = null;

  function getTimeDifferenceParts(targetIso) {
    const target = new Date(targetIso).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, mins: 0, secs: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, mins, secs, isPast: false };
  }

  function renderExams() {
    const container = document.getElementById('exams-container');
    if (!container) return;

    // Sort by nearest date
    const sorted = [...state.exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    container.innerHTML = '';

    if (sorted.length === 0) {
      container.innerHTML = `
        <div class="col-span-full glass-card rounded-2xl p-8 text-center text-slate-400">
          <span class="text-4xl block mb-2">🎉</span>
          <p class="text-sm font-bold text-white">No exams on record!</p>
          <p class="text-xs text-slate-400 mt-1">Are you sure or are you in denial? 😂</p>
        </div>
      `;
      return;
    }

    sorted.forEach(exam => {
      const parts = getTimeDifferenceParts(exam.date);
      const isUrgent = parts.days < 3;
      const formattedDate = new Date(exam.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const formattedTime = new Date(exam.date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });

      const card = document.createElement('div');
      card.className = `glass-card rounded-3xl p-6 border shadow-2xl relative overflow-hidden flex flex-col justify-between ${
        isUrgent ? 'border-rose-500/50 bg-rose-950/20' : 'border-white/15'
      }`;

      card.innerHTML = `
        <div>
          <div class="flex items-start justify-between gap-3 mb-3">
            <div>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${
                isUrgent ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              }">
                ${isUrgent ? '🚨 PANIC MODE (<3 Days)' : '⏳ Approaching'}
              </span>
              <h3 class="font-heading font-black text-xl text-white mt-1.5 flex items-center gap-1.5">
                <span>🔥</span> ${escapeHtml(exam.subject)}
              </h3>
              <p class="text-xs text-slate-400 mt-0.5">
                📅 ${formattedDate} at ${formattedTime} • 📍 ${escapeHtml(exam.hall)}
              </p>
            </div>
            
            <div class="flex items-center gap-1">
              <button onclick="App.openEditExamModal('${exam.id}')" title="Edit Exam" class="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs transition">
                ✏️
              </button>
              <button onclick="App.deleteExam('${exam.id}')" title="Delete Exam" class="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 text-xs transition">
                🗑️
              </button>
            </div>
          </div>

          <!-- Live 4-Block Ticker -->
          <div class="grid grid-cols-4 gap-2 my-4 text-center">
            <div class="p-2 sm:p-3 rounded-2xl bg-white/10 border border-white/10">
              <div class="text-xl sm:text-2xl font-black font-heading text-white" data-ticker-days="${exam.id}">${parts.days}</div>
              <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Days</div>
            </div>
            <div class="p-2 sm:p-3 rounded-2xl bg-white/10 border border-white/10">
              <div class="text-xl sm:text-2xl font-black font-heading text-white" data-ticker-hours="${exam.id}">${String(parts.hours).padStart(2, '0')}</div>
              <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Hours</div>
            </div>
            <div class="p-2 sm:p-3 rounded-2xl bg-white/10 border border-white/10">
              <div class="text-xl sm:text-2xl font-black font-heading text-white" data-ticker-mins="${exam.id}">${String(parts.mins).padStart(2, '0')}</div>
              <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Mins</div>
            </div>
            <div class="p-2 sm:p-3 rounded-2xl bg-white/10 border border-white/10">
              <div class="text-xl sm:text-2xl font-black font-mono text-amber-400" data-ticker-secs="${exam.id}">${String(parts.secs).padStart(2, '0')}</div>
              <div class="text-[9px] sm:text-[10px] uppercase font-bold text-slate-400">Secs</div>
            </div>
          </div>

          ${
            exam.syllabus ? `
              <div class="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300">
                <span class="font-bold text-indigo-300">📖 Syllabus focus:</span> ${escapeHtml(exam.syllabus)}
              </div>
            ` : ''
          }
        </div>
      `;

      container.appendChild(card);
    });

    startExamTicker();
  }

  function startExamTicker() {
    if (examTickerInterval) clearInterval(examTickerInterval);

    examTickerInterval = setInterval(() => {
      state.exams.forEach(exam => {
        const parts = getTimeDifferenceParts(exam.date);
        const daysEl = document.querySelector(`[data-ticker-days="${exam.id}"]`);
        const hoursEl = document.querySelector(`[data-ticker-hours="${exam.id}"]`);
        const minsEl = document.querySelector(`[data-ticker-mins="${exam.id}"]`);
        const secsEl = document.querySelector(`[data-ticker-secs="${exam.id}"]`);

        if (daysEl) daysEl.textContent = parts.days;
        if (hoursEl) hoursEl.textContent = String(parts.hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(parts.mins).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(parts.secs).padStart(2, '0');
      });

      // Also update dashboard next exam ticker
      updateDashboardExamTicker();
    }, 1000);
  }

  function openAddExamModal() {
    playSound('click');
    const titleEl = document.getElementById('modal-exam-title');
    const idInput = document.getElementById('exam-id');
    const subSelect = document.getElementById('exam-subject');
    const dateInput = document.getElementById('exam-date');
    const timeInput = document.getElementById('exam-time');
    const hallInput = document.getElementById('exam-hall');

    if (titleEl) titleEl.textContent = '➕ Add Exam';
    if (idInput) idInput.value = '';
    if (subSelect) subSelect.value = 'DBMS';

    const d = new Date();
    d.setDate(d.getDate() + 14);
    if (dateInput) dateInput.value = d.toISOString().split('T')[0];
    if (timeInput) timeInput.value = '10:00';
    if (hallInput) hallInput.value = 'Main Hall A';

    openModal('modal-exam');
  }

  function openEditExamModal(examId) {
    playSound('click');
    const exam = state.exams.find(e => e.id === examId);
    if (!exam) return;

    const titleEl = document.getElementById('modal-exam-title');
    const idInput = document.getElementById('exam-id');
    const subSelect = document.getElementById('exam-subject');
    const dateInput = document.getElementById('exam-date');
    const timeInput = document.getElementById('exam-time');
    const hallInput = document.getElementById('exam-hall');

    if (titleEl) titleEl.textContent = '✏️ Edit Exam';
    if (idInput) idInput.value = exam.id;
    if (subSelect) subSelect.value = exam.subject;
    if (dateInput) dateInput.value = exam.date.split('T')[0];
    
    const timeStr = new Date(exam.date).toTimeString().substring(0, 5);
    if (timeInput) timeInput.value = timeStr || '10:00';
    if (hallInput) hallInput.value = exam.hall;

    openModal('modal-exam');
  }

  function saveExam(event) {
    if (event) event.preventDefault();
    playSound('click');

    const id = document.getElementById('exam-id').value;
    const subject = document.getElementById('exam-subject').value;
    const dateVal = document.getElementById('exam-date').value;
    const timeVal = document.getElementById('exam-time').value || '10:00';
    const hall = document.getElementById('exam-hall').value.trim();

    if (!dateVal || !hall) return;

    const examIso = new Date(`${dateVal}T${timeVal}:00`).toISOString();

    if (id) {
      const existing = state.exams.find(e => e.id === id);
      if (existing) {
        existing.subject = subject;
        existing.date = examIso;
        existing.hall = hall;
      }
      showToast(`Updated ${subject} exam details!`, 'success');
    } else {
      const newExam = {
        id: 'ex-' + Date.now(),
        subject,
        date: examIso,
        hall,
        syllabus: 'High priority modules & past year questions'
      };
      state.exams.push(newExam);
      showToast(`Scheduled ${subject} exam! Start preparing! 📚`, 'success');
    }

    saveState();
    closeModal('modal-exam');
    renderExams();
    renderDashboard();
  }

  function deleteExam(examId) {
    const exam = state.exams.find(e => e.id === examId);
    if (!exam) return;

    if (confirm(`Remove ${exam.subject} exam? 🗑️`)) {
      playSound('click');
      state.exams = state.exams.filter(e => e.id !== examId);
      saveState();
      renderExams();
      renderDashboard();
      showToast(`Deleted ${exam.subject} exam`, 'info');
    }
  }

  // ==========================================
  // 13. SLEEP OR STUDY (SURVIVAL AI)
  // ==========================================
  function askSleepOrStudyQuick() {
    playSound('click');
    const randomVerdict = SLEEP_STUDY_RESPONSES[Math.floor(Math.random() * SLEEP_STUDY_RESPONSES.length)];

    // Update Dashboard Mini Result Card
    const dashOutput = document.getElementById('dash-sleep-output');
    const dashTitle = document.getElementById('dash-sleep-verdict-title');
    const dashText = document.getElementById('dash-sleep-verdict-text');

    if (dashOutput) dashOutput.classList.remove('hidden');
    if (dashTitle) dashTitle.textContent = randomVerdict.title;
    if (dashText) dashText.textContent = randomVerdict.text;

    // Also update Quick Modal
    const quickTitle = document.getElementById('quick-sleep-verdict-title');
    const quickText = document.getElementById('quick-sleep-verdict-text');
    if (quickTitle) quickTitle.textContent = randomVerdict.title;
    if (quickText) quickText.textContent = randomVerdict.text;

    openModal('modal-sleep-quick');
  }

  function openSleepStudyModal() {
    navigate('sleep');
  }

  function updateSleepHoursVal() {
    const val = document.getElementById('sleep-hours-slider').value;
    const label = document.getElementById('sleep-hours-val');
    if (label) label.textContent = `${val} Hours`;
  }

  function updateSleepSyllabusVal() {
    const val = document.getElementById('sleep-syllabus-slider').value;
    const label = document.getElementById('sleep-syllabus-val');
    if (label) label.textContent = `${val}% Pending`;
  }

  function selectBrainStatus(status) {
    playSound('click');
    state.selectedBrainStatus = status;
    document.querySelectorAll('.brain-btn').forEach(btn => {
      if (btn.dataset.brain === status) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function askSurvivalAI() {
    playSound('click');
    const sleepHours = parseInt(document.getElementById('sleep-hours-slider').value, 10);
    const syllabusPending = parseInt(document.getElementById('sleep-syllabus-slider').value, 10);
    const brain = state.selectedBrainStatus;

    const resultBox = document.getElementById('sleep-result-container');
    const badgeEl = document.getElementById('sleep-result-badge');
    const titleEl = document.getElementById('sleep-result-title');
    const descEl = document.getElementById('sleep-result-desc');
    const napWidget = document.getElementById('nap-timer-widget');

    let verdict = {
      badge: 'Academic Priority',
      badgeClass: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
      boxClass: 'bg-rose-950/40 border-rose-500/40',
      title: '📚 STUDY! Your exam is coming.',
      desc: '“You have 70%+ syllabus pending and your brain has enough fuel to process notes. Open the book!”',
      showNap: false,
    };

    if (sleepHours <= 3 || brain === 'zombie') {
      verdict = {
        badge: 'Critical Recovery Required',
        badgeClass: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
        boxClass: 'bg-indigo-950/40 border-indigo-500/40',
        title: '😴 SLEEP! A tired brain learns nothing.',
        desc: '“You are operating on 1% battery. Trying to memorize formulas now is like writing on water. Sleep 3 hours or take a power nap!”',
        showNap: true,
      };
    } else if (brain === 'drowsy' && syllabusPending > 50) {
      verdict = {
        badge: 'Strategic Emergency Maneuver',
        badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        boxClass: 'bg-amber-950/40 border-amber-500/40',
        title: '☕ 20-Min Power Nap → Heavy Coffee → Study!',
        desc: '“Take a strict 20-minute power nap right now. When the alarm rings, wash your face, grab a cold coffee from the canteen, and start!”',
        showNap: true,
      };
    } else if (syllabusPending <= 25) {
      verdict = {
        badge: 'Academic Superiority 😎',
        badgeClass: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
        boxClass: 'bg-emerald-950/40 border-emerald-500/40',
        title: '😴 SLEEP PEACEFULLY!',
        desc: '“You\'ve actually prepared most of the syllabus. Rest your brain so you remember it tomorrow morning. Well done!”',
        showNap: false,
      };
    } else {
      verdict = {
        badge: 'Deadline Reality Check',
        badgeClass: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
        boxClass: 'bg-amber-950/40 border-amber-500/40',
        title: '📚 STUDY! Close the app and read!',
        desc: '“You opened the app looking for an excuse to sleep. Caught you! 😂 Go finish the first chapter!”',
        showNap: false,
      };
    }

    if (resultBox) {
      resultBox.className = `mt-6 p-5 rounded-2xl border-2 text-center animate-fade-in ${verdict.boxClass}`;
      resultBox.classList.remove('hidden');
    }
    if (badgeEl) {
      badgeEl.className = `inline-block px-3 py-1 rounded-full text-xs font-black uppercase mb-2 ${verdict.badgeClass}`;
      badgeEl.textContent = verdict.badge;
    }
    if (titleEl) titleEl.textContent = verdict.title;
    if (descEl) descEl.textContent = verdict.desc;

    if (napWidget) {
      if (verdict.showNap) napWidget.classList.remove('hidden');
      else napWidget.classList.add('hidden');
    }

    playSound('alert');
  }

  // 20-Minute Power Nap Timer
  let napTimerInterval = null;
  let napSecondsRemaining = 20 * 60; // 1200 seconds

  function startNapTimer() {
    playSound('click');
    const startBtn = document.getElementById('nap-start-btn');
    if (napTimerInterval) {
      clearInterval(napTimerInterval);
      napTimerInterval = null;
      if (startBtn) startBtn.textContent = 'Resume Nap 😴';
      return;
    }

    if (startBtn) startBtn.textContent = 'Pause Nap ⏸️';
    showToast('Power nap timer started! Close your eyes 😴', 'info');

    napTimerInterval = setInterval(() => {
      napSecondsRemaining -= 1;
      updateNapDisplay();

      if (napSecondsRemaining <= 0) {
        clearInterval(napTimerInterval);
        napTimerInterval = null;
        playSound('alarm');
        alert('⏰ WAKE UP! 20 Minutes are up! Time to conquer your syllabus! 🔥');
        resetNapTimer();
      }
    }, 1000);
  }

  function resetNapTimer() {
    playSound('click');
    if (napTimerInterval) clearInterval(napTimerInterval);
    napTimerInterval = null;
    napSecondsRemaining = 20 * 60;
    updateNapDisplay();
    const startBtn = document.getElementById('nap-start-btn');
    if (startBtn) startBtn.textContent = 'Start Nap 😴';
  }

  function updateNapDisplay() {
    const display = document.getElementById('nap-time-display');
    if (!display) return;
    const mins = Math.floor(napSecondsRemaining / 60);
    const secs = napSecondsRemaining % 60;
    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  // ==========================================
  // 14. HOME DASHBOARD RENDERING & SURVIVAL SCORE
  // ==========================================
  function renderDashboard() {
    // 1. Personalized Greeting
    const greetingEl = document.getElementById('dash-greeting-name');
    if (greetingEl) greetingEl.textContent = state.student.name || 'Student';

    // 2. Academic Survival Score (0-100)
    calculateAndRenderSurvivalScore();

    // 3. Attendance card
    let totalClasses = 0;
    let totalAttended = 0;
    state.subjects.forEach(s => {
      totalClasses += s.total;
      totalAttended += s.attended;
    });
    const overallPercent = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 1000) / 10 : 0;
    const overallMath = calculateSubjectAttendance(totalClasses, totalAttended, 75);
    updateDashboardAttendance(overallPercent, overallMath);

    // 4. Assignments card
    const pendingAssignments = state.assignments.filter(a => !a.completed);
    const sortedPending = [...pendingAssignments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const countBadge = document.getElementById('dash-assignments-pending');
    const nextTitle = document.getElementById('dash-next-assignment-title');
    const nextTime = document.getElementById('dash-next-assignment-time');

    if (countBadge) countBadge.textContent = `${pendingAssignments.length} Pending`;
    if (sortedPending.length > 0) {
      const closest = sortedPending[0];
      const rem = getAssignmentRemainingText(closest.dueDate);
      if (nextTitle) nextTitle.textContent = closest.title;
      if (nextTime) nextTime.innerHTML = `<span>${rem.badge} — ${escapeHtml(closest.subject)}</span>`;
    } else {
      if (nextTitle) nextTitle.textContent = 'All assignments completed! 🎉';
      if (nextTime) nextTime.textContent = 'Zero pending deadlines for now.';
    }

    // 5. Canteen card
    const canteenBadge = document.getElementById('dash-canteen-status-badge');
    const canteenHeadline = document.getElementById('dash-canteen-menu-headline');
    const canteenHumor = document.getElementById('dash-canteen-humor');
    if (canteenBadge) {
      if (state.canteen.isOpen) {
        canteenBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1';
        canteenBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400"></span> 🟢 OPEN';
        if (canteenHeadline) canteenHeadline.textContent = 'Maggi + Cold Drink available';
        if (canteenHumor) canteenHumor.textContent = '“🍔 Your wallet is in danger.”';
      } else {
        canteenBadge.className = 'px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1';
        canteenBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-rose-400"></span> 🔴 CLOSED';
        if (canteenHeadline) canteenHeadline.textContent = 'Reopening at 08:00 AM tomorrow';
        if (canteenHumor) canteenHumor.textContent = '“😭 RIP. Survive until tomorrow.”';
      }
    }

    // 6. Timetable Mini List
    renderDashboardTimetable();

    // 7. Next Exam Card
    updateDashboardExamTicker();
  }

  function updateDashboardAttendance(overallPercent, math) {
    const percentEl = document.getElementById('dash-attendance-percent');
    const badgeEl = document.getElementById('dash-attendance-badge');
    const barEl = document.getElementById('dash-attendance-bar');
    const adviceEl = document.getElementById('dash-attendance-advice');

    if (percentEl) percentEl.textContent = `${overallPercent}%`;
    if (badgeEl) {
      badgeEl.textContent = math.status === 'Safe' ? '🟢 Safe' : math.status === 'Warning' ? '🟡 Warning' : '🔴 Danger';
      badgeEl.className = `px-2 py-0.5 rounded-full text-xs font-black bg-${math.statusColor}-500/20 text-${math.statusColor}-300 border border-${math.statusColor}-500/30`;
    }
    if (barEl) {
      barEl.style.width = `${Math.min(overallPercent, 100)}%`;
      barEl.className = `h-full rounded-full transition-all duration-700 bg-gradient-to-r ${
        math.statusColor === 'emerald' ? 'from-amber-400 to-emerald-400' :
        math.statusColor === 'amber' ? 'from-amber-500 to-rose-400' :
        'from-rose-600 to-rose-400'
      }`;
    }
    if (adviceEl) {
      if (math.status === 'Safe') {
        adviceEl.innerHTML = `<span>😎 Safe zone! You can bunk ${math.safeBunks} classes across subjects!</span>`;
      } else {
        adviceEl.innerHTML = `<span>⚠️ Attend a few more classes to stay chill!</span>`;
      }
    }
  }

  function renderDashboardTimetable() {
    const miniList = document.getElementById('dash-timetable-mini-list');
    const todayNameEl = document.getElementById('dash-today-name');
    if (!miniList) return;

    // Determine current day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    const queryDay = currentDay === 'Sunday' ? 'Monday' : currentDay;

    if (todayNameEl) todayNameEl.textContent = `${queryDay}'s Schedule`;

    const dayClasses = state.timetable.filter(t => t.day.toLowerCase() === queryDay.toLowerCase());

    miniList.innerHTML = '';
    if (dayClasses.length === 0) {
      miniList.innerHTML = `
        <div class="py-3 text-center text-xs text-slate-400 font-sans">
          No classes scheduled for today! Enjoy your break. 🏖️
        </div>
      `;
      return;
    }

    dayClasses.slice(0, 5).forEach(item => {
      const isBreak = item.subject.toLowerCase().includes('break');
      const row = document.createElement('div');
      row.className = `flex justify-between items-center py-1.5 px-2.5 rounded-lg text-xs ${
        isBreak ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' : 'bg-white/5 text-slate-300'
      }`;
      row.innerHTML = `
        <span class="font-bold text-white">${escapeHtml(item.time.split(' - ')[0])}</span>
        <span class="truncate max-w-[170px]">${escapeHtml(item.subject)}</span>
      `;
      miniList.appendChild(row);
    });
  }

  function updateDashboardExamTicker() {
    const sorted = [...state.exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sorted.length === 0) return;

    const nextExam = sorted[0];
    const parts = getTimeDifferenceParts(nextExam.date);

    const subEl = document.getElementById('dash-next-exam-subject');
    const daysEl = document.getElementById('dash-exam-days');
    const hoursEl = document.getElementById('dash-exam-hours');
    const minsEl = document.getElementById('dash-exam-mins');
    const secsEl = document.getElementById('dash-exam-secs');

    if (subEl) subEl.textContent = `${nextExam.subject} Exam`;
    if (daysEl) daysEl.textContent = parts.days;
    if (hoursEl) hoursEl.textContent = String(parts.hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(parts.mins).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(parts.secs).padStart(2, '0');
  }

  /**
   * 🎓 Academic Survival Score Algorithm (0-100)
   * - Attendance Health (45% weight): (overallAtt % / 100) * 45
   * - Assignment Backlog (35% weight): completed / total * 35
   * - Exam Preparedness (20% weight): closest exam buffer
   */
  function calculateAndRenderSurvivalScore() {
    // 1. Attendance points (up to 45)
    let totalClasses = 0;
    let totalAttended = 0;
    state.subjects.forEach(s => {
      totalClasses += s.total;
      totalAttended += s.attended;
    });
    const attRatio = totalClasses > 0 ? (totalAttended / totalClasses) : 0.75;
    const attPoints = Math.min(Math.round(attRatio * 45), 45);

    // 2. Assignment points (up to 35)
    const totalAssignments = state.assignments.length;
    const completedAssignments = state.assignments.filter(a => a.completed).length;
    const asgRatio = totalAssignments > 0 ? (completedAssignments / totalAssignments) : 0.8;
    const asgPoints = Math.round(asgRatio * 35);

    // 3. Exam proximity points (up to 20)
    let examPoints = 15;
    const sortedExams = [...state.exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    if (sortedExams.length > 0) {
      const diffDays = Math.floor((new Date(sortedExams[0].date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (diffDays < 2) examPoints = 5;
      else if (diffDays < 7) examPoints = 12;
      else examPoints = 18;
    }

    const survivalScore = Math.min(Math.max(attPoints + asgPoints + examPoints, 12), 99);

    // Render score
    const numEl = document.getElementById('dash-survival-score-num');
    const headerScoreEl = document.getElementById('header-survival-score');
    const labelEl = document.getElementById('dash-survival-label');
    const circleEl = document.getElementById('dash-score-circle');

    if (numEl) numEl.textContent = survivalScore;
    if (headerScoreEl) headerScoreEl.textContent = `${survivalScore}/100`;

    if (labelEl) {
      if (survivalScore >= 80) labelEl.textContent = 'Academic Comeback King 🔥';
      else if (survivalScore >= 65) labelEl.textContent = 'Surviving on Caffeine ☕';
      else labelEl.textContent = 'God Help You 💀';
    }

    if (circleEl) {
      // Circumference = 2 * PI * r = 2 * 3.14159 * 40 = 251.2
      const circumference = 251.2;
      const offset = circumference - (survivalScore / 100) * circumference;
      circleEl.style.strokeDashoffset = offset;
    }
  }

  function shuffleQuote() {
    playSound('click');
    const quoteEl = document.getElementById('dash-daily-quote');
    if (!quoteEl) return;

    const randomIndex = Math.floor(Math.random() * STUDENT_QUOTES.length);
    quoteEl.style.opacity = '0';
    setTimeout(() => {
      quoteEl.textContent = STUDENT_QUOTES[randomIndex];
      quoteEl.style.opacity = '1';
    }, 150);
  }

  // ==========================================
  // 15. PROFILE & UTILITIES
  // ==========================================
  function updateHeaderUI() {
    const nameEl = document.getElementById('header-user-name');
    const initialsEl = document.getElementById('header-avatar-initials');

    if (nameEl) nameEl.textContent = state.student.name || 'Student';
    if (initialsEl && state.student.name) {
      const parts = state.student.name.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
      initialsEl.textContent = initials;
    }
  }

  function openProfileModal() {
    playSound('click');
    const nameDisp = document.getElementById('prof-display-name');
    const emailDisp = document.getElementById('prof-display-email');
    const nameInput = document.getElementById('prof-input-name');
    const emailInput = document.getElementById('prof-input-email');

    if (nameDisp) nameDisp.textContent = state.student.name;
    if (emailDisp) emailDisp.textContent = state.student.email;
    if (nameInput) nameInput.value = state.student.name;
    if (emailInput) emailInput.value = state.student.email;

    openModal('modal-profile');
  }

  function updateProfile(event) {
    if (event) event.preventDefault();
    playSound('click');

    const name = document.getElementById('prof-input-name').value.trim();
    const email = document.getElementById('prof-input-email').value.trim();

    if (!name) return;

    state.student.name = name;
    state.student.email = email;
    saveState();

    updateHeaderUI();
    renderDashboard();
    closeModal('modal-profile');
    showToast('Profile updated successfully! ✨', 'success');
  }

  function toggleSound() {
    state.student.soundEnabled = !state.student.soundEnabled;
    saveState();

    const btn = document.getElementById('sound-toggle-btn');
    if (btn) btn.textContent = state.student.soundEnabled ? '🔊' : '🔇';

    if (state.student.soundEnabled) {
      playSound('success');
      showToast('Sound Effects Enabled 🔊', 'info');
    } else {
      showToast('Sound Effects Muted 🔇', 'info');
    }
  }

  function resetToSampleData() {
    playSound('click');
    if (confirm('Reset all attendance, timetable, assignments and exams to realistic default college data? 🔄')) {
      state.subjects = [...DEFAULT_SUBJECTS];
      state.assignments = [...DEFAULT_ASSIGNMENTS];
      state.canteen = { ...DEFAULT_CANTEEN };
      state.timetable = [...DEFAULT_TIMETABLE];
      state.exams = [...DEFAULT_EXAMS];
      saveState();

      closeModal('modal-profile');
      renderAll();
      showToast('Reset to realistic college demo data! 🎉', 'success');
    }
  }

  // ==========================================
  // 15.5 🔔 PENDING WORK NOTIFICATION BAR & PERIODIC REMINDER ENGINE
  // ==========================================
  let notifProgressInterval = null;
  let periodicReminderInterval = null;
  const NOTIF_CYCLE_SECONDS = 7;

  function computePendingAlerts() {
    const alerts = [];
    const now = Date.now();

    // 1. Pending Assignments (Sorted by closest deadline)
    const pendingAsgs = state.assignments.filter(a => !a.completed);
    const sortedAsgs = [...pendingAsgs].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    sortedAsgs.forEach(asg => {
      const dueTime = new Date(asg.dueDate).getTime();
      const diffMs = dueTime - now;
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMs < 0) {
        alerts.push({
          id: `alert-asg-${asg.id}`,
          type: 'assignment',
          urgency: 'critical',
          badge: '💀 OVERDUE DEADLINE',
          icon: '💀',
          title: asg.title,
          message: `OVERDUE! "${asg.title}" (${asg.subject}) is past deadline! Submit ASAP!`,
          timeRemaining: 'Overdue!',
          actionTab: 'assignments',
          actionText: 'Submit Now 🚀',
        });
      } else if (diffHours <= 24) {
        alerts.push({
          id: `alert-asg-${asg.id}`,
          type: 'assignment',
          urgency: 'critical',
          badge: '🔥 DUE TODAY',
          icon: '🔥',
          title: asg.title,
          message: `Due today! "${asg.title}" has only ${diffHours}h left! Stop scrolling, start typing! 💀`,
          timeRemaining: `${diffHours}h remaining`,
          actionTab: 'assignments',
          actionText: 'Complete Task ✍️',
        });
      } else if (diffDays <= 2) {
        alerts.push({
          id: `alert-asg-${asg.id}`,
          type: 'assignment',
          urgency: 'urgent',
          badge: '⚠️ DUE IN 2 DAYS',
          icon: '⚠️',
          title: asg.title,
          message: `"${asg.title}" (${asg.subject}) is due in 2 days. Time to finish the work!`,
          timeRemaining: `${diffDays} days left`,
          actionTab: 'assignments',
          actionText: 'Open Assignment 📝',
        });
      } else {
        alerts.push({
          id: `alert-asg-${asg.id}`,
          type: 'assignment',
          urgency: 'normal',
          badge: '📝 PENDING TASK',
          icon: '📝',
          title: asg.title,
          message: `Pending task: "${asg.title}" due in ${diffDays} days (${asg.subject}).`,
          timeRemaining: `${diffDays} days left`,
          actionTab: 'assignments',
          actionText: 'View Task 👁️',
        });
      }
    });

    // 2. Attendance Shortage Warnings (< 75%)
    state.subjects.forEach(sub => {
      const math = calculateSubjectAttendance(sub.total, sub.attended, 75);
      if (math.status === 'Danger') {
        alerts.push({
          id: `alert-sub-${sub.id}`,
          type: 'attendance',
          urgency: 'critical',
          badge: '🚨 SHORTAGE DANGER',
          icon: '🚨',
          title: `${sub.name} Attendance Danger`,
          message: `${sub.name} is at ${math.percent}%! Must attend next ${math.classesNeeded} classes to escape detention!`,
          timeRemaining: `${math.percent}% (<75%)`,
          actionTab: 'attendance',
          actionText: 'Fix Attendance 📊',
        });
      } else if (math.status === 'Warning') {
        alerts.push({
          id: `alert-sub-${sub.id}`,
          type: 'attendance',
          urgency: 'warning',
          badge: '⚠️ ATTENDANCE WARNING',
          icon: '⚠️',
          title: `${sub.name} Warning`,
          message: `${sub.name} is at ${math.percent}%. Attend next ${math.classesNeeded} classes to reach 75%.`,
          timeRemaining: `${math.percent}%`,
          actionTab: 'attendance',
          actionText: 'Check Bunk 🧮',
        });
      }
    });

    // 3. Closest Upcoming Exams (< 14 days)
    const sortedExams = [...state.exams].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    sortedExams.forEach(exam => {
      const diffDays = Math.floor((new Date(exam.date).getTime() - now) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays <= 3) {
        alerts.push({
          id: `alert-exam-${exam.id}`,
          type: 'exam',
          urgency: 'critical',
          badge: '⏳ EXAM PANIC MODE',
          icon: '⏳',
          title: `${exam.subject} Exam`,
          message: `${exam.subject} Exam in ${diffDays === 0 ? 'LESS THAN 24 HOURS' : diffDays + ' days'}! Start revision now!`,
          timeRemaining: `${diffDays}d left`,
          actionTab: 'exams',
          actionText: 'View Syllabus 📖',
        });
      } else if (diffDays > 3 && diffDays <= 14) {
        alerts.push({
          id: `alert-exam-${exam.id}`,
          type: 'exam',
          urgency: 'warning',
          badge: '⏳ EXAM COUNTDOWN',
          icon: '⏳',
          title: `${exam.subject} Exam`,
          message: `${exam.subject} Exam in ${diffDays} days at ${exam.hall}. Don't leave it to the last night!`,
          timeRemaining: `${diffDays}d left`,
          actionTab: 'exams',
          actionText: 'Prep Exam 🎯',
        });
      }
    });

    state.activeAlerts = alerts;
    return alerts;
  }

  function renderNotificationBar() {
    const bar = document.getElementById('global-notification-bar');
    const badgeEl = document.getElementById('notif-bar-badge');
    const iconEl = document.getElementById('notif-bar-icon');
    const messageEl = document.getElementById('notif-bar-message');
    const timeEl = document.getElementById('notif-bar-time');
    const counterEl = document.getElementById('notif-bar-counter');
    const actionBtn = document.getElementById('notif-bar-action-btn');
    const cycleBtn = document.getElementById('notif-bar-cycle-btn');
    const unreadCountEl = document.getElementById('header-unread-alerts-count');

    if (!bar) return;

    if (!state.notifBarVisible) {
      bar.classList.add('hidden');
    } else {
      bar.classList.remove('hidden');
    }

    const alerts = computePendingAlerts();

    if (unreadCountEl) {
      unreadCountEl.textContent = alerts.length;
      if (alerts.length === 0) unreadCountEl.classList.add('hidden');
      else unreadCountEl.classList.remove('hidden');
    }

    if (alerts.length === 0) {
      if (iconEl) iconEl.textContent = '🎉';
      if (badgeEl) {
        badgeEl.textContent = 'ALL CAUGHT UP';
        badgeEl.className = 'hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      }
      if (messageEl) messageEl.textContent = 'Zero pending assignments or shortages! You are thriving today. 🏖️';
      if (timeEl) timeEl.textContent = 'Chill mode 😎';
      if (counterEl) counterEl.textContent = '0/0';
      if (actionBtn) actionBtn.classList.add('hidden');
      bar.className = 'notification-bar sticky top-16 sm:top-20 z-20 w-full overflow-hidden text-xs text-white';
      return;
    }

    if (actionBtn) actionBtn.classList.remove('hidden');

    if (state.currentNotifIndex >= alerts.length) {
      state.currentNotifIndex = 0;
    } else if (state.currentNotifIndex < 0) {
      state.currentNotifIndex = alerts.length - 1;
    }

    const current = alerts[state.currentNotifIndex];

    if (current.urgency === 'critical') {
      bar.className = 'notification-bar urgent-alert sticky top-16 sm:top-20 z-20 w-full overflow-hidden text-xs text-white';
    } else if (current.urgency === 'warning' || current.urgency === 'urgent') {
      bar.className = 'notification-bar warning-alert sticky top-16 sm:top-20 z-20 w-full overflow-hidden text-xs text-white';
    } else {
      bar.className = 'notification-bar sticky top-16 sm:top-20 z-20 w-full overflow-hidden text-xs text-white';
    }

    if (iconEl) iconEl.textContent = current.icon;
    if (badgeEl) {
      badgeEl.textContent = current.badge;
      badgeEl.className = `hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
        current.urgency === 'critical' ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50 animate-pulse' :
        current.urgency === 'warning' ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50' :
        'bg-indigo-500/30 text-indigo-200 border border-indigo-500/50'
      }`;
    }
    if (messageEl) messageEl.textContent = current.message;
    if (timeEl) timeEl.textContent = current.timeRemaining;
    if (counterEl) counterEl.textContent = `${state.currentNotifIndex + 1}/${alerts.length}`;
    if (actionBtn) {
      actionBtn.innerHTML = `<span>${current.actionText || 'Take Action 🚀'}</span>`;
    }
    if (cycleBtn) {
      cycleBtn.textContent = state.notifCycleActive ? '⏸️' : '▶️';
    }

    renderNotificationCenterList();
  }

  function startNotifCycle() {
    if (notifProgressInterval) clearInterval(notifProgressInterval);

    const progressLine = document.getElementById('notif-progress-line');
    let progressStep = 0;
    const totalSteps = NOTIF_CYCLE_SECONDS * 10; // every 100ms

    notifProgressInterval = setInterval(() => {
      if (!state.notifCycleActive) return;

      progressStep += 1;
      const pct = (progressStep / totalSteps) * 100;
      if (progressLine) progressLine.style.width = `${100 - pct}%`;

      if (progressStep >= totalSteps) {
        progressStep = 0;
        const alerts = state.activeAlerts;
        if (alerts.length > 1) {
          state.currentNotifIndex = (state.currentNotifIndex + 1) % alerts.length;
          renderNotificationBar();
        }
      }
    }, 100);
  }

  function resetCycleTimer() {
    const progressLine = document.getElementById('notif-progress-line');
    if (progressLine) progressLine.style.width = '100%';
  }

  function nextNotif() {
    playSound('click');
    const alerts = state.activeAlerts;
    if (alerts.length <= 1) return;
    state.currentNotifIndex = (state.currentNotifIndex + 1) % alerts.length;
    resetCycleTimer();
    renderNotificationBar();
  }

  function prevNotif() {
    playSound('click');
    const alerts = state.activeAlerts;
    if (alerts.length <= 1) return;
    state.currentNotifIndex = (state.currentNotifIndex - 1 + alerts.length) % alerts.length;
    resetCycleTimer();
    renderNotificationBar();
  }

  function handleNotifBarAction() {
    const alerts = state.activeAlerts;
    if (alerts.length === 0) return;
    const current = alerts[state.currentNotifIndex];
    if (current && current.actionTab) {
      navigate(current.actionTab);
    }
  }

  function dismissNotifBar() {
    playSound('click');
    state.notifBarVisible = false;
    saveState();
    const bar = document.getElementById('global-notification-bar');
    if (bar) bar.classList.add('hidden');
    showToast('Notification bar hidden. Tap 🔔 anytime to bring it back!', 'info');
  }

  function showNotifBarAgain() {
    playSound('click');
    state.notifBarVisible = true;
    saveState();
    const bar = document.getElementById('global-notification-bar');
    if (bar) bar.classList.remove('hidden');
    renderNotificationBar();
    closeModal('modal-notifications');
    showToast('Notification bar pinned back to top! 📌', 'success');
  }

  function toggleNotifCycle() {
    playSound('click');
    state.notifCycleActive = !state.notifCycleActive;
    const cycleBtn = document.getElementById('notif-bar-cycle-btn');
    if (cycleBtn) cycleBtn.textContent = state.notifCycleActive ? '⏸️' : '▶️';
    if (state.notifCycleActive) {
      showToast('Alert auto-cycle resumed ▶️', 'info');
    } else {
      showToast('Alert auto-cycle paused ⏸️', 'info');
    }
  }

  function toggleNotificationCenter() {
    playSound('click');
    const select = document.getElementById('notif-interval-select');
    const btnDesktop = document.getElementById('btn-desktop-notif');

    if (select) select.value = state.reminderIntervalMinutes || 3;
    if (btnDesktop && 'Notification' in window && Notification.permission === 'granted') {
      btnDesktop.textContent = 'Active ✅';
      btnDesktop.className = 'px-2.5 py-0.5 rounded-lg bg-emerald-600 border border-emerald-500 text-white font-bold transition';
    }

    renderNotificationCenterList();
    openModal('modal-notifications');
  }

  function renderNotificationCenterList() {
    const listEl = document.getElementById('notif-center-list');
    if (!listEl) return;

    const alerts = computePendingAlerts();

    listEl.innerHTML = '';
    if (alerts.length === 0) {
      listEl.innerHTML = `
        <div class="p-6 text-center text-slate-400">
          <span class="text-3xl block mb-2">🏖️</span>
          <p class="text-xs font-bold text-white">No pending tasks or deadlines!</p>
          <p class="text-[11px] text-slate-400 mt-0.5">You are completely caught up. Go rest or grab Maggi! 🍜</p>
        </div>
      `;
      return;
    }

    alerts.forEach((alert) => {
      const item = document.createElement('div');
      item.className = `p-3 rounded-2xl border transition flex items-start justify-between gap-3 ${
        alert.urgency === 'critical' ? 'bg-rose-950/40 border-rose-500/40 hover:bg-rose-950/60' :
        alert.urgency === 'warning' ? 'bg-amber-950/40 border-amber-500/40 hover:bg-amber-950/60' :
        'bg-white/5 border-white/10 hover:bg-white/10'
      }`;

      item.innerHTML = `
        <div class="flex items-start gap-2.5 flex-1 min-w-0">
          <span class="text-lg p-1.5 rounded-xl bg-white/10 flex-shrink-0">${alert.icon}</span>
          <div class="min-w-0">
            <div class="flex items-center gap-1.5 mb-1">
              <span class="px-2 py-0.2 rounded-full text-[9px] font-black uppercase ${
                alert.urgency === 'critical' ? 'bg-rose-500/30 text-rose-300' :
                alert.urgency === 'warning' ? 'bg-amber-500/30 text-amber-300' :
                'bg-indigo-500/30 text-indigo-300'
              }">${alert.badge}</span>
              <span class="text-[10px] font-mono text-slate-400 font-bold">${alert.timeRemaining}</span>
            </div>
            <p class="text-xs text-slate-200 font-medium leading-relaxed">${alert.message}</p>
          </div>
        </div>
        <button onclick="App.navigate('${alert.actionTab}'); App.closeModal('modal-notifications')" class="flex-shrink-0 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] shadow transition active:scale-95">
          ${alert.actionText || 'Go'} &rarr;
        </button>
      `;

      listEl.appendChild(item);
    });
  }

  // Periodic Reminder Engine ("Time to Time" Notifications)
  function startPeriodicReminderEngine() {
    if (periodicReminderInterval) clearInterval(periodicReminderInterval);

    const intervalMs = (state.reminderIntervalMinutes || 3) * 60 * 1000;

    periodicReminderInterval = setInterval(() => {
      triggerTimeReminder(false);
    }, intervalMs);
  }

  function updateReminderInterval(minutes) {
    playSound('click');
    state.reminderIntervalMinutes = parseInt(minutes, 10) || 3;
    saveState();
    startPeriodicReminderEngine();
    showToast(`Reminder frequency set to every ${state.reminderIntervalMinutes} min${state.reminderIntervalMinutes > 1 ? 's' : ''}! ⏰`, 'success');
  }

  function triggerTimeReminder(isManual = false) {
    const alerts = computePendingAlerts();
    if (alerts.length === 0) {
      if (isManual) {
        playSound('success');
        showToast('All caught up! Zero pending tasks or attendance shortages right now. 🏖️', 'success');
      }
      return;
    }

    const alert = alerts[state.currentNotifIndex % alerts.length];

    playSound('alert');

    const humorLead = [
      '⏰ College Survival Check-in:',
      '🚨 Academic Reality Check:',
      '☕ Procrastination Detector Fired:',
      '📢 Pending Work Reminder:',
    ];
    const randLead = humorLead[Math.floor(Math.random() * humorLead.length)];

    showToast(`${randLead} ${alert.message}`, alert.urgency === 'critical' ? 'danger' : 'warning');

    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('🎓 Student Survival App Alert!', {
          body: alert.message,
          icon: 'assets/life-of-a-student.jpg',
          badge: 'assets/life-of-a-student.jpg',
          tag: 'student-survival-alert',
        });
      } catch (err) {
        console.warn('Native notification failed:', err);
      }
    }

    state.currentNotifIndex = (state.currentNotifIndex + 1) % alerts.length;
    renderNotificationBar();
  }

  function triggerTestReminder() {
    playSound('click');
    triggerTimeReminder(true);
  }

  function requestDesktopNotifications() {
    playSound('click');
    if (!('Notification' in window)) {
      showToast('Your browser does not support desktop notifications, but in-app reminders are active! 📱', 'warning');
      return;
    }

    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        state.desktopNotifEnabled = true;
        saveState();
        playSound('success');
        showToast('Desktop push notifications enabled! You will be alerted even in other tabs 🔔', 'success');
        const btn = document.getElementById('btn-desktop-notif');
        if (btn) {
          btn.textContent = 'Active ✅';
          btn.className = 'px-2.5 py-0.5 rounded-lg bg-emerald-600 border border-emerald-500 text-white font-bold transition';
        }
        new Notification('🎓 Student Survival App', {
          body: 'Pending work notifications enabled! We will keep you updated time to time. 🔥',
          icon: 'assets/life-of-a-student.jpg',
        });
      } else {
        showToast('Desktop notifications permission denied. Using in-app alerts instead! ℹ️', 'info');
      }
    });
  }

  // ==========================================
  // 16. MODAL UTILITIES & ESCAPE HTML
  // ==========================================
  function openModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('hidden');
  }

  function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.add('hidden');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderAll() {
    renderDashboard();
    renderAttendance();
    renderAssignments();
    renderCanteen();
    renderTimetable();
    renderExams();
    renderNotificationBar();
  }

  // ==========================================
  // 17. INITIALIZATION
  // ==========================================
  function init() {
    loadState();

    // Auto-select today's day for timetable
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[new Date().getDay()];
    state.selectedTimetableDay = currentDay === 'Sunday' ? 'Monday' : currentDay;

    // Start splash screen
    initSplash();

    // Sound button icon
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) soundBtn.textContent = state.student.soundEnabled ? '🔊' : '🔇';

    // Start live notification bar auto-cycle and periodic reminder engine
    startNotifCycle();
    startPeriodicReminderEngine();
  }

  // Self-start on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Public API
  return {
    skipSplash,
    handleLogin,
    loginAsGuest,
    promptLogout,
    confirmLogout,
    navigate,
    logAttendance,
    calculateSimulator,
    openAddSubjectModal,
    openEditSubjectModal,
    saveSubject,
    deleteSubject,
    toggleAssignmentComplete,
    filterAssignments,
    openAddAssignmentModal,
    openEditAssignmentModal,
    saveAssignment,
    deleteAssignment,
    toggleCanteenStatus,
    addCanteenToOrder,
    recalculateCanteenBill,
    selectTimetableDay,
    openAddClassModal,
    openEditClassModal,
    saveClass,
    deleteClass,
    openAddExamModal,
    openEditExamModal,
    saveExam,
    deleteExam,
    askSleepOrStudyQuick,
    openSleepStudyModal,
    updateSleepHoursVal,
    updateSleepSyllabusVal,
    selectBrainStatus,
    askSurvivalAI,
    startNapTimer,
    resetNapTimer,
    shuffleQuote,
    openProfileModal,
    updateProfile,
    toggleSound,
    resetToSampleData,
    openModal,
    closeModal,
    // Authentication & Account methods
    switchAuthTab,
    handleSignUp,
    quickDemoLogin,
    openDemoCredentialsModal,
    // Notification Bar & Periodic Reminder methods
    toggleNotificationCenter,
    nextNotif,
    prevNotif,
    handleNotifBarAction,
    dismissNotifBar,
    showNotifBarAgain,
    toggleNotifCycle,
    updateReminderInterval,
    triggerTestReminder,
    requestDesktopNotifications,
  };
})();

