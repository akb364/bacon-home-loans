import type { NormalizedProperty, PropertyLookupRequest, SourcedValue } from "@/domain/property";
import type { PropertyDataProvider } from "./property-provider";

const unavailable = <T>(): SourcedValue<T> => ({ value: null, provenance: "unavailable" });

export class ManualPropertyProvider implements PropertyDataProvider {
  readonly name = "manual";

  async lookup(request: PropertyLookupRequest): Promise<NormalizedProperty> {
    return {
      externalId: null,
      address: {
        line1: request.address,
        city: request.city ?? "",
        state: request.state ?? "AZ",
        postalCode: request.postalCode ?? "",
      },
      propertyType: unavailable(), bedrooms: unavailable(), bathrooms: unavailable(),
      squareFeet: unavailable(), lotSquareFeet: unavailable(), yearBuilt: unavailable(),
      annualPropertyTaxes: unavailable(), monthlyHoa: unavailable(), estimatedValue: unavailable(),
      estimatedRent: unavailable(), photoUrl: unavailable(), saleComparables: [], rentalComparables: [],
      market: {
        medianSalePrice: unavailable(), medianPricePerSquareFoot: unavailable(),
        annualAppreciationRate: unavailable(), daysOnMarket: unavailable(),
      },
    };
  }
}
