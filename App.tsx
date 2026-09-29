/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  SeminarEvaluation, 
  SeminarBasicInfo, 
  ScoreValue, 
  CommitteeNotes, 
  ProposedReformulation, 
  CommitteeDecision, 
  CommitteeMember 
} from './types/seminar';
import { createEmptyEvaluation, SAMPLE_EVALUATION } from './data/sampleData';
import { Header } from './components/Header';
import { ScoreOverview } from './components/ScoreOverview';
import { BasicInfoSection } from './components/BasicInfoSection';
import { CriteriaSection } from './components/CriteriaSection';
import { CommitteeNotesSection } from './components/CommitteeNotesSection';
import { ReformulationSection } from './components/ReformulationSection';
import { DecisionSection } from './components/DecisionSection';
import { CommitteeMembersSection } from './components/CommitteeMembersSection';
import { PrintableReport } from './components/PrintableReport';
import { SavedEvaluationsModal } from './components/SavedEvaluationsModal';
import { SummaryShareModal } from './components/SummaryShareModal';
import { PrintPreviewModal } from './components/PrintPreviewModal';
import { 
  BookOpen, 
  CheckSquare, 
  MessageSquare, 
  Edit3, 
  Gavel, 
  Users, 
  Printer, 
  Save, 
  ArrowUp,
  FileCheck2
} from 'lucide-react';

const STORAGE_KEY = 'seminar_evaluations_clean_v5';
const CURRENT_ID_KEY = 'seminar_current_eval_id_v5';

export default function App() {
  const initialEmpty = React.useMemo(() => createEmptyEvaluation(), []);

  // Load saved evaluations from localStorage or initialize with empty form
  const [evaluations, setEvaluations] = useState<SeminarEvaluation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved evaluations', e);
    }
    return [createEmptyEvaluation()];
  });

  const [currentId, setCurrentId] = useState<string>(() => {
    try {
      const savedCurrent = localStorage.getItem(CURRENT_ID_KEY);
      if (savedCurrent) return savedCurrent;
    } catch (e) {}
    return evaluations[0]?.id || createEmptyEvaluation().id;
  });

  // Current active evaluation
  const currentEvaluation = evaluations.find(e => e.id === currentId) || evaluations[0] || initialEmpty;

  // Modals visibility state
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
      localStorage.setItem(CURRENT_ID_KEY, currentId);
    } catch (e) {
      console.error('LocalStorage save error', e);
    }
  }, [evaluations, currentId]);

  // Helper to update current evaluation
  const updateCurrentEvaluation = (updater: (prev: SeminarEvaluation) => SeminarEvaluation) => {
    setEvaluations(prevList => {
      const index = prevList.findIndex(e => e.id === currentEvaluation.id);
      if (index === -1) {
        const updated = updater(currentEvaluation);
        return [...prevList, updated];
      }
      const updated = updater(prevList[index]);
      const nextList = [...prevList];
      nextList[index] = { ...updated, updatedAt: new Date().toISOString() };
      return nextList;
    });
  };

  // Handlers for sections
  const handleBasicInfoChange = (field: keyof SeminarBasicInfo, value: string) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      basicInfo: {
        ...prev.basicInfo,
        [field]: value,
      },
    }));
  };

  const handleScoreChange = (criterionId: number, score: ScoreValue) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === criterionId ? { ...c, score } : c
      ),
    }));
  };

  const handleNotesChange = (criterionId: number, notes: string) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => 
        c.id === criterionId ? { ...c, notes } : c
      ),
    }));
  };

  const handleQuickFillScores = (score: ScoreValue) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      criteria: prev.criteria.map(c => ({ ...c, score })),
    }));
  };

  const handleCommitteeNotesChange = (field: keyof CommitteeNotes, value: string) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      committeeNotes: {
        ...prev.committeeNotes,
        [field]: value,
      },
    }));
  };

  const handleReformulationChange = (field: keyof ProposedReformulation, value: string) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      proposedReformulation: {
        ...prev.proposedReformulation,
        [field]: value,
      },
    }));
  };

  const handleDecisionChange = (decision: CommitteeDecision) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      decision,
    }));
  };

  // Committee members operations
  const handleAddMember = () => {
    const newMember: CommitteeMember = {
      id: `member_${Date.now()}`,
      name: '',
      academicTitle: '',
      department: currentEvaluation.basicInfo.faculty || '',
      role: 'member',
      roleLabel: 'عضو اللجنة ومحكّم',
      isSigned: true,
    };

    updateCurrentEvaluation(prev => ({
      ...prev,
      members: [...prev.members, newMember],
    }));
  };

  const handleRemoveMember = (id: string) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      members: prev.members.filter(m => m.id !== id),
    }));
  };

  const handleUpdateMember = (id: string, field: keyof CommitteeMember, value: any) => {
    updateCurrentEvaluation(prev => ({
      ...prev,
      members: prev.members.map(m => (m.id === id ? { ...m, [field]: value } : m)),
    }));
  };

  // Save notification
  const handleManualSave = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
      setSaveToast('تم حفظ الاستمارة بنجاح في ذاكرة المتصفح');
      setTimeout(() => setSaveToast(null), 3000);
    } catch (e) {
      setSaveToast('حدث خطأ أثناء الحفظ');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Create new blank evaluation
  const handleNewEvaluation = () => {
    const newEval = createEmptyEvaluation();
    setEvaluations(prev => [newEval, ...prev]);
    setCurrentId(newEval.id);
    setSaveToast('تم إنشاء استمارة تحكيم جديدة فارغة');
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Reset current form to blank
  const handleResetCurrent = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إفراغ الاستمارة الحالية والبدء من جديد؟')) {
      const empty = createEmptyEvaluation();
      empty.id = currentEvaluation.id;
      setEvaluations(prev => prev.map(e => e.id === currentEvaluation.id ? empty : e));
      setSaveToast('تمت إعادة ضبط الاستمارة الحالية');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Delete evaluation from list
  const handleDeleteEvaluation = (id: string) => {
    if (window.confirm('هل تريد حذف هذه الاستمارة نهائياً من السجل؟')) {
      const remaining = evaluations.filter(e => e.id !== id);
      if (remaining.length === 0) {
        const fresh = createEmptyEvaluation();
        setEvaluations([fresh]);
        setCurrentId(fresh.id);
      } else {
        setEvaluations(remaining);
        if (currentId === id) {
          setCurrentId(remaining[0].id);
        }
      }
      setSaveToast('تم حذف الاستمارة من السجل');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  // Export JSON backup
  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(evaluations, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `seminar_evaluations_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (event.target.files && event.target.files[0]) {
      fileReader.readAsText(event.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEvaluations(parsed);
            setCurrentId(parsed[0].id);
            setSaveToast(`تم استيراد ${parsed.length} استمارة بنجاح`);
            setTimeout(() => setSaveToast(null), 3000);
          } else {
            alert('صيغة الملف غير صالحة');
          }
        } catch (err) {
          alert('تعذر قراءة ملف JSON');
        }
      };
    }
  };

  // Calculate scores
  const completionCount = currentEvaluation.criteria.filter(c => c.score !== null).length;
  const totalScore = currentEvaluation.criteria.reduce((s, c) => s + (c.score || 0), 0);

  // Jump to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 font-['Tajawal'] antialiased selection:bg-teal-500 selection:text-white">
      {/* Top Main Navigation Header */}
      <Header
        evaluation={currentEvaluation}
        onSave={handleManualSave}
        onReset={handleResetCurrent}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        onPrint={() => setIsPrintPreviewOpen(true)}
        saveSuccessMessage={saveToast}
        completionCount={completionCount}
        totalScore={totalScore}
      />

      {/* Quick Section Anchor Strip */}
      <nav className="no-print bg-white border-b border-slate-200/90 shadow-2xs sticky top-[61px] z-30 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4 text-xs font-bold text-slate-600">
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={() => scrollTo('sec-basic-info')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>١. البيانات الأساسية</span>
            </button>
            <button
              onClick={() => scrollTo('sec-criteria')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
              <span>٢. معايير التحكيم ({completionCount}/10)</span>
            </button>
            <button
              onClick={() => scrollTo('sec-notes')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
              <span>٣. ملاحظات اللجنة</span>
            </button>
            <button
              onClick={() => scrollTo('sec-reformulation')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-teal-600" />
              <span>٤. الصياغة المقترحة</span>
            </button>
            <button
              onClick={() => scrollTo('sec-decision')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <Gavel className="w-3.5 h-3.5 text-teal-600" />
              <span>٥. قرار اللجنة</span>
            </button>
            <button
              onClick={() => scrollTo('sec-members')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-100 text-slate-700 transition cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-teal-600" />
              <span>٦. أعضاء اللجنة</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 hidden md:inline">
              الباحث: {currentEvaluation.basicInfo.researcherName || 'لم يُحدد'}
            </span>
            <button
              onClick={() => setIsPrintPreviewOpen(true)}
              className="flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>معاينة الطباعة</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Interactive Work Area */}
      <main className="no-print max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Real-time Score Overview Card */}
        <ScoreOverview
          criteria={currentEvaluation.criteria}
          onQuickFillScore={handleQuickFillScores}
        />

        {/* Section 1: البيانات الأساسية */}
        <div id="sec-basic-info">
          <BasicInfoSection
            info={currentEvaluation.basicInfo}
            onChange={handleBasicInfoChange}
          />
        </div>

        {/* Section 2: معايير تحكيم الفكرة البحثية */}
        <div id="sec-criteria">
          <CriteriaSection
            criteria={currentEvaluation.criteria}
            onScoreChange={handleScoreChange}
            onNotesChange={handleNotesChange}
          />
        </div>

        {/* Section 3: ملاحظات لجنة الحكم */}
        <div id="sec-notes">
          <CommitteeNotesSection
            notes={currentEvaluation.committeeNotes}
            onChange={handleCommitteeNotesChange}
          />
        </div>

        {/* Section 4: الصياغة المقترحة بعد التعديل */}
        <div id="sec-reformulation">
          <ReformulationSection
            reformulation={currentEvaluation.proposedReformulation}
            originalTitle={currentEvaluation.basicInfo.proposalTitle}
            onChange={handleReformulationChange}
          />
        </div>

        {/* Section 5: قرار لجنة الحكم بالسيمنار */}
        <div id="sec-decision">
          <DecisionSection
            decision={currentEvaluation.decision}
            onChange={handleDecisionChange}
          />
        </div>

        {/* Section 6: أعضاء لجنة الحكم بالسيمنار */}
        <div id="sec-members">
          <CommitteeMembersSection
            members={currentEvaluation.members}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
            onUpdateMember={handleUpdateMember}
          />
        </div>

        {/* Bottom Action Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-800">
                استمارة سيمنار: {currentEvaluation.basicInfo.researcherName || 'باحث جديد'}
              </div>
              <div className="text-xs text-slate-500">
                الدرجة الكلية: <strong className="text-emerald-700">{totalScore} من 40</strong> | القرار:{' '}
                <strong className="text-teal-700">
                  {currentEvaluation.decision ? 'محدد' : 'في انتظار الاعتماد'}
                </strong>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={handleManualSave}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>حفظ الاستمارة</span>
            </button>

            <button
              onClick={() => setIsPrintPreviewOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>معاينة وطباعة رسمية</span>
            </button>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <span>مشاركة الملخص</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title="العودة لأعلى الصفحة"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>

      {/* Hidden container formatted purely for window.print() */}
      <div className="hidden print:block">
        <PrintableReport evaluation={currentEvaluation} />
      </div>

      {/* Modals */}
      <SavedEvaluationsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        evaluations={evaluations}
        currentId={currentEvaluation.id}
        onSelectEvaluation={(id) => setCurrentId(id)}
        onDeleteEvaluation={handleDeleteEvaluation}
        onNewEvaluation={handleNewEvaluation}
        onExportAll={handleExportAll}
        onImportFile={handleImportFile}
      />

      <SummaryShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        evaluation={currentEvaluation}
      />

      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        evaluation={currentEvaluation}
      />
    </div>
  );
}
