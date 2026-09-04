import {
  IoCheckmarkOutline,
  IoDownloadOutline,
} from "react-icons/io5";

import rsvpBackground from "../assets/images/rsvp-background.png";

import "./SuccessScreen.css";

function SuccessScreen({
  guest,
  isReturningGuest = false,
}) {
  const firstName =
    guest?.fullName?.trim().split(/\s+/)[0] ||
    "Guest";

  return (
    <section
      className="success-screen"
      style={{
        "--success-background": `url(${rsvpBackground})`,
      }}
    >
      <article className="success-card">
        <div
          className="success-card__icon"
          aria-hidden="true"
        >
          <IoCheckmarkOutline />
        </div>

        <p className="success-card__eyebrow">
          {isReturningGuest
            ? "Seat already reserved"
            : "RSVP confirmed"}
        </p>

        <h1 className="success-card__title">
          {isReturningGuest
            ? "Your seat is already saved"
            : "Your seat is saved"}
          , <span>{firstName}.</span>
        </h1>

        <p className="success-card__message">
          {isReturningGuest
            ? "Your reservation has already been confirmed. Your wedding invitation is available below."
            : "We’re so happy you’ll be celebrating with us. Your wedding invitation is ready below."}
        </p>

        <div className="success-card__admission">
          <span>Invitation admits</span>
          <strong>1 guest</strong>
        </div>

        <p className="success-card__signature">
          OMO &amp; IK
        </p>

        <a
          className="success-card__download"
          href="/downloads/iom-wedding-invitation.pdf"
          download="Omo-and-IK-Wedding-Invitation.pdf"
        >
          <IoDownloadOutline aria-hidden="true" />
          <span>Download invitation</span>
        </a>
      </article>
    </section>
  );
}

export default SuccessScreen;