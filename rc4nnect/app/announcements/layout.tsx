import Layout from '@/components/Layout'
import Tabs from './Tabs'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div>
      <h1 className="text-4xl font-bold mt-2 mb-6 ml-4 text-black dark:text-white"> Announcements </h1>
        <Tabs />
        {children}
      </div>
    </Layout>
  )
}
