import React from 'react';

interface QuestionCode {
  variable?: string;
  value: string;
  blank1: { placeholder: string; answer: string };
  operator: { placeholder: string; answer: string };
  print: string;
}

interface Question {
  id: number;
  title: string;
  description: React.ReactNode;
  code: QuestionCode;
}

interface ExercisePanelProps {
  q: Question;
  currentAnswers: { blank1: string; operator: string };
  handleChange: (field: 'blank1' | 'operator', value: string) => void;
  isSubmitted: boolean;
  isCorrectAnswer: boolean;
  totalQuestions: number;
  currentQuestion: number;
  setCurrentQuestion: (q: number) => void;
  submitted: Record<number, boolean>;
  correct: Record<number, boolean>;
}

export function ExercisePanel({
  q,
  currentAnswers,
  handleChange,
  isSubmitted,
  isCorrectAnswer,
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
  submitted,
  correct
}: ExercisePanelProps) {
  return (
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
  );
}
