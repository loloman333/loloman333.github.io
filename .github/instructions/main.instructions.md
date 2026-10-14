---
description: Project context and coding guidelines for this Jekyll site
applyTo: "**/*"
---

## Project

This repository is a personal website built with Jekyll and GitHub Pages. It uses the Beautiful Jekyll remote theme (`daattali/beautiful-jekyll@6.0.1`) and plugins configured in `_config.yml`.

- Root HTML files are standalone pages such as `about.html`, `projects.html`, `texts.html`, and `tags.html`.
- Blog, project, and text content lives under `content/*/_posts/`.
- `_layouts/home.html` contains the custom home feed logic; `_includes/` contains reusable Liquid/HTML fragments.
- Site-specific assets live under `assets/`; interactive project code may use colocated CSS and JavaScript files.
- The canonical site URL is `https://lolo.place`.

## Content Rules

- Preserve the existing Markdown and YAML front matter style. Posts use `title`, `date`, and optional fields such as `tags`, `featured`, `layout`, `cover-img`, `bg-img`, and `subtitle`.
- Keep post filenames in `YYYY-MM-DD-slug.md` form and preserve the existing collection/category organization.
- Treat prose and poetry as authored content: do not rewrite wording, spelling, line breaks, or HTML markup unless explicitly asked.
- Use Liquid filters and `site.baseurl`/`absolute_url` consistently when adding links or asset references.
- Keep HTML accessible: use meaningful headings, labels, alt text, and valid links.

## Implementation Rules

- Make the smallest focused change and preserve the existing theme, layout, and visual language unless a redesign is requested.
- Prefer existing Jekyll, Liquid, HTML, CSS, and vanilla JavaScript patterns over introducing a framework or dependency.
- Keep page-specific behavior with its page or project assets. Do not put project-specific calculator code into the global configuration or theme overrides.
- Do not edit generated output, `Gemfile.lock`, or unrelated files unless the task requires it.
- Avoid changing `_config.yml` casually; configuration changes require restarting the Jekyll server.

## Validation

- Install dependencies with `bundle install` when needed.
- Run the site locally with `bundle exec jekyll serve` and inspect the affected page for template, link, asset, and responsive issues.
- For content-only changes, verify front matter and the rendered page. For Liquid, CSS, JavaScript, or configuration changes, run a full Jekyll build when practical.
- Report validation commands and any pre-existing failures in the final response.