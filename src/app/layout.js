import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import "./globals.css";

// Configure Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Configure JetBrains Mono for code/numbers
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

// Configure Poppins for headings
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "INA NOC Analytics Dashboard",
  description: "Indian Naval Academy - Naval Officer Cadets Analytics Dashboard for Jan 26 Batch",
  keywords: "INA, Naval Academy, Analytics, Dashboard, Officer Cadets",
  authors: [{ name: "Naval Academy Analytics Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#111827",
  openGraph: {
    title: "INA NOC Analytics Dashboard",
    description: "Indian Naval Academy - Naval Officer Cadets Analytics Dashboard",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon and theme */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚓</text></svg>" />
        <meta name="theme-color" content="#111827" />

        {/* Viewport meta for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body
        className={`
          ${inter.variable} 
          ${jetbrainsMono.variable} 
          ${poppins.variable} 
          antialiased
          bg-gradient-to-br 
          from-gray-900 
          via-black 
          to-gray-900
          text-white
          min-h-screen
          selection:bg-blue-500/20
          selection:text-blue-200
        `}
      >
        {/* Background decorative elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Optional: Loading overlay for better UX */}
        <div id="loading-overlay" className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center hidden">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-white text-lg font-semibold">Loading Analytics...</p>
          </div>
        </div>
      </body>
    </html>
  );
}