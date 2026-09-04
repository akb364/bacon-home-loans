import type { NormalizedProperty, PropertyLookupRequest } from "@/domain/property";

export interface PropertyDataProvider {
  readonly name: string;
  lookup(request: PropertyLookupRequest): Promise<NormalizedProperty | null>;
}

export class PropertyProviderError extends Error {
  constructor(
    message: string,
    readonly provider: string,
    readonly cause?: unknown,
  ) {
    super(message);
    this.name = "PropertyProviderError";
  }
}
