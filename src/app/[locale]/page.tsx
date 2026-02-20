import { T } from "gt-next";
import { getGT } from "gt-next/server";
import { LocaleSelector } from "gt-next";
import { apps, getAllTags } from "@/data/apps";
import { CatalogClient } from "./CatalogClient";

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

async function getTranslatedDescriptions() {
  const gt = await getGT();
  const map: Record<string, string> = {};
  map["next-app"] = gt("Next.js starter app with gt-next basics");
  map["vite-app"] = gt("Vite + gt-react starter");
  map["static-demo"] = gt("Static translation with declareStatic()");
  map["t-component-basics"] = gt("Basic T component usage");
  map["string-translation"] = gt("Server and client string translation with getGT/useGT");
  map["variable-components"] = gt("Var, Num, Currency, DateTime components");
  map["plural-and-branch"] = gt("Plural rules and conditional branching");
  map["shared-strings-msg"] = gt("Shared string constants with msg()");
  map["dynamic-content-tx"] = gt("Runtime translation with Tx and tx()");
  map["locale-routing-middleware"] = gt("Middleware-based locale routing");
  map["rtl-support"] = gt("Right-to-left language support");
  map["dictionary-pattern"] = gt("Key-based translation with loadDictionary");
  map["static-site-generation"] = gt("SSG with generateStaticParams per locale");
  map["local-translation-storage"] = gt("Bundled translations instead of CDN");
  map["server-metadata-seo"] = gt("Translated metadata and OG tags for SEO");
  map["language-length-analysis"] = gt("Text expansion analysis across languages");
  map["restaurant-menu"] = gt("Multilingual restaurant menu");
  map["ecommerce-storefront"] = gt("E-commerce with translated products and prices");
  map["blog-platform"] = gt("MDX blog with multilingual content");
  map["weather-dashboard"] = gt("Weather with locale-aware units");
  map["developer-portfolio"] = gt("Multilingual portfolio site");
  map["saas-dashboard"] = gt("Multi-page SaaS dashboard");
  map["event-landing-page"] = gt("Conference landing page");
  map["recipe-app"] = gt("Recipe browser with locale-aware units");
  map["job-board"] = gt("Multilingual job listings");
  map["travel-booking"] = gt("Hotel and flight booking page");
  map["fitness-tracker"] = gt("Workout tracker with locale-aware units");
  map["music-player"] = gt("Music library with playlists and albums");
  map["task-manager"] = gt("Kanban task board");
  map["real-estate-listings"] = gt("Property listings with locale-aware prices");
  map["news-aggregator"] = gt("News feed with translated categories");
  map["education-platform"] = gt("Course catalog");
  map["social-media-feed"] = gt("Social timeline with translated engagement stats");
  map["movie-database"] = gt("Film catalog with ratings and box office");
  map["crypto-dashboard"] = gt("Crypto price tracker");
  map["airline-booking"] = gt("Flight search results");
  map["customer-support"] = gt("Help desk with FAQ and tickets");
  map["sports-scores"] = gt("Live sports scoreboard");
  map["pricing-page"] = gt("SaaS pricing tiers");
  map["book-library"] = gt("Book catalog");
  map["photo-gallery"] = gt("Photography gallery");
  map["podcast-app"] = gt("Podcast directory");
  return map;
}

export default async function Home() {
  const gt = await getGT();
  const descriptions = await getTranslatedDescriptions();
  const allTags = getAllTags();

  const translatedApps = apps.map((app) => ({
    ...app,
    translatedDescription: descriptions[app.slug] || app.description,
  }));

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <T>
              <h1 className="text-lg font-semibold tracking-tight text-white">
                General Translation <span className="text-neutral-500">/</span>{" "}
                <span className="text-neutral-300">Example Apps</span>
              </h1>
            </T>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/gt-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-white"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <LocaleSelector />
          </div>
        </div>
      </header>

      <CatalogClient
        apps={translatedApps}
        allTags={allTags}
        technicalTitle={gt("Technical Demos")}
        technicalSubtitle={gt("Small, focused examples demonstrating individual GT features")}
        realWorldTitle={gt("Real-World Apps")}
        realWorldSubtitle={gt("Production-like applications showcasing GT in complex scenarios")}
      />
    </div>
  );
}
