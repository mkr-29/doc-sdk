# Plan 06: Client Viewer Engine & Responsive Layouts

## Objective
Build `<DocRenderer/>` and the three primary layout shells (`SingleColumnLayout`, `TwoColumnLayout`, `SideBySideCodeLayout`), orchestrating document presentation, navigation bars, sticky TOCs, and extensible block registries.

---

## 1. Target Directory & Components
- `client/DocRenderer/DocRenderer.tsx`: Main orchestrator. Resolves layout and traverses sections/blocks.
- `client/DocRenderer/BlockRenderer.tsx`: Renders individual blocks via `BlockRegistry`. Provides error boundary and unrecognized block fallback.
- `client/layouts/SingleColumnLayout.tsx`: Centered reading column layout for tutorials and guides.
- `client/layouts/TwoColumnLayout.tsx`: Left navigation sidebar, center document body, right sticky TOC.
- `client/layouts/SideBySideCodeLayout.tsx`: API reference layout: Left column contains endpoint prose/tables, right column contains sticky code samples.
- `client/layouts/LayoutRegistry.ts`: Maps `layoutType` to layout components, allowing consumer overrides.
- `client/index.ts`: Public export.

---

## 2. Component Contract & Props
```tsx
export interface DocRendererProps {
  template: DocTemplate;
  content: DocContent;
  blockRegistry?: Partial<Record<BlockType, React.ComponentType<any>>>;
  customLayouts?: Record<string, React.ComponentType<any>>;
  className?: string;
  onAnchorClick?: (anchorId: string) => void;
}
```

---

## 3. Automated Test Suite (`tests/client/renderer.test.tsx`)
1. **Single Column Layout**: Renders `mockWalkthroughTemplate` and `mockWalkthroughContent`. Asserts header, stepper, and text are in the document.
2. **Two Column Layout**: Renders `mockApiReferenceTemplate`. Asserts sidebar navigation and right-hand TOC are rendered.
3. **Side-by-Side Code Layout**: Asserts left prose and right code columns render with proper layout classes.
4. **Custom Block Override**: Passing a custom `callout` component in `blockRegistry` replaces the default callout.
5. **Fallback Safety**: Providing an unknown block type renders a fallback card without throwing runtime exceptions.

---

## 4. Automated Gatekeeper Command
```bash
npm run test:client && npm run typecheck
```
