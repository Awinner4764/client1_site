// Initialize Firebase Firestore
const db = firebase.firestore();

// Function to display a post on the page
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

// Load all posts on page load
window.onload = function() {
    db.collection('posts').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            displayPost(doc.data());
        });
    });
};

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const postData = {
        title: title,
        content: content
    };

    db.collection('posts').add(postData).then(() => {
        displayPost(postData);
        document.getElementById('postForm').reset();
    }).catch(error => {
        console.error('Error adding post: ', error);
    });
});
