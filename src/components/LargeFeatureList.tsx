import { ReactNode } from 'react'



interface Feature {
  name: string
  description?: string
  icon: ReactNode
}

interface FeatureListProps {
  title: string
  subtitle: string
  features: Feature[]
}

export default function LargeFeatureList({ title, subtitle, features }: FeatureListProps) {
  return (
    <div className="bg-c-yellow">
      <div className="container">
        <div className="mx-auto max-w-4xl px-6 py-24 sm:py-32 lg:max-w-7xl lg:px-8 lg:py-40">
          <h2 className="text-4xl font-bold tracking-tight text-white">{title}.</h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white">
            {subtitle}
          </p>
          <div className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name}>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white bg-opacity-50">
                    {feature.icon}
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-semibold leading-8 text-white">{feature.name}</h3>
                  <p className="mt-2 text-base leading-7 text-white">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
