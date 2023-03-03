import { ready } from '../listeners/ready';
import { error } from '../listeners/error';
import { shardReady } from '../listeners/shardReady';
import { interactionCreate } from '../listeners/interactionCreate';
import { messageCreate } from '../listeners/messageCreate';

export default { ready, error, shardReady, interactionCreate, messageCreate };