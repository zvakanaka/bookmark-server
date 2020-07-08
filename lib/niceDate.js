module.exports = niceDate;

/**
 * Format a date. E.g. 'Jul 21, 2020'.
 * @param {Date} date 
 */
function niceDate(date = new Date().valueOf()) {
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const niceDate = new Date(date).toLocaleDateString('en-US', dateOptions);
  return niceDate;
}
