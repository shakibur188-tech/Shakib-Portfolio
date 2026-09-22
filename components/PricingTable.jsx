import React from 'react';

const PricingTable = ({ onSelectPlan }) => {
  const plans = [
    { name: "Starter", subtitle: "12-Month EMI", isPopular: false, price: "৳ 3,000 /month" },
    { name: "Momentum", subtitle: "9-Month EMI", isPopular: true, price: "৳ 3,800 /month", badge: "⭐ Best Value (EMI)" },
    { name: "Accelerate", subtitle: "6-Month EMI", isPopular: false, price: "৳ 5,425 /month" },
    { name: "Founder", subtitle: "Pay in Full", isPopular: true, price: "৳ 25,000 One-time", badge: "⭐ Best Value (Pay in Full)" },
  ];

  const features = [
    { label: "Fast loading website", values: ["Less than 1 second", "Less than 1 second", "Less than 1 second", "Less than 1 second"], isGreen: false },
    { label: "Mobile friendly responsive website", values: ["Mobile, Tab, Desktop", "Mobile, Tab, Desktop", "Mobile, Tab, Desktop", "Mobile, Tab, Desktop"], isGreen: false },
    { label: "FREE .COM Domain", values: ["Free ($15 Value)", "Free ($15 Value)", "Free ($15 Value)", "Free ($15 Value)"], isGreen: true },
    { label: "10 GB NVMe SSD Storage", values: ["Included ($22 Value)", "Included ($22 Value)", "Included ($22 Value)", "Included ($22 Value)"], isGreen: true },
    { label: "Premium SSL Certificate", values: ["Free ($8 Value)", "Free ($8 Value)", "Free ($8 Value)", "Free ($8 Value)"], isGreen: true },
    { label: "Unlimited Bandwidth & 99.9% Uptime", values: ["99.9% Uptime SLA", "99.9% Uptime SLA", "99.9% Uptime SLA", "99.9% Uptime SLA"], isGreen: true },
    { label: "Payment Terms", values: ["৳ 3,000 /month", "৳ 3,800 /month", "৳ 5,425 /month", "৳ 25,000 One-time"], isGreen: false },
    { label: "Total Cost", values: ["৳ 36,000 in 12 Months", "৳ 34,200 in 9 Months", "৳ 32,550 in 6 Months", "৳ 25,000 (Save 30% Net)"], isGreen: false },
    { label: "Admin / Backend Access", values: ["Admin access", "Admin access", "Admin access", "Master admin"], isGreen: false },
    { label: "Customer Login", values: ["Secured + Gmail", "Secured + Gmail", "Secured + Gmail", "Secured + Gmail"], isGreen: false },
    { label: "Payment Gateway", values: ["Included", "Included", "Included", "Included"], isGreen: false },
    { label: "Abandoned Cart", values: ["Included", "Included", "Included", "Included"], isGreen: false },
    { label: "Unlimited Business Emails", values: ["2 Email (Unlimited creation After final payment)", "2 Email (Unlimited creation After final payment)", "2 Email (Unlimited creation After final payment)", "Unlimited (Immediate)"], isGreen: false },
    { label: "cPanel Handover", values: ["After 12 Month", "After 9 Month", "After 6 Month", "Day 1 (Immediate)"], isGreen: false },
  ];

  const handleCta = (plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan);
      return;
    }
    const text = `Hi Shakibur, I want to get started with the ${plan.name} Plan (${plan.subtitle} - ${plan.price}).`;
    window.open(`https://wa.me/8801838070468?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Zero-Risk E-Commerce Packages
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Choose your flexible EMI plan or pay upfront to save 30%.
        </p>
      </div>

      <div className="overflow-x-auto shadow-xl rounded-2xl ring-1 ring-gray-200">
        <table className="w-full table-fixed text-left border-collapse bg-white">
          <thead>
            <tr>
              <th className="p-5 border-b border-gray-200 bg-gray-50 text-xs font-bold text-gray-900 tracking-wider uppercase w-[24%]">
                Feature / Module
              </th>
              {plans.map((plan, index) => (
                <th 
                  key={index} 
                  className={`p-5 border-b border-gray-200 text-center w-[19%] ${
                    plan.isPopular ? "bg-emerald-50/80 border-x border-emerald-200" : "bg-gray-50"
                  }`}
                >
                  {plan.isPopular ? (
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide mb-2 inline-block shadow-xs">
                      {plan.badge || '⭐ Best Value'}
                    </span>
                  ) : (
                    <div className="h-5"></div>
                  )}
                  <div className="text-lg font-extrabold text-gray-900">{plan.name}</div>
                  <div className="text-xs font-semibold text-gray-500 mt-0.5">{plan.subtitle}</div>
                  <div className="mt-2.5 pt-2 border-t border-gray-200">
                    <div className="text-base font-black text-gray-900">{plan.price}</div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {features.map((feature, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={`transition-colors duration-150 ${
                  feature.isGreen ? "bg-emerald-50/40 hover:bg-emerald-50/70" : "hover:bg-gray-50"
                }`}
              >
                <td className={`p-4 pl-6 text-sm font-medium sticky left-0 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] md:shadow-none ${
                  feature.isGreen ? "text-emerald-950 font-bold bg-emerald-50/90" : "text-gray-900 bg-white"
                }`}>
                  {feature.isGreen && (
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                  )}
                  {feature.label}
                </td>
                {feature.values.map((value, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`p-4 text-sm text-center ${
                      feature.isGreen 
                        ? "text-emerald-800 font-bold" 
                        : plans[colIndex].isPopular 
                          ? "bg-emerald-50/30 font-semibold text-emerald-900" 
                          : "text-gray-600"
                    }`}
                  >
                    {feature.isGreen ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="p-6 border-t border-gray-200 bg-gray-50"></td>
              {plans.map((plan, index) => (
                <td key={index} className={`p-6 border-t border-gray-200 text-center ${
                  plan.isPopular ? "bg-emerald-50" : "bg-gray-50"
                }`}>
                  <button 
                    onClick={() => handleCta(plan)}
                    className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200 ${
                      plan.isPopular 
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl" 
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    {plan.isPopular ? "Claim Offer →" : "Get Started"}
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
