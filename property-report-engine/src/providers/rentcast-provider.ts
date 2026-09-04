import type { NormalizedProperty, PropertyLookupRequest } from "@/domain/property";
import type { PropertyDataProvider } from "./property-provider";
import { PropertyProviderError } from "./property-provider";

/** Server-only adapter boundary. Mapping is intentionally isolated from the domain model. */
export class RentCastPropertyProvider implements PropertyDataProvider {
  readonly name = "rentcast";
  constructor(private readonly apiKey: string) {}

  async lookup(_request: PropertyLookupRequest): Promise<NormalizedProperty | null> {
    if (!this.apiKey) {
      throw new PropertyProviderError("RENTCAST_API_KEY is not configured", this.name);
    }
    throw new PropertyProviderError(
      "RentCast transport and response mapping are pending API account configuration",
      this.name,
    );
  }
}
