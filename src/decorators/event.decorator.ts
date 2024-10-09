import { SlackEvent } from '@slack/bolt';
import { MetadataBase } from './base.decorator';
import { SLACK_EVENT_METADATA } from './constants';

/**
 * A union type of all possible Slack event types.
 * This type is derived from the 'type' field of the SlackEvent interface.
 * It includes event types such as 'app_requested', 'app_mention', 'message', etc.
 */
type SlackEventTypes = SlackEvent['type'];

/**
 * Decorator for methods that listen and react to Slack events.
 *
 * @param eventType - The type of Slack event to listen for. Must be a valid SlackEventTypes value.
 *
 * @example
 * class MySlackBot {
 *   @Event('message')
 *   handleMessage(event: SlackEvent) {
 *     // Handle message event
 *   }
 *
 *   @Event('app_mention')
 *   handleAppMention(event: SlackEvent) {
 *     // Handle app mention event
 *   }
 * }
 */
export const Event = MetadataBase<SlackEventTypes>(SLACK_EVENT_METADATA);
