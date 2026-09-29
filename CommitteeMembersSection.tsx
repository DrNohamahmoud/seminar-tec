import React from 'react';
import { Users, UserPlus, Trash2, CheckCircle2, PenTool, ShieldCheck } from 'lucide-react';
import { CommitteeMember } from '../types/seminar';

interface CommitteeMembersSectionProps {
  members: CommitteeMember[];
  onAddMember: () => void;
  onRemoveMember: (id: string) => void;
  onUpdateMember: (id: string, field: keyof CommitteeMember, value: any) => void;
}

export const CommitteeMembersSection: React.FC<CommitteeMembersSectionProps> = ({
  members,
  onAddMember,
  onRemoveMember,
  onUpdateMember,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden mb-8 transition-shadow hover:shadow-md">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold text-sm">
            ٦
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-['Cairo'] tracking-wide">
              أعضاء لجنة الحكم والمناقشة بالسيمنار
            </h2>
            <p className="text-xs text-slate-300">
              قائمة الأساتذة المحكّمين وتوزيع الصفات الأكاديمية والتوقيعات
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddMember}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition cursor-pointer shadow-sm"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>إضافة عضو جديد</span>
        </button>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-100 text-slate-700 text-xs font-bold border-b border-slate-300">
                <th className="py-3 px-3 w-10 text-center">م</th>
                <th className="py-3 px-3">اسم عضو اللجنة واللقب العلمي</th>
                <th className="py-3 px-3">التخصص والكلية/الجامعة</th>
                <th className="py-3 px-3 w-40">الصفة في اللجنة</th>
                <th className="py-3 px-3 w-28 text-center">التوقيع / الاعتماد</th>
                <th className="py-3 px-2 w-12 text-center">حذف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {members.map((member, idx) => (
                <tr key={member.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-3 text-center font-bold text-slate-600">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => onUpdateMember(member.id, 'name', e.target.value)}
                      placeholder="أ.د. / د. اكتب اسم عضو اللجنة..."
                      className="w-full text-xs sm:text-sm font-semibold p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <input
                      type="text"
                      value={member.department}
                      onChange={(e) => onUpdateMember(member.id, 'department', e.target.value)}
                      placeholder="الكلية / الجامعة..."
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                    />
                  </td>
                  <td className="py-3 px-3">
                    <select
                      value={member.roleLabel}
                      onChange={(e) => onUpdateMember(member.id, 'roleLabel', e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white font-medium text-slate-700"
                    >
                      <option value="رئيس لجنة الحكم">رئيس لجنة الحكم</option>
                      <option value="عضو اللجنة ومحكّم">عضو اللجنة ومحكّم</option>
                      <option value="المشرف الرئيس">المشرف الرئيس</option>
                      <option value="مشرف مشارك">مشرف مشارك</option>
                      <option value="محكّم خارجي">محكّم خارجي</option>
                      <option value="مقرر السيمنار">مقرر السيمنار</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onUpdateMember(member.id, 'isSigned', !member.isSigned)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        member.isSigned
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-500 border border-slate-300 hover:bg-slate-200'
                      }`}
                      title="تبديل حالة التوقيع"
                    >
                      {member.isSigned ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>معتمد</span>
                        </>
                      ) : (
                        <>
                          <PenTool className="w-3.5 h-3.5 text-slate-400" />
                          <span>في الانتظار</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-3 px-2 text-center">
                    {members.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveMember(member.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="حذف العضو من اللجنة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>تظهر هذه الأسماء والتوقيعات في تقرير محضر السيمنار الرسمي عند الطباعة.</span>
          </div>
          <div>
            عدد أعضاء اللجنة: <span className="font-bold text-slate-800">{members.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
