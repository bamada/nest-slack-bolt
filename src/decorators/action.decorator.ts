import { MetadataBase } from 'src/decorators/base.decorator';
import { SLACK_ACTION_METADATA } from 'src/decorators/constants';

/**
 * Decorator may listen and react to slack Action events.
 */
export const Action = MetadataBase(SLACK_ACTION_METADATA);
