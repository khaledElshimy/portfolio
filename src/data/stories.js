// STORIES — the homepage.
// ---------------------------------------------------------------------------
// Each entry is work Khaled owned. `depth: 'full'` gets the four-beat narrative
// (situation / decision / cost / outcome); `depth: 'brief'` gets a compact entry
// because only a sentence of it is verified and nothing more is invented.
//
// Sources: Khaled_Elshimy_Resume_Engineering_Manager.pdf, the previous site's
// projects.json, the public ActionNote site, the public TyrAds SDK README.
//
// media.kind:  video  = real capture, poster + click-to-play
//              still  = real single frame
//              screens= real app screenshots
//              none   = no asset exists; the card stays text-only and says so
// ---------------------------------------------------------------------------

const raw = [
  /* ------------------------------------------------ Shababeek Labs, current */
  {
    slug: 'good-morning-employee-name',
    n: '01',
    title: 'Engineering delivery for a Steam VR title',
    project: 'Good Morning, {Employee Name}',
    org: 'Shababeek Labs', role: 'Engineering Manager', period: '2024 – now',
    cats: ['xr', 'games'],
    depth: 'full',
    // Khaled manages engineering delivery here; the decision to self-publish was
    // the studio's, not his. The beats are relabelled so the page does not imply
    // otherwise.
    situation:
      'The studio is self-publishing a VR narrative game on Steam while still delivering client training work. Same six-person team on both tracks.',
    decision:
      'Engineering delivery. Scope and milestones, multi-headset builds for PC VR and Meta Quest, and the Steam Next Fest demo ahead of launch.',
    cost:
      'Running a title and client work at the same time only holds together if a commit reaches a playable build quickly. I brought in TDD, pair programming, and trunk-based development with automated tests in CI/CD.',
    outcome:
      'The store page is live and the game is planned for Q4 2026. It’s a seated VR mystery across twelve in-game days, two to six hours long, with three endings. Shababeek Labs is both developer and publisher.',
    media: {
      kind: 'trailer',
      poster: '/assets/img/posters/good-morning.jpg',
      youtube: 'XbuA5T2_0HE',
      alt: 'Still from the Good Morning, {Employee Name} trailer showing the office interior.',
      note: 'Official trailer. It loads from YouTube only when you press play.',
    },
    tags: ['Meta Quest', 'Valve Index', 'HTC Vive', 'Windows MR', 'Self-published'],
    links: [
      { label: 'Steam store page', href: 'https://store.steampowered.com/app/4864390/Good_Morning_Employee_Name_VR/' },
      { label: 'Trailer', href: 'https://www.youtube.com/watch?v=XbuA5T2_0HE' },
    ],
  },
  {
    slug: 'police-assistant-ai',
    n: '03',
    title: 'AI-driven VR training for police officers',
    project: 'Police Assistant AI',
    org: 'Shababeek Labs', role: 'Engineering Manager', period: '2024 – now',
    cats: ['xr'],
    depth: 'brief',
    scale: 'quick',
    body:
      'A VR training simulation for police officers. AI-driven scenarios let an officer rehearse decision-making and procedure instead of watching a fixed script. One of the studio’s faster turnarounds.',
    media: {
      kind: 'video', poster: '/assets/img/posters/police-assistant-ai.jpg',
      video: '/assets/media/police-assistant-ai.webm',
      alt: 'Capture from the Police Assistant AI VR training simulation, seen from inside a patrol vehicle.',
    },
    tags: ['Unity', 'VR', 'AI integration'],
  },

  /* ----------------------------------------------------------- SDK & platform */
  {
    slug: 'audiomob-unity-sdk',
    n: '06',
    title: 'Audio advertising SDK for Android and iOS',
    project: 'Audiomob SDK',
    org: 'Audiomob', role: 'Senior SDK Engineer', period: '2022 – 2023',
    cats: ['sdk'],
    depth: 'full',
    situation:
      'An audio advertising SDK that had to reach a game through two very different native platforms, without the studio integrating it having to care about either.',
    decision:
      'The whole surface. A stable layer on top, real native libraries underneath in Java, Kotlin, Swift and Objective-C, and documentation precise enough that integration didn’t turn into a support conversation.',
    cost:
      'Code running inside someone else’s app carries their risk, not just ours. So automated end-to-end and integration tests went into CI/CD, and security and privacy standards became a condition of shipping.',
    outcome:
      'Shipped on Android and iOS. I supported partner developers through integration and turned recurring issues back into SDK and documentation improvements.',
    media: {
      kind: 'video', poster: '/assets/img/posters/audiomob.jpg',
      video: '/assets/media/audiomob.webm',
      alt: 'Frame from the Audiomob product video showing the Unity integration flow.',
      note: 'Audiomob product video covering the SDK integration flow.',
    },
    tags: ['Java', 'Kotlin', 'Swift', 'Objective-C', 'CI/CD'],
  },
  {
    slug: 'tyrads-unity-sdk',
    n: '07',
    title: 'Rewards and offerwall SDK, delivered as a consultant',
    project: 'TyrAds Rewards SDK',
    org: 'TyrAds', role: 'SDK Engineer, Consultant', period: 'Nov 2024 – now',
    cats: ['sdk'],
    depth: 'full',
    situation:
      'A C# rewards and offerwall SDK for Android and iOS, taken on as a hands-on side role while managing a team full time.',
    decision:
      'Keep one foot in production code. Native plugins, telemetry and monitoring, locale management, and a versioned package distributed as a compiled binary.',
    cost: 'Time. It only works because the scope is deliberately narrow and the release process is automated.',
    outcome:
      'It ships, and it’s documented publicly. Staying in production SDK code keeps my technical judgment current, which is hard to fake from a management seat.',
    media: {
      kind: 'still',
      poster: '/assets/img/posters/tyrads.png',
      alt: 'TyrAds SDK Premium Widget artwork: achievement medals, the T-Points token and a diamond on the widget background.',
      note: 'UI artwork shipped in the TyrAds Unity SDK package.',
    },
    tags: ['C#', 'Android native', 'iOS native', 'Telemetry'],
    links: [{ label: 'SDK documentation', href: 'https://sdk-doc.tyrads.com' }],
  },
  {
    slug: 'mywhoosh',
    n: '08',
    title: 'BLE smart-trainer integration, leading a team of 10+',
    project: 'MyWhoosh',
    org: 'Avrioc Technologies', role: 'Lead Software Tools Engineer', period: '2020 – 2022',
    team: '10+',
    cats: ['sdk', 'games'],
    depth: 'full',
    situation:
      'MyWhoosh needed real smart bikes and trainers driving a cycling simulation. Bluetooth hardware, several manufacturers, three target platforms, and a team of 10+.',
    decision:
      'Own the tools layer as its own product. BLE plugins connecting the hardware, trainer-data displays exposing it inside the app, and release coordination with the wider app team, so gameplay engineers never had to think about Bluetooth.',
    cost:
      'Leading ten is a different job from leading four. It turned into planning, task assignment, code review and release coordination. First role where my own commits stopped being the point.',
    outcome: 'Shipped across Windows, iOS and Android. MyWhoosh is published on the App Store.',
    media: {
      kind: 'video', poster: '/assets/img/posters/mywhoosh.jpg',
      video: '/assets/media/mywhoosh.webm',
      alt: 'Gameplay capture from MyWhoosh showing a cyclist riding through a virtual environment.',
    },
    tags: ['Unreal', 'C++', 'BLE', 'Native plugins'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/ae/app/my-whoosh/id1498889644' }],
  },
  {
    slug: 'tamatem-connect-plus',
    title: 'Connecting players to a regional payments platform',
    project: 'Tamatem Connect Plus',
    org: 'Tamatem', role: 'SDK integration', period: null,
    cats: ['sdk'],
    depth: 'full',
    situation:
      'Tamatem Plus is Tamatem\u2019s direct-to-consumer webstore and payment network for the MENA market, carrying 40+ local payment methods: e-wallets, carrier billing, cash and cards. It exists because a large share of the region is underbanked, so the usual store payment flow never reaches those players at all.',
    decision:
      'The SDK side. Connect Plus is what a game embeds to put its players in front of that platform, and my work was on making that integration easier for the game developers adopting it.',
    cost:
      'An SDK like this is judged on how little the integrating studio has to understand. Every local payment method behind it is somebody else\u2019s API, and none of that complexity should surface in the game.',
    outcome:
      'Improved the SDK so integration is easier for game developers. That is the extent of what I can verify about my own contribution, so it is all I claim.',
    media: {
      kind: 'abstract', variant: 'payments',
      alt: 'Illustration of a game reaching many local payment methods through a single integration.',
      note: 'Illustration of the integration shape. Not a screenshot.',
    },
    tags: ['SDK integration', 'Payments', 'MENA'],
    links: [{ label: 'Tamatem', href: 'https://tamatem.co' }],
  },

  /* ---------------------------------------------------------------- products */
  {
    slug: 'actionnote',
    n: '10',
    title: 'ActionNote, an independent iOS product built solo',
    project: 'ActionNote',
    org: 'Independent', role: 'Founder, product & engineering', period: null,
    cats: ['products'],
    depth: 'full',
    situation:
      'A voice note is easy to record and hard to use afterwards. I wanted one that came back as something I could act on.',
    decision:
      'The whole capture-to-action pipeline, built myself. Transcript, summary with key points, task list, plus product discovery, roadmap and implementation across the mobile app, web and cloud APIs.',
    cost:
      'Everything’s a trade-off when you’re the only engineer. I kept scope narrow on purpose. Shipping beat completeness every time.',
    outcome: 'Live on the App Store at version 1.4. Notes and meetings come back with suggested actions, open questions and a speaker-separated transcript, alongside a daily brief, an actions list and insights.',
    media: {
      kind: 'screens', card: '/assets/img/posters/actionnote.png',
      screens: [
        { src: '/assets/img/screens/an-record.png', alt: 'ActionNote recording screen, ready to capture a note or a meeting.' },
        { src: '/assets/img/screens/an-note.png', alt: 'A processed note showing suggested actions, open questions and a transcript with speakers.' },
        { src: '/assets/img/screens/an-actions.png', alt: 'The actions list, grouped by priority and due date.' },
        { src: '/assets/img/screens/an-ask.png', alt: 'Asking a question across a captured meeting.' },
        { src: '/assets/img/screens/an-brief.png', alt: 'The daily brief screen.' },
        { src: '/assets/img/screens/an-insights.png', alt: 'The insights overview screen.' },
      ],
      alt: 'ActionNote on iPhone: recording, a processed note and the actions list.',
      note: 'Screenshots from ActionNote 1.4 on the App Store.',
    },
    tags: ['iOS', 'Swift', 'Cloud APIs', 'AI summarisation'],
    links: [{ label: 'App Store', href: 'https://apps.apple.com/us/app/actionnote-voice-to-tasks/id6789915282' }],
  },

  /* ------------------------------------------------------------------- games */
  {
    slug: 'double-jump',
    n: '11',
    title: 'Multiplayer backend and Web3 integration',
    project: 'Double Jump',
    org: 'Double Jump', role: 'Lead Software Engineer', period: '2022',
    team: '4+',
    cats: ['games'],
    depth: 'full',
    situation:
      'A multiplayer title that also needed on-chain transactions. Real-time play wants low latency and stable session state. Blockchain is slow and can fail.',
    decision:
      'Keep them apart. Event-driven backend microservices and RESTful APIs for multiplayer logic and real-time chat, deployed and scaled on Google Cloud with Kubernetes, with monitoring and alerting. Wallet integration and Solana NFT minting sat behind that.',
    cost: 'More moving parts to operate. Once it was distributed, the monitoring stopped being optional.',
    outcome: 'Shipped. I led 4+ engineers on it, planning and assigning work, reviewing code, and mentoring juniors through implementation.',
    media: {
      kind: 'still',
      poster: '/assets/img/posters/double-jump.jpg',
      alt: 'Double Jump gameplay with several players in a level, the in-game chat prompt visible.',
      note: 'Gameplay capture. The chat prompt in the corner is the system described here.',
    },
    tags: ['Kubernetes', 'GCP', 'Microservices', 'Solana'],
    links: [{ label: 'doublejump.wtf', href: 'https://www.doublejump.wtf/' }],
  },
  {
    slug: 'destroy-all-humans',
    n: '12',
    title: 'Stadia port and performance optimisation',
    project: 'Destroy All Humans!',
    org: 'LanaGames', role: 'Lead Software Engineer', period: '2019 – 2020',
    team: '4+',
    cats: ['games'],
    depth: 'full',
    situation:
      'A released console title had to run on Google Stadia, a streaming runtime with its own performance envelope.',
    decision:
      'Treat it as measurement work, not feature work. Oversee the port, lead performance optimization and shader fixes, and hold the team to the platform’s budget.',
    cost: 'Little of it is visible. The win is a frame that arrives on time, which nobody notices when it works.',
    outcome: 'Ported and deployed to Stadia. The title belongs to the publisher. I led the port from the LanaGames side.',
    media: {
      kind: 'still',
      poster: '/assets/img/posters/destroy-all-humans.jpg',
      alt: 'Key art for Destroy All Humans!, showing the alien Crypto in a burning 1950s street.',
      note: 'Key art © THQ Nordic. Shown to identify the title; the port work is mine.',
    },
    tags: ['Optimization', 'Shaders', 'Stadia'],
    links: [{ label: 'StadiaSource', href: 'https://stadiasource.com/game/35/Destroy-All-Humans' }],
  },
  {
    slug: 'highstreet',
    n: '13',
    title: 'Multiplayer and virtual real estate in an MMORPG',
    project: 'Highstreet',
    org: 'Highstreet', role: 'Game Developer', period: null,
    cats: ['games'],
    depth: 'brief',
    body:
      'Multiplayer logic and virtual real estate in an open-world MMORPG, with a play-to-earn system supporting NFT crafting and trading.',
    media: {
      kind: 'video', poster: '/assets/img/posters/highstreet.jpg',
      video: '/assets/media/highstreet.webm',
      alt: 'Gameplay capture from Highstreet showing the open-world environment.',
    },
    tags: ['Unity', 'Multiplayer', 'Web3'],
    links: [{ label: 'highstreet.market', href: 'https://www.highstreet.market/' }],
  },
  {
    slug: 'estimation-kings',
    n: '14',
    title: 'Card-game AI and cross-platform delivery',
    project: 'Estimation Kings',
    org: 'El3ab.com', role: 'Senior Software Engineer', period: '2015 – 2017',
    cats: ['games'],
    depth: 'brief',
    body:
      'A trick-taking card game built on Java and SmartFox Server. I built client and server features, led the AI logic, and deployed to web and mobile.',
    media: {
      kind: 'video', poster: '/assets/img/posters/estimation-kings.jpg',
      video: '/assets/media/estimation-kings.webm',
      alt: 'Gameplay capture from Estimation Kings showing the card table.',
    },
    tags: ['Java', 'SmartFox', 'Game AI'],
  },
  {
    slug: 'sebar',
    n: '15',
    title: 'Traditional board game with AI and online multiplayer',
    project: 'Sebar',
    org: 'El3ab.com', role: 'Senior Software Engineer', period: '2015 – 2017',
    cats: ['games'],
    depth: 'brief',
    body:
      'A traditional board game brought online, with AI opponents and multiplayer logic, deployed to mobile and Facebook.',
    media: {
      kind: 'video', poster: '/assets/img/posters/sebar.jpg',
      video: '/assets/media/sebar.webm',
      alt: 'Gameplay capture from Sebar showing the board.',
    },
    tags: ['Game AI', 'Multiplayer'],
  },
  {
    slug: 'bombaboo',
    n: '16',
    title: 'Mobile arcade title, architecture to store release',
    project: 'BombaBoo',
    org: 'Bookmark-Corp', role: 'Software Engineer', period: '2012 – 2014',
    cats: ['games'],
    depth: 'brief',
    body:
      'Game architecture, characters and UI for a mobile arcade title, deployed to iOS and Android. One of the first things I took end to end.',
    media: {
      kind: 'video', poster: '/assets/img/posters/bombaboo.jpg',
      video: '/assets/media/bombaboo.webm',
      alt: 'Gameplay capture from BombaBoo.',
    },
    tags: ['Unity', 'Mobile'],
  },
  {
    slug: 'world-cup-album',
    n: '17',
    title: 'Football sticker-collection game',
    project: 'World Cup Album',
    org: 'Yallakora', role: 'Game Developer', period: null,
    cats: ['games'],
    depth: 'brief',
    body: 'A football-themed collection game, designed, developed and deployed to web and mobile.',
    media: {
      kind: 'still', poster: '/assets/img/posters/world-cup-album.jpg',
      alt: 'Promotional still from World Cup Album showing the collection game on a phone.',
    },
    tags: ['Unity', 'Web', 'Mobile'],
  },
  {
    slug: 'pimp-my-alien',
    n: '18',
    title: 'Online character-customisation title',
    project: 'PimpMyAlien',
    org: 'Bookmark-Corp', role: 'Software Engineer', period: '2012 – 2014',
    cats: ['games'],
    depth: 'brief',
    body: 'Game elements and multiplayer online experiences for a character-customisation title.',
    media: {
      kind: 'still', poster: '/assets/img/posters/pimp-my-alien.jpg',
      alt: 'Still from PimpMyAlien.',
    },
    tags: ['Unity', 'Multiplayer'],
  },
  {
    slug: 'city-guardians',
    n: '19',
    title: 'Merge-strategy base defence game',
    project: 'City Guardians',
    org: null, role: 'Game Developer', period: null,
    cats: ['games'],
    depth: 'brief',
    body: 'A car-merge strategy game. Merge vehicles into stronger ones and defend a base against waves of enemies.',
    media: {
      kind: 'still',
      poster: '/assets/img/posters/city-guardians.jpg',
      alt: 'City Guardians gameplay showing merged vehicles defending against a wave of enemies.',
      note: 'Gameplay capture.',
    },
    tags: ['Unity', 'C#'],
    sparse: true,
  },
  {
    slug: 'zinad-security-awareness',
    n: '20',
    title: 'AR/VR and WebGL security-awareness applications',
    project: 'Security-awareness AR/VR',
    org: 'Zinad', role: 'Lead Software Engineer', period: '2017 – 2019',
    team: '4+',
    cats: ['xr'],
    depth: 'brief',
    body:
      'Led a cross-disciplinary team of 4+ building AR/VR and WebGL security-awareness applications, with interactive video, quiz and scoring features. Owned planning, task assignment, QA and client communication.',
    media: {
      kind: 'abstract', variant: 'shield',
      alt: 'Illustrative graphic for security-awareness training. Not a screenshot.',
      note: 'Illustrative graphic for security-awareness training. Not a screenshot.',
    },
    tags: ['AR/VR', 'WebGL', 'Team lead'],
  },
];

// Running order for the work section. The SDK and platform work runs as a
// consecutive block in the sequence Khaled asked for:
// Audiomob -> TyrAds -> Destroy All Humans -> MyWhoosh.
const ORDER = [
  'good-morning-employee-name',
  'audiomob-unity-sdk',
  'tyrads-unity-sdk',
  'destroy-all-humans',
  'mywhoosh',
  'police-assistant-ai',
  'actionnote',
  'double-jump',
  'highstreet',
  'tamatem-connect-plus',
  'estimation-kings',
  'sebar',
  'bombaboo',
  'world-cup-album',
  'pimp-my-alien',
  'city-guardians',
  'zinad-security-awareness',
];

const ordered = ORDER.map((slug) => {
  const found = raw.find((x) => x.slug === slug);
  if (!found) throw new Error('ORDER references unknown story: ' + slug);
  return found;
});
if (ordered.length !== raw.length) {
  throw new Error('ORDER is missing ' + (raw.length - ordered.length) + ' story/stories');
}

// Numbering follows the running order rather than being hand-maintained.
export const stories = ordered.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0') }));
export const fullStories = stories.filter((s) => s.depth === 'full');
export const briefStories = stories.filter((s) => s.depth === 'brief');
