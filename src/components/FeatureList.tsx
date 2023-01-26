import { CheckIcon } from '@heroicons/react/24/outline'

interface Feature {
  name: string
  description?: string
}

interface FeatureListProps {
  title: string
  subtitle?: string
  copy: string
  features: Feature[]
}

export default function FeatureList({ title, subtitle, copy, features }: FeatureListProps) {
  return (
    <div className="container">
      <div className="mx-auto py-18 px-6 sm:py-24 lg:grid lg:grid-cols-3 lg:gap-x-12 lg:px-8 lg:py-30">
        <div>
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-c-yellow">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">{subtitle}</p>
          )}

          <p className="mt-6 text-base leading-7 text-c-grey">
            {copy}
          </p>
        </div>
        <div className="mt-20 lg:col-span-2 lg:mt-0">
          <dl className="grid grid-cols-1 gap-4 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <CheckIcon className="absolute mt-1 h-6 w-6 text-c-yellow" aria-hidden="true" />
                  <p className="ml-10 text-lg font-semibold leading-8 text-black">{feature.name}</p>
                </dt>
                {feature.description && (
                  <dd className="mt-2 ml-10 text-base leading-7 text-c-grey">{feature.description}</dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
