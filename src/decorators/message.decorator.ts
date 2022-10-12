import { MetadataBase } from 'src/decorators/base.decorator';
import { SLACK_MESSAGE_METADATA } from 'src/decorators/constants';

/**
 * Decorator may listen and react to slack Message events.
 */
export const Message = MetadataBase(SLACK_MESSAGE_METADATA);
