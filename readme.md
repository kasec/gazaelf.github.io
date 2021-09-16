# Me The Azael's Landing Page.

Add at least 1 image per post, add meta tags.

Search examples
https://www.awwwards.com/sites/landing-about-landing-page
https://www.awwwards.com/awwwards/collections/one-page/

# Process to Upload to Prod.

1. need to build in local with `npm run build`.
2. test build directory and everything works as expected `npm run serve`.
3. in _root_ directory copy `CNAME` file and add it to **dist** dir.
4. comment `/dist` statement in _.gitignore_ file and commit **dist** dir changes.
5. upload the commit with the following `git subtree push --prefix dist origin gh-pages` statement.
6. Now add `dist` to `.gitignore` to avoid uploaded to master.
7. you can upload your changes to your branch if you want it.
