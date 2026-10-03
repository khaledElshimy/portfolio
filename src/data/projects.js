// PROJECT DATA
// ---------------------------------------------------------------------------
// Sources: the résumé (assets/files/Khaled-Elshimy-CV.pdf), the previous
// khaledelshimy.com (projects/projects.json + experience page), the public
// ActionNote site, and the public TyrAds Unity SDK README.
//
// Rules applied to every entry below:
//   * `contribution` describes Khaled's own work. Team work stays in `context`.
//   * No performance metrics, download counts or commercial results are stated
//     unless a source verifies them. None currently do, so `outcomes` is used
//     only for factual, checkable statements (platforms shipped, public links).
//   * `media.kind: 'abstract'` marks a generated, non-photographic visual. It is
//     never presented as a screenshot. `media.kind: 'video'` and `'screens'` are
//     real capture from the projects themselves.
// ---------------------------------------------------------------------------

export const projects = [
  {
    slug: 'audiomob-unity-sdk',
    name: 'Audiomob Unity SDK',
    tagline: 'Unity audio advertising SDK',
    categories: ['sdk'],
    featured: true,
    org: 'Audiomob',
    role: 'Senior SDK Engineer',
    period: 'Jul 2022 – Dec 2023',
    summary:
      'A Unity SDK for non-intrusive in-game audio advertising, with the native Android and iOS layers underneath it and the documentation and support that let other studios integrate it.',
    challenge:
      'Audio ads have to reach a Unity game through two very different native platforms without the integrating studio having to care about either. That means a stable C# surface on top, real native libraries underneath, and documentation precise enough that integration does not become a support conversation.',
    contribution: [
      'Developed the Unity SDK for non-intrusive audio ads.',
      'Created the native libraries behind it in Java, Kotlin, Swift and Objective-C.',
      'Authored the API documentation used by integrating teams.',
      'Managed technical support for integration teams and led developer support.',
    ],
    context: 'Audiomob is an audio advertising platform; this work covers the Unity SDK and its native layers.',
    tech: ['Unity', 'C#', 'Java', 'Kotlin', 'Swift', 'Objective-C', 'Native plugins', 'API documentation'],
    platforms: ['Android', 'iOS'],
    media: {
      kind: 'video', poster: '/assets/img/posters/audiomob.jpg',
      video: '/assets/media/audiomob.webm',
      alt: 'Frame from the Audiomob product video showing the Unity integration flow.',
      note: 'Audiomob product video covering the SDK integration flow.',
    },
    links: [{ label: 'Audiomob', href: 'https://www.audiomob.com/', external: true }],
  },

  {
    slug: 'tyrads-unity-sdk',
    name: 'TyrAds Unity SDK',
    tagline: 'Rewards & offerwall SDK for Unity',
    categories: ['sdk'],
    featured: true,
    org: 'TyrAds',
    role: 'SDK Engineer, Consultant',
    period: 'Nov 2024 – Present',
    summary:
      'A Unity SDK for gamified loyalty and rewards. An offerwall rendered in a WebView, with locale management, native Android and iOS plugins, and a versioned binary package distribution.',
    challenge:
      'A rewards offerwall is mostly integration surface: it has to authenticate a user, render remote content inside a Unity game, handle deeplink routes back into the app, resolve native dependencies on both platforms, and localise all of it, while staying simple enough to drop into someone else\'s project.',
    contribution: [
      'Created the Unity SDK for gamified loyalty programs.',
      'Built the offerwall integration flow: user login, initialisation and authentication state, and deeplinking routes.',
      'Implemented locale management so the offerwall presents in the player\'s language.',
      'Built the native Android and iOS plugin layers, including notification modules.',
      'Set up the packaging path: SemVer-versioned UPM package distributed as a compiled binary, with an SDK initialisation wizard for consumers.',
    ],
    context:
      'Publicly documented SDK capabilities include the offerwall, WebView rendering, locale management, playtime rewards, achievements and daily rewards.',
    tech: ['Unity 2021.3+', 'C#', 'Android native', 'iOS native', 'WebView', 'External Dependency Manager', 'SemVer / UPM'],
    platforms: ['Android', 'iOS'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/tyrads.png',
      alt: 'TyrAds SDK Premium Widget artwork: achievement medals, the T-Points token and a diamond.',
      note: 'UI artwork shipped in the TyrAds Unity SDK package.',
    },
    links: [{ label: 'SDK documentation', href: 'https://sdk-doc.tyrads.com', external: true }],
  },

  {
    slug: 'mywhoosh',
    name: 'MyWhoosh',
    tagline: 'Unreal gameplay & BLE smart-trainer integration',
    categories: ['sdk', 'games-xr'],
    featured: true,
    org: 'Avrioc Technologies',
    role: 'Lead Software Tools Engineer',
    period: 'Dec 2020 – Jul 2022',
    summary:
      'An indoor cycling platform built in Unreal, where real smart bikes drive the game. The connection between the hardware and the simulation is a native BLE plugin.',
    challenge:
      'A smart trainer speaks Bluetooth Low Energy, not Unreal. Getting live resistance and cadence data out of physical hardware, into a running simulation, and onto a readable UI across Windows, iOS and Android, is a native integration problem before it is a gameplay one.',
    contribution: [
      'Created Unreal plugins for BLE smart bike connectivity.',
      'Visualised trainer data coming off the hardware.',
      'Developed immersive gameplay and UI for the app.',
      'Coordinated deployment across Windows, iOS and Android.',
    ],
    context: 'MyWhoosh is a published indoor cycling product; this work covers the BLE integration, gameplay and UI.',
    tech: ['Unreal Engine', 'C++', 'BLE', 'Native plugins', 'Real-time data visualisation'],
    platforms: ['Windows', 'iOS', 'Android'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/mywhoosh.jpg',
      video: '/assets/media/mywhoosh.webm',
      alt: 'Gameplay capture from MyWhoosh showing a cyclist riding through a virtual environment.',
    },
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/ae/app/my-whoosh/id1498889644', external: true },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=_IkKhbk-hEU&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=2', external: true },
    ],
  },

  {
    slug: 'destroy-all-humans',
    name: 'Destroy All Humans!',
    tagline: 'Stadia porting & optimization',
    categories: ['games-xr'],
    featured: true,
    org: 'LanaGames',
    role: 'Lead Software Engineer',
    period: 'Nov 2019 – Dec 2020',
    summary:
      'Bringing a released console title to Google Stadia. Performance optimization, shader fixes and deployment to a streaming platform.',
    challenge:
      'Porting to Stadia means targeting a streaming runtime with its own performance envelope. Shaders that worked elsewhere break or cost too much, and the work is mostly measurement, optimization and platform compliance rather than new features.',
    contribution: [
      'Oversaw the port of Destroy All Humans! to Stadia.',
      'Managed performance optimization and shader fixes across the port.',
      'Enhanced UI and maps.',
      'Handled deployment to the Stadia platform.',
    ],
    context:
      'A team port led from the LanaGames side. Khaled led the porting effort; the title itself is the publisher\'s.',
    tech: ['Unity', 'Shaders', 'Performance optimization', 'Console deployment'],
    platforms: ['Stadia'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/destroy-all-humans.jpg',
      alt: 'Key art for Destroy All Humans!, showing the alien Crypto in a burning 1950s street.',
      note: 'Key art © THQ Nordic. Shown to identify the title; the port work is mine.',
    },
    links: [
      { label: 'StadiaSource', href: 'https://stadiasource.com/game/35/Destroy-All-Humans', external: true },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=MLmi23eYSTg&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=2', external: true },
    ],
  },

  {
    slug: 'police-assistant-ai',
    name: 'Police Assistant AI',
    tagline: 'VR training simulation with AI-driven scenarios',
    categories: ['games-xr'],
    featured: true,
    org: 'Shababeek Labs',
    role: 'Engineering Manager',
    period: 'Feb 2024 – Present',
    summary:
      'A VR training simulation for police officers, using AI-driven scenarios to rehearse decision-making and procedure in an immersive environment.',
    challenge:
      'Procedural training only transfers if the scenario reacts. A branching, AI-driven simulation has to stay responsive inside a VR headset, where dropped frames are not a cosmetic problem, and it has to be handed over to a client team who will own it afterwards.',
    contribution: [
      'Led development of the VR training simulation.',
      'Engineered SDK integration for third-party tools and AI.',
      'Managed the product cycle and team delivery from concept to deployment.',
      'Delivered training to the client team so they could own the solution.',
    ],
    context: 'Built at Shababeek Labs as enterprise VR training work.',
    tech: ['Unity', 'C#', 'VR', 'AI integration', 'Third-party SDK integration'],
    platforms: ['VR'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/police-assistant-ai.jpg',
      video: '/assets/media/police-assistant-ai.webm',
      alt: 'Capture from the Police Assistant AI VR training simulation, seen from inside a patrol vehicle.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=WcAxNnYXCiY&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=6', external: true },
    ],
  },

  {
    slug: 'actionnote',
    name: 'ActionNote',
    tagline: 'Independent voice-to-action iOS app',
    categories: ['products'],
    featured: true,
    org: 'Independent',
    role: 'Founder, product & engineering',
    period: 'Independent product',
    summary:
      'An iOS app that turns a spoken voice note into a clean transcript, a summary with key points, and a ready-to-do task list. Designed, built and shipped independently.',
    challenge:
      'A voice memo is easy to record and hard to use. Turning a rambling recording into something actionable means transcription, summarisation and task extraction have to work well enough that the result is worth opening, and it has to be a product someone can actually ship and support alone.',
    contribution: [
      'Designed, built and shipped the app end to end as an independent product.',
      'Built the capture-to-action pipeline: recording, transcript, summary with key points, and an action item list.',
      'Implemented Ask Your Notes, a query interface across everything captured.',
      'Added share-in from other apps, so WhatsApp voice notes and audio files can be sent straight into ActionNote.',
      'Shipped multi-language support and device plus iCloud storage.',
    ],
    context: 'An independent product, published on the App Store.',
    tech: ['iOS', 'Swift', 'Speech transcription', 'AI summarisation', 'iCloud'],
    platforms: ['iOS'],
    media: {
      kind: 'screens',
      icon: '/assets/img/actionnote-icon.png',
      card: '/assets/img/posters/actionnote.png',
      screens: [
        { src: '/assets/img/screens/an-record.png', alt: 'ActionNote recording screen.' },
        { src: '/assets/img/screens/an-note.png', alt: 'A processed note with suggested actions and a transcript.' },
        { src: '/assets/img/screens/an-actions.png', alt: 'The actions list.' },
        { src: '/assets/img/screens/an-ask.png', alt: 'Asking a question across a captured meeting.' },
        { src: '/assets/img/screens/an-brief.png', alt: 'The daily brief screen.' },
        { src: '/assets/img/screens/an-insights.png', alt: 'The insights overview screen.' },
      ],
      alt: 'ActionNote app screenshots, version 1.4.',
    },
    links: [
      { label: 'App Store', href: 'https://apps.apple.com/us/app/actionnote-voice-to-tasks/id6789915282', external: true },
      { label: 'Privacy', href: 'https://khaledelshimy.github.io/actionnote-legal/privacy.html', external: true },
    ],
  },

  {
    slug: 'tamatem-connect-plus',
    name: 'Tamatem Connect Plus SDK',
    tagline: 'Connecting players to Tamatem Plus',
    categories: ['sdk'],
    featured: false,
    org: 'Tamatem',
    role: 'SDK integration',
    period: null,
    summary:
      'The SDK a game embeds to connect its players to Tamatem Plus, Tamatem\u2019s direct-to-consumer webstore and payment network for the MENA market.',
    challenge:
      'Tamatem Plus carries 40+ localized payment methods, from e-wallets and carrier billing to cash and cards, because a large share of the region is underbanked and the standard store payment flow never reaches those players. Behind one integration sits a lot of other people\u2019s APIs, and none of it should surface in the game.',
    contribution: ['Improved the SDK to make integration easier for game developers.'],
    context:
      'The r\u00e9sum\u00e9 records this as SDK integration work. That single line is the extent of what is verified about the contribution, so nothing further is claimed. Tamatem is a MENA mobile games publisher; Tamatem Plus is its payments and distribution platform.',
    tech: ['SDK integration', 'Payments'],
    platforms: ['Mobile'],
    media: {
      kind: 'abstract',
      variant: 'payments',
      alt: 'Illustration of a game reaching many local payment methods through a single integration.',
    },
    links: [{ label: 'Tamatem', href: 'https://tamatem.co', external: true }],
    sparse: true,
  },

  {
    slug: 'double-jump',
    name: 'Double Jump',
    tagline: 'Multiplayer, chat & Web3 platformer',
    categories: ['games-xr'],
    featured: false,
    org: 'Double Jump',
    role: 'Lead Software Engineer',
    period: 'Mar 2022 – Nov 2022',
    summary:
      'A Web3 platformer with real-time multiplayer, in-game chat, wallet integration and a Kubernetes-backed service layer.',
    challenge:
      'Real-time multiplayer and blockchain integration pull in opposite directions: one needs low latency and stable session state, the other needs on-chain transactions that are slow and can fail. Both had to sit behind normal gameplay.',
    contribution: [
      'Designed multiplayer logic and the real-time chat system.',
      'Deployed the backend on Kubernetes (GCP).',
      'Integrated NFT minting with Solana and Magic Eden cross-chain.',
      'Mentored junior engineers on the team.',
    ],
    tech: ['Unity', 'C#', 'Multiplayer', 'Kubernetes', 'GCP', 'Solana', 'Web3'],
    platforms: ['Web'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/double-jump.jpg',
      alt: 'Double Jump gameplay with several players in a level, the in-game chat prompt visible.',
      note: 'Gameplay capture.',
    },
    links: [
      { label: 'doublejump.wtf', href: 'https://www.doublejump.wtf/', external: true },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=PtqOwyQtQZA&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=6', external: true },
    ],
  },

  {
    slug: 'highstreet',
    name: 'Highstreet',
    tagline: 'MMORPG multiplayer & virtual real estate',
    categories: ['games-xr'],
    featured: false,
    org: 'Highstreet',
    role: 'Game Developer',
    period: null,
    summary:
      'An open-world MMORPG with virtual real estate and a play-to-earn system supporting NFT crafting and trading.',
    challenge: null,
    contribution: [
      'Developed multiplayer logic and virtual real estate within the metaverse world.',
      'Built a play-to-earn system enabling NFT crafting and trading in an open-world MMORPG.',
    ],
    tech: ['Unity', 'C#', 'Multiplayer', 'Web3'],
    platforms: ['Web'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/highstreet.jpg',
      video: '/assets/media/highstreet.webm',
      alt: 'Gameplay capture from Highstreet showing the open-world environment.',
    },
    links: [
      { label: 'highstreet.market', href: 'https://www.highstreet.market/', external: true },
      { label: 'Video', href: 'https://www.youtube.com/watch?v=aAG8m3u34BU&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=4', external: true },
    ],
  },

  {
    slug: 'estimation-kings',
    name: 'Estimation Kings',
    tagline: 'Card game AI & cross-platform delivery',
    categories: ['games-xr'],
    featured: false,
    org: 'El3ab.com',
    role: 'Senior Software Engineer',
    period: 'Jul 2015 – Jul 2017',
    summary: 'A trick-taking card game with computer opponents, shipped to web and mobile.',
    challenge: null,
    contribution: [
      'Led design, AI logic and deployment for web and mobile.',
      'Managed the project workflow.',
      'Developed the game AI and wrote unit tests.',
    ],
    tech: ['Unity', 'C#', 'Game AI', 'Unit testing'],
    platforms: ['Web', 'Android', 'iOS'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/estimation-kings.jpg',
      video: '/assets/media/estimation-kings.webm',
      alt: 'Gameplay capture from Estimation Kings showing the card table.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=L6QT_mJcLpc&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=4', external: true },
    ],
  },

  {
    slug: 'car-show-vr',
    name: 'Car Show VR',
    tagline: 'Interactive VR vehicle showcase',
    categories: ['games-xr'],
    featured: false,
    org: 'Shababeek Labs',
    role: 'Engineering Manager',
    period: 'Feb 2024 – Present',
    summary: 'A VR car show experience presenting vehicle models in an interactive environment.',
    challenge: null,
    contribution: ['Designed and developed the VR car show experience and its interactions.'],
    tech: ['Unity', 'C#', 'VR'],
    platforms: ['VR'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/car-show-vr.jpg',
      video: '/assets/media/car-show-vr.webm',
      alt: 'Capture from the Car Show VR experience showing a vehicle in a showroom environment.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=pSfFOlYSohQ&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=10', external: true },
    ],
  },

  {
    slug: 'the-office-vr',
    name: 'The Office VR',
    tagline: 'Onboarding & workplace training simulation',
    categories: ['games-xr'],
    featured: false,
    org: 'Shababeek Labs',
    role: 'Engineering Manager',
    period: 'Feb 2024 – Present',
    summary:
      'A VR simulation of an office environment, built for training and onboarding with interactive, realistic scenarios.',
    challenge: null,
    contribution: [
      'Created the VR office simulation for training and onboarding.',
      'Focused on interactive elements and realistic scenarios.',
    ],
    tech: ['Unity', 'C#', 'VR'],
    platforms: ['VR'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/the-office-vr.jpg',
      video: '/assets/media/the-office-vr.webm',
      alt: 'Capture from The Office VR training simulation showing an office interior.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=wJYioECQ-Z0&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=11', external: true },
    ],
  },

  {
    slug: 'bombaboo',
    name: 'BombaBoo',
    tagline: 'Mobile game architecture, characters & UI',
    categories: ['games-xr'],
    featured: false,
    org: 'Bookmark-Corp',
    role: 'Software Engineer',
    period: 'Jul 2012 – Sep 2014',
    summary: 'A mobile arcade game, built from architecture through characters and UI, shipped to iOS and Android.',
    challenge: null,
    contribution: ['Designed and developed the game architecture, characters and UI.', 'Deployed to iOS and Android.'],
    tech: ['Unity', 'C#', 'Mobile'],
    platforms: ['iOS', 'Android'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/bombaboo.jpg',
      video: '/assets/media/bombaboo.webm',
      alt: 'Gameplay capture from BombaBoo.',
    },
  },

  {
    slug: 'sebar',
    name: 'Sebar',
    tagline: 'Legacy board game with AI and multiplayer',
    categories: ['games-xr'],
    featured: false,
    org: 'El3ab.com',
    role: 'Senior Software Engineer',
    period: 'Jul 2015 – Jul 2017',
    summary: 'A digital version of a traditional board game with computer opponents and online multiplayer.',
    challenge: null,
    contribution: ['Developed the AI and multiplayer logic.', 'Deployed to mobile platforms and Facebook.'],
    tech: ['Unity', 'C#', 'Game AI', 'Multiplayer'],
    platforms: ['Android', 'iOS', 'Facebook'],
    media: {
      kind: 'video',
      poster: '/assets/img/posters/sebar.jpg',
      video: '/assets/media/sebar.webm',
      alt: 'Gameplay capture from Sebar showing the board.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=k6e9FNxo6A0&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=15', external: true },
    ],
  },

  {
    slug: 'world-cup-album',
    name: 'World Cup Album',
    tagline: 'Football sticker-collection game',
    categories: ['games-xr'],
    featured: false,
    org: 'Yallakora',
    role: 'Game Developer',
    period: null,
    summary: 'A football-themed collection game, designed, developed and deployed to web and mobile.',
    challenge: null,
    contribution: ['Designed, developed and deployed the collection game on web and mobile.'],
    tech: ['Unity', 'C#', 'Mobile', 'Web'],
    platforms: ['Web', 'Android'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/world-cup-album.jpg',
      alt: 'Promotional still from World Cup Album showing the collection game on a phone.',
    },
    links: [],
  },

  {
    slug: 'pimp-my-alien',
    name: 'PimpMyAlien',
    tagline: 'Online multiplayer game elements',
    categories: ['games-xr'],
    featured: false,
    org: 'Bookmark-Corp',
    role: 'Software Engineer',
    period: 'Jul 2012 – Sep 2014',
    summary: 'Game elements and multiplayer online experiences for a character-customisation title.',
    challenge: null,
    contribution: ['Created game elements and designed multiplayer online experiences.'],
    tech: ['Unity', 'Multiplayer'],
    platforms: ['Mobile'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/pimp-my-alien.jpg',
      alt: 'Still from PimpMyAlien.',
    },
    links: [],
  },

  {
    slug: 'city-guardians',
    name: 'City Guardians',
    tagline: 'Car-merge strategy defence game',
    categories: ['games-xr'],
    featured: false,
    org: null,
    role: 'Game Developer',
    period: null,
    summary:
      'A car-merge strategy game where players merge vehicles into stronger ones and defend a base against waves of enemies.',
    challenge: null,
    contribution: ['Developed the merge strategy and wave defence systems.'],
    tech: ['Unity', 'C#'],
    platforms: ['Mobile'],
    media: {
      kind: 'still',
      poster: '/assets/img/posters/city-guardians.jpg',
      alt: 'City Guardians gameplay showing merged vehicles defending against a wave of enemies.',
      note: 'Gameplay capture.',
    },
    links: [
      { label: 'Video', href: 'https://www.youtube.com/watch?v=HkxVSb9V02Q&list=PLhL1kfc3B9HxIYEsL6sOfxnPnIO8sMQVj&index=16', external: true },
    ],
    sparse: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const bySlug = (slug) => projects.find((p) => p.slug === slug);
