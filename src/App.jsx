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
  "wedding-rsvp-confirmation-v3";

function getSavedRSVP() {
  try {
    const savedRSVP = localStorage.getItem(
      RSVP_STORAGE_KEY
    );

    if (!savedRSVP) {
      return null;
    }

    return JSON.parse(savedRSVP);
  } catch (error) {
    console.error(
      "Could not read the saved RSVP:",
      error
    );

    return null;
  }
}

function App() {
  const initialGuest = getSavedRSVP();

  const [confirmedGuest, setConfirmedGuest] =
    useState(initialGuest);

  const [isReturningGuest, setIsReturningGuest] =
    useState(Boolean(initialGuest));

  const [screen, setScreen] = useState(
    initialGuest ? "success" : "sealed"
  );

  function handleOpenInvitation() {
    setScreen("open");
  }

  async function handleReserveSeat() {
    try {
      const isAvailable =
        await getRSVPAvailability();

      setScreen(
        isAvailable ? "rsvp" : "closed"
      );
    } catch (error) {
      console.error(
        "Could not check RSVP availability:",
        error
      );

      setScreen("rsvp");
    }
  }

  function handleCloseRSVP() {
    setScreen("open");
  }

  function handleBackToInvitation() {
    setScreen("open");
  }

  function handleRSVPSuccess(guest) {
    try {
      localStorage.setItem(
        RSVP_STORAGE_KEY,
        JSON.stringify(guest)
      );
    } catch (error) {
      console.error(
        "Could not save the RSVP locally:",
        error
      );
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

      {screen === "success" && (
        <SuccessScreen
          guest={confirmedGuest}
          isReturningGuest={isReturningGuest}
        />
      )}

      {screen === "closed" && (
        <RSVPClosed
          onBack={handleBackToInvitation}
        />
      )}
    </main>
  );
}

export default App;