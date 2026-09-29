import { SeminarEvaluation, INITIAL_CRITERIA, INITIAL_MEMBERS } from '../types/seminar';

export const createEmptyEvaluation = (): SeminarEvaluation => ({
  id: `eval_${Date.now()}`,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  basicInfo: {
    university: '',
    faculty: '',
    department: 'قسم تكنولوجيا التعليم',
    researcherName: '',
    degree: '',
    proposalTitle: '',
    specialization: 'تكنولوجيا التعليم',
    seminarDate: new Date().toISOString().split('T')[0],
    supervisors: '',
    registrationNumber: '',
  },
  criteria: INITIAL_CRITERIA.map(c => ({
    ...c,
    score: null,
    notes: '',
  })),
  committeeNotes: {
    strengths: '',
    needsModification: '',
    majorAmendments: '',
  },
  proposedReformulation: {
    proposedTitle: '',
    proposedVariables: '',
    additionalSuggestions: '',
  },
  decision: null,
  members: INITIAL_MEMBERS.map(m => ({
    ...m,
    name: '',
    academicTitle: '',
    department: '',
    isSigned: false,
  })),
});

export const SAMPLE_EVALUATION: SeminarEvaluation = createEmptyEvaluation();
