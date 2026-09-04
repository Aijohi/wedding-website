import { supabase } from "../lib/supabaseClient";

export async function getRSVPAvailability() {
  const { data, error } = await supabase.rpc(
    "get_rsvp_availability"
  );

  if (error) {
    console.error(
      "Could not check RSVP availability:",
      error
    );

    throw new Error(
      "We could not check RSVP availability."
    );
  }

  return data === true;
}

export async function submitRSVP({
  fullName,
  attendeeType,
  guestCount,
}) {
  const cleanedName = fullName
    .trim()
    .replace(/\s+/g, " ");

  const { error } = await supabase
    .from("rsvps")
    .insert({
      full_name: cleanedName,
      attendee_type: attendeeType,
      guest_count: guestCount,
    });

  if (error) {
    console.error("Supabase RSVP error:", error);

    if (error.code === "23505") {
      throw new Error(
        "A seat has already been reserved with this name."
      );
    }

    if (error.message?.includes("RSVP_LIMIT_REACHED")) {
      throw new Error(
        "All 250 seats have now been reserved. RSVP is closed."
      );
    }

    throw new Error(
      "We could not reserve your seat. Please try again."
    );
  }

  return {
    fullName: cleanedName,
    attendeeType,
    guestCount,
  };
}