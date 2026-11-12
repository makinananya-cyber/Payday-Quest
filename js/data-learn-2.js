/* Payday Quest lesson content: Units 4–6. */
window.PQ = window.PQ || {};
PQ.UNITS = PQ.UNITS || [];

PQ.UNITS.push({
  id: "u4", title: "Banking", color: "orchid",
  desc: "Choose the right accounts, make interest work for you, avoid fees and stay safe from scams.",
  lessons: [
    {
      id: "u4l1", title: "Choosing bank accounts", mins: 5,
      goals: ["Checking (current) vs savings accounts", "Accounts for under-18s", "What to compare when choosing a bank"],
      screens: [
        { h: "Two accounts, two jobs",
          b: ["A checking account (called a current account in the UK) is for everyday money. Your pay goes in, and you spend with a debit card, transfers or your phone.",
              "A savings account is for money you are keeping. It usually pays more interest and has fewer ways to spend from it, which is a good thing."],
          ex: ["A simple setup", "Paycheck → checking account → automatic transfer to savings on payday."] },
        { h: "Accounts for teens",
          b: ["Many banks offer teen or student accounts with no monthly fees. Under 18, you may need a parent or guardian to open the account with you, or the account may have limits such as no overdraft.",
              "These limits protect you while you learn. Having your own account also builds a banking history."] },
        { h: "What to compare",
          pts: ["Fees: monthly fees, ATM fees and overdraft charges", "Interest rate on savings", "A good app with spending alerts and savings pots", "Free cash machines near you", "Deposit protection: a government scheme that protects your money up to a limit if the bank fails (FDIC in the US, FSCS in the UK, and similar schemes elsewhere)"],
          tip: "Free, protected and with a good app beats a flashy sign-up gift." }
      ],
      qs: [
        { t: "match", q: "Match each account to its job.", pairs: [["Checking / current account", "Everyday spending"], ["Savings account", "Money you are keeping"], ["Debit card", "Spends from your checking account"]], e: "Separate accounts for spending and saving make both easier." },
        { t: "tf", q: "Deposit protection schemes can protect your money if a bank fails.", a: true, e: "Schemes like FDIC and FSCS protect deposits up to a limit." },
        { t: "mcq", q: "Which matters most when choosing a first bank account?", o: ["The colour of the card", "Low fees, protection and a good app", "A free gift for signing up", "The bank with the biggest adverts"], a: 1, e: "Fees and features affect you every month. A gift is a one-off." },
        { t: "fill", q: "Choose the missing words.", s: "Spend from your ___ account, and keep money you are saving in a ___ account.", a: ["checking", "savings"], bank: ["checking", "savings", "loan", "credit"], e: "Keeping them separate stops you accidentally spending your savings." },
        { t: "sort", q: "Sort these into things that cost you and things that help you.", groups: ["Costs you", "Helps you"], items: [["Monthly account fee", 0], ["Spending alerts", 1], ["ATM fees", 0], ["Savings interest", 1], ["Overdraft charges", 0]], e: "Look for helpful features and avoid accounts with high fees." }
      ]
    },
    {
      id: "u4l2", title: "Interest: money that grows", mins: 5,
      goals: ["What interest is", "APY and AER", "Simple vs compound interest"],
      screens: [
        { h: "Getting paid to save",
          b: ["When you keep money in a savings account, the bank pays you interest. That is because the bank uses deposits to make loans, and it shares some of what it earns with you.",
              "The rate is shown as a yearly percentage. A higher rate means your money grows faster, with no extra effort from you."] },
        { h: "APY and AER",
          b: ["APY (annual percentage yield, used in the US) and AER (annual equivalent rate, used in the UK) both show what you earn in a year, including interest earned on interest. They let you compare accounts fairly.",
              "Some accounts advertise a high rate only for a few months, or only on a small balance. Read the conditions."],
          ex: ["Example", "{1000} at 4% APY earns about {40} in a year."] },
        { h: "Simple vs compound interest",
          b: ["Simple interest is paid only on your original money. Compound interest is paid on your original money plus the interest you have already earned, so the growth speeds up over time.",
              "Over a few months the difference is tiny. Over years and decades it becomes huge, which is why starting early matters so much."],
          ex: ["5% on {1000}", "Year 1: {1050}. Year 2: {1102.50}. You earned interest on last year's {50} too."] }
      ],
      qs: [
        { t: "num", q: "You keep {2000} in an account paying 3% a year. About how much interest do you earn in the first year?", a: 60, money: true, e: "3% of {2000} = {60}." },
        { t: "mcq", q: "What does compound interest mean?", o: ["Interest only on your original deposit", "Interest on your deposit plus interest already earned", "A fee for saving", "Interest that goes down every year"], a: 1, e: "You earn interest on interest, so growth speeds up." },
        { t: "tf", q: "APY and AER let you compare savings accounts fairly.", a: true, e: "They show yearly growth including compounding." },
        { t: "mcq", q: "An account offers 6% for 3 months, then 1%. What should you do?", o: ["Sign up without reading", "Read the conditions and compare the rate after the offer ends", "Avoid all savings accounts", "Withdraw everything"], a: 1, e: "Teaser rates can drop sharply. Compare the normal rate too." },
        { t: "fill", q: "Type the missing word.", s: "Interest earned on interest is called ___ interest.", a: ["compound"], alt: [["compounding", "compounded"]], e: "Compound interest makes savings grow faster over time." }
      ]
    },
    {
      id: "u4l3", title: "Cards, overdrafts & fees", mins: 5,
      goals: ["Debit, credit and prepaid cards", "How overdrafts work", "How to avoid common fees"],
      screens: [
        { h: "Three kinds of card",
          pts: ["Debit card: spends your own money straight from your checking account", "Credit card: borrows the bank's money, which you must pay back, with interest if you do not clear the balance", "Prepaid card: you load money onto it first and can only spend what is loaded"],
          b: ["Phone wallets like Apple Pay or Google Pay are just a different way to use the same cards. A tap of your phone still spends real money."] },
        { h: "Overdrafts",
          b: ["An overdraft lets your account go below zero. It is a loan, and it can be expensive. Some banks charge a fee every time you go overdrawn, or high daily interest.",
              "A small coffee that takes you into your overdraft could end up costing far more than the coffee."],
          ex: ["Ouch", "A {5} snack + a {35} overdraft fee = a {40} snack."] },
        { h: "How to avoid fees",
          pts: ["Turn on low-balance alerts in your banking app", "Check your balance before bigger purchases", "Use free cash machines from your own bank or network", "Turn off overdrafts if you do not need one", "Keep a small buffer in your checking account"],
          tip: "Fees are money you lose for nothing. Avoiding them is like giving yourself a raise." }
      ],
      qs: [
        { t: "match", q: "Match each card to how it works.", pairs: [["Debit card", "Spends your own money"], ["Credit card", "Borrows money you must repay"], ["Prepaid card", "Only spends money loaded onto it"]], e: "Only the credit card is borrowing." },
        { t: "tf", q: "Paying with your phone wallet is not real money.", a: false, e: "A phone wallet uses your real card. It is real money." },
        { t: "mcq", q: "What is an overdraft?", o: ["Free extra money from the bank", "A loan that lets your balance go below zero", "A type of savings account", "A cash machine"], a: 1, e: "An overdraft is borrowing, often with fees." },
        { t: "num", q: "You buy a {6} drink, which takes you overdrawn, and the bank charges a {25} fee. What did the drink really cost?", a: 31, money: true, e: "{6} + {25} = {31}." },
        { t: "order", q: "Put these in order from best to worst way to handle a low balance.", items: ["Check your balance before buying", "Wait until payday to buy", "Dip into an arranged overdraft", "Go overdrawn without arranging it"], e: "Checking first costs nothing. Unarranged overdrafts are usually the most expensive." }
      ]
    },
    {
      id: "u4l4", title: "Staying safe from scams", mins: 6,
      goals: ["How phishing and scam messages work", "Money mule and fake job scams that target teens", "What to do if you are scammed"],
      screens: [
        { h: "Phishing: fake messages",
          b: ["Phishing messages pretend to come from your bank, a delivery company or a well-known app. They create panic (“your account is locked”, “pay this fee now”) and push you to click a link or share details.",
              "Real banks will never ask for your full PIN, password or the one-time code they send you. Anyone asking for these is a scammer."],
          pts: ["Urgency and threats", "Links that look almost right", "Requests for codes, PINs or passwords", "Spelling mistakes and odd sender addresses"] },
        { h: "Scams that target teens",
          b: ["Money mule scams offer “easy money” for letting someone pass money through your bank account. This is money laundering, which is a crime, and it can get your account closed and affect you for years.",
              "Other common teen scams: fake job offers that ask you to pay for training, fake giveaways from influencers, online sellers who never send the item, and “investment” offers promising guaranteed returns."],
          tip: "If someone offers you money for using your bank account, it is a crime, not a job." },
        { h: "Protect yourself, and act fast",
          pts: ["Use strong, different passwords and turn on two-factor authentication", "Never share one-time codes, even with “your bank”", "Contact your bank using the number on your card or its official app, not a number in a message", "If you think you have been scammed, call your bank straight away, change your passwords and report it"],
          b: ["Acting quickly gives your bank the best chance of stopping or recovering a payment. Being scammed is nothing to be ashamed of. Scammers are professionals."] }
      ],
      qs: [
        { t: "tf", q: "Your bank might text you asking for the one-time code it just sent you.", a: false, e: "Banks never ask for one-time codes. Only scammers do." },
        { t: "mcq", q: "Someone offers you {200} to receive money into your account and send it on. What is this?", o: ["A great side hustle", "A money mule scam, which is a crime", "A normal bank transfer", "A savings plan"], a: 1, e: "Moving money for others is money laundering." },
        { t: "sort", q: "Sort these into warning signs and safe habits.", groups: ["Warning sign", "Safe habit"], items: [["“Act now or your account closes”", 0], ["Two-factor authentication", 1], ["Request for your PIN", 0], ["Calling the number on your card", 1], ["Guaranteed returns", 0], ["Different password for each app", 1]], e: "Pressure and requests for secrets are red flags." },
        { t: "order", q: "You clicked a scam link and entered your card details. Put your next steps in order.", items: ["Call your bank using the number on your card", "Freeze or cancel the card", "Change your passwords", "Report the scam"], e: "Speed matters most: contact your bank first." },
        { t: "write", q: "How can you tell a message might be a phishing scam? Name at least two signs.", keys: [{ label: "Urgency, threats or pressure", any: ["urgent", "urgency", "pressure", "threat", "now", "immediately", "locked", "panic"] }, { label: "Asks for codes, PIN, password or personal details", any: ["code", "pin", "password", "details", "personal", "card number", "login"] }, { label: "Suspicious links, senders or spelling", any: ["link", "sender", "address", "spelling", "typo", "url", "website", "number"] }], need: 2, model: "Phishing messages often create urgency, such as saying your account will be locked. They ask for things a real bank never would, like your PIN or a one-time code, and they use odd sender addresses, spelling mistakes or links that look almost right." }
      ]
    }
  ]
});

PQ.UNITS.push({
  id: "u5", title: "Credit & Debt", color: "matcha",
  desc: "How borrowing works, why credit cards can trap you, and how to build a strong credit score.",
  lessons: [
    {
      id: "u5l1", title: "How borrowing works", mins: 5,
      goals: ["Principal, interest, APR and term", "The total cost of a loan", "Why borrowing always costs extra"],
      screens: [
        { h: "Borrowed money has a price",
          b: ["When you borrow, you agree to pay back the money (the principal) plus interest, which is the price of borrowing. The lender also sets a term: how long you have to repay."],
          pts: ["Principal: the amount you borrow", "Interest: the extra you pay for borrowing", "APR: the yearly cost of borrowing, including most fees", "Term: how long you have to repay"] },
        { h: "APR is the number to compare",
          b: ["APR (annual percentage rate) shows the yearly cost of a loan including most fees, so you can compare offers fairly. A lower APR means cheaper borrowing.",
              "Credit cards often charge 20% to 30% APR. Payday loans can charge hundreds of percent."],
          ex: ["Example", "At 24% APR, owing {1000} for a year costs about {240} in interest, if nothing is paid off."] },
        { h: "Longer terms cost more",
          b: ["A longer term means smaller monthly payments, which feels easier. But you pay interest for longer, so the total cost goes up.",
              "Always look at the total amount repayable, not just the monthly payment."],
          tip: "“Only {20} a month!” tells you nothing until you know for how many months." }
      ],
      qs: [
        { t: "match", q: "Match each borrowing term.", pairs: [["Principal", "The amount you borrow"], ["Interest", "The price of borrowing"], ["APR", "Yearly cost, including most fees"], ["Term", "How long you have to repay"]], e: "These four words describe every loan." },
        { t: "num", q: "You owe {500} at 20% APR and pay nothing for a year. Roughly how much interest builds up?", a: 100, money: true, e: "20% of {500} = {100} (before compounding)." },
        { t: "mcq", q: "Two loans have the same APR. One lasts 2 years and the other 5 years. Which costs more in total?", o: ["The 2-year loan", "The 5-year loan", "They cost the same", "It depends on the colour of the card"], a: 1, e: "Paying interest for longer means paying more in total." },
        { t: "tf", q: "A lower APR means cheaper borrowing.", a: true, e: "APR is the yearly cost, so lower is better for borrowers." },
        { t: "fill", q: "Choose the missing words.", s: "Always compare the ___ amount repayable, not just the ___ payment.", a: ["total", "monthly"], bank: ["total", "monthly", "minimum", "first"], e: "Small monthly payments can hide a big total cost." }
      ]
    },
    {
      id: "u5l2", title: "Credit cards & the minimum trap", mins: 6,
      goals: ["How credit card billing works", "The minimum payment trap", "Using a credit card safely"],
      screens: [
        { h: "How a credit card bill works",
          b: ["Each month you get a statement showing what you spent. If you pay the full statement balance by the due date, most cards charge no interest at all. This interest-free gap is called the grace period.",
              "If you pay less than the full balance, interest is charged on what is left, usually at a high APR."] },
        { h: "The minimum payment trap",
          b: ["The minimum payment is the smallest amount you are allowed to pay. It is set low on purpose. Paying only the minimum keeps you in debt for years and costs a fortune in interest.",
              "A {500} balance at 24% APR, paid at {15} a month, takes about 4 years and 8 months to clear and costs roughly {330} extra in interest. That {500} of shopping really cost {830}."],
          tip: "Pay the full balance every month. If you cannot, the card is spending money you do not have." },
        { h: "Using credit safely",
          pts: ["Only spend what you could pay with your debit card today", "Set up an automatic payment for the full balance", "Never take cash out on a credit card: fees and interest start immediately", "Keep your balance well below the limit", "Used well, a card builds your credit history"] }
      ],
      qs: [
        { t: "mcq", q: "You have a {500} credit card balance. Which payment costs you the least?", o: ["The minimum payment", "The full balance", "Nothing this month", "Half the balance"], a: 1, e: "Paying in full means no interest at all." },
        { t: "tf", q: "Paying only the minimum is a smart way to manage credit card debt.", a: false, e: "Minimum payments keep you in debt for years and maximise interest." },
        { t: "fill", q: "Type the missing words.", s: "If you pay the full balance by the due date, you usually pay ___ interest.", a: ["no"], alt: [["zero", "none", "0"]], e: "That interest-free period is the grace period." },
        { t: "num", q: "You bought {500} of things and paid {330} in interest by only paying the minimum. What did the shopping really cost?", a: 830, money: true, e: "{500} + {330} = {830}." },
        { t: "sort", q: "Sort these credit card habits.", groups: ["Safe", "Risky"], items: [["Paying the full balance", 0], ["Cash withdrawals", 1], ["Automatic full payment", 0], ["Maxing out the limit", 1], ["Paying only the minimum", 1]], e: "Pay in full, automatically, and keep balances low." }
      ]
    },
    {
      id: "u5l3", title: "Credit scores & reports", mins: 5,
      goals: ["What a credit score is", "What affects your score", "How to build good credit from scratch"],
      screens: [
        { h: "Your financial reputation",
          b: ["A credit report is a record of how you have handled borrowing: cards, loans, phone contracts and sometimes bills. A credit score is a number calculated from that report.",
              "Lenders, landlords and some phone companies use it to decide whether to trust you and what interest rate to offer. A good score can save you thousands over your life."] },
        { h: "What affects your score",
          pts: ["Payment history: paying on time is the biggest factor", "How much of your limits you use: lower is better, ideally under 30%", "Length of history: older accounts help", "Applications: lots of credit applications in a short time can lower your score", "Mix of credit: having handled different types well"],
          b: ["The exact formula varies by country and agency, but paying on time and keeping balances low matter everywhere."],
          ex: ["Utilisation", "Using {300} of a {1000} limit is 30% utilisation."] },
        { h: "Building credit from nothing",
          b: ["At 18 you usually have no credit history, which can make borrowing harder. You can build it slowly: register to vote where that helps, keep a phone contract paid on time, and if you get a credit card, use it for small planned purchases and pay it off in full.",
              "Check your credit report for free once a year through official services. Errors happen and can be fixed."],
          tip: "Every on-time payment is a brick in your credit history." }
      ],
      qs: [
        { t: "mcq", q: "What is usually the biggest factor in your credit score?", o: ["Your income", "Paying on time", "Your age", "Your bank's name"], a: 1, e: "Payment history is the biggest factor in most scoring systems." },
        { t: "num", q: "You have a {2000} credit limit and owe {500}. What percentage of your limit are you using?", a: 25, suf: "%", e: "{500} ÷ {2000} = 25%." },
        { t: "tf", q: "Applying for lots of credit in a short time can lower your score.", a: true, e: "Many applications can look like you are struggling." },
        { t: "sort", q: "Sort these by their effect on your credit score.", groups: ["Helps", "Hurts"], items: [["Paying bills on time", 0], ["Missing a payment", 1], ["Low balances", 0], ["Maxed-out card", 1], ["Many applications at once", 1]], e: "On-time payments and low balances build a strong score." },
        { t: "write", q: "Explain what a credit score is and give two ways to build a good one.", keys: [{ label: "A number showing how trustworthy you are as a borrower", any: ["number", "trust", "lender", "borrow", "reputation", "history", "report"] }, { label: "Pay on time", any: ["on time", "pay bills", "never miss", "pay in full", "pay off"] }, { label: "Keep balances or utilisation low / avoid too many applications", any: ["low balance", "utilisation", "utilization", "under 30", "below", "limit", "applications", "don't max", "not max"] }], need: 2, model: "A credit score is a number, based on your credit report, that shows lenders how reliable you are at repaying. You build a good one by paying every bill on time and keeping balances low compared to your limits." }
      ]
    },
    {
      id: "u5l4", title: "Loans, BNPL & payday loans", mins: 6,
      goals: ["Student and car loans", "Good debt vs bad debt", "The dangers of BNPL and payday loans"],
      screens: [
        { h: "Big loans you may meet",
          b: ["Student loans help pay for university or college. Their rules vary a lot by country: some are repaid only once you earn above a certain amount, while others work like normal loans with interest from day one. Read the terms carefully.",
              "Car loans spread the cost of a car over a few years. The car loses value quickly, so a big loan on an expensive car can leave you owing more than the car is worth."] },
        { h: "Good debt vs bad debt",
          b: ["Some people call debt “good” when it helps you build value or earn more later, like education or training, at a reasonable rate. “Bad” debt pays for things that lose value quickly or are gone, like holidays, clothes or takeaways, especially at high interest.",
              "Even “good” debt is still debt. Borrow only what you need, and know how you will repay it."] },
        { h: "BNPL and payday loans",
          b: ["Buy now, pay later (BNPL) splits a purchase into instalments. It can feel free, but missed payments bring late fees, can be reported to credit agencies, and several plans at once are easy to lose track of.",
              "Payday loans are short-term loans with extremely high costs. They often trap people in a cycle of borrowing again to repay the last loan. Talk to your bank, family or a free debt advice service first."],
          tip: "Ask yourself: could I pay for this in full today? If not, can I really afford it?" }
      ],
      qs: [
        { t: "sort", q: "Sort these into debt that might help you build value, and debt for things that lose value fast.", groups: ["Can build value", "Loses value fast"], items: [["Training course", 0], ["Holiday on a credit card", 1], ["University loan", 0], ["Designer clothes on BNPL", 1], ["Takeaway on credit", 1]], e: "Even debt that builds value should be borrowed carefully." },
        { t: "mcq", q: "What is a major risk of buy now, pay later?", o: ["It is always illegal", "Late fees and losing track of several plans", "It pays you interest", "It improves your credit instantly"], a: 1, e: "BNPL is still debt, with fees if you miss payments." },
        { t: "tf", q: "Payday loans are a cheap way to cover a gap until payday.", a: false, e: "Payday loans are among the most expensive forms of credit." },
        { t: "mcq", q: "A friend has three BNPL plans and is struggling. What is the best first step?", o: ["Take a payday loan to cover them", "List every payment and due date, then get free debt advice", "Ignore the reminders", "Open a fourth plan"], a: 1, e: "Seeing everything clearly and getting free advice is the safest start." },
        { t: "fill", q: "Choose the missing words.", s: "A car usually ___ value quickly, so a big loan can leave you owing ___ than it is worth.", a: ["loses", "more"], bank: ["loses", "more", "gains", "less"], e: "This is called negative equity." }
      ]
    }
  ]
});

PQ.UNITS.push({
  id: "u6", title: "Investing", color: "indigo",
  desc: "Make your money grow with compound interest, smart diversification and plenty of time.",
  lessons: [
    {
      id: "u6l1", title: "Saving vs investing", mins: 5,
      goals: ["The difference between saving and investing", "How inflation shrinks cash", "When each one makes sense"],
      screens: [
        { h: "Two tools for two jobs",
          b: ["Saving means keeping money safe and easy to reach, usually in a bank account. It is perfect for emergencies and short-term goals.",
              "Investing means buying things that can grow in value over time, like shares in companies. It can grow much more than savings, but the value goes up and down along the way."] },
        { h: "Inflation: the silent shrink",
          b: ["Inflation is the rise in prices over time. If prices rise 3% a year, {100} buys less next year than it does today.",
              "Money sitting in an account earning less than inflation is slowly losing buying power. Over decades, investing is how most people try to grow their money faster than prices rise."],
          ex: ["Example", "A snack costs {2} today. With 3% inflation for 20 years it would cost about {3.60}."] },
        { h: "Which one, when?",
          pts: ["Under 1 to 2 years, or emergency money: save", "5+ years away: investing can make sense", "In between: often a mix, depending on how much risk you can take"],
          tip: "Never invest money you might need soon. Markets can fall right when you need the cash." }
      ],
      qs: [
        { t: "mcq", q: "What is inflation?", o: ["Your savings growing", "Prices rising over time", "A type of loan", "A bank fee"], a: 1, e: "Inflation means the same money buys less over time." },
        { t: "sort", q: "Should this money be saved or invested?", groups: ["Save it", "Could invest it"], items: [["Emergency fund", 0], ["Retirement in 45 years", 1], ["Concert next month", 0], ["House deposit in 10 years", 1], ["Next term's bus pass", 0]], e: "Short-term and emergency money stays safe. Long-term money can be invested." },
        { t: "tf", q: "Cash earning less than inflation is losing buying power.", a: true, e: "If prices rise faster than your interest, your money buys less." },
        { t: "fill", q: "Choose the missing words.", s: "Saving keeps money ___; investing aims to make it ___ over time.", a: ["safe", "grow"], bank: ["safe", "grow", "disappear", "spend"], e: "Different tools for different time frames." },
        { t: "mcq", q: "You need money for a car in 8 months. Where should it go?", o: ["High-risk shares", "A savings account", "Crypto", "Lend it to a friend"], a: 1, e: "Short-term money should not be exposed to market swings." }
      ]
    },
    {
      id: "u6l2", title: "Compound growth & time", mins: 5,
      goals: ["How compounding snowballs", "The rule of 72", "Why starting early beats starting big"],
      screens: [
        { h: "The snowball effect",
          b: ["When your investments earn a return and you leave it invested, next year you earn returns on your original money and on last year's gains. Like a snowball rolling downhill, it gets bigger faster the longer it rolls.",
              "This is compound growth, and its secret ingredient is time."] },
        { h: "The rule of 72",
          b: ["A quick way to estimate how long money takes to double: divide 72 by the yearly return."],
          ex: ["Examples", "At 8% a year: 72 ÷ 8 = about 9 years to double. At 6%: 12 years. At 2%: 36 years."],
          tip: "Long-term stock market averages have been around 7% a year after inflation in some markets, but that is an average, never a promise." },
        { h: "Start early, not big",
          b: ["Investing {50} a month from age 16 to 65 with an average 7% return grows to about {254000}. Start exactly the same plan at 26 and you end up with about {122000}.",
              "The early starter only put in {6000} more, but ended with more than double. Those first ten years were worth over {130000}."] }
      ],
      qs: [
        { t: "num", q: "Using the rule of 72, about how many years does money take to double at 6% a year?", a: 12, suf: "years", e: "72 ÷ 6 = 12 years." },
        { t: "num", q: "Using the rule of 72, about how many years does money take to double at 9% a year?", a: 8, suf: "years", e: "72 ÷ 9 = 8 years." },
        { t: "mcq", q: "What is the secret ingredient of compound growth?", o: ["Luck", "Time", "A big starting amount", "Lots of trading"], a: 1, e: "The longer money compounds, the faster it grows." },
        { t: "tf", q: "A 7% average return is guaranteed every year.", a: false, e: "It is a long-term average. Some years are up, some are down." },
        { t: "write", q: "Explain why starting to invest at 16 can beat starting at 26, even with the same monthly amount.", keys: [{ label: "More time for money to grow", any: ["time", "longer", "years", "earlier", "early"] }, { label: "Compound growth: returns earn returns", any: ["compound", "interest on interest", "returns on returns", "snowball", "grows on itself", "growth on growth"] }], need: 2, model: "Starting at 16 gives your money ten extra years to grow. Because of compound growth, your returns start earning their own returns, so the extra early years snowball into a much bigger total by retirement." }
      ]
    },
    {
      id: "u6l3", title: "Stocks, bonds & funds", mins: 6,
      goals: ["What stocks and bonds are", "How funds and index funds work", "What dividends are"],
      screens: [
        { h: "Stocks: owning a slice",
          b: ["A stock (or share) is a tiny piece of ownership in a company. If the company grows and makes more profit, the share price tends to rise. If it struggles, the price can fall.",
              "Some companies also pay dividends: a share of their profits paid out to shareholders, usually a few times a year."] },
        { h: "Bonds: lending money",
          b: ["A bond is a loan you make to a government or company. They pay you interest and return your money at the end of the term.",
              "Bonds usually grow more slowly than stocks but move up and down less, so they are often used to make an investment mix steadier."] },
        { h: "Funds and index funds",
          b: ["A fund pools money from lots of people to buy many investments at once. An index fund simply buys all the companies in a market index, such as the 500 biggest US companies or the 100 biggest UK companies.",
              "Index funds and ETFs (exchange-traded funds) are popular with beginners because they are cheap, simple and spread your money across hundreds of companies in one purchase."],
          tip: "Fees matter: a 1% yearly fee can eat a big chunk of your growth over decades. Low-cost index funds keep more for you." }
      ],
      qs: [
        { t: "match", q: "Match each investment to what it is.", pairs: [["Stock", "A slice of ownership in a company"], ["Bond", "A loan to a government or company"], ["Index fund", "Buys every company in a market index"], ["Dividend", "Profit paid out to shareholders"]], e: "These are the building blocks of most investments." },
        { t: "mcq", q: "Why are index funds popular with beginners?", o: ["They never fall in value", "They are cheap and spread money across many companies", "They guarantee 20% a year", "They are only for experts"], a: 1, e: "Low cost and instant diversification." },
        { t: "tf", q: "Bonds usually move up and down less than stocks.", a: true, e: "Bonds tend to be steadier, with lower long-term growth." },
        { t: "fill", q: "Type the missing word.", s: "Part of a company's profit paid to shareholders is called a ___.", a: ["dividend"], alt: [["dividends"]], e: "Dividends are one way shares can pay you." },
        { t: "mcq", q: "Two funds track the same index. One charges 0.1% a year and the other 1.5%. Which is likely better long term?", o: ["The 1.5% fund, because it costs more", "The 0.1% fund", "They will end up identical", "Neither"], a: 1, e: "With the same investments, lower fees leave more for you." }
      ]
    },
    {
      id: "u6l4", title: "Risk & diversification", mins: 5,
      goals: ["Risk and reward", "Diversification", "Time in the market vs timing the market"],
      screens: [
        { h: "Risk and reward go together",
          b: ["Investments that can grow more can also fall more. Cash in a protected savings account is very safe but grows slowly. Shares can grow much more over decades but can drop 20% or more in a bad year.",
              "Your risk level should match your time frame and how you would feel if your investments fell for a while."] },
        { h: "Don't put all your eggs in one basket",
          b: ["Diversification means spreading your money across many companies, industries and countries. If one fails, it is only a small part of what you own.",
              "Putting everything into one company, one trending coin or one tip from social media is the opposite: one bad day can wipe you out."] },
        { h: "Time in the market",
          b: ["Nobody can reliably predict the best day to buy or sell. People who panic and sell when prices fall often lock in losses and miss the recovery.",
              "Many investors use regular monthly investing, called dollar-cost averaging or pound-cost averaging. You buy more when prices are low and less when they are high, and you never have to guess."],
          tip: "Time in the market usually beats timing the market." }
      ],
      qs: [
        { t: "mcq", q: "What does diversification mean?", o: ["Putting all your money in one great company", "Spreading money across many investments", "Selling when prices fall", "Only keeping cash"], a: 1, e: "Spreading out means no single failure can sink you." },
        { t: "tf", q: "Higher potential returns usually come with higher risk.", a: true, e: "Risk and reward go together." },
        { t: "mcq", q: "The market drops 15% in a month. You are investing for 40 years. What do most long-term investors do?", o: ["Sell everything immediately", "Stay calm and keep investing regularly", "Borrow money to gamble", "Move it all to one trending stock"], a: 1, e: "Panic selling locks in losses. Long-term investors ride it out." },
        { t: "fill", q: "Choose the missing words.", s: "Time ___ the market usually beats ___ the market.", a: ["in", "timing"], bank: ["in", "timing", "out", "beating"], e: "Staying invested beats trying to guess the perfect moment." },
        { t: "sort", q: "Sort these by risk level.", groups: ["Lower risk", "Higher risk"], items: [["Protected savings account", 0], ["One trending crypto coin", 1], ["Government bonds", 0], ["Shares in a single new company", 1], ["Broad index fund", 0]], e: "A broad index fund is not risk-free, but it is far more diversified than single bets." }
      ]
    },
    {
      id: "u6l5", title: "Retirement accounts & scams", mins: 6,
      goals: ["Tax-advantaged accounts", "Why an employer match is free money", "How to spot investment scams"],
      screens: [
        { h: "Accounts with tax perks",
          b: ["Many countries offer special accounts that reduce or remove tax on investment growth to encourage saving: Roth IRAs and 401(k)s in the US, ISAs and pensions in the UK, TFSAs in Canada, and superannuation in Australia.",
              "Rules on age, limits and withdrawals vary, so check what is available where you live. Some can be opened for under-18s by a parent."] },
        { h: "Free money: employer matching",
          b: ["Many employers add money to your workplace pension or retirement plan when you contribute, often matching what you put in up to a limit.",
              "If you put in 5% and your employer matches 5%, you get double the savings instantly. Turning down a match is like turning down part of your pay."],
          ex: ["Example", "You earn {2000} a month and save 5% ({100}). Your employer adds {100}. You get {200} invested for the price of {100}."] },
        { h: "Spot the scam",
          pts: ["Guaranteed high returns, especially fast ones", "Pressure to act now or keep it secret", "Unregulated sellers on social media or messaging apps", "Pump and dump coins hyped by influencers", "Recruit-your-friends schemes (pyramid schemes)"],
          b: ["Real investments always have risk and are sold by regulated firms you can look up on your financial regulator's register."],
          tip: "If it sounds too good to be true, it is." }
      ],
      qs: [
        { t: "mcq", q: "Your employer matches pension contributions up to 5%. What is the smart move?", o: ["Contribute nothing", "Contribute at least 5% to get the full match", "Contribute 1%", "Ask for the match as cash and spend it"], a: 1, e: "The match is free money added to your savings." },
        { t: "num", q: "You save {80} a month and your employer matches it in full. How much goes in each month in total?", a: 160, money: true, e: "{80} from you + {80} from your employer = {160}." },
        { t: "sort", q: "Sort these into scam signs and normal features.", groups: ["Scam sign", "Normal"], items: [["“Guaranteed 10x in a week”", 0], ["Prices go up and down", 1], ["“Tell no one, act now”", 0], ["Regulated by the financial regulator", 1], ["“Earn by recruiting friends”", 0]], e: "Guarantees, secrecy and recruitment are classic red flags." },
        { t: "tf", q: "Real investments always carry some risk.", a: true, e: "Anyone promising zero risk and high returns is lying." },
        { t: "write", q: "A stranger online promises your money will triple in a month, guaranteed. Explain why this is likely a scam and what you should do.", keys: [{ label: "Guaranteed or very fast high returns are unrealistic", any: ["guarantee", "too good", "unrealistic", "no investment", "triple", "fast", "risk"] }, { label: "Check the seller is regulated / don't trust strangers", any: ["regulat", "register", "stranger", "check", "research", "verify", "licensed"] }, { label: "Don't send money / report or block", any: ["don't send", "do not send", "don't pay", "ignore", "report", "block", "walk away", "say no"] }], need: 2, model: "No real investment can guarantee to triple your money in a month, because all investments carry risk. Strangers offering this are usually unregulated scammers. I would not send money, would check the regulator's register, and would block and report them." }
      ]
    }
  ]
});
