export interface SimpleSeminarForm {
  // ترويسة القسم
  university: string;
  faculty: string;
  department: string;

  // أولًا: البيانات الأساسية
  researcherName: string;
  proposalTitle: string;
  specialization: string;
  seminarDate: string;
  degree: string;
  supervisors: string;

  // ثانيًا: معايير تحكيم الفكرة البحثية (10 معايير)
  criteria: {
    id: number;
    title: string;
    score: 1 | 2 | 3 | 4 | null;
    notes: string;
  }[];

  // ثالثًا: ملاحظات لجنة الحكم
  strengths: string;
  needsModification: string;
  majorAmendments: string;

  // رابعًا: الصياغة المقترحة بعد التعديل
  proposedTitle: string;
  proposedVariables: string;
  additionalSuggestions: string;

  // خامسًا: قرار لجنة الحكم بالسيمنار
  decision: 'current' | 'minor_revisions' | 'major_revisions' | 'resubmit' | null;

  // أعضاء لجنة الحكم
  committeeMembers: {
    id: string;
    name: string;
    role: string;
    signature: string;
  }[];
}

export const EDUTECH_CRITERIA_LIST = [
  { id: 1, title: 'وضوح عنوان الفكرة ودقته واتساقه مع موضوع البحث' },
  { id: 2, title: 'حداثة الفكرة وأصالتها في تكنولوجيا التعليم' },
  { id: 3, title: 'وضوح المشكلة البحثية ومبررات دراستها' },
  { id: 4, title: 'وضوح الفجوة البحثية التي تستهدفها الدراسة' },
  { id: 5, title: 'مناسبة المتغيرات والعلاقة بينها' },
  { id: 6, title: 'مناسبة الفئة المستهدفة وسياق التطبيق' },
  { id: 7, title: 'قابلية الفكرة للتطبيق والقياس' },
  { id: 8, title: 'القيمة العلمية والتطبيقية المتوقعة' },
  { id: 9, title: 'إمكانية تطوير الفكرة إلى أسئلة/فروض بحثية واضحة' },
  { id: 10, title: 'الاتساق العام للفكرة وإمكانية تطويرها إلى بحث علمي' },
];

export const getEmptyForm = (): SimpleSeminarForm => ({
  university: '',
  faculty: '',
  department: 'قسم تكنولوجيا التعليم',
  researcherName: '',
  proposalTitle: '',
  specialization: 'تكنولوجيا التعليم',
  seminarDate: new Date().toISOString().split('T')[0],
  degree: 'ماجستير في تكنولوجيا التعليم',
  supervisors: '',
  criteria: EDUTECH_CRITERIA_LIST.map((c) => ({
    id: c.id,
    title: c.title,
    score: null,
    notes: '',
  })),
  strengths: '',
  needsModification: '',
  majorAmendments: '',
  proposedTitle: '',
  proposedVariables: '',
  additionalSuggestions: '',
  decision: null,
  committeeMembers: [
    { id: '1', name: '', role: 'رئيس لجنة الحكم', signature: '' },
    { id: '2', name: '', role: 'عضو اللجنة ومحكّم', signature: '' },
    { id: '3', name: '', role: 'المشرف على الباحث', signature: '' },
  ],
});
