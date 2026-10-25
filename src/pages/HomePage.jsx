import { useEffect } from "react";
import { useCurrentCategory } from "../context/CategoryContext";
import Hero from "../components/products/Hero";
import ShopSection from "../components/products/ShopSection";

export default function HomePage() {
  const { setCurrentCategory } = useCurrentCategory();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  return (
    <>
      <Hero />
      <ShopSection />
    </>
  );
}
