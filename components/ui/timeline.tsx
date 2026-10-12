"use client"

import { useScroll, useTransform, motion } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"
import { SeriesCarousel, type SeriesImage } from "@/components/ui/series-carousel"

interface TimelineEntry {
  id: number
  image: string
  alt: string
  title: string
  description: string
  layout: "left" | "right"
  images?: SeriesImage[]
}

interface TimelineProps {
  entries: TimelineEntry[]
  className?: string
}

export function Timeline({ entries, className }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {entries.map((entry, index) => (
        <TimelineItem key={entry.id} entry={entry} index={index} scrollProgress={scrollYProgress} />
      ))}
    </div>
  )
}

interface TimelineItemProps {
  entry: TimelineEntry
  index: number
  scrollProgress: any
}

function TimelineItem({ entry, index, scrollProgress }: TimelineItemProps) {
  const itemRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start center", "end center"],
  })

  const opacity = useTransform(itemProgress, [0, 0.25, 0.75, 1], [0.25, 1, 1, 0.35])

  return (
    <motion.div ref={itemRef} style={{ opacity }} className="relative mb-24 md:mb-36">
      <div className="container mx-auto px-6">
        {/* Series header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-14"
        >
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-gray-900 mb-5">
            {entry.title}
          </h3>
          <p className="text-lg md:text-xl leading-relaxed text-gray-600">{entry.description}</p>
        </motion.div>

        {/* Full-width giant stage: image + side caption */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          {entry.images && entry.images.length > 0 ? (
            <SeriesCarousel images={entry.images} label={entry.title} variant="split" />
          ) : null}
        </motion.div>
      </div>
    </motion.div>
  )
}
