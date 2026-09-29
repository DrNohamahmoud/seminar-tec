import React from 'react';
import { X, Printer, Download, Eye } from 'lucide-react';
import { SeminarEvaluation } from '../types/seminar';
import { PrintableReport } from './PrintableReport';

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: SeminarEvaluation;
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  evaluation,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="no-print fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-300 overflow-hidden animate-fade-in my-auto">
        {/* Top Control Bar */}
        <div className="bg-slate-900 px-6 py-3.5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-base sm:text-lg font-['Cairo']">
              معاينة التقرير والمحضر الرسمي قبل الطباعة
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الآن / تصدير PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Note on printing */}
        <div className="bg-amber-50 px-6 py-2 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <span>
            💡 نصيحة: اختر <strong>"حفظ بتنسيق PDF"</strong> أو <strong>"Save as PDF"</strong> من نافذة الطباعة للحصول على ملف رسمي موقع ومؤرشف.
          </span>
          <span className="font-semibold text-amber-800 hidden sm:inline">مقاس A4 عمودي</span>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200/60 flex-1">
          <div className="bg-white shadow-lg mx-auto rounded-lg border border-slate-300 overflow-hidden">
            <PrintableReport evaluation={evaluation} />
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-300 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            الباحث: <strong>{evaluation.basicInfo.researcherName || 'غير محدد'}</strong> | تاريخ الجلسة: {evaluation.basicInfo.seminarDate}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
            >
              العودة للتحرير
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>بدء أمر الطباعة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
