import invitationBackground from "../assets/images/invitation-background.png";
import openEnvelope from "../assets/images/open-envelope.svg";
import weddingIcon from "../assets/images/wedding-icon.svg";

import "./OpenInvitation.css";

function OpenInvitation({ onReserve }) {
  return (
    <section
      className="open-invitation"
      style={{
        "--invitation-background": `url(${invitationBackground})`,
      }}
    >
      <div className="open-invitation__artwork">
        <img
          className="open-invitation__envelope"
          src={openEnvelope}
          alt=""
        />

        <div className="open-invitation__card-content">
          <img
            className="open-invitation__icon"
            src={weddingIcon}
            alt=""
          />

          <p className="open-invitation__introduction">
            Together with their families
          </p>

          <h1 className="open-invitation__names">
            Omonzele <span>&amp;</span> Ikponmwenosa
          </h1>

          <p className="open-invitation__date">
            Saturday, 12 December 2026
          </p>

          <p className="open-invitation__message">
            We’re finally doing it! We can’t wait to
            celebrate this special day with you.
          </p>

          <p className="open-invitation__signature">
          <span aria-hidden="true">—</span>
          <strong>Omo &amp; IK</strong>
          </p>
          <button
            className="open-invitation__reserve-button"
            type="button"
            onClick={onReserve}
          >
            Reserve my seat
          </button>
        </div>
      </div>
    </section>
  );
}

export default OpenInvitation;