import React, { useState } from 'react';
import { ThumbsUp, AlertCircle, AlertTriangle, Sparkles, Plus, Check } from 'lucide-react';
import { CommitteeNotes } from '../types/seminar';
import { PHRASE_BANK } from '../data/phraseBank';

interface CommitteeNotesSectionProps {
  notes: CommitteeNotes;
  onChange: (field: keyof CommitteeNotes, value: string) => void;
}

export const CommitteeNotesSection: React.FC<CommitteeNotesSectionProps> = ({ notes, onChange }) => {
  const [activePhraseModalField, setActivePhraseModalField] = useState<keyof CommitteeNotes | null>(null);

  const insertPhrase = (field: keyof CommitteeNotes, phrase: string) => {
    const current = notes[field] || '';
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
            ٣
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              ثالثًا: ملاحظات لجنة الحكم
            </h2>
            <p className="text-xs text-slate-300">
              رصد نقاط القوة، والجوانب التي تتطلب معالجة، والتعديلات الجوهرية
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
          التغذية الراجعة النوعية
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* 1. Strengths */}
        <div className="bg-emerald-50/40 rounded-xl p-4 sm:p-5 border border-emerald-200/80">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-950 font-['Cairo']">
              <ThumbsUp className="w-4 h-4 text-emerald-600" />
              <span>أهم نقاط القوة في الفكرة:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setActivePhraseModalField(
                    activePhraseModalField === 'strengths' ? null : 'strengths'
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border border-emerald-300 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>عبارات جاهزة</span>
              </button>
            </div>
          </div>

          {/* Quick Phrases Drawer for Strengths */}
          {activePhraseModalField === 'strengths' && (
            <div className="mb-3 p-3 bg-white rounded-lg border border-emerald-300 shadow-sm animate-fade-in">
              <div className="text-xs font-bold text-emerald-900 mb-2">
                انقر على العبارة لإدراجها في نقاط القوة:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PHRASE_BANK.find((p) => p.field === 'strengths')?.phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertPhrase('strengths', phrase)}
                    className="text-xs text-right p-2 rounded-md bg-emerald-50 hover:bg-emerald-100/90 text-emerald-900 border border-emerald-200 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{phrase}</span>
                    <Plus className="w-3 h-3 text-emerald-700 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            rows={3}
            value={notes.strengths}
            onChange={(e) => onChange('strengths', e.target.value)}
            placeholder="حدد أبرز الجوانب المنهجية والنظرية والتطبيقية المتميزة في الفكرة البحثية المعروضة..."
            className="w-full text-sm p-3 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white shadow-2xs leading-relaxed"
          />
        </div>

        {/* 2. Needs Modification */}
        <div className="bg-sky-50/40 rounded-xl p-4 sm:p-5 border border-sky-200/80">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-sky-950 font-['Cairo']">
              <AlertCircle className="w-4 h-4 text-sky-600" />
              <span>أهم النقاط التي تحتاج إلى تعديل:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setActivePhraseModalField(
                    activePhraseModalField === 'needsModification' ? null : 'needsModification'
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                <span>عبارات جاهزة</span>
              </button>
            </div>
          </div>

          {/* Quick Phrases Drawer for Needs Modification */}
          {activePhraseModalField === 'needsModification' && (
            <div className="mb-3 p-3 bg-white rounded-lg border border-sky-300 shadow-sm animate-fade-in">
              <div className="text-xs font-bold text-sky-900 mb-2">
                انقر على العبارة لإدراجها في النقاط التي تحتاج لتعديل:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PHRASE_BANK.find((p) => p.field === 'needsModification')?.phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertPhrase('needsModification', phrase)}
                    className="text-xs text-right p-2 rounded-md bg-sky-50 hover:bg-sky-100/90 text-sky-900 border border-sky-200 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{phrase}</span>
                    <Plus className="w-3 h-3 text-sky-700 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            rows={3}
            value={notes.needsModification}
            onChange={(e) => onChange('needsModification', e.target.value)}
            placeholder="بين الملاحظات الإجرائية والتنسيقية والمفاهيمية التي يلزم الباحث تداركها..."
            className="w-full text-sm p-3 rounded-lg border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white shadow-2xs leading-relaxed"
          />
        </div>

        {/* 3. Major Amendments */}
        <div className="bg-amber-50/50 rounded-xl p-4 sm:p-5 border border-amber-300">
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-2 text-sm sm:text-base font-bold text-amber-950 font-['Cairo']">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>التعديلات الجوهرية المقترحة:</span>
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setActivePhraseModalField(
                    activePhraseModalField === 'majorAmendments' ? null : 'majorAmendments'
                  )
                }
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>عبارات جاهزة</span>
              </button>
            </div>
          </div>

          {/* Quick Phrases Drawer for Major Amendments */}
          {activePhraseModalField === 'majorAmendments' && (
            <div className="mb-3 p-3 bg-white rounded-lg border border-amber-300 shadow-sm animate-fade-in">
              <div className="text-xs font-bold text-amber-950 mb-2">
                انقر على العبارة لإدراجها في التعديلات الجوهرية:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PHRASE_BANK.find((p) => p.field === 'majorAmendments')?.phrases.map((phrase, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertPhrase('majorAmendments', phrase)}
                    className="text-xs text-right p-2 rounded-md bg-amber-50 hover:bg-amber-100/90 text-amber-950 border border-amber-200 transition cursor-pointer flex items-center justify-between gap-2"
                  >
                    <span>{phrase}</span>
                    <Plus className="w-3 h-3 text-amber-700 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <textarea
            rows={4}
            value={notes.majorAmendments}
            onChange={(e) => onChange('majorAmendments', e.target.value)}
            placeholder="التعديلات الأساسية في المنهج، المتغيرات، الفروض، أو العينة التي تعد شرطاً للسير في البحث..."
            className="w-full text-sm p-3 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white shadow-2xs leading-relaxed"
          />
        </div>
      </div>
    </section>
  );
};
