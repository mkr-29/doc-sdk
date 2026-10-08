import type { DocTemplate } from '../types';

export const mockApiReferenceTemplate: DocTemplate = {
  id: 'template-api-reference',
  name: 'API Reference',
  layoutType: 'two-column',
  metadataFields: [
    {
      id: 'title',
      name: 'Document Title',
      type: 'string',
      required: true,
      placeholder: 'e.g., Authentication API',
    },
    {
      id: 'version',
      name: 'API Version',
      type: 'string',
      required: true,
      defaultValue: 'v1.0.0',
    },
    {
      id: 'category',
      name: 'Category',
      type: 'select',
      options: ['Core', 'Billing', 'Webhooks', 'Analytics'],
      defaultValue: 'Core',
    },
    {
      id: 'tags',
      name: 'Search Tags',
      type: 'array',
      options: ['REST', 'OAuth2', 'Endpoints', 'Security'],
    },
  ],
  sections: [
    {
      id: 'sec-overview',
      title: 'Overview',
      allowedBlocks: ['markdown', 'callout'],
      isRepeatable: false,
      description: 'Introduction and general architectural concepts',
    },
    {
      id: 'sec-authentication',
      title: 'Authentication',
      allowedBlocks: ['markdown', 'code_sample', 'callout'],
      isRepeatable: false,
      description: 'API key and bearer token guidelines',
    },
    {
      id: 'sec-endpoints',
      title: 'Endpoints',
      allowedBlocks: ['api_endpoint', 'code_sample', 'callout'],
      isRepeatable: true,
      description: 'REST API endpoint specifications',
    },
  ],
};

export const mockWalkthroughTemplate: DocTemplate = {
  id: 'template-walkthrough',
  name: 'Interactive Walkthrough',
  layoutType: 'single-column',
  metadataFields: [
    {
      id: 'title',
      name: 'Tutorial Title',
      type: 'string',
      required: true,
    },
    {
      id: 'difficulty',
      name: 'Difficulty Level',
      type: 'select',
      options: ['Beginner', 'Intermediate', 'Advanced'],
      defaultValue: 'Beginner',
    },
    {
      id: 'estimatedMinutes',
      name: 'Estimated Duration (Mins)',
      type: 'string',
      defaultValue: '10',
    },
  ],
  sections: [
    {
      id: 'sec-intro',
      title: 'Prerequisites & Setup',
      allowedBlocks: ['text', 'callout', 'code_sample'],
      isRepeatable: false,
    },
    {
      id: 'sec-steps',
      title: 'Guided Steps',
      allowedBlocks: ['stepper', 'markdown'],
      isRepeatable: true,
    },
  ],
};

export const mockSideBySideTemplate: DocTemplate = {
  id: 'template-side-by-side',
  name: 'Side-by-Side Reference',
  layoutType: 'side-by-side-code',
  metadataFields: [
    {
      id: 'title',
      name: 'Endpoint Group Title',
      type: 'string',
      required: true,
    },
    {
      id: 'baseUrl',
      name: 'Base URL',
      type: 'string',
      defaultValue: 'https://api.example.com/v1',
    },
  ],
  sections: [
    {
      id: 'sec-methods',
      title: 'Methods',
      allowedBlocks: ['api_endpoint', 'code_sample'],
      isRepeatable: true,
    },
  ],
};
