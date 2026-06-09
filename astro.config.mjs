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
