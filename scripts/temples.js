// temples.js

// --- 1. Dynamic Footer Dates ---

// Get current year for the copyright
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// Get last modification date
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;


// --- 2. Hamburger Menu Functionality ---

// Select the button and the navigation menu
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

// Add click event listener to the button
menuButton.addEventListener('click', () => {
    // Toggle the 'open' class on both the button and the navigation
    // This controls visibility and changes the icon (☰ to X)
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});