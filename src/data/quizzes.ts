// ponytail: hand-authored mock content, same as every other data source on
// this project (coupons, pricing) — there's no CMS/backend behind Discover's
// real 100+ microblogs either, so this is what "the quiz API returned"
// looks like for now. Swap for a real content-service call per quiz id.
export type QuizTopic = "health" | "auto" | "life" | "travel" | "general";

export interface QuizOption {
  id: string;
  label: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  topic: QuizTopic;
  title: string;
  description: string;
  questions: QuizQuestion[];
}

export const QUIZZES: Quiz[] = [
  {
    id: "health-basics",
    topic: "health",
    title: "Health insurance basics",
    description: "Waiting periods, cashless claims, and co-pay — in 4 quick questions.",
    questions: [
      {
        id: "h1",
        prompt: "What is a \"waiting period\" in health insurance?",
        options: [
          { id: "a", label: "The time before certain conditions or treatments get covered" },
          { id: "b", label: "The time it takes for a claim to be approved" },
          { id: "c", label: "The days you must stay in hospital to claim" },
          { id: "d", label: "The grace period to pay your premium" },
        ],
        correctOptionId: "a",
        explanation:
          "A waiting period is the time you must wait after buying a policy before certain treatments — like pre-existing conditions — are covered.",
      },
      {
        id: "h2",
        prompt: "What does \"cashless hospitalization\" mean?",
        options: [
          { id: "a", label: "The hospital treats you for free" },
          { id: "b", label: "Your insurer settles the bill directly with the hospital" },
          { id: "c", label: "You get cash instead of treatment" },
          { id: "d", label: "It's only available for accidents" },
        ],
        correctOptionId: "b",
        explanation:
          "At network hospitals, your insurer pays the bill directly — so you don't pay large sums upfront and claim reimbursement later.",
      },
      {
        id: "h3",
        prompt: "What is a \"co-payment\" in a health policy?",
        options: [
          { id: "a", label: "A one-time joining fee" },
          { id: "b", label: "The premium you pay every month" },
          { id: "c", label: "A fixed % of the claim you pay yourself" },
          { id: "d", label: "A discount for paying early" },
        ],
        correctOptionId: "c",
        explanation:
          "Co-payment is your agreed share of a claim — e.g. a 10% co-pay means you pay 10% of the bill, insurance covers the rest.",
      },
      {
        id: "h4",
        prompt: "Do health policies typically cover routine health check-ups?",
        options: [
          { id: "a", label: "Never" },
          { id: "b", label: "Always, fully, from day one" },
          { id: "c", label: "Only for senior citizens" },
          { id: "d", label: "Often yes, after claim-free years, up to a limit" },
        ],
        correctOptionId: "d",
        explanation:
          "Many policies offer a free annual check-up benefit after one or more claim-free years, usually capped at a cost limit.",
      },
    ],
  },
  {
    id: "auto-basics",
    topic: "auto",
    title: "Motor insurance basics",
    description: "IDV, zero depreciation, and the Good Samaritan law — in 4 quick questions.",
    questions: [
      {
        id: "a1",
        prompt: "What does \"IDV\" stand for in motor insurance?",
        options: [
          { id: "a", label: "Immediate Damage Verification" },
          { id: "b", label: "Insured Declared Value" },
          { id: "c", label: "Insurance Deposit Value" },
          { id: "d", label: "Interest Due Value" },
        ],
        correctOptionId: "b",
        explanation:
          "IDV is your vehicle's current market value — it's the maximum amount you can claim if it's stolen or totaled.",
      },
      {
        id: "a2",
        prompt: "What does \"Zero Depreciation\" cover give you?",
        options: [
          { id: "a", label: "A lower premium every renewal" },
          { id: "b", label: "Full part-replacement cost, no wear-and-tear deduction" },
          { id: "c", label: "Cover only for cars older than 10 years" },
          { id: "d", label: "A discount for not making claims" },
        ],
        correctOptionId: "b",
        explanation:
          "Insurers normally deduct depreciation on replaced parts during a claim. Zero Dep removes that deduction entirely.",
      },
      {
        id: "a3",
        prompt: "Is third-party motor insurance mandatory in India?",
        options: [
          { id: "a", label: "No, it's optional" },
          { id: "b", label: "Only for commercial vehicles" },
          { id: "c", label: "Only for cars, not bikes" },
          { id: "d", label: "Yes — required by law for every vehicle" },
        ],
        correctOptionId: "d",
        explanation:
          "The Motor Vehicles Act makes third-party liability cover compulsory for every vehicle on Indian roads.",
      },
      {
        id: "a4",
        prompt: "Who does the \"Good Samaritan Law\" protect?",
        options: [
          { id: "a", label: "Insurance agents from liability" },
          { id: "b", label: "Vehicle owners from theft claims" },
          { id: "c", label: "Only doctors treating accident victims" },
          { id: "d", label: "Bystanders who help accident victims" },
        ],
        correctOptionId: "d",
        explanation:
          "This law protects people who stop to help accident victims — they can't be forced to identify themselves or held liable for the outcome.",
      },
    ],
  },
  {
    id: "life-basics",
    topic: "life",
    title: "Life insurance basics",
    description: "Term plans, nominees, and sum assured — in 4 quick questions.",
    questions: [
      {
        id: "l1",
        prompt: "What is a \"term life insurance\" plan?",
        options: [
          { id: "a", label: "A plan that returns all your premiums at the end" },
          { id: "b", label: "Pure protection — a payout only if you die within the term" },
          { id: "c", label: "A plan only for senior citizens" },
          { id: "d", label: "Cover only for accidental death" },
        ],
        correctOptionId: "b",
        explanation:
          "Term insurance is pure risk cover — low premium, high cover, typically no payout if you outlive the policy term.",
      },
      {
        id: "l2",
        prompt: "What is a \"nominee\" in a life insurance policy?",
        options: [
          { id: "a", label: "The agent who sold you the policy" },
          { id: "b", label: "A co-signer required to buy the policy" },
          { id: "c", label: "Who's legally entitled to the payout if you pass away" },
          { id: "d", label: "The company's claims officer" },
        ],
        correctOptionId: "c",
        explanation:
          "A nominee is the person you designate to receive the sum assured — naming one clearly avoids delays and disputes later.",
      },
      {
        id: "l3",
        prompt: "What does \"sum assured\" mean?",
        options: [
          { id: "a", label: "The amount you pay every year" },
          { id: "b", label: "The market value of your investments" },
          { id: "c", label: "A bonus paid only in the last year" },
          { id: "d", label: "The guaranteed payout promised to your beneficiary" },
        ],
        correctOptionId: "d",
        explanation:
          "Sum assured is the fixed amount the insurer guarantees to pay out — the core promise of the policy, separate from any bonuses.",
      },
      {
        id: "l4",
        prompt: "Can you hold more than one life insurance policy at once?",
        options: [
          { id: "a", label: "No, only one policy is allowed per person" },
          { id: "b", label: "Only if the first one has expired" },
          { id: "c", label: "Only with government approval" },
          { id: "d", label: "Yes, from the same or different insurers" },
        ],
        correctOptionId: "d",
        explanation:
          "There's no legal limit — many people hold multiple term/life policies to build up adequate total cover over time.",
      },
    ],
  },
  {
    id: "travel-basics",
    topic: "travel",
    title: "Travel insurance basics",
    description: "Medical cover, credit cards, and trip interruption — in 4 quick questions.",
    questions: [
      {
        id: "t1",
        prompt: "What does travel insurance typically cover?",
        options: [
          { id: "a", label: "Only lost luggage" },
          { id: "b", label: "Only flight ticket refunds" },
          { id: "c", label: "Medical emergencies, cancellations, delays, and lost baggage" },
          { id: "d", label: "Only domestic trips" },
        ],
        correctOptionId: "c",
        explanation:
          "A good travel policy bundles medical emergency cover, trip cancellation/interruption, baggage loss, and delay compensation together.",
      },
      {
        id: "t2",
        prompt: "If your credit card already offers some travel cover, should you still check a dedicated policy?",
        options: [
          { id: "a", label: "No, card cover is always enough" },
          { id: "b", label: "Yes — card cover is often more limited than a dedicated policy" },
          { id: "c", label: "Only if you're travelling for over a month" },
          { id: "d", label: "No, travel insurance is never needed with any card" },
        ],
        correctOptionId: "b",
        explanation:
          "Credit-card travel cover often has lower limits and more exclusions than a dedicated policy — always check the fine print.",
      },
      {
        id: "t3",
        prompt: "Are pre-existing medical conditions covered under a standard travel policy?",
        options: [
          { id: "a", label: "Always fully covered" },
          { id: "b", label: "Only for trips under 3 days" },
          { id: "c", label: "Usually excluded, unless declared with an add-on" },
          { id: "d", label: "Only covered for children" },
        ],
        correctOptionId: "c",
        explanation:
          "Most standard plans exclude pre-existing conditions unless you specifically declare them and opt into relevant add-on cover.",
      },
      {
        id: "t4",
        prompt: "What does \"trip interruption\" cover reimburse?",
        options: [
          { id: "a", label: "A delayed flight only" },
          { id: "b", label: "A refund for cancelling before the trip starts" },
          { id: "c", label: "Lost passports only" },
          { id: "d", label: "Unused costs if you cut your trip short for a covered reason" },
        ],
        correctOptionId: "d",
        explanation:
          "Trip interruption reimburses the non-refundable, unused part of your trip if you have to end it early for a covered reason.",
      },
    ],
  },
  {
    id: "myths-vs-facts",
    topic: "general",
    title: "Insurance myths vs facts",
    description: "Busting the excuses people give for skipping insurance — in 4 quick questions.",
    questions: [
      {
        id: "g1",
        prompt: "\"Young and healthy people don't need insurance.\" True or false?",
        options: [
          { id: "a", label: "True — it's only useful after 40" },
          { id: "b", label: "False — buying early usually means lower premiums" },
          { id: "c", label: "True — insurance is only for older people" },
          { id: "d", label: "False, but only for life insurance" },
        ],
        correctOptionId: "b",
        explanation:
          "Premiums are lower when you're younger and healthier, and cover is best in place before any health issues make future claims harder.",
      },
      {
        id: "g2",
        prompt: "\"If I never claim, insurance is a waste of money.\" True or false?",
        options: [
          { id: "a", label: "True, always" },
          { id: "b", label: "True, but only for auto insurance" },
          { id: "c", label: "False — a No Claim Bonus often rewards claim-free years" },
          { id: "d", label: "False, but only life insurance offers this" },
        ],
        correctOptionId: "c",
        explanation:
          "Most health and motor policies reward claim-free years with a No Claim Bonus — either a premium discount or a cover top-up.",
      },
      {
        id: "g3",
        prompt: "\"Once I buy a policy, my premium never changes.\" True or false?",
        options: [
          { id: "a", label: "True, premiums are locked for life" },
          { id: "b", label: "False — premiums can change at renewal" },
          { id: "c", label: "True, only for life insurance" },
          { id: "d", label: "False, but only due to inflation" },
        ],
        correctOptionId: "b",
        explanation:
          "Premiums generally aren't fixed forever — they can be revised at renewal based on your age, claims history, and insurer-wide repricing.",
      },
      {
        id: "g4",
        prompt: "\"I don't need to disclose a habit like smoking if I'm quitting soon.\" True or false?",
        options: [
          { id: "a", label: "True, it doesn't matter once you plan to quit" },
          { id: "b", label: "True, only relevant for life insurance" },
          { id: "c", label: "False, but only matters for people over 50" },
          { id: "d", label: "False — non-disclosure can lead to claim rejection" },
        ],
        correctOptionId: "d",
        explanation:
          "Insurers price risk based on habits disclosed at purchase. Hiding known habits like smoking can void your policy or get a claim rejected.",
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return QUIZZES.find((quiz) => quiz.id === id);
}
