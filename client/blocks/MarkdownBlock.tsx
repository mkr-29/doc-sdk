import React from 'react';
import Markdown from 'markdown-to-jsx';
import clsx from 'clsx';
import type { BlockComponentProps, MarkdownBlockData } from '../../core';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

interface HeadingProps {
  children?: React.ReactNode;
  id?: string;
  className?: string;
}

const createHeadingRenderer = (Tag: 'h1' | 'h2' | 'h3' | 'h4') => {
  const HeadingRenderer: React.FC<HeadingProps> = ({ children, id, className }) => {
    const textContent = React.Children.toArray(children)
      .map((child) => (typeof child === 'string' ? child : ''))
      .join('');
    const headingId = id || slugify(textContent);

    return (
      <Tag id={headingId} className={className}>
        {children}
      </Tag>
    );
  };
  HeadingRenderer.displayName = `HeadingRenderer(${Tag})`;
  return HeadingRenderer;
};

export const MarkdownBlock: React.FC<BlockComponentProps<MarkdownBlockData>> = ({
  block,
  className,
}) => {
  const { content = '' } = (block.data || {}) as MarkdownBlockData;

  return (
    <div
      className={clsx('doc-sdk-block', 'doc-sdk-markdown', className)}
      data-block-id={block.id}
      data-block-type="markdown"
    >
      <Markdown
        options={{
          overrides: {
            h1: { component: createHeadingRenderer('h1') },
            h2: { component: createHeadingRenderer('h2') },
            h3: { component: createHeadingRenderer('h3') },
            h4: { component: createHeadingRenderer('h4') },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
};
