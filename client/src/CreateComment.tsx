import axios from 'axios';
import React, { useState } from 'react'

interface PostProps{
    postId:string
}

const CreateComment:React.FC<PostProps> = ({postId}) => {
    const [content, setContent] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await axios.post(`http://localhost:3001/posts/${postId}/comments`,{
            content
        })
    }
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default CreateComment
