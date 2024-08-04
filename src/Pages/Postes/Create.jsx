import React, { useContext, useState } from 'react'
import { AppContent } from '../../Content/AppContent';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const {navigate} = useNavigate(); 
  const {token} = useContext(AppContent);  
  const [FormData, setFormData] = useState({
    title: '',
    body: '',
  })

  const [errors,setErrors] = useState({});

  async function handleCraete(e){
    e.preventDefault();

    const res = await fetch('/api/posts',{
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(FormData),
    });

    const data = await res.json();

    console.log(data);

    if(data.errors){
      console.log(data.errors);
      setErrors(data.errors);
    }else{
      alert('Post created successfully!');
      navigate('/');
    }

  }
  
  return (
    <>
      <h1 className='title'>Create a new post</h1>

      <form onSubmit={handleCraete} className='w-1/2 mx-auto space-y-6'>
        <div>
          <input type="text"  placeholder='Post Title' 
          value={FormData.title} 
          onChange={(e) => setFormData({ ...FormData,title: e.target.value })}
          />
          {errors.title && <p className="text-red-500">{errors.title[0]}</p>}
        </div>
        <div>
          <textarea rows="6" placeholder='Post Content'
          value={FormData.body} 
          onChange={(e) => setFormData({ ...FormData,body: e.target.value })}
          />
          {errors.body && <p className="text-red-500">{errors.body[0]}</p>}
        </div>
       
        <button className='primary-btn' type="submit">Create</button>
      </form>
    </>
  )
}
