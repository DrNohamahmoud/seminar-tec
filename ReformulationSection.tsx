import React, { useState } from 'react';
import { Edit3, Layers, Lightbulb, Copy, ArrowRightLeft, Sparkles, Plus } from 'lucide-react';
import { ProposedReformulation } from '../types/seminar';
import { PHRASE_BANK } from '../data/phraseBank';

interface ReformulationSectionProps {
  reformulation: ProposedReformulation;
  originalTitle: string;
  onChange: (field: keyof ProposedReformulation, value: string) => void;
}

export const ReformulationSection: React.FC<ReformulationSectionProps> = ({
  reformulation,
  originalTitle,
  onChange,
}) => {
  const [showOriginalTitleDiff, setShowOriginalTitleDiff] = useState(false);
  const [activePhraseField, setActivePhraseField] = useState<keyof ProposedReformulation | null>(null);

  const copyOriginalToProposed = () => {
    if (originalTitle && !reformulation.proposedTitle) {
      onChange('proposedTitle', originalTitle);
    }
  };

  const insertPhrase = (field: keyof ProposedReformulation, phrase: string) => {
    const current = reformulation[field] || '';
    if (!current.trim()) {
      onChange(field, `• ${phrase}`);
    } else {
      onChange(field, `${current}\n• ${phrase}`);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-shadow hover:shadow-md">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
            ٤
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              رابعًا: الصياغة المقترحة بعد التعديل
            </h2>
            <p className="text-xs text-slate-300">
              صياغة العنوان المعتمد والمتغيرات والمقترحات التطويرية التوجيهية
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
          التوجيه الأكاديمي
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* 1. Proposed Title */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 font-['Cairo']">
              <Edit3 className="w-4 h-4 text-teal-600" />
              <span>العنوان المقترح من لجنة الحكم:</span>
            </label>
            <div className="flex items-center gap-2">
              {originalTitle && (
                <>
                  <button
                    type="button"
                    onClick={copyOriginalToProposed}
                    className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition flex items-center gap-1 cursor-pointer"
                    title="نسخ العنوان الأصلي هنا لتعديل أجزاء منه"
                  >
                    <Copy className="w-3 h-3 text-slate-500" />
                    <span>نسخ العنوان الأصلي للتعديل</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowOriginalTitleDiff(!showOriginalTitleDiff)}
                    className="text-xs font-semibold px-2 py-1 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowRightLeft className="w-3 h-3 text-teal-600" />
                    <span>{showOriginalTitleDiff ? 'إخفاء المقارنة' : 'مقارنة مع الأصلي'}</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Side-by-side comparison box */}
          {showOriginalTitleDiff && originalTitle && (
            <div className="mb-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 animate-fade-in">
              <div>
                <span className="font-bold text-slate-500 block mb-0.5">العنوان الأصلي المعروض:</span>
                <p className="text-slate-700 font-medium bg-white p-2.5 rounded border border-slate-200 line-through decoration-rose-400 decoration-2">
                  {originalTitle}
                </p>
              </div>
            </div>
          )}

          <textarea
            rows={3}
            value={reformulation.proposedTitle}
            onChange={(e) => onChange('proposedTitle', e.target.value)}
            placeholder="اكتب الصياغة البديلة أو المحسنة لعنوان الفكرة البحثية المقرة من لجنة السيمنار..."
            className="w-full text-sm sm:text-base p-3.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs font-semibold text-slate-800 leading-relaxed transition"
          />
        </div>

        {/* 2. Proposed Variables */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 font-['Cairo']">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>المتغيرات / العلاقة المقترحة:</span>
            </label>
            <button
              type="button"
              onClick={() =>
                setActivePhraseField(
                  activePhraseField === 'proposedVariables' ? null : 'proposedVariables'
                )
              }
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>أمثلة صياغة</span>
            </button>
          </div>

          {/* Quick Phrases for Variables */}
          {activePhraseField === 'proposedVariables' && (
            <div className="mb-3 p-3 bg-teal-50/50 rounded-xl border border-teal-200 shadow-sm animate-fade-in">
              <div className="text-xs font-bold text-teal-900 mb-2">
                انقر لاختيار قالب صياغة المتغيرات:
              </div>
              <div className="flex flex-col gap-1.5">
                {PHRASE_BANK.find((p) => p.field === 'proposedVariables')?.phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertPhrase('proposedVariables', phrase)}
                    className="text-xs text-right p-2 rounded bg-white hover:bg-teal-100/70 text-teal-900 border border-teal-200 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{phrase}</span>
                    <Plus className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            rows={3}
            value={reformulation.proposedVariables}
            onChange={(e) => onChange('proposedVariables', e.target.value)}
            placeholder="حدد المتغير المستقل، المتغير التابع، المتغير الوسيط/المعدل، ونوع العلاقة (ارتباطية، أثر، فاعلية، سببية)..."
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs leading-relaxed"
          />
        </div>

        {/* 3. Additional Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-900 font-['Cairo']">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>مقترحات إضافية من لجنة الحكم:</span>
            </label>
            <button
              type="button"
              onClick={() =>
                setActivePhraseField(
                  activePhraseField === 'additionalSuggestions' ? null : 'additionalSuggestions'
                )
              }
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>مقترحات شائعة</span>
            </button>
          </div>

          {/* Quick Phrases for Suggestions */}
          {activePhraseField === 'additionalSuggestions' && (
            <div className="mb-3 p-3 bg-amber-50/50 rounded-xl border border-amber-200 shadow-sm animate-fade-in">
              <div className="text-xs font-bold text-amber-900 mb-2">
                انقر لإدراج المقترح:
              </div>
              <div className="flex flex-col gap-1.5">
                {PHRASE_BANK.find((p) => p.field === 'additionalSuggestions')?.phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertPhrase('additionalSuggestions', phrase)}
                    className="text-xs text-right p-2 rounded bg-white hover:bg-amber-100/70 text-amber-950 border border-amber-200 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{phrase}</span>
                    <Plus className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            rows={3}
            value={reformulation.additionalSuggestions}
            onChange={(e) => onChange('additionalSuggestions', e.target.value)}
            placeholder="أي توصيات منهجية، مراجع موصى بها، أو توجيهات حول أدوات القياس وبناء الخطة التفصيلية..."
            className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
};
