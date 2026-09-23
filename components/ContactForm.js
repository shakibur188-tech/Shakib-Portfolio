'use client';

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web Design & Development',
    budget: '$2,500 - $5,000',
    message: ''
  });

  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'loading', message: 'Sending your inquiry...' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setStatus({
          state: 'success',
          message: 'Thank you! Your inquiry has been received. Md. Shakibur Rahaman will respond within 24 hours.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Web Design & Development',
          budget: '$2,500 - $5,000',
          message: ''
        });
      } else {
        setStatus({
          state: 'error',
          message: result.error || 'Unable to submit inquiry. Please reach out directly on WhatsApp.'
        });
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: 'Network error occurred. Please reach out via WhatsApp at +880 1838-070468.'
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#70805D]/20 shadow-lg">
      <h3 className="text-2xl font-extrabold text-[#1C2B1B] mb-2 tracking-tight">
        Schedule Strategic Discovery Session
      </h3>
      <p className="text-xs sm:text-sm text-[#55738D] mb-8 leading-relaxed">
        Direct engagement with single-point executive accountability. Fill in your project scope below:
      </p>

      {status.state === 'success' ? (
        <div className="p-6 rounded-2xl bg-[#70805D]/15 border border-[#70805D]/30 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#70805D] text-white flex items-center justify-center text-xl mx-auto">
            <i className="fa-solid fa-check"></i>
          </div>
          <h4 className="text-base font-extrabold text-[#2A3B27]">Inquiry Dispatched Successfully</h4>
          <p className="text-xs sm:text-sm text-[#4D614A] leading-relaxed">{status.message}</p>
          <button
            type="button"
            onClick={() => setStatus({ state: 'idle', message: '' })}
            className="btn-outline-emerald text-xs mt-2"
          >
            Send Another Brief
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2A3B27] uppercase tracking-wider block mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alexander Vance"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-xs sm:text-sm text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#2A3B27] uppercase tracking-wider block mb-1.5">
                Corporate Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-xs sm:text-sm text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-[#2A3B27] uppercase tracking-wider block mb-1.5">
                Phone / WhatsApp Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+880 1838-000000"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-xs sm:text-sm text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#2A3B27] uppercase tracking-wider block mb-1.5">
                Target Discipline
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-xs sm:text-sm text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
              >
                <option value="Graphics & Visual Identity">Graphics &amp; Visual Identity</option>
                <option value="Web Design & Development">Web Design &amp; Development</option>
                <option value="Social Media & Media Buying">Social Media &amp; Media Buying</option>
                <option value="Public Relations & Media Outreach">Public Relations &amp; Media Outreach</option>
                <option value="Google Ads & Intent Scaling">Google Ads &amp; Intent Scaling</option>
                <option value="Event Activation & Exhibition">Event Activation &amp; Exhibition</option>
                <option value="Founder Fractional Retainer">Founder Fractional Retainer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#2A3B27] uppercase tracking-wider block mb-1.5">
              Project Brief &amp; Commercial Goals *
            </label>
            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Describe your target timeline, core challenge, and deliverables expectations..."
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9F6] border border-[#70805D]/20 text-xs sm:text-sm text-[#1C2B1B] focus:outline-none focus:border-[#70805D]"
            />
          </div>

          {status.state === 'error' && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-bold">
              {status.message}
            </div>
          )}

          <button
            type="submit"
            disabled={status.state === 'loading'}
            className="w-full btn-aesthetic-primary justify-center text-xs sm:text-sm py-3.5 shadow-md"
          >
            {status.state === 'loading' ? (
              <span>Submitting Brief...</span>
            ) : (
              <>
                <span>Submit Strategic Brief</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
