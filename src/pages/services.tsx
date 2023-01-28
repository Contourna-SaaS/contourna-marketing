import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import HowItWorksSVG from '@/assets/how-it-works.svg';
import FeatureList from '@/components/FeatureList';
import SimpleHeader from '@/components/SimpleHeader';
import { IoMdPeople } from "react-icons/io"
import { GiArchiveResearch } from "react-icons/gi"
import { MdCastForEducation, MdOutlineModelTraining } from "react-icons/md"
import { MdOutlinePolicy } from "react-icons/md"
import { RiGovernmentLine } from "react-icons/ri"
import LargeFeatureList from '@/components/LargeFeatureList';
import PreFooter from '@/components/PreFooter';


export default function HowItWorks() {
  const features = [
    {
      name: 'Manufacturing',
    },
    {
      name: 'Retail Trade',
    },
    {
      name: 'Real Estate and Rental and Leasing',
    },
    {
      name: 'Accommodation and Food Services',
    },
    {
      name: 'Wholesale Trades',
    },
    {
      name: 'Educational Services',
    },
    {
      name: 'Other Services (Except Public Administration)',
    },
  ]


  const featuresTwo = [
    {
      name: 'Employee Onboarding',
      description: 'Provide training documents targeted towards improving your products.',
      icon: <IoMdPeople size={24} />,
    },
    {
      name: 'Data Research',
      description: 'Applying data to look for improvement.',
      icon: <GiArchiveResearch size={24} />,
    },
    {
      name: 'Learning Material',
      description: 'ongoing learning and training material for employees',
      icon: <MdCastForEducation size={24} />,
    },
    {
      name: 'Policy Creation',
      description: 'Organization expectations and company policies.',
      icon: <MdOutlinePolicy size={24} />,
    },
    {
      name: 'Industry Guidelines',
      description: 'Meeting mandatory guidelines from the government or other important bodies of influence.',
      icon: <RiGovernmentLine size={24} />,
    },
    {
      name: 'Quality Management Training',
      description: 'Training to improve the quality of your products.',
      icon: <MdOutlineModelTraining size={24} />,
    },
  ]

  return (

    <Layout>
      <BasicMeta url={'/services'} title="Services" />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <SimpleHeader title="Contourna Services" copy="Our specialty is rooted in the principles of Quality Management. That is because it is more than just setting expectations and policies. It is how you lead your managers, customers, employees, and suppliers while continually improving through risk assessment. It evolves with your business and promotes ownership among your employees, making it easier to manage your business." />
      <LargeFeatureList
        title="Evolve Your Business"
        subtitle="What areas of a business can we help?"
        features={featuresTwo}
      />
      <FeatureList
        title="Tailored Audits"
        subtitle='For Your Industry'
        copy="We offer tailored audits and Improvement Plans for the following industries:"
        features={features}
      />
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
        img={<img
          className="hero-gif"
          src="/images/hero-web.gif"
          alt="my gif"
        />}
      />
      <PreFooter
        title="Make your business"
        subtitle="easier to manage"
        copy="It's proven that people are capable of handling themselves. Often it's the system that causes problems."
        firstCTATitle="Get a free quote"
        firstCTALink="https://quote.contourna.com"
        secondCTATitle='Contact us'
        secondCTALink='/contact'

      />

    </Layout>
  );
}
