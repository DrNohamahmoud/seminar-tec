export interface SeminarBasicInfo {
  university: string;
  faculty: string;
  department: string;
  researcherName: string;
  degree: 'master' | 'phd' | 'diploma' | string;
  proposalTitle: string;
  specialization: string;
  seminarDate: string;
  supervisors: string;
  registrationNumber?: string;
}

export type ScoreValue = 1 | 2 | 3 | 4 | null;

export interface CriterionItem {
  id: number;
  title: string;
  description?: string;
  score: ScoreValue;
  notes: string;
}

export interface CommitteeNotes {
  strengths: string;
  needsModification: string;
  majorAmendments: string;
}

export interface ProposedReformulation {
  proposedTitle: string;
  proposedVariables: string;
  additionalSuggestions: string;
}

export type CommitteeDecision = 
  | 'suitable_current' 
  | 'suitable_minor_revisions' 
  | 'suitable_major_revisions' 
  | 'resubmit_reframe'
  | null;

export interface CommitteeMember {
  id: string;
  name: string;
  academicTitle: string; // أستاذ دكتور، أستاذ مشارك/مساعد، إلخ
  department: string;
  role: 'head' | 'member' | 'main_supervisor' | 'co_supervisor';
  roleLabel: string;
  isSigned: boolean;
}

export interface SeminarEvaluation {
  id: string;
  createdAt: string;
  updatedAt: string;
  basicInfo: SeminarBasicInfo;
  criteria: CriterionItem[];
  committeeNotes: CommitteeNotes;
  proposedReformulation: ProposedReformulation;
  decision: CommitteeDecision;
  members: CommitteeMember[];
}

export const INITIAL_CRITERIA: Omit<CriterionItem, 'score' | 'notes'>[] = [
  {
    id: 1,
    title: 'وضوح عنوان الفكرة ودقته واتساقه مع موضوع البحث',
    description: 'خلو العنوان من الغموض والإطالة، ودقة المصطلحات العلمية المستخدمة وتطابقها مع جوهر الدراسة',
  },
  {
    id: 2,
    title: 'حداثة الفكرة وأصالتها',
    description: 'تقديم إضافة معرفية نوعية وتجنب التكرار والاجترار للأبحاث السابقة',
  },
  {
    id: 3,
    title: 'وضوح المشكلة البحثية ومبررات دراستها',
    description: 'تحديد الإشكالية بدقة استناداً إلى شواهد واقعية ودراسات استطلاعية وأدبيات علمية رصينة',
  },
  {
    id: 4,
    title: 'وضوح الفجوة البحثية التي تستهدفها الدراسة',
    description: 'بيان ما توقفت عنده الأبحاث السابقة وما ستضيفه هذه الدراسة لمعالجة النقص القائم',
  },
  {
    id: 5,
    title: 'مناسبة المتغيرات والعلاقة بينها',
    description: 'سلامة تحديد المتغيرات المستقلة والتابعة والوسيطة ومنطقية العلاقات والنموذج المفاهيمي',
  },
  {
    id: 6,
    title: 'مناسبة الفئة المستهدفة وسياق التطبيق',
    description: 'ملاءمة مجتمع وعينة البحث وإمكانية الوصول إليهم وتطبيق أدوات القياس بموضوعية',
  },
  {
    id: 7,
    title: 'قابلية الفكرة للتطبيق والقياس',
    description: 'واقعية الإجراءات المنهجية، وتوفر أدوات القياس الصادقة وإمكانية تنفيذ البحث في المدى الزمني',
  },
  {
    id: 8,
    title: 'القيمة العلمية والتطبيقية المتوقعة',
    description: 'الفائدة المرجوة للميدان الأكاديمي والمجتمعي وإمكانية ترجمة النتائج إلى توصيات عملية',
  },
  {
    id: 9,
    title: 'إمكانية تطوير الفكرة إلى أسئلة/فروض بحثية واضحة',
    description: 'قابلية الفكرة للاشتقاق الإجرائي لأسئلة محددة وفروض قابلة للاختبار الإحصائي والميداني',
  },
  {
    id: 10,
    title: 'الاتساق العام للفكرة وإمكانية تطويرها إلى بحث علمي',
    description: 'الترابط المنطقي بين العنوان والمشكلة والأهداف والمنهج والقدرة على صياغة خطة بحث متكاملة',
  },
];

export const INITIAL_MEMBERS: CommitteeMember[] = [
  {
    id: 'm1',
    name: '',
    academicTitle: '',
    department: '',
    role: 'head',
    roleLabel: 'رئيس لجنة الحكم',
    isSigned: false,
  },
  {
    id: 'm2',
    name: '',
    academicTitle: '',
    department: '',
    role: 'member',
    roleLabel: 'عضو اللجنة ومحكّم',
    isSigned: false,
  },
  {
    id: 'm3',
    name: '',
    academicTitle: '',
    department: '',
    role: 'main_supervisor',
    roleLabel: 'المشرف على الباحث',
    isSigned: false,
  },
];

export const DECISION_LABELS: Record<NonNullable<CommitteeDecision>, {
  label: string;
  badgeClass: string;
  borderClass: string;
  bgLightClass: string;
  description: string;
  iconName: string;
}> = {
  suitable_current: {
    label: 'مقبولة بصورتها الحالية',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    borderClass: 'border-emerald-500 ring-2 ring-emerald-200',
    bgLightClass: 'bg-emerald-50/70',
    description: 'الفكرة البحثية مكتملة الأركان ومستوفية للشروط العلمية والمنهجية دون الحاجة لتعديلات جوهرية.',
    iconName: 'CheckCircle2',
  },
  suitable_minor_revisions: {
    label: 'مقبولة بعد إجراء تعديلات بسيطة',
    badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
    borderClass: 'border-sky-500 ring-2 ring-sky-200',
    bgLightClass: 'bg-sky-50/70',
    description: 'تعتمد الفكرة مع التزام الباحث بالأخذ بملاحظات اللجنة الموضحة دون الحاجة لإعادة العرض بالسيمنار.',
    iconName: 'HelpCircle',
  },
  suitable_major_revisions: {
    label: 'مقبولة بعد إجراء تعديلات جوهرية',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    borderClass: 'border-amber-500 ring-2 ring-amber-200',
    bgLightClass: 'bg-amber-50/70',
    description: 'تحتاج الفكرة لتعديلات محورية في المتغيرات أو المشكلة أو المنهج وتقديم تقرير موثق بالمراجعات للمشرف.',
    iconName: 'AlertTriangle',
  },
  resubmit_reframe: {
    label: 'إعادة صياغة الفكرة وعرضها مرة أخرى',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    borderClass: 'border-rose-500 ring-2 ring-rose-200',
    bgLightClass: 'bg-rose-50/70',
    description: 'الفكرة غير ناضجة بحثياً أو تفتقر إلى الجدة والوضوح، ويطلب من الباحث إعادة إعدادها للعرض بسيمنار قادم.',
    iconName: 'XCircle',
  },
};
