import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdArrowDropdown } from "react-icons/io";
import toast from "react-hot-toast";

// Validation schema using Yup
const promoCodeSchema = Yup.object()
  .shape({
    codeExpiryDate: Yup.date().required("Expiry Date is required"),
    code: Yup.string()
      .required("Code is required")
      .max(10, "Code limit must be in 10 characters"),
    codeLimit: Yup.string().required("Code Limit is required"),
    PercentageDiscount: Yup.number().max(100, "Discount can't be more than 100%"),
    DollarDiscount: Yup.number(),
  })
  .test("at-least-one", "Discount is required", function (value) {
    if (!value.PercentageDiscount && !value.DollarDiscount) {
      return this.createError({
        path: "PercentageDiscount",
        message: "Discount is required",
      });
    }
    return true;
  });
const PromoCodeModalAdd = ({
  show,
  getAddPromovalues,
  TitleClassName,
  promoCodeValue,
  handleHideModal,
  totalnotickets,
  Model_header,
  model_footer,
  eventtickets,
}) => {
  const promocodeapi = promoCodeValue;

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [lastId, setLastId] = useState(null);
  const [discountType, setDiscounttype] = useState("percentage");


  const getLastId = () => {
    if (promocodeapi && promocodeapi.length > 0) {
      const lastPromoCode = promocodeapi[promocodeapi.length - 1];
      setLastId(lastPromoCode.id);
    }
  };

  const LetterValidation = (e) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const letterRegex = /^[A-Za-z0-9]+$/; // Regular expression to match letters and spaces
    const inputValue = e.target.value + keyValue;

    // Check if the input contains only letters and spaces and does not start with a space
    if (!letterRegex.test(inputValue) || inputValue.length > 10) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    getLastId();
  }, [getLastId, promoCodeValue]);

  const handleKeyPress = (e, maxLength) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9\b]+$/;

    if (
      keyValue === " " ||
      !numericRegex.test(keyValue) ||
      e.target.value.length >= maxLength
    ) {
      e.preventDefault();
    }
  };


  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      onHide={handleHideModal}
      className="custom-modal-content"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className={Model_header}>
        <Modal.Title className={`custom-modal-header ${TitleClassName}`}>
          <header className="AddCategory pt-2">PromoCode</header>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            [discountType === "percentage"
              ? "PercentageDiscount"
              : "DollarDiscount"]: "",
            codeExpiryDate: null,
            code: "",
            codeLimit: "",
            id: lastId + 1,
            discountSymbol: discountType,
          }}
          validationSchema={promoCodeSchema}
          onSubmit={(values, { setSubmitting, setErrors }) => {
            // values.DollarDiscount = Number(values.DollarDiscount);
            if (discountType === "dollar") {
              delete values.PercentageDiscount;
            }
            if (discountType === "percentage") {
              delete values.DollarDiscount;
            }

            const isDuplicateCode = promoCodeValue.some(
              (promo) => promo.code === values.code
            );

            const isDiscountcheck = eventtickets.some((discount) => {
              const PriceValue = Number(discount.price);
              return PriceValue <= values.DollarDiscount;
            });

            if (!values.PercentageDiscount && !values.DollarDiscount) {
              setShowErrorMessage(true);
            } else {
              setShowErrorMessage(false);
            }

            const validationErrors = {};
            if (isDuplicateCode) {
              validationErrors.code =
                "This code is already used. Please enter a different code.";
            }

            if (values.codeLimit > totalnotickets) {
              validationErrors.codeLimit =
                "Code Limit can't exceed the Total Number of Tickets.";
            }

            if (isDiscountcheck) {
              toast.success("Dollar discount can't exceed the ticket price.");
              validationErrors.DollarDiscount =
                "Dollar discount can't exceed the ticket price.";
            }

           
            // Check if there are any validation errors
            if (Object.keys(validationErrors).length > 0) {
              setErrors(validationErrors);
            } else {
              handleHideModal();
              getAddPromovalues(values);
            }
            setSubmitting(false);

            setDiscounttype("percentage");
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="row">
                <div className="col-lg-6 col-sm-12 pt-2">
                  <div className="form-group">
                    <div>
                      <label htmlFor="discount">Discount*</label>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="select-position">
                          <select
                            type="text"
                            id="discountType"
                            name="discountType"
                            className="form-control editaddmodelpercentage"
                            onChange={(e) => {
                              setFieldValue("discountSymbol", e.target.value);
                              if (e.target.value === "percentage") {
                                setFieldValue(`DollarDiscount`, "");
                              }
                              if (e.target.value === "dollar"){
                                setFieldValue(`PercentageDiscount`, "");
                              }
                              setDiscounttype(e.target.value);
                            }}
                          >
                            <option value="percentage">%</option>
                            <option value="dollar">$</option>
                          </select>
                          <div className="select-absolute">
                            <IoMdArrowDropdown />
                          </div>
                        </div>
                        <Field
                          type="text"
                          id={
                            discountType === "percentage"
                              ? "PercentageDiscount"
                              : "DollarDiscount"
                          }
                          name={
                            discountType === "percentage"
                              ? "PercentageDiscount"
                              : "DollarDiscount"
                          }
                          className="form-control editaddmodel2"
                          onKeyPress={(e) =>
                            discountType === "percentage"
                              ? handleKeyPress(e, 3)
                              : handleKeyPress(e, 5)
                          }
                          placeholder="Enter discount"
                        />
                      </div>
                      <div className="error-space">
                        <ErrorMessage
                          name="DollarDiscount"
                          component="div"
                          className="error_txt2"
                        />
                        <ErrorMessage
                          name="PercentageDiscount"
                          component="div"
                          className="error_txt2"
                        />
                        {showErrorMessage && (
                          <div className="error">Fill at least one field</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12 pt-2">
                  <div className="form-group">
                    <label htmlFor="codeExpiryDate">Expiry Date*</label>
                    <DatePicker
                      id="codeExpiryDate"
                      name="codeExpiryDate"
                      className="form-control editaddmodel"
                      maxDate={new Date("01-01-5000")}
                      minDate={new Date()}
                      selected={values?.codeExpiryDate}
                      onChange={(date) => {
                        // Update the codeExpiryDate field when the date is selected
                        setFieldValue("codeExpiryDate", date);
                      }}
                      placeholder="MM/DD/YYYY"
                    />
                    <div className="error-space">
                      <ErrorMessage
                        name="codeExpiryDate"
                        component="div"
                        className="error_txt2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="code">Code*</label>
                    <Field
                      type="text"
                      id="code"
                      name="code"
                      className="form-control editaddmodel "
                      onChange={(e) => {
                        const uppercaseValue = e.target.value.toUpperCase();
                        setFieldValue("code", uppercaseValue);
                      }}
                      placeholder="Enter PromoCode"
                      onKeyPress={LetterValidation}
                    />
                    <div className="error-space">
                      <ErrorMessage
                        name="code"
                        component="div"
                        className="error_txt2"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="codeLimit">Code Limit*</label>
                    <Field
                      type="text"
                      id="codeLimit"
                      name="codeLimit"
                      placeholder="Enter Code Limit"
                      className="form-control editaddmodel"
                      onKeyPress={(e) => handleKeyPress(e, 5)}
                    />
                    <div className="error-space">
                      <ErrorMessage
                        name="codeLimit"
                        component="div"
                        className="error_txt2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`modal-footer ${model_footer}`}>
                <Button
                  variant="secondary"
                  type="button"
                  btn_style={{
                    border: "1px solid #cdcdcd",
                    color: "black",
                    backgroundColor: "#fff",
                  }}
                  onClick={handleHideModal}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default PromoCodeModalAdd;
