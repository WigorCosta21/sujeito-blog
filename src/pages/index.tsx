import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

import { getPrismiscClient } from "../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import techsImage from "../../public/images/techs.svg";

import styles from "../styles/home.module.scss";

type Content = {
  title: string;
  titleContent: string;
  link_action: string;
  mobileTitle: string;
  mobileContent: string;
  mobile_banner: string;
  webTitle: string;
  webConent: string;
  webBanner: string;
};
interface IContentProps {
  content: Content;
}

const Home = ({ content }: IContentProps) => {
  return (
    <>
      <Head>
        <title>Apaixonado por tecnologia - Sujeito programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.containerHeader}>
          <section className={styles.ctaText}>
            <h1>{content.title}</h1>
            <span>{content.titleContent}</span>
            <a href={content.link_action} target="blank">
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
            <h2>{content.mobileTitle}</h2>
            <span>{content.mobileContent}</span>
          </section>
          <img
            src={content.mobile_banner}
            alt="Conteúdos desenvolvimento de apps"
          />
        </div>

        <hr className={styles.divider} />
        <div className={styles.sectionContent}>
          <img
            src={content.webBanner}
            alt="Conteúdos desenvolvimento de aplicações web"
          />
          <section>
            <h2>{content.webTitle}</h2>
            <span>{content.webConent}</span>
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
          <a href={content.link_action} target="blank">
            <button>ACESSAR TURMA!</button>
          </a>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismiscClient();

  const response = await prismic.query([
    Prismic.Predicates.at("document.type", "home"),
  ]);

  const {
    title,
    sub_title,
    link_action,
    mobile,
    mobile_content,
    mobile_banner,
    title_web,
    web_content,
    web_banner,
  } = response.results[0].data;

  const content = {
    title: RichText.asText(title),
    titleContent: RichText.asText(sub_title),
    link_action: link_action.url,
    mobileTitle: RichText.asText(mobile),
    mobileContent: RichText.asText(mobile_content),
    mobile_banner: mobile_banner.url,
    webTitle: RichText.asText(title_web),
    webConent: RichText.asText(web_content),
    webBanner: web_banner.url,
  };

  return {
    props: {
      content,
    },
    revalidate: 60 * 2,
  };
};

export default Home;
