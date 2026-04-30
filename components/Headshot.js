import { useState } from "react";
import siteConfig from "../lib/siteConfig";

export default function Headshot({ className = "" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  if (imageFailed) {
    return (
      <div
        className={`grid place-items-center rounded-md bg-saguaro-700 text-3xl font-black text-white ${className}`}
        aria-label={siteConfig.officerName}
      >
        AB
      </div>
    );
  }

  return (
    <img
      src={`${basePath}${siteConfig.headshotPath}`}
      alt={`${siteConfig.officerName}, Arizona mortgage loan officer`}
      className={`rounded-md object-cover ${className}`}
      onError={() => setImageFailed(true)}
    />
  );
}
