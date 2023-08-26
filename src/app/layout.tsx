import './globals.css'

import { Montserrat } from 'next/font/google'

export const montserrat = Montserrat({
  subsets : ['latin'],
  display : 'swap',
  variable : '--Montserrat'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en" className={`${montserrat.variable} `}>
      <body className='w-full flex flex-col items-center overflow-x-visible -z-50'>
        {children}
      </body>
    </html>
  );
}
