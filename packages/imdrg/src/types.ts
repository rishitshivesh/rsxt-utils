export interface ImageProps {
  /**
   * The source URL of the image
   */
  src: string;

  /**
   * Alternative text for the image (important for SEO and accessibility)
   */
  alt?: string;

  /**
   * Whether to use Next.js Image component (optimized) or standard img tag
   */
  useNextImage?: boolean;

  /**
   * Optional blur data URL for Next.js Image component
   */
  blurDataURL?: string;
}

export interface MetaLinkProps {
  /**
   * The URL the meta link points to
   */
  href: string;

  /**
   * The icon to display (from Lucide React)
   */
  icon?: string;

  /**
   * The text to display next to the icon
   */
  text: string;

  /**
   * CSS position classes
   */
  position?: string;

  /**
   * Color for the icon
   */
  iconColor?: string;
}

export interface ImageTrackProps {
  /**
   * Array of images to display in the track
   */
  images?: ImageProps[];

  /**
   * Additional CSS classes to apply to the container
   */
  className?: string;

  /**
   * Whether to show meta links
   */
  showMetaLinks?: boolean;

  /**
   * Source link configuration
   */
  sourceLink?: Omit<MetaLinkProps, "position" | "iconColor">;

  /**
   * YouTube link configuration
   */
  youtubeLink?: Omit<MetaLinkProps, "position" | "iconColor">;

  /**
   * Gap between images (CSS value)
   */
  gap?: string;

  /**
   * Width of each image (CSS value)
   */
  imageWidth?: string;

  /**
   * Height of each image (CSS value)
   */
  imageHeight?: string;

  /**
   * Duration of the animation in milliseconds
   */
  animationDuration?: number;

  /**
   * Background color of the container
   */
  backgroundColor?: string;

  /**
   * Enable drag interaction (mouse/touch drag)
   */
  enableDrag?: boolean;

  /**
   * Enable scroll interaction (wheel-based scrolling)
   */
  enableScroll?: boolean;

  /**
   * Sensitivity multiplier for scroll interaction (higher = more sensitive)
   */
  scrollSensitivity?: number;

  /**
   * Whether to enable server-side rendering
   * If false, component will only render on client-side
   */
  enableSSR?: boolean;
}
