// uploadToCloudinary.js (verbose)
export const uploadToCloudinary = async (file) => {
  if (!file) {
    console.error("No file provided");
    return null;
  }

  // auto-detect resource type
  let resourceType = "image";
  if (file.type?.startsWith("video/")) resourceType = "video";
  else if (!file.type?.startsWith("image/")) resourceType = "raw";

  const cloudName = "dnewcdvgt";
  const uploadPreset = "twitterapp";
  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", uploadPreset);

  console.log("Uploading to Cloudinary endpoint:", endpoint);
  console.log("Form entries (showing keys):", Array.from(form.keys()));

  try {
    const res = await fetch(endpoint, { method: "POST", body: form });

    // read raw text first
    const rawText = await res.text();
    let body = null;
    try {
      body = rawText ? JSON.parse(rawText) : null;
    } catch (e) {
      // not JSON
      body = rawText;
    }

    console.log("Cloudinary response status:", res.status);
    // print some headers (may help debugging)
    console.log("Cloudinary response headers:", {
      "content-type": res.headers.get("content-type"),
      "x-request-id": res.headers.get("x-request-id"),
    });
    console.log("Cloudinary response body (parsed):", body);

    if (!res.ok) {
      // If body is JSON and contains error.message, throw that
      const message =
        (body && body.error && body.error.message) ||
        (typeof body === "string" && body) ||
        `Upload failed with status ${res.status}`;
      const err = new Error(message);
      err.raw = body;
      err.status = res.status;
      throw err;
    }

    // success
    const secureUrl = (body && (body.secure_url || body.url)) || null;
    console.log("Uploaded OK:", secureUrl);
    return secureUrl;
  } catch (err) {
    console.error("Error uploading to Cloudinary (detailed):", err);
    // rethrow so caller can display err.message
    throw err;
  }
};
