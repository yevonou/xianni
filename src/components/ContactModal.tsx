import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Mail, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Product Review',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      id="contact-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C0C0C]/65 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border-2 border-[#0C0C0C] rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-contact-modal"
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-[#0C0C0C]/20 hover:bg-[#0C0C0C]/10 transition-colors text-[#0C0C0C] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#1FD66E] shadow-[0_0_6px_#1FD66E]" />
              <span className="text-xs uppercase tracking-widest font-semibold text-[#7621B0]">
                Erick Chen // Collaboration Protocol
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#0C0C0C] mb-2">
              Work With Me
            </h3>
            <p className="text-xs sm:text-sm text-[#0C0C0C]/65 uppercase tracking-wide mb-6">
              AI product reviews, reproducible creator pipelines, workshops, and advisory.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#0C0C0C]/70 font-medium mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-input-name"
                    required
                    type="text"
                    placeholder="e.g. Alex Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#0C0C0C]/25 bg-[#FBFBFC] text-[#0C0C0C] text-sm focus:outline-none focus:border-[#7621B0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#0C0C0C]/70 font-medium mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-input-email"
                    required
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl border border-[#0C0C0C]/25 bg-[#FBFBFC] text-[#0C0C0C] text-sm focus:outline-none focus:border-[#7621B0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#0C0C0C]/70 font-medium mb-1.5">
                  Collaboration Scope
                </label>
                <select
                  id="contact-select-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#0C0C0C]/25 bg-[#FBFBFC] text-[#0C0C0C] text-sm focus:outline-none focus:border-[#7621B0] transition-colors"
                >
                  <option value="Product Review">AI Tool & System Field Review</option>
                  <option value="Tutorial / Pipeline">Custom Creator Workflow & Scripting Pipeline</option>
                  <option value="Advisory / Workshop">Team Training & AI Strategy Advisory</option>
                  <option value="Speaking / Media">Keynote Speaking or Technology Column</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#0C0C0C]/70 font-medium mb-1.5">
                  Project Details
                </label>
                <textarea
                  id="contact-textarea-message"
                  required
                  rows={4}
                  placeholder="Share details on your product, model, target users, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl border border-[#0C0C0C]/25 bg-[#FBFBFC] text-[#0C0C0C] text-sm focus:outline-none focus:border-[#7621B0] transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#0C0C0C]/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1FD66E]" />
                  <span>Confidential Pre-release NDAs honored</span>
                </div>
                <button
                  id="submit-contact-form"
                  type="submit"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0C0C0C] text-white text-xs font-semibold uppercase tracking-widest hover:border hover:border-[#7621B0] hover:shadow-[0_0_15px_rgba(118,33,176,0.3)] transition-all cursor-pointer"
                >
                  <span>Dispatch Dispatch</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-[#1FD66E]/15 text-[#1FD66E] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-2xl font-black uppercase text-[#0C0C0C] mb-2">
              Transmission Received
            </h4>
            <p className="text-sm text-[#0C0C0C]/70 max-w-md mx-auto mb-6">
              Thank you, {formData.name}. Erick Chen has logged your inquiry regarding {formData.category}. Expect a technical response within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full border border-[#0C0C0C] text-xs font-semibold uppercase tracking-widest text-[#0C0C0C] hover:bg-[#0C0C0C]/5 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
