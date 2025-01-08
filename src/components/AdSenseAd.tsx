// src/components/AdSenseAd.tsx

import React, { useEffect } from "react";

interface AdSenseAdProps {
  adClient: string;       // e.g., "ca-pub-1928647206714490"
  adSlot: string;         // e.g., "1234567890" from AdSense
  adFormat?: string;      // default "auto"
  fullWidthResponsive?: boolean; // default "true"
  className?: string;
  style?: React.CSSProperties;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({
  adClient,
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className,
  style,
}) => {
  useEffect(() => {
    // Trigger ad re-render after component mounts
    try {
      // @ts-expect-error adsbygoogle is injected by Google's script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className || ""}`}
      style={style || { display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
    />
  );
};

export default AdSenseAd;
