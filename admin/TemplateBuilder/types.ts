import type { CSSProperties } from 'react';
import type { DocTemplate, ThemeMode, DocSdkThemeColors, DocSdkThemeConfig } from '../../core';

export interface TemplateBuilderProps {
  initialTemplate?: DocTemplate;
  onChange?: (template: DocTemplate) => void;
  onSave?: (template: DocTemplate) => void;
  className?: string;
  style?: CSSProperties;
  theme?: ThemeMode;
  themeConfig?: DocSdkThemeConfig;
  lightColors?: Partial<DocSdkThemeColors>;
  darkColors?: Partial<DocSdkThemeColors>;
}
