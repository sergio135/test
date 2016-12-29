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

export class Emitter {
    url;
    constructor(url= 'ws://test.com') {
        this.url = url;
    }
    state(eventName) {
        if (this[eventName]) {
            console.log(this[eventName].readyState);
        }
    }
    subscribe(eventName, callback) {
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onmessage = (event) => {
            callback(event.data);
        };
        return () => {
            this[eventName].close();
        };
    }
    emit(eventName, ...arg) {
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onopen = (event) => {
            this[eventName].send(JSON.stringify(arg));
        };
    }
}

// The same, but with private methods and private properties.
export class Emitter2 {
        subscribe: any;
        emit: any;
        constructor(urlSocket?) {
            let url = urlSocket || 'ws://test.com';
            this.subscribe = (eventName, callback) => {
                if (!this[eventName]) {
                    this[eventName] = new WebSocket(url);
                }
                this[eventName].onmessage = (event) => {
                    callback(event.data);
                };
                return () => {
                    this[eventName].close();
                };
            };
            this.emit = (eventName, ...arg) => {
                if (!this[eventName]) {
                    this[eventName] = new WebSocket(url);
                }
                this[eventName].onopen = (event) => {
                    this[eventName].send(JSON.stringify(arg));
                };
            };
        }
        state(eventName?) {
            if (this[eventName]) {
                console.log(this[eventName].readyState);
            }
        }
    }
