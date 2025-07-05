// src/components/SectionTitle.tsx

export default function SectionTitle() {
  const backgroundText = "Linkcookie ".repeat(20);

  return (
    <>
      {/* <style>
        {`
          @keyframes marquee {
            from { transform: translateX(0%); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
          }
        `}
      </style> */}
      <div className="relative flex h-24 items-center justify-center overflow-hidden">
        {/* Teks Latar Belakang (Watermark) */}
        <div className="absolute top-0 left-0 animate-marquee whitespace-nowrap">
          <span
            className="mx-4 text-8xl font-black uppercase text-zinc-900"
            style={{
              WebkitTextStroke: '1px rgb(228 228 231 / 0.5)',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {backgroundText}{backgroundText}
          </span>
        </div>
      </div>
    </>
  );
}