# Tâmia Tailwind migration

## 1. Update configs

Replace Panda CSS configs with the new Tâmia/Tailwind configs, refer to the [readme](Readme.md).

## 2. Update theme

Replace TypeScript theme with the new Tailwind theme, refer to the [readme](Readme.md).

## 3. Define typography scale

Add Tailwind utilities for headings and typography styles, refer to the [readme](Readme.md).

## 4. Replace primitive components with Tailwind utilities or class names

These components become plain HTML + Tailwind utility class.

| Component | Replacement |
| --- | --- |
| `Link` | `<a className="link">` |
| `QuotedLink` | `<a className="quoted-link">` |
| `Image` | `<img className="max-w-full h-auto" loading="lazy">` |
| `Expander` | `<div className="expander">` |
| `Heading` | `<h1 className="heading-1">`, `<h2 className="heading-2">`, `<h3 className="heading-3">` |
| `Text` | `<p className="typo-body">`, `<p className="typo-small">`, `<span className="typo-menu">`, etc. |
| `Frame` | `<div className="frame aspect-[9/6]">` |
| `TextContent` | `<div className="prose">` |

These components become plain HTML + class names.

| Component | Replacement |
| --- | --- |
| `Box` | `<div className="...">` |
| `Flex` | `<div className="flex ...">` |
| `Stack` | `<div className="flex flex-col gap-m ...">` |
| `Grid` | `<div className="grid grid-auto-narrow gap-m ...">` |
| `VisuallyHidden` | `<span className="sr-only">` |

### 5. Update spacing scale

Tailwind uses a spacing scale based on 4px.

| Tâmia  | Value          | Tailwind |
| ------ | -------------- | -------- |
| `xxs`  | 0.125rem / 2px | gap-0.5  |
| `xs`   | 0.25rem / 4px  | gap-1    |
| `s`    | 0.5rem / 8px   | gap-2    |
| `m`    | 1rem / 16px    | gap-4    |
| `l`    | 2rem / 32px    | gap-8    |
| `xl`   | 4rem / 64px    | gap-16   |
| `xxl`  | 8rem / 128px   | gap-32   |
| `xxxl` | 16rem / 256px  | gap-64   |

### 6 Update responsive breakpoints

Tailwind uses a t-shirt size breakpoints scale.

| Tâmia     | Value | Tailwind |
| --------- | ----- | -------- |
| `base`    |       |          |
| `tablet`  | 48rem | `md:*`   |
| `desktop` | 62rem | `lg:`    |
