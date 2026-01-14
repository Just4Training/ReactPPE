'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    id: 1,
    image: 'https://imgur.com/9WoACGw',
    caption: 'Algorithm & Problem Solving'
  },
  {
    id: 2,
    image: 'https://imgur.com/Aosqj3q',
    caption: 'System Design'
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/1016/1200/500',
    caption: 'Third slide caption'
  }
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      <div className="aspect-[16/6] bg-gray-100 relative">
        <AnimatePresence>
          <motion.img
            key={slides[current].id}
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="absolute w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
          <h2 className="text-xl font-semibold">{slides[current].caption}</h2>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-2 w-2 rounded-full ${
              i === current ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  )
}
