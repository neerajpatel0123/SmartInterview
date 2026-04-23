import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Mic, MicOff, Send, ChevronRight, ChevronLeft,
  Clock, HelpCircle, Flag, Volume2, VolumeX, AlertCircle,
  CheckCircle, XCircle, Lightbulb, SkipForward
} from 'lucide-react';
import { getQuestionsForRole, generateResumeQuestions, evaluateAnswer } from '../data/aiEngine';
import './InterviewPage.css';

export default function InterviewPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [interviewPhase, setInterviewPhase] = useState('intro'); // intro | active | complete

  const textareaRef = useRef(null);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const speechSynthRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Load config and generate questions
  useEffect(() => {
    const stored = sessionStorage.getItem('interview_config');
    if (!stored) {
      navigate('/setup');
      return;
    }
    const cfg = JSON.parse(stored);
    setConfig(cfg);

    // Simulate AI question generation delay
    setTimeout(() => {
      let qs;
      if (cfg.resume && cfg.resume.length > 50) {
        qs = generateResumeQuestions(cfg.resume, cfg.role);
      } else {
        qs = getQuestionsForRole(cfg.role, cfg.questionCount || 8);
      }
      setQuestions(qs.slice(0, cfg.questionCount || 8));
      setAnswers(new Array(qs.length).fill(null));
      setIsLoading(false);
    }, 1500);
  }, [navigate]);

  // Timer
  useEffect(() => {
    if (interviewPhase === 'active') {
      timerRef.current = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [interviewPhase]);

  // Speech recognition
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser. Please use Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setCurrentAnswer(transcript);
    };

    recognitionRef.current.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  // Text to speech
  const speakQuestion = useCallback((text) => {
    if (isMuted) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.name.includes('Google') && v.lang === 'en-US');
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
      speechSynthRef.current = utterance;
    }
  }, [isMuted]);

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + (showFeedback ? 1 : 0)) / questions.length) * 100 : 0;

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim() && !showFeedback) {
      return;
    }

    if (showFeedback) {
      // Move to next question
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setCurrentAnswer('');
        setShowFeedback(false);
        setCurrentFeedback(null);
        setShowHint(false);
        if (config?.mode === 'voice') {
          setTimeout(() => speakQuestion(questions[currentIndex + 1]?.question), 500);
        }
      } else {
        // Interview complete
        finishInterview();
      }
      return;
    }

    setIsEvaluating(true);
    if (isListening) stopListening();

    // Simulate AI evaluation
    await new Promise(resolve => setTimeout(resolve, 1200));

    const evaluation = evaluateAnswer(currentQuestion, currentAnswer);
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { text: currentAnswer, evaluation, questionId: currentQuestion.id };
    setAnswers(newAnswers);
    setCurrentFeedback(evaluation);
    setShowFeedback(true);
    setIsEvaluating(false);
  };

  const handleSkip = () => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = { text: '[Skipped]', evaluation: { score: 0 }, questionId: currentQuestion?.id };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentAnswer('');
      setShowFeedback(false);
      setCurrentFeedback(null);
      setShowHint(false);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
    sessionStorage.setItem('interview_results', JSON.stringify({
      config,
      questions,
      answers,
      duration,
    }));
    navigate('/results');
  };

  if (isLoading) {
    return (
      <div className="interview-loading page-wrapper">
        <div className="loading-card">
          <div className="loading-brain">
            <Brain size={48} />
          </div>
          <h2>AI is preparing your interview...</h2>
          <p>Analyzing your profile and generating personalized questions</p>
          <div className="loading-steps">
            {['Analyzing job role...', 'Processing resume...', 'Generating questions...'].map((step, i) => (
              <div key={i} className={`loading-step`} style={{ animationDelay: `${i * 0.5}s` }}>
                <div className="loading-step-dot" />
                {step}
              </div>
            ))}
          </div>
          <div className="spinner spinner-lg" style={{ margin: '20px auto 0' }} />
        </div>
      </div>
    );
  }

  if (interviewPhase === 'intro') {
    return (
      <div className="interview-intro page-wrapper">
        <div className="container">
          <div className="intro-card animate-fade-in">
            <div className="intro-icon">
              <Brain size={40} />
            </div>
            <h1 className="intro-title">Ready to Begin?</h1>
            <p className="intro-subtitle">
              Your AI interview is set up and ready. Here's what to expect:
            </p>
            <div className="intro-details">
              <div className="intro-detail">
                <span className="intro-detail-icon">📋</span>
                <div>
                  <strong>{questions.length} Questions</strong>
                  <span>covering technical, behavioral, and system design topics</span>
                </div>
              </div>
              <div className="intro-detail">
                <span className="intro-detail-icon">{config?.mode === 'voice' ? '🎤' : '⌨️'}</span>
                <div>
                  <strong>{config?.mode === 'voice' ? 'Voice Mode' : 'Text Mode'}</strong>
                  <span>{config?.mode === 'voice' ? 'Speak your answers clearly' : 'Type your answers in the text box'}</span>
                </div>
              </div>
              <div className="intro-detail">
                <span className="intro-detail-icon">🤖</span>
                <div>
                  <strong>Instant AI Feedback</strong>
                  <span>Get scored and receive tips after each answer</span>
                </div>
              </div>
              <div className="intro-detail">
                <span className="intro-detail-icon">💡</span>
                <div>
                  <strong>Hints Available</strong>
                  <span>Use the hint button if you're stuck on a question</span>
                </div>
              </div>
            </div>
            <div className="intro-tips">
              <AlertCircle size={16} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
              <span>Take your time with each answer. Quality matters more than speed. Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</span>
            </div>
            <button
              id="begin-interview-btn"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
              onClick={() => {
                setInterviewPhase('active');
                startTimeRef.current = Date.now();
                if (config?.mode === 'voice' && questions.length > 0) {
                  setTimeout(() => speakQuestion(questions[0].question), 500);
                }
              }}
            >
              <Brain size={20} />
              Begin Interview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page page-wrapper">
      {/* Exit Confirm Modal */}
      {showExitConfirm && (
        <div className="modal-overlay" onClick={() => setShowExitConfirm(false)}>
          <div className="modal-card animate-fade-in" onClick={e => e.stopPropagation()}>
            <XCircle size={40} style={{ color: 'var(--accent)', marginBottom: 16 }} />
            <h3>Exit Interview?</h3>
            <p>Your progress will be lost. Are you sure you want to exit?</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setShowExitConfirm(false)}>
                Continue
              </button>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => navigate('/setup')}>
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        {/* Interview Header */}
        <div className="interview-header">
          <div className="interview-meta">
            <div className="interview-meta-item">
              <Brain size={16} />
              <span>{config?.role?.toUpperCase().replace('-', ' ')}</span>
            </div>
            <div className="interview-meta-item">
              <Clock size={16} />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>

          <div className="interview-progress-section">
            <div className="progress-labels">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="interview-controls">
            <button
              className={`control-btn ${isMuted ? 'muted' : ''}`}
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? 'Unmute AI voice' : 'Mute AI voice'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button
              className="control-btn danger"
              onClick={() => setShowExitConfirm(true)}
              title="Exit interview"
            >
              <Flag size={18} />
            </button>
          </div>
        </div>

        {/* Main Interview Area */}
        <div className="interview-body">
          {/* Question Panel */}
          <div className="question-panel">
            {/* Question Number Breadcrumb */}
            <div className="question-breadcrumbs">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`q-breadcrumb ${
                    i < currentIndex ? 'done' :
                    i === currentIndex ? 'active' : ''
                  } ${answers[i] ? 'answered' : ''}`}
                  title={`Question ${i + 1}`}
                />
              ))}
            </div>

            {currentQuestion && (
              <div className="question-content animate-fade-in" key={currentIndex}>
                {/* Question meta */}
                <div className="question-meta-row">
                  <span className={`badge ${
                    currentQuestion.difficulty === 'Easy' ? 'badge-success' :
                    currentQuestion.difficulty === 'Medium' ? 'badge-warning' :
                    'badge-danger'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="badge badge-info">{currentQuestion.topic}</span>
                  {currentQuestion.isResumeBased && (
                    <span className="badge badge-primary">Resume-Based</span>
                  )}
                </div>

                {/* AI Avatar + Question */}
                <div className="question-display">
                  <div className="ai-interviewer">
                    <div className="ai-avatar">
                      <Brain size={24} />
                    </div>
                    <div className="ai-info">
                      <span className="ai-name">InterviewAI</span>
                      <span className="ai-role">Senior Interview Coach</span>
                    </div>
                    <button
                      className="speak-btn"
                      onClick={() => speakQuestion(currentQuestion.question)}
                      title="Read question aloud"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>

                  <div className="question-text">
                    <p>Q{currentIndex + 1}. {currentQuestion.question}</p>
                  </div>

                  {/* Hint */}
                  {showHint && (
                    <div className="hint-box animate-fade-in">
                      <Lightbulb size={16} style={{ color: 'var(--accent-orange)', flexShrink: 0 }} />
                      <span>{currentQuestion.hint}</span>
                    </div>
                  )}
                </div>

                {/* Feedback Panel */}
                {showFeedback && currentFeedback && (
                  <div className={`feedback-panel animate-fade-in ${
                    currentFeedback.score >= 75 ? 'good' :
                    currentFeedback.score >= 50 ? 'average' : 'poor'
                  }`}>
                    {/* Score */}
                    <div className="feedback-score-row">
                      <div className="feedback-score-circle">
                        <svg viewBox="0 0 36 36" className="score-ring">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={currentFeedback.score >= 75 ? 'var(--secondary)' : currentFeedback.score >= 50 ? 'var(--accent-orange)' : 'var(--accent)'}
                            strokeWidth="2"
                            strokeDasharray={`${currentFeedback.score}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="score-number">{currentFeedback.score}</span>
                      </div>
                      <div className="feedback-summary">
                        <div className="feedback-grade">
                          {currentFeedback.score >= 85 ? '🏆 Excellent!' :
                           currentFeedback.score >= 70 ? '👍 Good Answer' :
                           currentFeedback.score >= 50 ? '📝 Fair Attempt' : '⚠️ Needs Work'}
                        </div>
                        <p className="feedback-text">{currentFeedback.feedback}</p>
                      </div>
                    </div>

                    {/* Strengths & Improvements */}
                    <div className="feedback-details">
                      {currentFeedback.strengths?.length > 0 && (
                        <div className="feedback-section">
                          <h4><CheckCircle size={14} /> Strengths</h4>
                          <ul>
                            {currentFeedback.strengths.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {currentFeedback.improvements?.length > 0 && (
                        <div className="feedback-section improvements">
                          <h4><AlertCircle size={14} /> Improvements</h4>
                          <ul>
                            {currentFeedback.improvements.map((imp, i) => (
                              <li key={i}>{imp}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Your Answer Preview (in feedback mode) */}
                {showFeedback && currentAnswer && (
                  <div className="your-answer-preview">
                    <div className="preview-label">Your Answer:</div>
                    <p>{currentAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Answer Panel */}
          {!showFeedback && (
            <div className="answer-panel animate-fade-in">
              <div className="answer-panel-header">
                <span className="answer-panel-title">
                  {config?.mode === 'voice' ? 'Your Voice Answer' : 'Your Answer'}
                </span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span className="word-count">
                    {currentAnswer.trim().split(/\s+/).filter(Boolean).length} words
                  </span>
                  {!showHint && (
                    <button
                      className="hint-btn"
                      onClick={() => setShowHint(true)}
                    >
                      <HelpCircle size={14} />
                      Hint
                    </button>
                  )}
                </div>
              </div>

              <textarea
                ref={textareaRef}
                id="answer-textarea"
                className="answer-textarea"
                placeholder={
                  config?.mode === 'voice'
                    ? 'Your speech will appear here... or type your answer below.'
                    : 'Type your answer here. Be specific, use examples, and structure your response clearly...'
                }
                value={currentAnswer}
                onChange={e => setCurrentAnswer(e.target.value)}
                disabled={isEvaluating}
              />

              <div className="answer-actions">
                {config?.mode === 'voice' && (
                  <button
                    id="voice-btn"
                    className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={isListening ? stopListening : startListening}
                    disabled={isEvaluating}
                  >
                    {isListening ? (
                      <><MicOff size={18} /> Stop Recording</>
                    ) : (
                      <><Mic size={18} /> Start Recording</>
                    )}
                  </button>
                )}

                <button
                  className="btn btn-ghost btn-sm skip-btn"
                  onClick={handleSkip}
                  disabled={isEvaluating}
                >
                  <SkipForward size={16} />
                  Skip
                </button>

                <button
                  id="submit-answer-btn"
                  className="btn btn-primary"
                  onClick={handleSubmitAnswer}
                  disabled={!currentAnswer.trim() || isEvaluating}
                  style={{ marginLeft: 'auto' }}
                >
                  {isEvaluating ? (
                    <><div className="spinner" /> Evaluating...</>
                  ) : (
                    <><Send size={18} /> Submit Answer</>
                  )}
                </button>
              </div>

              {isListening && (
                <div className="recording-indicator">
                  <div className="recording-pulse" />
                  <span>Recording... speak clearly</span>
                  <div className="recording-bars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="recording-bar" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Continue button after feedback */}
          {showFeedback && (
            <div className="feedback-nav animate-fade-in">
              <button
                id="next-question-btn"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={handleSubmitAnswer}
              >
                {currentIndex < questions.length - 1 ? (
                  <>Next Question <ChevronRight size={18} /></>
                ) : (
                  <>View Results <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
