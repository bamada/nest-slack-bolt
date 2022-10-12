import { MetadataBase } from './base.decorator';
import { SLACK_MESSAGE_METADATA } from './constants';

/**
 * Decorator may listen and react to slack Message events.
 */
export const Message = MetadataBase(SLACK_MESSAGE_METADATA);
