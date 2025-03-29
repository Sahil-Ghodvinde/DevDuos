export interface FAQItem {
  id: string
  question: string
  category: string
  link: string
  relatedQuestions?: string[]
}

export const faqCategories = [
  {
    title: "Getting Started with Hackathons",
    questions: [
      {
        id: '1',
        question: 'What is a Hackathon? [Complete Guide for Beginners]',
        category: 'Getting Started',
        link: '/faq/what-is-hackathon',
        relatedQuestions: ['2', '3', '4', '5']
      },
      {
        id: '2',
        question: 'How Do Hackathons Work? Rules, Process & Best Practices',
        category: 'Getting Started',
        link: '/faq/how-hackathons-work',
        relatedQuestions: ['1', '3', '6', '7']
      },
      {
        id: '3',
        question: 'Why Should You Participate in a Hackathon? Top Benefits Explained',
        category: 'Getting Started',
        link: '/faq/why-participate',
        relatedQuestions: ['1', '2', '16', '17']
      },
      {
        id: '4',
        question: 'How to Find the Best Hackathons Near You? [Online & Offline]',
        category: 'Getting Started',
        link: '/faq/find-hackathons',
        relatedQuestions: ['1', '21', '22', '23']
      },
      {
        id: '5',
        question: 'How Do Hackathon Judging Criteria Work? [With Examples]',
        category: 'Getting Started',
        link: '/faq/judging-criteria',
        relatedQuestions: ['1', '2', '18', '24']
      }
    ]
  },
  {
    title: "Hackathon Preparation & Winning Strategies",
    questions: [
      {
        id: '6',
        question: 'How to Prepare for a Hackathon in 7 Days? [Step-by-Step Guide]',
        category: 'Preparation',
        link: '/faq/prepare-hackathon',
        relatedQuestions: ['7', '8', '9', '10']
      },
      {
        id: '7',
        question: 'Top 10 Hackathon Project Ideas for 2025 [Beginner & Advanced]',
        category: 'Preparation',
        link: '/faq/project-ideas',
        relatedQuestions: ['6', '8', '11', '14']
      },
      {
        id: '8',
        question: 'How to Build a Winning Hackathon Team? [Roles & Responsibilities]',
        category: 'Preparation',
        link: '/faq/build-winning-team',
        relatedQuestions: ['6', '7', '9', '11']
      },
      {
        id: '9',
        question: 'Best Tech Stacks for Hackathons [Web, Mobile, AI & Blockchain]',
        category: 'Preparation',
        link: '/faq/tech-stacks',
        relatedQuestions: ['6', '7', '11', '12']
      },
      {
        id: '10',
        question: 'What Mistakes Should You Avoid in a Hackathon? [Expert Insights]',
        category: 'Preparation',
        link: '/faq/common-mistakes',
        relatedQuestions: ['6', '7', '8', '9']
      }
    ]
  },
  {
    title: "Hackathon-Specific Technologies & Tools",
    questions: [
      {
        id: '11',
        question: 'Best Programming Languages for Hackathons in 2025',
        category: 'Technologies',
        link: '/faq/programming-languages',
        relatedQuestions: ['9', '12', '13', '15']
      },
      {
        id: '12',
        question: 'Top 10 APIs to Use in Hackathons for AI, Fintech, and More',
        category: 'Technologies',
        link: '/faq/useful-apis',
        relatedQuestions: ['9', '11', '13', '14']
      },
      {
        id: '13',
        question: 'How to Use No-Code Tools for Hackathons & Win Without Coding?',
        category: 'Technologies',
        link: '/faq/nocode-tools',
        relatedQuestions: ['11', '12', '14', '15']
      },
      {
        id: '14',
        question: 'What Are the Best AI & ML Project Ideas for Hackathons?',
        category: 'Technologies',
        link: '/faq/ai-ml-projects',
        relatedQuestions: ['7', '11', '12', '13']
      },
      {
        id: '15',
        question: 'How to Build a Full-Stack App in 24 Hours for a Hackathon?',
        category: 'Technologies',
        link: '/faq/fullstack-app',
        relatedQuestions: ['9', '11', '12', '13']
      }
    ]
  },
  {
    title: "Networking & Career Growth Through Hackathons",
    questions: [
      {
        id: '16',
        question: 'Can Hackathons Help You Get a Job? [Success Stories & Tips]',
        category: 'Career Growth',
        link: '/faq/hackathon-jobs',
        relatedQuestions: ['3', '17', '18', '19']
      },
      {
        id: '17',
        question: 'How to Impress Recruiters at a Hackathon? [Insider Advice]',
        category: 'Career Growth',
        link: '/faq/impress-recruiters',
        relatedQuestions: ['3', '16', '18', '20']
      },
      {
        id: '18',
        question: 'How to Pitch Your Hackathon Project Like a Pro? [With Examples]',
        category: 'Career Growth',
        link: '/faq/pitch-project',
        relatedQuestions: ['5', '16', '17', '19']
      },
      {
        id: '19',
        question: 'How to Get Sponsors for Your Hackathon Project?',
        category: 'Career Growth',
        link: '/faq/get-sponsors',
        relatedQuestions: ['16', '17', '18', '20']
      },
      {
        id: '20',
        question: 'How to Turn Your Hackathon Idea into a Startup? [Fundraising Tips]',
        category: 'Career Growth',
        link: '/faq/startup-idea',
        relatedQuestions: ['16', '17', '18', '19']
      }
    ]
  },
  {
    title: "Hackathon Listings & Events",
    questions: [
      {
        id: '21',
        question: 'Top 10 Hackathons in India in 2025 [Online & Offline]',
        category: 'Events',
        link: '/faq/india-hackathons',
        relatedQuestions: ['4', '22', '23', '24']
      },
      {
        id: '22',
        question: 'Top 10 International Hackathons You Must Attend in 2025',
        category: 'Events',
        link: '/faq/international-hackathons',
        relatedQuestions: ['4', '21', '23', '24']
      },
      {
        id: '23',
        question: 'Best Hackathons for Students & Beginners in 2025',
        category: 'Events',
        link: '/faq/student-hackathons',
        relatedQuestions: ['4', '21', '22', '24']
      },
      {
        id: '24',
        question: 'What Are the Biggest Cash Prizes Won in Hackathons? [Updated List]',
        category: 'Events',
        link: '/faq/cash-prizes',
        relatedQuestions: ['4', '21', '22', '23']
      },
      {
        id: '25',
        question: 'How to Host a Successful Hackathon? [Checklist for Organizers]',
        category: 'Events',
        link: '/faq/host-hackathon',
        relatedQuestions: ['4', '21', '22', '23']
      }
    ]
  },
  {
    title: "How Our Hackathon Platform Stands Out",
    questions: [
      {
        id: '26',
        question: 'How Does DevKstra Help You Find the Right Hackathon?',
        category: 'Platform',
        link: '/faq/platform-find-hackathon',
        relatedQuestions: ['27', '28', '29']
      },
      {
        id: '27',
        question: 'How Can You Find a Hackathon Teammate or Team on Our Platform?',
        category: 'Platform',
        link: '/faq/platform-find-team',
        relatedQuestions: ['26', '28', '29']
      },
      {
        id: '28',
        question: 'How Does Our Platform List Hackathons From Multiple Sources at One Place?',
        category: 'Platform',
        link: '/faq/platform-sources',
        relatedQuestions: ['26', '27', '29']
      },
      {
        id: '29',
        question: 'Why Should You Use DevKstra Instead of Searching Manually?',
        category: 'Platform',
        link: '/faq/platform-benefits',
        relatedQuestions: ['26', '27', '28']
      }
    ]
  },
  {
    title: "For Teams & Collaboration",
    questions: [
      {
        id: '30',
        question: 'How Can You Find a Hackathon Team Even If You Don\'t Know Anyone?',
        category: 'Teams',
        link: '/faq/find-team-anyone',
        relatedQuestions: ['31', '32', '33']
      },
      {
        id: '31',
        question: 'How Does Our Team-Matching Feature Work? [Find the Best Teammates]',
        category: 'Teams',
        link: '/faq/team-matching',
        relatedQuestions: ['30', '32', '33']
      },
      {
        id: '32',
        question: 'How Can You Collaborate With Hackathon Participants Before the Event?',
        category: 'Teams',
        link: '/faq/pre-event-collaboration',
        relatedQuestions: ['30', '31', '33']
      }
    ]
  }
]

// Helper function to get all FAQ items
export function getAllFAQItems(): FAQItem[] {
  return faqCategories.flatMap(category => category.questions)
}

// Helper function to get related questions for a specific FAQ
export function getRelatedQuestions(currentId: string): FAQItem[] {
  const allItems = getAllFAQItems()
  const currentItem = allItems.find(item => item.id === currentId)
  if (!currentItem?.relatedQuestions) return []
  
  return currentItem.relatedQuestions
    .map(id => allItems.find(item => item.id === id))
    .filter((item): item is FAQItem => item !== undefined)
}

// Helper function to get FAQ items by category
export function getFAQItemsByCategory(category: string): FAQItem[] {
  return getAllFAQItems().filter(item => item.category === category)
}

// Helper function to get all categories
export function getAllCategories(): string[] {
  return Array.from(new Set(getAllFAQItems().map(item => item.category)))
} 