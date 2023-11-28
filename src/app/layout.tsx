import './globals.css'

import { HeaderContainer } from './components/HeaderContainer'
import { Footer } from './components/Footer'

import { poppins } from './fonts'
import { Cart } from './components/Cart'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} overflow-x-hidden flex items-center justify-center bg-background`} >
        <div className="max-w-1920 w-full">
          <HeaderContainer />
          <Cart />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}