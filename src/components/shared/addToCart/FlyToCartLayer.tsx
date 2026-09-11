"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useFlyStore } from "@/store/flyStore";

const CART_ANCHOR_ID = "cart-anchor";

export default function FlyToCartLayer() {
  const flights = useFlyStore((state) => state.flights);
  const land = useFlyStore((state) => state.land);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const anchor = document.getElementById(CART_ANCHOR_ID);
  const target = anchor?.getBoundingClientRect();

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[120]">
      <AnimatePresence>
        {flights.map((flight) => {
          const endTop = target ? target.top + target.height / 2 : 40;
          const endLeft = target ? target.left + target.width / 2 : 40;

          return (
            <motion.div
              key={flight.id}
              className="absolute overflow-hidden rounded-[2px]"
              style={{
                top: flight.top,
                left: flight.left,
                width: flight.size,
                height: flight.size,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: [0, 1, 1, 0.4],
                scale: [0.9, 1, 0.42, 0.12],
                x: [0, 0, (endLeft - flight.left - flight.size / 2) * 0.55, endLeft - flight.left - flight.size / 2],
                y: [0, -14, (endTop - flight.top - flight.size / 2) * 0.5, endTop - flight.top - flight.size / 2],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.78,
                times: [0, 0.14, 0.6, 1],
                ease: [0.32, 0.08, 0.24, 1],
              }}
              onAnimationComplete={() => land(flight.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flight.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
