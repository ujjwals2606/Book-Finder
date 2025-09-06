const express = require('express')
const booksController = require('../controllers/booksController')

const router = express.Router()

// Search books using Open Library API with advanced filters
router.get('/search', booksController.searchBooks)

// Get book details by work ID
router.get('/details/:workId', booksController.getBookDetails)

module.exports = router
