import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { getPlaceholderCover } from '../utils/coverUrl'

const BookDetail = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBook = async () => {
      try {
        // Fetch book details by searching with the key
        const response = await api.get(`/books/search?q=${encodeURIComponent(key)}&limit=1`)
        if (response.data.books.length > 0) {
          setBook(response.data.books[0])
        }
      } catch (error) {
        console.error('Error loading book:', error)
      } finally {
        setLoading(false)
      }
    }

    if (key) {
      loadBook()
    }
  }, [key])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Book not found</h2>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
      </div>
    )
  }

  const coverUrl = book.coverUrl || getPlaceholderCover()

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-lg">
            <img
              src={coverUrl}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = getPlaceholderCover()
              }}
            />
          </div>

          <Button variant="outline" asChild className="w-full">
            <a
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Open Library
            </a>
          </Button>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {book.authors && book.authors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Authors</h3>
                  <p className="text-muted-foreground">
                    {book.authors.join(', ')}
                  </p>
                </div>
              )}

              {book.first_publish_year && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">First Published</h3>
                  <p className="text-muted-foreground">
                    {book.first_publish_year}
                  </p>
                </div>
              )}

              {book.edition_key && book.edition_key.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Available Editions</h3>
                  <p className="text-muted-foreground">
                    {book.edition_key.length} edition{book.edition_key.length !== 1 ? 's' : ''} available
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-lg mb-2">Book Key</h3>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {book.key}
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
