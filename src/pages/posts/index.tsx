import { useState } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  FiChevronLeft,
  FiChevronsLeft,
  FiChevronRight,
  FiChevronsRight,
} from "react-icons/fi";

import { getPrismicClient } from "../../services/prismic";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";

import styles from "./styles.module.scss";

type Post = {
  slug: string;
  title: string;
  cover: string;
  description: string;
  updatedAt: string;
};
interface IPostsProps {
  posts: Post[];
  page: string;
  totalPage: string;
}

const Posts = ({ posts: postsBlog, page, totalPage }: IPostsProps) => {
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [posts, setPosts] = useState(postsBlog || []);

  const reqPost = async (pageNumber: number) => {
    const prismic = getPrismicClient();

    const response = await prismic.query(
      [Prismic.predicates.at("document.type", "pos")],
      {
        orderings: "[document.last_publication_date desc]", //Ordenar pelo mais recente
        fetch: ["pos.title", "pos.description", "pos.cover"],
        pageSize: 3,
        page: String(pageNumber),
      }
    );

    return response;
  };

  const navigatePage = async (pageNumber: number) => {
    const response = await reqPost(pageNumber);

    if (response.results.length === 0) return;

    const getPosts = response.results.map((post) => {
      return {
        slug: post.uid as string,
        title: RichText.asText(post.data.title),
        description:
          post.data.description.find(
            (content: { type: string }) => content.type === "paragraph"
          )?.text ?? "",
        cover: post.data.cover.url,
        updatedAt: new Date(
          post.last_publication_date as string
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      };
    });

    setCurrentPage(pageNumber);
    setPosts(getPosts);
  };

  return (
    <>
      <Head>
        <title>Blog | Sujeito Programador</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link key={post.slug} legacyBehavior href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <Image
                  src={post.cover}
                  alt={post.title}
                  width={720}
                  height={410}
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN0vQgAAWEBGHsgcxcAAAAASUVORK5CYII="
                />
                <strong>{post.title}</strong>
                <time>{post.updatedAt}</time>
                <p>{post.description}</p>
              </a>
            </Link>
          ))}

          <div className={styles.buttonNavigate}>
            {Number(currentPage) >= 2 && (
              <div>
                <button onClick={() => navigatePage(Number(1))}>
                  <FiChevronsLeft size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(currentPage - 1))}>
                  <FiChevronLeft size={25} color="#FFF" />
                </button>
              </div>
            )}

            {Number(currentPage) < Number(totalPage) && (
              <div>
                <button onClick={() => navigatePage(Number(currentPage + 1))}>
                  <FiChevronRight size={25} color="#FFF" />
                </button>
                <button onClick={() => navigatePage(Number(totalPage))}>
                  <FiChevronsRight size={25} color="#FFF" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Posts;

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    [Prismic.Predicates.at("document.type", "pos")],
    {
      orderings: "[document.last_publication_date desc]", //Ordenar pelo mais recente
      fetch: ["pos.title", "pos.description", "pos.cover"],
      pageSize: 3,
    }
  );

  const posts = response.results.map((post) => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      description:
        post.data.description.find(
          (content: { type: string }) => content.type === "paragraph"
        )?.text ?? "",
      cover: post.data.cover.url,
      updatedAt: new Date(
        post.last_publication_date as string
      ).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
    };
  });
  return {
    props: {
      posts,
      page: response.page,
      totalPage: response.total_pages,
    },
    revalidate: 60 * 30,
  };
};
