// Case-study / project pages (src/pages/Projects). The current gallery API
// (`/images/`) only returns raw image URLs with no title/location/description
// field, so — as agreed — this content is curated by hand here rather than
// fetched from the backend, until/unless that API is extended.
//
// These two entries are PLACEHOLDER samples to prove out the page structure.
// Replace them with real, named projects (and real photos in `photos`) before
// treating this as a finished section — text content per slug lives in
// src/Ing/*.json under "projects.items.<slug>".
const projects = [
  {
    slug: "sample-hotel-wayfinding",
    photos: [],
  },
  {
    slug: "sample-outdoor-facade-signage",
    photos: [],
  },
];

export default projects;
