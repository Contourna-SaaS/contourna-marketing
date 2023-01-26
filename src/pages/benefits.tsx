import Layout from '../components/Layout';
import BasicMeta from '../components/meta/BasicMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import TwoColumnLayout from '@/components/TwoColumnLayout';
import SimpleHeader from '@/components/SimpleHeader';
import FeatureList from '@/components/FeatureList';

import KnowledgeSharing from "@/assets/knowledge-sharing.svg"
import CoffeeShop from "@/assets/coffee-shop.svg"
import Collaboration from "@/assets/collaboration-2.svg"
import PreFooter from '@/components/PreFooter';

export default function HowItWorks() {

  const features = [
    {
      name: 'Employee Satisfaction Surveys',
    },
    {
      name: 'Employment Offer Letters',
    },
    {
      name: 'Job Application Forms',
    },
    {
      name: 'Benefits Enrollment',
    },
    {
      name: 'Candidate Interview Evaluation',
    },
    {
      name: 'Training Manual',
    },
  ]

  return (
    <Layout>
      <BasicMeta url={'/'} />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <SimpleHeader title="Why Businesses Choose Contourna" copy="As a small business owner or manager, you have to do it all. With our services, we can help make your life easier." />

      <TwoColumnLayout
        title="Human Resources"
        copy={
          <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl ">
            With our employee onboarding approach, you'll save time and better meet employee needs, and improve retention.
            <ul>
              <li>
                Make your hiring process easier.
              </li>
              <li>
                Contourna allows your recruitment process to be simplified by using online forms, surveys, interview questions, and document automation to manage job applications, interview feedback, contracts, and more.
              </li>
              <li>
                Streamline employee onboarding.
              </li>
              <li>
                Expedite the employee onboarding process by sending all generated employee forms and documents.
              </li>
              <li>
                Simplify training plans
              </li>
              <li>
                Create a consistent, manageable, and automated training process and measure employee engagement with surveys and quizzes.
              </li>
            </ul>
          </p>
        }
        img={<KnowledgeSharing />}
      />

      <FeatureList
        inverse={true}
        title="Tailored Systems"
        subtitle='For Your Needs'
        copy="We offer a tailored system that contains the following:"
        features={features}
      />

      <TwoColumnLayout
        contentSide='right'
        title="Customer Satisfaction"
        copy={
          <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl ">
            Our approach to quality management aims to retain the customer to support the business. Take customer satisfaction to the next level by determining what is truly important. By tailoring your business to meet customer needs, we increase your resources and minimize minutia.
            <ul>
              <li>
                <span>Streamline how you understand the needs of customers.</span>
                Contourna keeps everyone on the same page by identifying and understanding customer expectations through surveys, marketing automation, and a buyer's persona.
              </li>
              <li>
                <span>Recognize gaps in service or product quality.</span>
                Communicate clear and concise standards and performance expectations to staff through department-specific documents in a digestible way.
              </li>
              <li>
                <span>Prioritize Customer Retention</span>
                Creating a simplified way to consistently manage customer feedback will identify ways to encourage more customers to conduct business with you - again and again.
              </li>
            </ul>
          </p>
        }
        img={<CoffeeShop />}
      />

      <TwoColumnLayout
        title="Employee Involvement"
        copy={
          <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl ">
            Our approach focuses on attaining company goals by keeping the employees aligned with the company's values through improving ownership. As a result, you will have more time to grow your business in other areas.
            <ul>
              <li>
                <span>Increased Productivity</span>
                Contourna allows you to inspire dedication and involvement through a thorough onboarding experience. When employees know what they are doing and why, they make calculated decisions, plan their work, and bring more enthusiasm to their jobs.
              </li>
              <li>
                <span>Streamline Improvement</span>
                Contourna allows employees to highlight dangers and flaws that threaten the quality of your service or product through risk management. As a result, continual improvement will increase customer retention.
              </li>
              <li>
                <span>Competitive Edge</span>
                Employees will commit more to the organization through thoughtful training programs and skill-building.
              </li>
            </ul>
          </p>
        }
        img={<Collaboration />}
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
