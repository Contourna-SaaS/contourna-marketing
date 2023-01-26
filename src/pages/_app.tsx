import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import { ReCaptchaProvider } from "next-recaptcha-v3";
import "../../public/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <Component {...pageProps} />;
    </ReCaptchaProvider>
  )

}
