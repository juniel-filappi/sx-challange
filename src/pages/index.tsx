import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div className="px-8">
      <Head>
        <title>Welcome to the challange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center">
            Welcome to the SX challange
          </h1>
          <p className="text-center">
            This is a simple challange to test your skills with Next.js and
            TailwindCSS.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
