const select = (selector) => {
    return document.querySelector(selector);
};
const tableBodyElement = select("#users-list");
const messageContainerElement = select("#message-div");
const postsTableBodyElement = select("#posts-list");
const messagePost = select("#message-div-post");
const loadUsers = () => {
    messageContainerElement.innerHTML = "Loading users....";
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                messageContainerElement.innerHTML =
                    "We can't retrieve users at this moment";
            }
        })
        .then((json) => {
            if (!json.length) {
                messageContainerElement.innerHTML = "No users found!";
            } else {
                let row = "";
                json.map((user) => {
                    row += "<div class='data-row'>";
                    row += "<div >" + user.name + "</div>";
                    row += "<div>" + user.email + "</div>";
                    row += `<div ><button onClick='getPosts(${user.id});' class='user-button'>Get User’s Posts</button></div>`;
                    row += "</div>";
                });
                tableBodyElement.innerHTML = row;
                messageContainerElement.setAttribute("style", "display: none;");
            }
        })
        .catch((error) => {
            messageContainerElement.innerHTML = `error occured: ${error}`;
        });
};
const getPosts = (userId) => {
    window.location.href = `../pages/posts.html?userId=${userId}`;
};
loadUsers();