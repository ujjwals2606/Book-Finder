import { useState, useEffect } from 'react'
import { useDebounce } from '../hooks/useDebounce'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Search, Filter, X } from 'lucide-react'

const LANGUAGE_OPTIONS = [
  { code: "eng", name: "English" },
  { code: "hin", name: "Hindi" },
  { code: "fre", name: "French" },
  { code: "spa", name: "Spanish" },
  { code: "ger", name: "German" },
  { code: "ita", name: "Italian" },
  { code: "jpn", name: "Japanese" },
  { code: "ara", name: "Arabic" }
]

const SearchBar = ({ onSearch, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    title: initialFilters.title || '',
    author: initialFilters.author || '',
    language: initialFilters.language || '',
    year: initialFilters.year || ''
  })
  
  const [showAdvanced, setShowAdvanced] = useState(false)
  const debouncedFilters = useDebounce(filters, 500)

  useEffect(() => {
    const hasAnyFilter = Object.values(debouncedFilters).some(value => value.trim() !== '')
    if (hasAnyFilter) {
      onSearch(debouncedFilters)
    }
  }, [debouncedFilters, onSearch])

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(filters)
  }

  const clearFilters = () => {
    setFilters({
      title: '',
      author: '',
      language: '',
      year: ''
    })
  }

  const hasActiveFilters = Object.values(filters).some(value => value.trim() !== '')

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Search */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search by title..."
                value={filters.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium mb-2 block">Author</label>
                <Input
                  type="text"
                  placeholder="Search by author..."
                  value={filters.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Language</label>
                <select
                  value={filters.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="">All Languages</option>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Year</label>
                <Input
                  type="number"
                  placeholder="Publication year..."
                  value={filters.year}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  min="1000"
                  max="2024"
                />
              </div>
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filters.title && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Title: {filters.title}
                </span>
              )}
              {filters.author && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Author: {filters.author}
                </span>
              )}
              {filters.language && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Language: {LANGUAGE_OPTIONS.find(l => l.code === filters.language)?.name}
                </span>
              )}
              {filters.year && (
                <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                  Year: {filters.year}
                </span>
              )}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default SearchBar
