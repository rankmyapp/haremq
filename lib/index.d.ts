import { Connection, Channel, Options, Replies } from 'amqplib';

declare class Client {
    constructor(connection: Connection, channel: Channel, url: string);
    /** Reconnects the client */
    reconnect(): Promise<void>;
    /** Creates or connect to a queue */
    queue(name: string, options: Options.AssertQueue): Promise<Queue>;
    /** Closes the connection */
    close(): Promise<void>;
    setPrefetchCount(count: number, global: boolean);
}

declare type Consumer = (data: Object, done: Function) => void;

declare class Queue {
    constructor(client: Client, name: string);
    /** Publish data to the queue */
    publish(data: Object, options: Options.Publish): boolean;
    /** Register a consumer to receive data */
    consume(consumer: Consumer, options: Options.Consume): Replies.Consume;
}
