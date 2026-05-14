import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sabina Krajewska Bookkeeping",
    short_name: "SK Bookkeeping",
    description:
      "Professional bookkeeping and HMRC consulting in Liverpool and Merseyside.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f9ff",
    theme_color: "#131b2e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
