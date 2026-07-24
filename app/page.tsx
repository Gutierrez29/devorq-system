import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import WhyDevor from "@/components/WhyDevor";
import AsysSpotlight from "@/components/AsysSpotlight";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <WhyDevor />
      <AsysSpotlight />
      <Waitlist />
      <Footer />
    </main>
  );
}
