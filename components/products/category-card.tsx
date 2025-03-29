"use client";

import { SelectCategory, SelectProduct } from "@/app/database/schema";

interface CategoryCardProps {
  category: SelectCategory & { products: SelectProduct[] };
  onClick?: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <div
      className="rounded-lg border border-neutral-800 bg-black p-6 hover:border-neutral-700 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-neutral-400 mb-4">
        {category.products.length} products
      </p>

      <div className="grid grid-cols-2 gap-4"></div>
    </div>
  );
};
