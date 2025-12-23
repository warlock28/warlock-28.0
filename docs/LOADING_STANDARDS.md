# Loading State Standards

## Overview
This document defines the standardized loading indicators used throughout the portfolio application.

## Centralized Component
All loading states use the centralized `LoadingSpinner` component located at:
```
src/components/ui/loading-spinner.tsx
```

## Loading Spinner Variants

### 1. LoadingSpinner (Base Component)
The core spinner component with three size variants:
- **Small (`sm`)**: 4x4px with 2px border - for inline/button use
- **Medium (`md`)**: 12x12px with 4px border - default size for sections
- **Large (`lg`)**: 16x16px with 4px border - for full-page loaders

**Design Specs:**
- Border color: `border-primary/30` (semi-transparent primary)
- Top border color: `border-t-primary` (solid primary color)
- Animation: `animate-spin` (Tailwind's rotation)
- Shape: Perfect circle (`rounded-full`)

### 2. SectionLoader
Pre-configured wrapper for lazy-loaded sections
- Uses medium spinner
- Centered with vertical padding (py-20)
- Used in: Index.tsx for Suspense fallbacks

### 3. ButtonLoader
Pre-configured for button loading states
- Uses small spinner
- Includes right margin (mr-2)
- Used in: Contact form submit button

## Usage Examples

### Lazy Loading (Suspense)
```tsx
import { SectionLoader } from '@/components/ui/loading-spinner';

<Suspense fallback={<SectionLoader />}>
  <YourComponent />
</Suspense>
```

### Button Loading State
```tsx
import { ButtonLoader } from '@/components/ui/loading-spinner';

<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <ButtonLoader />
      Processing...
    </>
  ) : (
    <>
      <Icon />
      Submit
    </>
  )}
</Button>
```

### Custom Spinner
```tsx
import { LoadingSpinner } from '@/components/ui/loading-spinner';

<div className="flex justify-center">
  <LoadingSpinner size="lg" className="custom-class" />
</div>
```

## Implementation Map

| Location | Type | Usage |
|----------|------|-------|
| `index.html` | Inline CSS | Initial page load (before React hydration) |
| `src/pages/Index.tsx` | SectionLoader | Lazy-loaded component fallbacks |
| `src/components/Contact.tsx` | ButtonLoader | Form submission state |
| `src/components/ui/skeleton.tsx` | animate-pulse | Content placeholders (kept separate for design) |

## Design Consistency

### Color Scheme
- Primary: `#9361e3` (purple from design system)
- Opacity: 30% for border, 100% for spinning segment
- Matches the app's gradient-primary theme

### Animation
- Speed: 0.8s per rotation (consistent across all instances)
- Easing: Linear (smooth continuous rotation)
- No pause or delay

## Accessibility
All spinners include:
- `role="status"` attribute
- `aria-label="Loading"` for screen readers
- Hidden text: `<span className="sr-only">Loading...</span>`

## Do's and Don'ts

### ✅ Do
- Use `LoadingSpinner` for all new loading states
- Choose appropriate size variant (sm/md/lg)
- Keep animation speed consistent at 0.8s
- Include accessibility attributes

### ❌ Don't
- Create custom spinner styles
- Use different colors or opacity values
- Mix different animation speeds
- Use `animate-pulse` for spinners (reserved for skeleton states)
- Forget to disable interactive elements during loading

## Future Improvements
- Add optional text label prop to LoadingSpinner
- Create skeleton screen variants for different content types
- Add loading state to image components with fade-in effect

---

**Last Updated:** December 22, 2025
**Maintained By:** Nitin Kumar
