// Titles, dates and team sizes verbatim from
// Khaled_Elshimy_Resume_Engineering_Manager.pdf (PROFESSIONAL EXPERIENCE).
export const experience = [
  {
    company: 'Shababeek Labs FZ LLC',
    role: 'Engineering Manager',
    start: 'Feb 2024', end: 'Present', current: true,
    team: '6+', teamNote: 'ENGINEERS · DESIGNERS · ARTISTS',
    place: 'Abu Dhabi, UAE',
    summary: 'XR studio: enterprise training, EdTech and VR games.',
    points: [
      'Built and lead a cross-functional, self-organized team of 6+ engineers, designers and artists, owning technical direction, planning and delivery; shipped 4+ projects across enterprise training, education and games.',
      'Run continuous product discovery alongside delivery: public playtests at industry events and client feedback sessions feed a prioritized backlog.',
      'Manage engineering delivery of Good Morning, {Employee Name}, the studio’s self-published VR narrative game on Steam. Scope, milestones, multi-headset builds (PC VR, Meta Quest) and the Steam Next Fest demo ahead of a Q4 2026 launch.',
      'Led VR training simulations, including university client work, from requirements through release and handover to client teams.',
      'Introduced XP practices (TDD, pair programming, continuous refactoring), trunk-based development and CI/CD with automated tests.',
      'Hired and onboarded 3+ team members; mentor and coach through 1:1s, pairing and regular feedback; write proposals and technical narratives for enterprise and government stakeholders.',
    ],
  },
  {
    company: 'Audiomob', role: 'Senior SDK Engineer',
    start: 'Jul 2022', end: 'Dec 2023',
    summary: 'Audio advertising SDK running inside third-party apps.',
    points: [
      'Built an audio advertising SDK and its Android/iOS libraries in Java, Kotlin, Swift and Objective-C.',
      'Built automated end-to-end and integration tests into the CI/CD pipeline, and applied security and privacy standards for an SDK running inside third-party apps.',
      'Wrote API documentation and supported partner developers through integration, turning recurring issues into SDK and docs improvements.',
    ],
  },
  {
    company: 'Double Jump', role: 'Lead Software Engineer',
    start: 'Mar 2022', end: 'Nov 2022', team: '4+', teamNote: 'ENGINEERS',
    summary: 'Multiplayer title with an event-driven backend.',
    points: [
      'Led a team of 4+ engineers: planned and assigned work, reviewed code, and mentored junior developers through implementation.',
      'Designed event-driven backend microservices and RESTful APIs for multiplayer logic and real-time chat, deployed and scaled on Google Cloud with Kubernetes, with monitoring and alerting in place.',
      'Delivered wallet integration and Solana NFT minting.',
    ],
  },
  {
    company: 'Avrioc Technologies (MyWhoosh)', role: 'Lead Software Tools Engineer',
    start: 'Dec 2020', end: 'Jul 2022', team: '10+', teamNote: 'ENGINEERS',
    summary: 'The tools layer behind MyWhoosh’s smart-trainer connectivity.',
    points: [
      'Led a team of 10+ engineers on the tools behind MyWhoosh’s smart-trainer connectivity: planned and assigned tasks, reviewed code, and coordinated releases with the wider app team.',
      'Built BLE plugins connecting smart bikes and trainers to MyWhoosh and exposing their data inside the app.',
      'Worked on trainer-data displays, UI and interactive features, shipping releases across Windows, iOS and Android.',
    ],
  },
  {
    company: 'LanaGames', role: 'Lead Software Engineer',
    start: 'Nov 2019', end: 'Dec 2020', team: '4+', teamNote: 'DEVELOPERS',
    summary: 'Soccer simulations, app flows and a console port.',
    points: [
      'Managed a team of 4+ developers on soccer simulations and app flows: planned and assigned work, ran standups, and owned production timelines.',
      'Oversaw the Stadia port of Destroy All Humans!, leading performance optimization and shader fixes.',
    ],
  },
  {
    company: 'Zinad', role: 'Lead Software Engineer',
    start: 'Jul 2017', end: 'Nov 2019', team: '4+', teamNote: 'CROSS-DISCIPLINARY',
    summary: 'AR/VR and WebGL security-awareness applications.',
    points: [
      'Led a cross-disciplinary team of 4+ building AR/VR and WebGL security-awareness applications.',
      'Owned project planning, task assignment, QA and client communication; built interactive video, quiz and scoring features.',
    ],
  },
  {
    company: 'El3ab.com', role: 'Senior Software Engineer',
    start: 'Jul 2015', end: 'Jul 2017',
    summary: 'Client and server features for multiplayer card games.',
    points: [
      'Built client and server features for multiplayer card games, including Estimation Kings, with Java and SmartFox Server; supported live operations and junior developers.',
    ],
  },
  {
    company: 'Bookmark-Corp', role: 'Software Engineer',
    start: 'Jul 2012', end: 'Sep 2014',
    summary: 'Educational applications.',
    points: ['Built UI, physics, character behavior and quizzes for educational applications.'],
  },
];

// "SELECTED PRODUCT WORK" on the résumé — real work, but not a staff role.
export const productWork = [
  {
    name: 'TyrAds Rewards SDK', role: 'SDK Engineer, Consultant', period: 'Nov 2024 – Present',
    body: 'Hands-on side role building the C# rewards and offerwall SDK for Android and iOS, with native plugins, telemetry and monitoring.',
  },
  {
    name: 'ActionNote', role: 'Founder, product & engineering', period: null,
    body: 'A voice-note app that turns recordings into summaries, key points and tasks. I own product discovery, roadmap and implementation across the mobile app, web and cloud APIs.',
  },
  {
    name: 'Tamatem Connect Plus', role: 'SDK integration', period: null,
    body: 'Improved the SDK to make integration easier for game developers.',
  },
];

export const education = [
  { title: 'BSc in Computer Science', org: 'Minia University, Egypt' },
  { title: 'Game Development Diploma', org: 'Information Technology Institute (ITI), Egypt' },
];

export const strengths = [
  { k: 'Leadership & people', v: 'Building and leading empowered, multidisciplinary teams; hiring and onboarding; mentoring and coaching; 1:1s and career growth; continuous feedback.' },
  { k: 'Product & delivery', v: 'Product discovery and prioritization by customer impact, lean/agile and Scrum, roadmap and release planning, stakeholder and dependency management.' },
  { k: 'Engineering practices', v: 'XP (TDD, pair programming, simple design, refactoring), trunk-based development, CI/CD and continuous delivery, code review, automated end-to-end testing.' },
  { k: 'Architecture & cloud', v: 'Distributed systems, microservices, event-driven architecture, RESTful APIs; AWS, Google Cloud, Kubernetes; monitoring, alerting, performance and security standards.' },
  { k: 'Mobile & tech', v: 'Full mobile lifecycle from architecture to store release; native Android/iOS (Kotlin/Java, Swift/Objective-C), mobile SDKs, Unity, Unreal, C#, C++, Node.js, Next.js, React Native, BLE, real-time multiplayer (Photon, SmartFox, WebRTC).' },
];
