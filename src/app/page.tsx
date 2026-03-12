import { Hero } from "@/components/hero";
import { CapabilitySpotlight } from "@/components/capability-spotlight";

export default function Home() {
  return (
    <main>
      <Hero
        title={"Machine with\nSuperIntelligence"}
        ctaLabel="Explore Now"
        ctaHref="#capabilities"
      />
      <CapabilitySpotlight />
    </main>
  );
}
