import { getServerSession } from 'next-auth'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

import { poppins } from './fonts'

import { CartContextProvider } from '../contexts/CartContextProvider'

import { Cart } from '../components/Cart'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import SessionProvider from '../components/SessionProvider'

import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "Pizzaria D'art",
    template: "%s | Pizzaria D'art"
  },
  description: "A pizzaria dos seus sonhos agora on-line!"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} overflow-x-hidden flex items-center justify-center bg-[#862000]`} >
        <div className="max-w-1920 w-full bg-background">
          <SessionProvider session={session}>
            <CartContextProvider>
              <Header />
              <Cart />
              <ToastContainer position='bottom-right' theme='colored' />

              {children}
              <Footer />
            </CartContextProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}