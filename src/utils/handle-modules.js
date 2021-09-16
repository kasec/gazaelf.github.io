/**
 * @description Get modules with vite glob and return post by categories with name, tags, description, date
 * @returns {Array<{category: string, name: string, tags: string[], description: string, date: string}>}
 */

export const handleModules = (modules, manifest) => {
  let tags = [];
  let categories = [];

  const newModules = Object.keys(modules)
    .map((rawPath) => {
      // from the route will be replace all before .pages/ by empty string, after that will be replaced the extension (.md|.vue)
      // and in the last replace fn will replaced the initial ./ characters
      const path = rawPath
        .replace(/.*pages\//, "")
        .replace(/\.(md|vue)/, "")
        .replace(/^\.\//, "");
      // path variable will be something like /(blog|thoughts)/(nested dir i. e. web, react, english etc.)
      // so following the structure the path will be split by / and the first element fount will be the category and the following items
      // will be tags to found easily the posts/
      const [category, ..._tags] = (path.match(/.+?\//g) || []).map((tag) =>
        tag.replace(/^\//, "").replace(/\/$/, "")
      );

      // below the name will be a just string and everything before / character will be replaced by empty string
      const name = path.replace(/.+\//, "");

      if (name === "index") return;

      // now manifest should be a json with file name as key
      const { title, description, date, status } = manifest?.[name] || {};

      if (!!title === false)
        console.warn(`Add Title value to [${category}] [${name}] `);
      if (!!description === false)
        console.warn(`Add description value to [${category}] [${name}] `);
      if (!!date === false)
        console.warn(`Add date value to [${category}] [${name}] `);

      // now need to add the tags fount in this file and dont repeat with the previouly added.
      tags = [
        ...tags,
        ..._tags.filter((tag) => !!tags.includes(tag) === false),
      ];
      // now need to add category from the new file and dont repeat identifying if it already exist to dont add it again.
      categories =
        !!categories.includes(category) === false
          ? categories.concat(category)
          : categories;

      return {
        title,
        description,
        date,
        category,
        tags: _tags,
        path: `/${path}`,
        status,
      };
    })
    .filter((item) => item);

  return [newModules, tags, categories];
};
