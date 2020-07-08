/**
 * Convert strings to safe HTML.
 * Pass through values of types 'undefined', 'number',
 * and 'boolean'. Coerce others to strings and sanitize them.
 * @param {any} val 
 */
function htmlEntities(val) {
  if (val === null
    || typeof val === 'undefined'
    || typeof val === 'number'
    || typeof val === 'boolean') {
    return val;
  }
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Returns a new object with safe 1st-level values.
 * @param {Object} obj Input object
 * @returns {Object} New object with safe 1st-level values
 */
function htmlSafeObj(obj) {
  const safeObj = {};
  Object.entries(obj).forEach(([key, val]) => {
    safeObj[key] = htmlEntities(val);
  });
  return safeObj;
}

module.exports = {
  htmlEntities,
  htmlSafeObj
};
