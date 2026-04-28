"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronRight, Droplets, HelpCircle, Landmark, Receipt, Scale, Shield, TrendingUp, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Language = "en" | "bn";

interface FaqItem {
  q: string;
  aEn: string;
  aBn: string;
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
        q: 'What exactly is a mutual fund?',
    aEn: `A mutual fund pools money from many investors and invests it in stocks, bonds, or other securities. A professional fund manager runs the fund.

This gives small investors diversification and expert management without buying many individual securities. In India, mutual funds are regulated by SEBI, which enforces disclosures and investor protections.`,
    aBn: `Mutual fund হলো একসাথে অনেক বিনিয়োগকারীর টাকা পুল করে stocks, bonds ইত্যাদিতে বিনিয়োগ করার একটি ব্যবস্থা। একজন professional fund manager এটি পরিচালনা করেন।

এতে ছোট বিনিয়োগকারীরাও risk ভাগ করে নিতে পারেন এবং পেশাদারিভাবে তত্ত্বাবধান পেয়ে সুবিধা পান। ভারতে SEBI ফান্ডগুলিকে নিয়ন্ত্রন করে এবং প্রয়োজনীয় তথ্য প্রকাশ নিশ্চিত করে।`,
      },
      {
        q: 'How does a mutual fund actually work?',
    aEn: `How it works:

1. Investors give money to a fund.
2. The fund manager pools and invests it per the fund's objective.
3. The fund's price is shown as NAV (Net Asset Value) and is updated regularly.
4. If the fund's holdings gain value, NAV and your holding increase; if they fall, NAV falls.

You can invest as a lump sum or by SIP (Systematic Investment Plan) to add regularly.`,
    aBn: `কীভাবে কাজ করে:

1. বিনিয়োগকারীরা টাকা দেন।
2. fund manager তা একত্র করে fund-এর লক্ষ্য অনুযায়ী বিনিয়োগ করেন।
3. ফান্ডের দাম NAV হিসেবে প্রকাশিত হয় এবং নিয়মিত আপডেট হয়।
4. ফান্ডের সম্পদের দাম উঠলে NAV বাড়ে, কমে গেলে NAV কমে।

আপনি lump sum বা নিয়মিত SIP-এর মাধ্যমে অর্থ জমা করতে পারেন।`,
      },
      {
        q: 'What is NAV and why does it matter?',
    aEn: `NAV (Net Asset Value) is the price of one unit of a mutual fund.

Formula: NAV = (Total Assets - Total Liabilities) / Total Units

Example: If NAV = Rs 50 and you invest Rs 10,000, you get 200 units. If NAV rises to Rs 60, your holding is worth Rs 12,000.

NAV is published regularly (usually daily) and is used when buying or selling units.`,
    aBn: `NAV (Net Asset Value) হলো একটি ইউনিটের মূল্য।

ফর্মুলা: NAV = (Total Assets - Total Liabilities) / Total Units

উদাহরণ: NAV Rs 50 হলে Rs 10,000 দিলে 200 units পাওয়া যায়; NAV Rs 60 হলে হোল্ডিং Rs 12,000 হবে।

NAV সাধারণত প্রতিদিন প্রকাশিত হয় এবং কেনাবেচার সময় রেফারেন্স হিসেবে ব্যবহৃত হয়।`,
      },
      {
        q: 'What are the main types of mutual funds in India?',
    aEn: `Common types:

- Equity Funds: Invest mainly in stocks. Higher risk and potentially higher returns (large-cap, mid-cap, small-cap).
- Debt Funds: Invest in bonds and money-market instruments. Lower risk, steadier returns (liquid, short-duration).
- Hybrid Funds: Mix of equity and debt to balance risk and return.
- Index Funds & ETFs: Track an index (e.g., Nifty 50) and usually have low fees.
- Solution-Oriented Funds: Built for goals like retirement or child education; may have lock-ins.`,
    aBn: `প্রধান ধরনের ফান্ড:

- Equity Funds: মূলত shares-এ বিনিয়োগ করে; ঝুঁকি বেশি, সম্ভবত রিটার্নও বেশি (large-cap, mid-cap ইত্যাদি)।
- Debt Funds: bonds ও money-market-এ; ঝুঁকি কম এবং রিটার্ন স্থিতিশীল।
- Hybrid Funds: equity ও debt মিশিয়ে ঝুঁকি ও রিটার্ন ব্যালান্স করে।
- Index Funds/ETFs: কোনো index (e.g., Nifty 50) অনুসরণ করে; খরচ কম থাকে।
- Solution-Oriented Funds: নির্দিষ্ট লক্ষ্য (retirement, child education) পূরণের জন্য; মাঝে মাঝে lock-in থাকে।`,
      },
      {
        q: 'Do I need a Demat account to invest in mutual funds?',
    aEn: `No. A Demat account is not required for most mutual fund investments. You can invest via the AMC's website/app or through a distributor.

Typical requirements: PAN and Aadhaar (for KYC), a bank account, mobile number and email. KYC is usually a one-time process.`,
    aBn: `না। mutual fund-এ সাধারণত Demat account লাগে না। আপনি AMC-এর ওয়েবসাইট/অ্যাপ বা distributor-এর মাধ্যমে বিনিয়োগ করতে পারেন。

প্রয়োজনীয়তা: PAN ও Aadhaar (KYC), একটি ব্যাংক অ্যাকাউন্ট, মোবাইল ও ইমেইল। KYC সাধারণত একবারেই হয়ে যায়।`,
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
        aEn: `Mutual funds are market-linked, so they carry risk. A well-diversified fund makes losing everything very unlikely, but short-term losses can occur.

Protections:
- SEBI regulation and required disclosures.
- Fund assets are held by an independent custodian, not the AMC.
- Diversification reduces the impact of any single security.

Equity funds can fall sharply in some years (e.g., 10–30%). A longer holding period (5–10 years) lowers the chance of permanent loss.`,
        aBn: `Mutual fund market-linked, তাই ঝুঁকি আছে। ভালভাবে diversified হলে সব টাকা হারানোর সম্ভাবনা খুব কম, তবে স্বল্পকালীন ক্ষতি হতে পারে।

সুরক্ষা:
- SEBI নিয়ম ও তথ্য প্রকাশ বাধ্যতামূলক।
- ফান্ডের সম্পদ independent custodian-এর কাছে রাখা হয়, AMC থেকে আলাদা।
- diversification একক সিকিউরিটির প্রভাব কমায়।

Equity fund কোনো বছরে 10–30% পর্যন্ত কমতে পারে। 5–10 বছর ধরে রাখলে স্থায়ী ক্ষতির ঝুঁকি কমে।`,
      },
            {
        q: 'What are the different types of risk in mutual funds?',
        aEn: `Common risks:

      - Market Risk: Fund value moves with market (important for equity funds).
      - Credit Risk: A bond issuer may default (relevant for some debt funds).
      - Interest Rate Risk: Bond prices fall when rates rise.
      - Liquidity Risk: Some assets may be hard to sell quickly.
      - Concentration Risk: Heavy exposure to one sector or stock increases risk.

      Diversifying across fund types and asset classes reduces these risks.`,
        aBn: `মূল ঝুঁকিগুলো:

      - Market Risk: বাজারের ওঠা-নামার সাথে ফান্ড মূল্য ওঠানামা করে (বিশেষ করে equity)।
      - Credit Risk: bond issuer default করলে ক্ষতি হতে পারে (কিছু debt fund-এ)।
      - Interest Rate Risk: সুদ বাড়লে bond-এর দাম পড়ে।
      - Liquidity Risk: কোনো সম্পদ দ্রুত বিক্রি করা কঠিন হলে সমস্যা হয়।
      - Concentration Risk: একাধিক পজিশন না রেখে অতিরিক্ত এক্সপোজার ঝুঁকি বাড়ায়।

      বিভিন্ন fund ও asset class-এ বিনিয়োগ করে ঝুঁকি কমানো যায়।`,
            },
      {
        q: 'What happens to my money if the mutual fund company shuts down?',
        aEn: `Your money and the fund's securities are not the AMC's personal assets. Securities are held by an independent custodian (usually a bank).

If an AMC fails, SEBI and regulators usually move the fund to another AMC or orderly liquidate assets and return proceeds to investors. Your units and NAV remain your property.`,
        aBn: `আপনার টাকা AMC-এর ব্যক্তিগত সম্পত্তি নয়। ফান্ডের সিকিউরিটিগুলো independent custodian (সাধারণত ব্যাংক)-এর কাছে থাকে।

AMC যদি বন্ধ হয়, SEBI সাধারণত ফান্ড অন্য AMC-এ স্থানান্তর করে বা সম্পদ বিক্রি করে বিনিয়োগকারীদের টাকা ফেরত দেয়। আপনার units এবং NAV আপনারই থাকে।`,
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
        aEn: `Returns depend on fund type and time horizon. Typical long-term averages (not guaranteed):

- Equity (large-cap): ~10–13% p.a. over 10+ years
- Equity (mid/small-cap): ~12–18% p.a. (more volatile)
- Hybrid funds: ~8–12% p.a.
- Debt funds: ~6–8% p.a.
- Liquid funds: ~4–6% p.a.

These are long-term averages; single-year equity returns can vary widely. Staying invested for 5–10+ years smooths volatility. Past performance does not guarantee future results.`,
        aBn: `রিটার্ন fund-এর ধরন ও সময়কাল অনুসারে পরিবর্তিত হয়। দীর্ঘমেয়াদী গড় (গ্যারান্টি নয়):

- Equity (large-cap): ~10–13% p.a. (10+ বছর)
- Equity (mid/small-cap): ~12–18% p.a. (ভোলাটাইল)
- Hybrid: ~8–12% p.a.
- Debt: ~6–8% p.a.
- Liquid: ~4–6% p.a.

এগুলো long-term গড়; এক বছরের রিটার্ন খুব ভিন্ন হতে পারে। 5–10 বছর ধরে থাকলে ওঠানামা মসৃণ হয়। পূর্ববর্তী পারফরম্যান্স ভবিষ্যৎ নিশ্চিত করে না।`,
      },
      {
        q: 'How does compounding work in mutual funds?',
    aEn: `Compounding means your returns earn further returns over time. This accelerates wealth growth the longer you stay invested.

Example (approx.): Rs 10,000/month SIP at 12% p.a.:
- 5 years -> ~Rs 8.2 lakh (invested: Rs 6 lakh)
- 10 years -> ~Rs 23.2 lakh (invested: Rs 12 lakh)
- 20 years -> ~Rs 1 crore (invested: Rs 24 lakh)

Start early and stay consistent to benefit most from compounding.`,
        aBn: `Compounding মানে আপনার প্রাপ্ত রিটার্ন সময়ের সঙ্গে আরও রিটার্ন তৈরি করে। সময় বাড়লে বৃদ্ধি দ্রুত হয়।

উদাহরণ (আনুমানিক): Rs 10,000/মাস SIP, 12% p.a.:
- 5 বছর -> ~Rs 8.2 lakh (মোট বিনিয়োগ: Rs 6 lakh)
- 10 বছর -> ~Rs 23.2 lakh (মোট বিনিয়োগ: Rs 12 lakh)
- 20 বছর -> ~Rs 1 crore (মোট বিনিয়োগ: Rs 24 lakh)

আগে শুরু করুন এবং নিয়মিত থাকুন, তাহলে compounding-এর লাভ বেশি পাবেন।`,
      },
      {
        q: 'Are mutual fund returns guaranteed?',
        aEn: `No. Mutual fund returns are not guaranteed because they are market-linked. Risk varies by fund type:

- Liquid/overnight funds: very low volatility; negative returns are rare.
- Debt funds: lower volatility but not guaranteed.
- Equity funds: can be volatile short-term; historically they have outperformed inflation over long horizons (7+ years), but past performance is no guarantee.

If you need guaranteed returns, consider products like fixed deposits, PPF, or government bonds, which usually have lower long-term growth.`,
        aBn: `না। mutual fund-এর রিটার্ন guaranteed নয়; কারণ এগুলো market-linked। ঝুঁকি fund-নির্ভর:

- Liquid/overnight: volatility খুব কম, negative return বিরল।
- Debt: তুলনামূলকভাবে কম ঝুঁকি, তবে guaranteed নয়।
- Equity: স্বল্পমেয়াদে ভোলাটাইল, দীর্ঘমেয়াদে (7+ বছর) históricoভাবে মুদ্রাস্ফীতিকে অতিক্রম করেছে, কিন্তু অতীত ফলাফল ভবিষ্যৎ নিশ্চিত করে না।

Guaranteed রিটার্ন চাইলে fixed deposits, PPF বা government bonds বিবেচনা করুন; দীর্ঘমেয়াদে growth সাধারণত mutual fund-এর তুলনায় কম হতে পারে।`,
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
        aEn: `Tax depends on fund type and holding period. Rules change, so confirm current law. Common points:

Equity Funds (>=65% equity):
- Short-term (STCG, held < 1 year): taxed at rates that may include 15% for certain listed equity gains (check current law).
- Long-term (LTCG, held >= 1 year): often taxed (e.g., 10% on gains above Rs 1,00,000), subject to current rules.

Debt Funds:
- Taxed at your income tax slab rate; indexation benefits may apply for long-term holdings.

Hybrid Funds: Tax treatment depends on the equity proportion (treated as equity if >=65%).

Consult a tax advisor or check the latest rules before making tax-sensitive decisions.`,
        aBn: `ট্যাক্স fund-এর ধরন ও হোল্ডিং পিরিয়ড অনুসারে পরিবর্তিত হয়; নিয়ম সময়ে সময়ে বদলে যেতে পারে। সাধারণ নির্দেশিকা:

Equity Funds (>=65% equity):
- Short-term (STCG, <1 year): নির্দিষ্ট অবস্থায় 15% বা প্রযোজ্য আইন অনুযায়ী।
- Long-term (LTCG, >=1 year): Rs 1,00,000 ছাড়ের ওপর গেইনে প্রযোজ্য হারে ট্যাক্স ধার্য হতে পারে (সর্বশেষ নিয়ম দেখুন)।

Debt Funds:
- আপনার income tax slab অনুযায়ী ট্যাক্স; দীর্ঘমেয়াদে indexation সুবিধা থাকতে পারে।

Hybrid: equity অনুপাত >=65% হলে equity হিসেবে ট্যাক্স ধরা হয়।

ট্যাক্স সংক্রান্ত সিদ্ধান্তের আগে সর্বশেষ আইন দেখুন বা ট্যাক্স পরামর্শকের সঙ্গে পরামর্শ করুন।`,
      },
      {
        q: 'What is ELSS and how does it save tax?',
        aEn: `ELSS (Equity Linked Savings Scheme) is an equity mutual fund eligible for deduction under Section 80C.

- Investments in ELSS qualify for Section 80C deductions (subject to the prevailing limit).
- ELSS usually has a 3-year lock-in, typically the shortest among 80C options.

ELSS offers tax saving plus equity exposure; returns remain market-linked.`,
        aBn: `ELSS (Equity Linked Savings Scheme) একটি equity mutual fund যা Section 80C-এর আওতায় ট্যাক্স সুবিধা দেয়।

- ELSS-এ বিনিয়োগ করলে Section 80C-এর সীমা পর্যন্ত ট্যাক্স ছাড় নেওয়া যায়।
- সাধারণত ELSS-এ 3 বছর lock-in থাকে, যা 80C অপশনের মধ্যে ছোট।

ELSS ট্যাক্স-সেভিং দেয়, কিন্তু রিটার্ন বাজার-নির্ভরই থাকে।`,
      },
      {
        q: 'Do I pay tax if I switch between mutual fund schemes?',
        aEn: `Yes. Switching is usually treated as a redemption from the first scheme and a purchase in the second.

- Any capital gains from the redeemed units are taxable.
- The holding period for tax purposes restarts in the new scheme.

Consider tax consequences before switching, especially with large unrealized gains.`,
        aBn: `হ্যাঁ। সাধারণত switch-কে প্রথম scheme-এর redemption এবং পরের scheme-এ নতুন ক্রয় হিসেবে ধরা হয়।

- redeemed units-এ যে capital gain হয় তা ট্যাক্সযোগ্য।
- নতুন scheme-এ holding period ট্যাক্স উদ্দেশ্যে পুনরায় শুরু হয়।

বড় unrealized gain থাকলে switch করার আগে ট্যাক্স প্রভাব বিবেচনা করুন।`,
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
        aEn: `Main costs:

- Expense Ratio (TER): An annual fee taken from the fund's assets to cover management and operations. Lower for index funds, higher for active funds.
- Exit Load: Fee for redeeming within a specified period (not all funds have it).
- Small transaction charges or stamp duty may apply.

There are no entry loads in India. Direct plans usually have lower expense ratios than regular plans.`,
        aBn: `প্রধান খরচ:

- Expense Ratio (TER): বার্ষিক ফি যা ফান্ডের সম্পদ থেকে কেটে নেওয়া হয়; index fund-এ সাধারণত কম, active fund-এ বেশি।
- Exit Load: নির্দিষ্ট সময়ের মধ্যে redeem করলে ধার্য ফি (সব ফান্ডে থাকে না)।
- ছোট ট্রানজ্যাকশন চার্জ বা stamp duty প্রযোজ্য হতে পারে।

ভারতে entry load নেই। Direct plan-এ সাধারণত expense ratio কম থাকে।`,
      },
      {
        q: 'What is the difference between Direct and Regular plans?',
        aEn: `Two purchase options:

- Regular Plan: Bought via a distributor or broker; may include distributor commission in the expense ratio.
- Direct Plan: Bought directly from the AMC; usually lower expense ratio because no distributor commission.

Over long periods, small differences in expense ratio can materially affect returns due to compounding. Use Direct if you do your own research; use Regular if you need advice.`,
        aBn: `কেনার দুটি উপায়:

- Regular Plan: distributor/agent-এর মাধ্যমে; expense ratio-এ commission থাকতে পারে।
- Direct Plan: AMC থেকে সরাসরি; distributor commission না থাকায় expense ratio সাধারণত কম।

দীর্ঘমেয়াদে ছোট খরচের পার্থক্যও compounding-এর মাধ্যমে বড় প্রভাব ফেলতে পারে। নিজে গবেষণা করলে Direct সুবিধাজনক, পরামর্শ পেতে Regular ব্যবহার করতে পারেন।`,
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
        aEn: `Most open-ended mutual funds are liquid:

      - Liquid Funds: Redemption proceeds are usually credited by T+1 (next business day). Some funds offer instant redemption up to specified limits (e.g., Rs 50,000).
      - Equity Funds: Typically credited in 2–3 business days, depending on the AMC and scheme.
      - Debt Funds: Typically credited in 1–2 business days.

      You can redeem partially or fully anytime, but exit loads or scheme rules may apply.

      Exceptions with lock-in:
      - ELSS: usually a 3-year lock-in per investment.
      - Close-ended funds: cannot be redeemed until maturity.
      - Some solution-oriented funds may have longer lock-ins (e.g., 5 years).`,
        aBn: `অনেক open-ended mutual fund লিকুইড, অর্থাৎ সহজে বিক্রি করা যায়:

- Liquid Funds: সাধারণত T+1 এ টাকা ব্যাংকে আসে; কিছু ফান্ড নির্দিষ্ট সীমা পর্যন্ত instant redemption দেয় (উদাহরণ: Rs 50,000)।
- Equity Funds: সাধারণত T+2 থেকে T+3 সময় লাগে।
- Debt Funds: সাধারণত T+1 থেকে T+2 সময় লাগে।

আংশিক বা পুরোপুরি যখন ইচ্ছা redeem করা যায়, তবে exit load বা scheme নিয়ম প্রযোজ্য হতে পারে।

Lock-in উদাহরণ:
- ELSS: সাধারণত 3 বছর lock-in।
- Close-ended: maturity পর্যন্ত redeem করা যায় না।
- কিছু solution-oriented fund-এ দীর্ঘ lock-in থাকতে পারে (যেমন 5 বছর)।`,
      },
      {
        q: 'What is an exit load and when does it apply?',
        aEn: `An exit load is a fee charged by a fund if you redeem units before a specified holding period. It helps discourage short-term trading.

      Examples (varies by scheme):
      - Many equity funds: an exit load may apply if redeemed within 1 year (commonly around 1%).
      - Liquid funds: may have a small graded exit load for the first few days.
      - Index funds: often have no or very low exit loads.
      - ELSS: typically no exit load, but has a mandatory lock-in period.

      Exit loads are deducted from redemption proceeds. Check the Scheme Information Document (SID) for exact terms before investing.`,
        aBn: `Exit load হলো একটি ফি, যা scheme-এ নির্দিষ্ট holding period-এর আগে units redeem করলে কেটে নেওয়া হয়। এটি স্বল্পকালীন ট্রেডিং কমাতে সাহায্য করে।

      উদাহরণ (scheme অনুযায়ী পরিবর্তিত হতে পারে):
      - অনেক equity fund-এ 1 বছরের মধ্যে redeem করলে exit load লাগতে পারে (সাধারণত ~1%)।
      - Liquid fund-এ প্রথম কয়েক দিনে graded exit load থাকতে পারে।
      - Index fund-এ সাধারণত exit load নেই বা খুব কম থাকে。
      - ELSS-এ সাধারণত exit load থাকে না, তবে lock-in বাধ্যতামূলক।

      Exit load সরাসরি redemption proceeds থেকে কাটা হয়। বিনিয়োগের আগে SID (Scheme Information Document) দেখে নিন।`,
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
        aEn: `SIP (Systematic Investment Plan) is investing a fixed amount regularly (monthly, weekly, quarterly). Lump sum is investing the full amount at once.

Why choose SIP:
- Rupee Cost Averaging: buy more units when price is low, fewer when high.
- Disciplined: automates investing; no market timing needed.
- Accessible: start small (e.g., Rs 500/month).

Why choose Lump Sum:
- Deploys full capital immediately; can benefit if markets rise.
- Useful for windfalls (bonus, inheritance).

For many salaried investors, SIP is recommended; lump sum is suitable when you understand market timing.`,
        aBn: `SIP (Systematic Investment Plan) মানে নিয়মিত নির্দিষ্ট পরিমাণ (মাসিক/সাপ্তাহিক/ত্রীমাসিক) বিনিয়োগ করা। Lump sum মানে পুরো অর্থ একবারে বিনিয়োগ।

SIP-এর সুবিধা:
- Rupee Cost Averaging: দাম কমে বেশি unit, দাম বেড়ে কম unit কেনা হয়।
- নিয়মিত ও স্বয়ংক্রিয়; market timing-এর প্রয়োজন কম।
- ছোট থেকে শুরু করা যায় (উদাহরণ: Rs 500/মাস)।

Lump sum-এর সুবিধা:
- পুরো পুঁজিটি একবারে কাজ করে; বাজার ওঠালেই লাভ দ্রুত।
- windfall বিনিয়োগের জন্য উপযুক্ত।

সাধারণভাবে salaried ব্যক্তিদের জন্য SIP সুপারিশকৃত; market বুঝে Lump sum ব্যবহার করা যায়।`,
      },
      {
        q: 'Can I increase, pause, or stop my SIP anytime?',
        aEn: `Yes. SIPs are flexible:

- Increase: start an additional SIP or use a step-up SIP to raise amounts over time.
- Pause/Skip: some AMCs allow pausing or skipping installments temporarily.
- Stop: cancel a SIP anytime; cancelling stops future payments but does not redeem existing units.

Canceling does not automatically redeem your invested units; they remain invested and will move with the market.`,
        aBn: `হ্যাঁ। SIP নমনীয়:

- বাড়ানো: অতিরিক্ত SIP শুরু করা যায় বা step-up SIP দিয়ে পরিমাণ বাড়ানো যায়।
- বিরতি/skip: কিছু AMC সাময়িকভাবে কিস্তি pause/skip করার অপশন দেয়।
- বন্ধ: SIP যেকোনো সময় cancel করা যায়; এতে ভবিষ্যতের কিস্তি বন্ধ হয়, কিন্তু পুরোনো units রিডিম হয় না।

Cancel করলে আপনার বিদ্যমান ইউনিটগুলো একইভাবে বাজার অনুয়ায়ী থাকবে।`,
      },
      {
        q: 'How much should I invest via SIP per month?',
        aEn: `There is no single answer. Practical steps:

      1. Define your goal and time horizon (retirement, home, child education).
      2. Estimate the total amount needed and an expected return.
      3. Calculate a monthly SIP that helps reach the goal.

      Rule of thumb: To reach ~Rs 1 crore in 15 years at ~12% p.a., a SIP of about Rs 20,000/month is a rough estimate.

      Start with what you can afford (even Rs 500/month) and increase over time. Consistency is more important than the initial amount.`,
        aBn: `একটি নির্দিষ্ট সংখ্যা নেই। ব্যবহারিক ধাপ:

1. লক্ষ্য ও সময়কাল নির্ধারণ করুন (retirement, বাড়ি, শিশু শিক্ষা)।
2. প্রয়োজনীয় মোট অর্থ এবং প্রত্যাশিত রিটার্ন অনুমান করুন।
3. লক্ষ্য অনুযায়ী মাসিক SIP হিসাব করুন।

নিয়মিত নির্দেশিকা: 15 বছরে ~12% ধরলে Rs 1 crore লক্ষ্য হলে প্রায় Rs 20,000/মাস একটি আনুমানিক রেফারেন্স।

আপনার সামর্থ্য অনুযায়ী শুরু করুন (এমনকি Rs 500/মাস) এবং পরে বাড়ান; ধারাবাহিকতা সবচেয়ে গুরুত্বপূর্ণ।`,
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
  const [language, setLanguage] = useState<Language>('en');

  const getAnswer = (item: FaqItem) => (language === 'bn' ? item.aBn : item.aEn);

  /* Search supports both English and Bengali body content */
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return null;

    const q = searchQuery.toLowerCase();
    const results: { cat: FaqCategory; item: FaqItem }[] = [];

    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        const searchable = `${item.q} ${item.aEn} ${item.aBn}`.toLowerCase();
        if (searchable.includes(q)) {
          results.push({ cat, item });
        }
      });
    });

    return results;
  }, [searchQuery]);

  const activeCat = categories.find((c) => c.id === activeCategory) ?? categories[0];

  return (
    <AnimatedSection animation="elegant-fade" delay={200} duration={500}>
      <div className="w-full max-w-5xl mx-auto px-1 sm:px-0">
        {/* Section heading */}
        <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
          <div className="inline-flex items-center gap-2 bg-blue-50/70 border border-blue-200/50 text-blue-700 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900 mb-3 tracking-tight">
            Everything You Need to Know
          </h2>

          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Clear, jargon-free answers to the most common questions about mutual fund investing in India.
          </p>

          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs sm:text-sm text-gray-500">Language</span>
            <div className="inline-flex rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                  language === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-pressed={language === 'en'}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                  language === 'bn'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                aria-pressed={language === 'bn'}
              >
                BN
              </button>
            </div>
          </div>

        </div>

        {/* Search bar */}
        <div className="relative max-w-xl mx-auto mb-6 sm:mb-8 px-1 sm:px-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder='Search questions... e.g. "tax", "SIP", "risk"'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-14 sm:pr-16 py-3.5 rounded-xl bg-white/90 border border-gray-200/80 text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-300 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xs font-semibold h-8 px-2 rounded-md hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>

        {/* Main card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {/* Category pills (hidden during search) */}
          {!filteredItems && (
            <div className="px-3 sm:px-6 pt-4 sm:pt-5 pb-3 border-b border-gray-100/80">
              <div className="-mx-1 px-1 overflow-x-auto sm:overflow-visible">
                <div className="flex sm:flex-wrap gap-2 justify-start sm:justify-center min-w-max sm:min-w-0 pb-1">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = cat.id === activeCategory;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                          inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap
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
            </div>
          )}

          {/* FAQ accordion */}
          <div className="px-3 sm:px-6 py-4 sm:py-5">
            {filteredItems !== null ? (
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
                          key={`${cat.id}-${idx}`}
                          value={`search-${idx}`}
                          className="border border-gray-100/80 rounded-xl px-3 sm:px-4 overflow-hidden data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all"
                        >
                          <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-slate-800 hover:no-underline gap-3 py-3.5 sm:py-4 items-start">
                            <span className="flex items-start gap-2.5 sm:gap-3">
                              <span className={`mt-0.5 flex-shrink-0 ${cat.color}`}>
                                <CatIcon className="w-4 h-4" />
                              </span>
                              <span className="leading-snug">
                                {item.q}
                                <span className={`ml-2 text-[10px] font-medium ${cat.color} opacity-70`}>
                                  {cat.label}
                                </span>
                              </span>
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="text-sm sm:text-[15px] text-gray-600 leading-7 whitespace-pre-line">
                            {getAnswer(item)}
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              )
            ) : (
              <div>
                {/* Active category header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`p-1.5 rounded-lg ${activeCat.bgSoft} ${activeCat.borderSoft} border`}>
                    <activeCat.icon className={`w-4 h-4 ${activeCat.color}`} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-800">{activeCat.label}</h3>

                  <span className="text-xs text-gray-400 ml-auto whitespace-nowrap">
                    {activeCat.items.length} question{activeCat.items.length > 1 ? 's' : ''}
                  </span>
                </div>

                <Accordion type="single" collapsible className="space-y-2">
                  {activeCat.items.map((item, idx) => (
                    <AccordionItem
                      key={idx}
                      value={`${activeCat.id}-${idx}`}
                      className="border border-gray-100/80 rounded-xl px-3 sm:px-4 overflow-hidden data-[state=open]:border-gray-200 data-[state=open]:shadow-sm transition-all"
                    >
                      <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-slate-800 hover:no-underline gap-2.5 sm:gap-3 py-3.5 sm:py-4 items-start">
                        <span className="flex items-start gap-2.5 sm:gap-3">
                          <ChevronRight className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${activeCat.color} opacity-50`} />
                          <span className="leading-snug">{item.q}</span>
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm sm:text-[15px] text-gray-600 leading-7 whitespace-pre-line pl-6 sm:pl-7">
                        {getAnswer(item)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-3 sm:px-6 py-4 bg-gray-50/50 border-t border-gray-100/60">
            <p className="text-center text-xs text-gray-400 leading-relaxed">
              Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing.
              <br className="hidden sm:block" /> The information above is for educational purposes and may not reflect the latest regulatory changes.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
