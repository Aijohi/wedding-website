import invitationBackground from "../assets/images/invitation-background.png";
import closedEnvelope from "../assets/images/closed-envelope.svg";
import "./SealedInvitation.css";

function SealedInvitation({ onOpen, isOpening }) {
  return (
    <section
      className={`sealed-invitation ${
      isOpening ? "sealed-invitation--opening" : ""
      }`}
      style={{
      "--invitation-background": `url(${invitationBackground})`,
      }}
      >
      <div className="sealed-invitation__content">
        <header className="sealed-invitation__header">
        <p className="sealed-invitation__eyebrow">
        You are cordially invited to celebrate
      </p>

       <h1 className="sealed-invitation__names">
        Omonzele <span>&amp;</span> Ikponmwenosa
      </h1>
      </header>

        <button
          className="sealed-invitation__envelope-button"
          type="button"
          onClick={onOpen}
          diabled={isOpening}
          aria-label="Open the wedding invitation"
        >
          <img
            className="sealed-invitation__envelope"
            src={closedEnvelope}
            alt=""
          />
        </button>

        <p className="sealed-invitation__instruction">
          Tap the seal to open the invitation
        </p>
      </div>
    </section>
  );
}

export default SealedInvitation;