import GlobalNetworkCanvas from "@/components/GlobalNetworkCanvas";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import HowItWorks from "@/components/HowItWorks";
import WhyDevor from "@/components/WhyDevor";
import FAQ from "@/components/FAQ";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-sky-500/30 selection:text-sky-200">
      <GlobalNetworkCanvas />
      <Navbar />
      <Hero />
      <Products />
      <HowItWorks />
      <WhyDevor />
      <FAQ />
      <Waitlist />
      <Footer />
    </main>
  );
}
