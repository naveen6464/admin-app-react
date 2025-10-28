/** **************************** Import Packages ****************************** */
import React, { useState } from "react";
// import { FiUpload } from "react-icons/fi";

/** **************************** Import Components ****************************** */
import PreviewImage from "./preview-img";
// import styles from "./fundraiser-img.module.css";
import Model from "../model";
import CropImages from "../../components/crop-images";

/** **************************** Import Utils ****************************** */
import { convertBase64 } from "../../utils/common";

export default function MyComponent(props) {
  const {
    // imageData,
    setImageError,
    disablefield,
    setImages,
    images,
    setPreviewImage,
    previewImage,
    setBase64Image,
    S3URL,
    // ...others
  } = props;
  //
  const [imgSrc, setImgSrc] = useState("");

  const [clickedIndex, setClickedIndex] = useState(0);
  const [isOpne, setIsOpen] = useState(false);

  const handleChange = (targetData) => {
    const fileData = targetData[0];

    // File validation
    const acceptedFileTypes = [
      "image/png",
      "image/svg+xml",
      "image/jpeg",
      "image/jpg",
    ];
    const validFileType = acceptedFileTypes.includes(fileData?.type);

    if (!validFileType) {
      setImageError(
        "Please upload images of type PNG, SVG, JPG, or JPEG only."
      );
      setTimeout(() => setImageError(null), 5000);
      return;
    }

    if (fileData?.size >= 5242880) {
      setImageError("Please upload image less than 5mb image");
      setTimeout(() => setImageError(null), 5000);
      return;
    }
    convertBase64(fileData).then((res) => {
      fileData.timeStamp = Date.now();
      fileData.base64Data = res;
      fileData.s3Upload = res?.replace(/^data:image\/\w+;base64,/, "");
      const newArray = previewImage?.data;
      newArray[clickedIndex] = fileData;
      setPreviewImage({
        data: newArray,
        timeStamp: Date.now(),
      });
      if (images[clickedIndex]?.base64Data) {
        const imageNewArray = images;
        imageNewArray[clickedIndex] = fileData;
        setImages(imageNewArray);
        return imageNewArray;
      } else {
        const data = [...images, fileData];
        setImages([...images, fileData]);
        return data;
      }
    });
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    const updatedPreviewData = [...previewImage.data];
    updatedPreviewData[index] = "supportImage"; // Replace deleted image with a placeholder

    const updatedImages = images.filter((_, i) => i !== index);

    setPreviewImage({
      ...previewImage,
      data: updatedPreviewData,
      timeStamp: Date.now(),
    });
    setImages(updatedImages);
    setBase64Image(updatedPreviewData);
  };

  const handleImageClick = () => {
    setIsOpen(!isOpne);
    setClickedIndex(0);
  };

  const handleOpenorClose = () => {
    setIsOpen(!isOpne);
  };

  return (
    <div className="mt-2">
      <>
        <PreviewImage
          handleImageClick={handleImageClick}
          setClickedIndex={setClickedIndex}
          images={images}
          previewImageData={previewImage?.data}
          handleDelete={handleDelete}
          disablefield1={disablefield}
          setIsOpen={setIsOpen}
          S3URL= {S3URL}
        />
      </>
      {isOpne === true ? (
        <Model
          size="xl"
          show={isOpne}
          Footer_Hide="d-none"
          title={"Crop image"}
          handleHideModal={handleOpenorClose}
          modalDialogClass={"crop-model"}
          modelBodyOr="model_padding"
        >
          <div className="flex">
            <CropImages
              handleSave={handleChange}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
              handleCancel={handleOpenorClose}
            />
            {imgSrc?.length === 0 ? (
              <span className="ml-4 mt-10">
                <b>Supported </b>: Please upload an image landscape format of
                PNG and JPG with a maximum size of 5 MB
              </span>
            ) : null}
          </div>
        </Model>
      ) : null}
    </div>
  );
}

MyComponent.displayName = "MyComponent";
