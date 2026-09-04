import { useState } from "react";

import SealedInvitation from "./components/SealedInvitation";
import OpenInvitation from "./components/OpenInvitation";
import RSVPForm from "./components/RSVPForm";
import SuccessScreen from "./components/SuccessScreen";
import RSVPClosed from "./components/RSVPClosed";

import {
  getRSVPAvailability,
} from "./services/rsvpService";

import "./App.css";

const RSVP_STORAGE_KEY =
  "wedding-rsvp-confirmation-v2";

function getSavedRSVP() {
  try {
    const savedRSVP = localStorage.getItem(
      RSVP_STORAGE_KEY
    );

    return savedRSVP ? JSON.parse(savedRSVP) : null;
  } catch (error) {
    console.error("Could not read saved RSVP:", error);
    return null;
  }
}

function App() {
  const [savedRSVP] = useState(() => getSavedRSVP());

  const [confirmedGuest, setConfirmedGuest] =
    useState(savedRSVP);

  const [isReturningGuest, setIsReturningGuest] =
    useState(Boolean(savedRSVP));

  const [screen, setScreen] = useState(
    savedRSVP ? "success" : "sealed"
  );

  async function handleOpenInvitation() {
    setScreen("open");
  }

  async function handleReserveSeat() {
    try {
      const isAvailable =
        await getRSVPAvailability();

      setScreen(isAvailable ? "rsvp" : "closed");
    } catch (error) {
      console.error(
        "RSVP availability check failed:",
        error
      );

      setScreen("rsvp");
    }
  }

  function handleCloseRSVP() {
    setScreen("open");
  }

  function handleRSVPSuccess(guest) {
    try {
      localStorage.setItem(
        RSVP_STORAGE_KEY,
        JSON.stringify(guest)
      );
    } catch (error) {
      console.error("Could not save RSVP:", error);
    }

    setConfirmedGuest(guest);
    setIsReturningGuest(false);
    setScreen("success");
  }

  return (
    <main className="app">
      {screen === "sealed" && (
        <SealedInvitation
          onOpen={handleOpenInvitation}
        />
      )}

      {screen === "open" && (
        <OpenInvitation
          onReserve={handleReserveSeat}
        />
      )}

      {screen === "rsvp" && (
        <RSVPForm
          onClose={handleCloseRSVP}
          onSuccess={handleRSVPSuccess}
        />
      )}

      {screen === "closed" && (
        <RSVPClosed
          onBack={() => setScreen("open")}
        />
      )}

      {screen === "success" && confirmedGuest && (
        <SuccessScreen
          guest={confirmedGuest}
          isReturningGuest={isReturningGuest}
        />
      )}
    </main>
  );
}

export default App;