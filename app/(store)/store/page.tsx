"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BusinessCard } from "@/components/store/business-card";
import { useGetStoreProduct } from "@/app/hooks/api";

// Business category type
type BusinessCategory =
  | "All"
  | "Food & Drink"
  | "Retail"
  | "Services"
  | "Entertainment";

export default function StorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BusinessCategory>("All");
  const businesses = useGetStoreProduct();
  console.log(businesses?.data, "PDATA");

  const filteredBusinesses = businesses.data?.filter((business) => {
    const matchesSearch =
      business.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.businessDescription
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "All" || business.businessCategory === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories: BusinessCategory[] = [
    "All",
    "Food & Drink",
    "Retail",
    "Services",
    "Entertainment",
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Local Businesses</h1>
          <p className="text-lg text-neutral-300">
            Discover Businesses near you that accept PYUSD payments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search businesses by name or category"
            className="pl-10 py-6 bg-neutral-900 border-neutral-800 rounded-md text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline"
              className={`rounded-full px-4 py-2 border ${
                activeCategory === category
                  ? "bg-emerald-900 border-emerald-700 text-emerald-400"
                  : "bg-transparent border-neutral-800 text-white hover:bg-neutral-800"
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
          <Button
            variant="outline"
            className="rounded-full px-3 py-2 border border-neutral-800 text-white hover:bg-neutral-800"
          >
            <SlidersHorizontal size={18} />
          </Button>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses?.map((business) => (
            <BusinessCard key={business.merchantAddress} business={business} />
          ))}
        </div>
      </div>
    </div>
  );
}
