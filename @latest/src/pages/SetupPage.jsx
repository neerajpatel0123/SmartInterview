import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase, User, FileText, Settings, ChevronRight,
  Brain, Upload, Trash2, Info, Clock, HelpCircle
} from 'lucide-react';
import { JOB_ROLES, EXPERIENCE_LEVELS } from '../data/aiEngine';
import './SetupPage.css';

const QUESTION_COUNTS = [5, 8, 10, 15];
const INTERVIEW_MODES = [
  { id: 'text', label: 'Text Mode', desc: 'Type your answers', icon: '⌨️' },
  { id: 'voice', label: 'Voice Mode', desc: 'Speak your answers', icon: '🎤' },
];

const DIFFICULTIES = [
  { id: 'mixed', label: 'Mixed', desc: 'Auto-adjusts difficulty', color: 'purple' },
  { id: 'easy', label: 'Easy', desc: 'Foundational questions', color: 'green' },
  { id: 'medium', label: 'Medium', desc: 'Standard interview level', color: 'yellow' },
  { id: 'hard', label: 'Hard', desc: 'Advanced & system design', color: 'red' },
];

export default function SetupPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState({
    role: '',
    experienceLevel: '',
    resume: '',
    questionCount: 8,
    mode: 'text',
    difficulty: 'mixed',
    name: '',
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { num: 1, label: 'Job Role', icon: <Briefcase size={18} /> },
    { num: 2, label: 'Experience', icon: <User size={18} /> },
    { num: 3, label: 'Resume', icon: <FileText size={18} /> },
    { num: 4, label: 'Settings', icon: <Settings size={18} /> },
  ];

  const validate = (step) => {
    const errs = {};
    if (step === 1 && !config.role) errs.role = 'Please select a job role';
    if (step === 2 && !config.experienceLevel) errs.experienceLevel = 'Please select your experience level';
    return errs;
  };

  const handleNext = () => {
    const errs = validate(currentStep);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleStart = () => {
    sessionStorage.setItem('interview_config', JSON.stringify(config));
    navigate('/interview');
  };

  const selectedRole = JOB_ROLES.find(r => r.id === config.role);

  const rolesByCategory = JOB_ROLES.reduce((acc, role) => {
    if (!acc[role.category]) acc[role.category] = [];
    acc[role.category].push(role);
    return acc;
  }, {});

  return (
    <div className="setup-page page-wrapper">
      <div className="container">
        {/* Header */}
        <div className="setup-header">
          <h1 className="setup-title">Configure Your <span className="gradient-text">Interview</span></h1>
          <p className="setup-subtitle">Set up your personalized interview session in just a few steps</p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((step, i) => (
            <div key={step.num} className="step-indicator-item">
              <div className={`step-dot ${currentStep === step.num ? 'active' : currentStep > step.num ? 'done' : ''}`}>
                {currentStep > step.num ? '✓' : step.icon}
              </div>
              <span className="step-dot-label">{step.label}</span>
              {i < steps.length - 1 && (
                <div className={`step-line ${currentStep > step.num ? 'done' : ''}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="setup-content">
          {/* Step 1: Role */}
          {currentStep === 1 && (
            <div className="step-panel animate-fade-in">
              <div className="step-panel-header">
                <Briefcase size={24} className="step-icon-head" />
                <div>
                  <h2>Select Your Target Role</h2>
                  <p>Choose the job role you're interviewing for</p>
                </div>
              </div>

              {errors.role && (
                <div className="notification notification-error" style={{ marginBottom: 20 }}>
                  <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span>{errors.role}</span>
                </div>
              )}

              {Object.entries(rolesByCategory).map(([category, roles]) => (
                <div key={category} className="role-category">
                  <h3 className="role-category-title">{category}</h3>
                  <div className="roles-grid">
                    {roles.map(role => (
                      <button
                        key={role.id}
                        id={`role-${role.id}`}
                        className={`role-card ${config.role === role.id ? 'selected' : ''}`}
                        onClick={() => setConfig(c => ({ ...c, role: role.id }))}
                      >
                        <span className="role-emoji">{role.icon}</span>
                        <span className="role-label">{role.label}</span>
                        {config.role === role.id && <span className="role-check">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Experience */}
          {currentStep === 2 && (
            <div className="step-panel animate-fade-in">
              <div className="step-panel-header">
                <User size={24} className="step-icon-head" />
                <div>
                  <h2>Your Experience Level</h2>
                  <p>This helps us calibrate question difficulty</p>
                </div>
              </div>

              {errors.experienceLevel && (
                <div className="notification notification-error" style={{ marginBottom: 20 }}>
                  <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span>{errors.experienceLevel}</span>
                </div>
              )}

              <div className="exp-grid">
                {EXPERIENCE_LEVELS.map(level => (
                  <button
                    key={level.id}
                    id={`exp-${level.id}`}
                    className={`exp-card ${config.experienceLevel === level.id ? 'selected' : ''}`}
                    onClick={() => setConfig(c => ({ ...c, experienceLevel: level.id }))}
                  >
                    <span className="exp-icon">{level.icon}</span>
                    <span className="exp-label">{level.label}</span>
                    {config.experienceLevel === level.id && <span className="exp-check">✓</span>}
                  </button>
                ))}
              </div>

              <div className="form-group" style={{ marginTop: 32 }}>
                <label className="form-label">Your Name (optional)</label>
                <input
                  id="setup-name-input"
                  className="form-input"
                  placeholder="e.g., Harsh Patel"
                  value={config.name}
                  onChange={e => setConfig(c => ({ ...c, name: e.target.value }))}
                />
              </div>
            </div>
          )}

          {/* Step 3: Resume */}
          {currentStep === 3 && (
            <div className="step-panel animate-fade-in">
              <div className="step-panel-header">
                <FileText size={24} className="step-icon-head" />
                <div>
                  <h2>Resume Analysis (Optional)</h2>
                  <p>Paste your resume to get personalized questions</p>
                </div>
              </div>

              <div className="notification notification-info" style={{ marginBottom: 24 }}>
                <HelpCircle size={16} style={{ color: 'var(--primary-light)', flexShrink: 0 }} />
                <span>Pasting your resume helps AI generate questions about your specific projects, skills, and experience. This step is optional.</span>
              </div>

              <div className="resume-area">
                <div className="resume-toolbar">
                  <span className="form-label">Resume Text</span>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {config.resume && (
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setConfig(c => ({ ...c, resume: '' }))}
                      >
                        <Trash2 size={14} />
                        Clear
                      </button>
                    )}
                    <span className="resume-char-count">{config.resume.length} chars</span>
                  </div>
                </div>
                <textarea
                  id="resume-textarea"
                  className="form-textarea resume-textarea"
                  placeholder="Paste your resume content here...&#10;&#10;Example:&#10;John Doe | Software Engineer&#10;Skills: React, Node.js, Python, PostgreSQL&#10;&#10;Experience:&#10;• Built an e-commerce platform serving 50K+ users&#10;• Developed REST APIs with Node.js and Express..."
                  value={config.resume}
                  onChange={e => setConfig(c => ({ ...c, resume: e.target.value }))}
                />
              </div>

              {config.resume.length > 50 && (
                <div className="notification notification-success" style={{ marginTop: 16 }}>
                  <span>✓ Resume detected! AI will generate personalized questions based on your background.</span>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Settings */}
          {currentStep === 4 && (
            <div className="step-panel animate-fade-in">
              <div className="step-panel-header">
                <Settings size={24} className="step-icon-head" />
                <div>
                  <h2>Interview Settings</h2>
                  <p>Customize your interview experience</p>
                </div>
              </div>

              {/* Summary */}
              <div className="setup-summary">
                <div className="summary-title">Interview Summary</div>
                <div className="summary-items">
                  <div className="summary-item">
                    <span>Role</span>
                    <strong>{selectedRole ? `${selectedRole.icon} ${selectedRole.label}` : 'Not selected'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Experience</span>
                    <strong>{EXPERIENCE_LEVELS.find(e => e.id === config.experienceLevel)?.label || 'Not selected'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Resume</span>
                    <strong>{config.resume.length > 50 ? '✓ Provided' : 'Not provided'}</strong>
                  </div>
                </div>
              </div>

              {/* Interview Mode */}
              <div className="settings-section">
                <h3 className="settings-label">Interview Mode</h3>
                <div className="mode-grid">
                  {INTERVIEW_MODES.map(mode => (
                    <button
                      key={mode.id}
                      id={`mode-${mode.id}`}
                      className={`mode-card ${config.mode === mode.id ? 'selected' : ''}`}
                      onClick={() => setConfig(c => ({ ...c, mode: mode.id }))}
                    >
                      <span className="mode-icon">{mode.icon}</span>
                      <span className="mode-label">{mode.label}</span>
                      <span className="mode-desc">{mode.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="settings-section">
                <h3 className="settings-label">Number of Questions</h3>
                <div className="count-grid">
                  {QUESTION_COUNTS.map(count => (
                    <button
                      key={count}
                      id={`count-${count}`}
                      className={`count-btn ${config.questionCount === count ? 'selected' : ''}`}
                      onClick={() => setConfig(c => ({ ...c, questionCount: count }))}
                    >
                      {count} Questions
                      <span className="count-time">
                        <Clock size={12} />
                        ~{count * 3} min
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="settings-section">
                <h3 className="settings-label">Difficulty</h3>
                <div className="difficulty-grid">
                  {DIFFICULTIES.map(diff => (
                    <button
                      key={diff.id}
                      id={`diff-${diff.id}`}
                      className={`difficulty-btn diff-${diff.color} ${config.difficulty === diff.id ? 'selected' : ''}`}
                      onClick={() => setConfig(c => ({ ...c, difficulty: diff.id }))}
                    >
                      <span className="diff-label">{diff.label}</span>
                      <span className="diff-desc">{diff.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="setup-nav">
            {currentStep > 1 && (
              <button className="btn btn-ghost" onClick={handleBack}>
                ← Back
              </button>
            )}

            <div style={{ flex: 1 }} />

            {currentStep < 4 ? (
              <button id="setup-next-btn" className="btn btn-primary" onClick={handleNext}>
                Continue
                <ChevronRight size={18} />
              </button>
            ) : (
              <button id="setup-start-btn" className="btn btn-success btn-lg" onClick={handleStart}>
                <Brain size={20} />
                Start Interview
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
