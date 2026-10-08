import type { FC } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { FieldDefinition, FieldType } from '../../core';

interface MetadataFieldEditorProps {
  fields: FieldDefinition[];
  onChange: (fields: FieldDefinition[]) => void;
}

export const MetadataFieldEditor: FC<MetadataFieldEditorProps> = ({
  fields,
  onChange,
}) => {
  const addField = () => {
    const newField: FieldDefinition = {
      id: `field-${Date.now().toString(36)}`,
      name: 'New Field',
      type: 'string',
      required: false,
    };
    onChange([...fields, newField]);
  };

  const removeField = (index: number) => {
    const updated = fields.filter((_, idx) => idx !== index);
    onChange(updated);
  };

  const updateField = (index: number, updates: Partial<FieldDefinition>) => {
    const updated = fields.map((f, idx) => (idx === index ? { ...f, ...updates } : f));
    onChange(updated);
  };

  return (
    <div className="doc-sdk-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
            Metadata Fields Schema
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: 'var(--doc-sdk-text-muted)' }}>
            Configure fields authors must or may provide for each document (e.g., Title, Version, Category).
          </p>
        </div>
        <button
          type="button"
          onClick={addField}
          className="doc-sdk-btn doc-sdk-btn-secondary doc-sdk-btn-sm"
        >
          <Plus size={14} /> Add Field
        </button>
      </div>

      {fields.length === 0 ? (
        <div style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--doc-sdk-text-muted)', border: '1px dashed var(--doc-sdk-border)', borderRadius: 'var(--doc-sdk-radius)' }}>
          No metadata fields configured. Click "Add Field" to define one.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {fields.map((field, idx) => (
            <div
              key={field.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 140px 90px 40px',
                gap: '0.5rem',
                alignItems: 'center',
                padding: '0.65rem 0.75rem',
                backgroundColor: 'var(--doc-sdk-surface)',
                border: '1px solid var(--doc-sdk-border)',
                borderRadius: 'var(--doc-sdk-radius-sm)',
              }}
            >
              <div>
                <input
                  type="text"
                  className="doc-sdk-input"
                  value={field.name}
                  onChange={(e) => updateField(idx, { name: e.target.value })}
                  placeholder="Display Name"
                  aria-label="Field Display Name"
                />
              </div>

              <div>
                <input
                  type="text"
                  className="doc-sdk-input"
                  value={field.id}
                  onChange={(e) => updateField(idx, { id: e.target.value })}
                  placeholder="Field ID (key)"
                  aria-label="Field Key"
                />
              </div>

              <div>
                <select
                  className="doc-sdk-select"
                  value={field.type}
                  onChange={(e) => updateField(idx, { type: e.target.value as FieldType })}
                  aria-label="Field Type"
                >
                  <option value="string">string</option>
                  <option value="rich-text">rich-text</option>
                  <option value="code">code</option>
                  <option value="select">select</option>
                  <option value="array">array</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <input
                  type="checkbox"
                  id={`required-${field.id}`}
                  checked={Boolean(field.required)}
                  onChange={(e) => updateField(idx, { required: e.target.checked })}
                />
                <label htmlFor={`required-${field.id}`} style={{ fontSize: '0.75rem' }}>
                  Req.
                </label>
              </div>

              <button
                type="button"
                onClick={() => removeField(idx)}
                className="doc-sdk-btn doc-sdk-btn-danger doc-sdk-btn-sm"
                aria-label={`Remove field ${field.name}`}
                style={{ padding: '0.35rem' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
