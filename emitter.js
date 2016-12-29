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
"use strict";
var Emitter = (function () {
    function Emitter(url) {
        if (url === void 0) { url = 'ws://test.com'; }
        this.url = url;
    }
    Emitter.prototype.state = function (eventName) {
        if (this[eventName]) {
            console.log(this[eventName].readyState);
        }
    };
    Emitter.prototype.subscribe = function (eventName, callback) {
        var _this = this;
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onmessage = function (event) {
            callback(event.data);
        };
        return function () {
            _this[eventName].close();
        };
    };
    Emitter.prototype.emit = function (eventName) {
        var _this = this;
        var arg = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            arg[_i - 1] = arguments[_i];
        }
        if (!this[eventName]) {
            this[eventName] = new WebSocket(this.url);
        }
        this[eventName].onopen = function (event) {
            _this[eventName].send(JSON.stringify(arg));
        };
    };
    return Emitter;
}());
exports.Emitter = Emitter;
// The same, but with private methods and private properties.
var Emitter2 = (function () {
    function Emitter2(urlSocket) {
        var _this = this;
        var url = urlSocket || 'ws://test.com';
        this.subscribe = function (eventName, callback) {
            if (!_this[eventName]) {
                _this[eventName] = new WebSocket(url);
            }
            _this[eventName].onmessage = function (event) {
                callback(event.data);
            };
            return function () {
                _this[eventName].close();
            };
        };
        this.emit = function (eventName) {
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            if (!_this[eventName]) {
                _this[eventName] = new WebSocket(url);
            }
            _this[eventName].onopen = function (event) {
                _this[eventName].send(JSON.stringify(arg));
            };
        };
    }
    Emitter2.prototype.state = function (eventName) {
        if (this[eventName]) {
            console.log(this[eventName].readyState);
        }
    };
    return Emitter2;
}());
exports.Emitter2 = Emitter2;
