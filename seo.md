# SEO.md --- Website SEO Implementation & Launch Standard

> **Purpose:** This file is a mandatory implementation guide for the AI
> coding agent building or updating this website. Apply the relevant
> requirements to the actual codebase, framework, content, hosting
> platform, and business model. Do not merely describe SEO improvements:
> implement them, verify them, and report anything that requires human
> credentials or external account access.
>
> **Quality target:** Complete every applicable item and document
> exceptions. No checklist or tool can guarantee a 100/100 score,
> indexing, rich results, or rankings. Never fabricate test results,
> analytics IDs, business details, testimonials, reviews, or schema
> data.

------------------------------------------------------------------------

## 1. Operating Rules for the Coding Agent

1.  **Inspect before changing.** Identify the framework, routing system,
    rendering strategy, package manager, existing metadata,
    sitemap/robots implementation, analytics, deployment target, and
    current URL structure.
2.  **Preserve the project.** Follow the existing architecture and
    conventions. Avoid replacing working infrastructure or adding
    duplicate SEO libraries without a reason.
3.  **Use real information only.** Do not invent the company name,
    address, phone, opening hours, prices, authors, credentials,
    reviews, social profiles, or service areas. Use clearly marked
    configuration placeholders when information is missing and report
    them.
4.  **Make every public page intentional.** Decide whether it should be
    indexable. Public, useful landing pages generally should be
    indexable; private, internal, account, checkout, search-filter,
    staging, and duplicate pages may need exclusion or canonicalization.
5.  **Render crawlable content.** Important text, headings, links,
    metadata, and structured data must be present in the initial HTML
    where practical. For JavaScript-rendered applications, ensure search
    engines can render meaningful page content and that each important
    page has a stable URL.
6.  **No SEO spam.** Do not keyword-stuff, create doorway pages, cloak
    content, hide keyword text, generate fake reviews, or create
    mass-produced low-value pages.
7.  **Verify instead of assuming.** Run available build, lint, tests,
    link checks, and SEO audits. Report actual commands and outcomes.
    Never claim a test passed if it was not run.
8.  **Respect scope.** Do not change design, content meaning, tracking
    consent, or routing in a way that breaks user experience or
    legal/privacy requirements merely to satisfy a generic SEO rule.

## 2. Project Configuration

Create one source of truth for the following values, using the
framework's normal configuration pattern:

-   `SITE_NAME`: official brand or organization name.
-   `SITE_URL`: production origin, e.g. `https://example.com` (no
    trailing slash).
-   `SITE_DESCRIPTION`: accurate concise description of the
    business/site.
-   `DEFAULT_OG_IMAGE`: absolute URL to a real, share-ready image.
-   `DEFAULT_LOCALE`: correct language/locale, e.g. `en`, `en-BD`, or
    `bn-BD`.
-   `BUSINESS_NAME`, `BUSINESS_PHONE`, `BUSINESS_EMAIL`,
    `BUSINESS_ADDRESS`, `BUSINESS_HOURS`, `SERVICE_AREAS`: only if
    applicable and verified.
-   `SOCIAL_PROFILES`: verified official profile URLs only.
-   `ANALYTICS_ID`, `TAG_MANAGER_ID`, verification tokens: supplied by
    the owner, never invented.
-   `PRODUCTION_INDEXING_ENABLED`: true only for the approved production
    site.

Use the actual production domain consistently. Pick one preferred host
(`www` or non-`www`) and redirect the other to it. Keep protocol, host,
trailing-slash, and case conventions consistent.

## 3. Crawlability and Indexing

### Required implementation

-   [ ] Public production pages return the correct HTTP status (`200`
    for valid pages; `301`/`308` for permanent redirects; real
    `404`/`410` for missing/deleted pages).
-   [ ] No accidental `noindex` remains on pages intended for search.
-   [ ] Remove accidental `X-Robots-Tag: noindex` headers as well as
    HTML meta robots directives.
-   [ ] Remove staging-domain references and temporary URLs from
    production metadata, canonical tags, structured data, and sitemaps.
-   [ ] Ensure `robots.txt` does not block important pages or assets
    needed for rendering.
-   [ ] Do not use `robots.txt` as a substitute for `noindex`. A crawler
    must be able to access a page to see its `noindex` directive.
-   [ ] Do not block CSS, JavaScript, or images required to understand
    important page content.
-   [ ] Add a valid `robots.txt` at `/robots.txt`, with the correct
    sitemap URL.
-   [ ] Generate a valid XML sitemap at `/sitemap.xml` (or the
    framework's documented sitemap URL).
-   [ ] Include only canonical, absolute, indexable URLs that return
    `200`.
-   [ ] Exclude redirects, `404`/`410` URLs, `noindex` pages, private
    pages, preview URLs, and duplicate parameter URLs from the sitemap.
-   [ ] Update the sitemap automatically when eligible pages are added,
    changed, or removed.
-   [ ] Use accurate `lastmod` values only when page content
    meaningfully changes; do not update every URL on every build without
    cause.
-   [ ] Ensure every important page can be reached through normal HTML
    links from another discoverable page.
-   [ ] Avoid orphan pages, infinite URL traps, and uncontrolled
    crawlable filter/query combinations.
-   [ ] Return a useful custom 404 page with a real `404` status and
    helpful navigation.
-   [ ] Keep staging and preview deployments protected from indexing
    using appropriate access controls and/or `noindex`; ensure this does
    not leak into production.
-   [ ] Verify the site does not accidentally expose secrets, private
    files, admin pages, environment values, or internal APIs.

### `robots.txt` example

Adapt this to the framework and real site. Do not copy an example
sitemap URL without replacing it with the actual production URL.

``` txt
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

Do not add blanket disallow rules without understanding their effect. If
specific private paths must be excluded from crawling, define those
rules carefully; access control must protect confidential content.

## 4. Metadata for Every Indexable Page

Implement a reusable SEO/metadata component or the framework's native
metadata API. Each indexable route must have its own metadata based on
its actual content.

-   [ ] Unique, descriptive `<title>` for every indexable page.
-   [ ] Unique, useful meta description for every indexable page.
-   [ ] One clear, visible primary `<h1>` that describes the page's main
    purpose.
-   [ ] Correct document language (`lang`) attribute.
-   [ ] Correct character encoding and responsive viewport declaration.
-   [ ] Self-referencing canonical URL for each canonical page, unless a
    justified canonical strategy says otherwise.
-   [ ] Canonical URL uses the preferred HTTPS host and consistent path
    format.
-   [ ] Open Graph metadata: `og:title`, `og:description`, `og:type`,
    `og:url`, `og:image`, and `og:site_name` where appropriate.
-   [ ] Social card metadata, such as `twitter:card`, `twitter:title`,
    `twitter:description`, and `twitter:image`, when useful for
    supported platforms.
-   [ ] A real favicon and appropriate web app icons.
-   [ ] No duplicate, conflicting, empty, or template-default metadata
    on important pages.
-   [ ] No unsupported promises, false claims, or keyword lists in
    metadata.
-   [ ] Do not add a `meta keywords` tag; major search engines do not
    use it for ranking.
-   [ ] Metadata is rendered in the document head and is not dependent
    on a click or delayed client-only interaction.

### Title and description guidance

-   Write naturally for the page and search intent. Put the primary
    topic near the beginning when it reads well, then add the brand when
    useful.
-   Aim for a concise title (often around 50--60 characters) and a
    helpful description (often around 140--160 characters), but treat
    these as editorial guidelines, not hard limits. Search engines may
    rewrite or truncate snippets.
-   Make titles and descriptions distinct across pages. Do not repeat
    the same city or keyword unnaturally.
-   Descriptions should accurately summarize the page and invite the
    right visitor to click. They are not a guaranteed ranking factor.
-   Do not force a keyword into every heading or metadata field.

Example only:

``` html
<title>Kitchen Cabinet Design & Installation | Example Brand</title>
<meta name="description" content="Explore custom kitchen cabinet design, material options, and installation services. Request a project consultation with Example Brand.">
<link rel="canonical" href="https://example.com/kitchen-cabinets">
```


## 4A. Metadata and Security Header Acceptance Rules

Use these as automated audit rules where practical:

- **Title length:** flag titles longer than 60 characters for review, but do not automatically cut them off. Character count is a heuristic, not a universal search-engine limit; displayed title width and rewrites vary.
- **Canonical URL:** every indexable page must resolve to one correct absolute canonical URL on the preferred HTTPS domain. Confirm the canonical destination returns `200` and is not `noindex`.
- **H1:** require exactly one visible primary H1 per page template, including product details. This is a useful consistency/accessibility rule, not a guarantee of ranking improvement.
- **Open Graph:** require `og:title`, `og:description`, `og:type`, `og:url`, and a working absolute `og:image` for important public pages.
- **Twitter/X card:** require `twitter:card`; use `summary_large_image` when the page has a suitable large image.
- **Security headers:** check actual production HTTP responses. HSTS, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`/`X-Frame-Options`, and COOP are security hardening requirements, not direct SEO ranking signals. Configure them safely for the app rather than blindly applying one universal policy.

## 5. URL and Site Architecture

-   [ ] Use readable, stable, descriptive URLs, preferably lowercase
    with hyphens.
-   [ ] Avoid unnecessary parameters, random IDs, session IDs, and
    duplicate paths in public canonical URLs.
-   [ ] Keep URLs stable; do not rename routes without a reason.
-   [ ] If a URL must change, implement a direct permanent redirect from
    the old URL to the most relevant new URL.
-   [ ] Avoid redirect chains and loops.
-   [ ] Do not redirect every missing URL to the homepage.
-   [ ] Use breadcrumbs where they genuinely help users understand the
    hierarchy.
-   [ ] Use consistent navigation and meaningful internal links.
-   [ ] Use descriptive anchor text; avoid excessive generic text such
    as "click here."
-   [ ] Link related services, products, categories, articles, and
    contact pages where useful.
-   [ ] Do not create pages that differ only by swapped keywords or city
    names unless each page has real, distinct value.
-   [ ] For multilingual/multiregional content, use appropriate
    language-specific URLs and valid reciprocal `hreflang` annotations,
    including self and any `x-default` where appropriate. Do not add
    `hreflang` for languages or pages that do not exist.

## 6. Content Quality and On-Page SEO

For each important page:

-   [ ] Identify the likely user intent and the page's unique purpose.
-   [ ] Write original, useful, accurate content for people---not just
    search engines.
-   [ ] Explain what is offered, who it is for, key benefits,
    limitations, process, pricing or quote details where appropriate,
    and the next useful action.
-   [ ] Use a logical heading hierarchy (`h1`, then `h2`, `h3` as
    needed). Do not choose heading levels purely for visual size.
-   [ ] Include relevant terms naturally; avoid keyword stuffing and
    repetitive copy.
-   [ ] Provide evidence for claims and show appropriate expertise or
    real experience where relevant.
-   [ ] Keep important information in crawlable text, not only inside
    images, canvas elements, or inaccessible interactions.
-   [ ] Add author/reviewer details and publication or update dates for
    content where they are meaningful and truthful.
-   [ ] Keep content current; update or remove obsolete information.
-   [ ] Consolidate thin, overlapping pages when appropriate.
-   [ ] Add useful FAQs only when they genuinely answer customer
    questions. Do not expect FAQ rich results to appear automatically.
-   [ ] Provide clear contact, about, policies, and support information
    appropriate to the site.
-   [ ] Ensure calls to action work and the content matches the page
    title and search snippet.
-   [ ] Do not publish fabricated testimonials, fake credentials,
    misleading comparisons, copied text, or AI-generated filler.
-   [ ] For e-commerce, provide unique product descriptions, accurate
    availability/prices, variant handling, returns/shipping information,
    and crawlable category/product links.

## 7. Images, Video, and Other Media

-   [ ] Use relevant, properly licensed media and modern formats such as
    AVIF or WebP when supported.
-   [ ] Compress and resize assets to their actual display dimensions;
    avoid shipping huge originals to small screens.
-   [ ] Give meaningful content images descriptive filenames and concise
    alt text that conveys their purpose.
-   [ ] Use `alt=""` for purely decorative images; do not stuff keywords
    into alt text.
-   [ ] Keep essential text out of images where possible.
-   [ ] Specify image width and height or an aspect ratio to reduce
    layout shifts.
-   [ ] Lazy-load below-the-fold images; do not lazy-load the likely
    Largest Contentful Paint (LCP) image.
-   [ ] Use responsive image sources (`srcset`/`sizes` or framework
    equivalents).
-   [ ] Use a suitable high-quality social sharing image with absolute
    URL.
-   [ ] Add video transcripts/captions when appropriate and provide a
    crawlable page with useful context.
-   [ ] Add image/video sitemap extensions only when useful and
    correctly supported.

## 8. Structured Data (JSON-LD)

-   [ ] Add valid JSON-LD only for entity/page types that match the
    visible page content.
-   [ ] Use the most specific supported schema type that accurately
    describes the content.
-   [ ] Keep structured data consistent with visible content and the
    canonical URL.
-   [ ] Use real, verified entity names, addresses, phone numbers,
    prices, availability, images, and profile URLs.
-   [ ] Validate JSON syntax and test eligible pages with Google's Rich
    Results Test and Schema Markup Validator where relevant.
-   [ ] Avoid fake reviews, ratings, offers, events, or other misleading
    structured data.
-   [ ] Do not expect structured data to guarantee rich results.

Potential types---select only what applies:

-   `Organization` or the most appropriate organization subtype for the
    brand.
-   `LocalBusiness` or a more specific subtype only for a genuine
    eligible business; keep name, address, phone, and hours accurate.
-   `WebSite` for site-level identity; do not assume a site-name schema
    guarantees a search display.
-   `WebPage` for page identity.
-   `BreadcrumbList` when breadcrumbs are visible and meaningful.
-   `Article` / `BlogPosting` for genuine editorial content, with
    truthful author and dates.
-   `Product` and `Offer` for real products and accurate offer details.
-   `Service` where it accurately describes a service; do not assume a
    special Google rich result exists for every schema type.
-   `Event`, `Recipe`, `VideoObject`, or other types only when the page
    genuinely qualifies.

Do not add every schema type to every page. Avoid duplicate schema
generated by multiple plugins/components. Use absolute URLs and stable
IDs where appropriate. Never include private personal information.

## 9. Local SEO (When the Website Serves a Real Local Business)

-   [ ] Display accurate business name, address, and phone (NAP) where
    appropriate.
-   [ ] Keep business details consistent with the owner's real-world
    listings.
-   [ ] Create useful location/service-area content based on actual
    operations; do not fabricate offices or locations.
-   [ ] Add appropriate local business structured data only when
    eligible.
-   [ ] Link to the official Google Business Profile when one exists.
-   [ ] Provide real opening hours, service areas, contact methods, and
    directions where applicable.
-   [ ] Make it easy for customers to contact or request a quote.
-   [ ] Do not add a street address to a service-area business if it is
    not eligible to display one publicly.
-   [ ] Do not create fake locations or incentivize/manipulate reviews.

A Google Business Profile is not applicable to every website. Create or
claim one only for an eligible real-world business; online-only
businesses may not qualify.

## 10. Technical SEO, Rendering, and Accessibility

-   [ ] Important pages use semantic HTML and accessible, crawlable
    `<a href="...">` links.
-   [ ] Buttons perform actions; navigation uses links rather than
    clickable non-semantic containers.
-   [ ] Each important content item has a stable, directly accessible
    URL.
-   [ ] Avoid relying on click-only, hover-only, or infinite-scroll-only
    access to important content.
-   [ ] Ensure client-side routing updates titles, metadata, canonical
    URLs, and page content correctly.
-   [ ] Confirm direct visits and refreshes work on nested routes.
-   [ ] Provide useful loading, empty, error, and not-found states.
-   [ ] Check for broken internal links, redirect chains, duplicate IDs,
    and console errors.
-   [ ] Ensure text contrast, keyboard navigation, focus states, form
    labels, and image alternatives are accessible.
-   [ ] Use appropriate HTTP status codes and avoid serving the same
    page as `200` for all unknown routes.
-   [ ] Add pagination or crawlable alternatives for large lists when
    appropriate.
-   [ ] Avoid blocking important resources with authentication, bot
    challenges, or CDN/firewall rules.
-   [ ] Ensure search engine crawlers receive the intended public page
    rather than a blank shell, access-denied page, or bot-check screen.

Accessibility is a user requirement, not a substitute for SEO. Do not
add ARIA roles when native semantic HTML already provides the correct
behavior.

## 11. Performance and Core Web Vitals

Optimize real-user experience on mobile and desktop.

-   [ ] Measure the production build, not only the development server.
-   [ ] Minimize unused JavaScript and CSS; split code when useful.
-   [ ] Remove unnecessary libraries, duplicate dependencies, and
    blocking third-party scripts.
-   [ ] Optimize fonts, preload only critical resources, and use
    `font-display` appropriately.
-   [ ] Avoid layout shifts caused by images, ads, embeds, banners, and
    dynamically injected content.
-   [ ] Optimize the LCP element and avoid lazy-loading it.
-   [ ] Use caching and compression supported by the hosting platform.
-   [ ] Set sensible cache headers for versioned static assets.
-   [ ] Optimize server response time and avoid unnecessary client-side
    fetching for core page content.
-   [ ] Defer nonessential scripts and load third-party widgets only
    when needed.
-   [ ] Test key templates and important landing pages with PageSpeed
    Insights or Lighthouse.
-   [ ] Record actual results and fix high-impact issues; do not claim a
    perfect score without test evidence.

Current Core Web Vitals "good" thresholds are generally: - **LCP:** 2.5
seconds or less. - **INP:** 200 milliseconds or less. - **CLS:** 0.1 or
less.

Assess these at the 75th percentile of real-user visits where field data
is available. Lab scores are useful diagnostics but are not the same as
field performance.

## 12. Security and HTTPS

-   [ ] Production site uses valid HTTPS.
-   [ ] HTTP requests permanently redirect to the preferred HTTPS URL.
-   [ ] All canonical URLs, sitemap URLs, internal links, and structured
    data use HTTPS.
-   [ ] No mixed-content resources remain.
-   [ ] Certificate is valid and renews correctly.
-   [ ] Secure cookies and relevant security headers are configured
    appropriately.
-   [ ] Secrets, API keys, credentials, and private environment
    variables are never exposed in client code or committed to the
    repository.
-   [ ] Forms and endpoints have appropriate validation, abuse
    protection, and privacy safeguards.

## 13. Analytics, Search Console, and Consent

Implement code where possible, but do not pretend to create or verify
external accounts without authorized access.

-   [ ] Install Google Analytics 4 using the owner's real measurement ID
    or approved tag manager setup.
-   [ ] Avoid loading duplicate GA4 tags.
-   [ ] Track meaningful events only when useful: form submissions,
    qualified leads, purchases, sign-ups, and other real conversions.
-   [ ] Do not send sensitive personal information to analytics.
-   [ ] Respect applicable privacy laws and consent requirements. Where
    consent is required, implement a suitable consent flow and ensure
    analytics/tag behavior follows it.
-   [ ] Add the verified Google Search Console token or verification
    method supplied by the owner, if needed.
-   [ ] Configure Bing Webmaster Tools verification when
    credentials/access are available.
-   [ ] Ensure analytics does not materially harm performance.
-   [ ] Test analytics in the relevant debug/realtime tools when access
    is available.
-   [ ] Document any external setup that still needs the owner.

## 14. AI Search and OpenAI Crawler Access

To make public content eligible for discovery by ChatGPT Search:

-   [ ] Review `robots.txt`, CDN, WAF, hosting, and bot-protection rules
    for `OAI-SearchBot`.
-   [ ] Do not intentionally block `OAI-SearchBot` if the owner wants
    ChatGPT Search discovery.
-   [ ] Check that public pages return successful responses and useful
    content to permitted crawlers.
-   [ ] Avoid bot challenges or access rules that inadvertently prevent
    legitimate crawler access.
-   [ ] Confirm image URLs and essential page resources are accessible
    when they are intended to be public.
-   [ ] Re-check crawl access after deploying security/CDN changes.
-   [ ] Explain that allowing a crawler does not guarantee that a page
    will be cited, indexed, or shown in ChatGPT Search.

Example robots directive, if the site owner wants to permit this crawler
and no other policy requires a restriction:

``` txt
User-agent: OAI-SearchBot
Allow: /
```

Keep the site's general robots policy and sitemap directive too.
`OAI-SearchBot` is for search discovery. Other OpenAI crawlers can have
different purposes and controls; do not automatically allow every bot
without understanding the owner's goals.

## 15. Search Engine and Indexing Setup

After the site is deployed to its real production domain:

-   [ ] Verify ownership in Google Search Console.
-   [ ] Submit the sitemap in Search Console.
-   [ ] Inspect the homepage URL and request indexing if appropriate.
-   [ ] Inspect representative important pages and resolve
    crawl/indexing issues.
-   [ ] Verify the site in Bing Webmaster Tools.
-   [ ] Submit the sitemap to Bing.
-   [ ] Consider IndexNow for supported search engines if the site's
    platform can implement it correctly.
-   [ ] Check for manual actions, security issues, crawl errors, and
    sitemap processing errors.
-   [ ] Monitor indexing and search performance over time.

Indexing requests and sitemap submission are hints, not guarantees.
Search engines decide when and whether to crawl, index, and display
URLs.

## 16. Framework-Specific Implementation

Adapt the implementation to the existing stack. Do not blindly add files
or dependencies from a different framework.

-   **Next.js:** use the supported Metadata API, metadata routes or
    sitemap/robots files, and appropriate static/dynamic rendering.
    Ensure canonical URLs and metadata are route-specific.
-   **React/Vite SPA:** ensure each important page has a stable URL and
    meaningful crawlable rendering; consider prerendering or SSR for
    public content if needed. Client-only metadata can be unreliable for
    some crawlers.
-   **Astro/SvelteKit/Nuxt/Remix:** use framework-native metadata, route
    handling, SSR/static generation, and sitemap approaches.
-   **WordPress/CMS:** check existing SEO plugins and CMS-generated
    sitemaps before adding custom implementations; avoid duplicate tags
    and duplicate sitemaps.
-   **Static HTML:** provide page-specific head metadata, canonical
    tags, sitemap, robots file, semantic content, and correct hosting
    redirects.

Before installing any dependency, confirm it is necessary, compatible,
maintained, and not already covered by the project.

## 17. Automated Verification

Run the applicable checks available in the project:

1.  Production build.
2.  Linter and type checks.
3.  Automated tests.
4.  Crawl all known public routes and check HTTP status.
5.  Confirm each indexable route has a unique title, description,
    canonical URL, and primary heading.
6.  Confirm no unintended `noindex` meta tags or `X-Robots-Tag` headers.
7.  Fetch `/robots.txt` and the sitemap; validate syntax and sitemap URL
    eligibility.
8.  Check internal links, redirects, broken assets, and missing alt
    attributes.
9.  Validate structured data on representative eligible pages.
10. Run Lighthouse/PageSpeed checks for key page templates.
11. Inspect the rendered production HTML for essential text and
    metadata.
12. Verify mobile layouts and important conversion flows.
13. Check production domain consistency and HTTPS.
14. Confirm analytics events only if IDs and access are available.

If the project lacks a suitable testing tool, use the simplest
compatible approach and explain any remaining manual checks. Never claim
that live URLs, accounts, crawler access, or real-user metrics were
tested unless they were actually tested.

## 18. Mandatory Publishing Checklist Overlay

Display this checklist in the project handoff, launch documentation, or
a post-build checklist UI. Mark items as **Complete**, **Needs owner
action**, **Not applicable**, or **Blocked**---never mark an item
complete just because code was generated.

### Pre-publish technical checks

-   [ ] Production build passes.
-   [ ] All important routes load directly and return the correct
    status.
-   [ ] Canonical URLs, titles, descriptions, headings, internal links,
    and structured data are checked.
-   [ ] Sitemap and robots.txt are available on the production domain.
-   [ ] No secrets, test content, staging URLs, or unintended noindex
    rules remain.
-   [ ] HTTPS and preferred-domain redirects work.
-   [ ] Mobile usability, key forms, and conversion actions are tested.
-   [ ] Performance has been measured and major issues addressed.

### Owner's launch checklist --- required from the original brief

1.  [ ] **Remove the Noindex Tag** --- remove `noindex` from production
    pages intended for indexing, including any HTTP `X-Robots-Tag`
    header. Keep intentional exclusions for private or duplicate pages.
2.  [ ] **Set Up Google Search Console** --- verify ownership of the
    real production domain.
3.  [ ] **Submit Your Sitemap** --- submit the live XML sitemap in
    Search Console and check processing status.
4.  [ ] **Request Indexing for Your Homepage** --- use URL Inspection
    after deployment; repeat for a small set of priority pages if
    appropriate.
5.  [ ] **Set Up Bing Webmaster Tools** --- verify the production site
    and submit its sitemap.
6.  [ ] **Install Google Analytics** --- add the correct GA4 ID or
    approved tag manager configuration, honor consent requirements, and
    test data collection.
7.  [ ] **Create Google Business Profile** --- only if the business is
    eligible; use real business details and complete Google's
    verification process.
8.  [ ] **Switch On HTTPS** --- enable a valid TLS certificate, force
    HTTPS, and check for mixed content.
9.  [ ] **Write a Unique Title for Every Page** --- audit every
    indexable page, not just the homepage.
10. [ ] **Check Your Page Speed** --- test key pages with PageSpeed
    Insights/Lighthouse and address high-impact problems.
11. [ ] **Allow ChatGPT Search to Crawl Your Site** --- allow
    `OAI-SearchBot` in robots/CDN/WAF settings if the owner wants
    ChatGPT Search discovery; verify public URLs are accessible.

### Post-publish monitoring

-   [ ] Confirm the live homepage and important routes work from a
    logged-out browser.
-   [ ] Check Search Console sitemap status, URL Inspection, indexing
    reports, and security/manual-action reports.
-   [ ] Check Bing Webmaster Tools crawl and indexing reports.
-   [ ] Confirm analytics is receiving data without duplicate tracking.
-   [ ] Re-test redirects, HTTPS, canonical tags, robots rules, and
    sitemap after deployment.
-   [ ] Set a follow-up review after enough data has accumulated; do not
    promise instant indexing or ranking.

## 19. Definition of Done

The website is **SEO implementation complete** only when:

-   All applicable code-level requirements are implemented.
-   All important public routes have intentional indexability and unique
    metadata.
-   Crawlability, canonicalization, redirects, robots.txt, sitemap, and
    HTTPS are verified.
-   Content, headings, internal links, images, and relevant structured
    data are reviewed.
-   Performance and mobile usability have been tested on a production
    build or live deployment.
-   Analytics and external verification steps are implemented where
    possible, with owner-only steps clearly identified.
-   The mandatory publishing checklist is included in the handoff.
-   The final report separates **Implemented**, **Tested**, **Needs
    owner action**, **Not applicable**, and **Blocked** items.
-   Actual test outcomes and known issues are reported honestly.

### Required final report from the coding agent

At completion, provide:

1.  **What changed:** files and features implemented.
2.  **Pages covered:** routes checked and any excluded routes with
    reasons.
3.  **Validation results:** commands/tools used and real pass/fail
    outcomes.
4.  **SEO gaps:** issues not resolved and their impact.
5.  **Owner actions:** accounts, IDs, DNS, hosting, business
    verification, or credentials still required.
6.  **Launch status:** Ready, Ready with owner actions, or Blocked.

------------------------------------------------------------------------

## Official references

Use current official documentation when requirements change:

-   Google SEO Starter Guide:
    https://developers.google.com/search/docs/fundamentals/seo-starter-guide
-   Google Search Essentials:
    https://developers.google.com/search/docs/essentials
-   Google developer SEO guide:
    https://developers.google.com/search/docs/fundamentals/get-started-developers
-   Google sitemap guidance:
    https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
-   Google Search Console: https://search.google.com/search-console
-   Bing Webmaster Tools: https://www.bing.com/webmasters/
-   Bing Webmaster Guidelines:
    https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
-   OpenAI crawler guidance:
    https://help.openai.com/en/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers
-   PageSpeed Insights: https://pagespeed.web.dev/
-   Schema Markup Validator: https://validator.schema.org/
-   Rich Results Test: https://search.google.com/test/rich-results
