"use client";

import { useState, useEffect, useRef } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Droplets, HelpCircle, Landmark, Receipt, Scale, Shield, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqItem {
  qEn: string;
  aEn: string;
}

interface FaqCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  bgSoft: string;
  borderSoft: string;
  items: FaqItem[];
}

const categories: FaqCategory[] = [
  {
    id: 'basics',
    label: 'Basics',
    icon: BookOpen,
    color: 'text-blue-600',
    bgSoft: 'bg-blue-50/60',
    borderSoft: 'border-blue-200/60',
    items: [
      {
        qEn: 'What exactly is a mutual fund?',
        aEn: `A mutual fund pools money from many investors and invests it in stocks, bonds, or other securities. A professional fund manager runs the fund.

This gives small investors diversification and expert management without buying many individual securities. In India, mutual funds are regulated by SEBI, which enforces disclosures and investor protections.`,
      },
      {
        qEn: 'How does a mutual fund actually work?',
        aEn: `How it works:

1. Investors give money to a fund.
2. The fund manager pools and invests it per the fund's objective.
3. The fund's price is shown as NAV (Net Asset Value) and is updated regularly.
4. If the fund's holdings gain value, NAV and your holding increase; if they fall, NAV falls.

You can invest as a lump sum or by SIP (Systematic Investment Plan) to add regularly.`,
      },
      {
        qEn: 'What is NAV and why does it matter?',
        aEn: `NAV (Net Asset Value) is the price of one unit of a mutual fund.

Formula: NAV = (Total Assets - Total Liabilities) / Total Units

Example: If NAV = Rs 50 and you invest Rs 10,000, you get 200 units. If NAV rises to Rs 60, your holding is worth Rs 12,000.

NAV is published regularly (usually daily) and is used when buying or selling units.`,
      },
      {
        qEn: 'What are the main types of mutual funds in India?',
        aEn: `Common types:

- Equity Funds: Invest mainly in stocks. Higher risk and potentially higher returns (large-cap, mid-cap, small-cap).
- Debt Funds: Invest in bonds and money-market instruments. Lower risk, steadier returns (liquid, short-duration).
- Hybrid Funds: Mix of equity and debt to balance risk and return.
- Index Funds & ETFs: Track an index (e.g., Nifty 50) and usually have low fees.
- Solution-Oriented Funds: Built for goals like retirement or child education; may have lock-ins.`,
      },
      {
        qEn: 'Do I need a Demat account to invest in mutual funds?',
        aEn: `No. A Demat account is not required for most mutual fund investments. You can invest via the AMC's website/app or through a distributor.

Typical requirements: PAN and Aadhaar (for KYC), a bank account, mobile number and email. KYC is usually a one-time process.`,
      },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Risk',
    icon: Shield,
    color: 'text-emerald-600',
    bgSoft: 'bg-emerald-50/60',
    borderSoft: 'border-emerald-200/60',
    items: [
      {
        qEn: 'Are mutual funds safe? Can I lose all my money?',
        aEn: `Mutual funds are market-linked, so they carry risk. A well-diversified fund makes losing everything very unlikely, but short-term losses can occur.

Protections:
- SEBI regulation and required disclosures.
- Fund assets are held by an independent custodian, not the AMC.
- Diversification reduces the impact of any single security.

Equity funds can fall sharply in some years (e.g., 10–30%). A holding period of 5–10 years lowers the chance of loss.`,
      },
      {
        qEn: 'What are the different types of risk in mutual funds?',
        aEn: `Common risks:

- Market Risk: Fund value moves with market (important for equity funds).
- Credit Risk: A bond issuer may default (relevant for some debt funds).
- Interest Rate Risk: Bond prices fall when rates rise.
- Liquidity Risk: Some assets may be hard to sell quickly.
- Concentration Risk: Heavy exposure to one sector or stock increases risk.

Diversifying across fund types and asset classes reduces these risks.`,
      },
      {
        qEn: 'What happens to my money if the mutual fund company shuts down?',
        aEn: `Your money and the fund's securities are not the AMC's personal assets. Securities are held by an independent custodian (usually a bank).

If an AMC fails, SEBI and regulators usually move the fund to another AMC or orderly liquidate assets and return proceeds to investors. Your units and NAV remain your property.`,
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgSoft: 'bg-orange-50/60',
    borderSoft: 'border-orange-200/60',
    items: [
      {
        qEn: 'What kind of returns can I realistically expect?',
        aEn: `Returns depend on fund type and time horizon. Typical long-term averages (not guaranteed):

- Equity (large-cap): ~10–13% p.a. over 10+ years
- Equity (mid/small-cap): ~12–18% p.a. (more volatile)
- Hybrid funds: ~8–12% p.a.
- Debt funds: ~6–8% p.a.
- Liquid funds: ~4–6% p.a.

These are long-term averages; yearly returns vary. Staying invested for 5–10+ years smooths volatility. Past performance does not guarantee future results.`,
      },
      {
        qEn: 'How does compounding work in mutual funds?',
        aEn: `Compounding means your returns earn further returns over time. This accelerates wealth growth the longer you stay invested.

Example (approx.): Rs 10,000/month SIP at 12% p.a.:
- 5 years -> ~Rs 8.2 lakh (invested: Rs 6 lakh)
- 10 years -> ~Rs 23.2 lakh (invested: Rs 12 lakh)
- 20 years -> ~Rs 1 crore (invested: Rs 24 lakh)

Start early and stay consistent to benefit most from compounding.`,
      },
      {
        qEn: 'Are mutual fund returns guaranteed?',
        aEn: `No. Mutual fund returns are not guaranteed because they are market-linked. Risk varies by fund type:

- Liquid/overnight funds: very low volatility; negative returns are rare.
- Debt funds: lower volatility but not guaranteed.
- Equity funds: can be volatile short-term; historically they have outperformed inflation over long horizons (7+ years), but past performance is no guarantee.

If you need guaranteed returns, consider products like fixed deposits, PPF, or government bonds, which usually have lower long-term growth.`,
      },
    ],
  },
  {
    id: 'tax',
    label: 'Taxation',
    icon: Receipt,
    color: 'text-purple-600',
    bgSoft: 'bg-purple-50/60',
    borderSoft: 'border-purple-200/60',
    items: [
      {
        qEn: 'How are mutual fund returns taxed in India?',
        aEn: `Taxation on mutual funds in India depends on the asset class and holding period, fully updated as per the latest Union Budget (Finance Act 2024):

1. Equity-Oriented Funds (>=65% equity allocation):
- Short-Term Capital Gains (STCG, held < 1 year): Taxed at 20% on the gains.
- Long-Term Capital Gains (LTCG, held >= 1 year): Taxed at 12.5% on gains exceeding ₹1.25 Lakhs in a financial year (gains up to ₹1.25 Lakhs are tax-free).

2. Debt-Oriented Funds (<=35% equity allocation):
- Gains are taxed as per your individual Income Tax Slab Rate, regardless of the holding period (for all investments made on or after April 1, 2023). Indexation benefits are no longer available.

3. Hybrid Funds (other than equity/debt):
- Taxed based on their exact equity exposure. For funds with equity exposure between 35% and 65%, STCG (held < 2 years) is taxed at your individual slab rates, while LTCG (held >= 2 years) is taxed at 12.5% without indexation.

Always consult a tax professional before making tax-sensitive investments.`,
      },
      {
        qEn: 'What is ELSS and how does it save tax?',
        aEn: `ELSS (Equity Linked Savings Scheme) is an equity mutual fund eligible for deduction under Section 80C.

- Investments in ELSS qualify for Section 80C deductions (subject to the prevailing limit).
- ELSS usually has a 3-year lock-in, typically the shortest among 80C options.

ELSS offers tax saving plus equity exposure; returns remain market-linked.`,
      },
      {
        qEn: 'Do I pay tax if I switch between mutual fund schemes?',
        aEn: `Yes. Switching is usually treated as a redemption from the first scheme and a purchase in the second.

- Any capital gains from the redeemed units are taxable.
- The holding period for tax purposes restarts in the new scheme.

Consider tax consequences before switching, especially with large unrealized gains.`,
      },
    ],
  },
  {
    id: 'fees',
    label: 'Fees & Costs',
    icon: Scale,
    color: 'text-teal-600',
    bgSoft: 'bg-teal-50/60',
    borderSoft: 'border-teal-200/60',
    items: [
      {
        qEn: 'What fees do I pay when investing in mutual funds?',
        aEn: `Main costs:

- Expense Ratio (TER): An annual fee taken from the fund's assets to cover management and operations. Lower for index funds, higher for active funds.
- Exit Load: Fee for redeeming within a specified period (not all funds have it).
- Small transaction charges or stamp duty may apply.

There are no entry loads in India. Direct plans usually have lower expense ratios than regular plans.`,
      },
      {
        qEn: 'What is the difference between Direct and Regular plans?',
        aEn: `Two purchase options:

- Regular Plan: Bought via a distributor or broker; may include distributor commission in the expense ratio.
- Direct Plan: Bought directly from the AMC; usually lower expense ratio because no distributor commission.

Over long periods, small differences in expense ratio can materially affect returns due to compounding. Use Direct if you do your own research; use Regular if you need advice.`,
      },
    ],
  },
  {
    id: 'liquidity',
    label: 'Liquidity',
    icon: Droplets,
    color: 'text-cyan-600',
    bgSoft: 'bg-cyan-50/60',
    borderSoft: 'border-cyan-200/60',
    items: [
      {
        qEn: 'How quickly can I withdraw my money from a mutual fund?',
        aEn: `Most open-ended mutual funds are liquid:

- Liquid Funds: Redemption proceeds are usually credited by T+1 (next business day). Some funds offer instant redemption up to specified limits (e.g., Rs 50,000).
- Equity Funds: Typically credited in 2–3 business days, depending on the AMC and scheme.
- Debt Funds: Typically credited in 1–2 business days.

You can redeem partially or fully anytime, but exit loads or scheme rules may apply.

Exceptions with lock-in:
- ELSS: usually a 3-year lock-in per investment.
- Close-ended funds: cannot be redeemed until maturity.
- Some solution-oriented funds may have longer lock-ins (e.g., 5 years).`,
      },
      {
        qEn: 'What is an exit load and when does it apply?',
        aEn: `An exit load is a fee charged by a fund if you redeem units before a specified holding period. It helps discourage short-term trading.

Examples (varies by scheme):
- Many equity funds: an exit load may apply if redeemed within 1 year (commonly around 1%).
- Liquid funds: may have a small graded exit load for the first few days.
- Index funds: often have no or very low exit loads.
- ELSS: typically no exit load, but has a mandatory lock-in period.

Exit loads are deducted from redemption proceeds. Check the Scheme Information Document (SID) for exact terms before investing.`,
      },
    ],
  },
  {
    id: 'sip',
    label: 'SIP vs Lump Sum',
    icon: Landmark,
    color: 'text-indigo-600',
    bgSoft: 'bg-indigo-50/60',
    borderSoft: 'border-indigo-200/60',
    items: [
      {
        qEn: 'What is SIP and how is it different from lump sum investing?',
        aEn: `SIP (Systematic Investment Plan) is investing a fixed amount regularly (monthly, weekly, quarterly). Lump sum is investing the full amount at once.

Why choose SIP:
- Rupee Cost Averaging: buy more units when price is low, fewer when high.
- Disciplined: automates investing; no market timing needed.
- Accessible: start small (e.g., Rs 500/month).

Why choose Lump Sum:
- Deploys full capital immediately; can benefit if markets rise.
- Useful for windfalls (bonus, inheritance).

For many salaried investors, SIP is recommended; lump sum is suitable when you understand market timing.`,
      },
      {
        qEn: 'Can I increase, pause, or stop my SIP anytime?',
        aEn: `Yes. SIPs are flexible:

- Increase: start an additional SIP or use a step-up SIP to raise amounts over time.
- Pause/Skip: some AMCs allow pausing or skipping installments temporarily.
- Stop: cancel a SIP anytime; cancelling stops future payments but does not redeem existing units.

Canceling does not automatically redeem your invested units; they remain invested and will move with the market.`,
      },
      {
        qEn: 'How much should I invest via SIP per month?',
        aEn: `There is no single answer. Practical steps:

1. Define your goal and time horizon (retirement, home, child education).
2. Estimate the total amount needed and an expected return.
3. Calculate a monthly SIP that helps reach the goal.

Rule of thumb: To reach ~Rs 1 crore in 15 years at ~12% p.a., a SIP of about Rs 20,000/month is a rough estimate.

Start with what you can afford (even Rs 500/month) and increase over time. Consistency is more important than the initial amount.`,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InvestFaq() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScrollLimits = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    setShowLeftScroll(el.scrollLeft > 4);
    const maxScroll = el.scrollWidth - el.clientWidth;
    setShowRightScroll(el.scrollLeft < maxScroll - 4);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 200;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    checkScrollLimits();

    const resizeObserver = new ResizeObserver(() => {
      checkScrollLimits();
    });
    resizeObserver.observe(el);

    window.addEventListener("resize", checkScrollLimits);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", checkScrollLimits);
    };
  }, []);

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <AnimatedSection animation="elegant-fade" delay={200} duration={500}>
      <div className="w-full max-w-3xl mx-auto px-1 sm:px-0">
        {/* Section heading */}
        <div className="text-center mb-5 sm:mb-6 px-2 sm:px-0">
          <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200/50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2.5 tracking-wide">
            <HelpCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            Frequently Asked Questions
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-2 tracking-tight">
            Everything You Need to Know
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed px-2 sm:px-0">
            Clear, jargon-free answers to the most common questions about mutual fund investing in India.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {/* Category pills - scrollable on mobile & centered on desktop */}
          <div className="relative px-3 sm:px-6 pt-3.5 sm:pt-4.5 pb-2.5 border-b border-gray-100/80 overflow-hidden">
            {/* Left fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("left")}
              className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/95 to-transparent z-10 transition-opacity duration-300 flex items-center pl-2 ${
                showLeftScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-blue-600/90 animate-pulse-slow translate-y-[2px] transition-transform duration-200 hover:scale-120 active:scale-90" />
            </button>

            {/* Right fade scroll indicator */}
            <button 
              type="button"
              onClick={() => scroll("right")}
              className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/95 to-transparent z-10 transition-opacity duration-300 flex items-center justify-end pr-2 ${
                showRightScroll ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-blue-600/90 animate-pulse-slow translate-y-[2px] transition-transform duration-200 hover:scale-120 active:scale-90" />
            </button>

            <div 
              ref={scrollContainerRef}
              onScroll={checkScrollLimits}
              className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1.5 sm:gap-2 w-full pb-1 -mb-1 px-6"
            >
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = cat.id === activeCategory;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      inline-flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap
                      ${
                        isActive
                          ? `${cat.bgSoft} ${cat.color} ${cat.borderSoft} border shadow-sm scale-[1.02]`
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent'
                      }
                    `}
                  >
                    <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FAQ accordion */}
          <div className="px-3 sm:px-6 py-3.5 sm:py-4.5">
            <div>
              {/* Active category header */}
              <div className="flex items-center gap-2 mb-3.5">
                <div className={`p-1 rounded-lg ${activeCat.bgSoft} ${activeCat.borderSoft} border`}>
                  <activeCat.icon className={`w-3.5 h-3.5 ${activeCat.color}`} />
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                  {activeCat.label}
                </h3>

                <span className="text-[10px] sm:text-[11px] text-gray-400 ml-auto whitespace-nowrap">
                  {activeCat.items.length} question{activeCat.items.length > 1 ? 's' : ''}
                </span>
              </div>

              <Accordion type="single" collapsible className="space-y-1.5">
                {activeCat.items.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${activeCat.id}-${idx}`}
                    className="border border-gray-100/80 rounded-xl px-2.5 sm:px-3.5 overflow-hidden data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all"
                  >
                    <AccordionTrigger 
                      className="text-left text-xs sm:text-sm font-semibold text-slate-800 hover:no-underline gap-2 py-2.5 sm:py-3.5 items-start leading-snug"
                    >
                      <span className="flex items-start gap-2">
                        <ChevronRight className={`w-3 h-3 sm:w-3.5 sm:h-3.5 mt-0.5 flex-shrink-0 ${activeCat.color} opacity-50`} />
                        <span className="leading-snug">{item.qEn}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent 
                      className="text-xs sm:text-[13px] text-gray-600 whitespace-pre-line pl-5 sm:pl-7 pb-2.5 sm:pb-3.5 leading-normal sm:leading-relaxed font-normal"
                    >
                      {item.aEn}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-3 sm:px-6 py-3 bg-gray-50/50 border-t border-gray-100/60">
            <p className="text-center text-[9px] sm:text-[10px] text-gray-400 leading-relaxed">
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
              <br className="hidden sm:block" /> The information above is for educational purposes and may not reflect the latest regulatory changes.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
