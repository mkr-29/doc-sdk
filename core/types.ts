/**
 * Core TypeScript Data Contracts for @mkr/doc-sdk
 * Single source of compile-time types for templates, documents, blocks, and layouts.
 */

export const BLOCK_TYPES = [
  'text',
  'markdown',
  'code_sample',
  'api_endpoint',
  'callout',
  'stepper',
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number];

export const FIELD_TYPES = [
  'string',
  'rich-text',
  'code',
  'select',
  'array',
] as const;

export type FieldType = (typeof FIELD_TYPES)[number];

export const LAYOUT_TYPES = [
  'two-column',
  'single-column',
  'side-by-side-code',
] as const;

export type LayoutType = (typeof LAYOUT_TYPES)[number];

/**
 * Metadata Field Schema defined in Admin Template Builder
 */
export interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required?: boolean;
  options?: string[]; // for select / array tags
  defaultValue?: unknown;
  placeholder?: string;
  description?: string;
}

/**
 * Section Schema defined in Admin Template Builder
 */
export interface SectionDefinition {
  id: string;
  title: string;
  allowedBlocks: BlockType[];
  isRepeatable?: boolean;
  description?: string;
}

/**
 * Template Schema created in Admin Template Builder
 */
export interface DocTemplate {
  id: string;
  name: string;
  layoutType: LayoutType;
  metadataFields: FieldDefinition[];
  sections: SectionDefinition[];
}

/* -------------------------------------------------------------------------- */
/* Block Payload Data Contracts                                               */
/* -------------------------------------------------------------------------- */

export interface TextBlockData {
  text: string;
  variant?: 'lead' | 'body' | 'caption';
}

export interface MarkdownBlockData {
  content: string;
}

export interface CodeSampleBlockData {
  code: string;
  language: string;
  title?: string;
  highlightLines?: number[];
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ParameterItem {
  name: string;
  in: 'query' | 'header' | 'path' | 'body';
  type: string;
  required: boolean;
  description?: string;
  example?: string;
}

export interface ResponseItem {
  status: number;
  description: string;
  body?: string;
}

export interface ApiEndpointBlockData {
  method: HttpMethod;
  path: string;
  description?: string;
  parameters?: ParameterItem[];
  responses?: ResponseItem[];
}

export interface CalloutBlockData {
  title?: string;
  message: string;
  variant: 'info' | 'warning' | 'tip' | 'danger';
}

export interface StepItem {
  title: string;
  content: string;
  stepNumber?: number;
}

export interface StepperBlockData {
  steps: StepItem[];
}

/* -------------------------------------------------------------------------- */
/* Document Content Data Contracts                                            */
/* -------------------------------------------------------------------------- */

export interface BlockContent<T = Record<string, unknown>> {
  id: string;
  type: BlockType;
  data: T;
}

export interface SectionContent {
  sectionId: string;
  blocks: BlockContent[];
}

export interface DocContent {
  id: string;
  templateId: string;
  metadata: Record<string, unknown>;
  sections: SectionContent[];
}
