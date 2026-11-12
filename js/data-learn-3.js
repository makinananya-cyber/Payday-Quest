/* Payday Quest lesson content: Units 7–8. */
window.PQ = window.PQ || {};
PQ.UNITS = PQ.UNITS || [];

PQ.UNITS.push({
  id: "u7", title: "Smart Spending", color: "peach",
  desc: "Get more for your money: compare prices, tame subscriptions, plan big buys and know your rights.",
  lessons: [
    {
      id: "u7l1", title: "Comparison shopping", mins: 5,
      goals: ["Finding the real best price", "Unit pricing", "When cheap is actually expensive"],
      screens: [
        { h: "Compare before you buy",
          b: ["The same item can cost very different amounts in different shops, online stores and second-hand marketplaces. Spending five minutes comparing can easily save 20% or more on bigger purchases.",
              "Include everything in the comparison: delivery, fees, return costs and how long it will take to arrive."],
          pts: ["Check at least three places", "Look at second-hand or refurbished options", "Use price history tools to spot fake “sales”", "Use student discounts where you can"] },
        { h: "Unit price: the fair comparison",
          b: ["Bigger packs are not always cheaper. Unit price is the cost per item, per 100 g or per litre, and it lets you compare different sizes fairly. Many shop labels show it in small print.",
              "To work it out yourself, divide the price by the quantity."],
          ex: ["Example", "500 g for {2.50} = {0.50} per 100 g. 1 kg for {4.50} = {0.45} per 100 g. The big bag is cheaper per gram, if you will actually use it all."] },
        { h: "When cheap costs more",
          b: ["A {20} pair of shoes that lasts 3 months costs more per month than a {60} pair that lasts a year. Think about cost per use: price divided by how many times you will use it.",
              "Cheap is good when quality does not matter much. For things you use every day, it can be worth paying more for something that lasts."],
          ex: ["Cost per use", "{60} shoes worn 300 times = {0.20} per wear. {20} shoes worn 60 times = {0.33} per wear."] }
      ],
      qs: [
        { t: "mcq", q: "Which is cheaper per 100 g: 400 g for {3.20} or 1 kg for {7.00}?", o: ["400 g pack", "1 kg pack", "They are the same", "Impossible to tell"], a: 1, e: "400 g = {0.80} per 100 g. 1 kg = {0.70} per 100 g." },
        { t: "num", q: "A {90} jacket is worn 150 times. What is the cost per wear?", a: 0.6, money: true, tol: 0.01, e: "{90} ÷ 150 = {0.60} per wear." },
        { t: "tf", q: "A bigger pack always has a lower unit price.", a: false, e: "Not always. Check the unit price label." },
        { t: "fill", q: "Choose the missing words.", s: "Unit price is the ___ divided by the ___.", a: ["price", "quantity"], bank: ["price", "quantity", "tax", "brand"], e: "Price ÷ quantity gives a fair comparison." },
        { t: "order", q: "Put these smart-shopping steps in order.", items: ["Decide what you actually need", "Compare at least three places", "Add delivery and fees to each price", "Buy the best overall value"], e: "Need first, then compare total costs." }
      ]
    },
    {
      id: "u7l2", title: "Subscriptions & recurring costs", mins: 4,
      goals: ["Why subscriptions add up", "Free trial traps", "How to run a subscription audit"],
      screens: [
        { h: "Small monthly, big yearly",
          b: ["Streaming, music, gaming passes, cloud storage, apps and boxes: subscriptions feel small because they are monthly. Multiply by 12 to see the real cost.",
              "Four subscriptions at {10} each is {40} a month, or {480} a year."] },
        { h: "The free-trial trap",
          b: ["Free trials usually need a card and roll straight into a paid plan. Companies know many people forget to cancel.",
              "Set a reminder the day you start a trial, a couple of days before it ends. Some banks let you see and block recurring payments in the app."] },
        { h: "Run a subscription audit",
          pts: ["List every subscription from your bank statement", "Write the yearly cost next to each", "Ask: did I use this in the last month?", "Cancel, pause, or swap to a cheaper or shared family plan"],
          tip: "Rotating is a smart trick: subscribe to one streaming service at a time and switch each month." }
      ],
      qs: [
        { t: "num", q: "You pay {12.99} a month for a subscription. What is the yearly cost, rounded to the nearest whole number?", a: 156, money: true, tol: 0.5, e: "{12.99} × 12 = {155.88}, about {156}." },
        { t: "mcq", q: "What is the best way to avoid a free-trial charge?", o: ["Hope you remember", "Set a reminder before the trial ends", "Use someone else's card", "Never check your bank"], a: 1, e: "A reminder a couple of days early lets you cancel in time." },
        { t: "order", q: "Put the subscription audit in order.", items: ["List every subscription", "Work out the yearly cost of each", "Check how much you use each one", "Cancel or downgrade the ones you don't need"], e: "See it, cost it, judge it, act." },
        { t: "tf", q: "Subscriptions are easy to forget because they are taken automatically.", a: true, e: "Automatic payments are convenient and easy to ignore." },
        { t: "num", q: "You have 3 subscriptions at {8} a month each. How much is that per year?", a: 288, money: true, e: "3 × {8} = {24} a month × 12 = {288}." }
      ]
    },
    {
      id: "u7l3", title: "Big purchases", mins: 5,
      goals: ["Total cost of ownership", "New vs used", "Saving up vs financing"],
      screens: [
        { h: "Total cost of ownership",
          b: ["The price tag is only the start. Total cost of ownership adds every cost of having something over its life.",
              "A car's real cost includes insurance, fuel, tax, servicing, repairs, parking and the value it loses each year. For young drivers, insurance can cost more than the car itself."],
          ex: ["A {3000} used car for a year", "Insurance {1400} + fuel {900} + servicing and repairs {400} + tax and parking {200} = {2900} a year on top of the price."] },
        { h: "New vs used",
          b: ["New items lose value fastest at the start. A new car can lose 15% to 25% of its value in the first year. Phones and laptops lose value quickly too.",
              "Used or refurbished items from trusted sellers often give you most of the value for much less. Check warranties, return rights and the seller's reputation."] },
        { h: "Save up or finance?",
          b: ["Financing (a loan, contract or BNPL) lets you have something now but usually costs more in total. Saving up costs nothing extra, and you might even earn interest while you wait.",
              "A phone on a 24-month contract can cost hundreds more than buying the phone outright plus a SIM-only plan. Always compare the total over the whole contract."],
          tip: "If you have to borrow to buy something that loses value, consider a cheaper version." }
      ],
      qs: [
        { t: "mcq", q: "What does total cost of ownership include?", o: ["Just the price tag", "The price plus every cost of owning it over time", "Only the delivery fee", "Only insurance"], a: 1, e: "Running costs often add up to more than the price." },
        { t: "num", q: "Phone contract: {35} a month for 24 months. What is the total?", a: 840, money: true, e: "{35} × 24 = {840}." },
        { t: "num", q: "Instead, the phone costs {450} outright plus a {10} a month SIM-only plan for 24 months. What is the total?", a: 690, money: true, e: "{450} + {10} × 24 = {690}. That is {150} less than the contract." },
        { t: "tf", q: "New cars usually lose value fastest in their first year.", a: true, e: "The first year typically has the biggest drop." },
        { t: "sort", q: "Sort these car costs.", groups: ["One-off", "Ongoing"], items: [["Purchase price", 0], ["Insurance", 1], ["Fuel", 1], ["Servicing", 1], ["Registration fee when buying", 0]], e: "Ongoing costs continue every month or year you own it." }
      ]
    },
    {
      id: "u7l4", title: "Your consumer rights", mins: 5,
      goals: ["Refunds, returns and warranties", "Why receipts matter", "How to complain effectively"],
      screens: [
        { h: "You have rights",
          b: ["Most countries have consumer protection laws. Goods usually must be as described, of reasonable quality and fit for purpose. If something is faulty, you are often entitled to a repair, replacement or refund, even after the shop's own return window.",
              "Online purchases often come with extra rights, such as a cooling-off period to return items you changed your mind about. Details vary, so check the rules where you live."] },
        { h: "Warranties and receipts",
          b: ["A warranty or guarantee is a promise to repair or replace a product if it breaks within a set time. Many products come with one for free. Extended warranties sold at the till are often poor value.",
              "Keep receipts or order confirmations, at least digitally. They prove what you bought, when and for how much."] },
        { h: "How to complain well",
          pts: ["Stay calm and polite, and be clear about what went wrong", "Say what you want: repair, replacement or refund", "Have your receipt or order number ready", "Put it in writing if you are not getting anywhere", "If you paid by card, your bank may be able to help with a chargeback"],
          tip: "Polite, clear and backed by evidence works far better than angry." }
      ],
      qs: [
        { t: "tf", q: "If an item is faulty, you may have rights even after the shop's return window ends.", a: true, e: "Consumer law often goes beyond a shop's own policy." },
        { t: "mcq", q: "Why should you keep receipts?", o: ["They are collectible", "They prove what you bought, when and for how much", "Shops require them for every visit", "For tax on gifts"], a: 1, e: "Receipts are your evidence." },
        { t: "order", q: "Put these steps for complaining about a faulty item in order.", items: ["Find your receipt or order number", "Contact the seller politely and explain the fault", "Say whether you want a repair, replacement or refund", "Put it in writing if it isn't resolved"], e: "Evidence, explain, ask, escalate." },
        { t: "mcq", q: "The shop offers a {40} extended warranty on {60} headphones. What is usually true?", o: ["It is always essential", "It is often poor value", "It is required by law", "It doubles your rights"], a: 1, e: "Extended warranties often cost a lot compared to the risk." },
        { t: "fill", q: "Choose the missing word.", s: "If you paid by card and the seller won't help, your bank may offer a ___.", a: ["chargeback"], bank: ["chargeback", "dividend", "bonus", "deposit"], e: "A chargeback reverses a card payment in certain situations." }
      ]
    }
  ]
});

PQ.UNITS.push({
  id: "u8", title: "Protecting Your Future", color: "pistachio",
  desc: "Insurance, identity protection, life after school and building a money plan you can follow.",
  lessons: [
    {
      id: "u8l1", title: "Insurance basics", mins: 5,
      goals: ["How insurance works", "Premiums, deductibles and cover", "Which insurance you might need"],
      screens: [
        { h: "Sharing the risk",
          b: ["Insurance is a way of sharing risk. Lots of people pay a small regular amount into a pool, and the insurer pays out to the few who have an expensive accident or loss.",
              "You pay for insurance hoping you never use it, so you are protected from costs you could never afford alone."] },
        { h: "The key words",
          pts: ["Premium: what you pay for the insurance, monthly or yearly", "Deductible (excess in the UK): what you pay yourself before the insurance pays", "Cover or coverage: what the policy protects and up to what amount", "Claim: asking the insurer to pay out"],
          ex: ["Example", "Your phone is stolen. It is worth {600} and your excess is {100}. You pay {100} and the insurer pays {500}."],
          tip: "A higher deductible usually means a lower premium, but you pay more when something goes wrong." },
        { h: "Insurance you might meet",
          pts: ["Car insurance: required by law in most places if you drive", "Health insurance: essential in countries without free public healthcare", "Renters or contents insurance: protects your belongings when you move out", "Travel insurance: medical costs and cancellations abroad", "Gadget insurance: sometimes useful, often already covered by home insurance"] }
      ],
      qs: [
        { t: "match", q: "Match each insurance word.", pairs: [["Premium", "What you pay for the policy"], ["Deductible / excess", "What you pay before insurance pays"], ["Claim", "Asking the insurer to pay out"], ["Cover", "What the policy protects"]], e: "These four words appear in every policy." },
        { t: "num", q: "Your laptop worth {800} is stolen. Your excess is {150}. How much does the insurer pay?", a: 650, money: true, e: "{800} − {150} = {650}." },
        { t: "tf", q: "Choosing a higher deductible usually lowers your premium.", a: true, e: "You take on more risk yourself, so the insurer charges less." },
        { t: "mcq", q: "What is the main purpose of insurance?", o: ["To make money", "To protect you from costs you couldn't afford alone", "To replace saving", "To get a discount"], a: 1, e: "Insurance protects against big, unaffordable losses." },
        { t: "fill", q: "Choose the missing words.", s: "You pay a regular ___ and, if something goes wrong, you make a ___.", a: ["premium", "claim"], bank: ["premium", "claim", "dividend", "deposit"], e: "Premium in, claim out." }
      ]
    },
    {
      id: "u8l2", title: "Protecting your identity", mins: 5,
      goals: ["What identity theft is", "How to protect your details", "What to do if it happens"],
      screens: [
        { h: "What identity theft is",
          b: ["Identity theft is when someone uses your personal details, such as your name, date of birth, address, ID numbers or bank details, to open accounts, borrow money or buy things in your name.",
              "Teens are targeted because their credit reports are usually empty, so fraud can go unnoticed for years."] },
        { h: "Protect your details",
          pts: ["Don't post your full date of birth, address or school details publicly", "Use strong, unique passwords and a password manager", "Turn on two-factor authentication everywhere you can", "Shred or destroy documents with personal details", "Be careful on public Wi-Fi: avoid banking on it", "Think before entering details on quizzes and giveaways"] },
        { h: "Spot it and act fast",
          b: ["Warning signs include letters about accounts you didn't open, unexpected bank transactions, login alerts you don't recognise, or being refused credit for no clear reason.",
              "If it happens: tell a trusted adult, contact your bank, change your passwords, report it to the police or your national fraud reporting service, and check your credit report."],
          tip: "Checking your bank app regularly is the fastest way to spot fraud." }
      ],
      qs: [
        { t: "sort", q: "Sort these into safe and risky habits.", groups: ["Safe", "Risky"], items: [["Password manager", 0], ["Posting your full birthday publicly", 1], ["Two-factor authentication", 0], ["Banking on café Wi-Fi", 1], ["Same password everywhere", 1], ["Shredding old bank letters", 0]], e: "Protect the details that unlock your accounts." },
        { t: "tf", q: "Teens are rarely targeted for identity theft.", a: false, e: "Teens are targeted because their empty credit files make fraud hard to spot." },
        { t: "mcq", q: "You get a letter about a loan you never applied for. What should you do first?", o: ["Ignore it", "Contact the lender and your bank, and tell a trusted adult", "Pay it to make it go away", "Post about it online"], a: 1, e: "Act quickly and get help from the organisations involved." },
        { t: "order", q: "Put these steps in order after discovering identity theft.", items: ["Tell a trusted adult and contact your bank", "Change your passwords", "Report it to the police or fraud service", "Check your credit report"], e: "Stop the damage first, then report and check." },
        { t: "write", q: "List three things you can do to protect your identity online.", keys: [{ label: "Strong, unique passwords or a password manager", any: ["password", "passphrase"] }, { label: "Two-factor authentication", any: ["two-factor", "two factor", "2fa", "authenticat", "verification"] }, { label: "Limit what personal details you share", any: ["share", "post", "birthday", "address", "personal", "details", "private", "public"] }, { label: "Be careful with links, Wi-Fi or scams", any: ["link", "wi-fi", "wifi", "phishing", "scam", "click"] }], need: 3, model: "Use a strong, unique password for each account, ideally in a password manager. Turn on two-factor authentication. Avoid posting details like your full birthday or address, and be careful with links and public Wi-Fi." }
      ]
    },
    {
      id: "u8l3", title: "Money after school", mins: 6,
      goals: ["Paying for university or training", "Costs of moving out", "Comparing different paths"],
      screens: [
        { h: "Paying for what comes next",
          b: ["After school, paths include university or college, apprenticeships, work, or a gap year. Each has different costs and earnings.",
              "University can mean tuition fees and living costs, often covered by a mix of student loans, grants, scholarships, family help and part-time work. Apprenticeships let you earn while you learn, and some lead to degrees with no tuition fees."],
          pts: ["Scholarships and grants usually don't need to be repaid", "Apply early: deadlines come before you think", "Compare total cost, not just tuition"] },
        { h: "Moving out: the real costs",
          b: ["Moving out usually needs upfront money as well as monthly costs. Many people underestimate the upfront part."],
          pts: ["Upfront: deposit (often a month or more of rent), first month's rent, furniture and kitchen basics", "Monthly: rent, utilities (energy, water), internet, phone, food, transport, insurance", "Sometimes: council tax or local fees, depending on where you live"],
          ex: ["Example first month", "Deposit {800} + first rent {800} + basics {400} = {2000} before you even buy groceries."] },
        { h: "Earnings over time",
          b: ["Different paths pay off at different times. A degree or apprenticeship can raise lifetime earnings, while starting work straight away gives you income sooner.",
              "There is no single right answer. Compare what each path costs, what it pays, and what you enjoy. Talk to people already doing it."],
          tip: "Build an emergency fund before moving out. The first year always has surprise costs." }
      ],
      qs: [
        { t: "tf", q: "Scholarships and grants usually do not need to be paid back.", a: true, e: "Unlike loans, they are free money if you qualify." },
        { t: "sort", q: "Sort these moving-out costs.", groups: ["Upfront", "Monthly"], items: [["Rental deposit", 0], ["Rent", 1], ["Furniture", 0], ["Energy bills", 1], ["Internet", 1], ["Kitchen basics", 0]], e: "Plan for both: upfront costs can be a big shock." },
        { t: "num", q: "Rent is {650}. The deposit is one month's rent and you also pay the first month upfront, plus {350} for basics. How much do you need upfront?", a: 1650, money: true, e: "{650} + {650} + {350} = {1650}." },
        { t: "mcq", q: "What is a key benefit of an apprenticeship?", o: ["You never need to work", "You earn while you learn", "It is always unpaid", "It has the highest tuition fees"], a: 1, e: "Apprentices are paid while they train." },
        { t: "write", q: "List the main costs someone should plan for when moving out for the first time.", keys: [{ label: "Deposit / upfront costs", any: ["deposit", "upfront", "first month", "bond"] }, { label: "Rent", any: ["rent"] }, { label: "Bills: energy, water, internet, phone", any: ["bill", "utilit", "energy", "electric", "gas", "water", "internet", "wifi", "phone"] }, { label: "Food, transport, furniture or insurance", any: ["food", "grocer", "transport", "bus", "furniture", "insurance"] }], need: 3, model: "You need upfront money for a deposit, the first month's rent and basics like furniture. Then monthly costs: rent, utilities such as energy and water, internet and phone, food, transport and contents insurance." }
      ]
    },
    {
      id: "u8l4", title: "Your money plan", mins: 5,
      goals: ["Net worth: assets minus liabilities", "Setting goals for every life stage", "Building a plan you'll follow"],
      screens: [
        { h: "Net worth: your money scoreboard",
          b: ["Net worth is everything you own (assets) minus everything you owe (liabilities). It is a better measure of financial health than income alone.",
              "Assets: savings, investments, valuable things you could sell. Liabilities: credit card balances, loans and money owed to anyone."],
          ex: ["Example", "Savings {900} + investments {400} − phone loan {300} = net worth of {1000}."] },
        { h: "Goals for every stage",
          pts: ["Now: build the habits. Track spending, save first, start an emergency fund", "Next few years: a bigger emergency fund, first investments, paying for education or a car without heavy debt", "Long term: home, family, freedom to choose your work, retirement"],
          b: ["Your goals will change, and that's fine. The habits you build now make every future goal easier."] },
        { h: "A plan you'll follow",
          pts: ["Write your top three money goals with amounts and dates", "Automate savings on payday", "Check in with your money once a week for five minutes", "Review your goals every few months", "Give, too: many people include giving to causes they care about"],
          tip: "A simple plan you follow beats a perfect plan you don't." }
      ],
      qs: [
        { t: "fill", q: "Choose the missing words.", s: "Net worth equals ___ minus ___.", a: ["assets", "liabilities"], bank: ["assets", "liabilities", "income", "expenses"], e: "What you own minus what you owe." },
        { t: "num", q: "You have {1200} in savings and {300} in investments, and owe {500} on a loan. What is your net worth?", a: 1000, money: true, e: "{1200} + {300} − {500} = {1000}." },
        { t: "sort", q: "Sort these into assets and liabilities.", groups: ["Asset", "Liability"], items: [["Savings account", 0], ["Credit card balance", 1], ["Index fund", 0], ["Car loan", 1], ["Money owed to a friend", 1]], e: "Assets add to net worth. Liabilities take away from it." },
        { t: "tf", q: "A high income always means a high net worth.", a: false, e: "If you spend it all or borrow heavily, net worth can stay low." },
        { t: "write", q: "Write a short money plan for yourself: one goal with an amount and date, and two habits that will help you reach it.", keys: [{ label: "A specific goal with an amount", any: ["$", "£", "€", "save", "goal"] }, { label: "A time frame", any: ["by", "month", "year", "week", "summer", "christmas", "june", "december", "date"] }, { label: "A helpful habit (save first, automate, track, budget)", any: ["automat", "save first", "pay myself", "track", "budget", "every week", "each week", "every month", "each payday", "transfer"] }], need: 2, model: "My goal is to save {500} for a laptop by June. I will move {60} to savings automatically every payday, and I will track my spending each week so I notice leaks." }
      ]
    }
  ]
});
