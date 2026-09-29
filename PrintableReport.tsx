import React from 'react';
import { SeminarEvaluation, DECISION_LABELS } from '../types/seminar';

interface PrintableReportProps {
  evaluation: SeminarEvaluation;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({ evaluation }) => {
  const { basicInfo, criteria, committeeNotes, proposedReformulation, decision, members } = evaluation;

  const totalScore = criteria.reduce((sum, c) => sum + (c.score || 0), 0);
  const percentage = Math.round((totalScore / 40) * 100);

  return (
    <div className="printable-report font-['Tajawal'] text-black bg-white p-6 sm:p-10 max-w-4xl mx-auto leading-normal">
      {/* Official Academic Header */}
      <div className="border-b-2 border-black pb-4 mb-6">
        <div className="flex items-center justify-between text-center text-xs font-bold text-black">
          <div className="text-right leading-tight">
            <div>جمهورية مصر العربية</div>
            <div>وزارة التعليم العالي والبحث العلمي</div>
            <div className="text-sm font-black mt-0.5">{basicInfo.university || 'الجامعة: ............................'}</div>
            <div>{basicInfo.faculty || 'الكلية: ............................'}</div>
            <div>{basicInfo.department || 'قسم تكنولوجيا التعليم'}</div>
          </div>

          {/* Academic Crest Simulation */}
          <div className="text-center px-4">
            <div className="w-16 h-16 mx-auto border-2 border-black rounded-full flex flex-col items-center justify-center p-1 font-bold">
              <span className="text-[10px] uppercase font-serif tracking-tighter">SEMINAR</span>
              <span className="text-xs font-black">سيمنار</span>
              <span className="text-[9px]">علمي</span>
            </div>
            <div className="text-[10px] mt-1 font-bold">حلقة البحث العلمي</div>
          </div>

          <div className="text-left leading-tight text-xs">
            <div>قطاع الدراسات العليا والبحوث</div>
            <div>لجنة السيمنار والمناقشة</div>
            <div>تاريخ الجلسة: <span className="font-mono">{basicInfo.seminarDate || '..../..../2026'}</span></div>
            {basicInfo.registrationNumber && (
              <div>رقم القيد: <span className="font-mono">{basicInfo.registrationNumber}</span></div>
            )}
          </div>
        </div>

        {/* Big Title */}
        <div className="text-center mt-5">
          <h1 className="text-xl sm:text-2xl font-black font-['Cairo'] text-black underline underline-offset-8 decoration-2">
            استمارة تحكيم الفكرة البحثية بالسيمنار
          </h1>
          <p className="text-xs font-semibold text-slate-700 mt-2">
            محضر تحكيم وتقييم مقترح بحثي لدرجة ({basicInfo.degree || 'الماجستير / الدكتوراه'})
          </p>
        </div>
      </div>

      {/* أولًا: البيانات الأساسية */}
      <div className="mb-6 print-break-inside-avoid">
        <div className="bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          أولًا: البيانات الأساسية
        </div>

        <div className="border border-black p-3.5 space-y-2 text-xs">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8 flex items-baseline">
              <span className="font-bold shrink-0">اسم الباحث/الباحثة:</span>
              <span className="mr-2 font-semibold border-b border-dotted border-black flex-1 pb-0.5">
                {basicInfo.researcherName || '...........................................................................................'}
              </span>
            </div>
            <div className="col-span-4 flex items-baseline">
              <span className="font-bold shrink-0">الدرجة:</span>
              <span className="mr-2 font-semibold border-b border-dotted border-black flex-1 pb-0.5">
                {basicInfo.degree || 'ماجستير'}
              </span>
            </div>
          </div>

          <div className="flex items-baseline">
            <span className="font-bold shrink-0">عنوان الفكرة البحثية:</span>
            <span className="mr-2 font-bold text-sm border-b border-dotted border-black flex-1 pb-0.5 leading-relaxed">
              {basicInfo.proposalTitle || '.........................................................................................................................................................'}
            </span>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6 flex items-baseline">
              <span className="font-bold shrink-0">التخصص:</span>
              <span className="mr-2 font-semibold border-b border-dotted border-black flex-1 pb-0.5">
                {basicInfo.specialization || '....................................................................'}
              </span>
            </div>
            <div className="col-span-6 flex items-baseline">
              <span className="font-bold shrink-0">تاريخ السيمنار:</span>
              <span className="mr-2 font-semibold border-b border-dotted border-black flex-1 pb-0.5">
                {basicInfo.seminarDate || '.... / .... / 2026 م'}
              </span>
            </div>
          </div>

          {basicInfo.supervisors && (
            <div className="flex items-baseline">
              <span className="font-bold shrink-0">لجنة الإشراف:</span>
              <span className="mr-2 font-medium border-b border-dotted border-black flex-1 pb-0.5">
                {basicInfo.supervisors}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ثانيًا: معايير تحكيم الفكرة البحثية */}
      <div className="mb-6 print-break-inside-avoid">
        <div className="flex items-center justify-between bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          <span>ثانيًا: معايير تحكيم الفكرة البحثية</span>
          <span className="text-[11px] font-normal">
            مقياس التقدير: 4 = مقبول جدًا | 3 = مقبول | 2 = يحتاج إلى تعديل | 1 = غير مقبول
          </span>
        </div>

        <table className="w-full text-right border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-50 print-bg-gray border-b border-black text-center font-bold">
              <th className="border border-black py-1.5 px-1 w-8">م</th>
              <th className="border border-black py-1.5 px-2 text-right">معيار التحكيم</th>
              <th className="border border-black py-1.5 px-1 w-10">4</th>
              <th className="border border-black py-1.5 px-1 w-10">3</th>
              <th className="border border-black py-1.5 px-1 w-10">2</th>
              <th className="border border-black py-1.5 px-1 w-10">1</th>
              <th className="border border-black py-1.5 px-2 w-72 text-right">ملاحظات لجنة الحكم والتعديلات المقترحة</th>
            </tr>
          </thead>
          <tbody>
            {criteria.map((item) => (
              <tr key={item.id} className="border-b border-black">
                <td className="border border-black py-1.5 px-1 text-center font-bold">{item.id}</td>
                <td className="border border-black py-1.5 px-2 font-medium">
                  {item.title}
                </td>
                <td className="border border-black py-1.5 px-1 text-center font-bold">
                  {item.score === 4 ? '☑' : '☐'}
                </td>
                <td className="border border-black py-1.5 px-1 text-center font-bold">
                  {item.score === 3 ? '☑' : '☐'}
                </td>
                <td className="border border-black py-1.5 px-1 text-center font-bold">
                  {item.score === 2 ? '☑' : '☐'}
                </td>
                <td className="border border-black py-1.5 px-1 text-center font-bold">
                  {item.score === 1 ? '☑' : '☐'}
                </td>
                <td className="border border-black py-1 px-2 text-[11px] leading-snug">
                  {item.notes || '—'}
                </td>
              </tr>
            ))}
            {/* Total Row */}
            <tr className="bg-slate-100 print-bg-gray font-bold border-t-2 border-black">
              <td colSpan={2} className="border border-black py-1.5 px-3 text-left">
                المجموع الكلي للدرجات:
              </td>
              <td colSpan={4} className="border border-black py-1.5 px-1 text-center text-sm font-black">
                {totalScore} / 40 ({percentage}%)
              </td>
              <td className="border border-black py-1.5 px-2 text-xs">
                {totalScore >= 36
                  ? 'تقدير ممتاز - مستوفية تماماً'
                  : totalScore >= 30
                  ? 'تقدير جيد جداً - مقبولة'
                  : totalScore >= 24
                  ? 'تقدير متوسط - تحتاج تعديلات'
                  : 'دون المستوى المطلوب (غير مقبولة)'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ثالثًا: ملاحظات لجنة الحكم */}
      <div className="mb-6 print-break-inside-avoid">
        <div className="bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          ثالثًا: ملاحظات لجنة الحكم
        </div>

        <div className="border border-black p-3 space-y-3 text-xs">
          <div>
            <div className="font-bold mb-1">أهم نقاط القوة في الفكرة:</div>
            <div className="p-2 border border-dotted border-black min-h-[45px] whitespace-pre-line leading-relaxed font-medium">
              {committeeNotes.strengths || '...................................................................................................................................................................'}
            </div>
          </div>

          <div>
            <div className="font-bold mb-1">أهم النقاط التي تحتاج إلى تعديل:</div>
            <div className="p-2 border border-dotted border-black min-h-[45px] whitespace-pre-line leading-relaxed font-medium">
              {committeeNotes.needsModification || '...................................................................................................................................................................'}
            </div>
          </div>

          <div>
            <div className="font-bold mb-1">التعديلات الجوهرية المقترحة:</div>
            <div className="p-2 border border-dotted border-black min-h-[55px] whitespace-pre-line leading-relaxed font-medium">
              {committeeNotes.majorAmendments || '...................................................................................................................................................................\n...................................................................................................................................................................'}
            </div>
          </div>
        </div>
      </div>

      {/* رابعًا: الصياغة المقترحة بعد التعديل */}
      <div className="mb-6 print-break-inside-avoid">
        <div className="bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          رابعًا: الصياغة المقترحة بعد التعديل
        </div>

        <div className="border border-black p-3 space-y-3 text-xs">
          <div>
            <div className="font-bold mb-1">العنوان المقترح:</div>
            <div className="p-2 border border-dotted border-black min-h-[38px] font-bold text-sm whitespace-pre-line leading-relaxed">
              {proposedReformulation.proposedTitle || '...................................................................................................................................................................'}
            </div>
          </div>

          <div>
            <div className="font-bold mb-1">المتغيرات/العلاقة المقترحة:</div>
            <div className="p-2 border border-dotted border-black min-h-[38px] whitespace-pre-line leading-relaxed font-medium">
              {proposedReformulation.proposedVariables || '...................................................................................................................................................................'}
            </div>
          </div>

          <div>
            <div className="font-bold mb-1">مقترحات إضافية من لجنة الحكم:</div>
            <div className="p-2 border border-dotted border-black min-h-[38px] whitespace-pre-line leading-relaxed font-medium">
              {proposedReformulation.additionalSuggestions || '...................................................................................................................................................................'}
            </div>
          </div>
        </div>
      </div>

      {/* خامسًا: قرار لجنة الحكم بالسيمنار */}
      <div className="mb-6 print-break-inside-avoid">
        <div className="bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          خامسًا: قرار لجنة الحكم بالسيمنار
        </div>

        <div className="border border-black p-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-2 border rounded flex items-center gap-2 ${decision === 'suitable_current' ? 'border-black font-black bg-slate-100 print-bg-gray' : 'border-slate-300'}`}>
              <span className="text-base">{decision === 'suitable_current' ? '☑' : '☐'}</span>
              <span>مقبولة بصورتها الحالية</span>
            </div>

            <div className={`p-2 border rounded flex items-center gap-2 ${decision === 'suitable_minor_revisions' ? 'border-black font-black bg-slate-100 print-bg-gray' : 'border-slate-300'}`}>
              <span className="text-base">{decision === 'suitable_minor_revisions' ? '☑' : '☐'}</span>
              <span>مقبولة بعد إجراء تعديلات بسيطة</span>
            </div>

            <div className={`p-2 border rounded flex items-center gap-2 ${decision === 'suitable_major_revisions' ? 'border-black font-black bg-slate-100 print-bg-gray' : 'border-slate-300'}`}>
              <span className="text-base">{decision === 'suitable_major_revisions' ? '☑' : '☐'}</span>
              <span>مقبولة بعد إجراء تعديلات جوهرية</span>
            </div>

            <div className={`p-2 border rounded flex items-center gap-2 ${decision === 'resubmit_reframe' ? 'border-black font-black bg-slate-100 print-bg-gray' : 'border-slate-300'}`}>
              <span className="text-base">{decision === 'resubmit_reframe' ? '☑' : '☐'}</span>
              <span>إعادة صياغة الفكرة وعرضها مرة أخرى</span>
            </div>
          </div>
        </div>
      </div>

      {/* أعضاء لجنة الحكم بالسيمنار والتوقيعات */}
      <div className="print-break-inside-avoid">
        <div className="bg-slate-100 print-bg-gray border border-black px-3 py-1.5 font-bold text-sm font-['Cairo'] mb-2">
          أعضاء لجنة الحكم بالسيمنار
        </div>

        <table className="w-full text-right border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-slate-50 print-bg-gray border-b border-black text-center font-bold">
              <th className="border border-black py-1.5 px-2 w-8">م</th>
              <th className="border border-black py-1.5 px-3">الاسم واللقب العلمي</th>
              <th className="border border-black py-1.5 px-3">الكلية والجامعة</th>
              <th className="border border-black py-1.5 px-3 w-36">الصفة باللجنة</th>
              <th className="border border-black py-1.5 px-3 w-32 text-center">التوقيع</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr key={m.id} className="border-b border-black">
                <td className="border border-black py-2 px-2 text-center font-bold">{idx + 1}</td>
                <td className="border border-black py-2 px-3 font-bold">{m.name}</td>
                <td className="border border-black py-2 px-3">{m.department}</td>
                <td className="border border-black py-2 px-3 font-semibold">{m.roleLabel}</td>
                <td className="border border-black py-2 px-3 text-center font-['Amiri'] italic font-bold">
                  {m.isSigned ? 'مُعتمد إلكترونياً' : '......................'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Official Endorsement Signatures at the bottom */}
        <div className="grid grid-cols-3 gap-6 mt-8 text-center text-xs font-bold pt-4 border-t border-slate-300">
          <div>
            <div>مقرر السيمنار العلمي</div>
            <div className="mt-8 font-normal">................................</div>
          </div>
          <div>
            <div>رئيس لجنة الحكم والمناقشة</div>
            <div className="mt-8 font-normal font-['Amiri'] italic font-bold">
              {members.find(m => m.role === 'head')?.name || '................................'}
            </div>
          </div>
          <div>
            <div>يعتمد، رئيس قسم تكنولوجيا التعليم</div>
            <div className="mt-8 font-normal">أ.د. ................................</div>
          </div>
        </div>
      </div>
    </div>
  );
};
