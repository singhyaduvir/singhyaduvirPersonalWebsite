"use client";

import { useState, type FormEvent } from "react";

type SubmissionState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<SubmissionState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });

      if (!response.ok) {
        throw new Error(`Contact form submission failed (${response.status}).`);
      }

      form.reset();
      setState("success");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-name" className="block text-sm font-medium">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          className="w-full border border-border bg-background px-3 py-2 text-ink"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          className="w-full border border-border bg-background px-3 py-2 text-ink"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          maxLength={2000}
          required
          className="w-full resize-y border border-border bg-background px-3 py-2 text-ink"
        />
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex items-center border border-ink px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:cursor-wait disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : "Send message"}
      </button>

      <p aria-live="polite" role={state === "error" ? "alert" : "status"}>
        {state === "success"
          ? "Your message has been sent. Thank you for reaching out."
          : state === "error"
            ? "Your message could not be sent. Please try again later."
            : ""}
      </p>
    </form>
  );
}
