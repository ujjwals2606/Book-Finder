/**
 * Build cover URL from Open Library cover ID
 * @param {number} coverId - The cover ID from Open Library
 * @returns {string} - The cover URL
 */
export const buildCoverUrl = (coverId) => {
  if (!coverId) return null
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}

/**
 * Get placeholder cover URL for books without covers
 * @returns {string} - Placeholder cover URL
 */
export const getPlaceholderCover = () => {
  return 'https://via.placeholder.com/300x400?text=No+Cover+Available'
}
