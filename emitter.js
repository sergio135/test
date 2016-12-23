/*
 * Create an event emitter that goes like this
 *   const emitter = new Emitter();
 *
 * Allows you to subscribe to some event
 *   const sub1 = emitter.subscribe('event_name', () => {});
 * Any times you want
 *   const sub2 = emitter.subscribe('event_name', () => {});
 *
 * You can emit the event you want and pass any number of arguments
 *   emitter.emit('event_name', 'foo', 'bar');
 *
 * And allows you to release the subscription like this
 *   sub1();
 */

export default class Emitter {
    constructor() { }
}
