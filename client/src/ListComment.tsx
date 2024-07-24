import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface PostProps{
    postId: string
}

interface Comment{
    id: string
    content: string
}

const ListComment:React.FC<PostProps> = ({postId}) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const fetchComment = async () =>{
        try {
            const res = await axios.get<Comment[]>(`http://localhost:3001/posts/${postId}/comments`);
            setComments(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchComment();
    },[]);
  return (
    <div className="mt-4 space-y-2">
      {comments.map((comment) => (
        <div key={comment.id} className="p-2 bg-gray-100 rounded-md shadow-sm">
          <p className="text-gray-800">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}

export default ListComment
