import React, { useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { hostConfig } from "../../config/index";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SponserImage = ({
  setEdtImages,
  edtimages,
  
}) => {
  const [Base64image1, setBase64image1] = useState(false);

  const [image1, setImage1] = useState({
    source: edtimages[0] || null,
    fileName: null,
    fileFormat: null,
  });

  const [isImageSelected, setIsImageSelected] = useState(false);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      if (file) {
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      }
    });
  };

  const imageChange = async (e, imageNumber) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileFormat = file?.name?.split(".")[1];
      const base64 = await convertBase64(file);
      const maxSize = 5 * 1024 * 1024;

      if (file.size > maxSize) {
        toast.error("Please select an image within 5MB in size.");
        return;
      }
      const updatedImages = [...edtimages];
      const updatedImage = {
        source: base64,
        fileName: `${Date.now()}`,
      };
      const imageIndex = imageNumber - 1;

      if (updatedImages[imageIndex]) {
        updatedImages.splice(imageIndex, 1);
      }

      updatedImages.splice(imageIndex, 0, updatedImage);
      const updatedArray = Object.values(updatedImages);
      setEdtImages(updatedArray);



      switch (imageNumber) {
        case 1:
          setBase64image1(true);
          setIsImageSelected(true); // Set image selected to true
          setImage1({
            source: base64,
            fileName: `${Date.now()}-bannerImage.${fileFormat}`,
            fileFormat,
          });
          break;
        default:
          break;
      }
    }
  };

  const inputRefs = useRef([]);
  const handleClick = (index) => {
    if (inputRefs.current[index]) { 
      inputRefs.current[index].click();
    }
  };

  const removeSelectedImage = (imageNumber) => {
    if (inputRefs.current[imageNumber]) {
      inputRefs.current[imageNumber].value = "";
    }
    switch (imageNumber) {
      case 0:
        setImage1({
          source: null,
          fileName: null,
          fileFormat: null,
        });
        setIsImageSelected(false); // Reset image selected to false
        break;
      default:
        break;
    }

    const updatedImages = [...edtimages];

    if (imageNumber <= updatedImages.length) {
      updatedImages.splice(imageNumber, 1);
    }

    setEdtImages(updatedImages);
  };

  return (
    <div className="Img_gallery">
      <div className="chose-file">
        <input
          className="dummy p-0 border-0"
          style={{ display: "none" }}
          accept=".png, .jpeg, .jpg"
          type="file"
          ref={(ref) => (inputRefs.current[0] = ref)}
          onChange={(e) => imageChange(e, 1)}
          onClick={() => handleClick(0)}
        />
      </div>

      <div className="preview" style={{ position: "relative" }}>
        {!isImageSelected && ( // Render "Choose image" if no image is selected
        <div>
          <div>
            <FiUpload
              onClick={() => handleClick(0)}
              style={{
                position: "absolute",
                zIndex: "1",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "20px",
                color: "#c5d0d8",
              }}
            />
          </div>
           <span className="Before_image text-[#066ADF] relative top-[60px] left-2 font-medium text-sm"  onClick={() => handleClick(0)} >Choose image</span>
           </div>
        )}

        {image1.source && (
          <div className="flex justify-center items-center">
            <MdDelete
              className="deleteiconform"
              style={{
                position: "absolute",
                zIndex: "5",
                color: "red",
                fontSize: "22px",
                left: "75%",
              }}
              onClick={() => removeSelectedImage(0)}
            />
            {!Base64image1 ? (
              <div  onClick={() => handleClick(0)}>
              <img
                style={{ zIndex: "3" }}
                src={`${hostConfig.EVENT_S3_URL}${image1.source}.jpg`}
                className={` image`}
                alt="Thumb1"
               
              />
              </div>
            ) : (
              <div onClick={() => handleClick(0)}>
              <img
                src={image1.source}
                className={` image ttttt rounded-full w-[80px] h-[80px] relative top-[20px]` }
                alt="Thumb5"
                
              />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SponserImage;
