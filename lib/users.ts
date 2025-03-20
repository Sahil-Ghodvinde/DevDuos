export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  interests: string[];
  github?: string;
  linkedin?: string;
  portfolio?: string;
  experience: string;
  lookingFor: string[];
  preferredTechStack: string[];
  availability: string;
  timezone: string;
}

export const users: UserProfile[] = [
  {
    id: "1",
    name: "Alex Chen",
    avatar: "👨‍💻",
    bio: "Full-stack developer passionate about AI and web3. Looking for teammates for hackathons!",
    skills: ["React", "Node.js", "Python", "TensorFlow", "Solidity"],
    interests: ["AI/ML", "Web3", "Cloud Computing", "DevOps"],
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    portfolio: "https://alexchen.dev",
    experience: "3 years",
    lookingFor: ["Frontend Developer", "UI/UX Designer", "Backend Developer"],
    preferredTechStack: ["React", "Node.js", "Python", "AWS"],
    availability: "Full-time during hackathons",
    timezone: "UTC+8"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "👩‍💻",
    bio: "UI/UX designer with a passion for creating beautiful and accessible interfaces.",
    skills: ["Figma", "Adobe XD", "React", "CSS", "User Research"],
    interests: ["Design Systems", "Accessibility", "Mobile Design", "Animation"],
    github: "https://github.com/sarahj",
    linkedin: "https://linkedin.com/in/sarahj",
    portfolio: "https://sarahj.design",
    experience: "2 years",
    lookingFor: ["Frontend Developer", "Product Manager", "Backend Developer"],
    preferredTechStack: ["React", "Figma", "Tailwind CSS"],
    availability: "Part-time during hackathons",
    timezone: "UTC-5"
  },
  {
    id: "3",
    name: "David Kim",
    avatar: "👨‍💻",
    bio: "Backend developer specializing in scalable systems and cloud architecture.",
    skills: ["Go", "Kubernetes", "AWS", "GraphQL", "PostgreSQL"],
    interests: ["System Design", "Cloud Architecture", "DevOps", "Security"],
    github: "https://github.com/davidk",
    linkedin: "https://linkedin.com/in/davidk",
    portfolio: "https://davidk.dev",
    experience: "4 years",
    lookingFor: ["Frontend Developer", "DevOps Engineer", "UI/UX Designer"],
    preferredTechStack: ["Go", "React", "AWS", "Kubernetes"],
    availability: "Full-time during hackathons",
    timezone: "UTC+9"
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "👩‍💻",
    bio: "Mobile developer passionate about creating smooth, native experiences.",
    skills: ["React Native", "iOS", "Android", "TypeScript", "Firebase"],
    interests: ["Mobile Development", "Cross-platform", "UI/UX", "Performance"],
    github: "https://github.com/emmaw",
    linkedin: "https://linkedin.com/in/emmaw",
    portfolio: "https://emmaw.dev",
    experience: "2 years",
    lookingFor: ["Backend Developer", "UI/UX Designer", "Product Manager"],
    preferredTechStack: ["React Native", "Node.js", "Firebase"],
    availability: "Full-time during hackathons",
    timezone: "UTC-8"
  }
]; 