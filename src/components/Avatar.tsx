import React, { useState } from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function Avatar({ src, alt, className = '', fallback }: AvatarProps) {
  const [error, setError] = useState(false);

  return (
    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200 rounded-full shrink-0 ${className}`}>
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          onError={() => setError(true)}
          className="w-full h-full object-cover rounded-full"
          referrerPolicy="no-referrer"
        />
      ) : (
        <span className="font-medium text-gray-500">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
}
