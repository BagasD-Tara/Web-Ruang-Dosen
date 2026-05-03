'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { questions } from './data/questions';
import { useSecureExam } from './hooks/useSecureExam';
import { SecureExamPrompt } from './components/SecureExamPrompt';
import { WarningModal } from './components/WarningModal';
import { TopNavBar } from './components/TopNavBar';
import { ExercisePanel } from './components/ExercisePanel';

export default function DemoSimulationPage() {
  const {
    isExamStarted,
    warnings,
    warningMessage,
    isFinishedRef,
    startExam,
    clearWarning,
  } = useSecureExam();

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState<Record<number, { blank1: string; operator: string }>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [correct, setCorrect] = useState<Record<number, boolean>>({});

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
      {!isExamStarted && <SecureExamPrompt onStart={startExam} />}
      {warningMessage && <WarningModal message={warningMessage} onAcknowledge={clearWarning} />}
      
      <TopNavBar warnings={warnings} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto flex flex-col items-center py-12 px-6">
          <div className="w-full max-w-4xl text-center mb-8">
            <h2 className="text-[28px] font-headline-md font-bold text-on-surface mb-4">
              Exercise: Titration Logic
            </h2>
            <p className="text-lg font-body-base text-on-background">{q.description}</p>
          </div>

          <ExercisePanel 
            q={q}
            currentAnswers={currentAnswers}
            handleChange={handleChange}
            isSubmitted={isSubmitted}
            isCorrectAnswer={isCorrectAnswer}
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            submitted={submitted}
            correct={correct}
          />

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
