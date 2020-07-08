(async () => {
  function sortColumn(a, b, descending = false, isAlpha = true, transformer) {
    const sa = (typeof transformer === 'function') ? transformer(a) : a
    const sb = (typeof transformer === 'function') ? transformer(b) : b
    if (isAlpha) return !descending
      ? sb.toLowerCase() < sa.toLowerCase() 
      : sa.toLowerCase() < sb.toLowerCase()
    return !descending ? sb - sa : sa - sb
  }
  function sortTableByColumn(i = 0) {
    const tableEl = document.querySelector('table')
    const headerColEl = tableEl.querySelector(`th:nth-child(${i + 1})`)
    const descending = headerColEl.dataset.descending
    const ascending = headerColEl.dataset.ascending
    // delete all others
    tableEl.querySelectorAll('th[data-descending]').forEach(th => delete th.dataset.descending)
    tableEl.querySelectorAll('th[data-ascending]').forEach(th => delete th.dataset.ascending)
    if (descending) {
      headerColEl.dataset.ascending = true
    } else if (ascending) {
      // restore original row order
      sortTable(tableEl, (a, b) => sortColumn(
        a.dataset.index,
        b.dataset.index,
        true, // descending
        false // isAlpha
      ))      
      return
    } else {      
      headerColEl.dataset.descending = true
    }

    const firstRowCellAtIndex = tableEl.querySelector(`tbody > tr > td:nth-child(${i + 1})`);
    const hasSortKey = typeof firstRowCellAtIndex.firstElementChild.dataset.sortKey !== 'undefined';
    const isAlpha = /[ a-z]+/i.test(hasSortKey
      ? firstRowCellAtIndex.firstElementChild.dataset.sortKey
      : firstRowCellAtIndex.textContent);
    
    sortTable(tableEl, (a, b) => sortColumn(
      hasSortKey
        ? a.querySelector(`td:nth-child(${i + 1})`).firstElementChild.dataset.sortKey
        : a.querySelector(`td:nth-child(${i + 1})`).textContent,
      hasSortKey
        ? b.querySelector(`td:nth-child(${i + 1})`).firstElementChild.dataset.sortKey
        : b.querySelector(`td:nth-child(${i + 1})`).textContent,
      descending,
      isAlpha
    ))
  }
    
  const headerEls = document.querySelectorAll('th')
  headerEls.forEach((headerEl, i) => headerEl.addEventListener('click', () => sortTableByColumn(i)))
})();

function sortTable(tableEl, sortCb = null) {
  const rows = Array.from(tableEl.querySelectorAll('tbody > tr'))
  if (sortCb) {
    rows.sort(sortCb)
    // appendChild moves DOM nodes if they already exist
    rows.forEach(row => tableEl.querySelector('tbody').appendChild(row))
  } else {
    throw new Error('Please provide a sort callback')
  }
}