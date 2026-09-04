import type { MortgageResult } from "@/domain/loan";
import type { NormalizedProperty } from "@/domain/property";
import type { CategoryScore, ReportCardResult, ScoreCategory, ScoreWeight } from "@/domain/report";

export const DEFAULT_WEIGHTS: ScoreWeight[] = [
  { category: "priceVsMarket", weight: 25 }, { category: "affordability", weight: 20 },
  { category: "appreciation", weight: 20 }, { category: "rentalPotential", weight: 15 },
  { category: "marketConditions", weight: 10 }, { category: "taxesAndHoa", weight: 10 },
];

const clamp = (n: number) => Math.max(0, Math.min(100, n));
export const gradeForScore = (score: number | null) => {
  if (score === null) return "N/A";
  if (score >= 93) return "A"; if (score >= 90) return "A-"; if (score >= 87) return "B+";
  if (score >= 83) return "B"; if (score >= 80) return "B-"; if (score >= 77) return "C+";
  if (score >= 73) return "C"; if (score >= 70) return "C-"; if (score >= 60) return "D";
  return "F";
};

interface ScoreInputs { property: NormalizedProperty; purchasePrice: number; mortgage: MortgageResult; monthlyIncome?: number }

function item(category: ScoreCategory, score: number | null, explanation: string): CategoryScore {
  const rounded = score === null ? null : Math.round(clamp(score));
  return { category, score: rounded, grade: gradeForScore(rounded), explanation };
}

export function scoreReportCard(input: ScoreInputs, weights = DEFAULT_WEIGHTS): ReportCardResult {
  const { property: p, purchasePrice, mortgage } = input;
  const value = p.estimatedValue.value;
  const rent = p.estimatedRent.value;
  const appreciation = p.market.annualAppreciationRate.value;
  const dom = p.market.daysOnMarket.value;
  const taxes = p.annualPropertyTaxes.value;

  const priceScore = value && value > 0
    ? 75 + ((value - purchasePrice) / value) * 250 : null;
  const affordabilityScore = input.monthlyIncome && input.monthlyIncome > 0
    ? 110 - (mortgage.estimatedTotalHousingPayment / input.monthlyIncome) * 150 : null;
  const appreciationScore = appreciation === null ? null : 50 + appreciation * 8;
  const rentScore = rent && purchasePrice > 0 ? (rent / purchasePrice) * 100 * 85 : null;
  const marketScore = dom === null ? null : 105 - dom * 1.2;
  const taxHoaScore = taxes !== null && purchasePrice > 0
    ? 100 - (taxes / purchasePrice) * 100 * 22 - (mortgage.monthlyHoa / 5) : null;

  const categories = [
    item("priceVsMarket", priceScore, value === null ? "Estimated market value is unavailable." : "Compares purchase price with the third-party estimated value."),
    item("affordability", affordabilityScore, input.monthlyIncome ? "Compares estimated housing payment with entered gross income." : "Gross monthly income is needed for this score."),
    item("appreciation", appreciationScore, appreciation === null ? "Historical appreciation data is unavailable." : "Uses the available historical annual market rate; it is not a forecast."),
    item("rentalPotential", rentScore, rent === null ? "Estimated rent is unavailable." : "Compares estimated monthly rent with purchase price."),
    item("marketConditions", marketScore, dom === null ? "Local days-on-market data is unavailable." : "Uses local days on market as a market-liquidity indicator."),
    item("taxesAndHoa", taxHoaScore, taxes === null ? "Verified or estimated property taxes are unavailable." : "Reviews taxes and HOA relative to purchase price."),
  ];

  const available = categories.filter((c) => c.score !== null);
  const weightMap = new Map(weights.map((w) => [w.category, w.weight]));
  const totalWeight = available.reduce((sum, c) => sum + (weightMap.get(c.category) ?? 0), 0);
  const overallScore = totalWeight === 0 ? null : Math.round(available.reduce(
    (sum, c) => sum + (c.score ?? 0) * (weightMap.get(c.category) ?? 0), 0,
  ) / totalWeight);
  const strongest = [...available].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))[0];
  const weakest = [...available].sort((a, b) => (a.score ?? 0) - (b.score ?? 0))[0];
  const narrative = available.length < 2
    ? "More verified property and market data is needed before a meaningful summary can be prepared."
    : `The strongest measured area is ${label(strongest.category)} (${strongest.grade}). The primary watch item is ${label(weakest.category)} (${weakest.grade}). This summary reflects only the entered and sourced data shown in this report.`;

  return { overallScore, overallGrade: gradeForScore(overallScore), categories, narrative };
}

export const label = (category: ScoreCategory) => ({
  priceVsMarket: "Price vs. market", affordability: "Affordability", appreciation: "Historical appreciation",
  rentalPotential: "Rental potential", marketConditions: "Market conditions", taxesAndHoa: "Taxes & HOA",
})[category];
