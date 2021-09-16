# ME TODO

- [DONE] Create Components to App to create layout and mini components. and take sc to compare with other pictures.
- [TODO] See how plugin hooks works in rollup and virtual-module example, when I learned about its time to change to vite and figure out how it works.
- [TODO]Check how to create a multipage app.
  - use own-dev-server example and vite api resources.
- [TODO] Add markdown support.

- [TODO] Check SSR Vite implementation and check how it works, take sc to compare them.
- Add assets when bundling to production.
- Add tailwind and take sc to compare.
- Add purge css and terser to minimize css and js and compare with other pictures.
- [TODO] When the proccess in bundle its finished delete all html from source.
- [TODO] Check it out https://github.com/hannoeru/vite-plugin-pages
- [TODO] Check it out https://github.com/antfu/vite-ssg
- [TODO] Check it out how [prerender](https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/prerender.js) works and whats the difference between it and wich one works better.
- [TODO] Try ssr rendering about vite-ssr-example to watch which one works better.

- [OVERVIEW] Create a screenshoot about this configuration and create a tag, after that, add prerender configuration and check wich one works better, also try with ssr example (vite-ssr-example)
  - Also check how it works with vue router examples and watch if performance does not fall down too much. Maybe it could be the first blog post.
    `Benchmark`:
  1. Currently (its something like a multi spa) configuration.
  2. Prerender with vue router.
  3. SSR vite-ssr-example. build plugin add with prerender and serve html plugin too.

# UI TODO

- [DONE] Move to TailwindCSS
- [DONE] Media query when device size remove my name and just be with the buttons.
- [DONE] Add multi-page support, like pages as next, nuxt js etc..
- [DONE] Move the index.html to about page.
- [DONE] In the index.html will be the recent posts everything about it.

- [TODO] Add markdown support.
- [TODO] Add remaining projects to projects.html
- [TODO] Deploy System and tag the prev version and create the first blog with the new approach.
- [TODO] Add a different font maybe a montserrat or lobster.
- Update every place example ig and fb, twitter, linkeding to new website.

# Repo config

- [DONE] Before push changes create a tag about this stable version.

- [DONE] Add proper styles in blog.
- [DONE] Blog buttons have to works.
- [DONE] Fix projects when you are in mobile device.
- [DONE] Fix blog for mobile device.

- [DONE] Finish the blog
- [DONE] Clean vite-vanilla-js post, continue with the following post.
- [STANDBY] Fix the blog styles.

  - styles in paragrahph in summary and titles, divider as well see . 3 in vite-vanilla-js Add files... sumarry
  - add left pd form summarry in mobile.

- [DONE] Fix overlap from after pseudoelement. i had to change display property in element to inline-block

- [DONE] reset button in categories.
- [DONE] Check order in blog posts.
  - Add parser to get yaml values from md file and set in post lists and dont use json content.
  - Add meta data in yaml in markdown file and create a plugin to get this values from every md file and with it create a virtual json with the following properties.
- post lists cards edit styles in date, remove bg color and add border instead.
- Add when the scroll ho to bottom open footer wrap and close when is not there.
