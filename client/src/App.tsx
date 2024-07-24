import './App.css'
import CreatePost from './CreatePost';
import ListPost from './ListPost';

function App() {
  return (
   <div>
    <CreatePost />
    <hr />
    <h1 className='text-3xl'>Posts</h1>
    <ListPost/>
   </div>
  );
}


export default App
