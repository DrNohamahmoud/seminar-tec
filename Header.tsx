import React from 'react';
import { 
  FileCheck2, 
  Printer, 
  Save, 
  Sparkles, 
  PlusCircle, 
  FolderArchive, 
  Share2, 
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { SeminarEvaluation } from '../types/seminar';

interface HeaderProps {
  evaluation: SeminarEvaluation;
  onSave: () => void;
  onReset: () => void;
  onOpenSavedModal: () => void;
  onOpenShareModal: () => void;
  onPrint: () => void;
  saveSuccessMessage?: string | null;
  completionCount: number;
  totalScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  evaluation,
  onSave,
  onReset,
  onOpenSavedModal,
  onOpenShareModal,
  onPrint,
  saveSuccessMessage,
  completionCount,
  totalScore,
}) => {
  return (
    <header className="no-print bg-slate-900 text-white shadow-xl sticky top-0 z-40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-teal-950/40 shrink-0 ring-2 ring-teal-300/30">
              <FileCheck2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Cairo']">
                  استمارة تحكيم الفكرة البحثية بالسيمنار
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {evaluation.basicInfo.department || 'قسم تكنولوجيا التعليم'} - {evaluation.basicInfo.faculty || 'كلية الدراسات العليا'}
              </p>
            </div>
          </div>

          {/* Quick Stats in Header */}
          <div className="hidden lg:flex items-center gap-4 bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700/60 text-xs">
            <div className="text-center">
              <div className="text-slate-400 font-medium">اكتمال المعايير</div>
              <div className="font-bold text-sm text-amber-300">
                {completionCount} / 10
              </div>
            </div>
            <div className="w-px h-8 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-slate-400 font-medium">مجموع الدرجات</div>
              <div className="font-black text-sm text-emerald-400">
                {totalScore} / 40
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={onSave}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-950/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="حفظ الاستمارة الحالية في المتصفح"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الاستمارة</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-950/30 hover:scale-[1.02] active:scale-95 cursor-pointer"
              title="طباعة التقرير الأكاديمي الرسمي أو حفظه كـ PDF"
            >
              <Printer className="w-4 h-4" />
              <span>معاينة وطباعة</span>
            </button>

            <button
              onClick={onOpenShareModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="نسخ تقرير ملخص لإرساله للباحث أو اللجنة"
            >
              <Share2 className="w-4 h-4 text-teal-400" />
              <span className="hidden sm:inline">مشاركة</span>
            </button>

            <button
              onClick={onOpenSavedModal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="عرض الاستمارات المحفوظة لجلسة السيمنار"
            >
              <FolderArchive className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">السجلات</span>
            </button>

            <div className="h-6 w-px bg-slate-700 mx-1 hidden sm:block"></div>

            <button
              onClick={onReset}
              className="flex items-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg bg-slate-800/80 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 border border-slate-700/60 transition cursor-pointer"
              title="إفراغ الاستمارة والبدء من جديد"
            >
              <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
              <span>استمارة جديدة فارغة</span>
            </button>
          </div>
        </div>

        {/* Save confirmation toast */}
        {saveSuccessMessage && (
          <div className="mt-2 py-1.5 px-3 rounded-lg bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{saveSuccessMessage}</span>
          </div>
        )}
      </div>
    </header>
  );
};
