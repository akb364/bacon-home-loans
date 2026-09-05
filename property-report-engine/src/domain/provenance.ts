export type DataProvenance = "verified" | "user_entered" | "third_party_estimate" | "calculated_estimate" | "hypothetical_projection" | "unavailable";
export interface SourcedValue<T> { value: T | null; provenance: DataProvenance; source?: string; observedAt?: string; }
