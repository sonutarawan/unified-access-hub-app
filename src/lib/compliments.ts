import { Category } from '../types';

export const COMPLIMENTS: Record<Category, string[]> = {
  kids: [
    "Snacks made, kid fed, nobody's crying (probably). That's a full win.",
    "You kept tiny humans alive and (mostly) happy today. Respect.",
    "Another day of being the fun parent. Or at least the one who remembers snacks.",
    "Kids are thriving. You're thriving. Everyone's thriving.",
    "That meltdown you prevented? Invisible labor. Still counts.",
    "You showed up for your kids again. They notice, even when they don't say it.",
    "Parenting is 90% remembering things exist. You remembered. Win.",
    "Small person, big feelings, you handled it. That's the job.",
  ],
  meals: [
    "Dinner's handled. Future-you just got a favor from present-you.",
    "Nobody starved. The bar is on the floor and you cleared it.",
    "Meal prep done. Your future self is doing a little dance right now.",
    "You fed people. Basic human need, met. That's actually huge.",
    "Groceries bought, meal planned, chaos prevented. Triple win.",
    "Cooking while managing everything else? That's advanced multitasking.",
    "The fridge is no longer a horror show. Progress.",
    "You thought about what people would eat. That's emotional labor, and it matters.",
  ],
  house: [
    "That pile of laundry didn't stand a chance. One less thing living in your head now.",
    "The house isn't perfect, but it's livable. That's the goal.",
    "You tackled the thing you've been avoiding. It felt like nothing, but it wasn't.",
    "Clean enough. Good enough. You enough.",
    "One corner of chaos, eliminated. The rest can wait.",
    "Household maintenance is invisible until it's not. You made it visible.",
    "Laundry folded before it became a science experiment. Impressive.",
    "You created order from entropy. That's literally fighting the universe.",
  ],
  errands: [
    "Crossed off, out of your head, done. Small, but it's real progress.",
    "You left the house and accomplished things. On purpose. That counts.",
    "Errand run without forgetting why you went? Peak executive function.",
    "Gas tank full, groceries bought, pharmacy visited. Adult trifecta.",
    "You navigated the outside world with kids or alone. Either way, victory.",
    "Mail dealt with. Returns made. Boring stuff that actually matters.",
    "The car won't judge you, but it does need gas. You handled it.",
    "Outside tasks complete. Now you get to come home and exist.",
  ],
  self: [
    "You actually did the thing for yourself. Let that count for something today.",
    "Taking care of yourself isn't selfish. It's maintenance for the person who takes care of everyone.",
    "You paused. You breathed. You chose yourself for once. Remember this feeling.",
    "Self-care isn't bubble baths. It's remembering you're a person, not a service.",
    "Five minutes for yourself? Better than nothing. Actually, it's everything.",
    "You prioritized your own needs. That's radical for a mom.",
    "Rest is productive when you're running on empty. You rested. Good.",
    "The guilt said 'you shouldn't.' You did it anyway. Growth.",
  ],
  custom: [
    "Done is better than perfect. And this is done.",
    "You said you'd do it, and you did. That's integrity.",
    "One more thing off the mental list. Your brain has more space now.",
    "Progress isn't linear. But this? This was forward motion.",
    "You showed up for yourself. That's the whole game.",
    "Not everything needs to be meaningful. Sometimes done is enough.",
    "The fact that you care this much? That's already winning.",
    "Small wins compound. This is one of them.",
  ],
};

export function getRandomCompliment(category: Category, lastCompliment?: string): string {
  const options = COMPLIMENTS[category];
  let compliment: string;
  
  // Try to avoid repeating the same compliment twice in a row
  do {
    compliment = options[Math.floor(Math.random() * options.length)];
  } while (compliment === lastCompliment && options.length > 1);
  
  return compliment;
}
