import React, { useState, useRef } from "react";
import "./crop-images.css";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "../../components/canvas-preview";
import { useDebounceEffect } from "../../components/use-debounce-effect";
import "react-image-crop/dist/ReactCrop.css";
import Button from "../../components/button";
import { FiUpload } from "react-icons/fi";
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CropImages(props) {
  const { setImgSrc, imgSrc, AspectRatio } = props;
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const hiddenAnchorRef = useRef(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 100, // Initial width (percentage of the image width)
    aspect: 1, // Aspect ratio for a square
  });
  const [completedCrop, setCompletedCrop] = useState();
  const [, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect] = useState(
    AspectRatio === "4/3"
      ? 4 / 3
      : AspectRatio === "16/16"
      ? 16 / 16
      : AspectRatio === "Banner"  
      ? 4 / 3
      : 16 / 9
  );

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Check if the file size is more than 5 MB
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error(
          "Selected image is too large. Please choose an image smaller than 5 MB."
        );
        return;
      }
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  const resetStates = () => {
    setImgSrc(""); // Reset the image source
    setCrop(undefined); // Reset the crop state
    setCompletedCrop(undefined); // Reset the completedCrop state
    setScale(1); // Reset the scale state
    setRotate(0); // Reset the rotate state

    // Reset refs
    previewCanvasRef.current = null;
    imgRef.current = null;
    hiddenAnchorRef.current = null;
    blobUrlRef.current = "";
  };
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
    resetStates();
    props.handleSave([blob]);
  }

  // Function to calculate optimal scale based on aspect ratio
  const calculateOptimalScale = (cropWidth, cropHeight, aspectRatio) => {
    const cropAspectRatio = cropWidth / cropHeight;

    if (cropAspectRatio > aspectRatio) {
      // Image is wider than the desired aspect ratio
      return aspectRatio / cropAspectRatio;
    } else {
      // Image is taller than or equal to the desired aspect ratio
      return 1; // No scaling needed
    }
  };

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef?.current &&
        previewCanvasRef?.current
      ) {
        // Calculate the optimal scale based on the aspect ratio
        const optimalScale = calculateOptimalScale(
          completedCrop.width,
          completedCrop.height,
          AspectRatio === "4/3"
            ? 4 / 3
            : AspectRatio === "16/16"
            ? 16 / 16
            : AspectRatio === "Banner"
            ? 4 / 3
            : 16 / 9 // Replace with your desired aspect ratio
        );

        // Use the optimal scale for canvas preview
        canvasPreview(
          imgRef?.current,
          previewCanvasRef?.current,
          completedCrop,
          optimalScale,
          rotate
        );
      }
    },
    100,
    [completedCrop, rotate]
  );

  return (
    <div className="App">
      <div className="Crop-Controls">
        <input
          className="multi_image_input"
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
        {!imgSrc ? (
          <label htmlFor="fileInput">
            <div className="Crop_image_input">
              <FiUpload color="gray" size="24px" className="inline" />
            </div>
          </label>
        ) : null}

        {/*   */}
      </div>
      <div className="row">
        {!!imgSrc && (
          <div className="col-5">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect} // Set the calculated aspect ratio
              maxWidth={812}
              style={{ maxWidth: "150px" }}
              locked
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
        <div className="col-7 d-flex align-items-center">
          {imgSrc !== "" && (
            <div
              className="d-flex"
              onClick={() => {
                setImgSrc("");
              }}
            >
              <div className="delete-image">
                <MdDelete
                  className="flex items-center relative top-[-1]"
                  color="#e83147"
                  size={18}
                />{" "}
                Delete
              </div>
            </div>
          )}
        </div>
      </div>
      {imgSrc.length > 0 ? (
        <div className="text-left">
          <span>
            <b>Supported </b>: Please upload an image landscape format of PNG
            and JPG with a maximum size of 5 MB
          </span>
        </div>
      ) : null}
      {imgSrc === "" ? null : (
        <div className="mt-3">
          {!!completedCrop && (
            <>
              <div
                className={
                  AspectRatio === "4/3"
                    ? "square"
                    : AspectRatio === "16/16"
                    ? "differ"
                    : AspectRatio === "Banner"
                    ? "square"
                    : "normal"
                }
              >
                {/* "banner-img" */}
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
              <div className="d-flex justify-content-end mt-3">
                <Button
                  btn_style={{
                    backgroundColor: "#ffff",
                    color: "grey",
                    border: "1px solid grey",
                  }}
                  type="button"
                  btn_class="mx-3"
                  onClick={() => props.handleCancel()}
                >
                  Cancel
                </Button>
                <Button type="button" onClick={() => onDownloadCropClick()}>
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
