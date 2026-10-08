import { z } from 'zod';
import { DocTemplate, DocContent, BlockType } from './types';
import {
  DocTemplateSchema,
  DocContentSchema,
  TextBlockDataSchema,
  MarkdownBlockDataSchema,
  CodeSampleBlockDataSchema,
  ApiEndpointBlockDataSchema,
  CalloutBlockDataSchema,
  StepperBlockDataSchema,
} from './schemas';

/**
 * Returns the specific Zod schema for a given BlockType
 */
export function getBlockDataSchema(type: BlockType): z.ZodTypeAny {
  switch (type) {
    case 'text':
      return TextBlockDataSchema;
    case 'markdown':
      return MarkdownBlockDataSchema;
    case 'code_sample':
      return CodeSampleBlockDataSchema;
    case 'api_endpoint':
      return ApiEndpointBlockDataSchema;
    case 'callout':
      return CalloutBlockDataSchema;
    case 'stepper':
      return StepperBlockDataSchema;
    default:
      return z.record(z.string(), z.unknown());
  }
}

/**
 * Validates a DocTemplate, throwing ZodError if invalid
 */
export function validateTemplate(data: unknown): DocTemplate {
  return DocTemplateSchema.parse(data) as DocTemplate;
}

/**
 * Safely parses a DocTemplate without throwing
 */
export function safeValidateTemplate(data: unknown): z.SafeParseReturnType<unknown, DocTemplate> {
  return DocTemplateSchema.safeParse(data) as z.SafeParseReturnType<unknown, DocTemplate>;
}

/**
 * Validates a DocContent, throwing ZodError if invalid
 */
export function validateContent(data: unknown): DocContent {
  return DocContentSchema.parse(data) as DocContent;
}

/**
 * Safely parses a DocContent without throwing
 */
export function safeValidateContent(data: unknown): z.SafeParseReturnType<unknown, DocContent> {
  return DocContentSchema.safeParse(data) as z.SafeParseReturnType<unknown, DocContent>;
}

/**
 * Validates individual block data against its BlockType payload schema
 */
export function validateBlockData(type: BlockType, data: unknown): boolean {
  const schema = getBlockDataSchema(type);
  const result = schema.safeParse(data);
  return result.success;
}
