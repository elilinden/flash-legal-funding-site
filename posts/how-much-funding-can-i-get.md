---
layout: base.njk
title: "How Much Pre-Settlement Funding Can I Get?"
description: "Wondering how much cash you qualify for? Learn about the '10% Rule' and how we calculate a safe amount for your case."
tagName: "Funding Basics"
category: funding
date: 2026-05-05
tags: blog
---

<style>
  /* --- 1. Force Light Theme Variables (Matches Main Site) --- */
  :root {
    --ink: #11153a;
    --ink-soft: #2a2f57;
    --brand: #3b5bff;
    --brand-dark: #2a35d9;
    --accent: #00a59c;
    --sky: #cfeeff;
    --sky-2: #e9f6ff;
    --nav: #ffffff;
    --nav-border: #e8ecf6;
    --muted: #6a6f90;
    --panel: #ffffff; /* Changed to White */
    --card: #ffffff;
    --shadow: 0 18px 50px rgba(22,26,64,.12);
    --radius: 22px;
    --max: 1100px;
  }

  /* --- 2. header fix: Stop "Following" (Unstick) --- */
  header {
    position: relative !important;
    top: auto !important;
    background: var(--nav) !important;
    border-bottom: 1px solid var(--nav-border) !important;
  }

  /* --- 3. Page Layout --- */
  main {
    padding: 60px 0 80px;
    background: #ffffff; /* White background */
    width: 100%;
  }

  .container {
    max-width: var(--max);
    margin: 0 auto;
    padding: 0 24px;
  }

  .article {
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid var(--nav-border);
    border-radius: var(--radius);
    padding: 40px;
    box-shadow: var(--shadow);
  }

  /* --- Article Header --- */
  .articleHeader {
    text-align: center;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--nav-border);
  }

  .articleHeader .tag {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    border-radius: 999px;
    background: #f6f8ff;
    border: 1px solid #eef1fa;
    color: #1c2357;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .06em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .articleHeader h1 {
    margin: 0 0 16px;
    font-size: 38px;
    color: var(--ink);
    line-height: 1.2;
    letter-spacing: -0.5px;
  }

  .articleHeader p.sub {
    margin: 0 auto 20px;
    max-width: 60ch;
    color: var(--muted);
    font-size: 18px;
    line-height: 1.6;
  }

  .metaRow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--muted);
    font-size: 14px;
    font-weight: 600;
  }

  /* --- Content Typography --- */
  .content {
    color: var(--ink-soft);
    font-size: 17px;
    line-height: 1.8;
  }

  .content h2 {
    margin: 32px 0 16px;
    font-size: 24px;
    color: var(--ink);
  }

  .content h3 {
    margin: 28px 0 12px;
    font-size: 20px;
    color: var(--ink);
  }

  .content p { margin: 0 0 20px; }
  
  .content ul {
    margin: 10px 0 24px 24px;
    padding: 0;
  }
  .content li { margin-bottom: 10px; padding-left: 6px; }

  .callout {
    margin: 30px 0;
    padding: 24px;
    border-left: 4px solid var(--brand);
    background: #fcfdff;
    border: 1px solid var(--nav-border);
    border-left-width: 4px;
    border-radius: 12px;
    color: var(--muted);
    font-size: 15px;
    font-style: italic;
  }
  
  .backLink {
    display: inline-block;
    margin-top: 40px;
    color: var(--brand);
    font-weight: 700;
    text-decoration: none;
  }
  .backLink:hover { text-decoration: underline; }

  @media (max-width: 768px){
    .article { padding: 24px; }
    .articleHeader h1 { font-size: 30px; }
  }
</style>

<div class="container">
  <article class="article">
    <header class="articleHeader">
      <span class="tag">{{ tagName }}</span>
      <h1>{{ title }}</h1>
      <p class="sub">{{ description }}</p>
      <div class="metaRow">
        <span>{{ date | date: "%B %d, %Y" }}</span>
        <span>•</span>
        <span>By Flash Legal Funding</span>
      </div>
    </header>

    <div class="content">
      <p>When you are struggling with bills, the most important question on your mind is simple: <strong>"How much cash can I get right now?"</strong></p>
      
      <p>While every case is unique, there are specific guidelines that responsible funding companies follow. Understanding these numbers can help you set realistic expectations and plan your finances accordingly.</p>

      <h2>The "10-20% Rule"</h2>
      <p>As a general industry standard, pre-settlement funding companies typically advance between <strong>10% and 20%</strong> of the estimated future value of your case.</p>
      
      <p>For example:</p>
      <ul>
        <li>If your case is estimated to settle for <strong>$50,000</strong>, you might qualify for <strong>$5,000 to $10,000</strong>.</li>
        <li>If your case is estimated to settle for <strong>$100,000</strong>, you might qualify for <strong>$10,000 to $20,000</strong>.</li>
      </ul>

      <h2>Why Can't I Borrow the Full Amount?</h2>
      <p>You might be wondering: <em>"If my case is worth $50,000, why can't I borrow $40,000?"</em></p>
      
      <p>The answer is that responsible lenders want to ensure you still walk away with money in your pocket when the case ends. Remember, your final settlement has to pay for:</p>
      <ul>
        <li>Attorney fees (usually 33%–40%).</li>
        <li>Medical liens and doctor bills.</li>
        <li>Repayment of the pre-settlement advance.</li>
      </ul>
      
      <p>If a company lends you too much now, there might be nothing left for you later. We aim to strike a balance: giving you enough cash to cover your immediate needs (rent, car payments, food) without jeopardizing your final payout.</p>

      <h2>How We Calculate Your Case Value</h2>
      <p>When you apply at Flash Legal Funding, our team looks at three main factors to determine your limit:</p>
      
      <h3>1. Liability (Who is at fault?)</h3>
      <p>Is it clear that the other party caused the accident? If liability is disputed, the risk is higher, and the funding amount may be lower.</p>

      <h3>2. Damages (How bad is the injury?)</h3>
      <p>We look at your medical records. Broken bones, surgeries, and long-term treatments generally indicate a higher case value than soft tissue injuries.</p>

      <h3>3. Insurance Coverage</h3>
      <p>Does the defendant have enough insurance to pay the claim? Even if you have severe injuries, we are limited by the insurance policy limits of the at-fault driver.</p>

      <h2>Conclusion</h2>
      <p>While we can't tell you an exact dollar amount until we review your case, we promise to offer the maximum amount safe for your situation. Our goal is to be a lifeline, not a burden.</p>

      <div class="callout">
        Ready to find out your specific number? Apply today for a free case evaluation. We can usually tell you how much you qualify for within 24 hours.
      </div>

      <a href="/blog/" class="backLink">← Back to all posts</a>
    </div>
  </article>
</div>