import {
  Bricolage_Grotesque,
  Inter,
  Epilogue,
  Space_Grotesk,
  Geist,
  Geist_Mono,
  AR_One_Sans,
} from "next/font/google";

export const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
export const epilogue = Epilogue({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const arOneSans = AR_One_Sans({ subsets: ["latin"] });
