import './globals.css'
//import { Inter } from 'next/font/google'
import Provider from './context/AuthContext'
import ToasterContext from '@/app/context/ToasterContext'
import { Montserrat } from 'next/font/google'
import { Providers } from './providers'

const montserrat = Montserrat({ subsets: ['latin'] })
//const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <Provider>
          <Providers>
          <ToasterContext />
          {children}
          </Providers>
        </Provider>
      </body>
    </html>
  )
}

