import './globals.css'

import { HeaderContainer } from '../components/HeaderContainer'
import { Footer } from '../components/Footer'

import { poppins } from './fonts'
import { Cart } from '../components/Cart'
import { CartContextProvider } from '../contexts/CartContextProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} overflow-x-hidden flex items-center justify-center bg-background`} >
        <div className="max-w-1920 w-full">
          <CartContextProvider>
            <HeaderContainer />
            <Cart />
            {children}
            <Footer />
          </CartContextProvider>
        </div>
      </body>
    </html>
  )
}