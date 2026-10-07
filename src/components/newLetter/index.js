import React, { useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { sendEmail } from "../../reduxToolkit/messageSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useTranslation} from "react-i18next";
export default function NewLetter() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    dispatch(sendEmail({ email }))
      .unwrap()
      .then(() => {
        toast.success(t("form.newsletterSuccess"));
        setEmail("");
      })
      .catch((err) => {
        toast.error(err?.status === 429 ? t("form.errorTooMany") : t("form.newsletterError"));
      });
  };

  return (
    <div className="newLetter">
      <div className="container">
        <div className="newLetter__inners fadeInUp animated">
          <div className="newLetter__inners_shapes1"></div>
          <div className="newLetter__inners_lefts">
            <div className="newLetter__inners_lefts_title-new">
              {t("get")}
            </div>
          </div>
          <div className="newLetter__inners_rights">
            <form
              className="newLetter__inners_rights_forms"
              onSubmit={handleSubmit}
            >
              <div className="newLetter__inners_rights_forms_input-box">
                <input
                  type="email"
                  placeholder={t("form.newsletterEmail")}
                  aria-label={t("form.newsletterEmail")}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="newLetter__inners_rights_forms_input-box_input"
                  required
                />
                <button
                  type="submit"
                  className="newLetter__inners_rights_forms_input-box_button"
                >
                  {t("sub")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
