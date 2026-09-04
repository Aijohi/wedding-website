import { supabase } from "../lib/supabaseClient";

export async function getRSVPAvailability() {
  const { data, error } = await supabase.rpc(
    "get_rsvp_availability"
  );

  if (error) {
    console.error("Availability error:", error);

    throw new Error(
      "We could not check the available seats."
    );
  }

  return Boolean(data);
}

export async function createRSVP({
  fullName,
  email,
  attendeeType,
}) {
  const cleanedName = fullName.trim();
  const cleanedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("rsvps")
    .insert({
      full_name: cleanedName,
      email: cleanedEmail,
      attendee_type: attendeeType,
      guest_count: 1,
    })
    
  if (error) {
    console.error("RSVP submission error:", error);

    if (error.code === "23505") {
      throw new Error(
        "A seat has already been reserved with this email address."
      );
    }

    if (
      error.message?.includes("RSVP_LIMIT_REACHED")
    ) {
      throw new Error(
        "Our guest list is now full. We are unable to accept more responses."
      );
    }

    if (error.code === "23514") {
      throw new Error(
        "Please enter a valid email address."
      );
    }

    if (error.code === "42501") {
      throw new Error(
        "We could not save your response. Please try again."
      );
    }

    throw new Error(
      "We could not reserve your seat. Please try again."
    );
  }

  return {
    id: data.id,
    fullName: data.full_name,
    email: data.email,
    attendeeType: data.attendee_type,
    guestCount: data.guest_count,
    createdAt: data.created_at,
  };
}