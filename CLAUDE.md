becbgk.edu site is fully scraped at ../data/scraped/site/...

## some principles 

- by each page being prod ready i mean the following things
  - all the provided images are used appropriately
  - all the data (text, stats, photos, pdfs) are source verified - either from "provided new data" or "optimized photos", or "scraped site/ assets" or actual current data from the respected pages from becbgk.edu content / copy on the website live rn (you may need to re-read or scrape the live pages)
  - we showcase all the data provided to us or if porting an existing page then all the upstream data exist in our new UI website
  - there is no any dummy, lorem ipsum type, placeholder things at all in the page
  - the page is responsive with very good ux for all device types and cross browser compatibility
  - the page should be decently optimized for lower end and lower network region accessible
  - visually speaking and layout wise speaking, the design should be very well aligned according to a premier institute website.
  - remove the content which we were not able to verify and inform the user boldly

## data source precedence

Whenever a question comes up about missing data, what content to add, or which value is correct, resolve it by checking sources **in this order**, then make a reasonable decision and do it (do not invent data, do not block):

1. **New provided data** — `data/new-provided/<DEPT>/…` (BEC's direct handoff; authoritative, most current).
2. **Scraped site** — `data/scraped/site/becbgk.edu/…` (+ manifests in `data/scraped/manifests/`).
3. **Live becbgk.edu pages** — fetch/re-scrape the relevant page for current copy.

If data is none of the above, we should remove it and inform the user about it.