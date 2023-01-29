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
      <BasicMeta url={'/benefits'} title="Benefits" />
      <OpenGraphMeta url={'/'} />
      <TwitterCardMeta url={'/'} />
      <SimpleHeader title="Why Businesses Choose Contourna" copy="You have to do everything as a small business owner or manager. With our services, we can help make your life easier." />

      <TwoColumnLayout
        title="Human Resources"
        copy={
          <div className="copy">
            <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl">
              With our employee onboarding approach, you'll save time, better meet employee needs, and improve retention.
            </p>
            <ul>
              <li>
                <span>Make your hiring process more manageable.</span>
                Contourna simplifies your recruitment process by using online forms, surveys, interview questions, and document automation to manage job applications, interview feedback, contracts, and more.
              </li>
              <li>
                <span>Streamline employee onboarding.</span>
                Expedite the employee onboarding process by sending all generated employee forms and documents.
              </li>
              <li>
                <span>Simplify training plans</span>
                Create a consistent, manageable, and automated training process and measure employee engagement with surveys and quizzes.
              </li>
            </ul>
          </div>

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
          <div className="copy">
            <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl">
              Our approach to quality management aims to retain the customer and support the business. Take customer satisfaction to the next level by determining what is truly important. By tailoring your business to meet customer needs, we increase your resources and minimize minutia.
            </p>
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
                Prioritize Customer Retention. Creating a simplified way to manage customer feedback consistently will identify ways to encourage more customers to conduct business with you - again and again.
              </li>
            </ul>
          </div>

        }
        img={<CoffeeShop />}
      />

      <TwoColumnLayout
        title="Employee Involvement"
        copy={
          <div className="copy">
            <p className="text-base leading-6 sm:text-md text-gray-800 lg:text-lg xl:text-xl">
              Our approach focuses on attaining company goals by keeping the employees aligned with the company's values through improving individual ownership. As a result, you will have more time to grow your business in other areas.
            </p>
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
          </div>
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
