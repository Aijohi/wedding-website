import {
  IoHeartOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

import rsvpBackground from "../assets/images/rsvp-background.png";

import "./RSVPClosed.css";

function RSVPClosed({ onBack }) {
  return (
    <section
      className="rsvp-closed-screen"
      style={{
        "--rsvp-closed-background": `url(${rsvpBackground})`,
      }}
    >
      <article className="rsvp-closed-card">
        <div
          className="rsvp-closed-card__icon"
          aria-hidden="true"
        >
          <IoHeartOutline />
        </div>

        <p className="rsvp-closed-card__eyebrow">
          RSVP closed
        </p>

        <h1 className="rsvp-closed-card__title">
          Our guest list is now full
        </h1>

        <p className="rsvp-closed-card__message">
          All 250 seats have been reserved. Thank you
          for wanting to celebrate this special day
          with us. We truly appreciate your love and
          support.
        </p>

        <p className="rsvp-closed-card__signature">
          — Omo &amp; IK
        </p>

        <button
          className="rsvp-closed-card__back"
          type="button"
          onClick={onBack}
        >
          <IoArrowBackOutline aria-hidden="true" />
          <span>Back to invitation</span>
        </button>
      </article>
    </section>
  );
}

export default RSVPClosed;