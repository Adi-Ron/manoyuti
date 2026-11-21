import { SERVICES, TRAINING_PROGRAMMES, ORG_PROGRAMMES, RESEARCH_AREAS, JOURNEY_STEPS } from '@/lib/utils';
import { getSiteSettings } from '@/lib/site-settings';
import { Hero } from './_components/Hero';
import { Journey } from './_components/Journey';
import { Services } from './_components/Services';
import { Contact } from './_components/Contact';
import '@/styles/home-mobile.css';

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero settings={settings} />
      <Journey steps={JOURNEY_STEPS} />
      <Services />
      <Contact />
    </>
  );
}
