import useEmblaCarousel from "embla-carousel-react";

import { useCallback, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import BookCard from './BookCard'

const FeaturedBooksCarousel = ({ books = [] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (emblaApi) {
      onSelect(emblaApi)
      emblaApi.on('reInit', onSelect)
      emblaApi.on('select', onSelect)
    }
  }, [emblaApi, onSelect])

  if (books.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {books.map((book) => (
            <div key={book.key} className="flex-[0_0_300px] min-w-0 pl-4">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2"
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        aria-label="Previous books"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        aria-label="Next books"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default FeaturedBooksCarousel
