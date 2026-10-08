import type { FC, ComponentType } from 'react';
import clsx from 'clsx';
import {
  safeValidateTemplate,
  safeValidateContent,
  type DocTemplate,
  type DocContent,
  type BlockRegistry,
  type LayoutComponentProps,
} from '../../core';
import { defaultLayoutRegistry } from '../layouts/LayoutRegistry';

export interface DocRendererProps {
  template: DocTemplate;
  content: DocContent;
  blockRegistry?: Partial<BlockRegistry>;
  customLayouts?: Record<string, ComponentType<LayoutComponentProps>>;
  className?: string;
  onAnchorClick?: (anchorId: string) => void;
}

export const DocRenderer: FC<DocRendererProps> = ({
  template,
  content,
  blockRegistry,
  customLayouts,
  className,
  onAnchorClick,
}) => {
  // Validate data
  const templateValidation = safeValidateTemplate(template);
  const contentValidation = safeValidateContent(content);

  if (!templateValidation.success || !contentValidation.success) {
    const errors = [
      ...(!templateValidation.success ? templateValidation.error.errors : []),
      ...(!contentValidation.success ? contentValidation.error.errors : []),
    ];

    return (
      <div
        className={clsx('doc-sdk-card', className)}
        style={{
          border: '1px solid var(--doc-sdk-danger)',
          backgroundColor: 'var(--doc-sdk-danger-bg)',
          color: 'var(--doc-sdk-danger)',
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>
          Invalid Document Schema
        </h3>
        <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.8125rem' }}>
          {errors.map((e, idx) => (
            <li key={idx}>
              <strong>{e.path.join('.')}:</strong> {e.message}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const mergedLayouts = {
    ...defaultLayoutRegistry,
    ...customLayouts,
  };

  const LayoutComponent = mergedLayouts[template.layoutType] || defaultLayoutRegistry['single-column'];

  return (
    <div className={clsx('doc-sdk-viewer-engine', className)}>
      <LayoutComponent
        template={template}
        content={content}
        blockRegistry={blockRegistry || {}}
        onAnchorClick={onAnchorClick}
      />
    </div>
  );
};
