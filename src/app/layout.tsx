// import { Roboto } from 'next/font/google';
import './globals.css';
import AppProvider from './Provider';

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400', '300', '500', '700', '900'],
//   variable: '--font-roboto',
//   display: 'swap'
// });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` antialiased`} suppressHydrationWarning>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
