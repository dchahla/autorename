var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/selection-changed.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/selection-changed.js":
/*!**********************************!*\
  !*** ./src/selection-changed.js ***!
  \**********************************/
/*! exports provided: onSelectionChanged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onSelectionChanged", function() { return onSelectionChanged; });
// let's get a hold on the Sketch API
var sketch = __webpack_require__(/*! sketch */ "sketch");

// we will also need a function to transform an NSArray into a proper JavaScript array
// the `util` package contains such a function so let's just use it.
var _require = __webpack_require__(/*! util */ "util"),
  toArray = _require.toArray;

// ### Defining The Action Handler
//
// In the manifest, we told Sketch that every time the `SelectionChanged` action finishes, we want it
// to run the onSelectionChanged handler in our `selection-changed.js` script file.
//
// So now we need to put some code into the `selection-changed.js` file to define that handler and make it do something useful.

function onSelectionChanged(context) {
  // ### Extracting Context Information
  // Whenever sketch calls a handler in one of our plugins, it passes in a single context argument.
  // This dictionary is our connection with Sketch itself, and contains all the information that
  // we need to work out which document was open, perform whatever task we want to on it, and so on.
  //
  // When we're being called in response to an action occurring, the context will contain
  // an actionContext property with additional information about the action, so that's the first
  // thing that we want to retrieve:
  var doc = sketch.getSelectedDocument();
  var pages = doc.pages;
  var selectedLayersContext = doc.selectedLayers;
  var action = context.actionContext;

  // The context information for each action will be different. For the SelectionChanged action,
  // we are passed three interesting values: which document the selection has changed in,
  // what the old selection was, what the new selection is (or will be).

  // For our purposes, we can ignore the old selection, but we need the other two values.

  // let's wrap the native document
  var document = sketch.fromNative(action.document);
  // and transform the NSArray that is `newSelection` into a proper array
  var selection = toArray(action.newSelection);
  selection.forEach(function (layer) {
    // console.log(layer)
    // if (layer.isKindOfClass(MSTextLayer)) {
    // //   const text = layer.stringValue()
    //   console.log('onSelectionChanged - Text Content:', layer.stringValue())
    //   //   layer.onGroup = function (group) {
    //   //     group.name = layer.stringValue()
    //   //     sketch.UI.message(`Group renamed to ${group.name}`, document)
    //   //   }

    //   // Text Content: Favorties
    //   // Text Content: Recents

    //   // Text Content: Most visited
    // }
    if (layer.isKindOfClass(MSLayerGroup)) {
      if (selectedLayersContext.length != 0) {
        selectedLayersContext.forEach(function (layer) {
          if (layer.layers && layer.layers.length) {
            var firstText = getFirstTextElement(layer.layers.reverse());
            if (firstText && firstText.text) layer.name = firstText.text;
          }
        });
      }
      //   pages.forEach(page => {
      //     page.layers.forEach(layer => {
      //       console.log(
      //         getSelectedLayers(JSON.stringify(layer)),
      //         Object.keys(layer)
      //       )
      //       let g = getSelectedLayers(JSON.stringify(layer))
      //       g.name = 'Artboard'
      //       //   if (layer.type === 'Artboard') {
      //       //     layer.onInsertLayers = function () {
      //       //       logSelectedLayers(layer.layers)
      //       //       console.log('layer.layers')
      //       //     }
      //       //   }
      //     })
      //   })
    } else {
      return;
    }
  });
  // Now for the meat of the plugin. What we want it to do is to show a small message at the bottom
  // of the canvas, showing how many items the user has selected. If there are no items, the message
  // area should be hidden.

  // So first let's get the selection count.
  var count = selection.length;
  if (count === 0) {
    sketch.UI.message('No layers selected', document);
  } else {
    // If one or more items are selected, we want to show a message.
    // We check for a single item and handle that as a special case so that we can get the wording correct.

    var message = count === 1 ? '1 layer selected' : "".concat(count, " layers selected");
    sketch.UI.message(message, document);
  }
}
function getFirstTextElement(array) {
  return array.reduce(function (acc, cur) {
    if (acc) {
      return acc;
    }
    return cur.type === 'Text' ? cur : null;
  }, null);
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onSelectionChanged'] = __skpm_run.bind(this, 'onSelectionChanged');
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=__selection-changed.js.map