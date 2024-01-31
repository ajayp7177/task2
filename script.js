var postsData;
var currentPage = 1;
var itemsPerPage = 10;

// Fetch data from the API
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
        postsData = data;
        renderTable();
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to render the table based on current page
function renderTable() {
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    for (var i = startIndex; i < endIndex && i < postsData.length; i++) {
        var post = postsData[i];

        var row = tableBody.insertRow();
        row.innerHTML = `<td>${post.id}</td>
                         <td>${post.title}</td>
                         <td>${post.body}</td>
                         <td><button onclick="deleteRow(${post.id})">Delete</button></td>`;
    }
}

// Function to show 10 more items
function showMore() {
    currentPage++;
    renderTable();
}

// Function to show less items
function showLess() {
    if (currentPage > 1) {
        currentPage--;
        renderTable();
    }
}

// Function to delete a row
function deleteRow(postId) {
    var index = postsData.findIndex(post => post.id === postId);
    if (index !== -1) {
        postsData.splice(index, 1);
        renderTable();
    }
}

// Function to search the table
function searchTable() {
    var searchInput = document.getElementById('search').value.toLowerCase();

    var filteredData = postsData.filter(post =>
        post.title.toLowerCase().includes(searchInput) || post.body.toLowerCase().includes(searchInput)
    );

    currentPage = 1; // Reset to the first page after a search
    postsData = filteredData;
    renderTable();
}
