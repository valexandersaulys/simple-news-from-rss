# Static Site from RSS

Generate a minimal mostly plain text news site from a list of RSS
feeds. 

Inspired by [68k.news](http://68k.news/) and Dan Luu's [minimal site
design](https://danluu.com/octopress-speedup/) 

Designed for paring with
[Quark](https://github.com/valexandersaulys/quark-Docker-image) on a
regular cron job. 

Add in your feed name followed by valid RSS link in `feeds.txt` and
run `npm install` followed by `npm run start`. That's it!

E.g.
```
NPR https://feeds.npr.org/1001/rss.xml
DeferredException https://deferredexception.com/rss/
```

## Customizing Templates

Feel free to customize the templates. Examples are available in
`templates`. Only three are needed plus a `styles.css` file:

+ article.jinja2  
+ feedpage.jinja2  
+ homepage.jinja2  
+ styles.css


## Implementation Notes

Images links are not replaced. They are kept as-is. This means they'll
link to the original site and will not be replicated. I'm open to PRs
to fix this. 

This was written, in part, as an experiment in maximum concurrency
with threads. It may or may not have worked. 


## License

GPL v3 or Later
