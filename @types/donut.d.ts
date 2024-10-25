declare module 'react-spinning-donut' {
  interface DonutProps {
    scaleX?: number
    scaleY?: number
    color?: string
    fontSize?: number
    interval?: number
  }

  const Donut: React.FC<DonutProps>
  export default Donut
}
