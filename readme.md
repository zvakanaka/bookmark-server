# Host Your Own Bookmark Server
Gain more internet independence

## Setup
1) Clone `$ git clone https://github.com/zvakanaka/bookmark-server.git`
2) Install dependencies `$ npm install`
3) Run `$ npm start`

## Routes
| Path | Method | Description
| :------------- | :------------- | :------------- |
| `/`     | GET | A sortable table of saved bookmarks 
| `/save` | GET | Save a bookmark with `?url=` and `&name=` params

## Bookmarklet Source Code
Add a bookmark of the current URL to your server:
```javascript
const serverRoot = 'http://localhost:3000';
// add bookmark for current page URL
const bookmarkUrlToSave = window.location.href;
const bookmarkNameToSave = document.title;
const saveBookmarkUrl = `${serverRoot}/save/?url=${encodeURIComponent(bookmarkUrlToSave)}&name=${encodeURIComponent(bookmarkNameToSave)}`;

// NOTE: fallback exists because some sites do not allow cross-origin requests
fetch(saveBookmarkUrl)
  .then(() => {
    alert('Bookmark Saved 👍');
  })
  .catch(() => {
    window.open(saveBookmarkUrl, '_blank');
  });
```
Make the aforementioned code into a bookmarklet [here](https://caiorss.github.io/bookmarklet-maker/).
