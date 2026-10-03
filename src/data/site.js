// Site-wide facts. Verified against Khaled_Elshimy_Resume_Engineering_Manager.pdf.
export const site = {
  name: 'Khaled Elshimy',
  initials: 'KE',
  title: 'Engineering Manager',
  positioning: 'Engineering Manager, Mobile, Web & XR',
  role: 'Engineering Manager | Mobile, Web & XR Engineering · Agile/XP Team Leadership & Product Delivery',
  // Kept for reference; deliberately not shown in the intro.
  location: 'Abu Dhabi, UAE',
  headline: 'Thirteen years building software. Seven leading the teams that ship it.',
  supporting:
    'Engineering Manager at Shababeek Labs in Abu Dhabi. Enterprise training simulations, EdTech, and a self-published VR title on Steam. Below is the work, and what I owned on each.',
  description:
    'Khaled Elshimy, Engineering Manager in Abu Dhabi. 13+ years in software and 7+ leading cross-functional teams ' +
    'across mobile, web, backend and XR. Currently leads engineering at Shababeek Labs.',
  url: 'https://www.khaledelshimy.com',
  email: 'khaled.m.elshimy@gmail.com',
  resume: '/assets/files/Khaled-Elshimy-CV.pdf',
  photo: '/assets/img/khaled.png',
  openToRoles: true,
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/khaledelshimy', icon: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/khaledElshimy', icon: 'github' },
    { label: 'Telegram', href: 'https://t.me/khaled_elshimy', icon: 'telegram' },
  ],
  stats: [
    { n: '13+', k: 'Years in software' },
    { n: '7+', k: 'Years leading teams' },
    { n: '10+', k: 'Largest team led' },
    { n: '6+', k: 'Current team' },
  ],
  nav: [
    { label: 'The work', href: '#stories' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
};

export const categories = [
  { id: 'all', label: 'All' },
  { id: 'xr', label: 'XR & Simulation' },
  { id: 'sdk', label: 'SDKs & Platform' },
  { id: 'games', label: 'Games' },
  { id: 'products', label: 'Products' },
];
