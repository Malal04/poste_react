import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContent } from '../../Content/AppContent';

export default function Update() {
    const { id } = useParams();
    const navigate = useNavigate(); 
    const { token, user } = useContext(AppContent);  
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const [errors, setErrors] = useState({});

    async function getPost() {
        try {
            const res = await fetch(`/api/posts/${id}`);
            if (!res.ok) throw new Error('Failed to fetch post');
            const data = await res.json();

            if (data.post.user_id !== user.id) {
                alert('You cannot update this post!');
                navigate("/");
                return;
            }

            setFormData({
                title: data.post.title,
                body: data.post.body,
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'put', 
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.errors) {
                setErrors(data.errors);
            } else {
                alert('Post updated successfully!');
                navigate('/');
            }
        } catch (error) {
            console.error('Failed to update post:', error.message);
        }
    }

    useEffect(() => {
        getPost();
    }, [id, navigate, user.id]);

    return (
        <>
            <h1 className='title'>Update a Post</h1>

            <form onSubmit={handleUpdate} className='w-1/2 mx-auto space-y-6'>
                <div>
                    <input
                        type="text"
                        placeholder='Post Title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
                </div>
                <div>
                    <textarea
                        rows="6"
                        placeholder='Post Content'
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                    />
                    {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
                </div>
               
                <button className='primary-btn' type="submit">Update</button>
            </form>
        </>
    );
}
