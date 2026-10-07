import React, { useEffect, useId, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { sendContact } from "../../reduxToolkit/messageSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import "./style.scss";

// Extracted from the Contact page so any page (service pages, project pages, …)
// can drop in a working "contact us" form. presetSubject lets a page pre-fill
// what the inquiry is about (e.g. a specific service) without any backend change —
// it's just the free-text "subject" field on the existing /create-contact/ endpoint.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The backend stores the phone in a 12-character field and requires phone and
// subject to be non-empty, while the form treats them as optional. Normalise the
// phone ("+998 77 012-40-04" -> "998770124004") and fill the blanks so a message
// with just name, email and text is never rejected.
const cleanPhone = (raw) => {
  const digits = raw.replace(/\D/g, "");
  return digits.length > 12 ? raw.replace(/[^\d+]/g, "") : digits;
};
const phoneDigits = (raw) => raw.replace(/\D/g, "").length;

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
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [trap, setTrap] = useState(""); // honeypot: real visitors never see or fill it
  const uid = useId();

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
    if (form.phone.trim()) {
      const count = phoneDigits(form.phone);
      if (count < 7 || count > 15) nextErrors.phone = t("form.errorPhone");
    }
    if (!form.message.trim()) nextErrors.message = t("formErrorRequired");
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate() || sending) return;

    // A bot filled the hidden field: pretend it worked, send nothing.
    if (trap) {
      setSent(true);
      return;
    }

    setSending(true);
    dispatch(
      sendContact({
        ...form,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: cleanPhone(form.phone) || "-",
        subject: form.subject.trim() || t("form.defaultSubject"),
        message: form.message.trim(),
      })
    )
      .unwrap()
      .then(() => {
        setSent(true);
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
      })
      .finally(() => setSending(false));
  };

  if (sent) {
    return (
      <>
        <div className="form-success" role="status">
          <FaCheckCircle className="form-success__icon" aria-hidden="true" />
          <h3 className="form-success__title">{t("form.successTitle")}</h3>
          <p className="form-success__text">{t("form.successText")}</p>
          <button type="button" className="form-success__again" onClick={() => setSent(false)}>
            {t("form.sendAnother")}
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <>
      <form className="validation" noValidate onSubmit={handleSubmit}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="form-trap"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
        <div className="form-group">
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="text"
                name="name"
                placeholder={`${t("form.name")} *`}
                aria-label={t("form.name")}
                autoComplete="name"
                maxLength={100}
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                className="commet-box"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="input-box__error" id={`${uid}-name-error`} role="alert">
                  {errors.name}
                </span>
              )}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder={`${t("form.email")} *`}
                aria-label={t("form.email")}
                autoComplete="email"
                maxLength={100}
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                className="commet-box"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="input-box__error" id={`${uid}-email-error`} role="alert">
                  {errors.email}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="tel"
                name="phone"
                placeholder={t("form.phone")}
                aria-label={t("form.phone")}
                autoComplete="tel"
                inputMode="tel"
                maxLength={30}
                aria-invalid={errors.phone ? "true" : undefined}
                aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                className="commet-box"
                value={form.phone}
                onChange={handleChange}
              />
              {errors.phone && (
                <span className="input-box__error" id={`${uid}-phone-error`} role="alert">
                  {errors.phone}
                </span>
              )}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="input-box">
              <input
                type="text"
                name="subject"
                placeholder={t("form.subject")}
                aria-label={t("form.subject")}
                maxLength={100}
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
            placeholder={`${t("form.message")} *`}
            aria-label={t("form.message")}
            maxLength={3000}
            aria-invalid={errors.message ? "true" : undefined}
            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
            value={form.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && (
            <span className="input-box__error" id={`${uid}-message-error`} role="alert">
              {errors.message}
            </span>
          )}
        </div>
        <div className="btn-box">
          <button type="submit" className="form-btn" disabled={sending} aria-busy={sending}>
            {sending ? t("form.sending") : t("sends")}
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default InquiryForm;
