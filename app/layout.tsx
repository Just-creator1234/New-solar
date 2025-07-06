// import "./globals.css";
// import 'leaflet/dist/leaflet.css';
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Your App",
//   description: "Your app description",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className="__variable_5cfdac __variable_9a8899 antialiased"
//         suppressHydrationWarning
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider"; // adjust path as needed

export const metadata: Metadata = {
  title: "Your App",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="__variable_5cfdac __variable_9a8899 antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

