import type { DocTemplate, DocContent, BlockContent } from '../../core';

export interface DocContentEditorProps {
  template: DocTemplate;
  initialContent?: DocContent;
  onChange?: (content: DocContent) => void;
  onSave?: (content: DocContent) => void;
  className?: string;
}

export interface BlockEditorProps<T = Record<string, unknown>> {
  block: BlockContent<T>;
  onUpdate: (data: Partial<T>) => void;
}
