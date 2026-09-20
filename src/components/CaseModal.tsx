import React from 'react';
import { X, CheckCircle, Cpu, FileText, ArrowRight } from 'lucide-react';
import { ProjectData } from '../types';

interface CaseModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CaseModal: React.FC<CaseModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  if (!project) return null;

  return (
    <div
      id="case-detail-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#0C0C0C]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-2 border-[#0C0C0C] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-case-modal"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#0C0C0C]/20 hover:bg-[#0C0C0C]/10 transition-colors text-[#0C0C0C] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7621B0]">
            PRACTICAL LOG // {project.category}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1FD66E]" />
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#0C0C0C] mb-2">
          {project.name}
        </h3>
        <p className="text-sm sm:text-base text-[#0C0C0C]/70 uppercase tracking-wide mb-8">
          {project.headline}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {project.caseDetails.metrics.map((metric, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl border border-[#0C0C0C]/15 bg-[#F9F9FB]"
            >
              <div className="text-xs text-[#0C0C0C]/60 uppercase tracking-wider font-medium">
                {metric.label}
              </div>
              <div className="text-xl sm:text-2xl font-black text-[#0C0C0C] mt-1">
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        {/* Objective */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] mb-2">
            <FileText className="w-4 h-4 text-[#7621B0]" />
            Evaluation Objective
          </h4>
          <p className="text-sm sm:text-base text-[#0C0C0C]/75 leading-relaxed">
            {project.caseDetails.objective}
          </p>
        </div>

        {/* Reproducible Takeaways */}
        <div className="mb-8">
          <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0C0C0C] mb-3">
            <CheckCircle className="w-4 h-4 text-[#1FD66E]" />
            Verified Technical Takeaways
          </h4>
          <ul className="space-y-2.5">
            {project.caseDetails.reproducibleTakeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-xs sm:text-sm text-[#0C0C0C]/80"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#7621B0] mt-1.5 shrink-0" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Hardware Rig */}
        <div className="mb-8 p-4 rounded-2xl bg-[#F4F4F6] border border-[#0C0C0C]/10 flex items-center gap-3 text-xs text-[#0C0C0C]/70">
          <Cpu className="w-4 h-4 text-[#0C0C0C] shrink-0" />
          <span>{project.caseDetails.hardwareEnvironment}</span>
        </div>

        {/* Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#0C0C0C]/15">
          <span className="text-xs uppercase tracking-widest text-[#0C0C0C]/60">
            Author: Erick Chen // Field-tested AI Specialist
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0C0C0C] text-white text-xs font-medium uppercase tracking-widest hover:bg-[#7621B0] transition-colors cursor-pointer"
          >
            <span>Request Full Audit Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
