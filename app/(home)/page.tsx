import CTA from "@/components/cta";
import Features from "@/components/Feature";
import Hero from "@/components/Hero";
import ProductsList from "@/components/products/ProductsList";
import ServicesList from "@/components/services/ServicesList";

export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-blue-100 to-purple-100 dark:from-secondary dark:to-secondary">
        <Hero />
      </div>
      <Features/>
      <ServicesList/>
      <CTA/>
    </>
  );
}
