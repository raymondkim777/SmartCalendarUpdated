import { LoginProvider } from "./contexts/LoginContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Smart Calendar",
  description: "Calendar that reads events from Google Calendar and notifies users of the shortest path using public transportation between event locations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoginProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </LoginProvider>
      </body>
    </html>
  );
}
