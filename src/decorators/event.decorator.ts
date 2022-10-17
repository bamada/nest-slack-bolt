import { MetadataBase } from './base.decorator';
import { SLACK_EVENT_METADATA } from './constants';

/**
 * Decorator may listen and react to slack events.
 */
export const Event = MetadataBase<string>(SLACK_EVENT_METADATA);
