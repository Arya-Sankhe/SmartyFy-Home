import { Hero } from "@/components/hero";
import { CapabilitySpotlight } from "@/components/capability-spotlight";
import { ChatPreviewSection } from "@/components/chat-preview-section";

export default function Home() {
  return (
    <main>
      <Hero
        title={"Machine with\nSuperIntelligence"}
        ctaLabel="Explore Now"
        ctaHref="#capabilities"
      />
      <CapabilitySpotlight />
      <ChatPreviewSection />
    </main>
  );
}
