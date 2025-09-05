import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getPlaceholderCover } from '../utils/coverUrl'

const BookCard = ({ book }) => {
  const coverUrl = book.coverUrl || getPlaceholderCover()

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-[3/4] overflow-hidden rounded-t-lg">
        <img
          src={coverUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            e.target.src = getPlaceholderCover()
          }}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-2" title={book.title}>
          {book.title}
        </h3>
        {book.authors && book.authors.length > 0 && (
          <p className="text-sm text-muted-foreground mb-1">
            by {book.authors.join(', ')}
          </p>
        )}
        {book.first_publish_year && (
          <p className="text-sm text-muted-foreground">
            {book.first_publish_year}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/book/${book.key}`}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default BookCard
