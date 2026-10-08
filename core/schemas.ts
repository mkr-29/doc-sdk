import { z } from 'zod';
import { BLOCK_TYPES, FIELD_TYPES, LAYOUT_TYPES } from './types';

/**
 * Zod Enum Schemas matching core string literal unions
 */
export const BlockTypeSchema = z.enum(BLOCK_TYPES);
export const FieldTypeSchema = z.enum(FIELD_TYPES);
export const LayoutTypeSchema = z.enum(LAYOUT_TYPES);

/**
 * Field Definition Schema
 */
export const FieldDefinitionSchema = z.object({
  id: z.string().min(1, 'Field ID is required'),
  name: z.string().min(1, 'Field name is required'),
  type: FieldTypeSchema,
  required: z.boolean().optional().default(false),
  options: z.array(z.string()).optional(),
  defaultValue: z.unknown().optional(),
  placeholder: z.string().optional(),
  description: z.string().optional(),
});

/**
 * Section Definition Schema
 */
export const SectionDefinitionSchema = z.object({
  id: z.string().min(1, 'Section ID is required'),
  title: z.string().min(1, 'Section title is required'),
  allowedBlocks: z
    .array(BlockTypeSchema)
    .min(1, 'At least one allowed block must be selected'),
  isRepeatable: z.boolean().optional().default(false),
  description: z.string().optional(),
});

/**
 * DocTemplate Schema
 */
export const DocTemplateSchema = z.object({
  id: z.string().min(1, 'Template ID is required'),
  name: z.string().min(1, 'Template name is required'),
  layoutType: LayoutTypeSchema,
  metadataFields: z.array(FieldDefinitionSchema).default([]),
  sections: z.array(SectionDefinitionSchema).min(1, 'At least one section is required'),
});

/* -------------------------------------------------------------------------- */
/* Block Payload Data Schemas                                                  */
/* -------------------------------------------------------------------------- */

export const TextBlockDataSchema = z.object({
  text: z.string(),
  variant: z.enum(['lead', 'body', 'caption']).optional().default('body'),
});

export const MarkdownBlockDataSchema = z.object({
  content: z.string(),
});

export const CodeSampleBlockDataSchema = z.object({
  code: z.string(),
  language: z.string().default('typescript'),
  title: z.string().optional(),
  highlightLines: z.array(z.number()).optional(),
});

export const HttpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']);

export const ParameterItemSchema = z.object({
  name: z.string().min(1),
  in: z.enum(['query', 'header', 'path', 'body']),
  type: z.string().default('string'),
  required: z.boolean().default(false),
  description: z.string().optional(),
  example: z.string().optional(),
});

export const ResponseItemSchema = z.object({
  status: z.number().int().min(100).max(599),
  description: z.string(),
  body: z.string().optional(),
});

export const ApiEndpointBlockDataSchema = z.object({
  method: HttpMethodSchema,
  path: z.string().min(1),
  description: z.string().optional(),
  parameters: z.array(ParameterItemSchema).optional().default([]),
  responses: z.array(ResponseItemSchema).optional().default([]),
});

export const CalloutBlockDataSchema = z.object({
  title: z.string().optional(),
  message: z.string().min(1),
  variant: z.enum(['info', 'warning', 'tip', 'danger']).default('info'),
});

export const StepItemSchema = z.object({
  title: z.string().min(1),
  content: z.string(),
  stepNumber: z.number().optional(),
});

export const StepperBlockDataSchema = z.object({
  steps: z.array(StepItemSchema).min(1, 'At least one step is required'),
});

/* -------------------------------------------------------------------------- */
/* Document Content Schemas                                                    */
/* -------------------------------------------------------------------------- */

export const BlockContentSchema = z.object({
  id: z.string().min(1, 'Block ID is required'),
  type: BlockTypeSchema,
  data: z.record(z.string(), z.unknown()),
});

export const SectionContentSchema = z.object({
  sectionId: z.string().min(1, 'Section ID is required'),
  blocks: z.array(BlockContentSchema).default([]),
});

export const DocContentSchema = z.object({
  id: z.string().min(1, 'Content ID is required'),
  templateId: z.string().min(1, 'Template ID is required'),
  metadata: z.record(z.string(), z.unknown()).default({}),
  sections: z.array(SectionContentSchema).default([]),
});
