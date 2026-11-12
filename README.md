# Payday Quest

A free, game-style financial literacy course for teens. Live site: https://makinananya-cyber.github.io/Payday-Quest/

## What's inside
- **Learn**: 8 units and 34 lessons (earning and paychecks, budgeting, saving, banking, credit and debt, investing, smart spending, protecting your future). Each lesson has short reading cards followed by mixed questions: multiple choice, true/false, fill in the blank, drag to order, drag to sort, matching, number problems and written answers checked for key ideas. Questions you get wrong come back for a second chance.
- **Simulator**: a life simulator (create a character, pick a job, home and goal, then live three months of decisions with a financial health score), plus personal tools: Budget Builder, Goal Planner, Paycheck Calculator, Debt Payoff Lab and Growth Lab.
- **Games**: Mixed Quiz, Blurt It (write everything you remember and get feedback on key ideas and mistakes), Flashcards, Memory Match, Crossword (new puzzle each game), Sort It and Speed Round.
- **Progress**: XP and levels, daily goals, streaks, a 14-day activity chart, unit mastery and 23 badges.

Progress is saved in the browser (localStorage). No sign-up or server needed.

## Structure
- `index.html`: page shell and all styles
- `js/data-learn-*.js`: lesson content
- `js/data-extra.js`: glossary, blurt topics, sorting sets, speed-round statements and simulator scenarios
- `js/core.js`, `learn.js`, `games.js`, `sim.js`, `progress.js`: app logic

Plain HTML, CSS and JavaScript with no build step, hosted on GitHub Pages.
