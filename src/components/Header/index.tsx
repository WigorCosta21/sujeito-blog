import Image from "next/image";

import logo from "../../../public/images/logo.svg";

import styles from "./styles.module.scss";

import { ActiveLink } from "../ActiveLink";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <a href="#">
          <Image src={logo} alt="Sujeito programador logo" />
        </a>

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Conteúdo</a>
          </ActiveLink>
          <ActiveLink href="/about" activeClassName={styles.active}>
            <a>Sobre</a>
          </ActiveLink>
        </nav>

        <a
          className={styles.readyButton}
          href="https://sujeitoprogramador.com.br"
          type="button"
        >
          Começar
        </a>
      </div>
    </header>
  );
};
