import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../reduxToolkit/messageSlice";
import { toast } from "react-toastify";
import { FaEnvelopeOpenText } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function NewLetter() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || sending) return;

    setSending(true);
    dispatch(sendEmail({ email: email.trim() }))
      .unwrap()
      .then(() => {
        toast.success(t("form.newsletterSuccess"));
        setEmail("");
      })
      .catch((err) => {
        toast.error(err?.status === 429 ? t("form.errorTooMany") : t("form.newsletterError"));
      })
      .finally(() => setSending(false));
  };

  return (
    <section className="newLetter" aria-labelledby="newsletter-title">
      <div className="container">
        <div className="newLetter__card">
          <div className="newLetter__text">
            <span className="newLetter__icon" aria-hidden="true">
              <FaEnvelopeOpenText />
            </span>
            <div>
              <h2 className="newLetter__title" id="newsletter-title">
                {t("newsletter.title")}
              </h2>
              <p className="newLetter__desc">{t("newsletter.text")}</p>
            </div>
          </div>

          <form className="newLetter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={t("form.newsletterEmail")}
              aria-label={t("form.newsletterEmail")}
              autoComplete="email"
              maxLength={100}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={sending}>
              {t("sub")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
