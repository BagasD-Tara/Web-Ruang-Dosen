import { useState, useEffect, useRef } from 'react';

export function useSecureExam() {
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
    } catch {
      alert('Unable to enter fullscreen mode. Please ensure your browser allows fullscreen.');
    }
  };

  const clearWarning = async () => {
    setWarningMessage(null);
    try {
      await document.documentElement.requestFullscreen();
    } catch {}
  };

  return {
    isExamStarted,
    warnings,
    warningMessage,
    isFinishedRef,
    startExam,
    clearWarning,
  };
}
