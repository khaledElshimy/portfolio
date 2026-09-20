// Site-wide facts. Every value here is verified from the résumé
// (assets/files/Khaled-Elshimy-CV.pdf) or the previous khaledelshimy.com.
export const site = {
  name: 'Khaled Elshimy',
  initials: 'KE',
  title: 'Senior Software Engineer',
  positioning: 'Senior Software Engineer — SDKs, Mobile & Real-Time Experiences',
  role: 'Senior Software Engineer | SDKs, Mobile Integrations & Real-Time Experiences',
  headline: ['I build experiences.', 'And what powers them.'],
  supporting: '10+ years across games, native integrations and immersive applications.',
  description:
    'Senior Software Engineer specialising in SDK and platform engineering, native Android and iOS ' +
    'integrations, and real-time Unity and Unreal experiences. 10+ years across games, XR and mobile.',
  url: 'https://www.khaledelshimy.com',
  email: 'khaled.m.elshimy@gmail.com',
  resume: '/assets/files/Khaled-Elshimy-CV.pdf',
  photo: '/assets/img/khaled.png',
  // Verified links carried over from the previous site.
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/khaledelshimy', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/khaledElshimy', icon: 'github' },
    { label: 'Telegram', href: 'https://t.me/khaled_elshimy', icon: 'telegram' },
  ],
  // Compact hero strip.
  stack: ['Unity', 'Unreal Engine', 'Native SDKs', 'Mobile', 'XR'],
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Expertise', href: '#expertise' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'sdk', label: 'SDKs & Integrations' },
  { id: 'games-xr', label: 'Games & XR' },
  { id: 'products', label: 'Products' },
];
