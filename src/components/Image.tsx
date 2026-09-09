import { useState } from "react";

interface ImageProps {
  image: string;
  alt: string;
  className?: string;
}

const LineImage = ({ image, alt, className = "" }: ImageProps) => {
  const [hasFailed, setHasFailed] = useState(false);

  if (hasFailed) return null;

  return (
    <img
      onError={() => setHasFailed(true)}
      src={image}
      alt={alt}
      width={400}
      height={400}
      loading="lazy"
      className={`h-[400px] w-[400px] object-cover ${className}`}
    />
  );
};

export default LineImage;
