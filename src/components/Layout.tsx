import Head from 'next/head';
import Navigation from './Navigation';
import SocialFooter from './SocialFooter';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root bg-c-off-white">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <nav className="bg-white sticky top-0 z-10">
        <Navigation />
      </nav>
      <main>{children}</main>
      <SocialFooter />
    </div>
  );
}
