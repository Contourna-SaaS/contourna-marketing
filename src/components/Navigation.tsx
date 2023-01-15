import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from '@/assets/logo-icon.svg';

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const navigation = [
    { name: 'How It Works', href: '#' },
    { name: 'Blog', href: 'posts' },
    { name: 'Contact', href: '#' },
    { name: 'Get a quote', href: '#' },
  ];
  return (
    <div className="relative overflow-hidden">
      <Popover as="header" className="relative">
        <div className="pt-6 pb-6">
          <nav
            className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
            aria-label="Global"
          >
            <div className="flex flex-1 items-center">
              <div className="flex w-full items-center justify-between md:w-auto">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <Logo width={60} />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden space-x-8 md:ml-10 md:flex">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      className={
                        router.pathname.startsWith(`/${item.href}`)
                          ? 'active text-base font-medium text-black hover:text-gray-300'
                          : 'text-base font-medium text-black hover:text-gray-300'
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-6">
              <Link href="quote.contourna.com">
                <a
                  href="quote.contourna.com"
                  className="inline-flex items-center rounded-md border border-transparent bg-c-yellow text-white px-4 py-2 text-base font-medium"
                >
                  Get a free quote
                </a>
              </Link>
            </div>
          </nav>
        </div>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden"
          >
            <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="flex items-center justify-between px-5 pt-4">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Popover.Button>
                </div>
              </div>
              <div className="pt-5 pb-6">
                <div className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                      <a
                        className={
                          router.pathname.startsWith(`/${item.href}`)
                            ? 'active block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50'
                            : 'block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50'
                        }
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 px-5">
                  <Link href="quote.contourna.com">
                    <a
                      href="quote.contourna.com"
                      className="block w-full rounded-md bg-indigo-600 py-3 px-4 text-center font-medium text-black shadow hover:bg-indigo-700"
                    >
                      Get a free quote
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
