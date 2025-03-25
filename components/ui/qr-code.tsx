"use client";

import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeProps {
  data: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export function QRCode({
  data,
  size = 200,
  color = "#FF6B00",
  backgroundColor = "#000000",
  className,
}: QRCodeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: data,
      dotsOptions: {
        color: color,
        type: "rounded",
      },
      cornersSquareOptions: {
        color: color,
        type: "extra-rounded",
      },
      cornersDotOptions: {
        color: color,
        type: "dot",
      },
      backgroundOptions: {
        color: backgroundColor,
      },
    });

    ref.current.innerHTML = "";
    qrCode.append(ref.current);
  }, [data, size, color, backgroundColor]);

  return <div ref={ref} className={className} />;
}
