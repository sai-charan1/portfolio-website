import {
  AcademicCapIcon,
  ArrowDownTrayIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  FlagIcon,
  MapIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

import GithubIcon from '../components/Icon/GithubIcon';
import InstagramIcon from '../components/Icon/InstagramIcon';
import LinkedInIcon from '../components/Icon/LinkedInIcon';
import StackOverflowIcon from '../components/Icon/StackOverflowIcon';
import heroImage from '../images/header-background.webp';
import porfolioImage1 from '../images/portfolio/portfolio-1.jpg';
import profilepic from '../images/profilepic.jpg';
import testimonialImage from '../images/testimonial.webp';
import {
  About,
  ContactSection,
  ContactType,
  Hero,
  HomepageMeta,
  PortfolioItem,
  SkillGroup,
  Social,
  TestimonialSection,
  TimelineItem,
} from './dataDef';

/**
 * Page meta data
 */
export const homePageMeta: HomepageMeta = {
  title: 'React Resume Template',
  description: "Example site built with Tim Baker's react resume template",
};

/**
 * Section definition
 */
export const SectionId = {
  Hero: 'hero',
  About: 'about',
  Contact: 'contact',
  Portfolio: 'portfolio',
  Resume: 'resume',
  Skills: 'skills',
  Stats: 'stats',
  Testimonials: 'testimonials',
} as const;

export type SectionId = (typeof SectionId)[keyof typeof SectionId];

/**
 * Hero section
 */
export const heroData: Hero = {
  imageSrc: heroImage,
  name: `I'm Sai Charan Sripada.`,
  description: (
    <>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        A Hyderabad based <strong className="text-stone-100">Full Stack And Machine Learning Engineer</strong>,
        currently studying at <strong className="text-stone-100">IIT BHILAI</strong> working on AI-driven risk modeling
        and computer vision projects.
      </p>
      <p className="prose-sm text-stone-200 sm:prose-base lg:prose-lg">
        In my free time time, you can catch me playing <strong className="text-stone-100">Volleyball 🏐</strong>,
        reading <strong className="text-stone-100">books</strong>, or just chilling out with{' '}
        <strong className="text-stone-100">good movies and Shark Tank</strong>.
      </p>
    </>
  ),
  actions: [
    {
      href: '/Resume_ML.pdf',
      text: 'Resume',
      primary: true,
      Icon: ArrowDownTrayIcon,
    },
    {
      href: `#${SectionId.Contact}`,
      text: 'Contact',
      primary: false,
    },
  ],
};

/**
 * About section
 */
export const aboutData: About = {
  profileImageSrc: profilepic,
  description: `My expertise lies in machine learning, deep learning, and computer vision, with a strong focus on AI applications in finance, 
  automation, and risk modeling. 

  I enjoy working with technologies like PyTorch, TensorFlow, YOLO, and XGBoost, constantly exploring innovative ways to optimize 
  decision-making systems. Beyond AI, I have experience in full-stack development, cloud deployment, and data engineering.`,
  aboutItems: [
    {label: 'Location', text: 'Hyderabad', Icon: MapIcon},
    {label: 'Age', text: '19', Icon: CalendarIcon},
    {label: 'Nationality', text: 'Indian', Icon: FlagIcon},
    {label: 'Interests', text: 'Volleyball', Icon: SparklesIcon},
    {label: 'Study', text: 'Indian Institute Of Technology Bhilai', Icon: AcademicCapIcon},
    {label: 'Interned', text: 'IBITF,Languify.', Icon: BuildingOffice2Icon},
  ],
};

/**
 * Skills section
 */
export const skills: SkillGroup[] = [
  {
    name: 'Spoken languages',
    skills: [
      {
        name: 'English',
        level: 9,
      },
      {
        name: 'Hindi',
        level: 8,
      },
      {
        name: 'Telugu',
        level: 10,
      },
    ],
  },
  {
    name: 'Frontend development',
    skills: [
      {
        name: 'React',
        level: 7,
      },
      {
        name: 'ReastApiL',
        level: 6,
      },
    ],
  },
  {
    name: 'Backend development',
    skills: [
      {
        name: 'Node.js',
        level: 7,
      },
      {
        name: 'Django',
        level: 5,
      },
      {
        name: 'Golang',
        level: 4,
      },
    ],
  },
  {
    name: 'Machine Learning & AI',
    skills: [
      {
        name: 'TensorFlow',
        level: 8,
      },
      {
        name: 'LLM',
        level: 7,
      },
      {
        name: 'Transformers',
        level: 7,
      },
    ],
  },
];

/**
 * Portfolio section
 */
export const portfolioItems: PortfolioItem[] = [
  {
    title: 'Automatic License Plate Detection',
    description:
      'Built an AI-based vehicle identification system using YOLOv8 and OCR, processing 5,000+ vehicles with high accuracy.',
    url: 'https://github.com/sai-charan1/license-plate-detection',
    image: porfolioImage1,
  },
  {
    title: 'Credit Card Risk Monitoring System',
    description:
      'Developed an ML model using XGBoost to predict credit card approval risk with 80% accuracy, deployed via Flask.',
    url: 'https://github.com/sai-charan1/credit-card-risk-monetering',
    image: porfolioImage1,
  },
  {
    title: 'Movie Recommender System',
    description:
      'Created a content-based recommendation system using Cosine Similarity, analyzing 8,500+ movies for personalized suggestions.',
    url: 'https://github.com/sai-charan1/movie-recommender',
    image: porfolioImage1,
  },
];

/**
 * Resume section -- TODO: Standardize resume contact format or offer MDX
 */
export const education: TimelineItem[] = [
  {
    date: 'April 2022',
    location: 'Impulse Junior college',
    title: 'Intermidiate',
    content: <p>I scored 98.1%.</p>,
  },
  {
    date: 'May 2026',
    location: 'IIT Bhilai',
    title: 'Bachlor Of Technology',
    content: <p>Currently pursuing a degree in Electrical Engineering..</p>,
  },
];

export const experience: TimelineItem[] = [
  {
    date: 'May 2024 - June 2024',
    location: 'IIT Bhilai',
    title: 'Research And Development Intern',
    content: (
      <p>
        Developed an advanced system using C++ and Arduino to assess the impact of wearable technology, leading to
        increased engagement with over 300 farmers in health improvement initiatives.
      </p>
    ),
  },
  {
    date: 'Aug 2024 - Sep 2024',
    location: 'Languify',
    title: 'ML Intern',
    content: (
      <p>
        Implemented and trained a Vision Transformer (ViT) model on the CIFAR-10 dataset to evaluate its performance
        against traditional Convolutional Neural Networks (CNNs). Utilized self-attention mechanisms to capture global
        and local features, achieving competitive accuracy in image classification tasks.
      </p>
    ),
  },
];

/**
 * Testimonial section
 */
export const testimonial: TestimonialSection = {
  imageSrc: testimonialImage,
  testimonials: [
    {
      name: 'Dr. Uday Raj (IIT Bhilai)',
      text: 'Sai Charan demonstrated exceptional problem-solving skills and technical expertise during his internship. His work on IoT and sensor data analysis significantly contributed to our research on wearable solutions for heat stress.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/10.jpg',
    },
    {
      name: 'Naga Sai (Wearable Heat Stress Project)',
      text: 'Working with Sai Charan was an enriching experience. His ability to analyze sensor data and implement efficient algorithms played a crucial role in achieving our project’s goals.',
      image: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/45.jpg',
    },
  ],
};

/**
 * Contact section
 */

export const contact: ContactSection = {
  headerText: 'Get in touch.',
  description: 'Here is a good spot for a message to your readers to let them know how best to reach out to you.',
  items: [
    {
      type: ContactType.Email,
      text: 'reachout@timbaker.me',
      href: 'mailto:saicharansripada5@gmail.com',
    },
    {
      type: ContactType.Location,
      text: 'Nalgonda,Telangana',
      href: 'https://maps.app.goo.gl/psYqam4zHg8Dk62g8',
    },
    {
      type: ContactType.Instagram,
      text: '@sai charan',
      href: 'https://www.instagram.com/sai._.charan_19/',
    },
    {
      type: ContactType.Github,
      text: 'sai charan',
      href: 'https://github.com/sai-charan1',
    },
  ],
};

/**
 * Social items
 */
export const socialLinks: Social[] = [
  {label: 'Github', Icon: GithubIcon, href: 'https://github.com/sai-charan1'},
  {
    label: 'Stack Overflow',
    Icon: StackOverflowIcon,
    href: 'https://stackoverflow.com/users/22011433/sripada-sai-charan',
  },
  {label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/in/sripada-sai-charan/'},
  {label: 'Instagram', Icon: InstagramIcon, href: 'https://www.instagram.com/sai._.charan_19/'},
  //{label: 'Twitter', Icon: TwitterIcon, href: ''},
];
