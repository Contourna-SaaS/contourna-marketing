import React from 'react';

interface TwoColumnLayoutProps {
  title: string;
  copy: string | React.ReactNode;
  img: React.ReactNode;
  contentSide: 'left' | 'right';
}

export default function TwoColumnLayout({
  title,
  copy,
  img,
  contentSide = 'left',
}) {
  return (
    <section
      className="how-it-works pb-8 lg:pb-10 xl:pb-16"
      id="works"
    >
      <div className="container">
        <div
          className={
            contentSide === 'left'
              ? 'flex-row md:flex items-center'
              : 'flex-row-reverse md:flex items-center'
          }
        >
          <div
            className={
              contentSide === 'left'
                ? 'md:w-2/3 md:pr-8 lg:pr-12'
                : 'md:w-2/3 md:pl-8 lg:pl-12'
            }
          >
            <h2 className="text-2xl mb-6 font-bold tracking-tight text-black sm:text-3xl lg:mt-6 xl:text-4xl">
              {title}
            </h2>
            {typeof copy === 'string' ? <p>{copy}</p> : copy}
          </div>
          <div className="md:w-1/3">{img}</div>
        </div>
      </div>
    </section>
  );
}
