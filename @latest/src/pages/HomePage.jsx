import { useNavigate } from 'react-router-dom';
import {
  Brain, Zap, Target, TrendingUp, Mic, FileText,
  ChevronRight, Star, Users, Award, ArrowRight, CheckCircle, Sparkles
} from 'lucide-react';
import './HomePage.css';

const FEATURES = [
  {
    icon: <Brain size={24} />,
    title: 'AI-Powered Questions',
    description: 'Intelligent question generation tailored to your specific role, experience level, and resume content.',
    color: 'purple',
  },
  {
    icon: <FileText size={24} />,
    title: 'Resume Analysis',
    description: 'Upload your resume and get role-specific questions targeting your actual skills and projects.',
    color: 'blue',
  },
  {
    icon: <Mic size={24} />,
    title: 'Voice Interview Mode',
    description: 'Simulate a real interview with voice responses using your browser\'s speech recognition.',
    color: 'green',
  },
  {
    icon: <Target size={24} />,
    title: 'Instant AI Feedback',
    description: 'Receive detailed scoring, strengths analysis, and actionable improvement suggestions.',
    color: 'orange',
  },
  {
    icon: <TrendingUp size={24} />,
    title: 'Progress Tracking',
    description: 'Monitor your improvement over time with detailed analytics and session history.',
    color: 'pink',
  },
  {
    icon: <Zap size={24} />,
    title: 'Weak Area Detection',
    description: 'AI identifies your weak spots and generates targeted practice plans to improve them.',
    color: 'yellow',
  },
];

const STATS = [
  { value: '12+', label: 'Job Roles', icon: <Target size={20} /> },
  { value: '200+', label: 'Questions', icon: <Brain size={20} /> },
  { value: '95%', label: 'User Satisfaction', icon: <Star size={20} /> },
  { value: '3x', label: 'Faster Prep', icon: <Zap size={20} /> },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Set Up Your Profile',
    description: 'Choose your target job role, experience level, and optionally paste your resume for personalized questions.',
  },
  {
    step: '02',
    title: 'Start the Interview',
    description: 'Answer AI-generated questions via text or voice. Questions adapt to your role and difficulty preference.',
  },
  {
    step: '03',
    title: 'Receive AI Feedback',
    description: 'Get instant scoring, detailed feedback on each answer, and a complete performance report.',
  },
  {
    step: '04',
    title: 'Track & Improve',
    description: 'Review your progress dashboard, identify weak areas, and keep practicing until you land the job.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Frontend Developer at Google',
    avatar: 'PS',
    text: 'InterviewAI helped me prepare for my FAANG interviews in just 3 weeks. The personalized feedback was incredibly accurate!',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    role: 'Data Scientist at Microsoft',
    avatar: 'RV',
    text: 'The AI-generated questions were spot-on for my role. I felt completely prepared walking into my interview.',
    rating: 5,
  },
  {
    name: 'Anita Singh',
    role: 'Full Stack Developer at Amazon',
    avatar: 'AS',
    text: 'Voice interview mode is a game-changer. Practicing out loud made such a difference in my confidence.',
    rating: 5,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-grid">
        <div className="hero-bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <div className="container hero-content">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} />
            AI-Powered Interview Prep Platform
          </div>

          <h1 className="hero-title animate-fade-in">
            Ace Your Next Interview
            <br />
            <span className="gradient-text">With AI Coaching</span>
          </h1>

          <p className="hero-description animate-fade-in">
            Practice with personalized AI-generated questions based on your resume and target role.
            Get instant feedback, identify weak areas, and land your dream job with confidence.
          </p>

          <div className="hero-actions animate-fade-in">
            <button
              id="hero-start-btn"
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/setup')}
            >
              Start Free Interview
              <ArrowRight size={20} />
            </button>
            <button
              className="btn btn-ghost btn-lg"
              onClick={() => navigate('/dashboard')}
            >
              View Dashboard
            </button>
          </div>

          <div className="hero-stats animate-fade-in">
            {STATS.map((stat, i) => (
              <div key={i} className="hero-stat">
                <div className="hero-stat-icon">{stat.icon}</div>
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual */}
        <div className="container">
          <div className="hero-visual animate-slide-up">
            <div className="mock-interview-card">
              <div className="mock-header">
                <div className="mock-dots">
                  <span /><span /><span />
                </div>
                <span className="mock-title">Live Interview Session</span>
                <span className="badge badge-success">
                  <span className="live-dot" />
                  AI Active
                </span>
              </div>
              <div className="mock-content">
                <div className="mock-question">
                  <div className="mock-ai-avatar">
                    <Brain size={18} />
                  </div>
                  <div className="mock-bubble">
                    <p className="mock-label">InterviewAI</p>
                    <p>Explain the concept of <strong>React hooks</strong> and how they differ from class component lifecycle methods. Can you give a practical example?</p>
                    <div className="mock-tags">
                      <span className="badge badge-primary">React</span>
                      <span className="badge badge-warning">Medium</span>
                    </div>
                  </div>
                </div>

                <div className="mock-typing">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                  <span className="typing-label">Candidate is answering...</span>
                </div>

                <div className="mock-metrics">
                  <div className="metric">
                    <span className="metric-label">Clarity</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '82%' }} />
                    </div>
                    <span className="metric-val">82%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Depth</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '75%' }} />
                    </div>
                    <span className="metric-val">75%</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Examples</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '90%' }} />
                    </div>
                    <span className="metric-val">90%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Succeed</span></h2>
            <p className="section-subtitle">A complete AI-powered interview preparation platform designed for modern job seekers.</p>
          </div>

          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <div key={i} className={`feature-card feature-${feature.color}`}>
                <div className="feature-icon-wrap">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">Get from zero to interview-ready in 4 simple steps.</p>
          </div>

          <div className="steps-grid">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-connector" />
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Loved by Job <span className="gradient-text">Seekers</span></h2>
            <p className="section-subtitle">Thousands of candidates have landed their dream jobs using InterviewAI.</p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-orb" />
            <div className="cta-content">
              <h2 className="cta-title">Ready to Ace Your Interview?</h2>
              <p className="cta-subtitle">Join thousands of candidates who've leveled up their interview skills with AI-powered practice.</p>
              <div className="cta-actions">
                <button
                  id="cta-start-btn"
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/setup')}
                >
                  Start Practicing Now
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="cta-perks">
                {['No account required', 'Completely free', '12+ job roles'].map((perk, i) => (
                  <div key={i} className="cta-perk">
                    <CheckCircle size={14} />
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <div className="footer-brand">
            <Brain size={20} />
            <span>InterviewAI</span>
          </div>
          <p className="footer-text">Built with ❤️ for students and job seekers everywhere.</p>
        </div>
      </footer>
    </div>
  );
}
