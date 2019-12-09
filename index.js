var posts = [
    {
    title: "post1",
    body: "This is post 1",
    },
    {
    title: "post2",
    body: "This is post 2",
    }
]

function getPosts() {
    setTimeout(() => {
        var output = "";
        posts.forEach((post) => {
            output += `<li>${post.title}</li>`;
        })
        document.body.innerHTML = output
    }, 1000)
}

function createPost(post, callback) {
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000
    )
}

createPost({
    title: "post3",
    body: "This is post 3",
    }, getPosts)