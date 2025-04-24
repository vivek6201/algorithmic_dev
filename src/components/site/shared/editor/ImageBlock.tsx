"use client";
import Image from "next/image";
import React from "react";

export default function ImageBlock({ src, alt }: { src: string; alt: string }) {
  return <Image height={200} width={200} src={src} alt={alt} />;
}
