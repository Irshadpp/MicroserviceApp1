import axios from "axios";
import React,{ useState } from "react"

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await axios.post('http://posts.com:3000/posts/create',{
            title
        });
        setTitle('');
    }
  return (
    <div className="max-w-md my-10 mx-auto p-6 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-semibold mb-4 text-center">Create Post</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500"
        />
      </div>
      <button
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default CreatePost
