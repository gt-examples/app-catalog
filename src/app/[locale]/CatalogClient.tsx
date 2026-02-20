"use client";

import { useState } from "react";

type TranslatedApp = {
  slug: string;
  name: string;
  description: string;
  translatedDescription: string;
  demoUrl: string;
  repo: string;
  tags: string[];
  category: "technical" | "realworld";
};

const GitHubSmall = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function AppCard({ app }: { app: TranslatedApp }) {
  return (
    <div className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 transition-all hover:border-neutral-700 hover:bg-neutral-900">
      <div className="mb-3 flex items-start justify-between">
        <h3 className="font-semibold text-white">{app.name}</h3>
        <a
          href={`https://github.com/${app.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 transition-colors hover:text-white"
          aria-label={`${app.name} on GitHub`}
        >
          <GitHubSmall />
        </a>
      </div>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-neutral-400">
        {app.translatedDescription}
      </p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={app.demoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
      >
        Live Demo →
      </a>
    </div>
  );
}

export function CatalogClient({
  apps,
  allTags,
  technicalTitle,
  technicalSubtitle,
  realWorldTitle,
  realWorldSubtitle,
}: {
  apps: TranslatedApp[];
  allTags: string[];
  technicalTitle: string;
  technicalSubtitle: string;
  realWorldTitle: string;
  realWorldSubtitle: string;
}) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filtered = apps.filter((app) => {
    const matchesSearch =
      !search ||
      app.name.toLowerCase().includes(search.toLowerCase()) ||
      app.translatedDescription.toLowerCase().includes(search.toLowerCase());
    const matchesTags =
      selectedTags.size === 0 ||
      app.tags.some((tag) => selectedTags.has(tag));
    return matchesSearch && matchesTags;
  });

  const technical = filtered.filter((a) => a.category === "technical");
  const realWorld = filtered.filter((a) => a.category === "realworld");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Search & Filters */}
      <div className="mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search apps..."
          className="mb-4 w-full max-w-md rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-neutral-600"
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedTags.has(tag)
                  ? "bg-white text-neutral-900"
                  : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTags.size > 0 && (
            <button
              onClick={() => setSelectedTags(new Set())}
              className="rounded-full px-3 py-1 text-xs font-medium text-neutral-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Technical Demos */}
      {technical.length > 0 && (
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{technicalTitle}</h2>
            <p className="mt-1 text-sm text-neutral-400">{technicalSubtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {technical.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </section>
      )}

      {/* Real-World Apps */}
      {realWorld.length > 0 && (
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">{realWorldTitle}</h2>
            <p className="mt-1 text-sm text-neutral-400">{realWorldSubtitle}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {realWorld.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="py-20 text-center text-neutral-500">No apps match your filters.</p>
      )}
    </main>
  );
}
