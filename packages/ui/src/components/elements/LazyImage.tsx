import Image from 'next/image';
import React from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  width: number;
  height: number;
}

export default function LazyImage({ width, height, src, ...props }: LazyImageProps) {
  return (
    <Image
      src={src}
      alt={props.alt ?? ''}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  );
}
