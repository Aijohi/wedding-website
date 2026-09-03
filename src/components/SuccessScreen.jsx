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
          We can’t wait to celebrate with you,{" "}
          <span>{firstName}.</span>
        </h1>

        <p className="success-card__message">
          {isReturningGuest
            ? "You have already reserved your seat. You can download your wedding invitation below."
            : "Your seat has been reserved. Download your wedding invitation below."}
        </p>

        <div className="success-card__details">
          <div className="success-card__detail">
            <span className="success-card__detail-label">
              Wedding date
            </span>

            <strong>12 December 2026</strong>
          </div>

          <div
            className="success-card__divider"
            aria-hidden="true"
          />

          <div className="success-card__detail">
            <span className="success-card__detail-label">
              Invitation admits
            </span>

            <strong>1 guest</strong>
          </div>
        </div>

        <p className="success-card__signature">
          With love, Omo &amp; IK
        </p>

        <a
          className="success-card__download"
          href="/downloads/iom-wedding-invitation.pdf"
          download="Omo-and-Ik-Wedding-Invitation.pdf"
        >
          <IoDownloadOutline aria-hidden="true" />

          <span>Download wedding invitation</span>
        </a>

        <p className="success-card__download-help">
          Keep this invitation for the wedding details.
        </p>
      </article>
    </section>
  );
}

export default SuccessScreen;