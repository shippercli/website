"use client";

import Image from "next/image";

type ProviderLogoProps = {
  alt: string;
  lightSrc: string;
  darkSrc?: string;
  width: number;
  height: number;
  className?: string;
};

export default function ProviderLogo({
  alt,
  lightSrc,
  darkSrc,
  width,
  height,
  className,
}: ProviderLogoProps) {
  if (!darkSrc) {
    return <Image src={lightSrc} alt={alt} width={width} height={height} className={className} />;
  }

  return (
    <>
      <Image
        src={lightSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} provider-logo provider-logo-light`}
      />
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className ?? ""} provider-logo provider-logo-dark`}
      />
    </>
  );
}
