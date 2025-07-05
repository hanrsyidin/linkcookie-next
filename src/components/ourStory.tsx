import Image from 'next/image';
import Link from 'next/link';

export default function OurStory() {
  return (
    <section id="our-story" className="bg-white py-16 sm:py-24 relative overflow-hidden">
      
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-25 z-0 w-100 h-100 bg-pink-500/20 rounded-full blur-3xl -translate-x-1/2"
      ></div>
      <div
        aria-hidden="true"
        className="hidden md:block absolute bottom-25 right-10 z-0 w-100 h-100 bg-pink-500/20 rounded-full blur-3xl translate-x-1/2"
      ></div>
      
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
            <Image
            src="/AsetImage/our_story_image.jpg"
            alt="Dapur Linkcookie"
            fill
            className="rounded-lg shadow-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="text-zinc-800">
            <p className="text-xl md:text-2xl font-semibold text-pink-500 uppercase">Our Story</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">From Our Kitchen to Yours</h2>
            <p className="mt-4 text-zinc-600 text-base md:text-xl leading-relaxed text-justify">
              Linkcookie berawal dari sebuah dapur rumahan sederhana dengan resep warisan keluarga dan kecintaan yang tulus terhadap kue. Setiap adonan kami buat dengan tangan, menggunakan bahan-bahan pilihan terbaik tanpa pengawet, untuk memastikan setiap gigitan memberikan kebahagiaan.
            </p>
            <p className="mt-4 text-zinc-600 text-base md:text-xl leading-relaxed text-justify">
              Misi kami adalah menyajikan cookies yang tidak hanya lezat, tetapi juga membawa kehangatan dan kenangan manis, sama seperti saat kami membuatnya untuk orang-orang terkasih.
            </p>
            <div className="mt-8">
              <Link href="/about" className="no-underline">
                <button className="bg-zinc-800 text-white font-bold py-3 px-6 rounded-md hover:bg-zinc-700 transition-colors duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}