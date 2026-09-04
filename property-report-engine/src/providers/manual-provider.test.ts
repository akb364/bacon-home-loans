import { describe, expect, it } from "vitest";
import { ManualPropertyProvider } from "./manual-provider";

describe("ManualPropertyProvider", () => {
  it("represents missing data explicitly", async () => {
    const property = await new ManualPropertyProvider().lookup({ address: "1 Test Ave", state: "AZ" });
    expect(property.estimatedValue).toEqual({ value: null, provenance: "unavailable" });
    expect(property.address.line1).toBe("1 Test Ave");
  });
});
