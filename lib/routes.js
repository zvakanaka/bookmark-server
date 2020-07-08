const router = require('express').Router()
const { read, write, exists } = require('fs-sync-utils')
const accessLogTable = require('./accessLogTable')

const savedBookmarksFileName = process.env.SAVED_BOOKMARKS_FILE_NAME || './savedBookmarks.json';

const css = read('./assets/css/table.css')
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
  const savedBookmarksFileExists = exists(savedBookmarksFileName)
  const savedBookmarksJson = savedBookmarksFileExists
    ? require(savedBookmarksFileName)
    : () => {
      const savedBookmarksNewFileContents = { savedBookmarks: [] }
      write(savedBookmarksFileName, JSON.stringify(savedBookmarksNewFileContents, null, 2))
      return savedBookmarksNewFileContents
    }
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
  ${css}
</style>
</head>
<body>
${accessLogTable(savedBookmarks).outerHTML}
<script>
  ${scriptContent}
</script>
</body>
</html>`)
})

module.exports = router