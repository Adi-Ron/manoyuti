import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Reveal } from '@/components/ui/Reveal';
import { getSiteSettings } from '@/lib/site-settings';
import { InteriorPages } from '@/components/ui/InteriorPages';
import '@/styles/interior.css';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <ProgressBar />
      <Reveal />
      <Header settings={settings} />
      <main id="content"><InteriorPages>{children}</InteriorPages></main>
      <Footer settings={settings} />
    </>
  );
}
