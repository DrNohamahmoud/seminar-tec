import React from 'react';
import { User, BookOpen, GraduationCap, Calendar, Users, Building, Hash, Sparkles } from 'lucide-react';
import { SeminarBasicInfo } from '../types/seminar';

interface BasicInfoSectionProps {
  info: SeminarBasicInfo;
  onChange: (field: keyof SeminarBasicInfo, value: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ info, onChange }) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-shadow hover:shadow-md">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
            ١
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              أولًا: البيانات الأساسية
            </h2>
            <p className="text-xs text-slate-300">
              بيانات الباحث وموضوع الفكرة وتفاصيل جلسة السيمنار العلمي
            </p>
          </div>
        </div>

        <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-block">
          معلومات الجلسة
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Academic Institution Row */}
        <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-600">
            <Building className="w-4 h-4 text-teal-600" />
            <span>الجهة الأكاديمية المنظمة للسيمنار:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                الجامعة
              </label>
              <input
                type="text"
                value={info.university}
                onChange={e => onChange('university', e.target.value)}
                placeholder="مثال: جامعة القاهرة"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                الكلية / المعهد
              </label>
              <input
                type="text"
                value={info.faculty}
                onChange={e => onChange('faculty', e.target.value)}
                placeholder="مثال: كلية الدراسات العليا للتربية"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                القسم العلمي
              </label>
              <input
                type="text"
                value={info.department}
                onChange={e => onChange('department', e.target.value)}
                placeholder="مثال: قسم تكنولوجيا التعليم"
                className="w-full text-sm px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white transition"
              />
            </div>
          </div>
        </div>

        {/* Primary Researcher Information */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Researcher Name */}
          <div className="md:col-span-6">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <User className="w-4 h-4 text-teal-600" />
              <span>اسم الباحث / الباحثة</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              type="text"
              value={info.researcherName}
              onChange={e => onChange('researcherName', e.target.value)}
              placeholder="اكتب اسم الباحث/الباحثة ثلاثياً أو رباعياً..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>

          {/* Degree */}
          <div className="md:col-span-3">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>الدرجة العلمية</span>
            </label>
            <input
              type="text"
              value={info.degree}
              onChange={e => onChange('degree', e.target.value)}
              placeholder="مثال: ماجستير / دكتوراه"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>

          {/* Seminar Date */}
          <div className="md:col-span-3">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>تاريخ السيمنار</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              type="date"
              value={info.seminarDate}
              onChange={e => onChange('seminarDate', e.target.value)}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>
        </div>

        {/* Specialization & Supervisors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Specialization */}
          <div className="md:col-span-6">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>التخصص الدقيق / العام</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <input
              type="text"
              value={info.specialization}
              onChange={e => onChange('specialization', e.target.value)}
              placeholder="مثال: تكنولوجيا التعليم / إدارة تربوية / علم النفس التربوي..."
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>

          {/* Supervisors */}
          <div className="md:col-span-4">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <Users className="w-4 h-4 text-teal-600" />
              <span>لجنة الإشراف (إن وجدت)</span>
            </label>
            <input
              type="text"
              value={info.supervisors}
              onChange={e => onChange('supervisors', e.target.value)}
              placeholder="مثال: أ.د. فلان الفلاني، د. فلان الفلاني"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>

          {/* Registration Number */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-1.5 font-['Cairo']">
              <Hash className="w-4 h-4 text-teal-600" />
              <span>رقم القيد / الملف</span>
            </label>
            <input
              type="text"
              value={info.registrationNumber || ''}
              onChange={e => onChange('registrationNumber', e.target.value)}
              placeholder="مثال: 11482"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs transition"
            />
          </div>
        </div>

        {/* Research Proposal Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800 font-['Cairo']">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>عنوان الفكرة البحثية المعروضة</span>
              <span className="text-rose-500 text-xs">*</span>
            </label>
            <span className="text-xs text-slate-500 font-medium">
              {info.proposalTitle ? `${info.proposalTitle.length} حرف` : 'مطلوب للمناقشة'}
            </span>
          </div>
          <textarea
            rows={3}
            value={info.proposalTitle}
            onChange={e => onChange('proposalTitle', e.target.value)}
            placeholder="اكتب العنوان المقترح بالكامل كما تم عرضه في ملخص السيمنار..."
            className="w-full text-sm sm:text-base px-3.5 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-xs leading-relaxed transition font-medium"
          />
        </div>
      </div>
    </section>
  );
};
