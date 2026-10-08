import type { ComponentType } from 'react';
import type { BlockType, LayoutType, BlockContent, DocTemplate, DocContent } from './types';

/**
 * Props passed to any block component renderer
 */
export interface BlockComponentProps<T = Record<string, unknown>> {
  block: BlockContent<T>;
  sectionId: string;
  template: DocTemplate;
  content: DocContent;
  className?: string;
}

/**
 * Registry mapping BlockType to its React component renderer
 */
export type BlockRegistry = Record<
  BlockType,
  ComponentType<BlockComponentProps<any>>
>;

/**
 * Props passed to any layout component wrapper
 */
export interface LayoutComponentProps {
  template: DocTemplate;
  content: DocContent;
  blockRegistry: Partial<BlockRegistry>;
  className?: string;
  onAnchorClick?: (anchorId: string) => void;
}

/**
 * Registry mapping LayoutType to its React layout wrapper
 */
export type LayoutRegistry = Record<
  LayoutType,
  ComponentType<LayoutComponentProps>
>;
