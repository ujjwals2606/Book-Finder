import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api/axios'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft, ExternalLink, Calendar, Globe, Users, BookOpen } from 'lucide-react'
import { getPlaceholderCover } from '../utils/coverUrl'

const BookDetail = () => {
  const { key } = useParams()
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadBook = async () => {
      try {
        // Extract work ID from the key (remove /works/ prefix if present)
        let workId = key
        if (workId.startsWith('/works/')) {
          workId = workId.replace('/works/', '')
        }
        
        // Fetch detailed book information from our backend
        const response = await api.get(`/books/details/${workId}`)
        setBook(response.data)
      } catch (error) {
        console.error('Error loading book details:', error)
        // Fallback to search if work details fail
        try {
          const searchResponse = await api.get(`/books/search?title=${encodeURIComponent(key)}&limit=1`)
          if (searchResponse.data.books.length > 0) {
            setBook(searchResponse.data.books[0])
          }
        } catch (searchError) {
          console.error('Error with fallback search:', searchError)
        }
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
    <div className="max-w-6xl mx-auto">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1 space-y-4">
          <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
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
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl leading-tight">{book.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Authors */}
              {book.authorDetails && book.authorDetails.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Authors
                  </h3>
                  <div className="space-y-2">
                    {book.authorDetails.map((author, index) => (
                      <p key={index} className="text-muted-foreground">
                        {author.personal_name || author.name}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {book.description && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Description
                  </h3>
                  <div 
                    className="text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: book.description.length > 500 
                        ? book.description.substring(0, 500) + '...' 
                        : book.description 
                    }}
                  />
                </div>
              )}

              {/* Publication Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {book.first_publish_date && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      First Published
                    </h3>
                    <p className="text-muted-foreground">
                      {book.first_publish_date}
                    </p>
                  </div>
                )}

                {book.language && book.language.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Language
                    </h3>
                    <p className="text-muted-foreground">
                      {book.language.join(', ')}
                    </p>
                  </div>
                )}
              </div>

              {/* Subjects */}
              {book.subjects && book.subjects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.slice(0, 10).map((subject, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                    {book.subjects.length > 10 && (
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                        +{book.subjects.length - 10} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Subject Places */}
              {book.subject_places && book.subject_places.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Places</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject_places.slice(0, 8).map((place, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subject Times */}
              {book.subject_times && book.subject_times.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Time Periods</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.subject_times.slice(0, 8).map((time, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-accent text-accent-foreground text-sm rounded-full"
                      >
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Info */}
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg mb-3">Technical Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Work ID:</span>
                    <code className="ml-2 bg-muted px-2 py-1 rounded text-xs">
                      {book.key}
                    </code>
                  </div>
                  {book.created && (
                    <div>
                      <span className="font-medium">Created:</span>
                      <span className="ml-2 text-muted-foreground">
                        {new Date(book.created).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {book.last_modified && (
                    <div>
                      <span className="font-medium">Last Modified:</span>
                      <span className="ml-2 text-muted-foreground">
                        {new Date(book.last_modified).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookDetail
