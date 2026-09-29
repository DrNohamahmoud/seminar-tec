import React from 'react';
import { CheckCircle2, HelpCircle, AlertTriangle, XCircle, Gavel } from 'lucide-react';
import { CommitteeDecision, DECISION_LABELS } from '../types/seminar';

interface DecisionSectionProps {
  decision: CommitteeDecision;
  onChange: (decision: CommitteeDecision) => void;
}

export const DecisionSection: React.FC<DecisionSectionProps> = ({ decision, onChange }) => {
  const options: {
    value: NonNullable<CommitteeDecision>;
    icon: React.ReactNode;
    color: string;
    borderActive: string;
    bgActive: string;
    description: string;
  }[] = [
    {
      value: 'suitable_current',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      color: 'text-emerald-900',
      borderActive: 'border-emerald-600 ring-2 ring-emerald-200',
      bgActive: 'bg-emerald-50/80',
      description: 'الفكرة مستوفية للشروط العلمية والمنهجية وتعتمد للشروع في إعداد الخطة.',
    },
    {
      value: 'suitable_minor_revisions',
      icon: <HelpCircle className="w-5 h-5 text-sky-600 shrink-0" />,
      color: 'text-sky-900',
      borderActive: 'border-sky-600 ring-2 ring-sky-200',
      bgActive: 'bg-sky-50/80',
      description: 'تعتمد الفكرة مع استيفاء التعديلات البسيطة الموضحة بإشراف المشرف العلمي.',
    },
    {
      value: 'suitable_major_revisions',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
      color: 'text-amber-900',
      borderActive: 'border-amber-600 ring-2 ring-amber-200',
      bgActive: 'bg-amber-50/80',
      description: 'تتطلب تعديلات جوهرية في المتغيرات أو المشكلة وموافقة اللجنة عليها.',
    },
    {
      value: 'resubmit_reframe',
      icon: <XCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      color: 'text-rose-900',
      borderActive: 'border-rose-600 ring-2 ring-rose-200',
      bgActive: 'bg-rose-50/80',
      description: 'الفكرة غير ناضجة وتستدعي إعادة صياغة شاملة والعرض في سيمنار قادم.',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-shadow hover:shadow-md">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
            ٥
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              خامسًا: قرار لجنة الحكم بالسيمنار
            </h2>
            <p className="text-xs text-slate-300">
              القرار النهائي المعتمد بإجماع أو أغلبية أعضاء لجنة السيمنار
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded bg-slate-800 text-teal-300 border border-slate-700">
          <Gavel className="w-3.5 h-3.5" />
          <span>قرار رسمي</span>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((opt) => {
            const isSelected = decision === opt.value;
            const meta = DECISION_LABELS[opt.value];

            return (
              <div
                key={opt.value}
                onClick={() => onChange(opt.value)}
                className={`p-4 sm:p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? `${opt.borderActive} ${opt.bgActive} shadow-md`
                    : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-start gap-3.5 mb-2">
                  <div className="mt-0.5">{opt.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-base font-bold font-['Cairo'] ${isSelected ? opt.color : 'text-slate-800'}`}>
                        {meta.label}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-teal-600 bg-teal-600'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {opt.description}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-teal-800 font-semibold">
                    <span>✓ تم اعتماد هذا القرار كقرار رسمي للجنة</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-teal-200">
                      معتمد في المحضر
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Clear selection option */}
        {decision && (
          <div className="mt-4 text-left">
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs text-slate-400 hover:text-rose-600 transition underline cursor-pointer"
            >
              إلغاء تحديد القرار الحالي
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
