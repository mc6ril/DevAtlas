# Docs Content

Content is organized by section folder.

```text
content/
  feature-development/
    _section.json
    create-a-feature.json
    folder-structure.json
```

## Add an article

1. Pick the section folder.
2. Add a new `<article-slug>.json` file.
3. Set `order`, `title`, `lastUpdated`, examples, checklist, and related pages.

The public URL is derived from the folder and file name:

```text
content/feature-development/create-a-feature.json
=> /docs/feature-development/create-a-feature
```

## Add a section

1. Create a folder with the section slug.
2. Add `_section.json`.
3. Add article JSON files next to it.

Article `owner` is optional. If omitted, the section owner is used.
