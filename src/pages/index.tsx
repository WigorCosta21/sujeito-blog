import Head from "next/head";

import Image from "next/image";

import techsImage from "../../public/images/techs.svg";

import styles from "../styles/home.module.scss";

const Home = () => {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>Levando você ao próximo nível</h1>
            <span>
              Uma plataforma com cursos que vão do zero até o profissional na
              pratica, direto ao ponto aplicando o que usamos no mercado de
              trabalho. 👊
            </span>
            <a href="">
              <button>COMEÇAR AGORA!</button>
            </a>
          </section>
          <img
            src="/images/banner-conteudos.png"
            alt="Conteúdos Sujeito Programador"
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.sectionContent}>
          <section>
            <h2>Aprenda criar aplicativos para Android e iOS</h2>
            <span>
              Você vai descobrir o jeito mais moderno de desenvolver apps
              nativos para iOS e Android, construindo aplicativos do zero até
              aplicativos.
            </span>
          </section>
          <img
            src="/images/financasApp.png"
            alt="Conteúdos desenvolvimento de apps"
          />
        </div>

        <hr className={styles.divider} />
        <div className={styles.sectionContent}>
          <img
            src="/images/webDev.png"
            alt="Conteúdos desenvolvimento de aplicações web"
          />
          <section>
            <h2>Aprenda criar sistemas web</h2>
            <span>
              Criar sistemas web, sites usando as tecnologias mais modernas e
              requisitadas pelo mercado.
            </span>
          </section>
        </div>

        <div className={styles.nextLevelContent}>
          <Image src={techsImage} alt="Tecnologia" />
          <h2>
            Mais de <span className={styles.students}>15 mil</span> já levaram
            sua carreira ao próximo nivel.
          </h2>
          <span>
            E você vai perder a chance de evoluir de uma vez por todas?
          </span>
          <a href="">
            <button>ACESSAR TURMA!</button>
          </a>
        </div>
      </main>
    </>
  );
};

export default Home;
