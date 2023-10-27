import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './style1.css';
import { alertClasses } from '@mui/material';




const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function uploadDate(data)
{
// calling a constructor, can use other methods to extract info from returned value

// let day = date.getDate()
// let month = date.getMonth() + 1
// let year = date.getFullYear()
// let sec=date.getSeconds()


return <span>{data}</span>
}

function UploadDoc({data}) {

  const buttonStyle = {
    margin: '20px' 
  };

  const [enlargedImage, setEnlargedImage] = useState(null);
  const [base64Image, setBase64Image]=useState();
  const openImage = (imageUrl) => {
    setEnlargedImage(imageUrl);
  };

  const closeImage = () => {
    setEnlargedImage(null);
  };

  useEffect(()=>{
    getImage();
  },[])
  const[image,setImage]=useState()
  const[allImage,setAllimage]=useState(null)
  const submit = async (e) => {
    e.preventDefault(); // Prevent reloading
  
    if (image) {
      const base64String = await convertImageToBase64(image);
      setBase64Image(base64String);
  
      
      const d = new Date();
      const todaysdate = d.toLocaleDateString();
  
      const formData={
        image:base64String,
        userid: data.Mid,
        date:todaysdate
      }

  
      try {
        const result = await axios.post(process.env.REACT_APP_UPLOAD_IMAGE, formData);
        getImage();
      } catch (error) {
        // Handle any errors that may occur during the POST request
      }
    }
  };
  
  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result);
      };
      reader.readAsDataURL(imageFile);
    });
  };
  
  const onClick=(e)=>{
    
    setImage(e.target.files[0]);
  }
  const getImage=async()=>{
    const userid={
      id:data.Mid
    }
   
    const result= await axios.post(process.env.REACT_APP_GETIMAGE,userid);
   
    setAllimage(result.data.data)
    
  }
  
  if(allImage==null){
    return
  }

  return (
    <>
    <div>

    <h3> Upload your important medical documents here...  </h3>
    </div>
    
    <Button style={buttonStyle} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file
      <VisuallyHiddenInput acceot="image/" onChange={onClick} type="file" />
    </Button>
    <Button variant="contained" onClick={submit} >SUBMIT</Button>
    {/* {allImage.map((imageObject, index) => (
          <div key={index}>
            <img width="50"src={baseURL+ imageObject.image} />
         
          </div>
        ))} */}



      <h2>Uploaded Documents and Images</h2>
      <div className="gallery">
      
        {allImage.map((item, index) => (

          <div key={index} className="gallery-item">
            {item.type === 'document' ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                <img src="/path/to/document_icon.png"  />
                <div className="document-info">
               
                  {/* <span>{item.name}</span> */}
                  {/* <span>Document</span> */}
                </div>
              </a>
            ) : (
              <div onClick={() => openImage(item.image)}>
                <div className="image-info">
                  {/* <span>{item.name}</span> */}
                  {/* <span>name</span> */}
                </div>
                <img src={ item.image}  />
                <div className="image-info">
                {uploadDate(item.date)}
               
                  {/* <span>{item.name}</span> */}
                  {/* <span>28/8/23</span> */}
                 
               
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div className="image-modal">
          <div className="modal-content">
            <span className="close-btn" onClick={closeImage}>&times;</span>
            <img src={enlargedImage} alt="Enlarged" />
          </div>
        </div>
      )}
      
        
    </>
  );
}

export default UploadDoc