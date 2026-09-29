import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { SeminarEvaluation, DECISION_LABELS } from '../types/seminar';

interface SummaryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: SeminarEvaluation;
}

export const SummaryShareModal: React.FC<SummaryShareModalProps> = ({
  isOpen,
  onClose,
  evaluation,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalScore = evaluation.criteria.reduce((s, c) => s + (c.score || 0), 0);
  const decisionLabel = evaluation.decision
    ? DECISION_LABELS[evaluation.decision].label
    : 'لم يتم اعتماد القرار بعد';

  const textSummary = `📋 *محضر تحكيم الفكرة البحثية بالسيمنار العلمي*
━━━━━━━━━━━━━━━━━━━━
🎓 *البيانات الأساسية:*
• اسم الباحث/الباحثة: ${evaluation.basicInfo.researcherName || '—'}
• الدرجة العلمية: ${evaluation.basicInfo.degree || '—'}
• التخصص: ${evaluation.basicInfo.specialization || '—'}
• تاريخ السيمنار: ${evaluation.basicInfo.seminarDate || '—'}
• عنوان الفكرة المعروضة: 
"${evaluation.basicInfo.proposalTitle || '—'}"

━━━━━━━━━━━━━━━━━━━━
⚖️ *نتائج التحكيم والتقييم:*
• مجموع درجات المعايير: ${totalScore} من 40 (${Math.round((totalScore / 40) * 100)}%)
• قرار لجنة الحكم بالسيمنار:
👉 *[ ${decisionLabel} ]*

━━━━━━━━━━━━━━━━━━━━
✨ *أهم نقاط القوة:*
${evaluation.committeeNotes.strengths || '—'}

⚠️ *النقاط التي تحتاج إلى تعديل:*
${evaluation.committeeNotes.needsModification || '—'}

🛠️ *التعديلات الجوهرية المقترحة:*
${evaluation.committeeNotes.majorAmendments || '—'}

━━━━━━━━━━━━━━━━━━━━
💡 *الصياغة المقترحة بعد التعديل:*
• العنوان المقترح:
"${evaluation.proposedReformulation.proposedTitle || '—'}"

• المتغيرات والعلاقة المقترحة:
${evaluation.proposedReformulation.proposedVariables || '—'}

• مقترحات وتوصيات إضافية:
${evaluation.proposedReformulation.additionalSuggestions || '—'}

━━━━━━━━━━━━━━━━━━━━
👥 *لجنة الحكم والمناقشة:*
${evaluation.members.map((m) => `• ${m.name} (${m.roleLabel})`).join('\n')}
━━━━━━━━━━━━━━━━━━━━
صدر عن أمانة السيمنار العلمي - ${evaluation.basicInfo.department || 'قسم تكنولوجيا التعليم'} (${evaluation.basicInfo.faculty ? evaluation.basicInfo.faculty : 'كلية الدراسات العليا'})`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-lg font-['Cairo']">
              ملخص تقرير السيمنار للمشاركة
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 overflow-y-auto">
          <p className="text-xs text-slate-500 mb-3">
            يمكنك نسخ هذا النص المنظم وإرساله مباشرة للباحث عبر البريد الإلكتروني أو الواتساب أو إدراجه في محضر جلسة القسم:
          </p>

          <pre className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-800 whitespace-pre-wrap leading-relaxed select-all">
            {textSummary}
          </pre>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {copied ? '✓ تم النسخ إلى الحافظة بنجاح' : 'انقر على الزر لنسخ التقرير'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition cursor-pointer"
            >
              إغلاق
            </button>
            <button
              onClick={copyToClipboard}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg text-white transition cursor-pointer ${
                copied ? 'bg-emerald-600' : 'bg-teal-600 hover:bg-teal-500'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'تم النسخ!' : 'نسخ التقرير بالكامل'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
