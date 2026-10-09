import { useState, useEffect, type FC } from 'react';
import clsx from 'clsx';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import { safeValidateContent, type DocContent, type BlockContent } from '../../core';
import type { DocContentEditorProps } from './types';
import { MetaPanel } from './MetaPanel';
import { SectionForm } from './SectionForm';
import { useTheme } from '../../client/theme';

export const DocContentEditor: FC<DocContentEditorProps> = ({
  template,
  initialContent,
  onChange,
  onSave,
  className,
  style,
  theme,
  themeConfig,
  lightColors,
  darkColors,
}) => {
  const [content, setContent] = useState<DocContent>(() => {
    if (initialContent) return initialContent;
    return {
      id: `doc-${Date.now().toString(36)}`,
      templateId: template.id,
      metadata: {},
      sections: template.sections.map((sec) => ({
        sectionId: sec.id,
        blocks: [],
      })),
    };
  });

  const { activeTheme, themeStyle } = useTheme({
    theme,
    themeConfig,
    lightColors,
    darkColors,
  });

  const validationResult = safeValidateContent(content);
  const isValid = validationResult.success;

  useEffect(() => {
    if (onChange && isValid) {
      onChange(content);
    }
  }, [content, isValid, onChange]);

  const updateMetadata = (metadata: Record<string, unknown>) => {
    setContent((prev) => ({ ...prev, metadata }));
  };

  const updateSectionBlocks = (sectionId: string, blocks: BlockContent[]) => {
    setContent((prev) => {
      const exists = prev.sections.some((s) => s.sectionId === sectionId);
      let updatedSections;
      if (exists) {
        updatedSections = prev.sections.map((s) =>
          s.sectionId === sectionId ? { ...s, blocks } : s
        );
      } else {
        updatedSections = [...prev.sections, { sectionId, blocks }];
      }
      return { ...prev, sections: updatedSections };
    });
  };

  const handleSave = () => {
    if (!isValid) return;
    if (onSave) {
      onSave(content);
    }
  };

  return (
    <div
      className={clsx('doc-sdk-root', 'doc-sdk-content-editor', `doc-sdk-${activeTheme}`, className)}
      data-theme={activeTheme}
      style={{ ...themeStyle, ...style }}
    >
      {/* Header bar */}
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
            Content Editor
          </h2>
          <span
            style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              backgroundColor: 'var(--doc-sdk-primary-light)',
              color: 'var(--doc-sdk-primary)',
              borderRadius: 'var(--doc-sdk-radius-sm)',
              fontWeight: 600,
            }}
          >
            Template: {template.name}
          </span>
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
                <span>Valid Content</span>
              </>
            ) : (
              <>
                <AlertCircle size={13} />
                <span>Missing Required Fields</span>
              </>
            )}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!isValid}
            className="doc-sdk-btn doc-sdk-btn-primary"
            aria-label="Save Content"
          >
            <Save size={15} />
            <span>Save Content</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Dynamic Metadata Inputs */}
        <MetaPanel
          fields={template.metadataFields}
          metadata={content.metadata}
          onChange={updateMetadata}
        />

        {/* Dynamic Section Forms */}
        {template.sections.map((sectionDef) => {
          const sectionContent = content.sections.find(
            (s) => s.sectionId === sectionDef.id
          ) || { sectionId: sectionDef.id, blocks: [] };

          return (
            <SectionForm
              key={sectionDef.id}
              sectionDef={sectionDef}
              sectionContent={sectionContent}
              onUpdateBlocks={(blocks) => updateSectionBlocks(sectionDef.id, blocks)}
            />
          );
        })}
      </div>
    </div>
  );
};
