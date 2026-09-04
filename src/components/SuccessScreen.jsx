import {
  IoCheckmarkOutline,
  IoDownloadOutline,
} from "react-icons/io5";

import rsvpBackground from "../assets/images/rsvp-background.png";

import "./SuccessScreen.css";

function SuccessScreen({ guest, isReturningGuest }) {
  const firstName =
    guest?.fullName?.trim().split(/\s+/)[0] || "Guest";

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
            ? `Your seat is already saved, ${firstName}.`
            : `Your seat is saved, ${firstName}.`}
        </h1>

        <p className="success-card__message">
          {isReturningGuest
            ? "You’re already on our guest list. You can download your wedding invitation again whenever you need it."
            : "We’re so happy you’ll be celebrating with us. Your wedding invitation is ready below."}
        </p>

        <div className="success-card__admission">
          <span>Invitation admits</span>
          <strong>1 guest</strong>
        </div>

        <div className="success-card__signature">
        <span aria-hidden="true">—</span>
        <strong>Omo &amp; IK</strong>
        </div>

        <a
          className="success-card__download"
          href="/downloads/iom-wedding-invitation.pdf"
          download="Omo-and-Ik-Wedding-Invitation.pdf"
        >
          <IoDownloadOutline aria-hidden="true" />
          <span>Download invitation</span>
        </a>
      </article>
    </section>
  );
}

export default SuccessScreen;