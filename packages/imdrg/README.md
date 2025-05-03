# @rsxt/imdrg

A highly interactive, draggable and scrollable image track component for React and Next.js applications.

## Features

- 🖱️ Drag interaction - Click and drag to move through images
- 📜 Scroll interaction - Use mouse wheel to navigate
- 🖼️ Parallax effect - Images move within their containers for a dynamic feel
- 📱 Touch support - Works on mobile devices
- 🔄 Next.js compatibility - Optimized for Next.js with SSR support
- 🖼️ Image optimization - Optional Next.js Image component support
- 🎨 Customizable - Extensive styling and behavior options

## Installation

```bash
npm install @rsxt/imdrg

# or

yarn add @rsxt/imdrg

# or

pnpm add @rsxt/imdrg
```

## Usage

```jsx
import { DraggableImageTrack } from '@rsxt/imdrg';

export default function Gallery() {
const images = [
{
src: "/images/image1.jpg",
alt: "Mountain landscape",
},
{
src: "/images/image2.jpg",
alt: "Ocean sunset",

<!-- useNextImage: true -->

},
// Add more images...
];

return (
<DraggableImageTrack
images={images}
enableDrag={true}
enableScroll={true}
scrollSensitivity={1.5}
// Optional: Add meta links
sourceLink={{
        href: "https://your-website.com",
        text: "Source"
      }}
/>
);
}
```

## Props

| Prop                | Type            | Default              | Description                          |
| ------------------- | --------------- | -------------------- | ------------------------------------ |
| `images`            | `ImageProps[]`  | Default placeholders | Array of images to display           |
| `className`         | `string`        | `undefined`          | Additional CSS classes for container |
| `showMetaLinks`     | `boolean`       | `true`               | Whether to show meta links           |
| `sourceLink`        | `MetaLinkProps` | `undefined`          | Source link configuration            |
| `youtubeLink`       | `MetaLinkProps` | `undefined`          | YouTube link configuration           |
| `gap`               | `string`        | `"4vmin"`            | Gap between images                   |
| `imageWidth`        | `string`        | `"40vmin"`           | Width of each image                  |
| `imageHeight`       | `string`        | `"56vmin"`           | Height of each image                 |
| `animationDuration` | `number`        | `1200`               | Duration of animations in ms         |
| `backgroundColor`   | `string`        | `"black"`            | Background color of container        |
| `enableDrag`        | `boolean`       | `true`               | Enable drag interaction              |
| `enableScroll`      | `boolean`       | `true`               | Enable scroll interaction            |
| `scrollSensitivity` | `number`        | `1`                  | Scroll sensitivity multiplier        |
| `enableSSR`         | `boolean`       | `true`               | Enable server-side rendering         |

### Image Props

| Prop           | Type      | Description                              |
| -------------- | --------- | ---------------------------------------- |
| `src`          | `string`  | Image source URL                         |
| `alt`          | `string`  | Alternative text for the image           |
| `useNextImage` | `boolean` | Whether to use Next.js Image component   |
| `blurDataURL`  | `string`  | Optional blur data URL for Next.js Image |

## Tailwind CSS

This component uses Tailwind CSS classes. If you're using Tailwind in your project, make sure your configuration includes:

```js
// tailwind.config.js
module.exports = {
  content: [
    // ...
    "./node_modules/@rsxt/imdrg/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
};
```

## Browser Support

The component uses the Web Animations API, which is supported in all modern browsers. For older browsers, consider adding a polyfill.

## License

MIT © Rishit Shivesh
