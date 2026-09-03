import { supabase } from "../lib/supabaseClient";

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