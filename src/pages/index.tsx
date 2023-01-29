import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import Hero from '@/components/Hero';
import HowItWorksSVG from '@/assets/how-it-works.svg';
import QuoteSVG from '@/assets/quote.svg';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import CTABannerHome from '@/components/CTABannerHome';

export default function Index() {
  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="pb-8">
        <Hero />
        <TwoColumnLayout
          title="How it works"
          copy={
            <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl ">
              <span className="block font-bold text-lg mb-2 lg:text-xl text-black">
                Our process is easy.
              </span>
              You contact us to complete an audit, and we provide a report with our findings. Before conducting our testing and interviews, we research and prepare a program tailored specifically for your business. With our findings and observations, we draft a report to be reviewed and discussed, giving you the following steps to grow your business.
            </p>
          }
          img={
            <video autoPlay loop muted playsInline>
              <source src="/images/hero-web.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
          cta={{
            title: "Learn More",
            href: "/services",
          }}
        />
        <CTABannerHome />
      </div>
    </Layout>
  );
}
