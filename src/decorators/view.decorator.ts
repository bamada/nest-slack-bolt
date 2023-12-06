import { MetadataBase } from './base.decorator';
import { SLACK_VIEW_METADATA } from './constants';

/**
 * Decorator may listen and react to slack View submissions.
 */
export const View = MetadataBase(SLACK_VIEW_METADATA);
