import React, { useEffect } from "react";
// import HeaderSection from "../../../components/header-section";
import { useState } from "react";
import { getConfigurations } from "../../../api/list";
import { useFormik } from "formik";
import InputField from "../../../components/form-control/input-elements/input";
import Button from "../../../components/button";
import "../settings.css";
import * as Yup from "yup";
import { updateConfiguration } from "../../../api/update";
import toast from "react-hot-toast";
import PageLoader from "../../../components/page-loader";
import { CircleSpinner } from "react-spinners-kit";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import RadioButton from "../../../components/radio-button";

function Configurations() {
  const [configurationsData, setConfigurationsData] = useState([]);
  const [Loader, setLoader] = useState(false);
  const [ButtonLoader, setButtonLoader] = useState(false);
  const [enableEdit, setEnableEdit] = useState(true);
  useEffect(() => {
    setLoader(true);
    getConfigurations(1).then((res) => {
      setLoader(false);
      setConfigurationsData(res?.data?.records[0]);
    });
  }, []);

  const InitialValues = {
    contributionOneDollar:
      configurationsData?.credits?.contributionOneDollar || "",
    contributionOneHour: configurationsData?.credits?.contributionOneHour || "",
    emailVerification: configurationsData?.credits?.emailVerification || "",
    maxPoints: configurationsData?.credits?.maxPoints || "",
    referralUser: configurationsData?.credits?.referralUser || "",
    signup: configurationsData?.credits?.signup || "",
    eventTruekarmaFees: configurationsData?.credits?.eventTruekarmaFees || "",
    fundraiserMinAmount: configurationsData?.credits?.fundraiserMinAmount || "",
    ticketMinAmount: configurationsData?.credits?.ticketMinAmount || "",
    charityMinAmount: configurationsData?.credits?.charityMinAmount || "",
    giftcardPaymentFee: configurationsData?.credits?.giftcardPaymentFee || "",
    contact_admin: configurationsData?.credits?.contact_admin || "",
  };

  const ErrorIcon = () => <HiOutlineExclamationCircle className="error-icon" />;
  const addErrorIcon = (message) => (
    <div className="d-flex ">
      <ErrorIcon />
      {message}
    </div>
  );

  const ValidationSchema = Yup.object().shape({
    contributionOneDollar: Yup.string().required(
      "Cash contribution is required"
    ),
    contributionOneHour: Yup.string().required(
      "Time contributions one hour is required"
    ),
    emailVerification: Yup.string().required("Email Verification is required"),
    referralUser: Yup.string().required("Referral user is required"),
    signup: Yup.string().required("Sign up is required"),
    maxPoints: Yup.string().required("Max points is required"),
    eventTruekarmaFees: Yup.string().required("Event fees is required"),
    fundraiserMinAmount: Yup.string().required("Fundraiser minimum amount is required"),
    ticketMinAmount: Yup.string().required("Event tickets minimum amount is required"),
    giftcardPaymentFee: Yup.string()
      .required("Gift card payment fee is required")
      .test(
        "min-value",
        "Gift card payment fee must be at least 3",
        (value) => {
          if (!value) return false;
          const numValue = parseFloat(value);
          return !isNaN(numValue) && numValue >= 3;
        }
      ),
  });

  const onSubmit = async (values) => {

    let credits = values;
    if (
      configurationsData?.credits?.contributionOneDollar !==
        formik.values.contributionOneDollar ||
      configurationsData?.credits?.contributionOneHour !==
        formik.values.contributionOneHour ||
      configurationsData?.credits?.emailVerification !==
        formik.values.emailVerification ||
      configurationsData?.credits?.maxPoints !== formik.values.maxPoints ||
      configurationsData?.credits?.contact_admin !==
        formik.values.contact_admin ||
      configurationsData?.credits?.referralUser !==
        formik.values.referralUser ||
      configurationsData?.credits?.signup !== formik.values.signup ||
      configurationsData?.credits?.eventTruekarmaFees !==
        formik.values.eventTruekarmaFees ||
      configurationsData?.credits?.fundraiserMinAmount !==
        formik.values.fundraiserMinAmount ||
      configurationsData?.credits?.ticketMinAmount !==
        formik.values.ticketMinAmount ||
      configurationsData?.credits?.charityMinAmount !==
        formik.values.charityMinAmount ||
      configurationsData?.credits?.giftcardPaymentFee !==
        formik.values.giftcardPaymentFee
    ) {
      let update = { credits };
      // delete values.eventTruekarmaFees;
      setButtonLoader(true);
      await updateConfiguration(update, configurationsData?.id).then((res) => {
        setButtonLoader(false);

        if (res.message === "success" || res.message === "Success") {
          setEnableEdit(true);
          toast.success("Configuration successfully updated");
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema: ValidationSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const handleKeyPress = (e, maxLength) => {
    const keyCode = e.keyCode || e.which;
    const keyValue = String.fromCharCode(keyCode);
    const numericRegex = /^[0-9.\b]+$/;

    if (
      keyValue === " " ||
      !numericRegex.test(keyValue) ||
      e.target.value.length >= maxLength
    ) {
      e.preventDefault();
    }
  };
  const CancelAction = () => {
    setEnableEdit(true);
    formik.resetForm();
  };

  return (
    <div>
      <div className="mt-3 mb-3">
        <div className="row">
          <div className="col-6">
            <div className="font-weight-bold fs-5 ">
              <b>{"Configurations"} </b>{" "}
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex justify-content-end">
              {!enableEdit ? (
                <div className="d-flex">
                  <Button
                    btn_class={"CancelBtnClass mx-3 "}
                    onClick={CancelAction}
                  >
                    Cancel
                  </Button>
                  <Button
                    type={"submit"}
                    btn_class={"ActionBtnClass"}
                    onClick={formik.handleSubmit}
                    disabled={ButtonLoader}
                  >
                    {" "}
                    {ButtonLoader ? (
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
                        {"Save"}
                      </span>
                    ) : (
                      <span>{"Save"}</span>
                    )}
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    setEnableEdit(false);
                  }}
                >
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <form>
          <div>
            {Loader ? (
              <div
                style={{
                  minHeight: "50vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <PageLoader />
              </div>
            ) : (
              <div>
                <div className="bg-white p-3 configurations-box">
                  <div className="mx-3 bg-white configurations-header">
                    Credit Configurations
                  </div>
                  <div className="row px-3">
                    <div className="col-6">
                      <div className="row">
                        <InputField
                          name="contributionOneDollar"
                          type="text"
                          placeholder="Enter cash contribution"
                          labelName="Cash Contribution*"
                          value={formik.values.contributionOneDollar}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                      </div>

                      <div className="error-space">
                        {formik.touched.contributionOneDollar &&
                          formik.errors.contributionOneDollar && (
                            <div className="error">
                              {addErrorIcon(
                                formik.errors.contributionOneDollar
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <InputField
                        name="contributionOneHour"
                        type="text"
                        placeholder="Enter time contribution"
                        labelName="Time Contribution*"
                        value={formik.values.contributionOneHour}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyPress={(e) => handleKeyPress(e, 25)}
                        disabled={enableEdit}
                      />
                      <div className="error-space">
                        {formik.touched.contributionOneHour &&
                          formik.errors.contributionOneHour && (
                            <div className="error">
                              {addErrorIcon(formik.errors.contributionOneHour)}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <InputField
                        name="emailVerification"
                        type="text"
                        placeholder="Enter email verification"
                        labelName="Email Verification*"
                        value={formik.values.emailVerification}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyPress={(e) => handleKeyPress(e, 25)}
                        disabled={enableEdit}
                      />
                      <div className="error-space">
                        {formik.touched.emailVerification &&
                          formik.errors.emailVerification && (
                            <div className="error">
                              {addErrorIcon(formik.errors.emailVerification)}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <InputField
                        name="referralUser"
                        type="text"
                        placeholder="Enter referral user "
                        labelName="Referral User*"
                        value={formik.values.referralUser}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyPress={(e) => handleKeyPress(e, 25)}
                        disabled={enableEdit}
                      />
                      <div className="error-space">
                        {formik.touched.referralUser &&
                          formik.errors.referralUser && (
                            <div className="error">
                              {addErrorIcon(formik.errors.referralUser)}
                            </div>
                          )}
                      </div>
                    </div>
                    <div className="col-6">
                      <InputField
                        name="maxPoints"
                        type="text"
                        placeholder="Enter Max Loyalty points "
                        labelName="Max Points*"
                        value={formik.values.maxPoints}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        onKeyPress={(e) => handleKeyPress(e, 25)}
                        disabled={enableEdit}
                      />
                      <div className="error-space">
                        {formik.touched.maxPoints &&
                          formik.errors.maxPoints && (
                            <div className="error">
                              {addErrorIcon(formik.errors.maxPoints)}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 configurations-box mt-3">
                  <div className="mx-3 bg-white configurations-header">
                    Fee Configuration
                  </div>
                  <div>
                    <div className="row px-3">
                      <div className="col-6 position-relative">
                        <InputField
                          style={{ paddingLeft: "25px" }}
                          name="eventTruekarmaFees"
                          type="text"
                          placeholder="Enter Event Fees"
                          labelName="Event Fees*"
                          value={formik.values.eventTruekarmaFees}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                        <div className="dollarFee">$</div>
                        <div className="error-space">
                          {formik.touched.eventTruekarmaFees &&
                            formik.errors.eventTruekarmaFees && (
                              <div className="error">
                                {addErrorIcon(formik.errors.eventTruekarmaFees)}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-6 position-relative">
                        <InputField
                          style={{ paddingLeft: "25px" }}
                          name="fundraiserMinAmount"
                          type="text"
                          placeholder="Enter donation minimum amount"
                          labelName="Fundraiser Minimum Donation Amount*"
                          value={formik.values.fundraiserMinAmount}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                        <div className="dollarFee">$</div>
                        <div className="error-space">
                          {formik.touched.fundraiserMinAmount &&
                            formik.errors.fundraiserMinAmount && (
                              <div className="error">
                                {addErrorIcon(formik.errors.fundraiserMinAmount)}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-6 position-relative">
                        <InputField
                          style={{ paddingLeft: "25px" }}
                          name="ticketMinAmount"
                          type="text"
                          placeholder="Enter minimum ticket amount"
                          labelName="Minimum Ticket Amount*"
                          value={formik.values.ticketMinAmount}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                        <div className="dollarFee">$</div>
                        <div className="error-space">
                          {formik.touched.ticketMinAmount &&
                            formik.errors.ticketMinAmount && (
                              <div className="error">
                                {addErrorIcon(formik.errors.ticketMinAmount)}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-6 position-relative">
                        <InputField
                          style={{ paddingLeft: "25px" }}
                          name="charityMinAmount"
                          type="text"
                          placeholder="Enter donation minimum amount"
                          labelName="Charity Minimum Donation Amount*"
                          value={formik.values.charityMinAmount}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                        <div className="dollarFee">$</div>
                        <div className="error-space">
                          {formik.touched.charityMinAmount &&
                            formik.errors.charityMinAmount && (
                              <div className="error">
                                {addErrorIcon(formik.errors.charityMinAmount)}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="col-6 position-relative">
                        <InputField
                          style={{ paddingLeft: "25px" }}
                          name="giftcardPaymentFee"
                          type="text"
                          placeholder="Enter gift card payment fee"
                          labelName="Gift Card Payment Fee*"
                          value={formik.values.giftcardPaymentFee}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          onKeyPress={(e) => handleKeyPress(e, 25)}
                          disabled={enableEdit}
                        />
                        <div className="dollarFee">$</div>
                        <div className="error-space">
                          {formik.touched.giftcardPaymentFee &&
                            formik.errors.giftcardPaymentFee && (
                              <div className="error">
                                {addErrorIcon(formik.errors.giftcardPaymentFee)}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 configurations-box mt-3 mb-3">
                  <div className="mx-3 bg-white configurations-header">
                    {`My Contact Admin's Mail`}
                  </div>
                  <div className="col-lg-12 mx-2 mt-2">
                    <div className="mt-2">
                      <RadioButton
                        label="Enable"
                        className={"radioBtn-size"}
                        value="enabled"
                        isChecked={formik.values.contact_admin === "enabled"}
                        onChange={formik.handleChange}
                        name="contact_admin"
                        disabled={enableEdit}
                      />
                    </div>
                    <div className="mt-3">
                      <RadioButton
                        label="Disable"
                        value="disabled"
                        className={"radioBtn-size"}
                        isChecked={formik.values.contact_admin === "disabled"}
                        onChange={formik.handleChange}
                        name="contact_admin"
                        disabled={enableEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Configurations;
