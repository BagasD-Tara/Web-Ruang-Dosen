export type StudentLearningStatus = 'Active' | 'At Risk' | 'Needs Review';

export interface StudentStatusSignals {
  progressPercentage: number;
  hasMissingAssignment?: boolean;
  hasPendingSubmission?: boolean;
  hasReturnedAssignment?: boolean;
  averageScore?: number | null;
}

const AT_RISK_PROGRESS_THRESHOLD = 50;
const NEEDS_REVIEW_SCORE_THRESHOLD = 70;

export function calculateStudentLearningStatus({
  progressPercentage,
  hasMissingAssignment = false,
  hasPendingSubmission = false,
  hasReturnedAssignment = false,
  averageScore = null,
}: StudentStatusSignals): StudentLearningStatus {
  if (progressPercentage < AT_RISK_PROGRESS_THRESHOLD) {
    return 'At Risk';
  }

  if (
    hasMissingAssignment ||
    hasPendingSubmission ||
    hasReturnedAssignment ||
    isLowAverageScore(averageScore)
  ) {
    return 'Needs Review';
  }

  return 'Active';
}

function isLowAverageScore(averageScore: number | null) {
  return averageScore !== null && averageScore < NEEDS_REVIEW_SCORE_THRESHOLD;
}
