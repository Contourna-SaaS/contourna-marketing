import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import gif from '@/assets/hero-web.gif';

export default function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="pt-10 sm:pt-16 lg:overflow-hidden lg:pt-8 lg:pb-14">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                {/* <div className="hidden sm:mb-5 sm:flex sm:justify-center lg:justify-start">
                  <a
                    href="#"
                    className="flex items-center rounded-full bg-black p-1 pr-2 text-black hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                  >
                    <span className="rounded-full bg-indigo-500 px-3 py-0.5 text-sm font-semibold leading-5 text-black">
                      We're hiring
                    </span>
                    <span className="ml-4 text-sm">
                      Visit our careers page
                    </span>
                    <ChevronRightIcon
                      className="ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </div> */}
                <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl lg:mt-6 xl:text-6xl">
                  Make your business easier to manage
                </h1>
                <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Our Auditing service helps improve quality
                  management through controlled processes, improved
                  employee onboarding, enhanced customer satisfaction
                  and more employee involvement.
                </p>
              </div>
            </div>
            <div className="mt-12 -mb-16 sm:-mb-48 lg:relative lg:m-0">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                <img
                  className="hero-gif"
                  src="/images/hero-web.gif"
                  alt="my gif"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
