const router = require('express').Router()
const { read, write, exists } = require('fs-sync-utils')
const bookmarksTable = require('./bookmarksTable')

const savedBookmarksFileName = process.env.SAVED_BOOKMARKS_FILE_NAME || './savedBookmarks.json';
const savedBookmarksFileExists = exists(savedBookmarksFileName)
if (!savedBookmarksFileExists) {
  const savedBookmarksNewFileContents = { savedBookmarks: [] }
  write(savedBookmarksFileName, JSON.stringify(savedBookmarksNewFileContents, null, 2))
}

const mainCss = read('./assets/css/main.css')
const tableCss = read('./assets/css/table.css')
const scriptContent = read('./assets/js/table-sort.js')

router.get('/save', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  const userAgent = req.get('User-Agent')
  const time = new Date().toString()
  if (!req.query || !req.query.url) {
    throw new Error(`No 'url' query param provided: \n\tIP: ${ip}\n\tUA: ${userAgent}\n\tTime: ${time}`)
  }
  const bookmarkUrl = req.query.url
  const bookmarkName = req.query.name || null
  
  const savedBookmarksJson = JSON.parse(read(savedBookmarksFileName))

  savedBookmarksJson.savedBookmarks.push({
    bookmarkUrl,
    bookmarkName,
    time,
    ip,
    userAgent
  })
  write(savedBookmarksFileName, JSON.stringify(savedBookmarksJson, null, 2))
  res.status(204).send()
});

router.get('/', async (req, res) => {
  const savedBookmarks = JSON.parse(read(savedBookmarksFileName)).savedBookmarks.reverse()

  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Bookmarks</title>
<style>
  ${mainCss}
  ${tableCss}
</style>
</head>
<body>
${bookmarksTable(savedBookmarks).outerHTML}
${savedBookmarks.length === 0 ? '<div class="no-bookmarks">No bookmarks saved yet</div>' : ''}
<script>
  ${scriptContent}
</script>
</body>
</html>`)
})

module.exports = router