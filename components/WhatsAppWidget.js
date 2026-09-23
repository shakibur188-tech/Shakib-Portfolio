'use client';

import React, { useState } from 'react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = '8801838070468';
    const text = `Hello, This is ${name || 'a visitor'}, You can contact with me ${contact || email || 'directly'} and i would to know/discuss with you about ${message || 'a strategic project scope'}.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div
      id="whatsAppFloatingContainer"
      className="fixed bottom-6 right-6 z-[990] flex flex-col items-end pointer-events-auto"
      onMouseEnter={handleMouseEnter}
    >
      {/* Floating Popup Form */}
      <div
        className={`mb-3 w-[300px] sm:w-[330px] bg-white rounded-3xl border border-[#70805D]/25 shadow-2xl p-5 transition-all duration-300 origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {/* Popup Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#70805D]/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center text-sm shadow-xs">
              <i className="fa-brands fa-whatsapp"></i>
            </div>
            <div>
              <div className="text-xs font-black text-[#1C2B1B]">Direct WhatsApp Desk</div>
              <div className="text-[10px] text-[#70805D] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Mr. Shakib Active</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close WhatsApp Popup"
            className="w-7 h-7 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 flex items-center justify-center text-[#2A3B27] hover:bg-[#E8EDE4] text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <div>
            <label className="text-[10px] font-bold text-[#55738D] uppercase">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#55738D] uppercase">Contact / Phone</label>
            <input
              type="text"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#55738D] uppercase">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@company.com"
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-[#55738D] uppercase">What would you like to discuss?</label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Brand identity, Next.js web portal, retainers..."
              className="w-full px-3 py-1.5 text-xs rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-extrabold text-xs py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>Start WhatsApp Chat with Mr. Shakib</span>
          </button>
        </form>
      </div>

      {/* Floating Trigger Button (Reduced size as requested) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Chat"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none border-2 border-white"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </button>
    </div>
  );
}
