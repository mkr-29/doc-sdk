import type { CSSProperties } from 'react';
import type {
  DocTemplate,
  DocContent,
  BlockContent,
  ThemeMode,
  DocSdkThemeColors,
  DocSdkThemeConfig,
} from '../../core';

export interface DocContentEditorProps {
  template: DocTemplate;
  initialContent?: DocContent;
  onChange?: (content: DocContent) => void;
  onSave?: (content: DocContent) => void;
  className?: string;
  style?: CSSProperties;
  theme?: ThemeMode;
  themeConfig?: DocSdkThemeConfig;
  lightColors?: Partial<DocSdkThemeColors>;
  darkColors?: Partial<DocSdkThemeColors>;
}

export interface BlockEditorProps<T = Record<string, unknown>> {
  block: BlockContent<T>;
  onUpdate: (data: Partial<T>) => void;
}
