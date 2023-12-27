import './globals.css'

import { HeaderContainer } from '../components/HeaderContainer'
import { Footer } from '../components/Footer'

import { poppins } from './fonts'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../contexts/CartContextProvider'

import SessionProvider from '../components/SessionProvider'

import { getServerSession } from 'next-auth'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} overflow-x-hidden flex items-center justify-center bg-background`} >
        <div className="max-w-1920 w-full">
          <SessionProvider session={session}>
            <CartContextProvider>
              <HeaderContainer />
              <Cart />
              {children}
              <Footer />
            </CartContextProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}