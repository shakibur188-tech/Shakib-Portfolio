import React from 'react';
import PricingTable from './PricingTable';

export { PricingTable };

/**
 * Feature Icon / Value Renderer
 * Handles Text value, Boolean checkmark (✓), and Boolean cross (✕)
 */
export const FeatureValue = ({ type, value }) => {
  if (type === 'text' || (value && type !== 'checkmark' && type !== 'cross')) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#70805D]/10 text-[#2A3B27] border border-[#70805D]/20">
        {value}
      </span>
    );
  }

  if (type === 'cross' || type === false) {
    return (
      <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center text-[10px] font-bold shrink-0" title="Not Included">
        ✕
      </span>
    );
  }

  // Default: checkmark / true
  return (
    <span className="w-5 h-5 rounded-full bg-[#70805D]/15 text-[#70805D] flex items-center justify-center text-xs font-bold shrink-0" title="Included">
      ✓
    </span>
  );
};

/**
 * Modern SaaS Pricing Card Component
 */
export const PricingCard = ({
  plan,
  onSelectPlan
}) => {
  const {
    title,
    subtitle,
    badge,
    icon = '🚀',
    currency = '৳',
    price,
    period = '/month',
    subtext,
    highlight = false,
    ctaText = 'Get Started →',
    ctaLink = '#',
    features = []
  } = plan;

  const handleCtaClick = (e) => {
    if (onSelectPlan) {
      e.preventDefault();
      onSelectPlan(plan);
    }
  };

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl transition-all duration-300 ${
        highlight
          ? 'bg-[#F3F6EE] border-2 border-[#70805D] shadow-xl shadow-[#70805D]/20 lg:-translate-y-2.5 ring-2 ring-[#70805D]/20 z-20'
          : 'bg-white border border-[#70805D]/20 hover:border-[#70805D]/60 hover:shadow-lg z-10'
      } p-6 sm:p-7`}
    >
      {/* Top Header Badge / Highlight */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span className="text-2xl w-10 h-10 rounded-xl bg-white border border-[#70805D]/20 flex items-center justify-center shadow-xs">
              {icon}
            </span>
          )}
          {badge && (
            <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${
              highlight
                ? 'bg-[#70805D] text-white border-[#70805D]'
                : 'bg-[#70805D]/10 text-[#2A3B27] border-[#70805D]/20'
            }`}>
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Plan Heading & Audience Subtitle */}
      <div className="mb-5">
        <h3 className="text-2xl font-extrabold text-[#1C2B1B] tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-[#55738D] font-medium mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Pricing Display */}
      <div className="pb-5 mb-5 border-b border-[#70805D]/15">
        <div className="flex items-baseline gap-1.5 flex-wrap">
          <span className="text-sm font-bold text-[#55738D]">{currency}</span>
          <span className="text-4xl font-black text-[#2A3B27] tracking-tight">{price}</span>
          {period && (
            <span className="text-xs font-semibold text-[#55738D]">{period}</span>
          )}
        </div>
        {subtext && (
          <div className="text-[11px] font-semibold text-[#70805D] mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#70805D]"></span>
            <span>{subtext}</span>
          </div>
        )}
      </div>

      {/* Features List Table */}
      <div className="space-y-3 mb-6 flex-1">
        <div className="text-[10.5px] font-extrabold uppercase tracking-wider text-[#2A3B27]/70 pb-1 border-b border-[#70805D]/10">
          Features &amp; Specifications
        </div>
        <ul className="space-y-2 text-xs">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-center justify-between gap-3 py-1 border-b border-[#70805D]/10 last:border-0">
              <span className={`font-medium ${feat.type === 'cross' ? 'text-stone-400 line-through' : 'text-[#2A3B27]'}`}>
                {feat.title}
              </span>
              <FeatureValue type={feat.type} value={feat.value} />
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto pt-2">
        <a
          href={ctaLink || '#'}
          onClick={handleCtaClick}
          target={ctaLink?.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
            highlight
              ? 'bg-[#70805D] hover:bg-[#2A3B27] text-white shadow-[#70805D]/25 hover:shadow-md'
              : 'bg-[#2A3B27] hover:bg-[#70805D] text-white'
          }`}
        >
          <span>{ctaText}</span>
        </a>
      </div>
    </div>
  );
};

/**
 * Top Promo Banner Component
 */
export const PromoBanner = ({ banner }) => {
  if (!banner || !banner.enabled) return null;

  return (
    <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#2A3B27] via-[#70805D] to-[#2A3B27] text-white shadow-lg shadow-[#70805D]/20 flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/20">
      <div className="flex items-center gap-3 text-center sm:text-left">
        <span className="text-xl animate-bounce">⚡</span>
        <div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            {banner.text}
          </span>
        </div>
      </div>
      {banner.linkText && (
        <a
          href={banner.linkUrl || '#'}
          className="shrink-0 px-4 py-2 rounded-xl bg-white text-[#2A3B27] hover:bg-[#F8F9F6] text-xs font-black transition-all shadow-xs"
        >
          {banner.linkText}
        </a>
      )}
    </div>
  );
};

/**
 * Complete Dynamic Pricing Section Component with view toggles
 */
export const PricingSection = ({
  data,
  onSelectPlan
}) => {
  const { promoBanner, sectionHeader, plans = [] } = data || {};
  const activePlans = plans.filter(p => p.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="pricing-plans" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Promo Banner (Toggleable) */}
        <PromoBanner banner={promoBanner} />

        {/* Section Heading */}
        {sectionHeader && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            {sectionHeader.tag && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#70805D]/10 text-[#70805D] text-xs font-black uppercase tracking-wider mb-3 border border-[#70805D]/20">
                <span>{sectionHeader.tag}</span>
              </div>
            )}
            <h2 className="text-3xl sm:text-5xl font-black text-[#1C2B1B] tracking-tight">
              {sectionHeader.title}
            </h2>
            {sectionHeader.subtitle && (
              <p className="text-sm sm:text-base text-[#55738D] mt-3 leading-relaxed">
                {sectionHeader.subtitle}
              </p>
            )}
          </div>
        )}

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch mb-16">
          {activePlans.map((plan) => (
            <PricingCard
              key={plan.id || plan.title}
              plan={plan}
              onSelectPlan={onSelectPlan}
            />
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-16 pt-12 border-t border-[#70805D]/20">
          <PricingTable onSelectPlan={onSelectPlan} />
        </div>

      </div>
    </section>
  );
};

export default PricingSection;
