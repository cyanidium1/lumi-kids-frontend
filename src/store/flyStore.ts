"use client";

import { create } from "zustand";

export interface Flight {
  id: number;
  image: string;
  top: number;
  left: number;
  size: number;
}

interface FlyStore {
  flights: Flight[];
  launch: (image: string, origin: DOMRect) => void;
  land: (id: number) => void;
}

/**
 * Drives the "product flies into the cart" animation.
 *
 * Buttons only report where they are on screen; the single <FlyToCartLayer />
 * mounted in the root layout owns the portal and the motion, so the animation
 * survives re-renders of the card that started it.
 */
export const useFlyStore = create<FlyStore>((set) => ({
  flights: [],

  launch: (image, origin) => {
    const size = Math.min(Math.max(origin.width, 64), 120);
    const flight: Flight = {
      id: Date.now() + Math.random(),
      image,
      top: origin.top + origin.height / 2 - size / 2,
      left: origin.left + origin.width / 2 - size / 2,
      size,
    };
    set((state) => ({ flights: [...state.flights, flight] }));
  },

  land: (id) =>
    set((state) => ({
      flights: state.flights.filter((flight) => flight.id !== id),
    })),
}));
