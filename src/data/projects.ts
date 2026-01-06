import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'advanced-citylink',
    title: 'Citylink',
    description:
      'Empowering every citizen with a direct line to local authorities. Report issues, track progress, and work together for a better community.',
    imageUrl:
      '/images/citylink.jpg',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/yogaarasu/citylink-final',
    demoUrl: 'https://citylink-yoga.vercel.app/',
    level: 'Advanced',
  },
  {
    id: 'advanced-Mid-Day Meal Auto-Calculator',
    title: 'Mid-Day Meal Auto-Calculator',
    description:
      'Simplifying the Mid-Day Meal scheme with smart automation. Just enter the student count, and the system instantly calculates daily food requirements while managing monthly stock reports accurately.',
    imageUrl:
      '/images/nmo.png',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/yogaarasu/School-Meal-Management',
    demoUrl: 'https://nmo-eta.vercel.app/#/login',
    level: 'Advanced',
  },
  {
    id: 'gac360',
    title: 'GAC360',
    description:
      'A user-friendly website for Government Arts College, Coimbatore, designed to provide easy access to department details, faculty profiles, and campus news.',
    imageUrl:
      '/images/gac.png',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/yogaarasu/college-management-system',
    demoUrl: 'https://gac360.netlify.app/',
    level: 'Intermediate',
  },
  {
    id: 'intermediate-chat-app',
    title: 'Real‑Time Chat App',
    description:
      'Real‑time chat application with rooms, typing indicators, and online presence.',
    imageUrl:
      'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=1200',
    technologies: ['React', 'Node.js', 'Socket.IO'],
    githubUrl: 'https://github.com/your-username/chat-app',
    demoUrl: 'https://your-demo-url.com/chat',
    level: 'Intermediate',
  },
  {
    id: 'basic-todo',
    title: 'Smart To‑Do List',
    description:
      'A clean to‑do list with filtering, local storage persistence, and keyboard shortcuts.',
    imageUrl:
      'https://images.pexels.com/photos/2706379/pexels-photo-2706379.jpeg?auto=compress&cs=tinysrgb&w=1200',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/your-username/todo-app',
    demoUrl: 'https://your-demo-url.com/todo',
    level: 'Basic',
  },
  {
    id: 'basic-landing',
    title: 'Marketing Landing Page',
    description:
      'High‑converting product landing page with responsive layout and animated hero section.',
    imageUrl:
      'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/your-username/landing-page',
    demoUrl: 'https://your-demo-url.com/landing',
    level: 'Basic',
  },
]


