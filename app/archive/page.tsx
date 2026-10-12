import fs from "fs"
import path from "path"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Full Archive — Abdelrahman Elsayed",
  description: "All 57 artworks: sports posters, ad campaigns and technical overlay studies.",
}

const TITLES: Record<string, { title: string; tag: string }> = {
  "work-27": { title: "EIGHT GODS — Tennis", tag: "SPORTS" },
  "work-18": { title: "ADIZERO — Running", tag: "SPORTS" },
  "work-03": { title: "VELOCITY — GT3", tag: "SPORTS" },
  "work-47": { title: "THE ROAD — Cycling", tag: "SPORTS" },
  "work-39": { title: "0.8S UNFAIR — F1", tag: "SPORTS" },
  "work-41": { title: "PUMA Series", tag: "SPORTS" },
  "work-02": { title: "YOUR OWN CLIMATE — AXIS", tag: "ADS" },
  "work-04": { title: "TWO HEARTS — TRANE", tag: "ADS" },
  "work-46": { title: "ONE VEIN — TRANE", tag: "ADS" },
}

export default function ArchivePage() {
  const dir = path.join(process.cwd(), "public", "work", "webp")
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith(".webp"))
    .sort()

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16">
        <Link href="/" className="text-sm font-bold tracking-widest text-gray-500 hover:text-gray-900">
          ← BACK HOME
        </Link>
        <h1 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mt-6 mb-4">
          FULL ARCHIVE
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          {files.length} pieces — sports posters, ad campaigns and studies. Click any work to view it full-size.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {files.map((f) => {
            const key = f.replace(".webp", "")
            const meta = TITLES[key] ?? { title: key.replace(/-/g, " ").toUpperCase(), tag: "STUDY" }
            return (
              <a
                key={f}
                href={`/work/webp/${f}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-gray-100"
              >
                <Image
                  src={`/work/webp/${f}`}
                  alt={meta.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="inline-block text-[10px] font-bold tracking-widest bg-white text-black px-2 py-1 rounded mb-1">
                    {meta.tag}
                  </span>
                  <h3 className="text-white text-sm font-black tracking-wide">{meta.title}</h3>
                </div>
              </a>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <a
            href="https://wa.me/201016380970"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-black text-lg tracking-wide px-10 py-4 rounded-md transition-colors"
          >
            LIKE A STYLE? CHAT ON WHATSAPP
          </a>
        </div>
      </div>
    </div>
  )
}
