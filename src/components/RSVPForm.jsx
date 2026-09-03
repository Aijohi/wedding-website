import { useState } from "react";
import {
  IoChevronDownOutline,
  IoCloseOutline,
} from "react-icons/io5";

import rsvpBackground from "../assets/images/rsvp-background.png";
import { submitRSVP } from "../services/rsvpService";
import "./RSVPForm.css";

function RSVPForm({ onClose, onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [attendeeType, setAttendeeType] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const cleanedName = fullName.trim();

    if (!cleanedName) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!attendeeType) {
      setFormError(
        "Please select whether you are attending as family or friend."
      );
      return;
    }

    const submittedRSVP = {
      fullName: cleanedName,
      attendeeType,
      guestCount: Number(guestCount),
    };

    try {
      setIsSubmitting(true);

      await submitRSVP(submittedRSVP);

      localStorage.setItem(
        "wedding-rsvp-confirmation",
        JSON.stringify(submittedRSVP)
      );

      onSuccess(submittedRSVP);
    } catch (error) {
      console.error("RSVP submission error:", error);

      setFormError(
        error?.message ||
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
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <button
          className="rsvp-form__close"
          type="button"
          onClick={onClose}
          aria-label="Close RSVP form"
          disabled={isSubmitting}
        >
          <IoCloseOutline aria-hidden="true" />
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
                htmlFor="full-name"
              >
                Full name
              </label>

              <input
                className="rsvp-form__input"
                id="full-name"
                name="fullName"
                type="text"
                value={fullName}
                onChange={(event) =>
                  setFullName(event.target.value)
                }
                placeholder="e.g. Aijohi Otu"
                autoComplete="name"
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="rsvp-form__field">
              <label
                className="rsvp-form__label"
                htmlFor="attendee-type"
              >
                I am attending as
              </label>

              <div className="rsvp-form__select-wrapper">
                <select
                  className="rsvp-form__select"
                  id="attendee-type"
                  name="attendeeType"
                  value={attendeeType}
                  onChange={(event) =>
                    setAttendeeType(event.target.value)
                  }
                  disabled={isSubmitting}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>

                  <option value="family">Family</option>
                  <option value="friend">Friend</option>
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
                htmlFor="guest-count"
              >
                Invitation admits
              </label>

              <div className="rsvp-form__select-wrapper">
                <select
                  className="rsvp-form__select"
                  id="guest-count"
                  name="guestCount"
                  value={guestCount}
                  onChange={(event) =>
                    setGuestCount(event.target.value)
                  }
                  disabled={isSubmitting}
                >
                  <option value="1">1 guest</option>
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

          {formError && (
            <p className="rsvp-form__error" role="alert">
              {formError}
            </p>
          )}

          <footer className="rsvp-form__footer">
            <p className="rsvp-form__date">
              Come celebrate with us on 12 December 2026
            </p>

            <p className="rsvp-form__signature">
              With love, Omo &amp; IK
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