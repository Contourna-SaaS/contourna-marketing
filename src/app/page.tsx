import { MarketingHome } from "@/components/marketing/MarketingHome";
import { faqs, plans } from "@/components/marketing/content";

/**
 * Structured data for the two things search engines can act on here: the app
 * itself and the FAQ. Prices mirror `content.ts`, which mirrors the Stripe
 * catalog in the backend.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Contourna",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://contourna.com",
      description:
        "AI-assisted document control for policies, procedures, work instructions, and training, with forms and records to prove the process is followed.",
      offers: plans.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.monthly,
        priceCurrency: "CAD",
        description: plan.description,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, hand-authored object — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <MarketingHome />
    </>
  );
}
