import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import Hero from '@/components/Hero';
import HowItWorksSVG from '@/assets/how-it-works.svg';
import QuoteSVG from '@/assets/quote.svg';
import TwoColumnLayout from '@/components/TwoColumnLayout';

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
              You contact us to complete an audit and we provide a
              report with our findings. Prior to conducting our
              testing and interviews, we research and prepare a
              program tailored specifically for your business. With
              our findings and observations we draft a report to be
              reviewed and discussed, giving you the next steps to
              grow your business.
            </p>
          }
          img={<HowItWorksSVG className="how-it-works" />}
          cta={{
            title: 'Learn More',
            href: '/how-it-works',
          }}
        />
        <TwoColumnLayout
          title="Get a free quote"
          copy={
            <p className="text-base leading-6 text-gray-800 lg:text-lg xl:text-xl">
              <span className="block font-bold text-lg mb-2 lg:text-xl text-black">
                Let us help you grow.
              </span>
              We take key quality management principles and mould them
              to fit in the context of your organization. Let your
              managers lead processes that result in customer
              satisfaction and improved quality.
            </p>
          }
          img={<QuoteSVG className="quote-svg" />}
          contentSide="right"
          cta={{
            title: 'Get A Quote',
            href: 'https://quote.contourna.com',
          }}
        />
      </div>
    </Layout>
  );
}
