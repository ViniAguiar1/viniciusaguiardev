"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GalleryImage {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [active, setActive] = useState(0)

  if (!images.length) return null

  return (
    <div className="flex gap-3">
      {/* Thumbnails */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "w-16 h-16 rounded-lg border overflow-hidden transition-all flex-shrink-0",
              i === active
                ? "border-primary ring-2 ring-primary/20"
                : "border-border opacity-60 hover:opacity-100"
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 rounded-lg border border-border overflow-hidden">
        <Image
          src={images[active].src}
          alt={images[active].alt}
          width={1280}
          height={760}
          className="w-full h-auto transition-opacity duration-300"
        />
      </div>
    </div>
  )
}
