export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

const DEFAULT_DELAY = 600;

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, DEFAULT_DELAY));
    if (import.meta.env.DEV) {
      console.info("Contact form submission (mock)", payload);
    }
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || "Failed to submit contact form");
  }
}
