import { Manrope, Inter } from "next/font/google";
import "@/assets/global.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const manrope = Manrope({
    variable: "--font-headline-sans",
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

const inter = Inter({
    variable: "--font-body-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata = {
    title: 'TravelCRM',
    description: ""
}

export default function RootLayout ({ children }) {

    return (

        <html lang="es" className={`${manrope.variable} ${inter.variable}`}>
            <body>
                <AuthProvider>
                    <main className="w-screen h-screen flex bg-neutro">
                        <div className="w-full h-full" style={{backgroundImage: "url(https://mytravelcrm.netlify.app/login-bg.avif)", backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}></div>
                        <div className="w-full h-full center">
                            {children}
                        </div>
                    </main>
                </AuthProvider>
                <Toaster position="top-right" duration={5000} closeButton={true} richColors />
            </body>
        </html>

    )

}