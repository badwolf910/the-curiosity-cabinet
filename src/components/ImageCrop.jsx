import { useState } from 'react';

// Shows a focused region of one photo; x/y are 0-1 fractions of the image to centre on.
export default function ImageCrop({ src, alt, zoom = 1, x = 0.5, y = 0.5, onError }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={src} alt={alt} loading="lazy" className="crop"
      style={{ width: `${zoom * 100}%`, transform: `translate(${-x * 100}%, ${-y * 100}%)` }}
      onError={() => { setOk(false); onError?.(); }}
    />
  );
}
