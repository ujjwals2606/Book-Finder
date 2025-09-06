const axios = require('axios')

// Search books using Open Library API with advanced filters
const searchBooks = async (req, res) => {
  try {
    const { 
      title, 
      author, 
      language, 
      year, 
      page = 1, 
      limit = 20 
    } = req.query

    // Build search query based on available parameters
    let searchQuery = ''
    const queryParams = []

    if (title) {
      queryParams.push(`title:${title}`)
    }
    if (author) {
      queryParams.push(`author:${author}`)
    }
    if (language) {
      queryParams.push(`language:${language}`)
    }
    if (year) {
      queryParams.push(`first_publish_year:${year}`)
    }

    // If no specific filters, use general search
    if (queryParams.length === 0) {
      return res.status(400).json({ 
        message: 'At least one search parameter is required (title, author, language, or year)' 
      })
    }

    searchQuery = queryParams.join(' AND ')

    // Construct Open Library API URL
    const openLibraryUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${page}&limit=${limit}`

    const response = await axios.get(openLibraryUrl)
    const data = response.data

    const books = data.docs.map(doc => ({
      key: doc.key,
      title: doc.title,
      authors: doc.author_name || [],
      first_publish_year: doc.first_publish_year,
      language: doc.language || [],
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : null,
      edition_key: doc.edition_key || [],
      work_id: doc.work_id || null
    }))

    res.json({
      books,
      total: data.numFound,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(data.numFound / limit),
      searchParams: {
        title: title || null,
        author: author || null,
        language: language || null,
        year: year || null
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Error searching books' })
  }
}

// Get detailed book information by work ID
const getBookDetails = async (req, res) => {
  try {
    const { workId } = req.params

    if (!workId) {
      return res.status(400).json({ message: 'Work ID is required' })
    }

    const workUrl = `https://openlibrary.org/works/${workId}.json`
    const response = await axios.get(workUrl)
    const workData = response.data

    // Extract detailed information
    const bookDetails = {
      key: workData.key,
      title: workData.title,
      description: workData.description?.value || workData.description || null,
      authors: workData.authors?.map(author => author.author?.key) || [],
      subjects: workData.subjects || [],
      subject_places: workData.subject_places || [],
      subject_times: workData.subject_times || [],
      first_publish_date: workData.first_publish_date,
      created: workData.created,
      last_modified: workData.last_modified,
      covers: workData.covers || [],
      coverUrl: workData.covers && workData.covers.length > 0
        ? `https://covers.openlibrary.org/b/id/${workData.covers[0]}-L.jpg`
        : null
    }

    // If we have author keys, fetch author details
    if (bookDetails.authors.length > 0) {
      try {
        const authorPromises = bookDetails.authors.slice(0, 5).map(async (authorKey) => {
          const authorUrl = `https://openlibrary.org${authorKey}.json`
          const authorResponse = await axios.get(authorUrl)
          return {
            key: authorResponse.data.key,
            name: authorResponse.data.name,
            personal_name: authorResponse.data.personal_name
          }
        })
        
        bookDetails.authorDetails = await Promise.all(authorPromises)
      } catch (authorError) {
        console.error('Error fetching author details:', authorError)
        bookDetails.authorDetails = []
      }
    }

    res.json(bookDetails)
  } catch (error) {
    console.error('Book details error:', error)
    res.status(500).json({ message: 'Error fetching book details' })
  }
}

module.exports = {
  searchBooks,
  getBookDetails
}
