import type { DocContent } from '../types';

export const mockApiReferenceContent: DocContent = {
  id: 'doc-auth-api',
  templateId: 'template-api-reference',
  metadata: {
    title: 'Authentication & Session API',
    version: 'v1.2.0',
    category: 'Core',
    tags: ['Auth', 'OAuth2', 'JWT'],
  },
  sections: [
    {
      sectionId: 'sec-overview',
      blocks: [
        {
          id: 'blk-ov-1',
          type: 'markdown',
          data: {
            content:
              '# Authentication Overview\n\nAll requests to the API must include a valid Bearer token in the `Authorization` header.',
          },
        },
        {
          id: 'blk-ov-2',
          type: 'callout',
          data: {
            title: 'Security Notice',
            message: 'Never commit API keys or secret tokens to public repositories.',
            variant: 'warning',
          },
        },
      ],
    },
    {
      sectionId: 'sec-authentication',
      blocks: [
        {
          id: 'blk-auth-1',
          type: 'code_sample',
          data: {
            language: 'bash',
            title: 'Authorization Header Format',
            code: 'curl -H "Authorization: Bearer YOUR_API_TOKEN" https://api.example.com/v1/me',
          },
        },
      ],
    },
    {
      sectionId: 'sec-endpoints',
      blocks: [
        {
          id: 'blk-ep-1',
          type: 'api_endpoint',
          data: {
            method: 'POST',
            path: '/oauth/token',
            description: 'Exchange client credentials or refresh tokens for an access token.',
            parameters: [
              {
                name: 'grant_type',
                in: 'body',
                type: 'string',
                required: true,
                description: 'Must be "client_credentials" or "refresh_token"',
              },
              {
                name: 'client_id',
                in: 'body',
                type: 'string',
                required: true,
                description: 'Your application client ID',
              },
            ],
            responses: [
              {
                status: 200,
                description: 'Token successfully generated',
                body: '{\n  "access_token": "eyJhbGciOi...",\n  "expires_in": 3600,\n  "token_type": "Bearer"\n}',
              },
              {
                status: 401,
                description: 'Invalid credentials provided',
                body: '{\n  "error": "invalid_client"\n}',
              },
            ],
          },
        },
        {
          id: 'blk-ep-2',
          type: 'code_sample',
          data: {
            language: 'typescript',
            title: 'Exchange Token Example',
            code: 'const response = await fetch("https://api.example.com/v1/oauth/token", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ grant_type: "client_credentials", client_id: "my-id" })\n});\nconst data = await response.json();',
          },
        },
      ],
    },
  ],
};

export const mockWalkthroughContent: DocContent = {
  id: 'doc-quickstart-guide',
  templateId: 'template-walkthrough',
  metadata: {
    title: '5-Minute SDK Quickstart',
    difficulty: 'Beginner',
    estimatedMinutes: '5',
  },
  sections: [
    {
      sectionId: 'sec-intro',
      blocks: [
        {
          id: 'blk-wt-intro-1',
          type: 'text',
          data: {
            text: 'Welcome to the SDK setup guide. Follow these quick steps to get running locally.',
            variant: 'lead',
          },
        },
        {
          id: 'blk-wt-intro-2',
          type: 'callout',
          data: {
            title: 'Node.js Required',
            message: 'Ensure Node.js v18 or higher is installed before proceeding.',
            variant: 'info',
          },
        },
      ],
    },
    {
      sectionId: 'sec-steps',
      blocks: [
        {
          id: 'blk-wt-steps-1',
          type: 'stepper',
          data: {
            steps: [
              {
                stepNumber: 1,
                title: 'Install the package',
                content: 'Run `npm install @racinmk/doc-sdk` in your application root.',
              },
              {
                stepNumber: 2,
                title: 'Import the Renderer',
                content: 'Import `<DocRenderer />` into your React page component.',
              },
              {
                stepNumber: 3,
                title: 'Render Document',
                content: 'Pass your template and content schemas to the renderer.',
              },
            ],
          },
        },
      ],
    },
  ],
};

export const mockSideBySideContent: DocContent = {
  id: 'doc-side-by-side',
  templateId: 'template-side-by-side',
  metadata: {
    title: 'Users Resource API',
    baseUrl: 'https://api.example.com/v1',
  },
  sections: [
    {
      sectionId: 'sec-methods',
      blocks: [
        {
          id: 'blk-sbs-1',
          type: 'api_endpoint',
          data: {
            method: 'GET',
            path: '/users/{id}',
            description: 'Fetch user details by ID.',
            parameters: [
              {
                name: 'id',
                in: 'path',
                type: 'string',
                required: true,
                description: 'Unique user identifier',
              },
            ],
            responses: [
              {
                status: 200,
                description: 'User details',
                body: '{\n  "id": "usr_123",\n  "name": "Jane Doe"\n}',
              },
            ],
          },
        },
        {
          id: 'blk-sbs-2',
          type: 'code_sample',
          data: {
            language: 'typescript',
            title: 'Get User',
            code: 'const user = await client.users.get("usr_123");',
          },
        },
      ],
    },
  ],
};
