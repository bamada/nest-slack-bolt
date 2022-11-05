import { MetadataBase } from './base.decorator';
import { SLACK_SHORTCUT_METADATA } from './constants';

/**
 * Decorator may listen and react to slack Shortcut events.
 */
export const Shortcut = MetadataBase(SLACK_SHORTCUT_METADATA);
