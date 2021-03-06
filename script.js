document.getElementById("Form").addEventListener("submit", saveBookmark);


function saveBookmark(e) {

    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;


    }


    let bookmark = {
        name: siteName,
        url: siteUrl
    }


    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    }

    document.getElementById('Form').reset();
    document.getElementById("myModal").style.display = "none";
    fetchBookmarks();
    e.preventDefault();
}
function deleteBookmark(url) {

    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (let i = 0; i < bookmarks.length; i++) {

        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);

        }

    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
}


function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    let bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;
        bookmarksResults.innerHTML +=
            '<div class="bookmas">' +
            '<h3 id="siteName" class="siteName">' + name + '</h3>' +
            '<div class="btns">' +
            ' <button class="visit"><a id="visit" target="_blank" href="' + url + '">Visit</a></button>' +
            ' <button id="delete" onclick="deleteBookmark(\'' + url + '\')" href="#">Delete</button>' +
            '</div>' +
            '</div>';
    }
}

function validateForm(siteName, siteUrl) {

    if (!siteName || !siteUrl) {
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        return false;

    }

    return true;

}

// for the modal

var modal = document.getElementById("myModal");
var btn = document.getElementById("modalBtn");

var span = document.getElementsByClassName("close")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}