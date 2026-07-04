// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "static",
  site: "https://tenureai.dev",
  redirects: {
    "/docs": "/docs/quickstart",
  },
  integrations: [
    starlight({
      defaultLocale: "en",
      title: "Tenure",
      favicon: "/favicon.ico",
      customCss: ["./src/styles/docs.css"],
      components: {
        ThemeSelect: "./src/components/EmptyComponent.astro",
        Header: "./src/components/DocsHeader.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            name: "keywords",
            content:
              "AI memory, developer memory tool, local LLM memory, persistent AI context, VS Code AI memory, localhost AI, coding assistant memory, AI context injection, no RAG memory, AI productivity",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:type",
            content: "website",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: "https://tenureai.dev/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "og:site_name",
            content: "Tenure",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: "index, follow",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "summary_large_image",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:image",
            content: "https://tenureai.dev/og-image.png",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "ai:product-type",
            content: "AI state infrastructure, governance layer, LLM proxy",
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "ai:use-case",
            content:
              "persistent governable state for AI systems, memory drift prevention, scoped belief isolation, AI access governance for engineering teams",
          },
        },
        {
          tag: "script",
          content:
            '\n      {\n        "@context": "https://schema.org",\n        "@graph": [\n          {\n            "@type": "SoftwareApplication",\n            "@id": "https://tenureai.dev/#software",\n            "name": "Tenure",\n            "url": "https://tenureai.dev",\n            "codeRepository": "https://github.com/tenurehq/tenure",\n            "image": "https://tenureai.dev/og-image.png",\n            "applicationCategory": "DeveloperApplication",\n            "operatingSystem": "Linux, macOS, Windows",\n            "description": "Your memory system will drift in ways you cannot detect. Persistent, governable, scoped state for AI systems. Hard boundaries. Full provenance. Audit trails from day one.",\n            "offers": {\n              "@type": "Offer",\n              "price": "0",\n              "priceCurrency": "USD",\n              "availability": "https://schema.org/InStock"\n            },\n            "license": "https://opensource.org/licenses/MIT"\n          },\n          {\n            "@type": "Dataset",\n            "@id": "https://tenureai.dev/#dataset",\n            "name": "precisionMemBench",\n            "description": "A multi-dimensional retrieval benchmark for LLM memory systems measuring retrieval precision, noise isolation, session-turn latency, and belief mutability across 89 cases and 11 providers.",\n            "url": "https://huggingface.co/datasets/tenurehq/precisionmembench",\n            "sameAs": [\n              "https://arxiv.org/abs/2605.11325",\n              "https://github.com/tenurehq/precisionMemBench"\n            ],\n            "license": "https://opensource.org/licenses/MIT",\n            "creator": {\n              "@type": "Organization",\n              "name": "Tenure",\n              "url": "https://tenureai.dev"\n            },\n            "about": {\n              "@id": "https://tenureai.dev/#software"\n            }\n          }\n        ]\n      }\n    ',
          attrs: {
            type: "application/ld+json",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "sitemap",
            href: "/sitemap-index.xml",
          },
        },
        {
          tag: "script",
          attrs: {
            src: "https://white.tenureai.dev/api/script.js",
            "data-site-id": "4644e3f20c35",
            defer: true,
          },
        },
      ],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/tenurehq/tenure",
        },
      ],
      sidebar: [
        { slug: "docs/quickstart" },
        {
          label: "Getting Started",
          items: [{ autogenerate: { directory: "docs/getting-started" } }],
        },
        {
          label: "Memory",
          items: [{ autogenerate: { directory: "docs/memory" } }],
        },
        {
          label: "Clients",
          items: [{ autogenerate: { directory: "docs/clients" } }],
        },
        {
          label: "Teams",
          items: [{ autogenerate: { directory: "docs/teams" } }],
        },
        {
          label: "Reference",
          items: [{ autogenerate: { directory: "docs/reference" } }],
        },
      ],
    }),
    sitemap(),
  ],
});
