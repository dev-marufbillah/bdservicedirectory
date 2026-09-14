import { useState } from 'react';

interface LogoProps {
  light?: boolean;
}

export const Logo = ({ light = false }: LogoProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Circle Logo Image */}
      {!imgError ? (
        <div className={`relative flex items-center justify-center rounded-full overflow-hidden transition-transform duration-200 group-hover:scale-105 flex-shrink-0 ${
          light 
            ? 'w-11 h-11 bg-white p-0.5 shadow-md border border-emerald-300/30' 
            : 'w-11 h-11 md:w-12 md:h-12 bg-transparent'
        }`}>
          <img
            src="/logo.jpg"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.endsWith('.jpg')) {
                target.src = '/logo.png';
              } else if (target.src.endsWith('.png')) {
                target.src = '/logo.jpeg';
              } else {
                setImgError(true);
              }
            }}
            alt="বাংলাদেশ সার্ভিস ডিরেক্টরি"
            className={`w-full h-full object-cover rounded-full ${
              !light ? 'mix-blend-multiply' : ''
            }`}
          />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-full bg-[#006A4E] text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-emerald-300 flex-shrink-0">
          🏛️
        </div>
      )}

      {/* Brand Text Name & Tagline */}
      <div className="flex flex-col">
        <span className={`font-black text-lg md:text-[20px] tracking-tight leading-none transition-colors ${
          light ? 'text-white' : 'text-[#006A4E]'
        }`}>
          বাংলাদেশ সার্ভিস ডিরেক্টরি
        </span>
        <span className={`text-[10px] md:text-[11px] font-semibold mt-1 leading-none ${
          light ? 'text-emerald-100/90' : 'text-[#006A4E]/80'
        }`}>
          সরকারি সেবা, এক জায়গায় থেকে
        </span>
      </div>
    </div>
  );
};