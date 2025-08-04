import BestSellers from "@/components/bestSeller";
import Features from "@/components/feature";
import Hero from "@/components/hero";
import InstagramFeed from "@/components/instagramFeed";
import OurStory from "@/components/ourStory";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <OurStory />
      <Features />
      <BestSellers />
      <Testimonials />
      <InstagramFeed />
    </main>
  );
}