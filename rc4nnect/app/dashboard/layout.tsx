import Layout from '@/components/Layout'
import Tabs from './Tabs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout routeIndex={0}>
      <div>
        <Tabs />
        {children}
      </div>
    </Layout>
  )
}
