const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM(``)).window;

function tableOfData(data) {
  const table = document.createElement('table');
  const frag = document.createDocumentFragment();
  const thead = document.createElement('thead');
  const tableHeadingRow = document.createElement('tr');
  data.headings.forEach(heading => {
    const tableHeading = document.createElement('th');
    tableHeading.textContent = heading;
    tableHeadingRow.appendChild(tableHeading);
  });
  thead.appendChild(tableHeadingRow);
  frag.appendChild(thead);
  const tbody = document.createElement('tbody');
  data.rows.forEach((row, i) => {
    const tableRow = document.createElement('tr');
    tableRow.dataset.index = i;
    data.headings.forEach((name, j) => {
      const columnEl = document.createElement('td');
      columnEl.innerHTML = row[j]; // WARNING: unsafe
      tableRow.appendChild(columnEl);
    });
    tbody.appendChild(tableRow);
  });
  frag.appendChild(tbody);
  table.appendChild(frag);
  return table;
}

module.exports = tableOfData;
