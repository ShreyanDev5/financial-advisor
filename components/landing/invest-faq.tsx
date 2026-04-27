'use client';

import { useState, useMemo } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  BookOpen,
  Shield,
  TrendingUp,
  Receipt,
  Droplets,
  Scale,
  Landmark,
  Search,
  ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Category & FAQ data                                                */
/* ------------------------------------------------------------------ */

interface FaqItem {
  q: string;
  a: string; // supports line-breaks via \n → rendered with whitespace
}

interface FaqCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string; // tailwind text-color token
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
        q: 'What exactly is a mutual fund?',
        a: `A mutual fund is a professionally managed investment vehicle that pools money from many investors to buy a diversified portfolio of stocks, bonds, or other securities.\n\nThink of it like a shared bus ride — everyone chips in, a skilled driver (fund manager) navigates the route, and the destination (returns) is shared proportionally based on how much each person contributed.\n\nIn India, mutual funds are regulated by SEBI (Securities and Exchange Board of India), which ensures transparency and investor protection.`,
      },
      {
        q: 'How does a mutual fund actually work?',
        a: `Here's the simplified flow:\n\n1. You invest money into a mutual fund scheme.\n2. The fund manager combines your money with other investors' money.\n3. This pooled corpus is invested in stocks, bonds, or both — depending on the fund's objective.\n4. The fund's value is reflected in its NAV (Net Asset Value), calculated daily.\n5. When the underlying assets grow in value, the NAV rises, and your investment grows.\n\nYou can invest via SIP (Systematic Investment Plan) for regular, disciplined investing or as a one-time lump sum.`,
      },
      {
        q: 'What is NAV and why does it matter?',
        a: `NAV stands for Net Asset Value. It is the per-unit market value of all the securities held by the fund, minus liabilities, divided by the total number of units outstanding.\n\nNAV = (Total Assets − Total Liabilities) ÷ Total Units\n\nWhen you invest ₹10,000 and the NAV is ₹50, you get 200 units. If the NAV later rises to ₹60, your investment is worth ₹12,000.\n\nNAV is updated at the end of every business day and is the price at which you buy or sell mutual fund units.`,
      },
      {
        q: 'What are the main types of mutual funds in India?',
        a: `Mutual funds are broadly classified by asset class:\n\n• Equity Funds – Invest primarily in stocks. Higher risk, higher potential returns. Examples: large-cap, mid-cap, small-cap, flexi-cap, sectoral funds.\n\n• Debt Funds – Invest in bonds, government securities, and money market instruments. Lower risk, more stable returns. Examples: liquid funds, short-duration, gilt funds.\n\n• Hybrid Funds – Mix of equity and debt for balanced risk-return. Examples: aggressive hybrid, balanced advantage, conservative hybrid.\n\n• Index Funds & ETFs – Passively track a market index like Nifty 50 or Sensex. Low cost, no active fund manager decisions.\n\n• Solution-Oriented Funds – Designed for goals like retirement or children's education, often with a lock-in period.`,
      },
      {
        q: 'Do I need a Demat account to invest in mutual funds?',
        a: `No, a Demat account is NOT required to invest in mutual funds. You can invest directly through the AMC (Asset Management Company) website, apps, or through a distributor/advisor.\n\nAll you need is:\n• PAN card and Aadhaar (for KYC)\n• A bank account\n• Mobile number and email\n\nKYC is a one-time process, and once done, you can invest in any mutual fund scheme across all AMCs.`,
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
        q: 'Are mutual funds safe? Can I lose all my money?',
        a: `Mutual funds are market-linked investments, so they carry varying degrees of risk — but losing all your money is extremely unlikely with diversified funds.\n\nKey safety aspects:\n• Regulated by SEBI – strict rules on transparency, auditing, and fund management.\n• Diversification – your money is spread across many securities, reducing single-stock risk.\n• Custodian-held assets – your investments are held by a separate custodian (not the AMC), protecting you even if the fund house faces issues.\n\nThat said, short-term fluctuations are normal. Equity funds can drop 10-30% in a bad year, but historically recover and grow over 5-10+ year horizons.`,
      },
      {
        q: 'What are the different types of risk in mutual funds?',
        a: `• Market Risk – Value fluctuates with market movements. Affects equity funds most.\n\n• Credit Risk – The issuer of a bond may default. Relevant for debt funds investing in corporate bonds.\n\n• Interest Rate Risk – Bond prices fall when interest rates rise. Affects debt and hybrid funds.\n\n• Liquidity Risk – Difficulty selling underlying assets quickly. Rare in large-cap equity and liquid debt funds.\n\n• Concentration Risk – Over-exposure to a single sector or stock. Sectoral/thematic funds carry this.\n\nDiversification across fund types and asset classes is the best way to manage these risks.`,
      },
      {
        q: 'What happens to my money if the mutual fund company shuts down?',
        a: `Your money is safe. Here's why:\n\n• The mutual fund's assets are held by an independent custodian (usually a bank), not by the AMC.\n• If an AMC shuts down, SEBI mandates that the fund is either transferred to another AMC or the assets are liquidated and returned to investors.\n• Your units and NAV belong to you — the AMC only manages the fund.\n\nThis separation of asset ownership from management is a critical investor protection feature under Indian securities law.`,
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
        q: 'What kind of returns can I realistically expect?',
        a: `Returns depend on the fund type and time horizon. Historical averages (not guarantees):\n\n• Equity (large-cap): 10–13% per annum over 10+ years\n• Equity (mid/small-cap): 12–18% per annum (with higher volatility)\n• Hybrid funds: 8–12% per annum\n• Debt funds: 6–8% per annum\n• Liquid funds: 4–6% per annum\n\nImportant: These are long-term averages. In any single year, equity returns can range from −20% to +50%. Consistency comes from staying invested over 5–10+ years.\n\nPast performance does not guarantee future results.`,
      },
      {
        q: 'How does compounding work in mutual funds?',
        a: `Compounding means your returns generate their own returns over time. It is the most powerful wealth-building force.\n\nExample: ₹10,000/month SIP at 12% annual return:\n• After 5 years → ~₹8.2 lakh (invested: ₹6 lakh)\n• After 10 years → ~₹23.2 lakh (invested: ₹12 lakh)\n• After 20 years → ~₹1 crore (invested: ₹24 lakh)\n\nThe key insight: in year 1, your returns come mostly from your principal. By year 15-20, the majority of your wealth is from compounded returns, not from what you deposited. Start early, stay consistent.`,
      },
      {
        q: 'Are mutual fund returns guaranteed?',
        a: `No. Mutual fund returns are never guaranteed because they are market-linked. This applies to ALL mutual funds — including debt funds.\n\nHowever, risk varies significantly:\n• Liquid/overnight funds have very low volatility and rarely deliver negative returns.\n• Equity funds can fluctuate sharply in the short term but have historically delivered strong inflation-beating returns over 7+ years.\n\nIf you want guaranteed returns, consider fixed deposits, PPF, or government bonds — but these typically grow slower than inflation-adjusted mutual fund returns over the long term.`,
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
        q: 'How are mutual fund returns taxed in India?',
        a: `Taxation depends on the fund type and holding period (as per the latest rules):\n\nEquity Funds (≥65% equity allocation):\n• STCG (held < 1 year): 20% on gains\n• LTCG (held ≥ 1 year): 12.5% on gains exceeding ₹1.25 lakh/year\n\nDebt Funds:\n• All gains (regardless of holding period) are taxed at your income tax slab rate.\n\nHybrid Funds:\n• Taxed as equity if equity allocation ≥ 65%, otherwise as debt.\n\nNote: Tax laws change periodically. Always verify the latest rules or consult your advisor before making tax-related decisions.`,
      },
      {
        q: 'What is ELSS and how does it save tax?',
        a: `ELSS (Equity Linked Savings Scheme) is a type of equity mutual fund that qualifies for tax deduction under Section 80C of the Income Tax Act.\n\n• You can claim a deduction of up to ₹1.5 lakh per financial year on ELSS investments.\n• ELSS has the shortest lock-in period among 80C instruments — just 3 years.\n• After the lock-in, your units remain invested and continue to grow unless you redeem them.\n\nELSS offers the dual benefit of tax saving and wealth creation through equity exposure. It's often considered the most efficient 80C option for long-term investors.`,
      },
      {
        q: 'Do I pay tax if I switch between mutual fund schemes?',
        a: `Yes. Switching from one scheme to another is treated as a redemption from the first scheme and a fresh purchase in the second. This means:\n\n• Any capital gains on the redeemed units are taxable.\n• The holding period resets for the new scheme.\n\nSo switching is not "free" — plan your switches carefully, especially if you have significant unrealized gains. Within the same fund house, switching between growth and IDCW (dividend) options of the same scheme is also a taxable event.`,
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
        q: 'What fees do I pay when investing in mutual funds?',
        a: `The primary costs are:\n\n• Expense Ratio (TER) – An annual fee charged by the fund for management, operations, and distribution. It is deducted daily from the NAV (you don't pay it separately). Ranges from 0.05% for index funds to 2.25% for actively managed equity funds.\n\n• Exit Load – A fee charged if you redeem units before a specified period (usually 1% if redeemed within 1 year for equity funds). Not all funds have exit loads.\n\n• Stamp Duty – 0.005% on all mutual fund purchases (very small).\n\nThere are NO entry loads in India (abolished by SEBI in 2009). Direct plans have lower expense ratios than regular plans.`,
      },
      {
        q: 'What is the difference between Direct and Regular plans?',
        a: `Every mutual fund scheme offers two variants:\n\n• Regular Plan – Purchased through a distributor/broker who earns a commission from the AMC. This commission is embedded in the expense ratio, making it higher.\n\n• Direct Plan – Purchased directly from the AMC (no intermediary). Lower expense ratio since there's no distribution commission.\n\nThe difference in expense ratio is typically 0.5–1% per year. Over 20 years, this seemingly small difference can result in 15–25% more wealth in the direct plan due to compounding.\n\nDirect plans are ideal if you can research and select funds yourself. Regular plans make sense if you value personalized advisory and guidance.`,
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
        q: 'How quickly can I withdraw my money from a mutual fund?',
        a: `Most open-ended mutual funds offer high liquidity:\n\n• Liquid Funds – Redemption proceeds credited within T+1 day (next business day). Some offer instant redemption up to ₹50,000.\n• Equity Funds – Typically T+2 to T+3 business days.\n• Debt Funds – Typically T+1 to T+2 business days.\n\nYou can redeem partially or fully at any time (subject to exit load, if applicable).\n\nExceptions with lock-in:\n• ELSS – 3-year lock-in per SIP installment.\n• Close-ended funds – Cannot redeem until maturity.\n• Solution-oriented funds – 5-year lock-in.`,
      },
      {
        q: 'What is an exit load and when does it apply?',
        a: `An exit load is a fee charged when you redeem units before a specified holding period. It discourages short-term trading and protects long-term investors.\n\nCommon examples:\n• Most equity funds: 1% if redeemed within 1 year, nil after that.\n• Liquid funds: Graded exit load for first 7 days, nil after 7 days.\n• Index funds: Often zero or very low exit load.\n• ELSS: No exit load (but has a 3-year lock-in).\n\nThe exit load is deducted from the redemption proceeds. Always check the scheme's exit load structure in the Scheme Information Document (SID) before investing.`,
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
        q: 'What is SIP and how is it different from lump sum investing?',
        a: `SIP (Systematic Investment Plan) means investing a fixed amount at regular intervals (monthly, weekly, or quarterly). Lump sum means investing the entire amount at once.\n\nSIP advantages:\n• Rupee Cost Averaging – You buy more units when prices are low and fewer when high, smoothing out volatility.\n• Disciplined investing – Automates the process; no need to time the market.\n• Accessible – Start with as little as ₹500/month.\n\nLump sum advantages:\n• Full capital is deployed immediately, benefiting if markets rise from day one.\n• Simpler for windfall amounts (bonus, inheritance).\n\nFor most salaried individuals, SIP is the recommended approach. Lump sum works well for experienced investors who understand market conditions.`,
      },
      {
        q: 'Can I increase, pause, or stop my SIP anytime?',
        a: `Yes, SIPs are completely flexible:\n\n• Increase – You can start an additional SIP in the same fund or use a "step-up SIP" to automatically increase the amount annually (e.g., 10% increase every year).\n• Pause/Skip – Many AMCs allow you to pause SIP installments for a few months without cancellation.\n• Stop – You can cancel a SIP at any time. Your existing units remain invested until you choose to redeem them.\n\nStopping a SIP does NOT redeem your invested money — it simply stops future installments. Your accumulated units continue to grow (or decline) with the market.`,
      },
      {
        q: 'How much should I invest via SIP per month?',
        a: `A common guideline is to invest at least 20–30% of your take-home salary toward long-term goals. But the right SIP amount depends on:\n\n1. Your financial goals (retirement, house, children's education)\n2. Time horizon for each goal\n3. Expected rate of return\n4. Current savings and expenses\n\nQuick rule of thumb: To accumulate ₹1 crore in 15 years at ~12% return, you need a SIP of approximately ₹20,000/month.\n\nStart with whatever you can afford — even ₹500/month — and increase it over time as your income grows. The most important factor is consistency, not the amount.`,
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function InvestFaq() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  /* Filtered items for search */
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null; // null means "show category view"
    const q = searchQuery.toLowerCase();
    const results: { cat: FaqCategory; item: FaqItem }[] = [];
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)) {
          results.push({ cat, item });
        }
      });
    });
    return results;
  }, [searchQuery]);

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <AnimatedSection animation="elegant-fade" delay={200} duration={500}>
      <div className="sm:max-w-5xl sm:mx-auto">
        {/* Section heading */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200/50 text-blue-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 mb-3 tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Clear, jargon-free answers to the most common questions about mutual fund investing in India.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-lg mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions… e.g. &quot;tax&quot;, &quot;SIP&quot;, &quot;risk&quot;"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/90 border border-gray-200/80 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-300 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Main card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {/* Category pills (hidden during search) */}
          {!filteredItems && (
            <div className="px-4 sm:px-6 pt-5 pb-3 border-b border-gray-100/80">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`
                        inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
                        ${
                          isActive
                            ? `${cat.bgSoft} ${cat.color} ${cat.borderSoft} border shadow-sm`
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 border border-transparent'
                        }
                      `}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* FAQ accordion */}
          <div className="px-4 sm:px-6 py-4">
            {filteredItems !== null ? (
              /* Search results mode */
              filteredItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium">No questions matched your search.</p>
                  <p className="text-xs mt-1">Try different keywords or browse by category.</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-400 mb-4 font-medium">
                    {filteredItems.length} result{filteredItems.length > 1 ? 's' : ''} found
                  </p>
                  <Accordion type="single" collapsible className="space-y-2">
                    {filteredItems.map(({ cat, item }, idx) => {
                      const CatIcon = cat.icon;
                      return (
                        <AccordionItem
                          key={idx}
                          value={`search-${idx}`}
                          className="border border-gray-100/80 rounded-xl px-4 overflow-hidden data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all"
                        >
                          <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-slate-800 hover:no-underline gap-3 py-4">
                            <span className="flex items-start gap-3">
                              <span className={`mt-0.5 flex-shrink-0 ${cat.color}`}>
                                <CatIcon className="w-4 h-4" />
                              </span>
                              <span>
                                {item.q}
                                <span className={`ml-2 text-[10px] font-medium ${cat.color} opacity-70`}>
                                  {cat.label}
                                </span>
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              )
            ) : (
              /* Category mode */
              <div>
                {/* Active category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1.5 rounded-lg ${activeCat.bgSoft} ${activeCat.borderSoft} border`}>
                    <activeCat.icon className={`w-4 h-4 ${activeCat.color}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-800">
                    {activeCat.label}
                  </h3>
                  <span className="text-xs text-gray-400 ml-auto">
                    {activeCat.items.length} question{activeCat.items.length > 1 ? 's' : ''}
                  </span>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {activeCat.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${activeCat.id}-${idx}`}
                      className="border border-gray-100/80 rounded-xl px-4 overflow-hidden data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-slate-800 hover:no-underline gap-3 py-4">
                        <span className="flex items-center gap-3">
                          <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 ${activeCat.color} opacity-50`} />
                          <span>{item.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600 leading-relaxed whitespace-pre-line pl-6.5">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-4 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-100/60">
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
              <br className="hidden sm:block" />
              {' '}The information above is for educational purposes and may not reflect the latest regulatory changes.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
