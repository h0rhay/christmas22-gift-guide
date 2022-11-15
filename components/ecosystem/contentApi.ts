import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import type { ICategorySchema, IKeyOfCategory } from "types";

const contentDirectory = () => {
  console.log({
    level: "debug",
    context: "contentApi:contentDirectory:folderCheck",
    body: [
      fs.existsSync(join(process.cwd(), "_content")),
      fs.existsSync(join(process.cwd(), "chunks/_content")),
    ],
  });
  if (fs.existsSync(join(process.cwd(), "_content")))
    return join(process.cwd(), "_content");
  else return join(process.cwd(), "chunks/_content");
};

export function getCategorySlugs() {
  return fs.readdirSync(`${contentDirectory()}/categories`);
}

export const getLandingPageData = (fields: IKeyOfCategory[] = []) => {
  const fullPath = join(contentDirectory(), `landing.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  type Items = {
    [key: string]: string;
  } & { landingPageImages?: string[] };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  return items;
};

export const getCategoryBySlug = (
  slug: string,
  fields: IKeyOfCategory[] = []
): ICategorySchema => {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(`${contentDirectory()}/categories`, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items: ICategorySchema = { id: data.id };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field: IKeyOfCategory) => {
    if (field === "slug") {
      items[field] = realSlug;
    } else if (field === "content") {
      items[field] = content;
    } else {
      items[field] = data[field] || null;
    }
  });

  return items;
};

export const getAllCategoryData = (fields: IKeyOfCategory[] = []) => {
  const slugs = getCategorySlugs();
  const categories = slugs
    .map((slug) => getCategoryBySlug(slug, fields))
    // sort categories by id
    .sort((category1, category2) => {
      if (typeof category1.id === "number" && typeof category2.id === "number")
        return category1.id < category2.id ? -1 : 1;
      else return -1;
    });
  return categories;
};
