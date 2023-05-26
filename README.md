# Static Site from RSS

## Logic

- Parse list of feeds

  - Get XML
  - Walkthrough links for each feed
    - grab the link for each entry
    - article-parser on that entry
    - parse template with nunjucks -- as link shorthand? -- with fully parsed JSON of list for template
    - dump text file to disk(?)
    - put title and sublink into some master mapping

- Iterate through master mapping
  - Create one homepage -- index.html -- nunjucks in a template
