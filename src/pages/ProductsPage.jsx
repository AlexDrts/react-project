import { useEffect } from "react";
import { useCurrentCategory } from "../context/CategoryContext";
import ShopSection from "../components/products/ShopSection";

export default function ProductsPage() {
  const { setCurrentCategory } = useCurrentCategory();

  useEffect(() => {
    setCurrentCategory(null);
  }, [setCurrentCategory]);

  return <ShopSection />;
}
