import Hero from "@/components/Hero";
import Cake from "@/components/Cake";
import Wishes from "@/components/Wishes";
import Closing from "@/components/Closing";
import FloatingBalloons from "@/components/FloatingBalloons";
import Confetti from "@/components/Confetti";
import MusicPlayer from "@/components/MusicPlayer";
import { BIRTHDAY } from "@/lib/constants";

const birthdayJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Happy Birthday Dr. Mansoor Ahmed",
  description: BIRTHDAY.tagline,
  startDate: "2026-08-01",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  organizer: {
    "@type": "Person",
    name: "Friends and Family",
  },
  subjectOf: {
    "@type": "Person",
    name: BIRTHDAY.name,
    birthDate: "1992-08-01",
  },
};

export default function Home() {
  return (
    <>
      <FloatingBalloons />
      <Confetti />
      <main id="main" className="relative z-10">
        <Hero />
        <Cake />
        <Wishes />
        <Closing />
      </main>
      <MusicPlayer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(birthdayJsonLd) }}
      />
    </>
  );
}
