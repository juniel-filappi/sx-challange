import type { NextPage } from "next";
import Head from "next/head";
import { DashboardButton } from "../components/DashboardButton";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Welcome to the challange</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center mt-8">
            Bem vindo ao teste da <span className="text-bluesx">SX</span>
          </h1>
          <p className="text-center px-2">
            Neste teste você poderá realizar o cadastro de suas empresas e seus
            respectivos colaboradores.
          </p>

          <h3 className="text-xl mt-10 px-2 text-center">
            Para dar continuidade no cadastro das suas empresas, é necessário
            que você faça o login abaixo: 👇
          </h3>

          <div className="mt-5">
            <DashboardButton />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home;
