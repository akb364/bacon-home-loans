export type { DataProvenance, SourcedValue } from "./provenance";
import type { SourcedValue } from "./provenance";

export interface Address {
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  county?: string;
}

export interface Comparable {
  address: string;
  price: number | null;
  rent: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  distanceMiles: number | null;
  observedAt: string | null;
}

export interface NormalizedProperty {
  externalId: string | null;
  address: Address;
  propertyType: SourcedValue<string>;
  bedrooms: SourcedValue<number>;
  bathrooms: SourcedValue<number>;
  squareFeet: SourcedValue<number>;
  lotSquareFeet: SourcedValue<number>;
  yearBuilt: SourcedValue<number>;
  annualPropertyTaxes: SourcedValue<number>;
  monthlyHoa: SourcedValue<number>;
  estimatedValue: SourcedValue<number>;
  estimatedRent: SourcedValue<number>;
  photoUrl: SourcedValue<string>;
  saleComparables: Comparable[];
  rentalComparables: Comparable[];
  market: {
    medianSalePrice: SourcedValue<number>;
    medianPricePerSquareFoot: SourcedValue<number>;
    annualAppreciationRate: SourcedValue<number>;
    daysOnMarket: SourcedValue<number>;
  };
}

export interface PropertyLookupRequest {
  address: string;
  city?: string;
  state?: string;
  postalCode?: string;
}
