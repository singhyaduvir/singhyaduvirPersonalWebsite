import { BeyondWork } from "@/components/sections/beyond-work";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Exploring } from "@/components/sections/exploring";
import { Hero } from "@/components/sections/hero";
import { Reading } from "@/components/sections/reading";
import { SelectedWork } from "@/components/sections/selected-work";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <SelectedWork />
      <Exploring />
      <Reading />
      <BeyondWork />
      <Contact />
    </>
  );
}
