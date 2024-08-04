import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContent } from '../../Content/AppContent';

function Show() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, token } = useContext(AppContent);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getPost() {
        try {
            const res = await fetch(`/api/posts/${id}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setPost(data.post);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();
        if (user && user.id === post.user_id) {
            try {
                const res = await fetch(`/api/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!res.ok) throw new Error('Failed to delete post');
                navigate('/');
            } catch (error) {
                console.error(error.message);
                setError(error.message);
            }
        } else {
            console.error('Unauthorized to delete this post');
        }
    }

    useEffect(() => {
        getPost();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            {post ? (
                <div key={post.id} className='mt-4 p-4 border rounded-md border-dashed border-slate-400'>
                    <div className='m-2 flex items-start justify-between'>
                        <div>
                            <h2 className='font-bold text-2xl'>{post.title}</h2>
                            <small className='text-us text-slate-600'>
                                Créé par {post.user.name} le {new Date(post.created_at).toLocaleDateString()}
                            </small>
                        </div>
                    </div>
                    <p className='text-us text-balance'>{post.body}</p>
                    {user && user.id === post.user_id && (
                        <div className='flex items-center justify-end gap-4'>
                            <Link to={`/posts/update/${id}`} className='bg-green-500 text-white text-sm rounded-lg px-3 py-1'>
                                Mettre à jour
                            </Link>
                            <form onSubmit={handleDelete}>
                                <button type='submit' className='bg-red-500 text-white text-sm rounded-lg px-3 py-1'>
                                    Supprimer
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            ) : (
                <p className='title'>Poste non trouvé !</p>
            )}
        </>
    );
}

export default Show;
