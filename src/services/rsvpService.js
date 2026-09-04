import { supabase } from "../lib/supabaseClient";

export async function getRSVPAvailability() {
  const { data, error } = await supabase.rpc(
    "get_rsvp_availability"
  );

  if (error) {
    console.error("Availability error:", error);
    return true;
  }

  return Boolean(data);
}

export async function createRSVP({
  fullName,
  email,
  attendeeType,
}) {
  const guest = {
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    attendeeType,
    guestCount: 1,
    createdAt: new Date().toISOString(),
  };

  const { error } = await supabase
    .from("rsvps")
    .insert({
      full_name: guest.fullName,
      email: guest.email,
      attendee_type: guest.attendeeType,
      guest_count: guest.guestCount,
    });

  if (error) {
    console.error("RSVP submission error:", error);

    if (error.code === "23505") {
      throw new Error(
        "This email has already been used to reserve a seat."
      );
    }

    if (error.message?.includes("RSVP_LIMIT_REACHED")) {
      throw new Error("Our guest list is now full.");
    }

    throw new Error(
      "Please check your connection and try again."
    );
  }

  return guest;
}