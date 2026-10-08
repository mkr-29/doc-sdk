import type { FC } from 'react';
import type { BlockContent, BlockRegistry, DocTemplate, DocContent } from '../../core';
import { defaultBlockRegistry } from '../blocks/defaultRegistry';

interface BlockRendererProps {
  block: BlockContent;
  sectionId: string;
  template: DocTemplate;
  content: DocContent;
  blockRegistry?: Partial<BlockRegistry>;
}

export const BlockRenderer: FC<BlockRendererProps> = ({
  block,
  sectionId,
  template,
  content,
  blockRegistry,
}) => {
  const mergedRegistry: BlockRegistry = {
    ...defaultBlockRegistry,
    ...blockRegistry,
  };

  const Component = mergedRegistry[block.type];

  if (!Component) {
    return (
      <div
        style={{
          border: '1px dashed var(--doc-sdk-warning)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--doc-sdk-radius)',
          backgroundColor: 'var(--doc-sdk-warning-bg)',
          color: 'var(--doc-sdk-warning)',
          fontSize: '0.8125rem',
          marginBottom: '1rem',
        }}
      >
        <strong>Unrecognized Block Type:</strong> {block.type}
      </div>
    );
  }

  return (
    <Component
      block={block}
      sectionId={sectionId}
      template={template}
      content={content}
    />
  );
};
