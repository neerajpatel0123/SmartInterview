// Simulated AI data - in production these would call real AI APIs (OpenAI, Gemini, etc.)

export const JOB_ROLES = [
  { id: 'frontend', label: 'Frontend Developer', icon: '🖥️', category: 'Engineering' },
  { id: 'backend', label: 'Backend Developer', icon: '⚙️', category: 'Engineering' },
  { id: 'fullstack', label: 'Full Stack Developer', icon: '🔧', category: 'Engineering' },
  { id: 'data-scientist', label: 'Data Scientist', icon: '📊', category: 'Data & AI' },
  { id: 'ml-engineer', label: 'ML Engineer', icon: '🤖', category: 'Data & AI' },
  { id: 'devops', label: 'DevOps Engineer', icon: '🔄', category: 'Operations' },
  { id: 'product-manager', label: 'Product Manager', icon: '📋', category: 'Management' },
  { id: 'ui-ux', label: 'UI/UX Designer', icon: '🎨', category: 'Design' },
  { id: 'cloud', label: 'Cloud Architect', icon: '☁️', category: 'Operations' },
  { id: 'cybersecurity', label: 'Cybersecurity Analyst', icon: '🔒', category: 'Security' },
  { id: 'business-analyst', label: 'Business Analyst', icon: '📈', category: 'Management' },
  { id: 'android', label: 'Android Developer', icon: '📱', category: 'Mobile' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'fresher', label: 'Fresher (0-1 years)', icon: '🌱' },
  { id: 'junior', label: 'Junior (1-3 years)', icon: '📗' },
  { id: 'mid', label: 'Mid-Level (3-5 years)', icon: '📘' },
  { id: 'senior', label: 'Senior (5-8 years)', icon: '📙' },
  { id: 'lead', label: 'Lead/Principal (8+ years)', icon: '🏆' },
];

const QUESTION_BANK = {
  'frontend': {
    technical: [
      { id: 1, question: 'Explain the difference between `var`, `let`, and `const` in JavaScript. When would you use each?', difficulty: 'Easy', topic: 'JavaScript', hint: 'Think about scope, hoisting, and mutability.' },
      { id: 2, question: 'What is the Virtual DOM in React and how does it improve performance?', difficulty: 'Medium', topic: 'React', hint: 'Consider reconciliation and diffing algorithms.' },
      { id: 3, question: 'Explain CSS Flexbox vs Grid. When would you choose one over the other?', difficulty: 'Easy', topic: 'CSS', hint: 'Think about 1D vs 2D layouts.' },
      { id: 4, question: 'What are React Hooks? Explain `useState` and `useEffect` with examples.', difficulty: 'Medium', topic: 'React', hint: 'Discuss lifecycle equivalents and dependency arrays.' },
      { id: 5, question: 'Describe your approach to making a web application responsive and accessible.', difficulty: 'Medium', topic: 'Web Design', hint: 'Cover media queries, ARIA roles, semantic HTML.' },
      { id: 6, question: 'What is memoization in React? When would you use `useMemo` and `useCallback`?', difficulty: 'Hard', topic: 'React', hint: 'Think about referential equality and expensive computations.' },
      { id: 7, question: 'Explain the event loop in JavaScript. What is the difference between microtasks and macrotasks?', difficulty: 'Hard', topic: 'JavaScript', hint: 'Consider the call stack, task queue, and microtask queue.' },
      { id: 8, question: 'How do you optimize the performance of a React application?', difficulty: 'Medium', topic: 'Performance', hint: 'Code splitting, lazy loading, memoization, virtualization.' },
    ],
    behavioral: [
      { id: 9, question: 'Tell me about a challenging frontend project you worked on. What was the biggest technical challenge?', difficulty: 'Medium', topic: 'Behavioral', hint: 'Use the STAR method: Situation, Task, Action, Result.' },
      { id: 10, question: 'How do you stay updated with the rapidly evolving frontend ecosystem?', difficulty: 'Easy', topic: 'Behavioral', hint: 'Mention blogs, communities, experimentation.' },
    ],
    system_design: [
      { id: 11, question: 'Design the frontend architecture for a real-time collaborative document editor like Google Docs.', difficulty: 'Hard', topic: 'System Design', hint: 'Consider WebSockets, conflict resolution, and state management.' },
    ],
  },
  'backend': {
    technical: [
      { id: 1, question: 'Explain RESTful API design principles. What makes an API truly RESTful?', difficulty: 'Easy', topic: 'API Design', hint: 'Cover statelessness, uniform interface, resource-based URLs.' },
      { id: 2, question: 'What is the difference between SQL and NoSQL databases? When would you choose each?', difficulty: 'Medium', topic: 'Databases', hint: 'Compare structure, scalability, and use cases.' },
      { id: 3, question: 'Explain database indexing. What are the trade-offs of adding indexes?', difficulty: 'Medium', topic: 'Databases', hint: 'Read performance vs write overhead and storage.' },
      { id: 4, question: 'What is N+1 query problem and how do you solve it?', difficulty: 'Medium', topic: 'Databases', hint: 'Think about eager loading, batch fetching, JOINs.' },
      { id: 5, question: 'Describe different caching strategies. When would you use Redis?', difficulty: 'Medium', topic: 'Caching', hint: 'Cache-aside, write-through, cache invalidation strategies.' },
      { id: 6, question: 'Explain the difference between authentication and authorization. How do JWTs work?', difficulty: 'Medium', topic: 'Security', hint: 'Consider token structure, signing, and statelessness.' },
      { id: 7, question: 'How do you handle database migrations in production safely?', difficulty: 'Hard', topic: 'Operations', hint: 'Zero-downtime migrations, rollback strategies, blue-green.' },
      { id: 8, question: 'Explain message queues. When would you use RabbitMQ or Kafka?', difficulty: 'Hard', topic: 'Architecture', hint: 'Async processing, decoupling, backpressure handling.' },
    ],
    behavioral: [
      { id: 9, question: 'Tell me about a time you had to scale a backend service under unexpected load. What did you do?', difficulty: 'Medium', topic: 'Behavioral', hint: 'STAR method focusing on technical decisions made.' },
      { id: 10, question: 'How do you approach debugging a production issue in a system you are not familiar with?', difficulty: 'Medium', topic: 'Behavioral', hint: 'Systematic approach: logs, metrics, isolation.' },
    ],
    system_design: [
      { id: 11, question: 'Design a URL shortener service like bit.ly. Discuss storage, scalability, and analytics.', difficulty: 'Hard', topic: 'System Design', hint: 'Hashing strategies, database sharding, CDN, caching.' },
    ],
  },
  'data-scientist': {
    technical: [
      { id: 1, question: 'Explain the bias-variance tradeoff. How does it affect model selection?', difficulty: 'Medium', topic: 'ML Theory', hint: 'Think about underfitting, overfitting, regularization.' },
      { id: 2, question: 'What is the difference between L1 (Lasso) and L2 (Ridge) regularization?', difficulty: 'Medium', topic: 'ML Theory', hint: 'Sparsity, feature selection, weight penalties.' },
      { id: 3, question: 'How do you handle class imbalance in a dataset?', difficulty: 'Medium', topic: 'Data Preprocessing', hint: 'SMOTE, undersampling, class weights, evaluation metrics.' },
      { id: 4, question: 'Explain the concept of cross-validation. Why is it important?', difficulty: 'Easy', topic: 'Model Evaluation', hint: 'K-fold, stratified K-fold, preventing data leakage.' },
      { id: 5, question: 'What is gradient descent? Explain its variants (SGD, Mini-batch, Adam).', difficulty: 'Hard', topic: 'Optimization', hint: 'Learning rates, momentum, adaptive methods.' },
      { id: 6, question: 'How would you explain a complex ML model to a non-technical stakeholder?', difficulty: 'Easy', topic: 'Communication', hint: 'Analogies, visualizations, focus on business impact.' },
      { id: 7, question: 'What is feature engineering and why is it important? Give examples.', difficulty: 'Medium', topic: 'Feature Engineering', hint: 'Encoding, scaling, interaction features, dimensionality.' },
      { id: 8, question: 'Explain precision, recall, F1-score. When would you prioritize each?', difficulty: 'Medium', topic: 'Metrics', hint: 'Consider cost of false positives vs false negatives.' },
    ],
    behavioral: [
      { id: 9, question: 'Describe an end-to-end ML project you built from problem definition to deployment.', difficulty: 'Medium', topic: 'Behavioral', hint: 'Cover data collection, modeling, evaluation, and impact.' },
    ],
    system_design: [
      { id: 10, question: 'Design a real-time recommendation system for an e-commerce platform.', difficulty: 'Hard', topic: 'System Design', hint: 'Collaborative filtering, feature store, serving infrastructure.' },
    ],
  },
  'fullstack': {
    technical: [
      { id: 1, question: 'Explain the client-server architecture. How does HTTP/HTTPS work?', difficulty: 'Easy', topic: 'Web Fundamentals', hint: 'Request-response cycle, headers, status codes, TLS.' },
      { id: 2, question: 'What is CORS? How do you handle it in a Node.js/Express API?', difficulty: 'Medium', topic: 'Security', hint: 'Same-origin policy, preflight requests, headers.' },
      { id: 3, question: 'Explain the difference between SSR, CSR, and SSG. When would you use each?', difficulty: 'Medium', topic: 'Architecture', hint: 'Performance, SEO, user experience tradeoffs.' },
      { id: 4, question: 'How do you manage state in a large React application?', difficulty: 'Medium', topic: 'React', hint: 'Context, Redux, Zustand, React Query, server state vs client state.' },
      { id: 5, question: 'What is WebSockets? When would you use them over REST APIs?', difficulty: 'Medium', topic: 'Networking', hint: 'Bidirectional, persistent connections, real-time use cases.' },
      { id: 6, question: 'Describe your approach to API security (authentication, rate limiting, input validation).', difficulty: 'Hard', topic: 'Security', hint: 'JWT, OAuth, rate limiting, validation libraries, OWASP.' },
      { id: 7, question: 'How do you approach testing in a full-stack application?', difficulty: 'Medium', topic: 'Testing', hint: 'Unit, integration, E2E. React Testing Library, Jest, Cypress.' },
      { id: 8, question: 'What is CI/CD? Describe a pipeline you have set up or worked with.', difficulty: 'Medium', topic: 'DevOps', hint: 'GitHub Actions, stages, automated testing, deployment.' },
    ],
    behavioral: [
      { id: 9, question: 'Describe a time you had to make a significant architectural decision. What was your process?', difficulty: 'Hard', topic: 'Behavioral', hint: 'Consider tradeoffs, stakeholders, long-term impact.' },
      { id: 10, question: 'How do you handle technical debt in an evolving codebase?', difficulty: 'Medium', topic: 'Behavioral', hint: 'Prioritization, refactoring strategies, communication.' },
    ],
    system_design: [
      { id: 11, question: 'Design a social media platform like Twitter. Focus on feed generation and storage.', difficulty: 'Hard', topic: 'System Design', hint: 'Fan-out, timeline generation, media storage, CDN.' },
    ],
  },
};

// Fallback questions for roles not in the bank
const DEFAULT_QUESTIONS = {
  technical: [
    { id: 1, question: 'Walk me through your technical background and most significant project.', difficulty: 'Easy', topic: 'General', hint: 'Focus on impact, technologies, and your specific role.' },
    { id: 2, question: 'How do you approach learning a new technology or framework?', difficulty: 'Easy', topic: 'General', hint: 'Learning resources, hands-on practice, mentorship.' },
    { id: 3, question: 'Describe a technically challenging problem you solved. What was your approach?', difficulty: 'Medium', topic: 'Problem Solving', hint: 'STAR method with emphasis on technical decision-making.' },
    { id: 4, question: 'What is your experience with version control and collaborative development?', difficulty: 'Easy', topic: 'Tooling', hint: 'Git workflows, code review, branching strategies.' },
    { id: 5, question: 'How do you ensure the quality and reliability of your work?', difficulty: 'Medium', topic: 'Quality', hint: 'Testing, code review, documentation, monitoring.' },
  ],
  behavioral: [
    { id: 6, question: 'Tell me about a time you disagreed with a team decision. How did you handle it?', difficulty: 'Medium', topic: 'Behavioral', hint: 'Communication, compromise, following through.' },
    { id: 7, question: 'Describe a time when you had to work under a tight deadline. What was the outcome?', difficulty: 'Medium', topic: 'Behavioral', hint: 'Prioritization, communication, results.' },
  ],
  system_design: [
    { id: 8, question: 'Design a system relevant to your target role. Discuss scalability and reliability.', difficulty: 'Hard', topic: 'System Design', hint: 'Consider requirements gathering, high-level design, and tradeoffs.' },
  ],
};

export function getQuestionsForRole(roleId, count = 8) {
  const bank = QUESTION_BANK[roleId];
  let allQuestions = [];

  if (bank) {
    allQuestions = [
      ...bank.technical,
      ...bank.behavioral,
      ...bank.system_design,
    ];
  } else {
    allQuestions = [
      ...DEFAULT_QUESTIONS.technical,
      ...DEFAULT_QUESTIONS.behavioral,
      ...DEFAULT_QUESTIONS.system_design,
    ];
  }

  // Shuffle and return requested count
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function generateResumeQuestions(resumeText, roleId) {
  const baseQuestions = getQuestionsForRole(roleId, 5);

  // Simulate resume-based question generation
  const resumeKeywords = extractKeywords(resumeText);
  const resumeQuestions = resumeKeywords.slice(0, 3).map((keyword, i) => ({
    id: 100 + i,
    question: `I see you have experience with ${keyword}. Can you walk me through a specific project where you used it and the impact it had?`,
    difficulty: 'Medium',
    topic: 'Resume-Based',
    hint: `Be specific about your role, the challenges faced, and measurable outcomes.`,
    isResumeBased: true,
  }));

  return [...resumeQuestions, ...baseQuestions];
}

function extractKeywords(text) {
  if (!text || text.trim().length < 10) {
    return ['React', 'Node.js', 'Python', 'databases', 'REST APIs'];
  }

  const techKeywords = [
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask',
    'Python', 'JavaScript', 'TypeScript', 'Java', 'Go', 'Rust', 'C++',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Kafka',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure',
    'GraphQL', 'REST', 'gRPC', 'microservices',
    'machine learning', 'deep learning', 'TensorFlow', 'PyTorch',
    'Agile', 'Scrum', 'CI/CD', 'Git',
  ];

  const found = techKeywords.filter(kw =>
    text.toLowerCase().includes(kw.toLowerCase())
  );

  return found.length > 0 ? found : ['software development', 'problem solving', 'teamwork'];
}

export function evaluateAnswer(question, answer) {
  if (!answer || answer.trim().length < 20) {
    return {
      score: 10,
      feedback: 'Your answer was too brief. Please provide more detail.',
      strengths: [],
      improvements: ['Provide a complete, detailed answer', 'Use specific examples', 'Explain your thought process'],
      keywords_used: [],
      keywords_missing: ['specific examples', 'technical depth', 'clear structure'],
    };
  }

  const wordCount = answer.trim().split(/\s+/).length;
  const hasExamples = /for example|for instance|such as|specifically|in my project|i worked on|i built/i.test(answer);
  const hasStructure = /first|second|third|additionally|furthermore|however|because|therefore/i.test(answer);
  const hasTechnicalTerms = /[A-Z][a-z]+(?:JS|API|HTTP|SQL|DOM|CSS|AWS|GCP)/i.test(answer) || wordCount > 50;

  let score = 40; // Base score
  const strengths = [];
  const improvements = [];

  if (wordCount >= 50) { score += 15; strengths.push('Detailed response'); }
  else { improvements.push('Provide more detail (aim for 80+ words)'); }

  if (wordCount >= 100) { score += 10; }

  if (hasExamples) { score += 20; strengths.push('Used concrete examples'); }
  else { improvements.push('Add specific real-world examples from your experience'); }

  if (hasStructure) { score += 10; strengths.push('Well-structured answer'); }
  else { improvements.push('Structure your answer clearly (e.g., using the STAR method)'); }

  if (hasTechnicalTerms) { score += 5; strengths.push('Good use of technical terminology'); }

  // Assess difficulty bonus
  if (question.difficulty === 'Hard') score = Math.min(score + 5, 100);

  score = Math.min(Math.max(score, 15), 100);

  // Add generic improvements if few found
  if (improvements.length === 0) {
    if (score < 90) improvements.push('Consider discussing alternative approaches or tradeoffs');
    if (score < 95) improvements.push('You could strengthen your answer by mentioning business impact');
  }

  const keywords_used = strengths.length > 0 ? ['structured response', 'relevant content'] : [];
  const keywords_missing = improvements.slice(0, 2);

  return {
    score: Math.round(score),
    feedback: generateFeedback(score, question.difficulty),
    strengths: strengths.length > 0 ? strengths : ['Shows basic understanding'],
    improvements,
    keywords_used,
    keywords_missing,
  };
}

function generateFeedback(score, difficulty) {
  if (score >= 85) {
    return `Excellent answer! You demonstrated strong understanding${difficulty === 'Hard' ? ' of this challenging topic' : ''}. Your response was clear, detailed, and well-structured.`;
  } else if (score >= 70) {
    return `Good answer with solid fundamentals. You covered the main points, but there is room to deepen your explanation with more specific examples and technical detail.`;
  } else if (score >= 50) {
    return `Fair attempt. You touched on some relevant concepts, but your answer needs more depth, structure, and concrete examples to fully address the question.`;
  } else {
    return `Your answer needs significant improvement. Focus on providing a complete, structured response that directly addresses the question with specific examples from your experience.`;
  }
}

export function generateOverallFeedback(answers, questions, role) {
  const scores = answers.map(a => a.evaluation?.score || 0).filter(s => s > 0);
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  const topicScores = {};
  questions.forEach((q, i) => {
    if (answers[i]?.evaluation) {
      if (!topicScores[q.topic]) topicScores[q.topic] = [];
      topicScores[q.topic].push(answers[i].evaluation.score || 0);
    }
  });

  const weakAreas = Object.entries(topicScores)
    .filter(([, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avg < 60;
    })
    .map(([topic]) => topic);

  const strongAreas = Object.entries(topicScores)
    .filter(([, scores]) => {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      return avg >= 75;
    })
    .map(([topic]) => topic);

  return {
    averageScore: Math.round(avgScore),
    totalQuestions: questions.length,
    answeredQuestions: scores.length,
    weakAreas,
    strongAreas,
    performanceLevel: avgScore >= 80 ? 'Excellent' : avgScore >= 65 ? 'Good' : avgScore >= 50 ? 'Average' : 'Needs Improvement',
    recommendations: generateRecommendations(weakAreas, role),
    topicBreakdown: Object.entries(topicScores).map(([topic, scores]) => ({
      topic,
      avgScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    })).sort((a, b) => b.avgScore - a.avgScore),
  };
}

function generateRecommendations(weakAreas, role) {
  const general = [
    'Practice the STAR method (Situation, Task, Action, Result) for behavioral questions',
    'Build more side projects to have concrete examples ready',
    'Study system design concepts through resources like "Designing Data-Intensive Applications"',
    'Do daily LeetCode practice focusing on data structures and algorithms',
    'Record yourself answering questions to improve communication clarity',
    'Join mock interview platforms like Pramp or Interviewing.io',
  ];

  const specific = {
    'JavaScript': ['Deep-dive into JavaScript: The Definitive Guide', 'Practice async/await and Promises patterns'],
    'React': ['Build a complex React app with hooks', 'Study React source code and reconciliation'],
    'Databases': ['Take a database fundamentals course', 'Practice SQL on Mode Analytics or HackerRank'],
    'System Design': ['Study system design patterns on SystemDesign.io', 'Read high-scalability.com case studies'],
    'Behavioral': ['Prepare 5-7 STAR stories covering different scenarios', 'Practice with a friend or mentor'],
    'ML Theory': ['Review Andrew Ng\'s ML course on Coursera', 'Implement algorithms from scratch'],
  };

  const recs = [...general.slice(0, 3)];
  weakAreas.forEach(area => {
    if (specific[area]) recs.push(...specific[area].slice(0, 1));
  });

  return [...new Set(recs)].slice(0, 6);
}

export function getUserStats() {
  const stored = localStorage.getItem('interview_stats');
  if (stored) return JSON.parse(stored);
  return {
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    sessions: [],
    streakDays: 0,
    lastSessionDate: null,
  };
}

export function saveSession(sessionData) {
  const stats = getUserStats();
  const sessions = [...stats.sessions, sessionData];

  const allScores = sessions.map(s => s.averageScore).filter(Boolean);
  const newStats = {
    totalInterviews: sessions.length,
    averageScore: allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0,
    bestScore: allScores.length > 0 ? Math.max(...allScores) : 0,
    totalTime: sessions.reduce((sum, s) => sum + (s.duration || 0), 0),
    sessions: sessions.slice(-20), // Keep last 20 sessions
    lastSessionDate: new Date().toISOString(),
    streakDays: calculateStreak(stats.lastSessionDate),
  };

  localStorage.setItem('interview_stats', JSON.stringify(newStats));
  return newStats;
}

function calculateStreak(lastDate) {
  if (!lastDate) return 1;
  const last = new Date(lastDate);
  const now = new Date();
  const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  return diffDays <= 1 ? 1 : 0;
}
