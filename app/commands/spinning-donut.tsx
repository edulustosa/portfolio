import Donut from 'react-spinning-donut'

export default function SpinningDonut() {
  return (
    <div className="flex w-full items-center justify-center">
      <Donut color="#E1E1DF" fontSize={6} scaleX={1} scaleY={0.75} />
    </div>
  )
}
