/* Glossary, blurt topics, sorting sets, speed-round statements and simulator data. */
window.PQ = window.PQ || {};

/* t = term, d = definition, u = unit, w = crossword answer (letters only) */
PQ.GLOSSARY = [
  { t: "Gross pay", d: "Total pay before any deductions are taken out", u: "u1", w: "GROSS" },
  { t: "Net pay", d: "Take-home pay after deductions", u: "u1", w: "NET" },
  { t: "Wage", d: "Pay for each hour worked", u: "u1", w: "WAGE" },
  { t: "Salary", d: "A fixed yearly amount of pay split into equal paychecks", u: "u1", w: "SALARY" },
  { t: "Commission", d: "Pay based on a percentage of what you sell", u: "u1", w: "COMMISSION" },
  { t: "Overtime", d: "Extra hours beyond normal, often paid at a higher rate", u: "u1", w: "OVERTIME" },
  { t: "Deduction", d: "Money taken out of pay before you receive it, like tax", u: "u1", w: "DEDUCTION" },
  { t: "Pay stub", d: "The document showing how your pay was calculated (payslip)", u: "u1", w: "PAYSLIP" },
  { t: "Year-to-date (YTD)", d: "Running total since the start of the tax year", u: "u1" },
  { t: "Income tax", d: "Tax taken from what you earn to fund public services", u: "u1", w: "TAX" },
  { t: "Progressive tax", d: "A system where higher slices of income are taxed at higher rates", u: "u1", w: "PROGRESSIVE" },
  { t: "Budget", d: "A plan for how you will use your money", u: "u2", w: "BUDGET" },
  { t: "Fixed expense", d: "A cost that is the same every month, like a phone plan", u: "u2", w: "FIXED" },
  { t: "Variable expense", d: "A cost that changes month to month, like food or fun", u: "u2", w: "VARIABLE" },
  { t: "Need", d: "Something essential for safety, health, housing or work", u: "u2", w: "NEED" },
  { t: "Want", d: "Something that makes life more fun but isn't essential", u: "u2", w: "WANT" },
  { t: "50/30/20 rule", d: "Split net pay into needs, wants and savings", u: "u2" },
  { t: "Zero-based budget", d: "A budget where every unit of income is given a job", u: "u2" },
  { t: "Budget leak", d: "Small repeat spending that drains money unnoticed", u: "u2", w: "LEAK" },
  { t: "Pay yourself first", d: "Moving money to savings before spending anything", u: "u3" },
  { t: "Emergency fund", d: "Savings kept only for unexpected, necessary costs", u: "u3", w: "EMERGENCY" },
  { t: "SMART goal", d: "A goal that is specific, measurable, achievable, relevant and time-bound", u: "u3", w: "SMART" },
  { t: "Sinking fund", d: "Money saved bit by bit for a planned future cost", u: "u3", w: "SINKING" },
  { t: "Impulse buy", d: "An unplanned purchase made in the moment", u: "u3", w: "IMPULSE" },
  { t: "Scarcity marketing", d: "Making you fear missing out with “only 3 left” or timers", u: "u3", w: "SCARCITY" },
  { t: "Checking account", d: "An everyday bank account for spending (current account)", u: "u4", w: "CHECKING" },
  { t: "Savings account", d: "A bank account for money you are keeping, usually paying interest", u: "u4", w: "SAVINGS" },
  { t: "Interest", d: "Money paid for borrowing or earned for saving", u: "u4", w: "INTEREST" },
  { t: "APY / AER", d: "The yearly rate a savings account pays, including compounding", u: "u4", w: "APY" },
  { t: "Compound interest", d: "Interest earned on your money and on interest already earned", u: "u4", w: "COMPOUND" },
  { t: "Debit card", d: "A card that spends your own money from your account", u: "u4", w: "DEBIT" },
  { t: "Overdraft", d: "Borrowing that lets your account balance go below zero", u: "u4", w: "OVERDRAFT" },
  { t: "Phishing", d: "Fake messages that try to steal your details or money", u: "u4", w: "PHISHING" },
  { t: "Money mule", d: "Someone who moves criminal money through their account", u: "u4", w: "MULE" },
  { t: "Deposit protection", d: "A government scheme protecting bank savings up to a limit", u: "u4" },
  { t: "Principal", d: "The original amount of money borrowed", u: "u5", w: "PRINCIPAL" },
  { t: "APR", d: "The yearly cost of borrowing, including most fees", u: "u5", w: "APR" },
  { t: "Credit card", d: "A card that lets you borrow money up to a limit", u: "u5", w: "CREDIT" },
  { t: "Minimum payment", d: "The smallest amount you must pay on a credit card each month", u: "u5", w: "MINIMUM" },
  { t: "Credit score", d: "A number showing how reliable you are at repaying debt", u: "u5", w: "SCORE" },
  { t: "Credit utilisation", d: "How much of your credit limit you are using", u: "u5", w: "UTILISATION" },
  { t: "BNPL", d: "Buy now, pay later: splitting a purchase into instalments", u: "u5", w: "BNPL" },
  { t: "Payday loan", d: "A short-term loan with extremely high costs", u: "u5" },
  { t: "Debt", d: "Money that you owe", u: "u5", w: "DEBT" },
  { t: "Inflation", d: "The general rise in prices over time", u: "u6", w: "INFLATION" },
  { t: "Stock", d: "A small slice of ownership in a company (a share)", u: "u6", w: "STOCK" },
  { t: "Bond", d: "A loan you make to a government or company that pays interest", u: "u6", w: "BOND" },
  { t: "Index fund", d: "A fund that buys every company in a market index", u: "u6", w: "INDEX" },
  { t: "Dividend", d: "Part of a company's profit paid out to shareholders", u: "u6", w: "DIVIDEND" },
  { t: "Diversification", d: "Spreading money across many investments to reduce risk", u: "u6", w: "DIVERSIFY" },
  { t: "Rule of 72", d: "Divide 72 by the yearly return to estimate years to double", u: "u6" },
  { t: "Employer match", d: "Money your employer adds when you save into a workplace pension", u: "u6", w: "MATCH" },
  { t: "Pension", d: "Long-term savings for retirement", u: "u6", w: "PENSION" },
  { t: "Unit price", d: "The cost per item, per 100 g or per litre", u: "u7" },
  { t: "Subscription", d: "A recurring payment for ongoing access to something", u: "u7", w: "SUBSCRIPTION" },
  { t: "Total cost of ownership", d: "Every cost of owning something over its life", u: "u7" },
  { t: "Warranty", d: "A promise to repair or replace a product if it breaks", u: "u7", w: "WARRANTY" },
  { t: "Chargeback", d: "Reversing a card payment through your bank", u: "u7", w: "CHARGEBACK" },
  { t: "Receipt", d: "Proof of what you bought, when and for how much", u: "u7", w: "RECEIPT" },
  { t: "Premium", d: "The amount you pay for an insurance policy", u: "u8", w: "PREMIUM" },
  { t: "Deductible / excess", d: "What you pay yourself before insurance pays out", u: "u8", w: "EXCESS" },
  { t: "Claim", d: "Asking an insurer to pay out", u: "u8", w: "CLAIM" },
  { t: "Identity theft", d: "Using someone's personal details to commit fraud", u: "u8" },
  { t: "Asset", d: "Something you own that has value", u: "u8", w: "ASSET" },
  { t: "Liability", d: "Something you owe", u: "u8", w: "LIABILITY" },
  { t: "Net worth", d: "Assets minus liabilities", u: "u8", w: "NETWORTH" },
  { t: "Scholarship", d: "Money for education that usually doesn't need repaying", u: "u8", w: "SCHOLARSHIP" },
  { t: "Apprenticeship", d: "A job where you earn while you train", u: "u8", w: "APPRENTICE" }
];

/* Blurt topics: concepts with keyword groups, plus common misconceptions to catch. */
PQ.BLURT = [
  { u: "u1", title: "Paychecks & taxes", prompt: "Write everything you know about how a paycheck works: gross pay, deductions, net pay, pay stubs and taxes.",
    concepts: [
      { label: "Gross pay is the total before deductions", any: ["gross"], also: ["before", "total"] },
      { label: "Net pay / take-home pay is what you receive", any: ["net", "take-home", "take home"] },
      { label: "Deductions include income tax", any: ["income tax", "tax"] },
      { label: "Social insurance / social security / national insurance", any: ["social", "national insurance", "insurance contribution", "pension contribution"] },
      { label: "Pay is hourly rate × hours (or salary)", any: ["hour", "rate", "salary", "wage"] },
      { label: "Pay stubs list hours, deductions and YTD totals", any: ["stub", "payslip", "pay slip", "ytd", "year-to-date", "year to date"] },
      { label: "Budget using net pay, not gross", any: ["budget"] },
      { label: "Tax brackets: only income above the line is taxed at the higher rate", any: ["bracket", "progressive", "band"] }
    ],
    wrong: [
      { re: "net (pay )?is (the )?(total )?before", fix: "Net pay is after deductions. Gross pay is before." },
      { re: "gross (pay )?is (what you )?(take|after|receive)", fix: "Gross pay is the total before deductions. Net pay is what you take home." },
      { re: "(raise|pay rise).{0,40}(less|lose)", fix: "A raise can't make you take home less overall. Only income above the bracket line is taxed at the higher rate." },
      { re: "budget.{0,20}gross", fix: "Budget with net pay. Gross pay includes money you never receive." }
    ] },
  { u: "u2", title: "Budgeting", prompt: "Write everything you remember about budgeting: what it is, needs vs wants, the 50/30/20 rule and budgeting methods.",
    concepts: [
      { label: "A budget is a plan for your money", any: ["plan"] },
      { label: "Income minus expenses", any: ["income", "expense"] },
      { label: "Fixed vs variable expenses", any: ["fixed", "variable"] },
      { label: "Needs are essential", any: ["need"] },
      { label: "Wants are extras", any: ["want"] },
      { label: "50/30/20: needs, wants, savings", any: ["50/30/20", "50 30 20", "50-30-20", "50%", "30%", "20%"] },
      { label: "Zero-based or envelope budgeting", any: ["zero", "envelope", "pots", "every dollar", "every pound", "job"] },
      { label: "Track spending and find leaks", any: ["track", "leak", "review"] }
    ],
    wrong: [
      { re: "30%?.{0,15}(saving|save)", fix: "In 50/30/20, the 30% is wants and 20% is savings." },
      { re: "50%?.{0,15}(want|fun)", fix: "In 50/30/20, the 50% is for needs." },
      { re: "never (buy|spend).{0,20}(fun|want)", fix: "A good budget includes fun money on purpose." }
    ] },
  { u: "u3", title: "Saving & goals", prompt: "Write everything you know about saving: paying yourself first, emergency funds, SMART goals, sinking funds and avoiding impulse buys.",
    concepts: [
      { label: "Pay yourself first: save before spending", any: ["pay yourself first", "save first", "before spending", "before you spend"] },
      { label: "Automate savings", any: ["automat", "standing order", "transfer"] },
      { label: "Emergency fund for unexpected, necessary costs", any: ["emergency"] },
      { label: "Emergency fund size: 3 to 6 months of expenses", any: ["3 to 6", "3-6", "three to six", "months of expenses", "3 months", "6 months"] },
      { label: "SMART goals", any: ["smart", "specific", "measurable", "time-bound", "time bound"] },
      { label: "Sinking funds for planned costs", any: ["sinking"] },
      { label: "Impulse buys and marketing tricks", any: ["impulse", "scarcity", "marketing", "dopamine", "anchor"] },
      { label: "The 30-day rule", any: ["30 day", "30-day", "thirty day", "wait"] }
    ],
    wrong: [
      { re: "emergency.{0,40}(holiday|concert|sale|shopping)", fix: "Emergencies are urgent, necessary and unexpected. Holidays and sales are not emergencies." },
      { re: "save (whatever|what).{0,10}left", fix: "Saving what's left usually leaves nothing. Pay yourself first." }
    ] },
  { u: "u4", title: "Banking & safety", prompt: "Write everything you know about bank accounts, interest, cards, overdrafts and staying safe from scams.",
    concepts: [
      { label: "Checking/current account for spending", any: ["checking", "current account"] },
      { label: "Savings account for keeping money", any: ["savings account", "saving account"] },
      { label: "Interest / APY / AER", any: ["interest", "apy", "aer"] },
      { label: "Compound interest", any: ["compound"] },
      { label: "Debit vs credit cards", any: ["debit"] },
      { label: "Overdrafts and fees", any: ["overdraft", "fee"] },
      { label: "Phishing / scam messages", any: ["phishing", "scam", "fake"] },
      { label: "Never share PINs, passwords or one-time codes", any: ["pin", "password", "code", "two-factor", "2fa"] },
      { label: "Deposit protection (FDIC, FSCS)", any: ["fdic", "fscs", "protect"] }
    ],
    wrong: [
      { re: "debit.{0,30}(borrow|loan)", fix: "A debit card spends your own money. A credit card is borrowing." },
      { re: "bank.{0,30}(ask|need).{0,20}(pin|code|password)", fix: "Real banks never ask for your PIN, password or one-time codes." }
    ] },
  { u: "u5", title: "Credit & debt", prompt: "Write everything you know about borrowing, credit cards, credit scores, BNPL and payday loans.",
    concepts: [
      { label: "Principal and interest", any: ["principal", "interest"] },
      { label: "APR is the yearly cost of borrowing", any: ["apr"] },
      { label: "Pay the full balance to avoid interest", any: ["full balance", "pay in full", "pay it off", "grace"] },
      { label: "The minimum payment trap", any: ["minimum"] },
      { label: "Credit score: pay on time", any: ["on time", "payment history"] },
      { label: "Keep utilisation low", any: ["utilisation", "utilization", "30%", "low balance", "limit"] },
      { label: "BNPL risks", any: ["bnpl", "buy now", "pay later"] },
      { label: "Payday loans are very expensive", any: ["payday"] }
    ],
    wrong: [
      { re: "minimum.{0,30}(good|best|smart)", fix: "Paying only the minimum keeps you in debt for years and costs the most interest." },
      { re: "(more|lots of) (cards|applications).{0,30}(help|improve|better)", fix: "Many applications in a short time can lower your score." }
    ] },
  { u: "u6", title: "Investing", prompt: "Write everything you know about investing: saving vs investing, inflation, compound growth, stocks, bonds, funds, risk and scams.",
    concepts: [
      { label: "Saving is safe; investing aims to grow", any: ["grow", "growth"] },
      { label: "Inflation reduces what cash can buy", any: ["inflation"] },
      { label: "Compound growth and time", any: ["compound", "snowball", "start early", "time"] },
      { label: "Rule of 72", any: ["72"] },
      { label: "Stocks / shares", any: ["stock", "share"] },
      { label: "Bonds", any: ["bond"] },
      { label: "Index funds / ETFs", any: ["index", "etf", "fund"] },
      { label: "Diversification", any: ["diversif", "eggs", "spread"] },
      { label: "Risk and reward / long time horizon", any: ["risk"] },
      { label: "Scams: guaranteed returns are a red flag", any: ["guarantee", "scam", "too good"] }
    ],
    wrong: [
      { re: "(stocks|shares|invest\\w*).{0,30}(always go up|never (go down|fall|lose))", fix: "Investments go up and down. Growth is never guaranteed." },
      { re: "guarantee\\w*.{0,30}(return|profit).{0,20}(good|safe|real)", fix: "Guaranteed high returns are a classic scam sign." }
    ] },
  { u: "u7", title: "Smart spending", prompt: "Write everything you know about spending smartly: comparing prices, unit price, subscriptions, big purchases and consumer rights.",
    concepts: [
      { label: "Compare prices in several places", any: ["compare", "comparison"] },
      { label: "Unit price = price ÷ quantity", any: ["unit price", "per 100", "per litre", "per item"] },
      { label: "Cost per use", any: ["cost per use", "per wear", "per use", "last"] },
      { label: "Subscriptions add up yearly", any: ["subscription"] },
      { label: "Free-trial traps and reminders", any: ["trial", "reminder", "cancel"] },
      { label: "Total cost of ownership", any: ["total cost", "ownership", "insurance", "running cost"] },
      { label: "New vs used / depreciation", any: ["used", "refurb", "second-hand", "second hand", "value", "depreciat"] },
      { label: "Consumer rights, receipts, warranties", any: ["right", "receipt", "warrant", "refund", "return", "chargeback"] }
    ],
    wrong: [
      { re: "(bigger|large) (pack|size).{0,20}always cheap", fix: "Bigger packs aren't always cheaper. Check the unit price." },
      { re: "sale.{0,20}always sav", fix: "A sale only saves money if you were going to buy it anyway." }
    ] },
  { u: "u8", title: "Protecting your future", prompt: "Write everything you know about insurance, identity theft, life after school and net worth.",
    concepts: [
      { label: "Insurance shares risk", any: ["insurance", "risk"] },
      { label: "Premium", any: ["premium"] },
      { label: "Deductible / excess", any: ["deductible", "excess"] },
      { label: "Identity theft and protecting details", any: ["identity", "personal details", "password"] },
      { label: "Two-factor authentication", any: ["two-factor", "two factor", "2fa"] },
      { label: "Costs of moving out: deposit, rent, bills", any: ["deposit", "rent", "bills", "utilit"] },
      { label: "Paying for education: scholarships, loans, apprenticeships", any: ["scholarship", "grant", "student loan", "apprentice"] },
      { label: "Net worth = assets − liabilities", any: ["net worth", "asset", "liabilit"] }
    ],
    wrong: [
      { re: "net worth.{0,20}(income|salary)", fix: "Net worth is assets minus liabilities, not income." },
      { re: "higher (deductible|excess).{0,30}higher premium", fix: "A higher deductible usually means a lower premium." }
    ] }
];

/* Sorting game sets */
PQ.SORTS = [
  { id: "needwant", title: "Need or want?", groups: ["Need", "Want"], items: [["Rent", 0], ["Groceries", 0], ["Takeout delivery", 1], ["Bus pass for work", 0], ["Concert tickets", 1], ["Prescription medicine", 0], ["Streaming service", 1], ["School textbooks", 0], ["In-game skins", 1], ["Winter coat (you have none)", 0], ["Fourth pair of trainers", 1], ["Electricity bill", 0], ["Daily iced coffee", 1], ["Toothpaste and soap", 0], ["Newest phone upgrade", 1], ["Internet for homework", 0], ["Designer hoodie", 1], ["Work uniform", 0]] },
  { id: "assetliab", title: "Asset or liability?", groups: ["Asset", "Liability"], items: [["Savings account", 0], ["Credit card balance", 1], ["Index fund", 0], ["Car loan", 1], ["Student loan", 1], ["Shares in a company", 0], ["BNPL plan", 1], ["Emergency fund", 0], ["Money you lent a friend", 0], ["Overdraft", 1], ["Pension", 0], ["Phone on finance", 1]] },
  { id: "fixedvar", title: "Fixed or variable?", groups: ["Fixed", "Variable"], items: [["Rent", 0], ["Groceries", 1], ["Phone plan", 0], ["Eating out", 1], ["Gym membership", 0], ["Clothes", 1], ["Insurance premium", 0], ["Gifts", 1], ["Streaming subscription", 0], ["Fuel", 1], ["Loan repayment", 0], ["Entertainment", 1]] },
  { id: "scamsafe", title: "Scam sign or safe?", groups: ["Scam sign", "Safe"], items: [["“Guaranteed 10x returns”", 0], ["Bank app login alert you triggered", 1], ["Text asking for your one-time code", 0], ["Calling the number on your card", 1], ["“Earn by moving money through your account”", 0], ["Two-factor authentication", 1], ["“Act now or lose your account”", 0], ["Regulated investment firm", 1], ["Pay a fee to claim a prize", 0], ["Strong, unique passwords", 1]] }
];

/* Speed-round true/false statements */
PQ.SPEED = [
  ["Net pay is what you take home after deductions.", true], ["Gross pay is the amount after tax.", false],
  ["The 20% in 50/30/20 is for savings or debt payoff.", true], ["A debit card borrows money from the bank.", false],
  ["Compound interest means earning interest on interest.", true], ["Paying only the minimum on a credit card saves money.", false],
  ["Banks never ask for your one-time passcode.", true], ["A raise can make you take home less overall.", false],
  ["An emergency fund is for unexpected, necessary costs.", true], ["Concert tickets are a need.", false],
  ["Inflation means prices rise over time.", true], ["Index funds own just one company.", false],
  ["APR shows the yearly cost of borrowing.", true], ["Diversification means putting all your money in one stock.", false],
  ["Net worth is assets minus liabilities.", true], ["Payday loans are a cheap way to borrow.", false],
  ["A higher insurance deductible usually lowers your premium.", true], ["Subscriptions only cost what you see each month.", false],
  ["The rule of 72 estimates how long money takes to double.", true], ["Free trials never turn into paid plans.", false],
  ["Paying on time is the biggest factor in a credit score.", true], ["You should invest money you need next month.", false],
  ["Moving money through your account for strangers is a crime.", true], ["A bigger pack always has a lower unit price.", false],
  ["Scholarships usually don't need to be repaid.", true], ["Employer pension matching is free money.", true],
  ["Bonds are loans to governments or companies.", true], ["Overdrafts are free money.", false],
  ["A SMART goal has a deadline.", true], ["Guaranteed high returns are a sign of a good investment.", false]
];

PQ.TIPS = [
  ["2×", "Starting to invest ten years earlier can roughly double what you end up with, even with the same monthly amount."],
  ["72", "Divide 72 by your yearly return to estimate how many years your money takes to double."],
  ["30", "Wait 30 days before an unplanned purchase. Most impulse wants fade."],
  ["0", "Pay your full credit card balance every month and you pay zero interest."],
  ["3–6", "Adults aim for three to six months of essential expenses in an emergency fund."],
  ["12", "Multiply any monthly subscription by 12 to see what it really costs."],
  ["30%", "Keep credit card balances under 30% of your limit to protect your credit score."]
];

/* Life simulator data */
PQ.SIM = {
  jobs: [
    { id: "cafe", name: "Café barista", rate: 12, hours: 60, tax: 0.04, note: "Weekend and evening shifts" },
    { id: "retail", name: "Retail assistant", rate: 13, hours: 80, tax: 0.06, note: "Part-time, steady hours" },
    { id: "tutor", name: "Tutor", rate: 18, hours: 40, tax: 0.05, note: "Fewer hours, higher rate" },
    { id: "full", name: "Full-time apprentice", rate: 11, hours: 150, tax: 0.10, note: "Earn while you learn" }
  ],
  homes: [
    { id: "home", name: "Living at home", bills: [["Phone plan", 30], ["Transport", 45], ["Contribution to family", 50]], note: "Low costs, big chance to save" },
    { id: "shared", name: "Shared flat", bills: [["Rent share", 550], ["Bills share", 70], ["Groceries", 180], ["Phone plan", 30], ["Transport", 60]], note: "Independent, but expensive" }
  ],
  goals: [
    { id: "laptop", name: "Laptop for school", target: 700 },
    { id: "car", name: "First car fund", target: 1500 },
    { id: "trip", name: "Trip with friends", target: 500 },
    { id: "invest", name: "Start investing", target: 600 }
  ],
  events: [
    { id: "phone", tag: "Emergency", color: "orchid", h: "Your phone screen shatters.", p: "You need it for work shifts and school. A repair shop quotes {90}.", lesson: "u3l2", choices: [
      { l: "Repair it", cost: 90, kind: "emergency", wise: 2, msg: "Fixing what you have is the cheapest real solution. This is exactly what an emergency fund is for." },
      { l: "Buy the newest model on a credit card", cost: 800, credit: true, kind: "want", wise: -3, msg: "You turned a {90} problem into {800} of debt at 24% APR." },
      { l: "Use it cracked with a {10} screen protector", cost: 10, kind: "emergency", wise: 1, msg: "A cheap fix that works for now." }] },
    { id: "concert", tag: "Social", color: "azure", h: "Friends are going to a concert.", p: "Tickets are {75}. The group chat is buzzing.", lesson: "u2l2", choices: [
      { l: "Buy a ticket", cost: 75, kind: "want", wise: 0, msg: "Fun is part of a budget. It's fine if your fun money covers it." },
      { l: "Skip it and host a movie night", cost: 15, kind: "want", wise: 1, msg: "You kept the hangout and most of the money." }] },
    { id: "sneakers", tag: "Temptation", color: "peach", h: "A limited sneaker drop.", p: "The pair everyone wants is {180}. Yours are fine.", lesson: "u3l4", choices: [
      { l: "Buy them now", cost: 180, kind: "want", wise: -1, msg: "A big unplanned want. Check where the money came from." },
      { l: "Split it into 4 payments with BNPL", cost: 180, credit: true, kind: "want", wise: -2, msg: "It still costs {180}, and now it's debt too." },
      { l: "Use the 30-day rule", cost: 0, kind: "want", wise: 2, msg: "If you still want them in a month, you can plan for them." }] },
    { id: "shift", tag: "Opportunity", color: "matcha", h: "Your manager offers an extra shift.", p: "It pays {65} after tax this Saturday.", lesson: "u1l5", choices: [
      { l: "Take it and put it toward your goal", gain: 65, to: "goal", kind: "income", wise: 2, msg: "Extra income straight to your goal speeds everything up." },
      { l: "Take it and add it to fun money", gain: 65, to: "fun", kind: "income", wise: 1, msg: "More income is always good." },
      { l: "Pass and rest", cost: 0, kind: "want", wise: 0, msg: "Rest matters too." }] },
    { id: "gift", tag: "Bonus", color: "pistachio", h: "You get {50} for your birthday.", p: "Unexpected money. What do you do with it?", lesson: "u3l1", choices: [
      { l: "Put it all toward your goal", gain: 50, to: "goal", kind: "income", wise: 2, msg: "Windfalls are the easiest money to save." },
      { l: "Half to safety net, half to fun", gain: 50, to: "split", kind: "income", wise: 1, msg: "A balanced choice." },
      { l: "Spend it all on a treat", gain: 50, to: "fun", kind: "income", wise: 0, msg: "Enjoy it, but it could have moved your goal." }] },
    { id: "trial", tag: "Sneaky cost", color: "azure", h: "A free trial is about to renew.", p: "An app you barely use will charge {13} a month from tomorrow.", lesson: "u7l2", choices: [
      { l: "Cancel it now", cost: 0, kind: "want", wise: 2, msg: "You just saved about {156} a year." },
      { l: "Keep it", cost: 13, kind: "want", wise: -1, msg: "Forgotten subscriptions are sneaky budget leaks." }] },
    { id: "dentist", tag: "Emergency", color: "orchid", h: "Toothache. The dentist costs {60}.", p: "Waiting could make it worse and more expensive.", lesson: "u3l2", choices: [
      { l: "Go to the dentist", cost: 60, kind: "emergency", wise: 2, msg: "Health first. This is what a safety net is for." },
      { l: "Put it off", cost: 0, kind: "want", wise: -2, msg: "Delaying health costs usually makes them bigger.", later: 160 }] },
    { id: "coin", tag: "Scam alert", color: "indigo", h: "“This coin will 10x by Friday!”", p: "An influencer says it's guaranteed. Minimum buy-in is {100}.", lesson: "u6l5", choices: [
      { l: "Put {100} in", cost: 100, kind: "want", wise: -3, msg: "The coin crashed to almost nothing. Guaranteed fast riches are a scam signal." },
      { l: "Ignore it", cost: 0, kind: "want", wise: 2, msg: "Good instinct. Too good to be true usually is." }] },
    { id: "mule", tag: "Scam alert", color: "indigo", h: "A stranger DMs you a “job”.", p: "They'll pay {150} if you receive money into your account and send it on.", lesson: "u4l4", choices: [
      { l: "Accept, it's easy money", cost: 0, kind: "want", wise: -4, msg: "This is money laundering. Your account would be frozen, and it's a crime.", freeze: 120 },
      { l: "Block and report them", cost: 0, kind: "want", wise: 3, msg: "Exactly right. Never let anyone use your account." }] },
    { id: "buspass", tag: "Emergency", color: "orchid", h: "You lost your bus pass.", p: "A replacement costs {40}. You need it for work.", lesson: "u3l2", choices: [
      { l: "Replace it", cost: 40, kind: "emergency", wise: 1, msg: "Annoying but necessary. Getting to work protects your income." },
      { l: "Take rideshares all month", cost: 140, kind: "want", wise: -2, msg: "Convenient, but more than three times the cost." }] },
    { id: "jacket", tag: "Sale", color: "peach", h: "40% off a jacket you didn't plan to buy.", p: "It's {60} on sale. You already have a warm coat.", lesson: "u3l4", choices: [
      { l: "It's a deal, buy it", cost: 60, kind: "want", wise: -1, msg: "A discount on something you didn't need is still spending." },
      { l: "Walk away", cost: 0, kind: "want", wise: 1, msg: "Saving 100% beats saving 40%." }] },
    { id: "lunch", tag: "Habit check", color: "azure", h: "Lunch delivery, again.", p: "It's {18} with fees. You have food at home.", lesson: "u2l4", choices: [
      { l: "Order it", cost: 18, kind: "want", wise: -1, msg: "Delivery fees quietly double the price of food." },
      { l: "Make lunch at home", cost: 4, kind: "want", wise: 1, msg: "Do that every week and it adds up to hundreds a year." }] },
    { id: "laptopsale", tag: "Big purchase", color: "peach", h: "A refurbished laptop deal.", p: "A refurbished version of the laptop you want is 35% cheaper, with a 1-year warranty.", lesson: "u7l3", choices: [
      { l: "Note it and keep saving toward it", cost: 0, kind: "want", wise: 2, msg: "Refurbished with a warranty is often great value. Your goal just got cheaper." },
      { l: "Ignore it, only brand-new will do", cost: 0, kind: "want", wise: 0, msg: "That's your choice, but used or refurbished can save a lot." }] },
    { id: "overdraftfee", tag: "Fee alert", color: "orchid", h: "Your balance is nearly zero.", p: "You want a {6} smoothie. Your bank charges {25} if you go overdrawn.", lesson: "u4l3", choices: [
      { l: "Buy it anyway", cost: 31, kind: "want", wise: -2, msg: "That smoothie cost {31} after the overdraft fee." },
      { l: "Wait until payday", cost: 0, kind: "want", wise: 1, msg: "Checking your balance first just saved you {25}." }] }
  ]
};
