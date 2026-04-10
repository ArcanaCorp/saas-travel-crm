import Header from "@/layout/Header";
import Navbar from "@/layout/Navbar";

export default function DashboardLayout ({ children }) {

    return (

        <div className="w-screen h-screen flex">
            <Navbar/>
            <main className="w h-screen" style={{"--w": "calc(100dvw - 300px)"}}>
                <Header/>
                <div className="w h p-md overflow-scroll" style={{"--w": "calc(100dvw - 300px)", "--h": "calc(100dvh - 60px)"}}>
                    {children}
                </div>
            </main>
        </div>

    )

}