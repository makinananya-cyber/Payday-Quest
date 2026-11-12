/* Payday Quest lesson content: Units 1–3. Money amounts in {braces} are shown in the learner's chosen currency. */
window.PQ = window.PQ || {};
PQ.UNITS = PQ.UNITS || [];

PQ.UNITS.push({
  id: "u1", title: "Earning & Your Paycheck", color: "peach",
  desc: "Where money comes from, what really lands in your account, and how to read every line of a pay stub.",
  lessons: [
    {
      id: "u1l1", title: "Ways to earn money", mins: 4,
      goals: ["The main ways teens earn money", "Hourly pay, salary, tips and commission", "How to work out what your time is really worth"],
      screens: [
        { h: "Where teen money comes from",
          b: ["Most teens get money from a mix of four sources: an allowance or pocket money from family, a part-time job, side hustles, and gifts.",
              "A part-time job (retail, food service, lifeguarding, tutoring centres) gives you a steady paycheck and real work experience you can put on a CV. Side hustles like babysitting, pet sitting, tutoring, reselling clothes or making content are flexible, but the money can be up one month and down the next."],
          pts: ["Allowance: regular, but usually small and controlled by someone else", "Job: steady income, set hours, experience and references", "Side hustle: flexible and creative, but irregular", "Gifts: nice, but impossible to plan around"],
          tip: "Irregular income is harder to budget. Plan around your lowest normal month, not your best one." },
        { h: "Hourly, salary, tips and commission",
          b: ["How you are paid changes how you plan. An hourly wage pays you for every hour worked, so more shifts mean more money. A salary is a fixed yearly amount split into equal paychecks, no matter how many hours you work that week.",
              "Some jobs add extra pay on top. Tips are money customers give for good service. Commission is a percentage of what you sell. Both can be great, but they are not guaranteed."],
          ex: ["Example", "{12} an hour × 10 hours a week = {120} a week, or about {520} a month (52 weeks ÷ 12 months ≈ 4.33 weeks)."] },
        { h: "What is your time really worth?",
          b: ["The headline rate is not the whole story. To find your real hourly rate, subtract your costs (bus fares, uniform, equipment) and include the time you spend getting there.",
              "Babysitting for 3 hours at {40} sounds like about {13} an hour. If you spend {6} on bus fares and an hour travelling, you made {34} for 4 hours, which is {8.50} an hour."],
          pts: ["Real hourly rate = (pay − work costs) ÷ (hours worked + travel time)", "Thinking in hours of work helps you decide what to buy: {90} sneakers cost 7.5 hours of work at {12} an hour"],
          tip: "Before a big purchase, ask yourself: is this worth that many hours of my time?" }
      ],
      qs: [
        { t: "mcq", q: "You earn {12} an hour and work 15 hours. What is your pay before any deductions?", o: ["{150}", "{165}", "{180}", "{200}"], a: 2, e: "{12} × 15 hours = {180}." },
        { t: "tf", q: "Side hustle income is usually the same every month.", a: false, e: "Side hustles are flexible, but income usually changes a lot from month to month." },
        { t: "fill", q: "Complete the sentence.", s: "A fixed yearly amount split into equal paychecks is called a ___.", a: ["salary"], bank: ["salary", "wage", "tip", "bonus"], e: "A salary is a fixed yearly amount. A wage is usually paid per hour." },
        { t: "num", q: "You earn {15} an hour. How many hours must you work to pay for a {120} jacket?", a: 8, suf: "hours", e: "{120} ÷ {15} = 8 hours of work." },
        { t: "match", q: "Match each type of pay to its meaning.", pairs: [["Wage", "Paid per hour worked"], ["Salary", "Fixed yearly amount"], ["Tips", "Extra money from customers"], ["Commission", "A percentage of what you sell"]], e: "Knowing how you are paid helps you predict your income." }
      ]
    },
    {
      id: "u1l2", title: "Gross pay vs net pay", mins: 5,
      goals: ["What gross pay and net pay mean", "The main deductions taken from a paycheck", "Why you budget with net pay"],
      screens: [
        { h: "Gross pay: the headline number",
          b: ["Gross pay is everything you earned in a pay period before anything is taken out. For hourly work it is your hourly rate multiplied by the hours you worked, plus any overtime, tips paid through payroll or bonuses.",
              "Gross pay is the number in a job advert and the number people usually quote. It is not the amount you get to spend."],
          ex: ["Example", "60 hours × {13} = {780} gross pay for the month."] },
        { h: "Deductions: what comes out first",
          b: ["Before your money reaches you, your employer takes out deductions and sends them on your behalf. Their names change from country to country, but the main ones are similar everywhere."],
          pts: ["Income tax: pays for schools, roads, hospitals and public services", "Social insurance: called social security, national insurance or pension contributions depending on where you live. It funds state pensions and benefits", "Workplace pension or retirement savings: money put aside for your future, often matched by your employer", "Others: health insurance, union fees or student loan repayments"],
          tip: "Many teens earn less than the tax-free amount, so they pay little or no income tax. Social insurance can still apply." },
        { h: "Net pay: what actually lands",
          b: ["Net pay, or take-home pay, is what is left after all deductions. It is the money that actually arrives in your bank account, so it is the only number you should build a budget around.",
              "If you plan your spending using gross pay, you are planning to spend money you will never receive. That is one of the most common first-job mistakes."],
          ex: ["The formula", "Net pay = gross pay − deductions. {780} − {39} tax − {60} social insurance = {681} net."] },
        { h: "Getting tax back",
          b: ["The tax taken from each paycheck is an estimate. If too much was taken, for example because you only worked part of the year, you may be able to get a refund by filing a tax return or asking your tax office.",
              "Keep your pay stubs and any end-of-year tax forms. They are your proof of what you earned and what was paid."] }
      ],
      qs: [
        { t: "mcq", q: "Which number should you build your budget around?", o: ["Gross pay", "Net pay", "Your hourly rate", "The pay in the job advert"], a: 1, e: "Net pay is what you actually receive, so it is the only money you can plan to spend." },
        { t: "fill", q: "Type the missing word.", s: "Gross pay minus deductions equals ___ pay.", a: ["net"], alt: [["take-home", "take home", "takehome"]], e: "Net pay (take-home pay) is what is left after deductions." },
        { t: "num", q: "You work 20 hours at {14} an hour. What is your gross pay?", a: 280, money: true, e: "20 × {14} = {280} gross pay, before deductions." },
        { t: "order", q: "Put these steps in order, from working to getting paid.", items: ["You work your shifts", "Your employer calculates gross pay", "Tax and contributions are withheld", "Net pay arrives in your account"], e: "Gross pay is calculated first, deductions come out, and the rest is paid to you." },
        { t: "tf", q: "Social insurance contributions help fund pensions and benefits.", a: true, e: "That is their purpose, whatever they are called where you live." },
        { t: "write", q: "In your own words, explain the difference between gross pay and net pay.", keys: [{ label: "Gross pay is the amount before anything is taken out", any: ["before", "total", "full amount", "headline"] }, { label: "Net pay is what you actually receive / take home", any: ["take home", "take-home", "receive", "actually get", "after", "lands", "keep"] }, { label: "The difference is deductions like tax", any: ["tax", "deduction", "taken out", "withheld", "insurance"] }], need: 2, model: "Gross pay is the full amount you earn before anything is taken out. Net pay is what you actually take home after deductions such as income tax and social insurance." }
      ]
    },
    {
      id: "u1l3", title: "Reading a pay stub", mins: 4,
      goals: ["Every section of a pay stub", "What year-to-date means", "What to do if your pay is wrong"],
      screens: [
        { h: "The parts of a pay stub",
          b: ["A pay stub (also called a payslip) comes with every paycheck, on paper or in an app. It shows exactly how your pay was worked out."],
          pts: ["Employer and employee details, often with an employee number", "Pay period: the dates this paycheck covers", "Pay date: when the money is paid", "Hours and rate, including overtime", "Gross pay", "Each deduction listed separately", "Net pay", "Year-to-date (YTD) totals"] },
        { h: "Year-to-date totals",
          b: ["Year-to-date (YTD) shows the running total since the start of the tax year: how much you have earned and how much tax you have paid so far.",
              "YTD numbers are useful when you file a tax return, apply for a rental or loan, or check that the right amount of tax has been taken over the year."],
          ex: ["Example", "If you earn {600} gross every month, your YTD gross after 4 months should be {2400}."] },
        { h: "Check it every single time",
          b: ["Payroll mistakes happen. Missing hours, the wrong hourly rate, unpaid overtime or the wrong tax code all cost you money. Keep your own record of the shifts you work so you can compare.",
              "If something is wrong, ask your manager or payroll team politely and show your records. Most mistakes are fixed on the next paycheck."],
          tip: "Spotting one missing 4-hour shift at {13} an hour is {52} you would otherwise lose." }
      ],
      qs: [
        { t: "match", q: "Match each pay stub term to its meaning.", pairs: [["YTD", "Running total so far this year"], ["Pay period", "Dates the paycheck covers"], ["Deduction", "Money taken out before you are paid"], ["Net pay", "What lands in your account"]], e: "These four terms appear on almost every pay stub." },
        { t: "mcq", q: "Your stub shows 18 hours, but your own notes say you worked 21. What should you do?", o: ["Ignore it, it is only 3 hours", "Quit the job", "Politely show your records to your manager or payroll", "Take 3 hours off next week to even it out"], a: 2, e: "Mistakes are usually honest and quick to fix when you bring evidence." },
        { t: "tf", q: "YTD stands for “your total deductions”.", a: false, e: "YTD means year-to-date: the running total since the start of the tax year." },
        { t: "num", q: "You earn {500} gross each month. What should your YTD gross pay be after 6 months?", a: 3000, money: true, e: "{500} × 6 = {3000}." },
        { t: "fill", q: "Choose the missing words.", s: "Keep your own record of ___ worked so you can compare it with your ___.", a: ["hours", "stub"], bank: ["hours", "stub", "taxes", "goals"], e: "Your own record of hours is your evidence if the stub is wrong." }
      ]
    },
    {
      id: "u1l4", title: "Taxes, simply explained", mins: 5,
      goals: ["What taxes pay for", "Income tax vs sales tax", "How tax brackets really work"],
      screens: [
        { h: "Why taxes exist",
          b: ["Taxes are how a country pays for things people share: schools, hospitals, roads, public transport, police, firefighters, parks and support for people who need it.",
              "You pay taxes in several ways, often without noticing. Some come out of your paycheck, and some are added to things you buy."],
          pts: ["Income tax: taken from what you earn", "Sales tax or VAT: added to the price of goods and services", "Social insurance: funds pensions and benefits", "Property, fuel and other taxes: built into prices and bills"] },
        { h: "Tax brackets are not a trap",
          b: ["Most countries use a progressive income tax. Income is split into bands, and only the money inside each band is taxed at that band's rate. The first chunk is often taxed at 0%.",
              "This means a pay rise can never make you take home less overall. Only the extra money above the line is taxed at the higher rate."],
          ex: ["Example (made-up rates)", "First {10000} at 0%, everything above at 20%. Earn {12000} and you pay 20% on just {2000}, which is {400}, not 20% of everything."],
          tip: "“I turned down a raise because it puts me in a higher bracket” is a myth. Take the raise." },
        { h: "Sales tax and VAT",
          b: ["In some places the price tag already includes tax (common with VAT in the UK and Europe). In others, like most of the US, sales tax is added at the checkout, so the price you pay is higher than the tag.",
              "When budgeting for a purchase, check which system applies so you are not caught short at the till."] }
      ],
      qs: [
        { t: "tf", q: "Getting a raise can push you into a higher bracket and make you take home less money overall.", a: false, e: "Only the income above the bracket line is taxed at the higher rate, so you always keep more." },
        { t: "mcq", q: "Which tax is usually added when you buy something?", o: ["Income tax", "Sales tax or VAT", "Social insurance", "Pension contribution"], a: 1, e: "Sales tax and VAT are charged on purchases." },
        { t: "fill", q: "Choose the missing word.", s: "Most income tax systems are ___: higher slices of income are taxed at higher rates.", a: ["progressive"], bank: ["progressive", "flat", "optional", "fixed"], e: "Progressive systems tax each slice of income at its own rate." },
        { t: "sort", q: "Sort each tax by when you pay it.", groups: ["From your paycheck", "When you buy something"], items: [["Income tax", 0], ["Social insurance", 0], ["Sales tax", 1], ["VAT", 1], ["Fuel tax", 1]], e: "Income tax and social insurance come out of pay. Sales tax, VAT and fuel tax are paid through prices." },
        { t: "num", q: "With made-up rates of 0% on the first {10000} and 20% above that, how much tax is due on {13000}?", a: 600, money: true, e: "Only {3000} is above the line. 20% of {3000} = {600}." }
      ]
    },
    {
      id: "u1l5", title: "Growing your income", mins: 4,
      goals: ["Overtime, raises and promotions", "Building skills that pay", "Starting a side hustle safely"],
      screens: [
        { h: "Earning more where you are",
          b: ["The fastest way to earn more is often in the job you already have. Overtime usually pays more per hour, often 1.5 times your normal rate. Being reliable, learning new tasks and helping train others makes you the obvious choice for raises and promotions.",
              "When you ask for a raise, be specific. Point to what you have done, such as covering shifts, training new staff or getting good customer feedback, and ask at a calm moment."],
          ex: ["Overtime", "{12} an hour × 1.5 = {18} an hour for overtime."] },
        { h: "Skills are an investment",
          b: ["Skills and qualifications raise what your time is worth for years. A first-aid or lifeguard certificate, a food-hygiene certificate, coding, design, a second language or a driving licence can all open better-paid work.",
              "Your first job also builds things money cannot buy directly: references, confidence and a work history."] },
        { h: "Starting a side hustle",
          b: ["Start small with something you are already good at and that costs little to begin. Tell a trusted adult where you are going and who you are meeting, and use safe payment methods.",
              "Keep a simple record of what you earn and spend. In many countries, self-employed income above a certain amount must be reported for tax."],
          pts: ["Pick a skill: tutoring, pet care, design, reselling", "Set a fair price by checking what others charge", "Keep records of income and costs", "Stay safe and check the tax rules"] }
      ],
      qs: [
        { t: "num", q: "You earn {12} an hour and overtime pays 1.5 times your rate. What is your overtime rate per hour?", a: 18, money: true, e: "{12} × 1.5 = {18} an hour." },
        { t: "mcq", q: "What is the strongest way to ask for a raise?", o: ["Say your friend earns more", "Point to specific things you have done well", "Threaten to quit", "Ask during the busiest rush"], a: 1, e: "Evidence of your value is the most persuasive argument." },
        { t: "tf", q: "Income from a side hustle can be taxable.", a: true, e: "In many countries, self-employed income above a threshold must be reported." },
        { t: "order", q: "Put these steps for starting a side hustle in a sensible order.", items: ["Pick a skill you already have", "Check what others charge", "Find your first customers safely", "Record what you earn and spend"], e: "Start with your skill, price it fairly, then sell and keep records." },
        { t: "sort", q: "Which of these increase what your time is worth in the long run?", groups: ["Builds long-term earning power", "Short-term only"], items: [["First-aid certificate", 0], ["Learning to code", 0], ["One-off birthday money", 1], ["Second language", 0], ["Selling an old phone", 1]], e: "Skills keep paying off for years. One-off money does not." }
      ]
    }
  ]
});

PQ.UNITS.push({
  id: "u2", title: "Budgeting", color: "pistachio",
  desc: "Give every bit of money a job before you spend it, and learn methods that actually stick.",
  lessons: [
    {
      id: "u2l1", title: "What a budget really is", mins: 4,
      goals: ["What a budget is for", "Income, fixed and variable expenses", "Why budgets reduce stress"],
      screens: [
        { h: "A plan, not a punishment",
          b: ["A budget is a plan for your money before it arrives. Instead of wondering where it went, you decide where it goes.",
              "It does not mean you can never buy fun things. A good budget makes room for fun on purpose, so you can enjoy it without guilt."],
          tip: "A budget is like a to-do list for your money." },
        { h: "The three building blocks",
          pts: ["Income: all the money coming in (net pay, allowance, side hustle)", "Fixed expenses: the same every month, like a phone plan, bus pass or subscriptions", "Variable expenses: change every month, like food, clothes, going out and gifts"],
          b: ["The basic budget equation is simple. Income minus expenses should be zero or more. If it is negative, you are spending money you do not have, which leads to debt."],
          ex: ["Example", "Income {680} − fixed {75} − variable {400} = {205} left for saving."] },
        { h: "Why it is worth the effort",
          b: ["People who budget feel less stressed about money because there are fewer surprises. They reach goals faster because savings are planned, not leftovers.",
              "Budgeting is also a life skill you will use for rent, bills and every big decision later. Learning it with a small income is the easiest time to start."] }
      ],
      qs: [
        { t: "sort", q: "Sort each expense.", groups: ["Fixed expense", "Variable expense"], items: [["Phone plan", 0], ["Bus pass", 0], ["Snacks", 1], ["Streaming subscription", 0], ["Clothes", 1], ["Gifts", 1]], e: "Fixed costs are the same every month. Variable costs change." },
        { t: "tf", q: "A budget means you are not allowed to spend money on fun things.", a: false, e: "A good budget includes fun money on purpose." },
        { t: "num", q: "Your income is {600}. Fixed expenses are {90} and variable expenses are {350}. How much is left?", a: 160, money: true, e: "{600} − {90} − {350} = {160}." },
        { t: "fill", q: "Complete the budget equation.", s: "Income minus ___ should be zero or more.", a: ["expenses"], bank: ["expenses", "savings", "taxes", "income"], e: "If expenses are bigger than income, the gap becomes debt." },
        { t: "mcq", q: "What happens if your expenses are bigger than your income?", o: ["Nothing", "You end up borrowing or going into debt", "Your bank pays the difference for free", "Your income goes up"], a: 1, e: "The gap has to come from somewhere, usually savings or debt." }
      ]
    },
    {
      id: "u2l2", title: "Needs vs wants", mins: 4,
      goals: ["The difference between needs and wants", "The grey areas in between", "The upgrade trap"],
      screens: [
        { h: "Needs keep life running",
          b: ["Needs are things you must have to stay safe, healthy, housed and able to get to school or work: food, housing, basic clothing, medicine, transport to work, and essential bills.",
              "Wants make life more enjoyable but are not essential: eating out, concert tickets, the latest trainers, gaming add-ons and most subscriptions."] },
        { h: "The grey areas",
          b: ["Many things are partly a need and partly a want. A phone plan can be a need if you use it for work and safety. The newest flagship phone on a premium plan is mostly a want.",
              "Food is a need. A {15} delivery order is a need wrapped in a want."],
          pts: ["Basic version = need", "Upgrade, brand or convenience = want"],
          tip: "Ask: would my life, health or ability to work actually break without this?" },
        { h: "The upgrade trap",
          b: ["Marketing is designed to make wants feel like needs: “you deserve it”, “everyone has one”, “limited time only”. Upgrading things that still work is one of the biggest budget leaks for people of all ages.",
              "This does not mean never buying wants. It means choosing them on purpose, with money you planned for fun."] }
      ],
      qs: [
        { t: "sort", q: "Sort these into needs and wants.", groups: ["Need", "Want"], items: [["Groceries", 0], ["Concert tickets", 1], ["Bus pass for work", 0], ["Gaming skins", 1], ["Prescription medicine", 0], ["Designer hoodie", 1]], e: "Needs keep you safe, healthy and working. Wants are extras." },
        { t: "mcq", q: "Which is the best example of a grey area?", o: ["Rent", "A phone plan", "Concert tickets", "Medicine"], a: 1, e: "A basic phone plan can be a need. A premium plan and new phone are wants." },
        { t: "tf", q: "Upgrading things that still work is a common budget leak.", a: true, e: "Upgrades are wants dressed up as needs." },
        { t: "fill", q: "Choose the missing words.", s: "The basic version is a ___; the upgrade is a ___.", a: ["need", "want"], bank: ["need", "want", "bill", "loan"], e: "This simple test sorts most grey-area purchases." },
        { t: "write", q: "Explain how you would decide whether something is a need or a want. Give an example.", keys: [{ label: "Needs are essential: safety, health, housing, food, work or school", any: ["essential", "survive", "health", "safe", "food", "housing", "work", "school", "must"] }, { label: "Wants are extras that make life more enjoyable", any: ["extra", "fun", "enjoy", "nice to have", "luxury", "not essential", "not necessary"] }, { label: "Gives an example", any: ["for example", "e.g", "such as", "like", "phone", "food", "trainers", "sneakers", "rent", "bus"] }], need: 2, model: "A need is something essential for safety, health, housing or getting to school or work, like groceries. A want is an extra that makes life more fun, like concert tickets. I would ask whether my life or work would actually break without it." }
      ]
    },
    {
      id: "u2l3", title: "The 50/30/20 rule", mins: 5,
      goals: ["How the 50/30/20 split works", "Doing the maths", "Adapting it when you live at home"],
      screens: [
        { h: "A simple starting split",
          b: ["The 50/30/20 rule is a popular starting point for a budget. It splits your net pay into three parts."],
          pts: ["50% for needs: housing, food, transport, bills", "30% for wants: fun, hobbies, eating out, shopping", "20% for savings and paying off debt"],
          ex: ["On {800} net pay", "{400} needs · {240} wants · {160} savings"] },
        { h: "Adapting it for your life",
          b: ["The rule was designed for adults paying rent and bills. If you live at home and your family covers most needs, you can save far more than 20%.",
              "Many teens use something like 20/30/50: 20% for the needs they do pay (phone, transport), 30% for wants and 50% for savings. Saving half of every paycheck at 16 builds a serious head start."],
          tip: "The rule is a guide, not a law. The best split is one you can stick to." },
        { h: "What if needs are more than 50%?",
          b: ["In expensive cities, rent alone can be more than half of take-home pay. If needs are high, wants usually shrink first, but try hard to keep at least a small amount going to savings every month.",
              "Even 5% saved is a habit. The habit matters more than the amount at the start."] }
      ],
      qs: [
        { t: "num", q: "Your net pay is {900}. Using 50/30/20, how much goes to savings?", a: 180, money: true, e: "20% of {900} = {180}." },
        { t: "num", q: "Your net pay is {600}. Using 50/30/20, how much is for wants?", a: 180, money: true, e: "30% of {600} = {180}." },
        { t: "match", q: "Match each part of the rule to what it covers.", pairs: [["50%", "Needs"], ["30%", "Wants"], ["20%", "Savings and debt payoff"]], e: "Needs, wants and savings: 50, 30 and 20." },
        { t: "tf", q: "If you live at home with few bills, it can make sense to save more than 20%.", a: true, e: "Lower needs free up more money for savings." },
        { t: "mcq", q: "Your rent takes 60% of your pay. What usually gets cut first?", o: ["Savings, completely", "Wants", "Food", "Paying bills on time"], a: 1, e: "Cut wants first and protect at least a small savings habit." }
      ]
    },
    {
      id: "u2l4", title: "Budget methods & tracking", mins: 5,
      goals: ["Zero-based and envelope budgets", "Tracking your spending", "Finding and fixing budget leaks"],
      screens: [
        { h: "Zero-based budgeting",
          b: ["In a zero-based budget, every unit of income gets a job until there is nothing left unassigned. That does not mean spending it all. Savings is a job too.",
              "It forces you to make decisions up front, which stops money disappearing on small things."],
          ex: ["Example", "{500} income: {60} phone, {40} transport, {150} savings, {100} goal fund, {150} fun = {500}. Nothing left without a job."] },
        { h: "Envelopes and pots",
          b: ["The envelope method splits money into labelled envelopes (or digital “pots” or “spaces” in banking apps): food, fun, gifts, transport. When an envelope is empty, spending in that category stops until next payday.",
              "It works because you can see exactly what is left, which makes it harder to overspend without noticing."] },
        { h: "Track it and find the leaks",
          b: ["For one month, write down everything you spend, using a notes app, a spreadsheet or your bank's spending view. Most people are surprised by small repeat purchases.",
              "These small repeat costs are called budget leaks: snacks, delivery fees, in-app purchases and forgotten subscriptions."],
          ex: ["Leak maths", "A {4} drink every school day = {80} a month, or almost {1000} a year."],
          tip: "Review your budget every week for the first month, then monthly. Budgets are meant to change." }
      ],
      qs: [
        { t: "mcq", q: "In a zero-based budget, what does “zero” mean?", o: ["You spend all your money", "Every unit of income is given a job", "You save nothing", "Your balance hits zero"], a: 1, e: "Every unit is assigned to something, including savings." },
        { t: "num", q: "You buy a {3} snack every school day (20 days a month). What does that cost per year?", a: 720, money: true, e: "{3} × 20 = {60} a month, × 12 = {720} a year." },
        { t: "order", q: "Put these budgeting steps in order.", items: ["Work out your net income", "List your fixed expenses", "Give the rest a job: savings, goals, fun", "Track spending and review weekly"], e: "Start with income, cover the fixed costs, assign the rest, then track." },
        { t: "tf", q: "Once you write a budget, you should never change it.", a: false, e: "Budgets should be reviewed and adjusted as life changes." },
        { t: "fill", q: "Choose the missing word.", s: "Small repeat purchases that drain money without you noticing are called budget ___.", a: ["leaks"], bank: ["leaks", "goals", "funds", "rules"], e: "Leaks are small but add up over a year." }
      ]
    }
  ]
});

PQ.UNITS.push({
  id: "u3", title: "Saving & Goals", color: "azure",
  desc: "Pay yourself first, build a safety net and beat the tricks that make you spend.",
  lessons: [
    {
      id: "u3l1", title: "Pay yourself first", mins: 4,
      goals: ["Why saving first works", "Automating savings", "Why saving gives you freedom"],
      screens: [
        { h: "Save first, spend second",
          b: ["Most people try to save whatever is left at the end of the month. Usually nothing is left. Paying yourself first flips this: the moment you are paid, a set amount goes into savings, and you live on the rest.",
              "It works because the money is gone before you can be tempted."],
          ex: ["Habit", "Payday → transfer to savings → then spend what is left."] },
        { h: "Make it automatic",
          b: ["Set up an automatic transfer (a standing order or scheduled transfer) to a separate savings account on payday. Automatic saving takes willpower out of the equation.",
              "Even small amounts add up: {25} a week is {1300} a year."] },
        { h: "Savings means choices",
          b: ["Savings give you options. You can say yes to opportunities like a trip, a course or a first car, and no to bad situations like a job you hate or a high-interest loan.",
              "People with savings also feel calmer, because a surprise bill becomes an inconvenience instead of a crisis."],
          tip: "Think of savings as buying your future self more choices." }
      ],
      qs: [
        { t: "mcq", q: "What does “pay yourself first” mean?", o: ["Buy yourself a treat every payday", "Move money to savings before you spend", "Ask your boss to pay you early", "Pay your bills last"], a: 1, e: "Saving first makes it automatic." },
        { t: "num", q: "You save {25} every week. How much is that after one year (52 weeks)?", a: 1300, money: true, e: "{25} × 52 = {1300}." },
        { t: "tf", q: "Automatic transfers make saving easier because they remove the need for willpower.", a: true, e: "If the money moves automatically, you never have to decide." },
        { t: "order", q: "Put a pay-yourself-first payday in order.", items: ["Your paycheck arrives", "An automatic transfer moves money to savings", "Bills are paid", "You spend what is left on wants"], e: "Savings come straight after the paycheck." },
        { t: "write", q: "Why is saving first more effective than saving what is left at the end of the month?", keys: [{ label: "Money left at the end is usually spent / nothing left", any: ["nothing left", "spent", "spend it", "run out", "gone", "leftover", "left over"] }, { label: "Saving first makes it automatic or removes temptation", any: ["automatic", "temptation", "tempted", "willpower", "before", "first", "habit"] }], need: 2, model: "If you wait until the end of the month there is usually nothing left, because spending expands to use what is there. Saving first, ideally automatically, takes the money away before you are tempted, so saving becomes a habit." }
      ]
    },
    {
      id: "u3l2", title: "Your emergency fund", mins: 5,
      goals: ["What counts as an emergency", "How big your fund should be", "Where to keep it"],
      screens: [
        { h: "Your financial airbag",
          b: ["An emergency fund is money kept only for unexpected, necessary costs: a broken phone you need for work, a dentist bill, a lost bus pass, a car repair, or losing your job.",
              "Without one, surprises go on a credit card or force you to raid your goals. With one, they are just a bump in the road."] },
        { h: "What is and is not an emergency",
          pts: ["Emergency: urgent, necessary and unexpected", "Not an emergency: a sale, concert tickets, a holiday or a new game", "Planned costs like birthdays and holidays are not emergencies either: save for them separately"],
          b: ["If you use your emergency fund, your next job is to refill it."] },
        { h: "How much, and where",
          b: ["For a teen living at home, a starter fund of {300} to {500} covers most surprises. Adults living independently usually aim for three to six months of essential expenses.",
              "Keep it in a separate savings account that is easy to reach in a day or two, but not linked to the card you use every day. Out of sight, out of mind, but available when needed."],
          tip: "Build the fund in stages: first {100}, then {300}, then one month of expenses." }
      ],
      qs: [
        { t: "sort", q: "Which of these are real emergencies?", groups: ["Emergency", "Not an emergency"], items: [["Dentist bill for a toothache", 0], ["Limited sneaker drop", 1], ["Car repair to get to work", 0], ["Concert presale", 1], ["Replacing a lost bus pass", 0], ["Holiday flights", 1]], e: "Emergencies are urgent, necessary and unexpected." },
        { t: "mcq", q: "How many months of essential expenses do adults usually aim to keep in an emergency fund?", o: ["One week", "3 to 6 months", "5 years", "None"], a: 1, e: "Three to six months is the common guideline." },
        { t: "mcq", q: "Where is the best place to keep an emergency fund?", o: ["In cash under the bed", "In a separate, easy-to-reach savings account", "In risky shares", "Lent to a friend"], a: 1, e: "It should be safe and reachable quickly, but separate from daily spending." },
        { t: "tf", q: "After using your emergency fund, you should rebuild it.", a: true, e: "Refilling it gets your safety net back." },
        { t: "num", q: "Your essential expenses are {700} a month. What is a 3-month emergency fund?", a: 2100, money: true, e: "{700} × 3 = {2100}." }
      ]
    },
    {
      id: "u3l3", title: "SMART goals & sinking funds", mins: 5,
      goals: ["Turning wishes into SMART goals", "Short, medium and long-term goals", "Saving for planned costs with sinking funds"],
      screens: [
        { h: "Make your goal SMART",
          b: ["“Save money” is a wish. A SMART goal is a plan you can follow."],
          pts: ["Specific: what exactly? A laptop for school", "Measurable: how much? {600}", "Achievable: is {600} realistic with your income?", "Relevant: does it matter to you?", "Time-bound: by when? In 4 months"],
          ex: ["Do the maths", "{600} ÷ 4 months = {150} a month, or about {35} a week."] },
        { h: "Short, medium and long term",
          pts: ["Short term (under a year): a game, a festival ticket, new headphones", "Medium term (1 to 5 years): a car, a gap year, moving out", "Long term (5+ years): university costs, a home deposit, retirement"],
          b: ["Different time frames suit different places to keep money. Short-term money should be safe and easy to reach. Long-term money can be invested to grow, which you will learn about in the Investing unit."] },
        { h: "Sinking funds for planned costs",
          b: ["A sinking fund is a small pot for a cost you know is coming: birthday gifts, the holidays, a school trip or a yearly subscription. You save a little every month so the cost never surprises you.",
              "Sinking funds are what stop planned costs from being treated like emergencies."],
          ex: ["Example", "You spend about {240} on gifts each December. Save {20} a month all year."] }
      ],
      qs: [
        { t: "match", q: "Match each SMART letter to its meaning.", pairs: [["S", "Specific"], ["M", "Measurable"], ["A", "Achievable"], ["R", "Relevant"], ["T", "Time-bound"]], e: "SMART turns a wish into a plan." },
        { t: "num", q: "You want {450} for a trip in 6 months. How much must you save each month?", a: 75, money: true, e: "{450} ÷ 6 = {75} a month." },
        { t: "mcq", q: "Which of these is a SMART goal?", o: ["Save more money", "Be rich one day", "Save {300} for a bike by June by saving {50} a month", "Spend less"], a: 2, e: "It is specific, measurable, achievable, relevant and time-bound." },
        { t: "sort", q: "Sort these goals by time frame.", groups: ["Short term", "Long term"], items: [["New headphones", 0], ["Retirement", 1], ["Festival ticket", 0], ["Home deposit", 1], ["Birthday gift", 0]], e: "Short term is under a year. Long term is five years or more." },
        { t: "fill", q: "Choose the missing words.", s: "A ___ fund is money saved bit by bit for a ___ cost you know is coming.", a: ["sinking", "planned"], bank: ["sinking", "planned", "emergency", "surprise"], e: "Sinking funds are for planned costs. Emergency funds are for surprises." }
      ]
    },
    {
      id: "u3l4", title: "The psychology of spending", mins: 5,
      goals: ["Why we impulse buy", "Marketing tricks to spot", "Simple rules that protect your money"],
      screens: [
        { h: "Why we buy on impulse",
          b: ["Buying something new gives your brain a quick hit of dopamine, the feel-good chemical. That good feeling fades fast, but the money is still gone.",
              "Boredom, stress, scrolling late at night and wanting to fit in with friends all make impulse buys more likely."] },
        { h: "Marketing tricks to spot",
          pts: ["Scarcity: “only 3 left”, “limited drop”, countdown timers", "Anchoring: showing a high “original” price so the sale price feels cheap", "Free-shipping thresholds: spending {15} more to save {4} on delivery", "Buy now, pay later: splitting the price so it feels smaller", "Influencers: paid promotion that feels like a friend's recommendation", "Saved cards and one-click buying: removing every pause to think"],
          tip: "If a sale makes you buy something you did not plan to buy, the shop won." },
        { h: "Rules that protect you",
          b: ["The 30-day rule: when you want something that is not in your budget, write it down with the date and wait 30 days. If you still want it and can afford it, buy it without guilt. Most impulse wants fade.",
              "Other helpful habits: unsubscribe from marketing emails, remove saved cards from shopping apps, and shop with a list."],
          ex: ["Hours check", "Is this {70} item worth almost 6 hours of work at {12} an hour?"] }
      ],
      qs: [
        { t: "match", q: "Match each marketing trick to how it works.", pairs: [["Scarcity", "Makes you fear missing out"], ["Anchoring", "Shows a high “original” price first"], ["Free-shipping threshold", "Gets you to spend more to save a little"], ["Buy now, pay later", "Makes the price feel smaller"]], e: "Spotting the trick takes away most of its power." },
        { t: "mcq", q: "What is the 30-day rule?", o: ["Return everything within 30 days", "Wait 30 days before an unplanned purchase", "Spend only on the 30th", "Save for 30 years"], a: 1, e: "Waiting lets the impulse fade." },
        { t: "tf", q: "Buying something on sale always saves you money.", a: false, e: "If you would not have bought it anyway, a sale is still spending." },
        { t: "num", q: "Delivery costs {4}, but it is free if you spend {15} more on things you did not plan to buy. How much extra do you spend by taking the deal?", a: 11, money: true, e: "{15} extra spending − {4} saved = {11} more spent." },
        { t: "write", q: "Describe two marketing tricks that make people spend more, and one way to protect yourself.", keys: [{ label: "Names a trick such as scarcity, limited time or countdowns", any: ["scarcity", "limited", "only", "countdown", "timer", "running out", "fomo", "missing out"] }, { label: "Names a trick such as sales, anchors, BNPL, influencers or free shipping", any: ["sale", "discount", "anchor", "original price", "buy now", "pay later", "bnpl", "influencer", "free shipping", "free delivery", "one-click", "saved card"] }, { label: "Gives a protection such as waiting, a list or unsubscribing", any: ["30 day", "30-day", "wait", "list", "unsubscribe", "budget", "remove", "delete", "think"] }], need: 2, model: "Scarcity tricks like “only 3 left” or countdown timers make you rush. Anchoring shows a fake high price so the sale price feels cheap. To protect yourself, use the 30-day rule and wait before buying anything you did not plan for." }
      ]
    }
  ]
});
