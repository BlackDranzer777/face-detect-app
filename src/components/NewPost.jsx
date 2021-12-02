import React, {useRef, useEffect, useState} from 'react';
import * as faceapi from 'face-api.js';
import './NewPost.css';
export default function NewPost({image}) {

    const {url, width, height} = image;
    const [faces, setFaces] = useState([]);
    const [friends, setFriends] = useState([]);
    const imgRef = useRef();
    const canvasRef = useRef();

    const handleImage = async () => {
    const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
    // .withFaceLandmarks()
    // .withFaceExpressions();
    setFaces(detections.map(d => Object.values(d.box)));
    // canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
    // faceapi.matchDimensions(canvasRef.current, {
    //   width,
    //   height
    // }); //this will draw marks on the picture
    
    // const resized = faceapi.resizeResults(detections, {
    //   width,
    //   height
    // });
    // faceapi.draw.drawDetections(canvasRef.current, resized);
    // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
  };

  const addFriend = (e) => {
    setFriends(prev => ({...prev, [e.target.name] : e.target.value}))
  }
  console.log(friends);
  const enterCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow"
    faces.map((face) => {
      console.log(face[0]);
      return ctx.strokeRect(face[0], face[1], face[2], face[3]);
    });
  }

  useEffect(() => {
    const loadModels = () => {
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ])
      .then(handleImage)
      .catch((error) => {
        console.log(error);
      })
    }
    imgRef.current && loadModels()
  },[])

    return (
        <div className="container">
           <div className="left" style={{width,height}}>
             <img ref={imgRef} crossOrigin="anonymous" style={{width,height}} src={url} alt="" />
             <canvas onMouseEnter={enterCanvas} ref={canvasRef} width={width} height={height}/>
             {faces.map((face,i) => {
               return (
               <input 
                name={`input${i}`} 
                onChange={addFriend} 
                style={{left:face[0], top: face[1] + face[3] + 5}} 
                type="text" 
                placeholder="Tag a friend" 
                key={i} 
                className="friendInput"/>)
             })}
           </div>
           <div className="right">
             <h1>Share your post</h1>
             <input 
                type="text"
                placeholder="What's on your mind ?"
                className="rightInput"
              />
              {
                friends && (
                  <span className="friends">with<span className="name">{Object.values(friends) + " "}</span></span>
                )
              }
              <button className="rightButton">Send</button>
           </div>
        </div>
    )
}
