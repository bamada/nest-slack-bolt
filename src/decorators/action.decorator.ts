import { MetadataBase } from './base.decorator';
import { SLACK_ACTION_METADATA } from './constants';

/**
 * Decorator may listen and react to slack Action events.
 */
export const Action = MetadataBase(SLACK_ACTION_METADATA);
