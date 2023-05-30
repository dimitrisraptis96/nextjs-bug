// const { withSentryConfig } = require("@sentry/nextjs");
const readingTime = require("reading-time");
const mdxPrism = require("mdx-prism");
const withPlugins = require("next-compose-plugins");
const withMdxEnhanced = require("next-mdx-enhanced");
const withPWA = require("next-pwa")({
  dest: "public",
});

const pwaConfig = {
  pwa: {
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV === "development",
  },
};

const mdxConfig = {
  layoutPath: "components/layouts",
  defaultLayout: true,
  fileExtensions: ["mdx"],
  usesSrc: false,
  reExportDataFetching: false,
  remarkPlugins: [
    import("remark-autolink-headings"),
    import("remark-slug"),
    import("remark-code-titles"),
    // require("./utils/titleStyle"),
  ],
  rehypePlugins: [mdxPrism],
  extendFrontMatter: {
    process: (mdxContent) => ({
      wordCount: mdxContent.split(/\s+/gu).length,
      readingTime: readingTime(mdxContent),
    }),
    phase: "prebuild|loader|both",
  },
};

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ["three"],
  // experimental: {
  // enableUndici: true,
  // newNextLinkBehavior  : false
  // },
  images: {
    domains: ["pbs.twimg.com", "storage.googleapis.com", "iad.microlink.io"],
  },
  async redirects() {
    return [
      {
        source: "/editor",
        destination: "/studio",
        permanent: false,
      },
      {
        source: "/tools/create-video-from-tweet",
        destination: "/tools/animate-tweets",
        permanent: false,
      },
      {
        source: "/tools/email-mockup-maker",
        destination: "/studio?templateId=email_framer_mockup",
        permanent: false,
      },
      {
        source: "/christmas-hat",
        destination: "/tools/profile-picture-maker/christmas",
        permanent: false,
      },
      {
        source: "/roadmap",
        destination: "https://app.loopedin.io/brandbird#/roadmap",
        permanent: false,
      },
      // {
      //   source: "/changelog",
      //   destination: "https://changelog.brandbird.app",
      //   permanent: false,
      // },
      {
        source: "/ideas",
        destination: "https://app.loopedin.io/brandbird#ideas",
        permanent: false,
      },
      {
        source: "/api/request-access",
        destination: "https://tally.so/r/wQWWGm",
        permanent: false,
      },
      {
        source: "/api",
        destination:
          "https://brandbird.notion.site/BrandBird-API-a59e2135060a456d9567965812f5ba41",
        permanent: false,
      },
      {
        source: "/brand-assets",
        destination: "/brand-guidelines",
        permanent: false,
      },
      {
        source: "/download/chrome-extensions/latest",
        destination:
          "https://storage.googleapis.com/brandflow-bucket/brandbird/download/brandbird-0.0.1.zip",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/dashboard/video", // change to appropriate path
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/tools/animate-tweets",
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/tools/mp4-to-gif-converter", // change to appropriate path
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/tools/twitter-gif-downloader", // change to appropriate path
        headers: [
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=86400000, s-maxage=86400000, stale-while-revalidate=86400000",
          },
        ],
      },
    ];
  },
  // webpack(config, options) {
  //   config.module.rules.push({
  //     test: /\.(glb|gltf)$/,
  //     use: {
  //       loader: "file-loader",
  //     },
  //   });

  //   return config;
  // },
  modularizeImports: {
    "iconoir-react": {
      transform: "iconoir-react/dist/{{member}}",
    },
  },
  webpack: (webpackConfig, { isServer, webpack }) => {
    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    webpackConfig.resolve.fallback = { fs: false, path: false, net: false };

    return webpackConfig;
  },
};

module.exports = withPlugins(
  [
    [withPWA, pwaConfig],
    [withMdxEnhanced, mdxConfig],
  ],
  nextConfig
);
