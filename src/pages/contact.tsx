import Layout from "../components/Layout";
import Meta from "../components/meta/Meta";
import OpenGraphMeta from "../components/meta/OpenGraphMeta";
import TwitterCardMeta from "../components/meta/TwitterCardMeta";
import TwoColumnLayout from "@/components/TwoColumnLayout";
import HowItWorksSVG from "@/assets/how-it-works.svg";
import Contact from "@/components/Contact";

export default function HowItWorks() {
  return (
    <Layout>
      <Meta url={"/contact"} title="Contact" />
      <OpenGraphMeta url={"/"} />
      <TwitterCardMeta url={"/"} />
      <Contact />
    </Layout>
  );
}
