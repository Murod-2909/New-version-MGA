import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { sendContact } from "../../reduxToolkit/messageSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Extracted from the Contact page so any page (service pages, project pages, …)
// can drop in a working "contact us" form. presetSubject lets a page pre-fill
// what the inquiry is about (e.g. a specific service) without any backend change —
// it's just the free-text "subject" field on the existing /create-contact/ endpoint.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const InquiryForm = ({ presetSubject = "" }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: presetSubject,
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Same route pattern (e.g. one /services/:slug page linking to another) keeps this
  // component instance mounted, so useState's initial value alone won't pick up a
  // new presetSubject — re-sync it explicitly when the page it's on changes.
  useEffect(() => {
    setForm((f) => ({ ...f, subject: presetSubject }));
  }, [presetSubject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = t("formErrorRequired");
    if (!form.email.trim()) {
      nextErrors.email = t("formErrorRequired");
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = t("formErrorEmail");
    }
    if (!form.message.trim()) nextErrors.message = t("formErrorRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(sendContact(form))
      .unwrap()
      .then(() => {
        toast.success(t("toastSuccess"));
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: presetSubject,
          message: "",
        });
        setErrors({});
      })
      .catch(() => {
        toast.error(t("toastError"));
      });
  };

  return (
    <>
      <form className="validation" noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="commet-box"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <span className="input-box__error">{errors.name}</span>}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="commet-box"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <span className="input-box__error">{errors.email}</span>}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="commet-box"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="commet-box"
                value={form.subject}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="message">
          <textarea
            name="message"
            className="textarea"
            placeholder="Write a message"
            value={form.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <span className="input-box__error">{errors.message}</span>}
        </div>
        <div className="btn-box">
          <button type="submit" className="form-btn">
            {t("sends")}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default InquiryForm;
