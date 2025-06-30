"use client"

import { useEffect } from "react"

/**
 * Immediately unregister any Service-Worker whose script ends with **__v0_sw.js**
 * to silence “failed to register ServiceWorker” console errors in the preview.
 */
export default function UnregisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .getRegistrations()
        .then((regs) =>
          regs.forEach((reg) => {
            if (reg.active?.scriptURL.includes("__v0_sw.js")) reg.unregister()
          }),
        )
        .catch(() => {
          /* ignore */
        })
    }
  }, [])

  return null
}
