
interface Comment{
  id: string,
  content: string
}
interface PostProps{
    comments: Comment[]
}


const ListComment:React.FC<PostProps> = ({comments}) => {
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
