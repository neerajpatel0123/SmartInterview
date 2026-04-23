import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, TrendingUp, Target, Clock, Zap, Calendar,
  Award, BarChart2, RefreshCcw, ArrowRight, Flame, Star
} from 'lucide-react';
import { getUserStats, JOB_ROLES } from '../data/aiEngine';
import './DashboardPage.css';

const TIPS = [
  'Use the STAR method for behavioral questions: Situation, Task, Action, Result.',
  'Practice system design by diagramming architectures of apps you use daily.',
  'Record yourself answering questions and review for clarity and confidence.',
  'Study one new topic every day for consistent improvement.',
  'Before any interview, research the company\'s tech stack and recent news.',
  'Always prepare 3-5 questions to ask your interviewer at the end.',
  'Practice out loud — speaking your thoughts is different from writing them.',
  'Focus on "why" decisions were made, not just "what" was done.',
];

const MOCK_RADAR_DATA = [
  { topic: 'Technical', score: 72 },
  { topic: 'Behavioral', score: 68 },
  { topic: 'Communication', score: 80 },
  { topic: 'System Design', score: 55 },
  { topic: 'Problem Solving', score: 76 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const s = getUserStats();
    setStats(s);
    const idx = Math.floor(Math.random() * TIPS.length);
    setTipIndex(idx);
  }, []);

  if (!stats) {
    return (
      <div className="dashboard-loading page-wrapper">
        <div className="spinner spinner-lg" />
      </div>
    );
  }

  const hasData = stats.totalInterviews > 0;

  const recentSessions = [...(stats.sessions || [])].reverse().slice(0, 5);

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--secondary)';
    if (score >= 60) return 'var(--accent-orange)';
    return 'var(--accent)';
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return 'N/A';
    return new Date(isoStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  const formatDuration = (secs) => {
    if (!secs) return '0m';
    const m = Math.floor(secs / 60);
    return `${m}m`;
  };

  const getRoleLabel = (roleId) => {
    const role = JOB_ROLES.find(r => r.id === roleId);
    return role ? `${role.icon} ${role.label}` : roleId || 'N/A';
  };

  return (
    <div className="dashboard-page page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Performance <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="dashboard-subtitle">Track your interview preparation progress</p>
          </div>
          <button
            id="dashboard-start-btn"
            className="btn btn-primary"
            onClick={() => navigate('/setup')}
          >
            <Brain size={18} />
            New Interview
          </button>
        </div>

        {/* No Data State */}
        {!hasData && (
          <div className="no-data-card animate-fade-in">
            <div className="no-data-icon">
              <BarChart2 size={48} />
            </div>
            <h2>No interviews yet</h2>
            <p>Complete your first mock interview to start seeing your progress and analytics here.</p>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/setup')}
            >
              <Brain size={20} />
              Start Your First Interview
              <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Stats Grid */}
        {hasData && (
          <>
            <div className="stats-grid animate-fade-in">
              <div className="stat-card">
                <div className="stat-icon purple">
                  <Brain size={20} />
                </div>
                <div className="stat-value">{stats.totalInterviews}</div>
                <div className="stat-label">Total Interviews</div>
                <div className="stat-trend up">↗ Keep going!</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <TrendingUp size={20} />
                </div>
                <div className="stat-value">{stats.averageScore}%</div>
                <div className="stat-label">Average Score</div>
                <div className="stat-progress">
                  <div className="progress-bar" style={{ height: 4 }}>
                    <div className="progress-fill" style={{ width: `${stats.averageScore}%` }} />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon gold">
                  <Award size={20} />
                </div>
                <div className="stat-value">{stats.bestScore}%</div>
                <div className="stat-label">Best Score</div>
                <div className="stat-trend">Personal best 🏆</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon blue">
                  <Clock size={20} />
                </div>
                <div className="stat-value">{formatDuration(stats.totalTime)}</div>
                <div className="stat-label">Total Practice Time</div>
                <div className="stat-trend">Time well spent!</div>
              </div>
            </div>

            {/* Streak */}
            {stats.streakDays > 0 && (
              <div className="streak-banner animate-fade-in">
                <Flame size={20} style={{ color: '#ff9f43' }} />
                <span>You're on a <strong>{stats.streakDays}-day streak</strong>! Keep practicing every day.</span>
                <span className="streak-date">Last session: {formatDate(stats.lastSessionDate)}</span>
              </div>
            )}

            {/* Charts Row */}
            <div className="charts-row">
              {/* Performance History */}
              <div className="dashboard-card" style={{ flex: 2 }}>
                <h3 className="dashboard-card-title">
                  <TrendingUp size={18} />
                  Score History
                </h3>
                {recentSessions.length > 0 ? (
                  <div className="score-history">
                    <div className="history-chart">
                      {recentSessions.map((session, i) => {
                        const score = session.averageScore || 0;
                        return (
                          <div key={i} className="history-bar-col">
                            <div className="history-bar-label">{score}%</div>
                            <div className="history-bar-wrap">
                              <div
                                className="history-bar"
                                style={{
                                  height: `${Math.max(score, 5)}%`,
                                  background: `linear-gradient(180deg, ${getScoreColor(score)}, ${getScoreColor(score)}88)`
                                }}
                              />
                            </div>
                            <div className="history-bar-date">
                              {new Date(session.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="chart-empty">No history yet</div>
                )}
              </div>

              {/* Skills Radar (simplified bar version) */}
              <div className="dashboard-card" style={{ flex: 1 }}>
                <h3 className="dashboard-card-title">
                  <Target size={18} />
                  Skill Breakdown
                </h3>
                <div className="skill-bars">
                  {MOCK_RADAR_DATA.map((item, i) => (
                    <div key={i} className="skill-bar-row">
                      <span className="skill-name">{item.topic}</span>
                      <div className="skill-bar-wrap">
                        <div className="progress-bar" style={{ height: 6 }}>
                          <div
                            className="progress-fill"
                            style={{
                              width: `${hasData ? item.score : 0}%`,
                              background: `linear-gradient(90deg, ${getScoreColor(item.score)}, ${getScoreColor(item.score)}88)`
                            }}
                          />
                        </div>
                      </div>
                      <span className="skill-score">{hasData ? `${item.score}%` : '-'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Sessions */}
            <div className="dashboard-card animate-fade-in">
              <h3 className="dashboard-card-title">
                <Calendar size={18} />
                Recent Sessions
              </h3>
              {recentSessions.length > 0 ? (
                <div className="sessions-table">
                  <div className="sessions-header">
                    <span>Date</span>
                    <span>Role</span>
                    <span>Questions</span>
                    <span>Duration</span>
                    <span>Score</span>
                  </div>
                  {recentSessions.map((session, i) => (
                    <div key={i} className="session-row">
                      <span>{formatDate(session.date)}</span>
                      <span>{getRoleLabel(session.role)}</span>
                      <span>{session.totalQuestions || 'N/A'}</span>
                      <span>{formatDuration(session.duration)}</span>
                      <span
                        className="session-score"
                        style={{ color: getScoreColor(session.averageScore || 0) }}
                      >
                        {session.averageScore || 0}%
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No sessions recorded yet.</p>
              )}
            </div>
          </>
        )}

        {/* Daily Tip */}
        <div className="tip-card animate-fade-in">
          <div className="tip-icon">
            <Zap size={20} />
          </div>
          <div className="tip-content">
            <span className="tip-label">Daily Interview Tip</span>
            <p>{TIPS[tipIndex]}</p>
          </div>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setTipIndex(prev => (prev + 1) % TIPS.length)}
          >
            Next Tip
          </button>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3 className="quick-actions-title">Quick Practice</h3>
          <div className="quick-actions-grid">
            {JOB_ROLES.slice(0, 6).map(role => (
              <button
                key={role.id}
                id={`quick-role-${role.id}`}
                className="quick-action-btn"
                onClick={() => {
                  sessionStorage.setItem('interview_config', JSON.stringify({
                    role: role.id,
                    experienceLevel: 'mid',
                    questionCount: 5,
                    mode: 'text',
                    difficulty: 'mixed',
                    resume: '',
                  }));
                  navigate('/interview');
                }}
              >
                <span>{role.icon}</span>
                <span>{role.label}</span>
                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
