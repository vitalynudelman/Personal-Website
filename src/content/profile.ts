export interface ProfileLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export const profile = {
  name: 'Vitaly Nudelman',
  title: 'Software Developer / DevOps Engineer',
  greeting: 'Welcome to My Website!',
  bio: [
    "Highly motivated and passionate software developer with proven experience implementing software and DevOps solutions. My work has spanned a broad spectrum of tasks — from designing and writing software for embedded, mission-critical real-time systems to creating and optimizing CI/CD pipelines and writing Helm charts for Kubernetes applications.",
    "This website showcases my personal projects and tools—both those created to streamline my team's workflow and others developed for learning and enjoyment.",
    'Enjoy exploring my work, and feel free to contact me.',
  ],
  resumePath: '/resume/resume.pdf',
} as const;

export const profileLinks: ProfileLink[] = [
  {
    label: 'LinkedIn',
    value: 'Vitaly Nudelman',
    href: 'https://www.linkedin.com/in/vitaly-nudelman-932750264/',
    icon: '💼',
  },
  {
    label: 'GitHub',
    value: 'github.com/vitalynudelman',
    href: 'https://github.com/vitalynudelman',
    icon: '💻',
  },
];
