import { useState, useEffect, type FC } from 'react';
import clsx from 'clsx';
import { Save, Code2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { safeValidateTemplate, type DocTemplate } from '../../core';
import type { TemplateBuilderProps } from './types';
import { GeneralSettings } from './GeneralSettings';
import { MetadataFieldEditor } from './MetadataFieldEditor';
import { SectionList } from './SectionList';
import { JsonPreviewModal } from './JsonPreviewModal';

const DEFAULT_INITIAL_TEMPLATE: DocTemplate = {
  id: 'custom-template',
  name: 'Custom Documentation Template',
  layoutType: 'two-column',
  metadataFields: [
    {
      id: 'title',
      name: 'Document Title',
      type: 'string',
      required: true,
      placeholder: 'Enter document title',
    },
  ],
  sections: [
    {
      id: 'sec-main',
      title: 'Main Section',
      allowedBlocks: ['markdown', 'code_sample', 'callout'],
      isRepeatable: false,
    },
  ],
};

export const TemplateBuilder: FC<TemplateBuilderProps> = ({
  initialTemplate,
  onChange,
  onSave,
  className,
}) => {
  const [template, setTemplate] = useState<DocTemplate>(
    initialTemplate || DEFAULT_INITIAL_TEMPLATE
  );
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);

  const validationResult = safeValidateTemplate(template);
  const isValid = validationResult.success;

  useEffect(() => {
    if (onChange && isValid) {
      onChange(template);
    }
  }, [template, isValid, onChange]);

  const handleUpdate = (updates: Partial<DocTemplate>) => {
    setTemplate((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    if (!isValid) return;
    if (onSave) {
      onSave(template);
    }
  };

  return (
    <div className={clsx('doc-sdk-template-builder', className)}>
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--doc-sdk-surface)',
          border: '1px solid var(--doc-sdk-border)',
          borderRadius: 'var(--doc-sdk-radius)',
          marginBottom: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>
            Template Builder
          </h2>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.2rem 0.5rem',
              borderRadius: '9999px',
              backgroundColor: isValid ? 'var(--doc-sdk-tip-bg)' : 'var(--doc-sdk-danger-bg)',
              color: isValid ? 'var(--doc-sdk-tip)' : 'var(--doc-sdk-danger)',
            }}
          >
            {isValid ? (
              <>
                <CheckCircle2 size={13} />
                <span>Valid Schema</span>
              </>
            ) : (
              <>
                <AlertCircle size={13} />
                <span>Invalid Schema</span>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setIsJsonModalOpen(true)}
            className="doc-sdk-btn doc-sdk-btn-secondary"
            aria-label="View JSON"
          >
            <Code2 size={15} />
            <span>JSON</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="doc-sdk-btn doc-sdk-btn-primary"
            aria-label="Save Template"
          >
            <Save size={15} />
            <span>Save Template</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <GeneralSettings
          id={template.id}
          name={template.name}
          layoutType={template.layoutType}
          onUpdate={handleUpdate}
        />

        <MetadataFieldEditor
          fields={template.metadataFields}
          onChange={(metadataFields) => handleUpdate({ metadataFields })}
        />

        <SectionList
          sections={template.sections}
          onChange={(sections) => handleUpdate({ sections })}
        />
      </div>

      {/* JSON Import/Export Modal */}
      <JsonPreviewModal
        template={template}
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        onImport={(imported) => setTemplate(imported)}
      />
    </div>
  );
};
