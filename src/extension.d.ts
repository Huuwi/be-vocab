import { Connection } from './database/connection'

declare global {
    export var connection: Connection;
}