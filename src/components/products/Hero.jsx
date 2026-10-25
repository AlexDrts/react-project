import { Link } from "react-router-dom";

/** The sun from the avatar, setting behind a neon horizon. The one loud element on the site. */
export default function Hero() {
  return (
    <div className="hero mb-10 px-6 py-14 sm:px-12 sm:py-20">
      <div className="hero-sun" aria-hidden="true" />
      <div className="hero-horizon" aria-hidden="true" />

      <div className="max-w-md">
        <h1 className="text-4xl font-extrabold leading-[1.05] text-balance sm:text-6xl">
          Wear the last light of the day.
        </h1>
        <p className="hero-copy mt-5 max-w-sm text-base">
          Hoodies, denim and sneakers in dusk colours. Free shipping on orders over $100.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/category/hoodies" className="btn btn-hero">
            Shop hoodies
          </Link>
          <a href="#catalog" className="btn btn-hero-ghost">
            Browse everything
          </a>
        </div>
      </div>
    </div>
  );
}
