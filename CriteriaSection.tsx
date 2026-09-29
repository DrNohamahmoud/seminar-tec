import React, { useState } from 'react';
import { CheckSquare, MessageSquare, ChevronDown, ChevronUp, Sparkles, HelpCircle } from 'lucide-react';
import { CriterionItem, ScoreValue } from '../types/seminar';
import { CRITERIA_QUICK_NOTES } from '../data/phraseBank';

interface CriteriaSectionProps {
  criteria: CriterionItem[];
  onScoreChange: (id: number, score: ScoreValue) => void;
  onNotesChange: (id: number, notes: string) => void;
}

export const CriteriaSection: React.FC<CriteriaSectionProps> = ({
  criteria,
  onScoreChange,
  onNotesChange,
}) => {
  const [expandedNotesId, setExpandedNotesId] = useState<number | null>(null);

  const toggleNotes = (id: number) => {
    setExpandedNotesId(prev => (prev === id ? null : id));
  };

  const addQuickNote = (id: number, noteText: string) => {
    const item = criteria.find(c => c.id === id);
    if (!item) return;

    if (!item.notes) {
      onNotesChange(id, noteText);
    } else if (!item.notes.includes(noteText)) {
      onNotesChange(id, `${item.notes}\n• ${noteText}`);
    }
  };

  const getScoreBadge = (score: ScoreValue) => {
    switch (score) {
      case 4:
        return 'bg-emerald-600 text-white font-bold';
      case 3:
        return 'bg-sky-600 text-white font-bold';
      case 2:
        return 'bg-amber-600 text-white font-bold';
      case 1:
        return 'bg-rose-600 text-white font-bold';
      default:
        return 'bg-slate-100 text-slate-400 border border-slate-200';
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-shadow hover:shadow-md">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
            ٢
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              ثانيًا: معايير تحكيم الفكرة البحثية
            </h2>
            <p className="text-xs text-slate-300">
              شبكة المعايير المنهجية والعلمية لتقييم المقترح البحثي (١٠ معايير)
            </p>
          </div>
        </div>

        {/* Rating Scale Legend */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] bg-slate-800/90 p-1.5 rounded-lg border border-slate-700">
          <span className="text-slate-400 px-1 font-semibold">مقياس التقدير:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            4 = مقبول جدًا
          </span>
          <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
            3 = مقبول
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
            2 = يحتاج إلى تعديل
          </span>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
            1 = غير مقبول
          </span>
        </div>
      </div>

      {/* Criteria Table Container */}
      <div className="p-4 sm:p-6 overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-xs font-bold border-b border-slate-300">
              <th className="py-3 px-3 w-12 text-center">م</th>
              <th className="py-3 px-4">معيار التحكيم العلمي والمنهجي</th>
              <th className="py-3 px-2 w-14 text-center text-emerald-800 bg-emerald-50/70">
                4<br />
                <span className="text-[10px] font-normal">مقبول جدًا</span>
              </th>
              <th className="py-3 px-2 w-14 text-center text-sky-800 bg-sky-50/70">
                3<br />
                <span className="text-[10px] font-normal">مقبول</span>
              </th>
              <th className="py-3 px-2 w-14 text-center text-amber-800 bg-amber-50/70">
                2<br />
                <span className="text-[10px] font-normal">يحتاج تعديل</span>
              </th>
              <th className="py-3 px-2 w-14 text-center text-rose-800 bg-rose-50/70">
                1<br />
                <span className="text-[10px] font-normal">غير مقبول</span>
              </th>
              <th className="py-3 px-4 w-72 sm:w-80">
                ملاحظات لجنة الحكم والتعديلات المقترحة
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {criteria.map((item) => {
              const quickNotes = CRITERIA_QUICK_NOTES[item.id] || [];
              const isNotesOpen = expandedNotesId === item.id || item.notes.length > 0;

              return (
                <tr
                  key={item.id}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    item.score === null ? 'bg-amber-50/20' : ''
                  }`}
                >
                  {/* Number */}
                  <td className="py-3.5 px-3 text-center font-bold text-slate-700">
                    <span className="w-6 h-6 rounded-full inline-flex items-center justify-center bg-slate-100 text-xs text-slate-800 font-black">
                      {item.id}
                    </span>
                  </td>

                  {/* Title & Guidance */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 font-['Cairo'] text-sm sm:text-base leading-snug">
                      {item.title}
                    </div>
                    {item.description && (
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.description}
                      </div>
                    )}
                  </td>

                  {/* Score 4: مقبول جدًا */}
                  <td className="py-3 px-2 text-center bg-emerald-50/20">
                    <button
                      type="button"
                      onClick={() => onScoreChange(item.id, 4)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all cursor-pointer font-extrabold text-sm ${
                        item.score === 4
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/30 scale-105'
                          : 'bg-white hover:bg-emerald-100/70 text-slate-600 border border-slate-200'
                      }`}
                      title="مقبول جدًا (4 درجات)"
                    >
                      {item.score === 4 ? '✓ 4' : '4'}
                    </button>
                  </td>

                  {/* Score 3: مقبول */}
                  <td className="py-3 px-2 text-center bg-sky-50/20">
                    <button
                      type="button"
                      onClick={() => onScoreChange(item.id, 3)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all cursor-pointer font-extrabold text-sm ${
                        item.score === 3
                          ? 'bg-sky-600 text-white shadow-md shadow-sky-700/30 scale-105'
                          : 'bg-white hover:bg-sky-100/70 text-slate-600 border border-slate-200'
                      }`}
                      title="مقبول (3 درجات)"
                    >
                      {item.score === 3 ? '✓ 3' : '3'}
                    </button>
                  </td>

                  {/* Score 2: يحتاج إلى تعديل */}
                  <td className="py-3 px-2 text-center bg-amber-50/20">
                    <button
                      type="button"
                      onClick={() => onScoreChange(item.id, 2)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all cursor-pointer font-extrabold text-sm ${
                        item.score === 2
                          ? 'bg-amber-600 text-white shadow-md shadow-amber-700/30 scale-105'
                          : 'bg-white hover:bg-amber-100/70 text-slate-600 border border-slate-200'
                      }`}
                      title="يحتاج إلى تعديل (درجتان)"
                    >
                      {item.score === 2 ? '✓ 2' : '2'}
                    </button>
                  </td>

                  {/* Score 1: غير مقبول */}
                  <td className="py-3 px-2 text-center bg-rose-50/20">
                    <button
                      type="button"
                      onClick={() => onScoreChange(item.id, 1)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center mx-auto transition-all cursor-pointer font-extrabold text-sm ${
                        item.score === 1
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-700/30 scale-105'
                          : 'bg-white hover:bg-rose-100/70 text-slate-600 border border-slate-200'
                      }`}
                      title="غير مقبول (درجة واحدة)"
                    >
                      {item.score === 1 ? '✓ 1' : '1'}
                    </button>
                  </td>

                  {/* Notes & Suggestions Column */}
                  <td className="py-3 px-4 align-top">
                    <div className="space-y-1.5">
                      <textarea
                        rows={isNotesOpen ? 2 : 1}
                        value={item.notes}
                        onChange={(e) => onNotesChange(item.id, e.target.value)}
                        placeholder="دون ملاحظاتك أو التعديلات المحددة لهذا المعيار..."
                        className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-2xs leading-relaxed"
                      />

                      {/* Quick suggested notes pill buttons */}
                      {quickNotes.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-[10px] text-slate-400 font-medium">اقتراحات:</span>
                          {quickNotes.map((qNote, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => addQuickNote(item.id, qNote)}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 border border-slate-200 transition cursor-pointer text-right truncate max-w-[200px]"
                              title={qNote}
                            >
                              + {qNote}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer info */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>انقر على الأرقام (1 إلى 4) لتقييم كل معيار، أو اكتب ملاحظات تفصيلية يستفيد منها الباحث.</span>
        </div>
        <div className="font-bold text-slate-700">
          المجموع الكلي: {criteria.reduce((s, c) => s + (c.score || 0), 0)} من 40
        </div>
      </div>
    </section>
  );
};
