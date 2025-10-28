import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import styles from "./fundraiser-img.module.css";

export default function MyComponent(props) {
  const {
    setClickedIndex,
    previewImageData,
    handleDelete,
    disablefield1,
    handleImageClick,
    setIsOpen,
    S3URL,
  } = props;
  const [actions, setActions] = useState({ delete: false });
  const [, setHoveredImage] = useState(null);
  return (
    <div>
      <div className={styles.row}>
        {previewImageData?.map((val, index) =>
          index < 5 ? (
            index === 0 ? (
              <div className="d-block mt-3" key={index}>
                <div
                  className={`${styles.primary_image}  ${styles.step3_support_grid}`}
                  style={{
                    border: "2px dashed #c5d0d8",
                    borderRadius: "8px",
                    width: "160px",
                  }}
                  key={index}
                >
                  {!disablefield1 ? null : (
                    <MdDelete
                      color="red"
                      size={18}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "3px",
                        border: "1px solid #C5D0D8",
                        right: "10px",
                        position: "absolute",
                        top: "0px",
                      }}

                      onClick={() => handleDelete(index)}
                      onMouseEnter={() => {
                        setHoveredImage(index);
                        setActions({ ...actions, delete: true });
                      }}
                      onMouseLeave={() => {
                        setHoveredImage(null);
                        setActions({ ...actions, delete: false });
                      }}
                    />
                  )}
                  {val?.base64Data ? (
                    <>
                      <label
                        htmlFor="multi-image-upload "
                        className={styles.alignment_images}
                      >
                        <div
                          onMouseEnter={() => {
                            setHoveredImage(index);
                            setActions({ ...actions, delete: true });
                          }}
                          onMouseLeave={() => {
                            setHoveredImage(null);
                            setActions({ ...actions, delete: false });
                          }}
                        >
                          <div
                            className="position-relative"
                            onClick={disablefield1 ? handleImageClick : null}
                          >
                            <img
                              style={{
                                borderRadius: "8px",
                                width: "160px",
                                height: "147.5px",
                                position: "relative",
                              }}
                              src={val?.base64Data}
                              alt={`preview + ${index}`}
                              className=" cursor-pointer "
                            />
                          </div>
                          {!disablefield1 ? null : (
                            <MdDelete
                              color="red"
                              size={18}
                              style={{
                                backgroundColor: "white",
                                borderRadius: "3px",
                                border: "1px solid #C5D0D8",
                                right: "10px",
                                position: "absolute",
                                top: "0px",
                              }}

                              onClick={() => handleDelete(index)}
                              onMouseEnter={() => {
                                setHoveredImage(index);
                                setActions({ ...actions, delete: true });
                              }}
                              onMouseLeave={() => {
                                setHoveredImage(null);
                                setActions({ ...actions, delete: false });
                              }}
                            />
                          )}
                        </div>
                      </label>
                    </>
                  ) : (
                    <div onClick={disablefield1 ? handleImageClick : null}>
                      {val === "supportImage" ? null : (
                        <img
                          src={`${S3URL}${val}.jpg?v=
                          ${new Date().getTime()} `}
                          alt="Images"
                          width="160px"
                          height="150px"
                          style={{ borderRadius: "8px" }}
                        />
                      )}
                    </div>
                  )}
                  <label htmlFor="multi-image-upload">
                    <p className={styles.inner_text}>
                      {index === 0 && !val?.base64Data && disablefield1 ? (
                        <GrAdd
                          onClick={disablefield1 ? handleImageClick : null}
                          fontSize="25px"
                          style={{ color: "#D7DEE1" }}
                          className={styles.add_alignment}
                        />
                      ) : (
                        <GrAdd
                          fontSize="25px"
                          style={{ color: "transparent" }}
                          className="d-none"
                        />
                      )}
                    </p>
                  </label>
                </div>
              </div>
            ) : (
              <div className={`mt-3 ${styles.step3_support_grid}`} key={index}>
                <div
                  className={styles.PreviewImageContainer}
                  key={index}
                  onClick={() => setClickedIndex(index)}
                >
                  {!disablefield1 && val !== "supportImage" ? null : (
                    <MdDelete
                      color="red"
                      size={18}
                      style={{
                        backgroundColor: "white",
                        borderRadius: "3px",
                        border: "1px solid #C5D0D8",
                        position: "absolute",
                        top: "0px",
                        right: "8px",
                      }}
                      className={
                        val === "supportImage" ? "d-none" : ""
                      }
                      onClick={() => handleDelete(index)}
                      onMouseOver={() => {
                        setHoveredImage(index);
                        setActions({ ...actions, delete: true });
                      }}
                      onMouseLeave={() => {
                        setHoveredImage(null);
                        setActions({ ...actions, delete: false });
                      }}
                    />
                  )}
                  {val?.base64Data ? (
                    <>
                      <label
                        className={styles.alignment_images}
                        htmlFor="multi-image-upload"
                      >
                        <div
                          onMouseEnter={() => {
                            setHoveredImage(index);
                            setActions({ ...actions, delete: true });
                          }}
                          onMouseLeave={() => {
                            setHoveredImage(null);
                            setActions({ ...actions, delete: false });
                          }}
                        >
                          <img
                            src={val?.base64Data}
                            alt={`preview + ${index}`}
                            width="160px"
                            height="120px"
                            style={{ borderRadius: "8px" }}
                            className={`${styles.support_img_preview} relative image_gaps cursor-pointer`}
                          />
                        </div>
                      </label>
                    </>
                  ) : val !== "supportImage" ? (
                    <img
                      src={`${S3URL}${val}.jpg?v=
                      ${new Date().getTime()} `}
                      alt="images"
                      width="160px"
                      height="150px"
                      style={{ borderRadius: "8px" }}
                    />
                  ) : null}
                  <label htmlFor="multi-image-upload">
                    <p className={styles.inner_text}>
                      {(index === 1 ||
                        index === 2 ||
                        index === 3 ||
                        index === 4) &&
                      !val?.base64Data &&
                      disablefield1 ? (
                        <div className="select" onClick={() => setIsOpen(true)}>
                          <GrAdd
                            fontSize="25px"
                            style={{ color: "#D7DEE1" }}
                            className={styles.add_alignment}
                          />
                        </div>
                      ) : (
                        <GrAdd
                          fontSize="25px"
                          style={{ color: "transparent" }}
                          className="hidden"
                        />
                      )}
                    </p>
                  </label>
                </div>
              </div>
            )
          ) : null
        )}
      </div>
    </div>
  );
}

MyComponent.displayName = "MyComponent";
