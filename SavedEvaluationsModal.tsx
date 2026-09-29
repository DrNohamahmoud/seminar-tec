import React, { useRef } from 'react';
import { X, FolderArchive, Plus, Trash2, Calendar, User, FileText, Download, Upload, CheckCircle } from 'lucide-react';
import { SeminarEvaluation, DECISION_LABELS } from '../types/seminar';

interface SavedEvaluationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluations: SeminarEvaluation[];
  currentId: string;
  onSelectEvaluation: (id: string) => void;
  onDeleteEvaluation: (id: string) => void;
  onNewEvaluation: () => void;
  onExportAll: () => void;
  onImportFile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SavedEvaluationsModal: React.FC<SavedEvaluationsModalProps> = ({
  isOpen,
  onClose,
  evaluations,
  currentId,
  onSelectEvaluation,
  onDeleteEvaluation,
  onNewEvaluation,
  onExportAll,
  onImportFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FolderArchive className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg font-['Cairo']">
              سجل استمارات السيمنار المحفوظة
            </h3>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
              {evaluations.length} استمارة
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => {
              onNewEvaluation();
              onClose();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>استمارة جديدة لباحث آخر</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportAll}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
              title="تصدير جميع الاستمارات في ملف JSON للاحتفاظ بنسخة احتياطية"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>تصدير الكل (نسخ احتياطي)</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition cursor-pointer"
              title="استيراد استمارات من ملف JSON"
            >
              <Upload className="w-3.5 h-3.5 text-slate-500" />
              <span>استيراد ملف</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImportFile}
              accept=".json"
              className="hidden"
            />
          </div>
        </div>

        {/* Evaluations List */}
        <div className="p-6 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {evaluations.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <FolderArchive className="w-12 h-12 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">لا توجد استمارات محفوظة بعد.</p>
              <p className="text-xs text-slate-400 mt-1">
                املأ الاستمارة واضغط على "حفظ الاستمارة" في الشريط العلوي لتخزينها هنا.
              </p>
            </div>
          ) : (
            evaluations.map((item) => {
              const isCurrent = item.id === currentId;
              const totalScore = item.criteria.reduce((s, c) => s + (c.score || 0), 0);
              const decisionMeta = item.decision ? DECISION_LABELS[item.decision] : null;

              return (
                <div
                  key={item.id}
                  className={`pt-3 first:pt-0 flex items-start justify-between gap-3 p-3.5 rounded-xl border transition ${
                    isCurrent
                      ? 'border-teal-500 bg-teal-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div
                    onClick={() => {
                      onSelectEvaluation(item.id);
                      onClose();
                    }}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-slate-900 font-['Cairo']">
                        {item.basicInfo.researcherName || 'باحث بدون اسم'}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-600 text-white">
                          الاستمارة المعروضة حالياً
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 font-medium line-clamp-1 mb-2">
                      {item.basicInfo.proposalTitle || 'لم يُحدد عنوان الفكرة بعد'}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.basicInfo.seminarDate || 'بدون تاريخ'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-teal-700">الدرجة: {totalScore} / 40</span>
                      </div>
                      {decisionMeta && (
                        <span className={`px-2 py-0.5 rounded-md font-semibold text-[10px] ${decisionMeta.badgeClass}`}>
                          {decisionMeta.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 self-center">
                    <button
                      onClick={() => {
                        onSelectEvaluation(item.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 transition cursor-pointer"
                    >
                      فتح
                    </button>
                    {evaluations.length > 1 && (
                      <button
                        onClick={() => onDeleteEvaluation(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="حذف من السجل"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
