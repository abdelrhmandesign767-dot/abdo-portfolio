"use client"

import Image from "next/image"
import { useState } from "react"
import { MessageCircle, Linkedin } from "lucide-react"
import HeroSection from "@/components/hero-section"
import { AboutPhoto } from "@/components/about-photo"
import { Timeline } from "@/components/ui/timeline"
import { SeriesCarousel } from "@/components/ui/series-carousel"
import "./globals.css"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"

export const WHATSAPP_LINK = "https://wa.me/201016380970"

export default function Page() {
  const scrollToId = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" })
  }

  // Four complete series, in order. Use the arrows to flip through every piece inside its own series.
  const timelineEntries = [
    {
      id: 1,
      image: "/series/1-trane/04.webp",
      alt: "TRANE XV20i series — TWO HEARTS. ONE BREATH.",
      title: "01 — TRANE: Cold as Infrastructure",
      description:
        "Seven posters for the TRANE XV20i system. Duct networks, silence ratings and copper veins treated with the same gravity as the machine itself — one palette, short declarative headlines, data as proof.",
      layout: "left" as const,
      images: [
        {
          src: "/series/1-trane/01.webp",
          alt: "THE NETWORK THAT CARRIES WINTER — house duct cutaway",
          caption: "System overview — the house as a cutaway diagram. Ductwork drawn as glowing infrastructure, supply and return listed like a spec sheet.",
        },
        {
          src: "/series/1-trane/02.webp",
          alt: "THE HOUSE THAT BREATHES COLD — living room airflow",
          caption: "Eight diffusers, one breath. Cold airflow rendered as ribbons against a single warm return plume — comfort made visible.",
        },
        {
          src: "/series/1-trane/03.webp",
          alt: "SILENCE WOVEN — outdoor unit at night",
          caption: "Silence as a feature. 57 dB(A) with a frequency chart and a ripple ring — noise engineering presented as product design.",
        },
        {
          src: "/series/1-trane/04.webp",
          alt: "TWO HEARTS. ONE BREATH. — macro coil study",
          caption: "Macro study of the Spine Fin coil. Copper, condensation and a two-color vein diagram carry the headline's metaphor.",
        },
        {
          src: "/series/1-trane/05.webp",
          alt: "ONE VEIN. TWO WINTERS. — copper lines close-up",
          caption: "Two pipes, 2 cm apart. Liquid 110°F against suction 45°F — the whole campaign's contrast logic in a single frame.",
        },
        {
          src: "/series/1-trane/06.webp",
          alt: "ONE NUMBER. EIGHT ANGLES. — thermostat and dampers",
          caption: "Control story. Thermostat, damper angles and a five-step signal chain — evenness argued with numbers, not adjectives.",
        },
        {
          src: "/series/1-trane/07.webp",
          alt: "BLUE HELD. AMBER PRESSED. — house split warm and cold",
          caption: "Inside/outside split. 72°F held against a 95°F storm — the envelope as the hero, in blue versus amber.",
        },
      ],
    },
    {
      id: 2,
      image: "/series/2-lives/01.webp",
      alt: "LEVI'S 501 heritage western poster",
      title: "02 — LEVI'S 501: One Jean, Five Registers",
      description:
        "Heritage western, gallery edition, artist collaboration, sustainability report, street collage. The same 501 spoken in five different languages — range without losing the red tab.",
      layout: "right" as const,
      images: [
        {
          src: "/series/2-lives/01.webp",
          alt: "LEVI'S 501 heritage western poster",
          caption: "Heritage register. Sepia western staging, back-pocket framing and the 1873 date — origin as the concept.",
        },
        {
          src: "/series/2-lives/02.webp",
          alt: "LEVI'S 501 framed artist edition",
          caption: "Gallery register. The 501 as a framed 001/500 art edition — product photography treated as curation.",
        },
        {
          src: "/series/2-lives/03.webp",
          alt: "LEVI'S x Basquiat collaboration piece",
          caption: "Collaboration register. Crown motifs on denim inside a museum frame with a numbered brass plaque.",
        },
        {
          src: "/series/2-lives/04.webp",
          alt: "THE 501 IS RESPONSIBLE sustainability poster",
          caption: "Report register. Sustainability data — 96% less water, 20%+ recycled — laid out as an infographic poster with a QR tag.",
        },
        {
          src: "/series/2-lives/05.webp",
          alt: "BUILT TO BREAK THE RULES street collage",
          caption: "Street register. Torn-paper collage, graffiti numerals, boombox and flag — the same jeans in a louder voice.",
        },
      ],
    },
    {
      id: 3,
      image: "/series/3-sport/01.webp",
      alt: "VELOCITY HAS A VECTOR — GT3 telemetry poster",
      title: "03 — SPORT: Engineered Adrenaline",
      description:
        "Sixteen posters across motorsport, running, cycling, swimming and football. One system throughout: condensed type, live telemetry, cinematic freeze-frames.",
      layout: "left" as const,
      images: [
        {
          src: "/series/3-sport/01.webp",
          alt: "VELOCITY HAS A VECTOR — GT3 telemetry poster",
          caption: "GT3 telemetry poster. Catalunya map, apex speeds and a lime optimal line — the car's data becomes the layout.",
        },
        {
          src: "/series/3-sport/02.webp",
          alt: "19 FLAGS. ONE WINNER. — street circuit poster",
          caption: "Street-circuit drama. A cracked-asphalt timeline with flag markers 01–19; the headline counts down to one winner.",
        },
        {
          src: "/series/3-sport/03.webp",
          alt: "ADIZERO FORCE CREATES FUTURE — runner breaking concrete",
          caption: "Concrete-breaking stride. Physics equations in the margin, debris at the foot — force drawn literally.",
        },
        {
          src: "/series/3-sport/04.webp",
          alt: "ENERGY IS YOURS — runner on a curved wall",
          caption: "Volt-accent runner on a curved wall. Minimal copy, maximal motion; the neon stripe does the talking.",
        },
        {
          src: "/series/3-sport/05.webp",
          alt: "THE HOOVES BREAK THE FRAME — desert horse racing",
          caption: "Dirt-track macro. Horse at full stretch with race data in gold — mud and telemetry in one frame.",
        },
        {
          src: "/series/3-sport/06.webp",
          alt: "Triple-exposure sprinter study",
          caption: "Typeless study. Triple-exposure sprint on concrete fins — composition and light carry it without a headline.",
        },
        {
          src: "/series/3-sport/07.webp",
          alt: "0.8S UNFAIR — race timing poster",
          caption: "Broadcast-graphics poster. Timing deltas set like a race-control screen in red, yellow and white.",
        },
        {
          src: "/series/3-sport/08.webp",
          alt: "MADRING 04/4 — night circuit poster",
          caption: "Night-track establishing shot. LED-dot typography inside a circuit-outline frame — place as the subject.",
        },
        {
          src: "/series/3-sport/09.webp",
          alt: "EL CLASICO — split stadium fixture poster",
          caption: "Fixture template. Split-stadium diptych with placeholder date fields — designed as a reusable match system.",
        },
        {
          src: "/series/3-sport/10.webp",
          alt: "THE ROAD REMEMBERS EVERY RIDER — cycling route poster",
          caption: "Route-as-design. Stage profile, contour lines and kilometer markers woven into a landscape poster.",
        },
        {
          src: "/series/3-sport/11.webp",
          alt: "THE RACE BREAKS THE FRAME — gravel cycling",
          caption: "Gravel chaos. Mud, elbows and a dashed route line — the headline breaks with the frame.",
        },
        {
          src: "/series/3-sport/12.webp",
          alt: "LEAN BREAKS THE FRAME — night MotoGP poster",
          caption: "Night lean angle. 349 km/h and 62° of lean beside sparks and floodlights — data at the edge of grip.",
        },
        {
          src: "/series/3-sport/13.webp",
          alt: "TOUCH FIRST. WIN. — underwater swim finish",
          caption: "Underwater finish. Split 21.40 and lane order traced over the touch — victory measured in hundredths.",
        },
        {
          src: "/series/3-sport/14.webp",
          alt: "WATER BREAKS THE FRAME — freestyle swim poster",
          caption: "Surface explosion. 47.82 split with touch-pad callouts — water rendered as the main character.",
        },
        {
          src: "/series/3-sport/15.webp",
          alt: "Ultra Boost sole macro study",
          caption: "Product macro. Boost foam glowing at impact, sole up front — material science as drama.",
        },
        {
          src: "/series/3-sport/16.webp",
          alt: "PRESSURE HAS A SHAPE — night GT3 poster",
          caption: "Aero visualization. Flow lines bend the headline itself; 800 kg of downforce drawn as light.",
        },
      ],
    },
    {
      id: 4,
      image: "/series/4-yeti/01.webp",
      alt: "YETI Tundra intelligence poster",
      title: "04 — YETI: Cold Intelligence",
      description:
        "Five studies of the cooler as an instrument — frost HUDs, temperature logs, grip data. Rugged product shot with a laboratory eye.",
      layout: "right" as const,
      images: [
        {
          src: "/series/4-yeti/01.webp",
          alt: "INTELLIGENCE THAT OUTLASTS THE HUNT — frost HUD cooler",
          caption: "Frost HUD. Melt-rate graph and 34.1°F readout projected on ice — the cooler as a field instrument.",
        },
        {
          src: "/series/4-yeti/02.webp",
          alt: "SMOKE READS. COOLER DECIDES. — brisket temperature log",
          caption: "Brisket log. Stall predicted at 45 min over a 20-hour curve — patience quantified beside the pit.",
        },
        {
          src: "/series/4-yeti/03.webp",
          alt: "CITY HEAT. COOLER INTELLIGENCE. — subway cooler lid",
          caption: "City register. Condensation mapped like a subway grid with live transit data — rugged gear in an urban test.",
        },
        {
          src: "/series/4-yeti/04.webp",
          alt: "THE SEA DOESN'T CARE. THE COOLER DOES. — offshore cooler",
          caption: "Open-water test. Gulf coordinates etched on the lid — the sea as the laboratory, the cooler as the answer.",
        },
        {
          src: "/series/4-yeti/05.webp",
          alt: "COLD THAT KEEPS ITS WORD. — grip data study",
          caption: "Grip data. Sweat droplets rendered as falling binary — labor translated into a cooling readout.",
        },
      ],
    },
  ]

  const [activeStory, setActiveStory] = useState(0)

  // App schematics — complete system boards with app UI, 5 pieces in order.
  const appsSeries = [
    {
      src: "/series/6-apps/01.webp",
      alt: "SGS SMART GARAGE — full system board with app UI",
      caption:
        "Garage as an operating system. Layout zones, heat map, phone UI and specs on one board — a product manual designed as a poster.",
    },
    {
      src: "/series/6-apps/02.webp",
      alt: "EMERGENCY KIT PRO — compartments and dashboard board",
      caption:
        "Preparedness as interface. Eight compartments, expiry alerts and a phone dashboard — readiness drawn as a system.",
    },
    {
      src: "/series/6-apps/03.webp",
      alt: "UBS BIKE STATION — city flow schematic",
      caption:
        "City flow diagram. Docks, rider app and rebalance engine — urban mobility mapped end to end.",
    },
    {
      src: "/series/6-apps/04.webp",
      alt: "SGS GARAGE PLANNER — rotation and distribution board",
      caption:
        "Same logic, second board. Rotation planner, weight distribution and voice commands — the system from another angle.",
    },
    {
      src: "/series/6-apps/05.webp",
      alt: "SIS IRRIGATION — moisture map and kit lineup",
      caption:
        "Water with a dashboard. Live moisture map, kit lineup and a feedback loop — irrigation argued in numbers.",
    },
  ]

  // Product stories — 4 pieces in order.
  const productsSeries = [
    {
      src: "/series/7-products/01.webp",
      alt: "YOUR OWN CLIMATE — lifestyle deodorant poster",
      caption:
        "Lifestyle register. Dust, sunlight and crowd blur against one sharp figure — a deodorant sold as personal atmosphere.",
    },
    {
      src: "/series/7-products/02.webp",
      alt: "ONE LOCK HOLDS LIGHT — macro serum study",
      caption:
        "Macro register. A single lock of hair, sealed-cuticle data and before/after microscopy — repair made visible.",
    },
    {
      src: "/series/7-products/03.webp",
      alt: "CONTROL THE CHAOS — vacuum system poster",
      caption:
        "Chaos-to-order diagram. Debris storm on one side, precision lines on the other — suction drawn as control.",
    },
    {
      src: "/series/7-products/04.webp",
      alt: "GRAVITY, TAILORED — luxury bag campaign",
      caption:
        "Place as luxury. Venetian steps, pigeons and a monogram strap drawn as a design line — gravity tailored in leather and gold.",
    },
  ]

  // VITRA Panton Chair — visual identity & product story, 8 pieces in order.
  const chairSeries = [
    {
      src: "/series/5-chair/01.webp",
      alt: "THE ROOM BENDS FOR IT — serif headline over bent concrete",
      caption:
        "Negative space as the headline's partner. Serif type floats over bent concrete while the chair sits small — scale used as confidence.",
    },
    {
      src: "/series/5-chair/02.webp",
      alt: "ONE CURVE. INFINITE SPACE — architecture echoing the chair",
      caption:
        "The architecture completes the product. A single curve in the wall echoes the chair's silhouette; shadow draws the second half.",
    },
    {
      src: "/series/5-chair/03.webp",
      alt: "DARK STUDY — headline-free chiaroscuro product shot",
      caption:
        "No typography at all. One spotlight, one ripple in the floor — a product shot reduced to light, surface and curve.",
    },
    {
      src: "/series/5-chair/04.webp",
      alt: "TIME CHANGES THE ROOM. NOT THE OBJECT — aged palazzo study",
      caption:
        "Aged palazzo against a timeless object. Peeling walls and one red patch date the room; the chair refuses a date.",
    },
    {
      src: "/series/5-chair/05.webp",
      alt: "STRENGTH WITHOUT SHOWING FORCE — brutalist concrete detail",
      caption:
        "Brutalist detail as brand language. Raw concrete and a single red rule — strength stated quietly, in small caps.",
    },
    {
      src: "/series/5-chair/06.webp",
      alt: "THE WORLD HOLDS ITS POSITION AROUND ONE OBJECT — rotunda study",
      caption:
        "Monumental symmetry. Oculus light pins a tiny chair at the center of a rotunda — the object as the axis of the world.",
    },
    {
      src: "/series/5-chair/07.webp",
      alt: "BEFORE SOMEONE SITS, THE SPACE ALREADY KNOWS — sunbeam study",
      caption:
        "Sunlight as art direction. A beam draws a circle exactly where the chair waits — the space anticipating its subject.",
    },
    {
      src: "/series/5-chair/08.webp",
      alt: "SOME OBJECTS ARE MADE. FEW BECOME MEMORY — archive plinth study",
      caption:
        "Archive register. Blueprint sketches behind a plinth-mounted piece, signed 1960 — design history presented as evidence.",
    },
  ]

  const storyTabs = [
    {
      key: "chair",
      tab: "THE CHAIR",
      label: "VITRA PANTON CHAIR",
      cover: "/series/5-chair/01.webp",
      images: chairSeries,
    },
    {
      key: "apps",
      tab: "APP SCHEMATICS",
      label: "COMPLETE SYSTEM BOARDS",
      cover: "/series/6-apps/01.webp",
      images: appsSeries,
    },
    {
      key: "products",
      tab: "PRODUCTS",
      label: "PRODUCT STORIES",
      cover: "/series/7-products/01.webp",
      images: productsSeries,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* About — editorial: sticky portrait left, story right */}
      <section id="about" className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Portrait — large editorial card, warm backdrop for cutout photos */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="relative rounded-[24px] overflow-hidden bg-[#F3EFE8] border border-gray-200 shadow-xl aspect-[3/4] w-full max-w-sm mx-auto">
                <AboutPhoto />
                <div className="absolute bottom-4 left-4 bg-gray-900/90 backdrop-blur text-white text-xs font-bold tracking-[0.2em] px-4 py-2 rounded-full">
                  ABDELRAHMAN ELSAYED — CAIRO
                </div>
              </div>
            </motion.div>

            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="lg:col-span-3 text-center lg:text-left"
            >
              <p className="text-xs md:text-sm font-bold tracking-[0.35em] text-gray-500 mb-4">ABOUT</p>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-3">
                Abdelrahman
                <br />
                Elsayed
              </h2>
              <p className="text-lg md:text-xl font-medium text-gray-500 mb-8">
                Graphic Designer — Cairo, Egypt
              </p>

              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-800 mb-10">
                I am Abdelrahman Elsayed, a graphic designer building sports poster series,
                product ad campaigns, schematic boards for apps, and visual identities. I use condensed
                typography, cinematic photography, and technical overlays with schematics and measurement marks,
                delivered as print-ready files.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-center lg:text-left">
                <div className="border-t-2 border-gray-900 pt-3">
                  <p className="text-xs font-bold tracking-[0.25em] text-gray-500 mb-1">LOCATION</p>
                  <p className="font-bold text-gray-900">Cairo — worldwide</p>
                </div>
                <div className="border-t-2 border-gray-900 pt-3">
                  <p className="text-xs font-bold tracking-[0.25em] text-gray-500 mb-1">SERVICES</p>
                  <p className="font-bold text-gray-900">Posters · Campaigns · Identity</p>
                </div>
                <div className="border-t-2 border-gray-900 pt-3">
                  <p className="text-xs font-bold tracking-[0.25em] text-gray-500 mb-1">STATUS</p>
                  <p className="font-bold text-gray-900">Open for freelance</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToId("#works")}
                  className="px-8 py-4 rounded-full bg-gray-900 text-white font-bold tracking-wide hover:bg-gray-700 transition-colors"
                >
                  See Selected Work
                </button>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="w-14 h-14 rounded-full border-2 border-gray-900 text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdelrhman-mansoura-b935b53b5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="w-14 h-14 rounded-full border-2 border-gray-900 text-gray-900 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Timeline — same component/animation as community */}
      <section id="works" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">FOUR SERIES</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Complete series, not single posts. Use the arrows to flip through every piece inside its series.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* Visual Identity & Product Stories — VITRA Panton Chair, giant split stage */}
      <section id="stories" className="relative py-20 md:py-28 bg-white">
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              VISUAL IDENTITY
              <br />
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                & PRODUCT STORIES
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three collections — chair, app schematics, products. Pick one, then flip through every piece with the
              arrows.
            </p>
          </motion.div>

          {/* Collection switcher — swaps the whole stage below */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-14">
            {storyTabs.map((s, i) => {
              const isActive = i === activeStory
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveStory(i)}
                  aria-label={`Show ${s.tab} collection`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? "bg-gray-900 text-white border-gray-900 shadow-xl scale-105"
                      : "bg-white text-gray-900 border-gray-200 hover:border-gray-900"
                  }`}
                >
                  <span className="relative w-10 h-14 rounded-md overflow-hidden shrink-0 bg-gray-100">
                    <Image src={s.cover} alt={s.tab} fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm md:text-base font-black tracking-wider">{s.tab}</span>
                    <span className={`block text-xs font-bold tracking-widest ${isActive ? "text-gray-300" : "text-gray-500"}`}>
                      {s.images.length} PIECES
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={storyTabs[activeStory].key}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <SeriesCarousel
              images={storyTabs[activeStory].images}
              label={storyTabs[activeStory].label}
              variant="split"
            />
          </motion.div>
        </div>
      </section>

      {/* Process + Testimonials Section — same animation as testimonials */}
      <section id="process" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              RESEARCH FIRST.{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">THEN DESIGN.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Every poster starts with type contrast, photo selection, and measured information hierarchy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
              {[
                { n: "01", t: "Research & Data", d: "Collect real numbers — speed, PSI, trajectory, elevation. Data is the concept." },
                { n: "02", t: "Visual Contrast", d: "Giant condensed type vs cinematic photo. Dark vs light. Macro vs wide." },
                { n: "03", t: "Seduction Detail", d: "Fine annotations, grids and shock rings that reward the second look." },
              ].map((s) => (
                <div key={s.n} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-900 transition-colors">
                  <div className="text-4xl font-black text-gray-900 mb-2">{s.n}</div>
                  <div className="text-lg font-bold mb-2">{s.t}</div>
                  <div className="text-gray-600">{s.d}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* Contact CTA — same SmoothScrollHero animation */}
      <section id="contact" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="/work/webp/work-27.webp"
          mobileImage="/work/webp/work-27.webp"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>
    </div>
  )
}
