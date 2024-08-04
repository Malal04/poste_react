import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getPosts() {
    try {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 className='title'>Latest Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className='mb-4 p-4 border rounded-md border-dashed border-slate-400'>
            <div className='m-2 flex items-start justify-between'>
              <div>
                <h2 className='font-bold text-2xl'>{post.title}</h2>
                <small className='text-us text-slate-600'>
                  Created by {post.user.name} on {new Date(post.created_at).toLocaleDateString()}
                </small>
              </div>
              <Link to={`/posts/${post.id}`} className='bg-blue-500 text-white text-sm rounded-lg px-3 py-1'>
                Read More
              </Link>
            </div>
            <p className='text-us text-balance'>{post.body}</p>
          </div>
        ))
      ) : (
        <p>There are no posts.</p>
      )}
    </>
  );
}
