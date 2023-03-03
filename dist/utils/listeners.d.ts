import { ready } from '../listeners/ready';
import { error } from '../listeners/error';
import { shardReady } from '../listeners/shardReady';
import { interactionCreate } from '../listeners/interactionCreate';
import { messageCreate } from '../listeners/messageCreate';
declare const _default: {
    ready: typeof ready;
    error: typeof error;
    shardReady: typeof shardReady;
    interactionCreate: typeof interactionCreate;
    messageCreate: typeof messageCreate;
};
export default _default;
