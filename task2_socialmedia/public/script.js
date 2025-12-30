/* content of script.js */
const API_URL = 'http://localhost:3000/api';

// --- Auth Helpers ---
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function login(email, password) {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    }).then(res => res.json());
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

function register(name, email, password) {
    return fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    }).then(res => res.json());
}

// --- Data Helpers ---
function getPosts() {
    return fetch(`${API_URL}/posts`).then(res => res.json());
}

function createPost(content, imageUrl) {
    const user = getCurrentUser();
    return fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, content, imageUrl })
    }).then(res => res.json());
}

function deletePost(postId) {
    return fetch(`${API_URL}/posts/${postId}`, { method: 'DELETE' }).then(res => res.json());
}

function likePost(postId) {
    return fetch(`${API_URL}/posts/${postId}/like`, { method: 'POST' }).then(res => res.json());
}

function commentPost(postId, userId, text) {
    return fetch(`${API_URL}/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text })
    }).then(res => res.json());
}

function followUser(targetUserId, currentUserId) {
    return fetch(`${API_URL}/users/${targetUserId}/follow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUserId })
    }).then(res => res.json());
}

function updateProfile(userId, data) {
    return fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function getUser(userId) {
    return fetch(`${API_URL}/users/${userId}`).then(res => res.json());
}

// --- Utils ---
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return "Just now";
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return; // Should exist in valid pages
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// --- Rendering ---
function renderPost(post, container) {
    const user = getCurrentUser();
    const isOwner = user && user.id === post.userId;

    // Fallback if avatar not in post data (backend mock simplification)
    // In real app, post.user would populate this.
    const avatarLetter = post.userName ? post.userName[0] : 'U';

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <div class="post-header">
            <div style="display:flex; align-items:center;">
                <div class="user-avatar">${avatarLetter}</div>
                <div>
                    <div style="font-weight:600;">${post.userName}</div>
                    <div style="font-size:0.8rem; color:var(--text-muted);">${timeAgo(post.timestamp)}</div>
                </div>
            </div>
            ${isOwner ? `<button class="btn-sm btn-danger" onclick="handleDelete(${post.id})">Del</button>` : ''}
        </div>
        
        <p style="margin-bottom:12px; line-height:1.5;">${post.content}</p>
        ${post.imageUrl ? `<img src="${post.imageUrl}" class="post-image" alt="Post Image">` : ''}

        <div style="display:flex; gap:16px; margin-top:16px; border-top:1px solid var(--border); padding-top:12px;">
        <div style="display:flex; gap:16px; margin-top:16px; border-top:1px solid var(--border); padding-top:12px;">
             <button class="btn-sm btn-outline" onclick="handleLike(${post.id}, this)">❤️ ${post.likes || 0} Likes</button>
             <button class="btn-sm btn-outline" onclick="handleComment(${post.id}, '${post.userName}')">💬 Comment</button>
        </div>
    `;
    container.appendChild(div);
}

window.handleLike = async (postId, btn) => {
    const res = await likePost(postId);
    if (res.success) {
        btn.innerHTML = `❤️ ${res.likes} Likes`;
        // Optional: Animation or feedback
    }
};

window.handleComment = async (postId, authorName) => {
    const text = prompt(`Comment on ${authorName}'s post:`);
    if (text) {
        const user = getCurrentUser();
        const res = await commentPost(postId, user.id, text);
        if (res.success) {
            showToast("Comment added!");
            // In a full app, we would re-render the post's comments section here.
        }
    }
};

window.handleFollow = async (targetUserId, btn) => {
    const user = getCurrentUser();
    const res = await followUser(targetUserId, user.id);
    if (res.success) {
        if (res.following) {
            btn.innerText = "Following";
            btn.classList.add("btn-secondary"); // Visual cue
            showToast("Followed user!");
        } else {
            btn.innerText = "Follow";
            btn.classList.remove("btn-secondary");
            showToast("Unfollowed user");
        }
    }
};

window.handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    const res = await deletePost(id);
    if (res.success) {
        showToast("Post deleted");
        if (window.loadFeed) window.loadFeed();
        if (window.loadProfile) window.loadProfile();
    }
};
