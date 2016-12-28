/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var emitter_1 = __webpack_require__(1);
	var emitter = new emitter_1.Emitter2();
	var sub1 = emitter.subscribe('log', function () {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i] = arguments[_i];
	    }
	    return console.log.apply(console, ['sub1'].concat(args));
	});
	emitter.emit('log', 1, 'should trigger 1 callback');
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


/***/ },
/* 1 */
/***/ function(module, exports) {

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
	        if (url === void 0) { url = 'ws://ejemplos.com'; }
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
	    function Emitter2(url) {
	        this.url = url || 'ws://ejemplos.com';
	    }
	    Emitter2.prototype.state = function (eventName) {
	        if (this[eventName]) {
	            console.log(this[eventName].readyState);
	        }
	    };
	    Emitter2.prototype.subscribe = function (eventName, callback) {
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
	    Emitter2.prototype.emit = function (eventName) {
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
	    return Emitter2;
	}());
	exports.Emitter2 = Emitter2;


/***/ }
/******/ ]);