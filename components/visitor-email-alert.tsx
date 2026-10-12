"use client";

import { useEffect } from "react";

const sessionKey = "visitor-email-alert-sent";
const pendingKey = "visitor-email-alert-pending";

export function VisitorEmailAlert() {
  useEffect(() => {
    try {
      if (
        sessionStorage.getItem(sessionKey) === "true" ||
        sessionStorage.getItem(pendingKey) === "true"
      ) {
        return;
      }

      sessionStorage.setItem(pendingKey, "true");
    } catch (error) {
      console.error("Could not check the visitor alert session state.", error);
      return;
    }

    void fetch("/api/visitor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pathname: window.location.pathname }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Visitor alert request failed (${response.status}).`);
        }

        sessionStorage.setItem(sessionKey, "true");
      })
      .catch((error: unknown) => {
        console.error("Could not send the visitor email alert.", error);
        sessionStorage.removeItem(sessionKey);
      })
      .finally(() => {
        sessionStorage.removeItem(pendingKey);
      });
  }, []);

  return null;
}
