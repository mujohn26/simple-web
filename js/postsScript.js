const select = (selector) => {
    return document.querySelector(selector);
};
const postsTableBodyElement = select("#posts-list");
const postsmessageContainer = select("#message-div-post");
const loadPosts = (userId) => {
    postsmessageContainer.innerHTML = "Loading posts....";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                postsmessageContainer.innerHTML =
                    "Oops, something went wrong retrieving user posts...";
            }
        })
        .then((json) => {
            if (!json.length) {
                postsmessageContainer.innerHTML = "No posts found!";
            } else {
                let tableRow = "";
                json.map((post) => {
                    tableRow += "<div class='data-row'>";
                    tableRow += "<div> #" + post.id + "</div>";
                    tableRow += "<div>" + post.title + "</div>";
                    tableRow += "<div>" + post.body + "</div>";
                    tableRow += "</div>";
                });
                postsTableBodyElement.innerHTML = tableRow;
                postsmessageContainer.setAttribute("style", "display: none;");
            }
        })
        .catch((error) => {
            postsmessageContainer.innerHTML = `Oops, error occured....: ${error}`;
        });
};
const urlSearchParams = new URLSearchParams(window.location.search);
const { userId } = Object.fromEntries(urlSearchParams.entries());
loadPosts(userId);