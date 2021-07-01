const select = (selector) => {
    return document.querySelector(selector);
};
const tableBodyElement = select("#users-list");
const messageContainerElement = select("#message-div");
const postsTableBodyElement = select("#posts-list");
const postsmessageContainer = select("#message-div-post");
const loadUsers = () => {
    messageContainerElement.innerHTML = "Loading users....";
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                messageContainerElement.innerHTML =
                    "Oops, something went wrong retrieving users...";
            }
        })
        .then((json) => {
            if (!json.length) {
                messageContainerElement.innerHTML = "No users found!";
            } else {
                let tableRow = "";
                json.map((user) => {
                    tableRow += "<div class='data-row'>";
                    tableRow += "<div class='name-row'>" + user.name + "</div>";
                    tableRow += "<div>" + user.email + "</div>";
                    tableRow += `<div class='action-row'><button onClick='getPosts(${user.id});' class='user-button'>Get User’s Posts</button></div>`;
                    tableRow += "</div>";
                });
                tableBodyElement.innerHTML = tableRow;
                messageContainerElement.setAttribute("style", "display: none;");
            }
        })
        .catch((error) => {
            messageContainerElement.innerHTML = `Oops, error occured....: ${error}`;
        });
};
const getPosts = (userId) => {
    window.location.href = `../pages/posts.html?userId=${userId}`;
};
loadUsers();