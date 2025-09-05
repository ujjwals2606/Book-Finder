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

  const query = searchParams.get('q') || ''

  // Load featured books on mount
  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const response = await api.get('/books/search?q=fantasy&limit=10')
        setFeaturedBooks(response.data.books)
      } catch (error) {
        console.error('Error loading featured books:', error)
      }
    }
    loadFeaturedBooks()
  }, [])

  // Search books
  const searchBooks = async (searchQuery, page = 1) => {
    if (!searchQuery.trim()) {
      setBooks([])
      setTotalPages(1)
      setTotal(0)
      return
    }

    setLoading(true)
    try {
      const response = await api.get(
        `/books/search?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=20`
      )
      setBooks(response.data.books)
      setTotalPages(response.data.totalPages)
      setTotal(response.data.total)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error searching books:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  // Handle search
  const handleSearch = (searchQuery) => {
    setSearchParams({ q: searchQuery })
    searchBooks(searchQuery, 1)
  }

  // Handle page change
  const handlePageChange = (page) => {
    if (query) {
      searchBooks(query, page)
    }
  }

  // Search on mount if query exists
  useEffect(() => {
    if (query) {
      searchBooks(query, 1)
    }
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Your Next Great Read
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Search through millions of books and explore detailed information easily.
        </p>
        <div className="max-w-md mx-auto">
          <SearchBar onSearch={handleSearch} initialQuery={query} />
        </div>
      </div>

      {/* Featured Books Carousel */}
      {!query && featuredBooks.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Books</h2>
          <FeaturedBooksCarousel books={featuredBooks} />
        </section>
      )}

      {/* Search Results */}
      {query && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Search Results for "{query}"
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
                  Try searching with different keywords or check your spelling.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      )}

      {/* Empty State */}
      {!query && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Start Your Search</h3>
            <p className="text-muted-foreground text-center">
              Use the search bar above to find books you're interested in.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Home
