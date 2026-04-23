import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy, Brain, Target, TrendingUp, Clock, ChevronRight,
  RefreshCcw, BarChart2, CheckCircle, AlertCircle, Star,
  ArrowRight, Download, Share2
} from 'lucide-react';
import { generateOverallFeedback, saveSession, JOB_ROLES } from '../data/aiEngine';
import './ResultsPage.css';

export default function ResultsPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const stored = sessionStorage.getItem('interview_results');
    if (!stored) {
      navigate('/setup');
      return;
    }
    const data = JSON.parse(stored);
    setResults(data);

    const fb = generateOverallFeedback(data.answers || [], data.questions || [], data.config?.role);
    setFeedback(fb);

    // Save session
    saveSession({
      date: new Date().toISOString(),
      role: data.config?.role,
      averageScore: fb.averageScore,
      duration: data.duration,
      totalQuestions: fb.totalQuestions,
    });
  }, [navigate]);

  if (!results || !feedback) {
    return (
      <div className="results-loading page-wrapper">
        <div className="spinner spinner-lg" />
        <p>Loading results...</p>
      </div>
    );
  }

  const { config, questions, answers, duration } = results;
  const role = JOB_ROLES.find(r => r.id === config?.role);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--secondary)';
    if (score >= 60) return 'var(--accent-orange)';
    return 'var(--accent)';
  };

  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A+', label: 'Outstanding', emoji: '🏆' };
    if (score >= 80) return { grade: 'A', label: 'Excellent', emoji: '⭐' };
    if (score >= 70) return { grade: 'B+', label: 'Very Good', emoji: '👍' };
    if (score >= 60) return { grade: 'B', label: 'Good', emoji: '📗' };
    if (score >= 50) return { grade: 'C', label: 'Average', emoji: '📝' };
    return { grade: 'D', label: 'Needs Work', emoji: '⚠️' };
  };

  const gradeInfo = getScoreGrade(feedback.averageScore);

  return (
    <div className="results-page page-wrapper">
      <div className="container">
        {/* Hero Results Card */}
        <div className="results-hero animate-fade-in">
          <div className="results-hero-bg" />
          <div className="results-hero-content">
            <div className="results-emoji">{gradeInfo.emoji}</div>
            <h1 className="results-hero-title">Interview Complete!</h1>
            <p className="results-hero-subtitle">
              {config?.name ? `Great job, ${config.name}!` : 'Great job!'} Here's how you performed.
            </p>

            <div className="score-display">
              <div className="score-ring-large">
                <svg viewBox="0 0 120 120" className="score-svg">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="54"
                    fill="none"
                    stroke={getScoreColor(feedback.averageScore)}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(feedback.averageScore / 100) * 339.3}, 339.3`}
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="score-inner">
                  <span className="score-value">{feedback.averageScore}</span>
                  <span className="score-max">/100</span>
                </div>
              </div>
              <div className="score-grade-info">
                <div className="score-grade">{gradeInfo.grade}</div>
                <div className="score-label">{gradeInfo.label}</div>
                <div className="score-level-badge">
                  <Star size={14} fill="currentColor" />
                  {feedback.performanceLevel}
                </div>
              </div>
            </div>

            <div className="results-quick-stats">
              <div className="quick-stat">
                <Brain size={20} />
                <div>
                  <span className="qs-value">{feedback.answeredQuestions}/{feedback.totalQuestions}</span>
                  <span className="qs-label">Answered</span>
                </div>
              </div>
              <div className="quick-stat">
                <Clock size={20} />
                <div>
                  <span className="qs-value">{formatDuration(duration || 0)}</span>
                  <span className="qs-label">Duration</span>
                </div>
              </div>
              <div className="quick-stat">
                <Target size={20} />
                <div>
                  <span className="qs-value">{role ? `${role.icon} ${role.label}` : config?.role}</span>
                  <span className="qs-label">Role</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs results-tabs" style={{ marginBottom: 24 }}>
          {[
            { id: 'overview', label: 'Overview', icon: <BarChart2 size={16} /> },
            { id: 'answers', label: 'All Answers', icon: <Brain size={16} /> },
            { id: 'recommendations', label: 'Recommendations', icon: <TrendingUp size={16} /> },
          ].map(tab => (
            <button
              key={tab.id}
              id={`results-tab-${tab.id}`}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content animate-fade-in">
            {/* Topic Breakdown */}
            <div className="results-card">
              <h3 className="results-card-title">
                <BarChart2 size={18} />
                Performance by Topic
              </h3>
              <div className="topic-breakdown">
                {feedback.topicBreakdown?.map((topic, i) => (
                  <div key={i} className="topic-row">
                    <span className="topic-name">{topic.topic}</span>
                    <div className="topic-bar-wrap">
                      <div className="progress-bar" style={{ height: 8 }}>
                        <div
                          className="progress-fill"
                          style={{
                            width: `${topic.avgScore}%`,
                            background: `linear-gradient(90deg, ${getScoreColor(topic.avgScore)}, ${getScoreColor(topic.avgScore)}aa)`
                          }}
                        />
                      </div>
                    </div>
                    <span className="topic-score" style={{ color: getScoreColor(topic.avgScore) }}>
                      {topic.avgScore}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strong and Weak Areas */}
            <div className="areas-grid">
              {feedback.strongAreas?.length > 0 && (
                <div className="results-card area-card strong-card">
                  <h3 className="results-card-title">
                    <CheckCircle size={18} style={{ color: 'var(--secondary)' }} />
                    Strong Areas
                  </h3>
                  <div className="area-tags">
                    {feedback.strongAreas.map((area, i) => (
                      <span key={i} className="badge badge-success">{area}</span>
                    ))}
                  </div>
                </div>
              )}

              {feedback.weakAreas?.length > 0 && (
                <div className="results-card area-card weak-card">
                  <h3 className="results-card-title">
                    <AlertCircle size={18} style={{ color: 'var(--accent-orange)' }} />
                    Areas to Improve
                  </h3>
                  <div className="area-tags">
                    {feedback.weakAreas.map((area, i) => (
                      <span key={i} className="badge badge-warning">{area}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Answers Tab */}
        {activeTab === 'answers' && (
          <div className="tab-content animate-fade-in">
            {questions.map((q, i) => {
              const ans = answers[i];
              const score = ans?.evaluation?.score || 0;
              return (
                <div key={i} className="answer-review-card">
                  <div className="ar-header">
                    <div className="ar-meta">
                      <span className="ar-num">Q{i + 1}</span>
                      <span className={`badge ${
                        q.difficulty === 'Easy' ? 'badge-success' :
                        q.difficulty === 'Medium' ? 'badge-warning' : 'badge-danger'
                      }`}>{q.difficulty}</span>
                      <span className="badge badge-info">{q.topic}</span>
                    </div>
                    <div className="ar-score" style={{ color: getScoreColor(score) }}>
                      {score > 0 ? `${score}/100` : 'Skipped'}
                    </div>
                  </div>

                  <div className="ar-question">{q.question}</div>

                  {ans?.text && ans.text !== '[Skipped]' && (
                    <div className="ar-answer">
                      <span className="ar-answer-label">Your Answer:</span>
                      <p>{ans.text}</p>
                    </div>
                  )}

                  {ans?.evaluation?.feedback && (
                    <div className="ar-feedback">
                      <p>{ans.evaluation.feedback}</p>
                    </div>
                  )}

                  {score > 0 && (
                    <div className="progress-bar" style={{ height: 4, marginTop: 8 }}>
                      <div
                        className="progress-fill"
                        style={{
                          width: `${score}%`,
                          background: `linear-gradient(90deg, ${getScoreColor(score)}, ${getScoreColor(score)}aa)`
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="tab-content animate-fade-in">
            <div className="results-card">
              <h3 className="results-card-title">
                <TrendingUp size={18} />
                AI-Powered Study Plan
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 20 }}>
                Based on your interview performance, here are personalized recommendations to boost your scores:
              </p>
              <div className="recommendations-list">
                {feedback.recommendations?.map((rec, i) => (
                  <div key={i} className="recommendation-item">
                    <div className="rec-number">{i + 1}</div>
                    <p>{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="results-card next-steps-card">
              <h3 className="results-card-title">
                <Star size={18} />
                Next Steps
              </h3>
              <div className="next-steps">
                {[
                  { label: 'Practice again with harder questions', action: 'Retry Interview', color: 'primary' },
                  { label: 'Try a different job role', action: 'New Role', color: 'secondary' },
                  { label: 'Review your weakest topic answers', action: 'Review', color: 'warning' },
                ].map((step, i) => (
                  <div key={i} className="next-step-item">
                    <div>
                      <p>{step.label}</p>
                    </div>
                    <span className={`badge badge-${step.color}`}>{step.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="results-actions">
          <button
            id="results-retry-btn"
            className="btn btn-primary"
            onClick={() => navigate('/setup')}
          >
            <RefreshCcw size={18} />
            Practice Again
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/dashboard')}
          >
            <BarChart2 size={18} />
            View Dashboard
          </button>
          <button className="btn btn-ghost" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
