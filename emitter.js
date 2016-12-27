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

//export default
 class Emitter {
    constructor(url) {
        this.url = url;
    }
    state(eventName) {
        console.log(this[eventName].readyState);
    }
    subscribe(eventName, callback) {
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onmessage = (event) => {
            callback(event.data);
        };
        //close event with varName.close()
        return this[eventName];
    }
    emit(eventName, ...arg) {
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onopen = (event) => {
            this.socket.send(JSON.stringify(arg)); 
        };
    }
}

// Lo mismo pero con metodos y propiedades privados.
class Emitter2 {
    constructor(url) {
        let _url = url;
        let _state = (eventName) => {
        console.log(this[eventName].readyState);
        };
        this.subscribe = (eventName, callback) => {
            if (!this[eventName]) {
                this[eventName] = new WebSocket(_url);
            }
            _state(eventName);
            this[eventName].onmessage = (event) => {
                callback(event.data);
            };
            //close event with varName.close()
            return this[eventName];
        };
        this.emit = (eventName, ...arg) => {
            if (!this[eventName]) {
                this[eventName] = new WebSocket(_url);
            }
            _state(eventName);
            this[eventName].onopen = (event) => {
                this.socket.send(JSON.stringify(arg)); 
            };
        };
    }    
}

var test = new Emitter('ws://ejemplo.com');
var test2 = new Emitter2();