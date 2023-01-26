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
      description: 'Provide trainging documents targeted towards improving your products.',
      icon: <IoMdPeople />,
    },
    {
      name: 'Data Research',
      description: 'Applying data to look for improvement.',
      icon: <GiArchiveResearch />,
    },
    {
      name: 'Learning Material',
      description: 'ongoing learning and training material for employees',
      icon: <MdCastForEducation />,
    },
    {
      name: 'Policy Creation',
      description: 'Organization expectations and company policies.',
      icon: <MdOutlinePolicy />,
    },
    {
      name: 'Industry Guidelines',
      description: 'Meeting mandatory guidelines from the government or other important bodies of influence.',
      icon: <RiGovernmentLine />,
    },
    {
      name: 'Quality Management Training',
      description: 'Training to improve the quality of your products.',
      icon: <MdOutlineModelTraining />,
    },
  ]

  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <div className="py-8">
        <SimpleHeader title="Contourna Services" copy="Our specialty is rooted in the principles of Quality Management. That is because it is more than just setting expectations and policies. It is how you lead your managers, customers, employees, and suppliers while continually improving through risk assessment. It evolves with your business and promotes ownership among your employees, making it easier to manage your business." />
        <FeatureList
          title="Tailored Audits"
          subtitle='For Your Industry'
          copy="We offer tailored audits and Improvement Plans for the following industries:"
          features={features}
        />
        <LargeFeatureList
          title="Evolve Your Business"
          subtitle="What areas of a business can we help?"
          features={featuresTwo}
        />
      </div>
    </Layout>
  );
}
