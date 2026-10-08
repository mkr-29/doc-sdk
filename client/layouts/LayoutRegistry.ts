import type { LayoutRegistry } from '../../core';
import { SingleColumnLayout } from './SingleColumnLayout';
import { TwoColumnLayout } from './TwoColumnLayout';
import { SideBySideCodeLayout } from './SideBySideCodeLayout';

export const defaultLayoutRegistry: LayoutRegistry = {
  'single-column': SingleColumnLayout,
  'two-column': TwoColumnLayout,
  'side-by-side-code': SideBySideCodeLayout,
};
