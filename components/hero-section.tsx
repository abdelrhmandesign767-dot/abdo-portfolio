"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, ChevronLeft, ChevronRight, X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

const AUTOPLAY_MS = 3000

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Three hero posters — full frame, zero cropping (object-contain).
  const slides = [
    {
      image: "/hero/hero-01.webp",
      alt: "SHANGHAI DETONATES — Rolex Shanghai Masters tennis poster",
    },
    {
      image: "/hero/hero-02.webp",
      alt: "UNIVERSE FOLLOWS PIXEL — OLED TV poster",
    },
    {
      image: "/hero/hero-03.webp",
      alt: "GRAVITY, TAILORED — luxury bag campaign poster",
    },
  ]

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Works", href: "#works" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ]

  // Navigation handlers
  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % slides.length), [slides.length])
  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length],
  )

  // Automatic flipping — timer restarts after every manual change, pauses on hover.
  useEffect(() => {
    if (isPaused || isMenuOpen) return
    const id = setTimeout(nextSlide, AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [currentSlide, isPaused, isMenuOpen, nextSlide])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Full-frame posters — contain, never cropped.
          Sides are filled with a blurred, color-rich echo of the same artwork
          so there is no black anywhere. */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.image}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: currentSlide === index ? 1 : 0 }}
          transition={{ opacity: { duration: 0.9, ease: "easeInOut" } }}
          aria-hidden={currentSlide !== index}
        >
          {/* Ambient blurred fill — same artwork, stretched to the edges */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover scale-125 blur-3xl brightness-[0.5] saturate-150"
              priority={index === 0}
            />
          </div>
          {/* Sharp artwork on top, fully visible, slow cinematic zoom */}
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: currentSlide === index ? 1.05 : 1 }}
            transition={{ scale: { duration: AUTOPLAY_MS / 1000, ease: "linear" } }}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
              priority={index === 0}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Slim legibility gradients only — the artwork stays untouched */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent z-10" />

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6 md:p-8">
        {/* Logo/Brand */}
        <div className="text-white font-bold text-xl tracking-wider">ABDO<span className="text-gray-400">.</span></div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="relative text-white hover:text-gray-300 transition-colors duration-300 font-medium tracking-wide pb-1 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-gray-300 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          <span className="sr-only">Toggle menu</span>
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full bg-black/90 z-30 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-white text-2xl font-bold tracking-wider hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slider Navigation (manual — autoplay keeps running alongside) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slide Indicators */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Side Navigation Indicators */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1 h-8 transition-all duration-300 ${
                currentSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
