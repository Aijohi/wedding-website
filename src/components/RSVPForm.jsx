import { useState } from "react";
import {
  IoChevronDownOutline,
  IoCloseOutline,
} from "react-icons/io5";

import rsvpBackground from "../assets/images/rsvp-background.png";
import { createRSVP } from "../services/rsvpService";

import "./RSVPForm.css";

function RSVPForm({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    attendeeType: "",
    guestCount: "1",
  });

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    const fullName = formData.fullName.trim();
    const email = formData.email
      .trim()
      .toLowerCase();

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fullName.length < 2) {
      setErrorMessage(
        "Please enter your full name."
      );
      return;
    }

    if (!email) {
      setErrorMessage(
        "Please enter your email address."
      );
      return;
    }

    if (!emailPattern.test(email)) {
      setErrorMessage(
        "Please enter a valid email address."
      );
      return;
    }

    if (!formData.attendeeType) {
      setErrorMessage(
        "Please select whether you are attending as family or a friend."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const guest = await createRSVP({
        fullName,
        email,
        attendeeType: formData.attendeeType,
      });

      onSuccess(guest);
    } catch (error) {
      setErrorMessage(
        error.message ||
          "We could not reserve your seat. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="rsvp-screen"
      style={{
        "--rsvp-background": `url(${rsvpBackground})`,
      }}
    >
      <form
        className="rsvp-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <button
          type="button"
          className="rsvp-form__close"
          onClick={onClose}
          aria-label="Close RSVP form"
          disabled={isSubmitting}
        >
          <IoCloseOutline />
        </button>

        <div className="rsvp-form__content">
          <header className="rsvp-form__header">
            <p className="rsvp-form__eyebrow">
              Kindly reply
            </p>

            <h1 className="rsvp-form__title">
              Reserve your seat
            </h1>
          </header>

          <div className="rsvp-form__fields">
            <div className="rsvp-form__field">
              <label
                className="rsvp-form__label"
                htmlFor="fullName"
              >
                Full name
              </label>

              <input
                className="rsvp-form__input"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="e.g. Aijohi Otu"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="rsvp-form__field">
              <label
                className="rsvp-form__label"
                htmlFor="email"
              >
                Email address
              </label>

              <input
                className="rsvp-form__input"
                id="email"
                name="email"
                type="email"
                inputMode="email"
                placeholder="e.g. aijohi@example.com"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="rsvp-form__field">
              <label
                className="rsvp-form__label"
                htmlFor="attendeeType"
              >
                I am attending as
              </label>

              <div className="rsvp-form__select-wrapper">
                <select
                  className="rsvp-form__select"
                  id="attendeeType"
                  name="attendeeType"
                  value={formData.attendeeType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="family">
                    Family
                  </option>

                  <option value="friend">
                    Friend
                  </option>
                </select>

                <IoChevronDownOutline
                  className="rsvp-form__select-icon"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="rsvp-form__field">
              <label
                className="rsvp-form__label"
                htmlFor="guestCount"
              >
                Invitation admits
              </label>

              <div className="rsvp-form__select-wrapper">
                <select
                  className="rsvp-form__select"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="1">
                    1 guest
                  </option>
                </select>

                <IoChevronDownOutline
                  className="rsvp-form__select-icon"
                  aria-hidden="true"
                />
              </div>

              <p className="rsvp-form__help">
                This invitation admits one person only.
              </p>
            </div>
          </div>

          {errorMessage && (
            <p
              className="rsvp-form__error"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <footer className="rsvp-form__footer">
            <p className="rsvp-form__date">
              Come celebrate with us on 12 December
              2026
            </p>

            <p className="rsvp-form__signature">
              — OMO &amp; IK
            </p>
          </footer>

          <button
            className="rsvp-form__submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Reserving your seat..."
              : "Confirm attendance"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default RSVPForm;