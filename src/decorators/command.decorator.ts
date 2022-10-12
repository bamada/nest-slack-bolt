import { MetadataBase } from './base.decorator';
import { SLACK_COMMAND_METADATA } from './constants';

/**
 * Decorator may listen and react to slack Command events.
 */
export const Command = MetadataBase(SLACK_COMMAND_METADATA);
