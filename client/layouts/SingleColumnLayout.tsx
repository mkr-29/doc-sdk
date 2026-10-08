import type { FC } from 'react';
import clsx from 'clsx';
import type { LayoutComponentProps } from '../../core';
import { BlockRenderer } from '../DocRenderer/BlockRenderer';

export const SingleColumnLayout: FC<LayoutComponentProps> = ({
  template,
  content,
  blockRegistry,
  className,
}) => {
  const metadata = content.metadata || {};
  const title = (metadata.title as string) || template.name;

  return (
    <article className={clsx('doc-sdk-layout-single-column', className)}>
      {/* Header */}
      <header style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--doc-sdk-border)', paddingBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--doc-sdk-text)' }}>
          {title}
        </h1>
        {Object.entries(metadata).length > 1 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
            {Object.entries(metadata)
              .filter(([k]) => k !== 'title')
              .map(([key, val]) => (
                <span key={key} className="doc-sdk-chip">
                  <strong>{key}:</strong> {String(val)}
                </span>
              ))}
          </div>
        )}
      </header>

      {/* Sections */}
      <div>
        {template.sections.map((secDef) => {
          const sectionContent = content.sections.find((s) => s.sectionId === secDef.id);
          const blocks = sectionContent ? sectionContent.blocks : [];

          return (
            <section key={secDef.id} id={secDef.id} style={{ marginBottom: '3rem' }}>
              <div className="doc-sdk-section-header">
                <h2 className="doc-sdk-section-title">{secDef.title}</h2>
                {secDef.description && (
                  <p style={{ margin: '0.35rem 0 0', color: 'var(--doc-sdk-text-muted)', fontSize: '0.9375rem' }}>
                    {secDef.description}
                  </p>
                )}
              </div>

              <div>
                {blocks.map((block) => (
                  <BlockRenderer
                    key={block.id}
                    block={block}
                    sectionId={secDef.id}
                    template={template}
                    content={content}
                    blockRegistry={blockRegistry}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
};
