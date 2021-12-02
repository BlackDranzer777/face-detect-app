import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import NewPost from './components/NewPost';
import Upload from './images/upload.png';

function App() {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  useEffect(() => {        
    const getImage = () => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () =>{
        setImage({
          url: img.src,
          width: img.width,
          height: img.height,
        });
      };
    };
    file && getImage();
  },[file]);

  console.log(image);

  return (
    <div className="App">
      <Navbar/>
      {image ? (<NewPost image={image}/>) : (
      <div className="newPostCard">
        <div className="addPost">
            <img
              src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/77300669-568264500630139-1347298966662846005-n-1587420034.jpg" 
              alt=""
              className="avatar"
            />
            <div className="postForm">
              <input 
                type="text"
                placeholder="What's on your mind ?"
                className="postInput"
              />
              <label htmlFor="file">
                <img src={Upload} alt="" className="addImg" />
                <button>Send</button>
              </label>
              <input onChange={e => setFile(e.target.files[0])} id="file" style={{display:"none"}} type="file" /> 
            </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
