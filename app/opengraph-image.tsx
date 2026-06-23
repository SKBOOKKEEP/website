import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Sabina Krajewska — Accountant & Bookkeeper in Liverpool. Book a free 15-minute call.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SERVICES = ["Bookkeeping", "VAT Returns", "HMRC", "Payroll"];

const font = (file: string) =>
  readFile(join(process.cwd(), "assets", "fonts", file));

export default async function Image() {
  const [portrait, caslon700, manrope400, manrope600, manrope700] =
    await Promise.all([
      readFile(join(process.cwd(), "public", "Sabina.jpeg")),
      font("LibreCaslonText-Bold.ttf"),
      font("Manrope-Regular.ttf"),
      font("Manrope-SemiBold.ttf"),
      font("Manrope-Bold.ttf"),
    ]);

  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  const fonts = [
    { name: "Caslon", data: caslon700, weight: 700 as const, style: "normal" as const },
    { name: "Manrope", data: manrope400, weight: 400 as const, style: "normal" as const },
    { name: "Manrope", data: manrope600, weight: 600 as const, style: "normal" as const },
    { name: "Manrope", data: manrope700, weight: 700 as const, style: "normal" as const },
  ];

  const serif = "Caslon";
  const sans = "Manrope";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#121a2c",
          backgroundImage:
            "linear-gradient(135deg, #16203680 0%, #0b1120 100%)",
        }}
      >
        {/* Portrait, bled to the right edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: 470,
            height: 630,
            display: "flex",
          }}
        >
          <img
            src={portraitSrc}
            width={470}
            height={630}
            style={{
              width: 470,
              height: 630,
              objectFit: "cover",
              objectPosition: "50% 22%",
            }}
          />
          {/* Navy tint to harmonise the photo with the ground */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(18, 26, 44, 0.22)",
            }}
          />
          {/* Feathered seam so the photo melts into the navy */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 230,
              height: 630,
              backgroundImage:
                "linear-gradient(to right, #121a2c 0%, rgba(18,26,44,0) 100%)",
            }}
          />
        </div>

        {/* Signature gold hairline at the seam */}
        <div
          style={{
            position: "absolute",
            top: 90,
            bottom: 90,
            right: 470,
            width: 2,
            backgroundColor: "rgba(176, 141, 67, 0.45)",
          }}
        />

        {/* Content column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 740,
            height: 630,
            padding: "58px 64px 56px 72px",
          }}
        >
          {/* Wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 13,
                height: 13,
                backgroundColor: "#b08d43",
                transform: "rotate(45deg)",
              }}
            />
            <div
              style={{
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 19,
                letterSpacing: 1,
                color: "#b08d43",
              }}
            >
              simple-bookkeeping.co.uk
            </div>
          </div>

          {/* Core block */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: 3,
                textTransform: "uppercase",
                color: "#8b93ad",
              }}
            >
              Accountant &amp; Bookkeeper · Liverpool
            </div>
            <div
              style={{
                fontFamily: serif,
                fontWeight: 700,
                fontSize: 66,
                lineHeight: 1.04,
                color: "#f6f8ff",
                marginTop: 14,
              }}
            >
              Sabina Krajewska
            </div>
            <div
              style={{
                width: 68,
                height: 3,
                backgroundColor: "#b08d43",
                margin: "22px 0",
              }}
            />
            <div
              style={{
                fontFamily: sans,
                fontWeight: 400,
                fontSize: 25,
                lineHeight: 1.34,
                color: "#bcc3d8",
                maxWidth: 540,
              }}
            >
              Bookkeeping &amp; HMRC support that keeps your numbers clear.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 22,
                fontFamily: sans,
                fontWeight: 600,
                fontSize: 18,
                letterSpacing: 0.4,
                color: "#8b93ad",
              }}
            >
              {SERVICES.map((s, i) => (
                <div
                  key={s}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {i > 0 ? (
                    <span style={{ color: "#b08d43" }}>·</span>
                  ) : null}
                  <span>{s}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                alignSelf: "flex-start",
                marginTop: 36,
                padding: "17px 32px",
                borderRadius: 999,
                backgroundColor: "#d8b76a",
                color: "#13192b",
                fontFamily: sans,
                fontWeight: 700,
                fontSize: 23,
              }}
            >
              <span>Book a free 15-minute call</span>
              <span style={{ fontSize: 25 }}>→</span>
            </div>
          </div>

          {/* Contact bar */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: 600,
                height: 1,
                backgroundColor: "rgba(176, 141, 67, 0.35)",
                marginBottom: 18,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontFamily: sans,
                fontSize: 21,
              }}
            >
              <span style={{ fontWeight: 600, color: "#eef1fa" }}>
                +44 731 202 6090
              </span>
              <span style={{ color: "#b08d43" }}>·</span>
              <span style={{ fontWeight: 400, color: "#bcc3d8" }}>
                contact@simple-bookkeeping.co.uk
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
