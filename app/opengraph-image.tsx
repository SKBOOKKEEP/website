import { ImageResponse } from "next/og";

export const alt = "Sabina Krajewska | Accountant & Bookkeeper Liverpool";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#131b2e",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "4px",
          background: "#725b29",
          marginBottom: "40px",
        }}
      />
      <div
        style={{
          color: "#f8f9ff",
          fontSize: "64px",
          fontWeight: "700",
          lineHeight: "1.1",
          marginBottom: "16px",
          fontFamily: "Georgia, serif",
        }}
      >
        Sabina Krajewska
      </div>
      <div
        style={{
          color: "#7c839b",
          fontSize: "28px",
          marginBottom: "48px",
          fontFamily: "sans-serif",
        }}
      >
        Accountant & Bookkeeper · Liverpool
      </div>
      <div
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        {["Bookkeeping", "HMRC Consulting", "VAT Returns", "Payroll"].map(
          (s) => (
            <div
              key={s}
              style={{
                color: "#725b29",
                fontSize: "16px",
                borderLeft: "2px solid #725b29",
                paddingLeft: "12px",
                fontFamily: "sans-serif",
              }}
            >
              {s}
            </div>
          ),
        )}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "80px",
          color: "#7c839b",
          fontSize: "18px",
          fontFamily: "sans-serif",
        }}
      >
        simple-bookkeeping.co.uk
      </div>
    </div>,
    { ...size },
  );
}
