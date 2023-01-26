import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import HowItWorksSVG from '@/assets/how-it-works.svg';
import SimpleHeader from '@/components/SimpleHeader';

export default function HowItWorks() {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="py-8">
        <SimpleHeader title="Why Businesses Choose Contourna" copy="As a small business owner or manager, you have to do it all. With our services, we can help make your life easier." />
      </div>
    </Layout>
  );
}
