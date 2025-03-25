"use client";

import { SelectCategory } from "@/app/database/schema";

interface CategoryCardProps {
  category: SelectCategory;
  onClick?: () => void;
}

export const CategoryCard = ({ category, onClick }: CategoryCardProps) => {
  return (
    <div
      className="rounded-lg border border-neutral-800 bg-black p-6 hover:border-neutral-700 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      {/* <p className="text-neutral-400 mb-4">{category.productCount} products</p> */}
      <p className="text-neutral-400 mb-4">{0} products</p>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-neutral-400">Total Sales:</p>
          {/* <p className="text-lg font-medium">{category.totalSales}</p> */}
          <p className="text-lg font-medium">{0}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Average Price:</p>
          {/* <p className="text-lg font-medium"> */}
          {/*   ${category.averagePrice.toFixed(2)} */}
          {/* </p> */}
          <p className="text-lg font-medium">${0}</p>
        </div>
      </div>
    </div>
  );
};
