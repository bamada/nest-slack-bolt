import { MetadataBase } from 'src/decorators/base.decorator';
import { SLACK_COMMAND_METADATA } from 'src/decorators/constants';

/**
 * Decorator may listen and react to slack Command events.
 */
export const Command = MetadataBase(SLACK_COMMAND_METADATA);
