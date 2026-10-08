import { describe, it, expect } from 'vitest';
import {
  validateTemplate,
  safeValidateTemplate,
  validateContent,
  safeValidateContent,
  validateBlockData,
  mockApiReferenceTemplate,
  mockWalkthroughTemplate,
  mockSideBySideTemplate,
  mockApiReferenceContent,
  mockWalkthroughContent,
  mockSideBySideContent,
} from '../../core';

describe('Core Schemas and Validation', () => {
  describe('Template Validation', () => {
    it('should validate all canonical mock templates successfully', () => {
      expect(() => validateTemplate(mockApiReferenceTemplate)).not.toThrow();
      expect(() => validateTemplate(mockWalkthroughTemplate)).not.toThrow();
      expect(() => validateTemplate(mockSideBySideTemplate)).not.toThrow();

      const parsed = validateTemplate(mockApiReferenceTemplate);
      expect(parsed.id).toBe('template-api-reference');
      expect(parsed.layoutType).toBe('two-column');
      expect(parsed.sections).toHaveLength(3);
    });

    it('should reject template with missing ID or empty name', () => {
      const invalid = {
        ...mockApiReferenceTemplate,
        id: '',
      };
      expect(() => validateTemplate(invalid)).toThrow();

      const safeResult = safeValidateTemplate(invalid);
      expect(safeResult.success).toBe(false);
      if (!safeResult.success) {
        expect(safeResult.error.issues[0].path).toContain('id');
      }
    });

    it('should reject template with invalid layoutType', () => {
      const invalid = {
        ...mockApiReferenceTemplate,
        layoutType: 'three-column',
      };
      expect(() => validateTemplate(invalid)).toThrow();
    });

    it('should reject template with zero sections', () => {
      const invalid = {
        ...mockApiReferenceTemplate,
        sections: [],
      };
      expect(() => validateTemplate(invalid)).toThrow();
    });

    it('should reject section with zero allowedBlocks', () => {
      const invalid = {
        ...mockApiReferenceTemplate,
        sections: [
          {
            id: 'sec-1',
            title: 'Empty',
            allowedBlocks: [],
          },
        ],
      };
      expect(() => validateTemplate(invalid)).toThrow();
    });
  });

  describe('Document Content Validation', () => {
    it('should validate all canonical mock contents successfully', () => {
      expect(() => validateContent(mockApiReferenceContent)).not.toThrow();
      expect(() => validateContent(mockWalkthroughContent)).not.toThrow();
      expect(() => validateContent(mockSideBySideContent)).not.toThrow();

      const parsed = validateContent(mockApiReferenceContent);
      expect(parsed.id).toBe('doc-auth-api');
      expect(parsed.templateId).toBe('template-api-reference');
      expect(parsed.sections).toHaveLength(3);
    });

    it('should reject content with empty ID or templateId', () => {
      const invalid = {
        ...mockApiReferenceContent,
        id: '',
      };
      const res = safeValidateContent(invalid);
      expect(res.success).toBe(false);
    });

    it('should reject content with unknown block type', () => {
      const invalid = {
        ...mockApiReferenceContent,
        sections: [
          {
            sectionId: 'sec-1',
            blocks: [
              {
                id: 'blk-1',
                type: 'unknown_widget',
                data: {},
              },
            ],
          },
        ],
      };
      const res = safeValidateContent(invalid);
      expect(res.success).toBe(false);
    });
  });

  describe('validateBlockData', () => {
    it('should validate text block data', () => {
      expect(validateBlockData('text', { text: 'Hello', variant: 'lead' })).toBe(true);
      expect(validateBlockData('text', { text: 'Hello' })).toBe(true);
      expect(validateBlockData('text', { text: 123 })).toBe(false);
    });

    it('should validate markdown block data', () => {
      expect(validateBlockData('markdown', { content: '# Title' })).toBe(true);
      expect(validateBlockData('markdown', { content: 42 })).toBe(false);
    });

    it('should validate code_sample block data', () => {
      expect(validateBlockData('code_sample', { code: 'console.log()', language: 'js' })).toBe(true);
      expect(validateBlockData('code_sample', { code: 123 })).toBe(false);
    });

    it('should validate api_endpoint block data', () => {
      expect(
        validateBlockData('api_endpoint', {
          method: 'GET',
          path: '/users',
        })
      ).toBe(true);

      // Invalid HTTP method
      expect(
        validateBlockData('api_endpoint', {
          method: 'INVALID_METHOD',
          path: '/users',
        })
      ).toBe(false);
    });

    it('should validate callout block data', () => {
      expect(
        validateBlockData('callout', {
          message: 'Warning note',
          variant: 'warning',
        })
      ).toBe(true);

      // Missing required message
      expect(
        validateBlockData('callout', {
          variant: 'warning',
        })
      ).toBe(false);
    });

    it('should validate stepper block data', () => {
      expect(
        validateBlockData('stepper', {
          steps: [{ title: 'Step 1', content: 'Do this' }],
        })
      ).toBe(true);

      // Empty steps array
      expect(
        validateBlockData('stepper', {
          steps: [],
        })
      ).toBe(false);
    });
  });
});
