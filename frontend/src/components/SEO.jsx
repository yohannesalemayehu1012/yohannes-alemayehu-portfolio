import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  path = "/",
  image = "/og-image.svg",
  noindex = false,
}) => {
  const siteName = "Yohannes Alemayehu";
  const fullTitle = title === siteName ? siteName : `${title} | ${siteName}`;
  const siteUrl = (
    import.meta.env.VITE_SITE_URL || "http://localhost:5173"
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteName,
          jobTitle: "Software Engineer",
          url: canonicalUrl,
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
