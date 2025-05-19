export const metadata = {
  title: "Recipe Finder",
  description: "Find delicious recipes for any occasion",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
