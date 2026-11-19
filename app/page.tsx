import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import RoiCalculator from "@/components/RoiCalculator";
import HowItWorks from "@/components/HowItWorks";
import WhyDevor from "@/components/WhyDevor";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Products />
      <RoiCalculator />
      <HowItWorks />
      <WhyDevor />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
