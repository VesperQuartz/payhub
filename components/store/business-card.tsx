import { MapPin, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SelectBusinessProfile } from "@/app/database/schema";
import Image from "next/image";

interface BusinessCardProps {
  business: SelectBusinessProfile;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <div className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/30 hover:border-neutral-700 transition-colors">
      <div className="h-48 relative overflow-hidden">
        <Image
          width={500}
          height={500}
          src={business.image || "/placeholder.svg"}
          alt={business.businessName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-emerald-400">
            {business.businessName}
          </h3>
          <span className="text-xs px-3 py-1 bg-neutral-900 rounded-full text-white">
            {business.businessCategory}
          </span>
        </div>
        <p className="text-neutral-300 mb-3">{business.businessDescription}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-neutral-400">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{"NA"}</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-emerald-400 mr-1" />
            <span className="text-emerald-400">{business.ratings}</span>
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/store/${business.merchantAddress}`}
            passHref
            legacyBehavior
          >
            <Button
              variant="outline"
              className="w-full border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white"
              asChild
            >
              <a className="flex items-center justify-center">
                View Business
                <ChevronRight size={16} className="ml-1" />
              </a>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
