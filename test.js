"use strict";
var emitter_1 = require("./emitter");
var emitter = new emitter_1.Emitter();
console.log(emitter);
var sub1 = emitter.subscribe('log', function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, ['sub1'].concat(args));
});
emitter.emit('log', 1, 'should trigger 1 callback');
emitter.state('log');
var sub2 = emitter.subscribe('log', function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return console.log.apply(console, ['sub2'].concat(args));
});
emitter.emit('log', 2, 'should trigger 2 callbacks');
sub1();
emitter.emit('log', 3, 'should trigger 1 callback');
