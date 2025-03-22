import { Loggable } from '@helpers/Logger';
import { Connection } from './database/connection'

declare global {
    export var connection: Connection;

    export var logger: Loggable;
}