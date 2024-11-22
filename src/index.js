// src/index.js
import '../styles/index.scss';
import './toptoolbar/toptoolbar.js';
import './about/about.js';

// Define the pages and their corresponding file names
var pages = [
    { root: '', page: 'layout' },
    { root: 'about', page: 'about' },
    { root: 'toptoolbar', page: 'toptoolbar' },
    { root: 'pdfviewer', page: 'pdfviewer' },
    { root: 'docEditor', page: 'docEditor' },
    { root: 'imageEditor', page: 'imageEditor' },
    { root: 'excel', page: 'excel' }
];

// Function to initiate default routing
routeDefault();

function routeDefault() {
    crossroads.addRoute('', function() {
        loadPage('');
    });
}

// Add route handler for about page
crossroads.addRoute('/about', function() {
    loadPage('about');
});

crossroads.addRoute('/pdfviewer', function() {
    loadPage('pdfviewer');
});

crossroads.addRoute('/toptoolbar', function() {
    loadPage('toptoolbar');
});

crossroads.addRoute('/imageEditor', function() {
    loadPage('imageEditor');
});

crossroads.addRoute('/docEditor', function() {
    loadPage('docEditor');
});

crossroads.addRoute('/excel', function() {
    loadPage('excel');
});
// Function to load the page based on the route
function loadPage(page) {
    var pageObj = getPageObj(page);
    if (pageObj.page) {
        var ajaxHTML = new ej.base.Ajax('./' + pageObj.page + '.html', 'GET', true);
        ajaxHTML.send().then(function(value) {
            var contentArea = document.getElementById('content-area');
            if (contentArea) {
                contentArea.innerHTML = value.toString();
            }
            if (page === '') {
                window.layout();
            } else if (page === 'about') {
                window.about();
            } else if (page === 'toptoolbar') {
                window.toolbar();
            }
            else if (page === 'pdfviewer') {
                window.viewer();
            }
            else if (page === 'imageEditor') {
                window.imgeditor();
            }
            else if (page === 'docEditor') {
                window.docEditor();
            }
            else if (page === 'excel') {
                window.excel();
            }
        }).catch(function(error) {
            console.error('An error occurred:', error);
        });
    } else {
        console.error('Page not found:', page);
    }
}

// Function to find the corresponding page object based on the root value
function getPageObj(page) {
    return pages.find(function(item) {
        return item.root === page;
    }) || {};
}

// Set up hasher event listeners
hasher.initialized.add(function(hashValue) {
    crossroads.parse(hashValue); // Initial load calls the '' route handler
});

hasher.changed.add(function(hashValue) {
    crossroads.parse(hashValue); // Hash change calls the corresponding route handler
});

// Initialize the hasher
hasher.init();