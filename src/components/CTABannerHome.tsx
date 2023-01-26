export default function CTABannerHome() {
  return (
    <div className="container">
      <div className="mx-auto py-16 mt-8 mb-6">
        <div className="overflow-hidden rounded-lg bg-c-yellow shadow-md lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-bold tracking-tight text-c-grey sm:text-4xl">
                <span className="block">
                  Ready to grow your business?
                </span>
                <span className="block mt-2">
                  Get A Free Quote Today.
                </span>
              </h2>
              <p className="mt-4 text-lg leading-6 text-c-grey">
                We take key quality management principles and mould
                them to fit in the context of your organization. Let
                your managers lead processes that result in customer
                satisfaction and improved quality.
              </p>
              <a
                href="https://quote.contourna.com"
                className="mt-8 inline-flex items-center rounded-md border border-transparent bg-c-grey px-5 py-3 text-base font-bold text-white shadow hover:bg-opacity-75"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
            <img
              className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="images/get-a-quote-demo.png"
              alt="Get a quote screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
