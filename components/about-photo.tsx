"use client"

import { useState } from "react"
import Image from "next/image"

/**
 * Portrait with graceful fallback.
 * Drop your photo at /public/abdo-photo.webp and it appears automatically —
 * until then the placeholder shows so the page never breaks.
 */
export function AboutPhoto() {
  const [failed, setFailed] = useState(false)
  return (
    <Image
      src={failed ? "/placeholder-user.jpg" : "/abdo-photo.webp"}
      alt="Abdelrahman Elsayed — Graphic Designer"
      fill
      sizes="(max-width: 1024px) 90vw, 400px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  )
}
