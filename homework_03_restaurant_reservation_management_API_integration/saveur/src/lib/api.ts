import type {
  CreateReservation,
  Reservation,
  UpdateReservation,
} from "../types/reservation";

const BASE_URL = "http://localhost:3000/api";

export async function fetchReservations(): Promise<Reservation[]> {
  try {
    const rawResponse = await fetch(`${BASE_URL}/reservations`);

    if (!rawResponse.ok) {
      throw new Error("Failed to load reservations.");
    }

    const rawData = await rawResponse.json();


    return rawData;

  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createReservation(
  body: CreateReservation
): Promise<Reservation> {
  try {
    const rawResponse = await fetch(`${BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to create reservation.");
    }

    return await rawResponse.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteReservation(id: number): Promise<void> {
  try {
    const rawResponse = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: "DELETE",
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to delete reservation.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateReservation(
  id: number,
  body: UpdateReservation
): Promise<Reservation> {
  try {
    const rawResponse = await fetch(`${BASE_URL}/reservations/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!rawResponse.ok) {
      throw new Error("Failed to update reservation.");
    }

    return await rawResponse.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}