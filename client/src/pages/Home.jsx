import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api/axios'
import FeaturedBooksCarousel from '../components/FeaturedBooksCarousel'
import SearchBar from '../components/SearchBar'
import BookCard from '../components/BookCard'
import Pagination from '../components/Pagination'
import { Card, CardContent } from '../components/ui/card'
import { BookOpen, Search } from 'lucide-react'

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [books, setBooks] = useState([])
  const [featuredBooks, setFeaturedBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [currentFilters, setCurrentFilters] = useState({})

  // Load featured books on mount
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const response = await api.get('/books/search?title=fantasy&limit=10')
        setFeaturedBooks(response.data.books)
      } catch (error) {
        console.error('Error loading featured books:', error)
      }
    }
    loadFeaturedBooks()
  }, [])

  // Search books with advanced filters
  const searchBooks = async (filters, page = 1) => {
    const hasAnyFilter = Object.values(filters).some(value => value.trim() !== '')
    
    if (!hasAnyFilter) {
      setBooks([])
      setTotalPages(1)
      setTotal(0)
      setCurrentFilters({})
      return
    }

    setLoading(true)
    try {
      const queryParams = new URLSearchParams()
      
      if (filters.title) queryParams.append('title', filters.title)
      if (filters.author) queryParams.append('author', filters.author)
      if (filters.language) queryParams.append('language', filters.language)
      if (filters.year) queryParams.append('year', filters.year)
      
      queryParams.append('page', page)
      queryParams.append('limit', '20')

      const response = await api.get(`/books/search?${queryParams.toString()}`)
      setBooks(response.data.books)
      setTotalPages(response.data.totalPages)
      setTotal(response.data.total)
      setCurrentPage(page)
      setCurrentFilters(filters)
    } catch (error) {
      console.error('Error searching books:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = (filters) => {
    // Update URL params for sharing
    const urlParams = new URLSearchParams()
    if (filters.title) urlParams.set('title', filters.title)
    if (filters.author) urlParams.set('author', filters.author)
    if (filters.language) urlParams.set('language', filters.language)
    if (filters.year) urlParams.set('year', filters.year)
    
    setSearchParams(urlParams)
    searchBooks(filters, 1)
  }

  // Handle page change
  const handlePageChange = (page) => {
    if (Object.keys(currentFilters).length > 0) {
      searchBooks(currentFilters, page)
    }
  }

  // Load search on mount if URL params exist
  useEffect(() => {
    const title = searchParams.get('title')
    const author = searchParams.get('author')
    const language = searchParams.get('language')
    const year = searchParams.get('year')
    
    if (title || author || language || year) {
      const filters = { title: title || '', author: author || '', language: language || '', year: year || '' }
      searchBooks(filters, 1)
    }
  }, [])

  const hasActiveSearch = Object.keys(currentFilters).length > 0 && Object.values(currentFilters).some(value => value.trim() !== '')

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Book Finder – Worldwide Edition
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search through millions of books worldwide with advanced filters for title, author, language, and year.
        </p>
        <div className="max-w-6xl mx-auto">
          <SearchBar onSearch={handleSearch} initialFilters={currentFilters} />
        </div>
      </div>

      {/* Featured Books Carousel */}
      {!hasActiveSearch && featuredBooks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>
          <FeaturedBooksCarousel books={featuredBooks} />
        </section>
      )}

      {/* Search Results */}
      {hasActiveSearch && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Search Results
            </h2>
            {total > 0 && (
              <p className="text-muted-foreground">
                {total.toLocaleString()} books found
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map((book) => (
                  <BookCard key={book.key} book={book} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No books found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search filters or check your spelling.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* Empty State */}
      {!hasActiveSearch && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
            <p className="text-muted-foreground text-center">
              Use the search filters above to find books you're interested in. You can search by title, author, language, or publication year.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Home
