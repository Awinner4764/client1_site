// Initialize Firebase Firestore
const db = firebase.firestore();

// Function to display a post on the page
function displayPost(post) {
    const postsContainer = document.getElementById('posts-container');
    const postElement = document.createElement('article');
    postElement.className = 'post';

    postElement.innerHTML = `
        <h2>${sanitizeHTML(post.title)}</h2>
        <p>${sanitizeHTML(post.content)}</p>
    `;

    postsContainer.prepend(postElement);
}

// Function to sanitize input to prevent XSS attacks
function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Load all posts on page load
window.onload = function() {
    db.collection('posts').orderBy('createdAt', 'desc').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            displayPost(doc.data());
        });
    }).catch(error => {
        console.error('Error fetching posts:', error);
    });
};
// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();

    if (title === "" || content === "") {
        alert("Please fill in both the title and content.");
        return;
    }

    const postData = {
        title: title,
        content: content,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('posts').add(postData).then(() => {
        displayPost(postData);
        document.getElementById('postForm').reset();
    }).catch(error => {
        console.error('Error adding post:', error);
        alert('Failed to submit post. Please try again.');
    });
});
