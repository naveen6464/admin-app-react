import React from "react";
import { Modal } from "react-bootstrap";
import "./index.css";
import Button from "../button";
import { CircleSpinner } from "react-spinners-kit";

const Modals = (props) => {
  const {
    show,
    handleHideModal,
    title,
    className,
    TitleClassName,
    ModelClassName,
    ModalClass,
    Footer_Hide,
    OnClick,
    CancelText,
    ActionText,
    Header_class,
    styleActionBtn,
    Model_header_style,
    footer_style,
    size,
    buttonLoader,
    decline,
    disabled,
    btn_style1,
    btn_class1,
    buttonType,
    OnClick1,
    ActionBtnClass,
  } = props;

  return (
    <div
      className={`${show ? "custom-modal" : "d-none"} ${className}`}
      tabIndex="-1"
    >
      <Modal
        size={size}
        show={show}
        className={`custom-modal-content ${ModalClass}`}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        keyboard={false}
        onHide={handleHideModal}
      >
        <div
          style={Model_header_style}
          className={`rounded custom-modal-header-container ${ModelClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <Modal.Header closeButton className={Header_class}>
            <Modal.Title className={`custom-modal-header ${TitleClassName}`}>
              <header className="AddCategory">{title}</header>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={props.modal_body_class}>{props.children}</Modal.Body>
          <Modal.Footer className={Footer_Hide} style={footer_style}>
            <div className="d-flex justify-content-end">
              <Button
                type="button"
                btn_style={btn_style1}
                btn_class={`mx-3 ${btn_class1} cancel-btn`}
                variant="secondary"
                onClick={handleHideModal}
                disabled={disabled}
                text={`${CancelText || "Clear"}`}
              >
                Cancel
              </Button>

              {decline ? (
                <div className="decline-btn">
                  <Button
                    variant="primary"
                    type="decline"
                    style={styleActionBtn}
                    onClick={OnClick1}
                    btn_class={"decline-btn-color"}
                    disabled={disabled}
                    btn_style={{ opacity: disabled ? 0.5 : 1 }}
                  >
                    {" "}
                    {buttonLoader ? (
                      <span className="d-flex">
                        {" "}
                        <span
                          style={{
                            position: "relative",
                            left: "-10px",
                          }}
                        >
                          <CircleSpinner
                            className={{ paddingLeft: "10px" }}
                            size={18}
                            color="#fff"
                          />
                        </span>{" "}
                        {"Decline"}
                      </span>
                    ) : (
                      <span>{"Decline"}</span>
                    )}
                  </Button>
                </div>
              ) : null}

              <Button
                type={buttonType}
                btn_class={ActionBtnClass}
                onClick={OnClick}
                disabled={disabled}
                btn_style={{ opacity: disabled ? 0.5 : 1 } }
              >
                {" "}
                {buttonLoader ? (
                  <span className="d-flex">
                    {" "}
                    <span
                      style={{
                        position: "relative",
                        left: "-10px",
                      }}
                    >
                      <CircleSpinner
                        className={{ paddingLeft: "10px" }}
                        size={18}
                        color="#fff"
                      />
                    </span>{" "}
                    {ActionText ? `${ActionText}` : "Submit"}
                  </span>
                ) : (
                  <span>{ActionText ? `${ActionText}` : "Submit"}</span>
                )}
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Modals;
