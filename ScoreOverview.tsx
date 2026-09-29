import React from 'react';
import { Award, CheckCircle, AlertCircle, BarChart3, Wand2 } from 'lucide-react';
import { CriterionItem, ScoreValue } from '../types/seminar';

interface ScoreOverviewProps {
  criteria: CriterionItem[];
  onQuickFillScore: (score: ScoreValue) => void;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ criteria, onQuickFillScore }) => {
  const completedCount = criteria.filter(c => c.score !== null).length;
  const totalScore = criteria.reduce((sum, c) => sum + (c.score || 0), 0);
  const maxPossibleScore = 40;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Determine qualitative tier
  let gradeTier = {
    label: 'قيد التقييم',
    color: 'text-slate-500',
    bgColor: 'bg-slate-100',
    borderColor: 'border-slate-300',
    description: 'يرجى استكمال تقييم كافة المعايير العشرة',
  };

  if (completedCount > 0) {
    if (totalScore >= 36) {
      gradeTier = {
        label: 'ممتاز (مستوفية ومقبولة جداً)',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-300',
        description: 'الفكرة البحثية واعدة ومحكمة وتتسم بالأصالة والاتساق المنهجي العالي',
      };
    } else if (totalScore >= 30) {
      gradeTier = {
        label: 'جيد جداً (مقبولة)',
        color: 'text-sky-700',
        bgColor: 'bg-sky-50',
        borderColor: 'border-sky-300',
        description: 'الفكرة متماسكة ومقبولة وتتطلب تعديلات إجرائية طفيفة',
      };
    } else if (totalScore >= 24) {
      gradeTier = {
        label: 'متوسط (تحتاج تعديلات جوهرية)',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-300',
        description: 'الفكرة بحاجة إلى إعادة ضبط المتغيرات أو الفجوة البحثية وصياغة أدق',
      };
    } else {
      gradeTier = {
        label: 'غير مقبولة (دون المستوى المطلوب)',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-300',
        description: 'تفتقر الفكرة إلى مقومات البحث العلمي الرصين وتستدعي إعادة صياغة جذرية',
      };
    }
  }

  // Count by score
  const counts = {
    4: criteria.filter(c => c.score === 4).length,
    3: criteria.filter(c => c.score === 3).length,
    2: criteria.filter(c => c.score === 2).length,
    1: criteria.filter(c => c.score === 1).length,
  };

  return (
    <div className="no-print bg-white rounded-2xl border border-slate-200/80 shadow-sm p-4 sm:p-5 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Main Score & Progress */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="relative flex items-center justify-center">
            {/* Circular badge */}
            <div className={`w-20 h-20 sm:w-22 sm:h-22 rounded-2xl flex flex-col items-center justify-center border-2 ${gradeTier.borderColor} ${gradeTier.bgColor} shadow-inner`}>
              <span className="text-2xl sm:text-3xl font-black font-['Cairo'] text-slate-800 leading-tight">
                {totalScore}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">من {maxPossibleScore}</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                نسبة الإنجاز: {percentage}%
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${gradeTier.borderColor} ${gradeTier.bgColor} ${gradeTier.color}`}>
                {gradeTier.label}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-['Cairo']">
              المؤشر الإجمالي لتحكيم الفكرة البحثية
            </h3>
            <p className="text-xs text-slate-500 max-w-md">
              {gradeTier.description}
            </p>
          </div>
        </div>

        {/* Breakdown by Score rating */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>مقبول جدًا (4):</span>
            <span className="font-extrabold">{counts[4]}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-100/70 text-sky-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-600"></span>
            <span>مقبول (3):</span>
            <span className="font-extrabold">{counts[3]}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
            <span>يحتاج تعديل (2):</span>
            <span className="font-extrabold">{counts[2]}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-100/70 text-rose-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-600"></span>
            <span>غير مقبول (1):</span>
            <span className="font-extrabold">{counts[1]}</span>
          </div>
        </div>

        {/* Quick batch fill helper */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Wand2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[11px] font-medium hidden sm:inline">تعبئة سريعة للمحكّم:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onQuickFillScore(4)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 transition font-semibold text-[11px] cursor-pointer"
              title="تعيين جميع المعايير على (مقبول جدًا - 4)"
            >
              الكل (4)
            </button>
            <button
              onClick={() => onQuickFillScore(3)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-200 border border-slate-200 transition font-semibold text-[11px] cursor-pointer"
              title="تعيين جميع المعايير على (مقبول - 3)"
            >
              الكل (3)
            </button>
            <button
              onClick={() => onQuickFillScore(null)}
              className="px-2 py-1 rounded bg-slate-100 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 transition font-semibold text-[11px] cursor-pointer"
              title="إفراغ تقييم جميع المعايير"
            >
              إلغاء التحديد
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar across 10 criteria */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-medium">اكتمال التقييم:</span>
          <span className="font-bold text-slate-800">{completedCount} من 10 معايير تم تحكيمها</span>
        </div>
        <div className="w-1/2 sm:w-1/3 bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              completedCount === 10 ? 'bg-emerald-500' : 'bg-teal-600'
            }`}
            style={{ width: `${(completedCount / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
