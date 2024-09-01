document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postData = {
        title: title,
        content: content
    };

    fetch('/submit-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            displayPost(postData);
            document.getElementById('postForm').reset();
        } else {
            alert('Failed to submit post.');
        }
    })
    .catch(error => console.error('Error:', error));
});

function displayPost(post) {
    const postsContainer = document.getElementById('posts-container');
    const postElement = document.createElement('article');
    postElement.className = 'post';

    postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
    `;

    postsContainer.appendChild(postElement);
}
