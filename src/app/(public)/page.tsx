import { SERVICES, TRAINING_PROGRAMMES, ORG_PROGRAMMES, RESEARCH_AREAS, FAQ_DATA, JOURNEY_STEPS, GROUNDING_STEPS, CHECK_IN_OPTIONS, CHECK_IN_RESPONSES } from '@/lib/utils';
import { getSiteSettings } from '@/lib/site-settings';
import { Hero } from './_components/Hero';
import { Journey } from './_components/Journey';
import { Pause } from './_components/Pause';
import { CheckIn } from './_components/CheckIn';
import { Perception } from './_components/Perception';
import { Grounding } from './_components/Grounding';
import { Approach } from './_components/Approach';
import { Services } from './_components/Services';
import { FAQ } from './_components/FAQ';
import { Contact } from './_components/Contact';
import { CTA } from './_components/CTA';

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Hero settings={settings} />
      <Journey steps={JOURNEY_STEPS} />
      <Pause />
      <CheckIn options={CHECK_IN_OPTIONS} responses={CHECK_IN_RESPONSES} />
      <Perception />
      <Grounding steps={GROUNDING_STEPS} />
      <Approach />
      <Services
        therapy={SERVICES}
        training={TRAINING_PROGRAMMES}
        org={ORG_PROGRAMMES}
        research={RESEARCH_AREAS}
      />
      <FAQ items={FAQ_DATA} />
      <Contact />
      <CTA settings={settings} />
    </>
  );
}
