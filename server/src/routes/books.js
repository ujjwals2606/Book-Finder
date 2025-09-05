const express = require('express')
const axios = require('axios')

const router = express.Router()

// Search books using Open Library API
router.get('/search', async (req, res) => {
  try {
    const { q, page = 1, limit = 20 } = req.query

    if (!q || q.trim() === '') {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const openLibraryUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&page=${page}&limit=${limit}`

    const response = await axios.get(openLibraryUrl)
    const data = response.data

    const books = data.docs.map(doc => ({
      key: doc.key,
      title: doc.title,
      authors: doc.author_name || [],
      first_publish_year: doc.first_publish_year,
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
        : null,
      edition_key: doc.edition_key || []
    }))

    res.json({
      books,
      total: data.numFound,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(data.numFound / limit)
    })
  } catch (error) {
    console.error('Search error:', error)
    res.status(500).json({ message: 'Error searching books' })
  }
})

module.exports = router
