import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { IoMdClose } from "react-icons/io";
import Button from "../../button";
import toast from "react-hot-toast";
import { CircleSpinner } from "react-spinners-kit";

export default function PromoCodeModal(props) {
  const {
    handleSaveModal,
    title,
    show,
    TitleClassName,
    CancelText,
    SubmitText,
    SubmitColor,
    value,
    values, 
    openPopup2,
    formikprops,
    setPromocodeerror,
    discount,
    boderhide,
    footerhide,
  } = props;
  const [btnLoader, ] = useState(false);

  const handleupdate = async (value) => {
    let codeLimitExceeded = false;
    const newErrors = {};
    let hasDuplicates = false;
    let hasDuplicatescode = false;
    let dollardiscount = false;
    const code = new Set();

    if (discount === "DollarDiscount") {
      value.discountSymbol = "dollar";
      value.PercentageDiscount = "";
    } else if (discount === "PercentageDiscount") {
      value.discountSymbol = "percentage";
      value.DollarDiscount = "";
    }

    await values.promoCode.forEach((promo, index) => {
      if (parseInt(promo.codeLimit) > parseInt(values.totalNumberOfTicket)) {
        codeLimitExceeded = true;
        toast.error("Code Limit cannot exceed the Total Number of Tickets.");
        // setStoreError(true);
        newErrors[`promoCode[${index}].codeLimit`] =
          "Code Limit cannot exceed the Total Number of Tickets.";
      }
    });

    // promocode code validation
    await values.promoCode.forEach((promo, index) => {
      const promoCodeLowerCase = promo.code.toLowerCase();

      if (code.has(promoCodeLowerCase)) {
        hasDuplicatescode = true;
        toast.error("Duplicate promocode is not allowed.");
        // setStoreError(true);
        newErrors[`promoCode[${index}].code`] =
          "Duplicate promocode is not allowed.";
      } else {
        code.add(promoCodeLowerCase);
        setPromocodeerror("");
      }
    });

    if (discount === "DollarDiscount") {
      values.eventTicket.forEach((ticket, index) => {
        const ticketPrice = parseFloat(ticket.price);
        const dollarDiscount = parseFloat(value.DollarDiscount);

        if (dollarDiscount >= ticketPrice) {
          dollardiscount = true;
          toast.error("DollarDiscount cannot exceed the ticket price.");
          // setStoreError(true);
          newErrors[`eventTicket[${index}].DollarDiscount`] =
            "DollarDiscount cannot exceed the ticket price.";
        }
      });
    }
    if (
      codeLimitExceeded ||
      hasDuplicates ||
      hasDuplicatescode ||
      dollardiscount
    ) {
      return;
    }
  await handleSaveModal(value);  
  };

  const handleCloseUpdate = async (value) => {
    let codeLimitExceeded = false;
    const newErrors = {};
    let hasDuplicates = false;
    let hasDuplicatescode = false;
    let dollardiscount = false;
    const code = new Set();

    if (discount === "DollarDiscount") {
      value.discountSymbol = "dollar";
      value.PercentageDiscount = "";
    } else if (discount === "PercentageDiscount") {
      value.discountSymbol = "percentage";
      value.DollarDiscount = "";
    }

    await values.promoCode.forEach((promo, index) => {
      if (parseInt(promo.codeLimit) > parseInt(values.totalNumberOfTicket)) {
        codeLimitExceeded = true;
        toast.error("Code Limit cannot exceed the Total Number of Tickets.");
        // setStoreError(true);
        newErrors[`promoCode[${index}].codeLimit`] =
          "Code Limit cannot exceed the Total Number of Tickets.";
      }else{
        // setStoreError(false);
      }
    });

    // promocode code validation
    await values.promoCode.forEach((promo, index) => {
      const promoCodeLowerCase = promo.code.toLowerCase();

      if (code.has(promoCodeLowerCase)) {
        hasDuplicatescode = true;
        toast.error("Duplicate promocode is not allowed.");
        // setStoreError(true);
        newErrors[`promoCode[${index}].code`] =
          "Duplicate promocode is not allowed.";
      } else {
        code.add(promoCodeLowerCase);
        setPromocodeerror("");
        // setStoreError(false);
      }
    });

    if (discount === "DollarDiscount") {
      values.eventTicket.forEach((ticket, index) => {
        const ticketPrice = parseFloat(ticket.price);
        const dollarDiscount = parseFloat(value.DollarDiscount);

        if (dollarDiscount >= ticketPrice) {
          dollardiscount = true;
          toast.error("DollarDiscount cannot exceed the ticket price.");
          // setStoreError(true);
          newErrors[`eventTicket[${index}].DollarDiscount`] =
            "DollarDiscount cannot exceed the ticket price.";
        }else{
          // setStoreError(false);
        }
      });
    }
    if (
      codeLimitExceeded ||
      hasDuplicates ||
      hasDuplicatescode ||
      dollardiscount
    ) {
      return;
    }
  await handleSaveModal(value);  
  };

  const hasErrorsInPromoCode = (errors) => {
    return (
      errors &&
      errors.promoCode &&
      Array.isArray(errors.promoCode) &&
      errors.promoCode.some((promo) => Object.keys(promo).length > 0 )
    );
  };

 
  return (
    <Modal
      show={show}
      className="custom-modal-content"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={`${boderhide} mt-3 mb-3`}>
        <header className="AddCategory">{title}</header>
        <Modal.Title className={`custom-modal-header ${TitleClassName}`}>
          <div
            style={{ marginRight: "15px" }}
            
            onClick={() =>  hasErrorsInPromoCode(formikprops)  ? null : handleCloseUpdate(value)}
          >
            <IoMdClose />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer className={`${footerhide}`}>
        <Button
          // onClick={() => handleHideModal(formik)}
          btn_style={{
            backgroundColor: "#fff",
            border: "1px solid grey",
            color: "grey",
          }}
          onClick={() =>  hasErrorsInPromoCode(formikprops)  ? null : handleCloseUpdate(value)}
          disabled={hasErrorsInPromoCode(formikprops) }
        >
          {CancelText || "Cancel"}
        </Button>

        <Button
          variant="primary"
          text={`${SubmitText || "Save"}`}
          type={`${SubmitColor || "primary"}`}
          onClick={() => handleupdate(value)}
          disabled={hasErrorsInPromoCode(formikprops) || btnLoader}
        >
          {openPopup2 === true ? (
            "delete"
          ) : btnLoader ? (
            <div>
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
                Save{" "}
              </span>
            </div>
          ) : (
            "Save"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
