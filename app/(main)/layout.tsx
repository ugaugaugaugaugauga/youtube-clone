import Navbar from '../_components/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}
