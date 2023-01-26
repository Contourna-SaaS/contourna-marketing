interface SimpleHeaderProps {
  title: string
  copy: string
}
export default function SimpleHeader({ title, copy }: SimpleHeaderProps) {
  return (
    <div className="container">
      <div className="mx-auto py-16 sm:py-24 lg:flex lg:justify-between">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">{title}</h2>
          <p className="mt-5 text-xl text-c-grey leading-8">
            {copy}
          </p>
        </div>
      </div>
    </div>
  )
}
