
//
import './globals.css'
import { Inter } from 'next/font/google'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Providers } from './redux/providers';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Know Your Home',
  description: 'Generated by Know Your Home',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className={inter.className}>
        {/* <Providers> */}
        {children}
        {/* </Providers> */}
      </body>
    </html>
  )
}
