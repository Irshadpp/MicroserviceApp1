
interface Comment{
  id: string,
  content: string,
  status: string
}
interface PostProps{
    comments: Comment[]
}


const ListComment:React.FC<PostProps> = ({comments}) => {
  return (
    <div className="mt-4 space-y-2">
      {comments.map((comment) => {
        let content;
        if(comment.status === "approved"){
          content = comment.content
        }else if(comment.status === "pending"){
          content = "This comment is awaiting moderation"
        }else if(comment.status === "rejected"){
          content = "This comment has been rejected"
        }
        return (<div key={comment.id} className="p-2 bg-gray-100 rounded-md shadow-sm">
          <p className="text-gray-800">{content}</p>
        </div>)
      })}
    </div>
  )
}

export default ListComment
