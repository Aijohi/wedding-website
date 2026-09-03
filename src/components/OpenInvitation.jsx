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
            Saturday · 12 December 2026
          </p>

          <p className="open-invitation__message">
            We’re finally doing it. From two families to one, we cannot
            wait to celebrate with the people who mean the most to us.
            Come feast, dance, and toast to forever with us.
          </p>

          <p className="open-invitation__signature">
            With love, Omo &amp; IK
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