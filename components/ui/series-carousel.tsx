"use client"

import { useCallback, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SeriesImage {
  src: string
  alt: string
  caption: string
}

interface SeriesCarouselProps {
  images: SeriesImage[]
  label: string
  variant?: "stacked" | "split"
}

/** Split the alt text "HEADLINE — note" into a big display headline. */
function splitHeadline(alt: string): string {
  const parts = alt.split(" — ")
  return parts[0] ?? alt
}

const arrowBtn =
  "rounded-full bg-white/15 backdrop-blur border border-white/30 text-white hover:bg-white hover:text-black transition-colors"

export function SeriesCarousel({ images, label, variant = "stacked" }: SeriesCarouselProps) {
  const [index, setIndex] = useState(0)
  const total = images.length
  const current = images[index]

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])

  if (variant === "split") {
    return (
      <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-center">
        {/* Giant image stage */}
        <div className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-black h-[58vh] md:h-[68vh] lg:h-[80vh] shadow-2xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain"
                priority={index === 0}
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label={`Previous image in ${label}`}
            className={cn(arrowBtn, "absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3")}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={next}
            aria-label={`Next image in ${label}`}
            className={cn(arrowBtn, "absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3")}
          >
            <ChevronRight size={28} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur text-white text-sm font-bold tracking-[0.25em] px-4 py-1.5 rounded-full">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>

        {/* Giant side caption — flips together with the image */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current.src + "-panel"}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs md:text-sm font-bold tracking-[0.3em] text-gray-500 mb-4">
                {label.toUpperCase()} · {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-black tracking-tight leading-[1.05] text-gray-900 mb-6">
                {splitHeadline(current.alt)}
              </h3>
              <p className="text-lg md:text-xl leading-relaxed text-gray-600 mb-8">{current.caption}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label={`Previous image in ${label}`}
              className="rounded-full p-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={next}
              aria-label={`Next image in ${label}`}
              className="rounded-full p-3 bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
              <ChevronRight size={22} />
            </button>
            <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden ml-2">
              <div
                className="h-full bg-gray-900 rounded-full transition-all duration-300"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Stacked variant (compact): image on top, caption below.
  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-black">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.src}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -48 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority={index === 0}
            />
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label={`Previous image in ${label}`}
          className={cn(arrowBtn, "absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2")}
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label={`Next image in ${label}`}
          className={cn(arrowBtn, "absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2")}
        >
          <ChevronRight size={22} />
        </button>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white text-xs font-bold tracking-[0.2em] px-3 py-1 rounded-full">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-4 min-h-[76px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={current.src + "-caption"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm md:text-base text-gray-600 leading-relaxed"
          >
            {current.caption}
          </motion.p>
        </AnimatePresence>
      </div>

      {total <= 8 ? (
        <div className="mt-2 flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setIndex(i)}
              aria-label={`Go to image ${i + 1} in ${label}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gray-900" : "w-3 bg-gray-300 hover:bg-gray-500",
              )}
            />
          ))}
        </div>
      ) : (
        <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gray-900 rounded-full transition-all duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      )}
    </div>
  )
}
