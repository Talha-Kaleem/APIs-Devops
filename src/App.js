import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', body: '', id: null });

  // Fetch posts on load
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => setPosts(res.data))
      .catch(err => console.error('GET error:', err));
  };

  const handleSubmit = () => {
    if (!form.title || !form.body) {
      alert('Please enter both title and body.');
      return;
    }

    if (form.id === null) {
      // POST
      axios
        .post('https://jsonplaceholder.typicode.com/posts', {
          title: form.title,
          body: form.body,
          userId: 1,
        })
        .then(() => {
          alert('Post created!');
          setForm({ title: '', body: '', id: null });
          fetchPosts();
        });
    } else {
      // PUT
      axios
        .put(`https://jsonplaceholder.typicode.com/posts/${form.id}`, {
          title: form.title,
          body: form.body,
          userId: 1,
        })
        .then(() => {
          alert('Post updated!');
          setForm({ title: '', body: '', id: null });
          fetchPosts();
        });
    }
  };

  const handleDelete = id => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`).then(() => {
      alert('Post deleted!');
      fetchPosts();
    });
  };

  const handleEdit = post => {
    setForm({ title: post.title, body: post.body, id: post.id });
  };

  return (
    <div className="App">
      <h2>React CRUD with API</h2>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Body"
        value={form.body}
        onChange={e => setForm({ ...form, body: e.target.value })}
      />
      <button onClick={handleSubmit}>
        {form.id === null ? 'Create Post' : 'Update Post'}
      </button>

      <hr />

      <h3>Posts</h3>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
          <button onClick={() => handleEdit(post)}>Edit</button>
          <button onClick={() => handleDelete(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
