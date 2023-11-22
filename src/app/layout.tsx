import { Poppins } from 'next/font/google'
import './globals.css'
import { Header } from './components/Header'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} flex items-center justify-center bg-background`} >
        <div className="max-w-1920 w-full">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}