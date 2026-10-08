import type { BlockRegistry } from '../../core';
import { TextBlock } from './TextBlock';
import { MarkdownBlock } from './MarkdownBlock';
import { CodeSampleBlock } from './CodeSampleBlock';
import { ApiEndpointBlock } from './ApiEndpointBlock';
import { CalloutBlock } from './CalloutBlock';
import { StepperBlock } from './StepperBlock';

export const defaultBlockRegistry: BlockRegistry = {
  text: TextBlock,
  markdown: MarkdownBlock,
  code_sample: CodeSampleBlock,
  api_endpoint: ApiEndpointBlock,
  callout: CalloutBlock,
  stepper: StepperBlock,
};
