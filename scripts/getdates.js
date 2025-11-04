// GETDATES.JS

// 1. Get the current year for the copyright
const currentYear = new Date().getFullYear();

// Find the <span> element by its ID and set its content
document.getElementById('currentyear').textContent = currentYear;


// 2. Get the last modification date
// Find the <p> element by its ID and set its content using document.lastModified
// The prompt specifies not to manipulate the document.lastModified string output.
document.getElementById('lastModified').innerHTML = `Last Modification: ${document.lastModified}`;