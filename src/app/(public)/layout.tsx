import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Reveal } from '@/components/ui/Reveal';
import { getSiteSettings } from '@/lib/site-settings';

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();

  return (
    <>
      <a className="skip" href="#content">Skip to content</a>
      <ProgressBar />
      <Reveal />
      <Header settings={settings} />
      <main id="content">{children}</main>
      <Footer settings={settings} />
      <WhatsAppFloat whatsapp={settings.whatsapp_number} />
    </>
  );
}
