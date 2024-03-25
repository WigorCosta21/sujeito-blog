import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

import thumbImg from "../../../public/images/thumb.png";

import styles from "./styles.module.scss";

const Posts = () => {
  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link legacyBehavior href="/">
            <a>
              <Image
                src={thumbImg}
                alt="Post título 1"
                width={720}
                height={410}
                quality={100}
              />
              <strong>Criando meu primeiro aplicativo</strong>
              <time>08 FEV 2021</time>
              <p>
                Nesse vídeo falamos de como cobrar por um projeto focando mais
                em pessoas que estão nos primeiros projetos, clientes ou até
                como freelancer e nele falamos uma das maneiras que podemos
                fazer esse calculo.
              </p>
            </a>
          </Link>

          <div className={styles.buttonNavigate}>
            <div>
              <button>
                <FiChevronsLeft size={25} color="#FFF" />
              </button>
              <button>
                <FiChevronLeft size={25} color="#FFF" />
              </button>
            </div>

            <div>
              <button>
                <FiChevronsRight size={25} color="#FFF" />
              </button>
              <button>
                <FiChevronRight size={25} color="#FFF" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Posts;
