import axios from "axios"
import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import ListComment from "./ListComment";

interface Post{
    id:string,
    title:string,
    comments:string[]
}

type PostsResponse = Record<string, Post>;

const ListPost: React.FC = () => {
    const [posts, setPosts] = useState<PostsResponse>({});
    const fetchPost = async() =>{
        try {
            const res = await axios.get<PostsResponse>("http://localhost:3010/posts");
            console.log(res.data)
            setPosts(res.data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchPost();
    },[]);
    console.log(posts)
    const postArr = Object.values(posts)
    return (
        <div className="flex space-x-6 overflow-x-auto p-4">
          {postArr.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 w-80 flex-shrink-0"
            >
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              <CreateComment postId={post.id}/>
              <ListComment comments={post.comments}/>
            </div>
          ))}
        </div>
      );
}

export default ListPost
