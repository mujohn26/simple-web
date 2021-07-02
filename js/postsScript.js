const select = (selector) => {
    return document.querySelector(selector);
};
const postsTableBodyElement = select("#posts-list");
const messagePost = select("#message-div-post");
const loadPosts = (userId) => {
    messagePost.innerHTML = "Loading posts....";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                messagePost.innerHTML =
                    "We can't retrieve users at this moment";
            }
        })
        .then((json) => {
            if (!json.length) {
                messagePost.innerHTML = "No posts found!";
            } else {
                let row = "";
                json.map((post) => {
                    row += "<div class='data-row'>";
                    row += "<div class='post-id'> #" + post.id + "</div>";
                    row += "<div class='post-title'>" + post.title + "</div>";
                    row += "<div class='post-body'>" + post.body + "</div>";
                    row += "</div>";
                });
                postsTableBodyElement.innerHTML = row;
                messagePost.setAttribute("style", "display: none;");
            }
        })
        .catch((error) => {
            messagePost.innerHTML = `Oops, error occured....: ${error}`;
        });
};
const urlSearchParams = new URLSearchParams(window.location.search);
const { userId } = Object.fromEntries(urlSearchParams.entries());
loadPosts(userId);