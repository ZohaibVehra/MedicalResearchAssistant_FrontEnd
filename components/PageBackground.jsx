// PageBackground.jsx
import bg from '../src/assets/2.jpg'

const PageBackground = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full min-h-screen -z-10 bg-neutral-950 pointer-events-none"
      aria-hidden
    >
      <div
        className="w-full min-h-screen bg-center bg-cover"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <div className="absolute inset-0 bg-neutral-950/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  )
}

export default PageBackground
