import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: "Marina's Decor — Premium Home Decor & Lifestyle Essentials — Pakistan",
  description: "Curated elegance, comfort, and functionality designed to inspire every corner of your living space with Marina's Decor. Free Delivery nationwide in Pakistan.",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-[#1A1A1A]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

