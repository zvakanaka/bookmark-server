const tableOfData = require('./tableOfData')
const { htmlSafeObj } = require('./htmlSafeObj')
const niceDate = require('./niceDate')
const validateUrl = require('./validateUrl')

function bookmarksTable(savedBookmarks) {
  const data = {
    headings: [ 'Bookmark', 'Date' ],
    rows: savedBookmarks
      .map(savedBookmark => {
        const l = htmlSafeObj(savedBookmark)
        return [
          validateUrl(l.bookmarkUrl) ? link(l.bookmarkUrl, l.bookmarkName) : 'Invalid URL',
          `<time data-sort-key="${new Date(l.time).valueOf()}" datetime="${l.time}">${niceDate(l.time)}</time>`
        ]
      })
  }
  const table = tableOfData(data)
  return table
}

function link(url, text) {
  return `<a href="${url}" target="_blank">${text ? text : url}</a>`
}

module.exports = bookmarksTable
