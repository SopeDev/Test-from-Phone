import './globals.css'

export const metadata = {
  title: 'Test From Phone',
  description: 'Next.js project',
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
