import React, { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { hostConfig } from "../../config";
import { toast } from "react-hot-toast";
import "./single-img.css";
import Model from "../model";
import CropImages from "../../components/crop-images";
import { RiEdit2Fill } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";

export const SingleImgComponent = (props) => {
  const {
    setEdtImages,
    edtImages,
    enableSaveBtn,
    profileImage,
    image1,
    setImage1,
    Base64image1,
    setBase64image1,
    bucket,
    newsImageValue,
    newsImage,
    AspectRatio,
    deleteImage,
    profileImageValue,
  } = props;
  const [, setEnableModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    if (edtImages.length !== 0) {
      setEnableModal(true);
    } else {
      setEnableModal(false);
    }
  });

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

  console.log(profileImage, "asfsdgd0")
  const imageChange = async (targetData) => {
    // if (e.target.files && e.target.files.length > 0) {
    const file = targetData[0];
    const fileFormat = file?.name?.split(".")[1];
    const base64 = await convertBase64(file);
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      toast.error("Please select an image within 5MB in size.");
      return;
    }
    const updatedImages = [...edtImages];
    const updatedImage = {
      source: base64,
      fileName: `${Date.now()}`,
    };
    const imageIndex = 1 - 1;

    if (updatedImages[imageIndex]) {
      updatedImages.splice(imageIndex, 1);
    }

    updatedImages.splice(imageIndex, 0, updatedImage);
    const updatedArray = Object.values(updatedImages);
    setEdtImages(updatedArray);

    switch (1) {
      case 1:
        setBase64image1(true);
        setImage1({
          source: base64,
          fileName: `${Date.now()}-bannerImage.${fileFormat}`,
          fileFormat,
        });
        break;

      default:
        break;
    }
    setOpenModal(false);
    // }
  };

  const inputRefs = useRef([]);
  const handleClick = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].click();
    }
  };

  const CancelAction = () => {
    setOpenModal(false);
    // setImgSrc("");
    // setBase64image1(false);
    // setImage1({
    //   source: profileImage,
    //   fileName: null,
    //   fileFormat: null,
    // });
    // setEdtImages([]);
  };

  return (
    <div className="">
      {enableSaveBtn === true ? (
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
      ) : null}

      {profileImageValue === undefined ||
      profileImageValue === null ||
      profileImageValue === false ||
      newsImage === false ? (
        <>
          <div className="single-image d-flex justify-content-center align-items-center ">
            <div className="">
              <FiUpload
                onClick={() => setOpenModal(true)}
                className="d-flex justify-content-center mx-5 cursor-pointer"
              />
              <div
                className="text-center text-primary under-line cursor-pointer"
                onClick={() => setOpenModal(true)}
              >
                Browse File
              </div>
            </div>
            <p></p>
          </div>
        </>
      ) : (
        <div className="position-relative_icon">
          <div
            className="preview_user_profile rounded-full"
            style={{ position: "relative" }}
          >
            {image1.source && (
              <div className="deleteandimg" style={{ position: "relative" }}>
                {!Base64image1 ? (
                  <div>
                    <img
                      style={{ zIndex: "3" }}
                      src={
                        newsImage
                          ? newsImageValue
                          : `${
                              hostConfig.TRUEKARMA_S3_URL
                            }${bucket}/${profileImage}.jpg?v=${new Date().getTime()}`
                      }
                      className={`single-image`}
                      alt="Thumb1"
                    />
                  </div>
                ) : newsImage === true ? (
                  <div>
                    <img
                      src={newsImageValue}
                      className={`single-image`}
                      alt="Thumb5"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={image1?.source}
                      className={`single-image`}
                      alt="Thumb5"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          {enableSaveBtn === true ? (
            <div className="position-absolute_icon">
              <RiEdit2Fill
                onClick={() => setOpenModal(true)}
                color="#2285F9"
                size={20}
                className="cursor-pointer edit-profile-icon"
              />
              <MdDelete
                onClick={deleteImage}
                color="#e83147"
                size={20}
                className="cursor-pointer edit-profile-icon mx-2"
              />
            </div>
          ) : null}
        </div>
      )}

      {enableSaveBtn === true ? (
        <Model
          size="xl"
          show={openModal}
          Footer_Hide="d-none"
          title={"Upload Image"}
          handleHideModal={CancelAction}
          modalDialogClass={"crop-model"}
          modelBodyOr="model_padding"
        >
          <div className="flex">
            <CropImages
              AspectRatio={AspectRatio}
              handleSave={imageChange}
              imgSrc={imgSrc}
              setImgSrc={setImgSrc}
              handleCancel={CancelAction}
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
};
