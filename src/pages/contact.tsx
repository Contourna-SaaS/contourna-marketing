import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import HowItWorksSVG from '@/assets/how-it-works.svg';
import Contact from '@/components/Contact';

export default function HowItWorks() {
  return (
    <Layout>
      <BasicMeta url={'/contact'} title="Contact" />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <Contact />
    </Layout>
  );
}
