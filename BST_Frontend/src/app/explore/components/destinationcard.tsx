"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

interface DestinationProps {
  title: string;
  location: string;
  description: string;
  image?: string;
  rating?: number;
  reviews?: number;
  onExplore: () => void;
}

export function DestinationCard({
  title,
  location,
  description,
  image,
  rating = 4.5,
  reviews = 0,
  onExplore,
}: DestinationProps) {
  const imageSrc =
    image ||
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center gap-1 text-sm font-semibold text-slate-500">
          <MapPin className="h-4 w-4 text-indigo-500" />
          <span>{location}</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex items-center gap-1 font-medium text-slate-900">
            <Star className="h-4 w-4 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            {reviews > 0 && <span className="text-slate-500">({reviews})</span>}
          </div>
          <button
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            onClick={onExplore}
          >
            <span>Explore</span>
            <span
              className="text-lg transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
