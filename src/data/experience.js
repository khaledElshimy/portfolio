// Titles and dates are taken verbatim from the résumé
// (assets/files/Khaled-Elshimy-CV.pdf, "PROFESSIONAL EXPERIENCE").
// Where the previous site disagreed with the résumé, the résumé wins and the
// difference is recorded in HANDOFF.md rather than silently merged.
export const experience = [
  {
    company: 'Shababeek Labs',
    role: 'Lead Game Developer',
    start: 'Feb 2024',
    end: 'Present',
    current: true,
    summary: 'VR-based enterprise training applications, delivered end to end.',
    points: [
      'Led development of VR-based enterprise training apps.',
      'Managed product cycles and team delivery from concept to deployment.',
      'Engineered SDKs for third-party tools and AI integration.',
      'Delivered training to client teams for solution ownership.',
    ],
  },
  {
    company: 'Audiomob',
    role: 'Sr. Unity SDK Engineer',
    start: 'Jul 2022',
    end: 'Dec 2023',
    summary: 'Unity SDK for in-game audio advertising, with native libraries on both platforms.',
    points: [
      'Developed Unity SDK for audio ads; created native libraries (Java, Kotlin, Swift, Obj-C).',
      'Authored API docs and managed technical support for integration teams.',
    ],
  },
  {
    company: 'Double Jump',
    role: 'Sr. Unity Game Developer',
    start: 'Mar 2022',
    end: 'Nov 2022',
    summary: 'Multiplayer systems and Web3 integration for a live platformer.',
    points: [
      'Designed multiplayer logic and real-time chat system.',
      'Deployed backend on Kubernetes (GCP) and mentored junior engineers.',
      'Integrated NFT minting with Solana and Magic Eden.',
    ],
  },
  {
    company: 'Avrioc Technologies',
    role: 'Sr. Unreal Game Developer',
    start: 'Dec 2020',
    end: 'Jul 2022',
    summary: 'Unreal gameplay, UI and BLE hardware integration for MyWhoosh.',
    points: [
      'Created Unreal plugins for BLE smart bike connectivity.',
      'Visualized trainer data and developed immersive gameplay/UI for MyWhoosh.',
      'Coordinated multi-platform deployment.',
    ],
  },
  {
    company: 'LanaGames Company',
    role: 'Lead Game Developer',
    start: 'Nov 2019',
    end: 'Dec 2020',
    summary: 'Team leadership across original titles and a console port.',
    points: [
      'Led a team of developers to build soccer simulations and user flow systems.',
      'Oversaw the port of Destroy All Humans! to Stadia, managing optimization and shader fixes.',
      'Conducted daily team standups and managed production timelines.',
    ],
  },
  {
    company: 'Zinad Company',
    role: 'Lead Game Developer',
    start: 'Jul 2017',
    end: 'Nov 2019',
    summary: 'AR/VR and WebGL training games for security awareness.',
    points: [
      'Directed a multidisciplinary team to deliver AR/VR and WebGL games for security awareness.',
      'Managed project planning, team assignments, QA, and client communication.',
      'Developed interactive video-based learning tools with quizzes and scoring logic.',
    ],
  },
  {
    company: 'El3ab.com',
    role: 'Senior Game Developer',
    start: 'Jul 2015',
    end: 'Jul 2017',
    summary: 'Multiplayer card games and live operations at scale.',
    points: [
      'Designed and developed multiplayer card games using Java and SmartFox Server.',
      'Provided mentorship to junior developers and contributed to live operations.',
    ],
  },
  {
    company: 'Bookmark-Corp',
    role: 'Game Developer',
    start: 'Jul 2012',
    end: 'Sep 2014',
    summary: 'Educational game systems — UI, physics and authoring tools.',
    points: ['Built UI, physics, character logic, and quiz tools for educational games.'],
  },
];

// "Beyond the code" — context that is real but is not a job title.
export const beyond = [
  {
    icon: 'teach',
    title: 'ITI instruction & workshops',
    body: 'Unity and Unreal teaching and technical workshops for developers entering the industry.',
  },
  {
    icon: 'founder',
    title: 'Founder, Shababeek Labs',
    body: 'Building immersive enterprise training as a studio, not just as an engineer.',
  },
  {
    icon: 'product',
    title: 'Independent product development',
    body: 'ActionNote — designing, building and shipping a voice-to-action iOS app end to end.',
  },
];

export const education = [
  { title: 'BSc in Computer Science', org: 'Minia University, Egypt' },
  { title: 'Game Development Diploma', org: 'Information Technology Institute (ITI), Egypt' },
];
