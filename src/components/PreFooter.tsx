import { BiChevronRight } from 'react-icons/bi'

interface PreFooterProps {
  title: string
  subtitle: string
  copy: string
  firstCTATitle: string
  firstCTALink: string
  secondCTATitle: string
  secondCTALink: string
}

export default function PreFooter({ title, subtitle, copy, firstCTATitle, firstCTALink, secondCTATitle, secondCTALink }: PreFooterProps) {
  return (
    <div className="bg-c-yellow">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">

        <div>
          <h2 className="text-4xl font-bold tracking-tight text-c-grey">
            {title}
            <br />
            {subtitle && (
              <>
                {subtitle}
              </>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-c-grey">
            {copy}
          </p>
        </div>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href={firstCTALink}
            className="rounded-md bg-c-grey px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            {firstCTATitle}
          </a>
          <a href={secondCTALink} className="text-base font-semibold leading-7 text-c-grey flex items-center hover:opacity-75">
            {secondCTATitle}
            <BiChevronRight size={30} />
          </a>
        </div>
      </div>
    </div>
  )
}
