import type { DocTemplate } from '../../core';

export interface TemplateBuilderProps {
  initialTemplate?: DocTemplate;
  onChange?: (template: DocTemplate) => void;
  onSave?: (template: DocTemplate) => void;
  className?: string;
}
