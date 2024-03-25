import Prismic from "@prismicio/client";

export const getPrismicClient = (req?: unknown) => {
  const prismic = Prismic.client(process.env.NEXT_PUBLIC_URL as string, {
    req,
  });
  return prismic;
};
