'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const questions = [
  {
    id: 1,
    title: 'Titration Logic',
    description: (
      <>
        Print <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">
          &quot;Acidic&quot;
        </code>{' '}
        if{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">pH</code>{' '}
        is less than{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">7.0</code>.
      </>
    ),
    code: {
      variable: 'float pH = ',
      value: '3.42',
      blank1: { placeholder: 'if', answer: 'if' },
      operator: { placeholder: '<', answer: '<' },
      print: 'printf("Acidic");',
    },
  },
  {
    id: 2,
    title: 'Titration Logic',
    description: (
      <>
        Print <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">
          &quot;Basic&quot;
        </code>{' '}
        if{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">pH</code>{' '}
        is greater than{' '}
        <code className="bg-surface-container-high px-2 py-1 rounded text-sm text-error">7.0</code>.
      </>
    ),
    code: {
      variable: 'float pH = ',
      value: '9.10',
      blank1: { placeholder: 'if', answer: 'if' },
      operator: { placeholder: '>', answer: '>' },
      print: 'printf("Basic");',
    },
  },
];

export default function DemoSimulationPage() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { blank1: string; operator: string }>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});
  const isFinishedRef = useRef(false);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [warningMessage, setWarningMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isExamStarted) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        setWarnings(w => w + 1);
        setWarningMessage('You left the exam window. This violation has been recorded.');
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFinishedRef.current) return;
      e.preventDefault();
      e.returnValue = '';
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setWarnings(w => w + 1);
        setWarningMessage('You exited fullscreen. Please return to fullscreen to continue the exam.');
      }
    };

    const handleBlur = () => {
      setWarnings(w => w + 1);
      setWarningMessage('You switched to another window (lost focus). This violation has been recorded.');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isExamStarted]);

  const startExam = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setIsExamStarted(true);
    } catch (err) {
      alert('Unable to enter fullscreen mode. Please ensure your browser allows fullscreen.');
    }
  };

  const totalQuestions = 10;
  const q = questions[Math.min(currentQuestion - 1, questions.length - 1)];

  const currentAnswers = answers[currentQuestion] ?? { blank1: '', operator: '' };

  const handleChange = (field: 'blank1' | 'operator', value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: { ...currentAnswers, [field]: value },
    }));
  };

  const handleSubmit = () => {
    const ans = answers[currentQuestion] ?? { blank1: '', operator: '' };
    const isCorrect =
      ans.blank1.trim().toLowerCase() === q.code.blank1.answer &&
      ans.operator.trim() === q.code.operator.answer;
    setSubmitted((prev) => ({ ...prev, [currentQuestion]: true }));
    setCorrect((prev) => ({ ...prev, [currentQuestion]: isCorrect }));
  };

  const isSubmitted = submitted[currentQuestion];
  const isCorrectAnswer = correct[currentQuestion];

  return (
    <div 
      className="bg-background text-on-background font-body-base h-screen flex flex-col overflow-hidden select-none"
      onCopy={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'p' || e.key === 'P' || e.key === 's' || e.key === 'S')) {
          e.preventDefault();
        }
        if (e.key === 'F12') {
          e.preventDefault();
        }
      }}
    >
      {!isExamStarted && (
        <div className="absolute inset-0 bg-background z-[100] flex flex-col items-center justify-center p-8 text-center">
          <span className="material-symbols-outlined text-[64px] text-primary mb-4">lock</span>
          <h1 className="text-3xl font-headline-md font-bold text-on-surface mb-2">Secure Exam Environment</h1>
          <p className="text-on-surface-variant max-w-md mb-8">
            This module requires a secure environment. Once started, you will be in fullscreen mode. Leaving the window, switching tabs, or exiting fullscreen will be recorded as a violation.
          </p>
          <button 
            onClick={startExam}
            className="px-8 py-3 bg-primary hover:opacity-90 text-on-primary font-bold rounded text-lg shadow-sm"
          >
            Start Secure Exam
          </button>
        </div>
      )}

      {warningMessage && (
        <div className="absolute inset-0 bg-on-surface/50 z-[200] flex items-center justify-center p-4">
          <div className="bg-surface rounded-xl max-w-md w-full p-8 text-center shadow-lg border border-outline-variant">
            <span className="material-symbols-outlined text-[48px] text-error mb-4">warning</span>
            <h2 className="text-2xl font-bold text-on-surface mb-2">Security Warning</h2>
            <p className="text-on-surface-variant mb-8">{warningMessage}</p>
            <button 
              onClick={async () => {
                setWarningMessage(null);
                try {
                  await document.documentElement.requestFullscreen();
                } catch (err) {}
              }}
              className="px-6 py-3 bg-error hover:bg-error/90 text-white font-bold rounded shadow-sm w-full"
            >
              Acknowledge & Return to Exam
            </button>
          </div>
        </div>
      )}

      {/* Top NavBar */}
      <header className="flex justify-between items-center h-16 px-6 w-full sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm font-display-lg antialiased tracking-tight">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-blue-700">Practical Labs</span>
        </div>
        
        <div className="flex items-center gap-4">
          {warnings > 0 && (
            <div className="bg-error-container text-on-error-container px-3 py-1 rounded text-sm font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">warning</span>
              {warnings} Violations
            </div>
          )}
        </div>

      </header>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">


        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto flex flex-col items-center py-12 px-6">
          {/* Problem Statement */}
          <div className="w-full max-w-4xl text-center mb-8">
            <h2 className="text-[28px] font-headline-md font-bold text-on-surface mb-4">
              Exercise: Titration Logic
            </h2>
            <p className="text-lg font-body-base text-on-background">{q.description}</p>
          </div>

          {/* Exercise Panel */}
          <div className="w-full max-w-3xl bg-surface-container rounded-lg p-8 shadow-sm relative font-technical-code text-lg border border-outline-variant flex flex-col gap-8">
            {/* Feedback Banner */}
            {isSubmitted && (
              <div
                className={`absolute top-0 left-0 right-0 px-6 py-3 rounded-t-lg text-sm font-semibold flex items-center gap-2 ${
                  isCorrectAnswer
                    ? 'bg-secondary-container text-on-secondary-container'
                    : 'bg-error-container text-on-error-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isCorrectAnswer ? 'check_circle' : 'cancel'}
                </span>
                {isCorrectAnswer
                  ? 'Correct! Well done.'
                  : `Incorrect. Expected: "${q.code.blank1.answer}" and "${q.code.operator.answer}".`}
              </div>
            )}

            {/* Code Block */}
            <div
              className={`text-on-surface leading-relaxed ${isSubmitted ? 'mt-8' : ''}`}
            >
              <p className="mb-2">
                <span className="text-primary font-semibold">float</span> pH ={' '}
                <span className="text-tertiary">{q.code.value}</span>;
              </p>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <input
                  type="text"
                  value={currentAnswers.blank1}
                  onChange={(e) => handleChange('blank1', e.target.value)}
                  disabled={isSubmitted}
                  placeholder={q.code.blank1.placeholder}
                  className="bg-surface border border-outline rounded px-2 py-1 w-16 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <span>(pH</span>
                <input
                  type="text"
                  value={currentAnswers.operator}
                  onChange={(e) => handleChange('operator', e.target.value)}
                  disabled={isSubmitted}
                  placeholder={q.code.operator.placeholder}
                  className="bg-surface border border-outline rounded px-2 py-1 w-12 text-center focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-on-surface disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <span className="text-tertiary">7.0</span>
                <span>) {'{'}</span>
              </div>
              <p className="ml-8">
                printf(<span className="text-secondary font-semibold">&quot;{q.code.print.replace('printf("', '').replace('");', '')}&quot;</span>);
              </p>
              <p>{'}'}</p>
            </div>

            {/* Question Navigator */}
            <div className="pt-6 border-t border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4 font-body-base text-sm">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: totalQuestions }, (_, i) => {
                  const qNum = i + 1;
                  const isActive = qNum === currentQuestion;
                  const isDone = submitted[qNum];
                  const isPass = correct[qNum];

                  let cls = '';
                  if (isActive) {
                    cls = 'bg-primary text-on-primary font-bold shadow-sm';
                  } else if (isDone && isPass) {
                    cls = 'bg-secondary-container text-on-secondary-container border border-transparent font-semibold';
                  } else if (isDone && !isPass) {
                    cls = 'bg-error-container text-on-error-container border border-transparent font-semibold';
                  } else {
                    cls = 'bg-surface border border-outline-variant text-on-surface hover:border-primary transition-colors';
                  }

                  return (
                    <button
                      key={qNum}
                      onClick={() => setCurrentQuestion(qNum)}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${cls}`}
                    >
                      {qNum}
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant">
                <span className="material-symbols-outlined text-base">flag</span>
                <span>
                  QUESTION {currentQuestion} OF {totalQuestions}
                </span>
              </div>
            </div>
          </div>

          {/* Submit / Next Button */}
          <div className="mt-8 flex gap-3">
            {!isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-primary hover:opacity-90 text-on-primary font-bold rounded text-base transition-opacity shadow-sm"
              >
                Submit Answer »
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentQuestion < totalQuestions) {
                    setCurrentQuestion((prev) => prev + 1);
                  } else {
                    isFinishedRef.current = true;
                    if (window.opener) {
                      window.opener.postMessage({ type: 'DEMO_FINISHED', warnings }, window.location.origin);
                    }
                    window.close();
                  }
                }}
                className="px-8 py-3 bg-primary hover:opacity-90 text-on-primary font-bold rounded text-base transition-opacity shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion < totalQuestions ? 'Next Question »' : 'Finished!'}
              </button>
            )}
          </div>

          {/* Footer Info */}
          <div className="w-full max-w-3xl bg-surface-container rounded-lg p-8 mt-24 text-center border border-outline-variant shadow-sm">
            <h3 className="text-on-surface font-bold mb-4">What is an Exercise?</h3>
            <p className="text-on-surface-variant text-sm mb-2">
              Test what you learned in the chapter:{' '}
              <Link href="#" className="text-primary underline hover:text-primary-container">
                Titration Logic
              </Link>{' '}
              by completing relevant exercises.
            </p>
            <p className="text-on-surface-variant text-sm">
              To try more Lab Exercises please visit our{' '}
              <Link href="#" className="text-primary underline hover:text-primary-container">
                Lab Exercises
              </Link>{' '}
              page.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
