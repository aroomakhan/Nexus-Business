import { i as __toESM, t as __commonJSMin } from "./chunk-YKewjYmz.js";
import { t as require_react } from "./react.js";
//#region node_modules/react/cjs/react-jsx-runtime.development.js
/**
* @license React
* react-jsx-runtime.development.js
*
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		"use strict";
		var React = require_react();
		var REACT_ELEMENT_TYPE = Symbol.for("react.element");
		var REACT_PORTAL_TYPE = Symbol.for("react.portal");
		var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
		var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
		var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
		var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
		var REACT_CONTEXT_TYPE = Symbol.for("react.context");
		var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
		var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
		var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
		var REACT_MEMO_TYPE = Symbol.for("react.memo");
		var REACT_LAZY_TYPE = Symbol.for("react.lazy");
		var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
		var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
		var FAUX_ITERATOR_SYMBOL = "@@iterator";
		function getIteratorFn(maybeIterable) {
			if (maybeIterable === null || typeof maybeIterable !== "object") return null;
			var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
			if (typeof maybeIterator === "function") return maybeIterator;
			return null;
		}
		var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
		function error(format) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			printWarning("error", format, args);
		}
		function printWarning(level, format, args) {
			var stack = ReactSharedInternals.ReactDebugCurrentFrame.getStackAddendum();
			if (stack !== "") {
				format += "%s";
				args = args.concat([stack]);
			}
			var argsWithFormat = args.map(function(item) {
				return String(item);
			});
			argsWithFormat.unshift("Warning: " + format);
			Function.prototype.apply.call(console[level], console, argsWithFormat);
		}
		var enableScopeAPI = false;
		var enableCacheElement = false;
		var enableTransitionTracing = false;
		var enableLegacyHidden = false;
		var enableDebugTracing = false;
		var REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
		function isValidElementType(type) {
			if (typeof type === "string" || typeof type === "function") return true;
			if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) return true;
			if (typeof type === "object" && type !== null) {
				if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) return true;
			}
			return false;
		}
		function getWrappedName(outerType, innerType, wrapperName) {
			var displayName = outerType.displayName;
			if (displayName) return displayName;
			var functionName = innerType.displayName || innerType.name || "";
			return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
		}
		function getContextName(type) {
			return type.displayName || "Context";
		}
		function getComponentNameFromType(type) {
			if (type == null) return null;
			if (typeof type.tag === "number") error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
			if (typeof type === "function") return type.displayName || type.name || null;
			if (typeof type === "string") return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_CONTEXT_TYPE: return getContextName(type) + ".Consumer";
				case REACT_PROVIDER_TYPE: return getContextName(type._context) + ".Provider";
				case REACT_FORWARD_REF_TYPE: return getWrappedName(type, type.render, "ForwardRef");
				case REACT_MEMO_TYPE:
					var outerName = type.displayName || null;
					if (outerName !== null) return outerName;
					return getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return getComponentNameFromType(init(payload));
					} catch (x) {
						return null;
					}
			}
			return null;
		}
		var assign = Object.assign;
		var disabledDepth = 0;
		var prevLog;
		var prevInfo;
		var prevWarn;
		var prevError;
		var prevGroup;
		var prevGroupCollapsed;
		var prevGroupEnd;
		function disabledLog() {}
		disabledLog.__reactDisabledLog = true;
		function disableLogs() {
			if (disabledDepth === 0) {
				prevLog = console.log;
				prevInfo = console.info;
				prevWarn = console.warn;
				prevError = console.error;
				prevGroup = console.group;
				prevGroupCollapsed = console.groupCollapsed;
				prevGroupEnd = console.groupEnd;
				var props = {
					configurable: true,
					enumerable: true,
					value: disabledLog,
					writable: true
				};
				Object.defineProperties(console, {
					info: props,
					log: props,
					warn: props,
					error: props,
					group: props,
					groupCollapsed: props,
					groupEnd: props
				});
			}
			disabledDepth++;
		}
		function reenableLogs() {
			disabledDepth--;
			if (disabledDepth === 0) {
				var props = {
					configurable: true,
					enumerable: true,
					writable: true
				};
				Object.defineProperties(console, {
					log: assign({}, props, { value: prevLog }),
					info: assign({}, props, { value: prevInfo }),
					warn: assign({}, props, { value: prevWarn }),
					error: assign({}, props, { value: prevError }),
					group: assign({}, props, { value: prevGroup }),
					groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
					groupEnd: assign({}, props, { value: prevGroupEnd })
				});
			}
			if (disabledDepth < 0) error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
		}
		var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
		var prefix;
		function describeBuiltInComponentFrame(name, source, ownerFn) {
			if (prefix === void 0) try {
				throw Error();
			} catch (x) {
				var match = x.stack.trim().match(/\n( *(at )?)/);
				prefix = match && match[1] || "";
			}
			return "\n" + prefix + name;
		}
		var reentry = false;
		var componentFrameCache = new (typeof WeakMap === "function" ? WeakMap : Map)();
		function describeNativeComponentFrame(fn, construct) {
			if (!fn || reentry) return "";
			var frame = componentFrameCache.get(fn);
			if (frame !== void 0) return frame;
			var control;
			reentry = true;
			var previousPrepareStackTrace = Error.prepareStackTrace;
			Error.prepareStackTrace = void 0;
			var previousDispatcher = ReactCurrentDispatcher.current;
			ReactCurrentDispatcher.current = null;
			disableLogs();
			try {
				if (construct) {
					var Fake = function() {
						throw Error();
					};
					Object.defineProperty(Fake.prototype, "props", { set: function() {
						throw Error();
					} });
					if (typeof Reflect === "object" && Reflect.construct) {
						try {
							Reflect.construct(Fake, []);
						} catch (x) {
							control = x;
						}
						Reflect.construct(fn, [], Fake);
					} else {
						try {
							Fake.call();
						} catch (x) {
							control = x;
						}
						fn.call(Fake.prototype);
					}
				} else {
					try {
						throw Error();
					} catch (x) {
						control = x;
					}
					fn();
				}
			} catch (sample) {
				if (sample && control && typeof sample.stack === "string") {
					var sampleLines = sample.stack.split("\n");
					var controlLines = control.stack.split("\n");
					var s = sampleLines.length - 1;
					var c = controlLines.length - 1;
					while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) c--;
					for (; s >= 1 && c >= 0; s--, c--) if (sampleLines[s] !== controlLines[c]) {
						if (s !== 1 || c !== 1) do {
							s--;
							c--;
							if (c < 0 || sampleLines[s] !== controlLines[c]) {
								var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
								if (fn.displayName && _frame.includes("<anonymous>")) _frame = _frame.replace("<anonymous>", fn.displayName);
								if (typeof fn === "function") componentFrameCache.set(fn, _frame);
								return _frame;
							}
						} while (s >= 1 && c >= 0);
						break;
					}
				}
			} finally {
				reentry = false;
				ReactCurrentDispatcher.current = previousDispatcher;
				reenableLogs();
				Error.prepareStackTrace = previousPrepareStackTrace;
			}
			var name = fn ? fn.displayName || fn.name : "";
			var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
			if (typeof fn === "function") componentFrameCache.set(fn, syntheticFrame);
			return syntheticFrame;
		}
		function describeFunctionComponentFrame(fn, source, ownerFn) {
			return describeNativeComponentFrame(fn, false);
		}
		function shouldConstruct(Component) {
			var prototype = Component.prototype;
			return !!(prototype && prototype.isReactComponent);
		}
		function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
			if (type == null) return "";
			if (typeof type === "function") return describeNativeComponentFrame(type, shouldConstruct(type));
			if (typeof type === "string") return describeBuiltInComponentFrame(type);
			switch (type) {
				case REACT_SUSPENSE_TYPE: return describeBuiltInComponentFrame("Suspense");
				case REACT_SUSPENSE_LIST_TYPE: return describeBuiltInComponentFrame("SuspenseList");
			}
			if (typeof type === "object") switch (type.$$typeof) {
				case REACT_FORWARD_REF_TYPE: return describeFunctionComponentFrame(type.render);
				case REACT_MEMO_TYPE: return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
				case REACT_LAZY_TYPE:
					var lazyComponent = type;
					var payload = lazyComponent._payload;
					var init = lazyComponent._init;
					try {
						return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
					} catch (x) {}
			}
			return "";
		}
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		var loggedTypeFailures = {};
		var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame.setExtraStackFrame(null);
		}
		function checkPropTypes(typeSpecs, values, location, componentName, element) {
			var has = Function.call.bind(hasOwnProperty);
			for (var typeSpecName in typeSpecs) if (has(typeSpecs, typeSpecName)) {
				var error$1 = void 0;
				try {
					if (typeof typeSpecs[typeSpecName] !== "function") {
						var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
						err.name = "Invariant Violation";
						throw err;
					}
					error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
				} catch (ex) {
					error$1 = ex;
				}
				if (error$1 && !(error$1 instanceof Error)) {
					setCurrentlyValidatingElement(element);
					error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
					setCurrentlyValidatingElement(null);
				}
				if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
					loggedTypeFailures[error$1.message] = true;
					setCurrentlyValidatingElement(element);
					error("Failed %s type: %s", location, error$1.message);
					setCurrentlyValidatingElement(null);
				}
			}
		}
		var isArrayImpl = Array.isArray;
		function isArray(a) {
			return isArrayImpl(a);
		}
		function typeName(value) {
			return typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
		}
		function willCoercionThrow(value) {
			try {
				testStringCoercion(value);
				return false;
			} catch (e) {
				return true;
			}
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			if (willCoercionThrow(value)) {
				error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
				return testStringCoercion(value);
			}
		}
		var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
		var RESERVED_PROPS = {
			key: true,
			ref: true,
			__self: true,
			__source: true
		};
		var specialPropKeyWarningShown;
		var specialPropRefWarningShown;
		var didWarnAboutStringRefs = {};
		function hasValidRef(config) {
			if (hasOwnProperty.call(config, "ref")) {
				var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.ref !== void 0;
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return false;
			}
			return config.key !== void 0;
		}
		function warnIfStringRefCannotBeAutoConverted(config, self) {
			if (typeof config.ref === "string" && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
				var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
				if (!didWarnAboutStringRefs[componentName]) {
					error("Component \"%s\" contains the string ref \"%s\". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref", getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
					didWarnAboutStringRefs[componentName] = true;
				}
			}
		}
		function defineKeyPropWarningGetter(props, displayName) {
			var warnAboutAccessingKey = function() {
				if (!specialPropKeyWarningShown) {
					specialPropKeyWarningShown = true;
					error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingKey.isReactWarning = true;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: true
			});
		}
		function defineRefPropWarningGetter(props, displayName) {
			var warnAboutAccessingRef = function() {
				if (!specialPropRefWarningShown) {
					specialPropRefWarningShown = true;
					error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
				}
			};
			warnAboutAccessingRef.isReactWarning = true;
			Object.defineProperty(props, "ref", {
				get: warnAboutAccessingRef,
				configurable: true
			});
		}
		/**
		* Factory method to create a new React element. This no longer adheres to
		* the class pattern, so do not use new to call it. Also, instanceof check
		* will not work. Instead test $$typeof field against Symbol.for('react.element') to check
		* if something is a React Element.
		*
		* @param {*} type
		* @param {*} props
		* @param {*} key
		* @param {string|object} ref
		* @param {*} owner
		* @param {*} self A *temporary* helper to detect places where `this` is
		* different from the `owner` when React.createElement is called, so that we
		* can warn. We want to get rid of owner and replace string `ref`s with arrow
		* functions, and as long as `this` and owner are the same, there will be no
		* change in behavior.
		* @param {*} source An annotation object (added by a transpiler or otherwise)
		* indicating filename, line number, and/or other information.
		* @internal
		*/
		var ReactElement = function(type, key, ref, self, source, owner, props) {
			var element = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				ref,
				props,
				_owner: owner
			};
			element._store = {};
			Object.defineProperty(element._store, "validated", {
				configurable: false,
				enumerable: false,
				writable: true,
				value: false
			});
			Object.defineProperty(element, "_self", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: self
			});
			Object.defineProperty(element, "_source", {
				configurable: false,
				enumerable: false,
				writable: false,
				value: source
			});
			if (Object.freeze) {
				Object.freeze(element.props);
				Object.freeze(element);
			}
			return element;
		};
		/**
		* https://github.com/reactjs/rfcs/pull/107
		* @param {*} type
		* @param {object} props
		* @param {string} key
		*/
		function jsxDEV(type, config, maybeKey, source, self) {
			var propName;
			var props = {};
			var key = null;
			var ref = null;
			if (maybeKey !== void 0) {
				checkKeyStringCoercion(maybeKey);
				key = "" + maybeKey;
			}
			if (hasValidKey(config)) {
				checkKeyStringCoercion(config.key);
				key = "" + config.key;
			}
			if (hasValidRef(config)) {
				ref = config.ref;
				warnIfStringRefCannotBeAutoConverted(config, self);
			}
			for (propName in config) if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) props[propName] = config[propName];
			if (type && type.defaultProps) {
				var defaultProps = type.defaultProps;
				for (propName in defaultProps) if (props[propName] === void 0) props[propName] = defaultProps[propName];
			}
			if (key || ref) {
				var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
				if (key) defineKeyPropWarningGetter(props, displayName);
				if (ref) defineRefPropWarningGetter(props, displayName);
			}
			return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
		}
		var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
		var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
		function setCurrentlyValidatingElement$1(element) {
			if (element) {
				var owner = element._owner;
				var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
				ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
			} else ReactDebugCurrentFrame$1.setExtraStackFrame(null);
		}
		var propTypesMisspellWarningShown = false;
		/**
		* Verifies the object is a ReactElement.
		* See https://reactjs.org/docs/react-api.html#isvalidelement
		* @param {?object} object
		* @return {boolean} True if `object` is a ReactElement.
		* @final
		*/
		function isValidElement(object) {
			return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		function getDeclarationErrorAddendum() {
			if (ReactCurrentOwner$1.current) {
				var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
				if (name) return "\n\nCheck the render method of `" + name + "`.";
			}
			return "";
		}
		function getSourceInfoErrorAddendum(source) {
			if (source !== void 0) {
				var fileName = source.fileName.replace(/^.*[\\\/]/, "");
				var lineNumber = source.lineNumber;
				return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
			}
			return "";
		}
		/**
		* Warn if there's no key explicitly set on dynamic arrays of children or
		* object keys are not valid. This allows us to keep track of children between
		* updates.
		*/
		var ownerHasKeyUseWarning = {};
		function getCurrentComponentErrorInfo(parentType) {
			var info = getDeclarationErrorAddendum();
			if (!info) {
				var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
				if (parentName) info = "\n\nCheck the top-level render call using <" + parentName + ">.";
			}
			return info;
		}
		/**
		* Warn if the element doesn't have an explicit key assigned to it.
		* This element is in an array. The array could grow and shrink or be
		* reordered. All children that haven't already been validated are required to
		* have a "key" property assigned to it. Error statuses are cached so a warning
		* will only be shown once.
		*
		* @internal
		* @param {ReactElement} element Element that requires a key.
		* @param {*} parentType element's parent's type.
		*/
		function validateExplicitKey(element, parentType) {
			if (!element._store || element._store.validated || element.key != null) return;
			element._store.validated = true;
			var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
			if (ownerHasKeyUseWarning[currentComponentErrorInfo]) return;
			ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
			var childOwner = "";
			if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
			setCurrentlyValidatingElement$1(element);
			error("Each child in a list should have a unique \"key\" prop.%s%s See https://reactjs.org/link/warning-keys for more information.", currentComponentErrorInfo, childOwner);
			setCurrentlyValidatingElement$1(null);
		}
		/**
		* Ensure that every element either is passed in a static location, in an
		* array with an explicit keys property defined, or in an object literal
		* with valid key property.
		*
		* @internal
		* @param {ReactNode} node Statically passed child of any type.
		* @param {*} parentType node's parent's type.
		*/
		function validateChildKeys(node, parentType) {
			if (typeof node !== "object") return;
			if (isArray(node)) for (var i = 0; i < node.length; i++) {
				var child = node[i];
				if (isValidElement(child)) validateExplicitKey(child, parentType);
			}
			else if (isValidElement(node)) {
				if (node._store) node._store.validated = true;
			} else if (node) {
				var iteratorFn = getIteratorFn(node);
				if (typeof iteratorFn === "function") {
					if (iteratorFn !== node.entries) {
						var iterator = iteratorFn.call(node);
						var step;
						while (!(step = iterator.next()).done) if (isValidElement(step.value)) validateExplicitKey(step.value, parentType);
					}
				}
			}
		}
		/**
		* Given an element, validate that its props follow the propTypes definition,
		* provided by the type.
		*
		* @param {ReactElement} element
		*/
		function validatePropTypes(element) {
			var type = element.type;
			if (type === null || type === void 0 || typeof type === "string") return;
			var propTypes;
			if (typeof type === "function") propTypes = type.propTypes;
			else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_MEMO_TYPE)) propTypes = type.propTypes;
			else return;
			if (propTypes) {
				var name = getComponentNameFromType(type);
				checkPropTypes(propTypes, element.props, "prop", name, element);
			} else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
				propTypesMisspellWarningShown = true;
				error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", getComponentNameFromType(type) || "Unknown");
			}
			if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
		}
		/**
		* Given a fragment, validate that it can only be provided with fragment props
		* @param {ReactElement} fragment
		*/
		function validateFragmentProps(fragment) {
			var keys = Object.keys(fragment.props);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				if (key !== "children" && key !== "key") {
					setCurrentlyValidatingElement$1(fragment);
					error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
					setCurrentlyValidatingElement$1(null);
					break;
				}
			}
			if (fragment.ref !== null) {
				setCurrentlyValidatingElement$1(fragment);
				error("Invalid attribute `ref` supplied to `React.Fragment`.");
				setCurrentlyValidatingElement$1(null);
			}
		}
		var didWarnAboutKeySpread = {};
		function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
			var validType = isValidElementType(type);
			if (!validType) {
				var info = "";
				if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
				var sourceInfo = getSourceInfoErrorAddendum(source);
				if (sourceInfo) info += sourceInfo;
				else info += getDeclarationErrorAddendum();
				var typeString;
				if (type === null) typeString = "null";
				else if (isArray(type)) typeString = "array";
				else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
					typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
					info = " Did you accidentally export a JSX literal instead of a component?";
				} else typeString = typeof type;
				error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
			}
			var element = jsxDEV(type, props, key, source, self);
			if (element == null) return element;
			if (validType) {
				var children = props.children;
				if (children !== void 0) if (isStaticChildren) if (isArray(children)) {
					for (var i = 0; i < children.length; i++) validateChildKeys(children[i], type);
					if (Object.freeze) Object.freeze(children);
				} else error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
				else validateChildKeys(children, type);
			}
			if (hasOwnProperty.call(props, "key")) {
				var componentName = getComponentNameFromType(type);
				var keys = Object.keys(props).filter(function(k) {
					return k !== "key";
				});
				var beforeExample = keys.length > 0 ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				if (!didWarnAboutKeySpread[componentName + beforeExample]) {
					error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", beforeExample, componentName, keys.length > 0 ? "{" + keys.join(": ..., ") + ": ...}" : "{}", componentName);
					didWarnAboutKeySpread[componentName + beforeExample] = true;
				}
			}
			if (type === REACT_FRAGMENT_TYPE) validateFragmentProps(element);
			else validatePropTypes(element);
			return element;
		}
		function jsxWithValidationStatic(type, props, key) {
			return jsxWithValidation(type, props, key, true);
		}
		function jsxWithValidationDynamic(type, props, key) {
			return jsxWithValidation(type, props, key, false);
		}
		var jsx = jsxWithValidationDynamic;
		var jsxs = jsxWithValidationStatic;
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = jsx;
		exports.jsxs = jsxs;
	})();
}));
//#endregion
//#region node_modules/mimic-function/index.js
var import_jsx_runtime = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_development();
})))();
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
	if (property === "length" || property === "prototype") return;
	if (property === "arguments" || property === "caller") return;
	const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
	const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
	if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) return;
	Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
	return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
	const fromPrototype = Object.getPrototypeOf(from);
	if (fromPrototype === Object.getPrototypeOf(to)) return;
	Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/\n${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
	const withName = name === "" ? "" : `with ${name.trim()}() `;
	const newToString = wrappedToString.bind(null, withName, from.toString());
	Object.defineProperty(newToString, "name", toStringName);
	const { writable, enumerable, configurable } = toStringDescriptor;
	Object.defineProperty(to, "toString", {
		value: newToString,
		writable,
		enumerable,
		configurable
	});
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
	const { name } = to;
	for (const property of Reflect.ownKeys(from)) copyProperty(to, from, property, ignoreNonConfigurable);
	changePrototype(to, from);
	changeToString(to, from, name);
	return to;
}
//#endregion
//#region node_modules/memoize/distribution/index.js
var maxTimeoutValue = 2147483647;
var cacheStore = /* @__PURE__ */ new WeakMap();
var cacheTimerStore = /* @__PURE__ */ new WeakMap();
var cacheKeyStore = /* @__PURE__ */ new WeakMap();
function getValidCacheItem(cache, key) {
	const item = cache.get(key);
	if (!item) return;
	if (item.maxAge <= Date.now()) {
		cache.delete(key);
		return;
	}
	return item;
}
/**
[Memoize](https://en.wikipedia.org/wiki/Memoization) functions - An optimization used to speed up consecutive function calls by caching the result of calls with identical input.

@param function_ - The function to be memoized.

@example
```
import memoize from 'memoize';

let index = 0;
const counter = () => ++index;
const memoized = memoize(counter);

memoized('foo');
//=> 1

// Cached as it's the same argument
memoized('foo');
//=> 1

// Not cached anymore as the arguments changed
memoized('bar');
//=> 2

memoized('bar');
//=> 2
```
*/
function memoize(function_, { cacheKey, cache = /* @__PURE__ */ new Map(), maxAge } = {}) {
	if (maxAge === 0) return function_;
	if (typeof maxAge === "number" && Number.isFinite(maxAge)) {
		if (maxAge > maxTimeoutValue) throw new TypeError(`The \`maxAge\` option cannot exceed ${maxTimeoutValue}.`);
		if (maxAge < 0) throw new TypeError("The `maxAge` option should not be a negative number.");
	}
	const memoized = function(...arguments_) {
		const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
		const cacheItem = getValidCacheItem(cache, key);
		if (cacheItem) return cacheItem.data;
		const result = function_.apply(this, arguments_);
		const computedMaxAge = typeof maxAge === "function" ? maxAge(...arguments_) : maxAge;
		if (computedMaxAge !== void 0 && computedMaxAge !== Number.POSITIVE_INFINITY) {
			if (!Number.isFinite(computedMaxAge)) throw new TypeError("The `maxAge` function must return a finite number, `0`, or `Infinity`.");
			if (computedMaxAge <= 0) return result;
			if (computedMaxAge > maxTimeoutValue) throw new TypeError(`The \`maxAge\` function result cannot exceed ${maxTimeoutValue}.`);
		}
		cache.set(key, {
			data: result,
			maxAge: computedMaxAge === void 0 || computedMaxAge === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Date.now() + computedMaxAge
		});
		if (computedMaxAge !== void 0 && computedMaxAge !== Number.POSITIVE_INFINITY) {
			const timer = setTimeout(() => {
				cache.delete(key);
				cacheTimerStore.get(memoized)?.delete(timer);
			}, computedMaxAge);
			timer.unref?.();
			const timers = cacheTimerStore.get(memoized) ?? /* @__PURE__ */ new Set();
			timers.add(timer);
			cacheTimerStore.set(memoized, timers);
		}
		return result;
	};
	mimicFunction(memoized, function_, { ignoreNonConfigurable: true });
	cacheStore.set(memoized, cache);
	cacheKeyStore.set(memoized, cacheKey ?? ((arguments_) => arguments_[0]));
	return memoized;
}
//#endregion
//#region node_modules/get-user-locale/dist/index.js
function isString(el) {
	return typeof el === "string";
}
function isUnique(el, index, arr) {
	return arr.indexOf(el) === index;
}
function isAllLowerCase(el) {
	return el.toLowerCase() === el;
}
function fixCommas(el) {
	return el.indexOf(",") === -1 ? el : el.split(",");
}
function normalizeLocale(locale) {
	if (!locale) return locale;
	if (locale === "C" || locale === "posix" || locale === "POSIX") return "en-US";
	if (locale.indexOf(".") !== -1) {
		var _a = locale.split(".")[0], actualLocale = _a === void 0 ? "" : _a;
		return normalizeLocale(actualLocale);
	}
	if (locale.indexOf("@") !== -1) {
		var _b = locale.split("@")[0], actualLocale = _b === void 0 ? "" : _b;
		return normalizeLocale(actualLocale);
	}
	if (locale.indexOf("-") === -1 || !isAllLowerCase(locale)) return locale;
	var _c = locale.split("-"), splitEl1 = _c[0], _d = _c[1], splitEl2 = _d === void 0 ? "" : _d;
	return "".concat(splitEl1, "-").concat(splitEl2.toUpperCase());
}
function getUserLocalesInternal(_a) {
	var _b = _a === void 0 ? {} : _a, _c = _b.useFallbackLocale, useFallbackLocale = _c === void 0 ? true : _c, _d = _b.fallbackLocale, fallbackLocale = _d === void 0 ? "en-US" : _d;
	var languageList = [];
	if (typeof navigator !== "undefined") {
		var rawLanguages = navigator.languages || [];
		var languages = [];
		for (var _i = 0, rawLanguages_1 = rawLanguages; _i < rawLanguages_1.length; _i++) {
			var rawLanguagesItem = rawLanguages_1[_i];
			languages = languages.concat(fixCommas(rawLanguagesItem));
		}
		var rawLanguage = navigator.language;
		var language = rawLanguage ? fixCommas(rawLanguage) : rawLanguage;
		languageList = languageList.concat(languages, language);
	}
	if (useFallbackLocale) languageList.push(fallbackLocale);
	return languageList.filter(isString).map(normalizeLocale).filter(isUnique);
}
var getUserLocales = memoize(getUserLocalesInternal, { cacheKey: JSON.stringify });
function getUserLocaleInternal(options) {
	return getUserLocales(options)[0] || null;
}
var getUserLocale = memoize(getUserLocaleInternal, { cacheKey: JSON.stringify });
//#endregion
//#region node_modules/react-calendar/dist/shared/dateFormatter.js
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(options) {
	return function formatter(locale, date) {
		const localeWithDefault = locale || getUserLocale();
		if (!formatterCache.has(localeWithDefault)) formatterCache.set(localeWithDefault, /* @__PURE__ */ new Map());
		const formatterCacheLocale = formatterCache.get(localeWithDefault);
		if (!formatterCacheLocale.has(options)) {
			const formatter = new Intl.DateTimeFormat(localeWithDefault || void 0, options);
			formatterCacheLocale.set(options, formatter.format.bind(formatter));
		}
		return formatterCacheLocale.get(options)(date);
	};
}
/**
* Changes the hour in a Date to ensure right date formatting even if DST is messed up.
* Workaround for bug in WebKit and Firefox with historical dates.
* For more details, see:
* https://bugs.chromium.org/p/chromium/issues/detail?id=750465
* https://bugzilla.mozilla.org/show_bug.cgi?id=1385643
*
* @param {Date} date Date.
* @returns {Date} Date with hour set to 12.
*/
function toSafeHour(date) {
	const safeDate = new Date(date);
	return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
	return (locale, date) => getFormatter(options)(locale, toSafeHour(date));
}
var formatDateOptions = {
	day: "numeric",
	month: "numeric",
	year: "numeric"
};
var formatDayOptions = { day: "numeric" };
var formatLongDateOptions = {
	day: "numeric",
	month: "long",
	year: "numeric"
};
var formatMonthOptions = { month: "long" };
var formatMonthYearOptions = {
	month: "long",
	year: "numeric"
};
var formatShortWeekdayOptions = { weekday: "short" };
var formatWeekdayOptions = { weekday: "long" };
var formatYearOptions = { year: "numeric" };
getSafeFormatter(formatDateOptions);
var formatDay = getSafeFormatter(formatDayOptions);
var formatLongDate = getSafeFormatter(formatLongDateOptions);
var formatMonth = getSafeFormatter(formatMonthOptions);
var formatMonthYear = getSafeFormatter(formatMonthYearOptions);
var formatShortWeekday = getSafeFormatter(formatShortWeekdayOptions);
var formatWeekday = getSafeFormatter(formatWeekdayOptions);
var formatYear = getSafeFormatter(formatYearOptions);
//#endregion
//#region node_modules/@wojtekmaj/date-utils/dist/index.js
/**
* Utils
*/
function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
	return function makeGetEdgeOfNeighborInternal(date, offset = defaultOffset) {
		return getEdgeOfPeriod(getPeriod(date) + offset);
	};
}
function makeGetEnd(getBeginOfNextPeriod) {
	return function makeGetEndInternal(date) {
		return /* @__PURE__ */ new Date(getBeginOfNextPeriod(date).getTime() - 1);
	};
}
function makeGetRange(getStart, getEnd) {
	return function makeGetRangeInternal(date) {
		return [getStart(date), getEnd(date)];
	};
}
/**
* Simple getters - getting a property of a given point in time
*/
/**
* Gets year from a given date.
*
* @param {DateLike} date Date to get year from
* @returns {number} Year
*/
function getYear(date) {
	if (date instanceof Date) return date.getFullYear();
	if (typeof date === "number") return date;
	const year = Number.parseInt(date, 10);
	if (typeof date === "string" && !Number.isNaN(year)) return year;
	throw new Error(`Failed to get year from date: ${date}.`);
}
/**
* Gets month from a given date.
*
* @param {Date} date Date to get month from
* @returns {number} Month
*/
function getMonth(date) {
	if (date instanceof Date) return date.getMonth();
	throw new Error(`Failed to get month from date: ${date}.`);
}
/**
* Gets day of the month from a given date.
*
* @param {Date} date Date to get day of the month from
* @returns {number} Day of the month
*/
function getDate(date) {
	if (date instanceof Date) return date.getDate();
	throw new Error(`Failed to get year from date: ${date}.`);
}
/**
* Century
*/
/**
* Gets century start date from a given date.
*
* @param {DateLike} date Date to get century start from
* @returns {Date} Century start date
*/
function getCenturyStart(date) {
	const year = getYear(date);
	const centuryStartYear = year + (-year + 1) % 100;
	const centuryStartDate = /* @__PURE__ */ new Date();
	centuryStartDate.setFullYear(centuryStartYear, 0, 1);
	centuryStartDate.setHours(0, 0, 0, 0);
	return centuryStartDate;
}
/**
* Gets previous century start date from a given date.
*
* @param {DateLike} date Date to get previous century start from
* @param {number} [offset=-100] Offset in years to calculate previous century start from
* @returns {Date} Previous century start date
*/
var getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
/**
* Gets next century start date from a given date.
*
* @param {DateLike} date Date to get next century start from
* @param {number} [offset=100] Offset in years to calculate next century start from
* @returns {Date} Next century start date
*/
var getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);
/**
* Gets century end date from a given date.
*
* @param {DateLike} date Date to get century end from
* @returns {Date} Century end date
*/
var getCenturyEnd = makeGetEnd(getNextCenturyStart);
/**
* Gets previous century end date from a given date.
*
* @param {DateLike} date Date to get previous century end from
* @param {number} [offset=-100] Offset in years to calculate previous century end from
* @returns {Date} Previous century end date
*/
var getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
makeGetEdgeOfNeighbor(getYear, getCenturyEnd, 100);
/**
* Gets century start and end dates from a given date.
*
* @param {DateLike} date Date to get century start and end from
* @returns {[Date, Date]} Century start and end dates
*/
var getCenturyRange = makeGetRange(getCenturyStart, getCenturyEnd);
/**
* Decade
*/
/**
* Gets decade start date from a given date.
*
* @param {DateLike} date Date to get decade start from
* @returns {Date} Decade start date
*/
function getDecadeStart(date) {
	const year = getYear(date);
	const decadeStartYear = year + (-year + 1) % 10;
	const decadeStartDate = /* @__PURE__ */ new Date();
	decadeStartDate.setFullYear(decadeStartYear, 0, 1);
	decadeStartDate.setHours(0, 0, 0, 0);
	return decadeStartDate;
}
/**
* Gets previous decade start date from a given date.
*
* @param {DateLike} date Date to get previous decade start from
* @param {number} [offset=-10] Offset in years to calculate previous decade start from
* @returns {Date} Previous decade start date
*/
var getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
/**
* Gets next decade start date from a given date.
*
* @param {DateLike} date Date to get next decade start from
* @param {number} [offset=10] Offset in years to calculate next decade start from
* @returns {Date} Next decade start date
*/
var getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);
/**
* Gets decade end date from a given date.
*
* @param {DateLike} date Date to get decade end from
* @returns {Date} Decade end date
*/
var getDecadeEnd = makeGetEnd(getNextDecadeStart);
/**
* Gets previous decade end date from a given date.
*
* @param {DateLike} date Date to get previous decade end from
* @param {number} [offset=-10] Offset in years to calculate previous decade end from
* @returns {Date} Previous decade end date
*/
var getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
makeGetEdgeOfNeighbor(getYear, getDecadeEnd, 10);
/**
* Gets decade start and end dates from a given date.
*
* @param {DateLike} date Date to get decade start and end from
* @returns {[Date, Date]} Decade start and end dates
*/
var getDecadeRange = makeGetRange(getDecadeStart, getDecadeEnd);
/**
* Year
*/
/**
* Gets year start date from a given date.
*
* @param {DateLike} date Date to get year start from
* @returns {Date} Year start date
*/
function getYearStart(date) {
	const year = getYear(date);
	const yearStartDate = /* @__PURE__ */ new Date();
	yearStartDate.setFullYear(year, 0, 1);
	yearStartDate.setHours(0, 0, 0, 0);
	return yearStartDate;
}
/**
* Gets previous year start date from a given date.
*
* @param {DateLike} date Date to get previous year start from
* @param {number} [offset=-1] Offset in years to calculate previous year start from
* @returns {Date} Previous year start date
*/
var getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
/**
* Gets next year start date from a given date.
*
* @param {DateLike} date Date to get next year start from
* @param {number} [offset=1] Offset in years to calculate next year start from
* @returns {Date} Next year start date
*/
var getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);
/**
* Gets year end date from a given date.
*
* @param {DateLike} date Date to get year end from
* @returns {Date} Year end date
*/
var getYearEnd = makeGetEnd(getNextYearStart);
/**
* Gets previous year end date from a given date.
*
* @param {DateLike} date Date to get previous year end from
* @param {number} [offset=-1] Offset in years to calculate previous year end from
* @returns {Date} Previous year end date
*/
var getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
makeGetEdgeOfNeighbor(getYear, getYearEnd, 1);
/**
* Gets year start and end dates from a given date.
*
* @param {DateLike} date Date to get year start and end from
* @returns {[Date, Date]} Year start and end dates
*/
var getYearRange = makeGetRange(getYearStart, getYearEnd);
/**
* Month
*/
function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
	return function makeGetEdgeOfNeighborMonthInternal(date, offset = defaultOffset) {
		const year = getYear(date);
		const month = getMonth(date) + offset;
		const previousPeriod = /* @__PURE__ */ new Date();
		previousPeriod.setFullYear(year, month, 1);
		previousPeriod.setHours(0, 0, 0, 0);
		return getEdgeOfPeriod(previousPeriod);
	};
}
/**
* Gets month start date from a given date.
*
* @param {DateLike} date Date to get month start from
* @returns {Date} Month start date
*/
function getMonthStart(date) {
	const year = getYear(date);
	const month = getMonth(date);
	const monthStartDate = /* @__PURE__ */ new Date();
	monthStartDate.setFullYear(year, month, 1);
	monthStartDate.setHours(0, 0, 0, 0);
	return monthStartDate;
}
/**
* Gets previous month start date from a given date.
*
* @param {Date} date Date to get previous month start from
* @param {number} [offset=-1] Offset in months to calculate previous month start from
* @returns {Date} Previous month start date
*/
var getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
/**
* Gets next month start date from a given date.
*
* @param {Date} date Date to get next month start from
* @param {number} [offset=1] Offset in months to calculate next month start from
* @returns {Date} Next month start date
*/
var getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1);
/**
* Gets month end date from a given date.
*
* @param {Date} date Date to get month end from
* @returns {Date} Month end date
*/
var getMonthEnd = makeGetEnd(getNextMonthStart);
/**
* Gets previous month end date from a given date.
*
* @param {Date} date Date to get previous month end from
* @param {number} [offset=-1] Offset in months to calculate previous month end from
* @returns {Date} Previous month end date
*/
var getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
makeGetEdgeOfNeighborMonth(getMonthEnd, 1);
/**
* Gets month start and end dates from a given date.
*
* @param {Date} date Date to get month start and end from
* @returns {[Date, Date]} Month start and end dates
*/
var getMonthRange = makeGetRange(getMonthStart, getMonthEnd);
/**
* Day
*/
function makeGetEdgeOfNeighborDay(getEdgeOfPeriod, defaultOffset) {
	return function makeGetEdgeOfNeighborDayInternal(date, offset = defaultOffset) {
		const year = getYear(date);
		const month = getMonth(date);
		const day = getDate(date) + offset;
		const previousPeriod = /* @__PURE__ */ new Date();
		previousPeriod.setFullYear(year, month, day);
		previousPeriod.setHours(0, 0, 0, 0);
		return getEdgeOfPeriod(previousPeriod);
	};
}
/**
* Gets day start date from a given date.
*
* @param {DateLike} date Date to get day start from
* @returns {Date} Day start date
*/
function getDayStart(date) {
	const year = getYear(date);
	const month = getMonth(date);
	const day = getDate(date);
	const dayStartDate = /* @__PURE__ */ new Date();
	dayStartDate.setFullYear(year, month, day);
	dayStartDate.setHours(0, 0, 0, 0);
	return dayStartDate;
}
makeGetEdgeOfNeighborDay(getDayStart, -1);
/**
* Gets day end date from a given date.
*
* @param {Date} date Date to get day end from
* @returns {Date} Day end date
*/
var getDayEnd = makeGetEnd(makeGetEdgeOfNeighborDay(getDayStart, 1));
makeGetEdgeOfNeighborDay(getDayEnd, -1);
makeGetEdgeOfNeighborDay(getDayEnd, 1);
/**
* Gets day start and end dates from a given date.
*
* @param {DateLike} date Date to get day start and end from
* @returns {[Date, Date]} Day start and end dates
*/
var getDayRange = makeGetRange(getDayStart, getDayEnd);
/**
* Other
*/
/**
* Returns a number of days in a month of a given date.
*
* @param {Date} date Date
* @returns {number} Number of days in a month
*/
function getDaysInMonth(date) {
	return getDate(getMonthEnd(date));
}
//#endregion
//#region node_modules/react-calendar/dist/shared/const.js
var CALENDAR_TYPES = {
	GREGORY: "gregory",
	HEBREW: "hebrew",
	ISLAMIC: "islamic",
	ISO_8601: "iso8601"
};
var CALENDAR_TYPE_LOCALES = {
	gregory: [
		"en-CA",
		"en-US",
		"es-AR",
		"es-BO",
		"es-CL",
		"es-CO",
		"es-CR",
		"es-DO",
		"es-EC",
		"es-GT",
		"es-HN",
		"es-MX",
		"es-NI",
		"es-PA",
		"es-PE",
		"es-PR",
		"es-SV",
		"es-VE",
		"pt-BR"
	],
	hebrew: ["he", "he-IL"],
	islamic: [
		"ar",
		"ar-AE",
		"ar-BH",
		"ar-DZ",
		"ar-EG",
		"ar-IQ",
		"ar-JO",
		"ar-KW",
		"ar-LY",
		"ar-OM",
		"ar-QA",
		"ar-SA",
		"ar-SD",
		"ar-SY",
		"ar-YE",
		"dv",
		"dv-MV",
		"ps",
		"ps-AR"
	]
};
var WEEKDAYS = [
	0,
	1,
	2,
	3,
	4,
	5,
	6
];
//#endregion
//#region node_modules/react-calendar/dist/shared/dates.js
var SUNDAY = WEEKDAYS[0];
var FRIDAY = WEEKDAYS[5];
var SATURDAY = WEEKDAYS[6];
/**
* Gets day of the week of a given date.
* @param {Date} date Date.
* @param {CalendarType} [calendarType="iso8601"] Calendar type.
* @returns {number} Day of the week.
*/
function getDayOfWeek(date, calendarType = CALENDAR_TYPES.ISO_8601) {
	const weekday = date.getDay();
	switch (calendarType) {
		case CALENDAR_TYPES.ISO_8601: return (weekday + 6) % 7;
		case CALENDAR_TYPES.ISLAMIC: return (weekday + 1) % 7;
		case CALENDAR_TYPES.HEBREW:
		case CALENDAR_TYPES.GREGORY: return weekday;
		default: throw new Error("Unsupported calendar type.");
	}
}
/**
* Century
*/
/**
* Gets the year of the beginning of a century of a given date.
* @param {Date} date Date.
* @returns {number} Year of the beginning of a century.
*/
function getBeginOfCenturyYear(date) {
	return getYear(getCenturyStart(date));
}
/**
* Decade
*/
/**
* Gets the year of the beginning of a decade of a given date.
* @param {Date} date Date.
* @returns {number} Year of the beginning of a decade.
*/
function getBeginOfDecadeYear(date) {
	return getYear(getDecadeStart(date));
}
/**
* Week
*/
/**
* Returns the beginning of a given week.
*
* @param {Date} date Date.
* @param {CalendarType} [calendarType="iso8601"] Calendar type.
* @returns {Date} Beginning of a given week.
*/
function getBeginOfWeek(date, calendarType = CALENDAR_TYPES.ISO_8601) {
	const year = getYear(date);
	const monthIndex = getMonth(date);
	const day = date.getDate() - getDayOfWeek(date, calendarType);
	return new Date(year, monthIndex, day);
}
/**
* Gets week number according to ISO 8601 or US standard.
* In ISO 8601, Arabic and Hebrew week 1 is the one with January 4.
* In US calendar week 1 is the one with January 1.
*
* @param {Date} date Date.
* @param {CalendarType} [calendarType="iso8601"] Calendar type.
* @returns {number} Week number.
*/
function getWeekNumber(date, calendarType = CALENDAR_TYPES.ISO_8601) {
	const calendarTypeForWeekNumber = calendarType === CALENDAR_TYPES.GREGORY ? CALENDAR_TYPES.GREGORY : CALENDAR_TYPES.ISO_8601;
	const beginOfWeek = getBeginOfWeek(date, calendarType);
	let year = getYear(date) + 1;
	let dayInWeekOne;
	let beginOfFirstWeek;
	do {
		dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
		beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
		year -= 1;
	} while (date < beginOfFirstWeek);
	return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (864e5 * 7)) + 1;
}
/**
* Others
*/
/**
* Returns the beginning of a given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date} Beginning of a given range.
*/
function getBegin(rangeType, date) {
	switch (rangeType) {
		case "century": return getCenturyStart(date);
		case "decade": return getDecadeStart(date);
		case "year": return getYearStart(date);
		case "month": return getMonthStart(date);
		case "day": return getDayStart(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Returns the beginning of a previous given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date} Beginning of a previous given range.
*/
function getBeginPrevious(rangeType, date) {
	switch (rangeType) {
		case "century": return getPreviousCenturyStart(date);
		case "decade": return getPreviousDecadeStart(date);
		case "year": return getPreviousYearStart(date);
		case "month": return getPreviousMonthStart(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Returns the beginning of a next given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date} Beginning of a next given range.
*/
function getBeginNext(rangeType, date) {
	switch (rangeType) {
		case "century": return getNextCenturyStart(date);
		case "decade": return getNextDecadeStart(date);
		case "year": return getNextYearStart(date);
		case "month": return getNextMonthStart(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
function getBeginPrevious2(rangeType, date) {
	switch (rangeType) {
		case "decade": return getPreviousDecadeStart(date, -100);
		case "year": return getPreviousYearStart(date, -10);
		case "month": return getPreviousMonthStart(date, -12);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
function getBeginNext2(rangeType, date) {
	switch (rangeType) {
		case "decade": return getNextDecadeStart(date, 100);
		case "year": return getNextYearStart(date, 10);
		case "month": return getNextMonthStart(date, 12);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Returns the end of a given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date} End of a given range.
*/
function getEnd(rangeType, date) {
	switch (rangeType) {
		case "century": return getCenturyEnd(date);
		case "decade": return getDecadeEnd(date);
		case "year": return getYearEnd(date);
		case "month": return getMonthEnd(date);
		case "day": return getDayEnd(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Returns the end of a previous given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date} End of a previous given range.
*/
function getEndPrevious(rangeType, date) {
	switch (rangeType) {
		case "century": return getPreviousCenturyEnd(date);
		case "decade": return getPreviousDecadeEnd(date);
		case "year": return getPreviousYearEnd(date);
		case "month": return getPreviousMonthEnd(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
function getEndPrevious2(rangeType, date) {
	switch (rangeType) {
		case "decade": return getPreviousDecadeEnd(date, -100);
		case "year": return getPreviousYearEnd(date, -10);
		case "month": return getPreviousMonthEnd(date, -12);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Returns an array with the beginning and the end of a given range.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date Date.
* @returns {Date[]} Beginning and end of a given range.
*/
function getRange(rangeType, date) {
	switch (rangeType) {
		case "century": return getCenturyRange(date);
		case "decade": return getDecadeRange(date);
		case "year": return getYearRange(date);
		case "month": return getMonthRange(date);
		case "day": return getDayRange(date);
		default: throw new Error(`Invalid rangeType: ${rangeType}`);
	}
}
/**
* Creates a range out of two values, ensuring they are in order and covering entire period ranges.
*
* @param {RangeType} rangeType Range type (e.g. 'day')
* @param {Date} date1 First date.
* @param {Date} date2 Second date.
* @returns {Date[]} Beginning and end of a given range.
*/
function getValueRange(rangeType, date1, date2) {
	const rawNextValue = [date1, date2].sort((a, b) => a.getTime() - b.getTime());
	return [getBegin(rangeType, rawNextValue[0]), getEnd(rangeType, rawNextValue[1])];
}
function toYearLabel(locale, formatYear$4, dates) {
	return dates.map((date) => (formatYear$4 || formatYear)(locale, date)).join(" – ");
}
/**
* @callback FormatYear
* @param {string} locale Locale.
* @param {Date} date Date.
* @returns {string} Formatted year.
*/
/**
* Returns a string labelling a century of a given date.
* For example, for 2017 it will return 2001-2100.
*
* @param {string} locale Locale.
* @param {FormatYear} formatYear Function to format a year.
* @param {Date|string|number} date Date or a year as a string or as a number.
* @returns {string} String labelling a century of a given date.
*/
function getCenturyLabel(locale, formatYear, date) {
	return toYearLabel(locale, formatYear, getCenturyRange(date));
}
/**
* Returns a string labelling a decade of a given date.
* For example, for 2017 it will return 2011-2020.
*
* @param {string} locale Locale.
* @param {FormatYear} formatYear Function to format a year.
* @param {Date|string|number} date Date or a year as a string or as a number.
* @returns {string} String labelling a decade of a given date.
*/
function getDecadeLabel(locale, formatYear, date) {
	return toYearLabel(locale, formatYear, getDecadeRange(date));
}
/**
* Returns a boolean determining whether a given date is the current day of the week.
*
* @param {Date} date Date.
* @returns {boolean} Whether a given date is the current day of the week.
*/
function isCurrentDayOfWeek(date) {
	return date.getDay() === (/* @__PURE__ */ new Date()).getDay();
}
/**
* Returns a boolean determining whether a given date is a weekend day.
*
* @param {Date} date Date.
* @param {CalendarType} [calendarType="iso8601"] Calendar type.
* @returns {boolean} Whether a given date is a weekend day.
*/
function isWeekend(date, calendarType = CALENDAR_TYPES.ISO_8601) {
	const weekday = date.getDay();
	switch (calendarType) {
		case CALENDAR_TYPES.ISLAMIC:
		case CALENDAR_TYPES.HEBREW: return weekday === FRIDAY || weekday === SATURDAY;
		case CALENDAR_TYPES.ISO_8601:
		case CALENDAR_TYPES.GREGORY: return weekday === SATURDAY || weekday === SUNDAY;
		default: throw new Error("Unsupported calendar type.");
	}
}
//#endregion
//#region node_modules/react-calendar/dist/Calendar/Navigation.js
var className$6 = "react-calendar__navigation";
function Navigation({ activeStartDate, drillUp, formatMonthYear: formatMonthYear$2 = formatMonthYear, formatYear: formatYear$3 = formatYear, locale, maxDate, minDate, navigationAriaLabel = "", navigationAriaLive, navigationLabel, next2AriaLabel = "", next2Label = "»", nextAriaLabel = "", nextLabel = "›", prev2AriaLabel = "", prev2Label = "«", prevAriaLabel = "", prevLabel = "‹", setActiveStartDate, showDoubleView, view, views }) {
	const drillUpAvailable = views.indexOf(view) > 0;
	const shouldShowPrevNext2Buttons = view !== "century";
	const previousActiveStartDate = getBeginPrevious(view, activeStartDate);
	const previousActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginPrevious2(view, activeStartDate) : void 0;
	const nextActiveStartDate = getBeginNext(view, activeStartDate);
	const nextActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginNext2(view, activeStartDate) : void 0;
	const prevButtonDisabled = (() => {
		if (previousActiveStartDate.getFullYear() < 0) return true;
		const previousActiveEndDate = getEndPrevious(view, activeStartDate);
		return minDate && minDate >= previousActiveEndDate;
	})();
	const prev2ButtonDisabled = shouldShowPrevNext2Buttons && (() => {
		if (previousActiveStartDate2.getFullYear() < 0) return true;
		const previousActiveEndDate = getEndPrevious2(view, activeStartDate);
		return minDate && minDate >= previousActiveEndDate;
	})();
	const nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;
	const next2ButtonDisabled = shouldShowPrevNext2Buttons && maxDate && maxDate < nextActiveStartDate2;
	function onClickPrevious() {
		setActiveStartDate(previousActiveStartDate, "prev");
	}
	function onClickPrevious2() {
		setActiveStartDate(previousActiveStartDate2, "prev2");
	}
	function onClickNext() {
		setActiveStartDate(nextActiveStartDate, "next");
	}
	function onClickNext2() {
		setActiveStartDate(nextActiveStartDate2, "next2");
	}
	function renderLabel(date) {
		const label = (() => {
			switch (view) {
				case "century": return getCenturyLabel(locale, formatYear$3, date);
				case "decade": return getDecadeLabel(locale, formatYear$3, date);
				case "year": return formatYear$3(locale, date);
				case "month": return formatMonthYear$2(locale, date);
				default: throw new Error(`Invalid view: ${view}.`);
			}
		})();
		return navigationLabel ? navigationLabel({
			date,
			label,
			locale: locale || getUserLocale() || void 0,
			view
		}) : label;
	}
	function renderButton() {
		const labelClassName = `${className$6}__label`;
		return (0, import_jsx_runtime.jsxs)("button", {
			"aria-label": navigationAriaLabel,
			"aria-live": navigationAriaLive,
			className: labelClassName,
			disabled: !drillUpAvailable,
			onClick: drillUp,
			style: { flexGrow: 1 },
			type: "button",
			children: [(0, import_jsx_runtime.jsx)("span", {
				className: `${labelClassName}__labelText ${labelClassName}__labelText--from`,
				children: renderLabel(activeStartDate)
			}), showDoubleView ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("span", {
				className: `${labelClassName}__divider`,
				children: " – "
			}), (0, import_jsx_runtime.jsx)("span", {
				className: `${labelClassName}__labelText ${labelClassName}__labelText--to`,
				children: renderLabel(nextActiveStartDate)
			})] }) : null]
		});
	}
	return (0, import_jsx_runtime.jsxs)("div", {
		className: className$6,
		children: [
			prev2Label !== null && shouldShowPrevNext2Buttons ? (0, import_jsx_runtime.jsx)("button", {
				"aria-label": prev2AriaLabel,
				className: `${className$6}__arrow ${className$6}__prev2-button`,
				disabled: prev2ButtonDisabled,
				onClick: onClickPrevious2,
				type: "button",
				children: prev2Label
			}) : null,
			prevLabel !== null && (0, import_jsx_runtime.jsx)("button", {
				"aria-label": prevAriaLabel,
				className: `${className$6}__arrow ${className$6}__prev-button`,
				disabled: prevButtonDisabled,
				onClick: onClickPrevious,
				type: "button",
				children: prevLabel
			}),
			renderButton(),
			nextLabel !== null && (0, import_jsx_runtime.jsx)("button", {
				"aria-label": nextAriaLabel,
				className: `${className$6}__arrow ${className$6}__next-button`,
				disabled: nextButtonDisabled,
				onClick: onClickNext,
				type: "button",
				children: nextLabel
			}),
			next2Label !== null && shouldShowPrevNext2Buttons ? (0, import_jsx_runtime.jsx)("button", {
				"aria-label": next2AriaLabel,
				className: `${className$6}__arrow ${className$6}__next2-button`,
				disabled: next2ButtonDisabled,
				onClick: onClickNext2,
				type: "button",
				children: next2Label
			}) : null
		]
	});
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/react-calendar/dist/Flex.js
function toPercent(num) {
	return `${num}%`;
}
function Flex({ children, className, count, direction, offset, style, wrap, ...otherProps }) {
	return (0, import_jsx_runtime.jsx)("div", {
		className,
		style: {
			display: "flex",
			flexDirection: direction,
			flexWrap: wrap ? "wrap" : "nowrap",
			...style
		},
		...otherProps,
		children: import_react.Children.map(children, (child, index) => {
			const marginInlineStart = offset && index === 0 ? toPercent(100 * offset / count) : null;
			return (0, import_react.cloneElement)(child, {
				...child.props,
				style: {
					flexBasis: toPercent(100 / count),
					flexShrink: 0,
					flexGrow: 0,
					overflow: "hidden",
					marginLeft: marginInlineStart,
					marginInlineStart,
					marginInlineEnd: 0
				}
			});
		})
	});
}
//#endregion
//#region node_modules/react-calendar/dist/shared/utils.js
/**
* Returns a value no smaller than min and no larger than max.
*
* @param {Date} value Value to return.
* @param {Date} min Minimum return value.
* @param {Date} max Maximum return value.
* @returns {Date} Value between min and max.
*/
function between(value, min, max) {
	if (min && min > value) return min;
	if (max && max < value) return max;
	return value;
}
function isValueWithinRange(value, range) {
	return range[0] <= value && range[1] >= value;
}
function isRangeWithinRange(greaterRange, smallerRange) {
	return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
}
function doRangesOverlap(range1, range2) {
	return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
}
function getRangeClassNames(valueRange, dateRange, baseClassName) {
	const isRange = doRangesOverlap(dateRange, valueRange);
	const classes = [];
	if (isRange) {
		classes.push(baseClassName);
		const isRangeStart = isValueWithinRange(valueRange[0], dateRange);
		const isRangeEnd = isValueWithinRange(valueRange[1], dateRange);
		if (isRangeStart) classes.push(`${baseClassName}Start`);
		if (isRangeEnd) classes.push(`${baseClassName}End`);
		if (isRangeStart && isRangeEnd) classes.push(`${baseClassName}BothEnds`);
	}
	return classes;
}
function isCompleteValue(value) {
	if (Array.isArray(value)) return value[0] !== null && value[1] !== null;
	return value !== null;
}
function getTileClasses(args) {
	if (!args) throw new Error("args is required");
	const { value, date, hover } = args;
	const className = "react-calendar__tile";
	const classes = [className];
	if (!date) return classes;
	const now = /* @__PURE__ */ new Date();
	const dateRange = (() => {
		if (Array.isArray(date)) return date;
		const { dateType } = args;
		if (!dateType) throw new Error("dateType is required when date is not an array of two dates");
		return getRange(dateType, date);
	})();
	if (isValueWithinRange(now, dateRange)) classes.push(`${className}--now`);
	if (!value || !isCompleteValue(value)) return classes;
	const valueRange = (() => {
		if (Array.isArray(value)) return value;
		const { valueType } = args;
		if (!valueType) throw new Error("valueType is required when value is not an array of two dates");
		return getRange(valueType, value);
	})();
	if (isRangeWithinRange(valueRange, dateRange)) classes.push(`${className}--active`);
	else if (doRangesOverlap(valueRange, dateRange)) classes.push(`${className}--hasActive`);
	const valueRangeClassNames = getRangeClassNames(valueRange, dateRange, `${className}--range`);
	classes.push(...valueRangeClassNames);
	if (hover && (Array.isArray(value) ? value : [value]).length === 1) {
		const hoverRangeClassNames = getRangeClassNames(hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]], dateRange, `${className}--hover`);
		classes.push(...hoverRangeClassNames);
	}
	return classes;
}
//#endregion
//#region node_modules/react-calendar/dist/TileGroup.js
function TileGroup({ className, count = 3, dateTransform, dateType, end, hover, offset, renderTile, start, step = 1, value, valueType }) {
	const tiles = [];
	for (let point = start; point <= end; point += step) {
		const date = dateTransform(point);
		tiles.push(renderTile({
			classes: getTileClasses({
				date,
				dateType,
				hover,
				value,
				valueType
			}),
			date
		}));
	}
	return (0, import_jsx_runtime.jsx)(Flex, {
		className,
		count,
		offset,
		wrap: true,
		children: tiles
	});
}
//#endregion
//#region node_modules/react-calendar/dist/Tile.js
function Tile(props) {
	const { activeStartDate, children, classes, date, formatAbbr, locale, maxDate, maxDateTransform, minDate, minDateTransform, onClick, onMouseOver, style, tileClassName: tileClassNameProps, tileContent: tileContentProps, tileDisabled, view } = props;
	const tileClassName = (0, import_react.useMemo)(() => {
		return typeof tileClassNameProps === "function" ? tileClassNameProps({
			activeStartDate,
			date,
			view
		}) : tileClassNameProps;
	}, [
		activeStartDate,
		date,
		tileClassNameProps,
		view
	]);
	const tileContent = (0, import_react.useMemo)(() => {
		return typeof tileContentProps === "function" ? tileContentProps({
			activeStartDate,
			date,
			view
		}) : tileContentProps;
	}, [
		activeStartDate,
		date,
		tileContentProps,
		view
	]);
	return (0, import_jsx_runtime.jsxs)("button", {
		className: clsx(classes, tileClassName),
		disabled: minDate && minDateTransform(minDate) > date || maxDate && maxDateTransform(maxDate) < date || (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({
			activeStartDate,
			date,
			view
		})),
		onClick: onClick ? (event) => onClick(date, event) : void 0,
		onFocus: onMouseOver ? () => onMouseOver(date) : void 0,
		onMouseOver: onMouseOver ? () => onMouseOver(date) : void 0,
		style,
		type: "button",
		children: [formatAbbr ? (0, import_jsx_runtime.jsx)("abbr", {
			"aria-label": formatAbbr(locale, date),
			children
		}) : children, tileContent]
	});
}
//#endregion
//#region node_modules/react-calendar/dist/CenturyView/Decade.js
var className$5 = "react-calendar__century-view__decades__decade";
function Decade({ classes = [], currentCentury, formatYear: formatYear$2 = formatYear, ...otherProps }) {
	const { date, locale } = otherProps;
	const classesProps = [];
	if (classes) classesProps.push(...classes);
	classesProps.push(className$5);
	if (getCenturyStart(date).getFullYear() !== currentCentury) classesProps.push(`${className$5}--neighboringCentury`);
	return (0, import_jsx_runtime.jsx)(Tile, {
		...otherProps,
		classes: classesProps,
		maxDateTransform: getDecadeEnd,
		minDateTransform: getDecadeStart,
		view: "century",
		children: getDecadeLabel(locale, formatYear$2, date)
	});
}
//#endregion
//#region node_modules/react-calendar/dist/CenturyView/Decades.js
function Decades(props) {
	const { activeStartDate, hover, showNeighboringCentury, value, valueType, ...otherProps } = props;
	const start = getBeginOfCenturyYear(activeStartDate);
	return (0, import_jsx_runtime.jsx)(TileGroup, {
		className: "react-calendar__century-view__decades",
		dateTransform: getDecadeStart,
		dateType: "decade",
		end: start + (showNeighboringCentury ? 119 : 99),
		hover,
		renderTile: ({ date, ...otherTileProps }) => (0, import_jsx_runtime.jsx)(Decade, {
			...otherProps,
			...otherTileProps,
			activeStartDate,
			currentCentury: start,
			date
		}, date.getTime()),
		start,
		step: 10,
		value,
		valueType
	});
}
//#endregion
//#region node_modules/react-calendar/dist/CenturyView.js
/**
* Displays a given century.
*/
function CenturyView(props) {
	function renderDecades() {
		return (0, import_jsx_runtime.jsx)(Decades, { ...props });
	}
	return (0, import_jsx_runtime.jsx)("div", {
		className: "react-calendar__century-view",
		children: renderDecades()
	});
}
//#endregion
//#region node_modules/react-calendar/dist/DecadeView/Year.js
var className$4 = "react-calendar__decade-view__years__year";
function Year({ classes = [], currentDecade, formatYear: formatYear$1 = formatYear, ...otherProps }) {
	const { date, locale } = otherProps;
	const classesProps = [];
	if (classes) classesProps.push(...classes);
	classesProps.push(className$4);
	if (getDecadeStart(date).getFullYear() !== currentDecade) classesProps.push(`${className$4}--neighboringDecade`);
	return (0, import_jsx_runtime.jsx)(Tile, {
		...otherProps,
		classes: classesProps,
		maxDateTransform: getYearEnd,
		minDateTransform: getYearStart,
		view: "decade",
		children: formatYear$1(locale, date)
	});
}
//#endregion
//#region node_modules/react-calendar/dist/DecadeView/Years.js
function Years(props) {
	const { activeStartDate, hover, showNeighboringDecade, value, valueType, ...otherProps } = props;
	const start = getBeginOfDecadeYear(activeStartDate);
	return (0, import_jsx_runtime.jsx)(TileGroup, {
		className: "react-calendar__decade-view__years",
		dateTransform: getYearStart,
		dateType: "year",
		end: start + (showNeighboringDecade ? 11 : 9),
		hover,
		renderTile: ({ date, ...otherTileProps }) => (0, import_jsx_runtime.jsx)(Year, {
			...otherProps,
			...otherTileProps,
			activeStartDate,
			currentDecade: start,
			date
		}, date.getTime()),
		start,
		value,
		valueType
	});
}
//#endregion
//#region node_modules/react-calendar/dist/DecadeView.js
/**
* Displays a given decade.
*/
function DecadeView(props) {
	function renderYears() {
		return (0, import_jsx_runtime.jsx)(Years, { ...props });
	}
	return (0, import_jsx_runtime.jsx)("div", {
		className: "react-calendar__decade-view",
		children: renderYears()
	});
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView/Day.js
var className$3 = "react-calendar__month-view__days__day";
function Day({ calendarType, classes = [], currentMonthIndex, formatDay: formatDay$1 = formatDay, formatLongDate: formatLongDate$1 = formatLongDate, ...otherProps }) {
	const { date, locale } = otherProps;
	const classesProps = [];
	if (classes) classesProps.push(...classes);
	classesProps.push(className$3);
	if (isWeekend(date, calendarType)) classesProps.push(`${className$3}--weekend`);
	if (date.getMonth() !== currentMonthIndex) classesProps.push(`${className$3}--neighboringMonth`);
	return (0, import_jsx_runtime.jsx)(Tile, {
		...otherProps,
		classes: classesProps,
		formatAbbr: formatLongDate$1,
		maxDateTransform: getDayEnd,
		minDateTransform: getDayStart,
		view: "month",
		children: formatDay$1(locale, date)
	});
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView/Days.js
function Days(props) {
	const { activeStartDate, calendarType, hover, showFixedNumberOfWeeks, showNeighboringMonth, value, valueType, ...otherProps } = props;
	const year = getYear(activeStartDate);
	const monthIndex = getMonth(activeStartDate);
	const hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
	const dayOfWeek = getDayOfWeek(activeStartDate, calendarType);
	const offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;
	/**
	* Defines on which day of the month the grid shall start. If we simply show current
	* month, we obviously start on day one, but if showNeighboringMonth is set to
	* true, we need to find the beginning of the week the first day of the month is in.
	*/
	const start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;
	return (0, import_jsx_runtime.jsx)(TileGroup, {
		className: "react-calendar__month-view__days",
		count: 7,
		dateTransform: (day) => {
			const date = /* @__PURE__ */ new Date();
			date.setFullYear(year, monthIndex, day);
			return getDayStart(date);
		},
		dateType: "day",
		hover,
		end: (() => {
			if (showFixedNumberOfWeeks) return start + 42 - 1;
			const daysInMonth = getDaysInMonth(activeStartDate);
			if (showNeighboringMonth) {
				const activeEndDate = /* @__PURE__ */ new Date();
				activeEndDate.setFullYear(year, monthIndex, daysInMonth);
				activeEndDate.setHours(0, 0, 0, 0);
				return daysInMonth + (7 - getDayOfWeek(activeEndDate, calendarType) - 1);
			}
			return daysInMonth;
		})(),
		renderTile: ({ date, ...otherTileProps }) => (0, import_jsx_runtime.jsx)(Day, {
			...otherProps,
			...otherTileProps,
			activeStartDate,
			calendarType,
			currentMonthIndex: monthIndex,
			date
		}, date.getTime()),
		offset,
		start,
		value,
		valueType
	});
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView/Weekdays.js
var className$2 = "react-calendar__month-view__weekdays";
var weekdayClassName = `${className$2}__weekday`;
function Weekdays(props) {
	const { calendarType, formatShortWeekday: formatShortWeekday$1 = formatShortWeekday, formatWeekday: formatWeekday$1 = formatWeekday, locale, onMouseLeave } = props;
	const beginOfMonth = getMonthStart(/* @__PURE__ */ new Date());
	const year = getYear(beginOfMonth);
	const monthIndex = getMonth(beginOfMonth);
	const weekdays = [];
	for (let weekday = 1; weekday <= 7; weekday += 1) {
		const weekdayDate = new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));
		const abbr = formatWeekday$1(locale, weekdayDate);
		weekdays.push((0, import_jsx_runtime.jsx)("div", {
			className: clsx(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && `${weekdayClassName}--current`, isWeekend(weekdayDate, calendarType) && `${weekdayClassName}--weekend`),
			children: (0, import_jsx_runtime.jsx)("abbr", {
				"aria-label": abbr,
				title: abbr,
				children: formatShortWeekday$1(locale, weekdayDate).replace(".", "")
			})
		}, weekday));
	}
	return (0, import_jsx_runtime.jsx)(Flex, {
		className: className$2,
		count: 7,
		onFocus: onMouseLeave,
		onMouseOver: onMouseLeave,
		children: weekdays
	});
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView/WeekNumber.js
var className$1 = "react-calendar__tile";
function WeekNumber(props) {
	const { onClickWeekNumber, weekNumber } = props;
	const children = (0, import_jsx_runtime.jsx)("span", { children: weekNumber });
	if (onClickWeekNumber) {
		const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;
		return (0, import_jsx_runtime.jsx)("button", {
			...otherProps,
			className: className$1,
			onClick: (event) => onClickWeekNumber(weekNumber, date, event),
			type: "button",
			children
		});
	} else {
		const { date, onClickWeekNumber, weekNumber, ...otherProps } = props;
		return (0, import_jsx_runtime.jsx)("div", {
			...otherProps,
			className: className$1,
			children
		});
	}
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView/WeekNumbers.js
function WeekNumbers(props) {
	const { activeStartDate, calendarType, onClickWeekNumber, onMouseLeave, showFixedNumberOfWeeks } = props;
	const numberOfWeeks = (() => {
		if (showFixedNumberOfWeeks) return 6;
		const days = getDaysInMonth(activeStartDate) - (7 - getDayOfWeek(activeStartDate, calendarType));
		return 1 + Math.ceil(days / 7);
	})();
	const dates = (() => {
		const year = getYear(activeStartDate);
		const monthIndex = getMonth(activeStartDate);
		const day = getDate(activeStartDate);
		const result = [];
		for (let index = 0; index < numberOfWeeks; index += 1) result.push(getBeginOfWeek(new Date(year, monthIndex, day + index * 7), calendarType));
		return result;
	})();
	return (0, import_jsx_runtime.jsx)(Flex, {
		className: "react-calendar__month-view__weekNumbers",
		count: numberOfWeeks,
		direction: "column",
		onFocus: onMouseLeave,
		onMouseOver: onMouseLeave,
		style: {
			flexBasis: "calc(100% * (1 / 8)",
			flexShrink: 0
		},
		children: dates.map((date) => getWeekNumber(date, calendarType)).map((weekNumber, weekIndex) => {
			const date = dates[weekIndex];
			if (!date) throw new Error("date is not defined");
			return (0, import_jsx_runtime.jsx)(WeekNumber, {
				date,
				onClickWeekNumber,
				weekNumber
			}, weekNumber);
		})
	});
}
//#endregion
//#region node_modules/react-calendar/dist/MonthView.js
function getCalendarTypeFromLocale(locale) {
	if (locale) {
		for (const [calendarType, locales] of Object.entries(CALENDAR_TYPE_LOCALES)) if (locales.includes(locale)) return calendarType;
	}
	return CALENDAR_TYPES.ISO_8601;
}
/**
* Displays a given month.
*/
function MonthView(props) {
	const { activeStartDate, locale, onMouseLeave, showFixedNumberOfWeeks } = props;
	const { calendarType = getCalendarTypeFromLocale(locale), formatShortWeekday, formatWeekday, onClickWeekNumber, showWeekNumbers, ...childProps } = props;
	function renderWeekdays() {
		return (0, import_jsx_runtime.jsx)(Weekdays, {
			calendarType,
			formatShortWeekday,
			formatWeekday,
			locale,
			onMouseLeave
		});
	}
	function renderWeekNumbers() {
		if (!showWeekNumbers) return null;
		return (0, import_jsx_runtime.jsx)(WeekNumbers, {
			activeStartDate,
			calendarType,
			onClickWeekNumber,
			onMouseLeave,
			showFixedNumberOfWeeks
		});
	}
	function renderDays() {
		return (0, import_jsx_runtime.jsx)(Days, {
			calendarType,
			...childProps
		});
	}
	const className = "react-calendar__month-view";
	return (0, import_jsx_runtime.jsx)("div", {
		className: clsx(className, showWeekNumbers ? `${className}--weekNumbers` : ""),
		children: (0, import_jsx_runtime.jsxs)("div", {
			style: {
				display: "flex",
				alignItems: "flex-end"
			},
			children: [renderWeekNumbers(), (0, import_jsx_runtime.jsxs)("div", {
				style: {
					flexGrow: 1,
					width: "100%"
				},
				children: [renderWeekdays(), renderDays()]
			})]
		})
	});
}
//#endregion
//#region node_modules/react-calendar/dist/YearView/Month.js
var className = "react-calendar__year-view__months__month";
function Month({ classes = [], formatMonth: formatMonth$1 = formatMonth, formatMonthYear: formatMonthYear$1 = formatMonthYear, ...otherProps }) {
	const { date, locale } = otherProps;
	return (0, import_jsx_runtime.jsx)(Tile, {
		...otherProps,
		classes: [...classes, className],
		formatAbbr: formatMonthYear$1,
		maxDateTransform: getMonthEnd,
		minDateTransform: getMonthStart,
		view: "year",
		children: formatMonth$1(locale, date)
	});
}
//#endregion
//#region node_modules/react-calendar/dist/YearView/Months.js
function Months(props) {
	const { activeStartDate, hover, value, valueType, ...otherProps } = props;
	const start = 0;
	const end = 11;
	const year = getYear(activeStartDate);
	return (0, import_jsx_runtime.jsx)(TileGroup, {
		className: "react-calendar__year-view__months",
		dateTransform: (monthIndex) => {
			const date = /* @__PURE__ */ new Date();
			date.setFullYear(year, monthIndex, 1);
			return getMonthStart(date);
		},
		dateType: "month",
		end,
		hover,
		renderTile: ({ date, ...otherTileProps }) => (0, import_jsx_runtime.jsx)(Month, {
			...otherProps,
			...otherTileProps,
			activeStartDate,
			date
		}, date.getTime()),
		start,
		value,
		valueType
	});
}
//#endregion
//#region node_modules/react-calendar/dist/YearView.js
/**
* Displays a given year.
*/
function YearView(props) {
	function renderMonths() {
		return (0, import_jsx_runtime.jsx)(Months, { ...props });
	}
	return (0, import_jsx_runtime.jsx)("div", {
		className: "react-calendar__year-view",
		children: renderMonths()
	});
}
//#endregion
//#region node_modules/react-calendar/dist/Calendar.js
var baseClassName = "react-calendar";
var allViews = [
	"century",
	"decade",
	"year",
	"month"
];
var allValueTypes = [
	"decade",
	"year",
	"month",
	"day"
];
var defaultMinDate = /* @__PURE__ */ new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = /* @__PURE__ */ new Date(864e13);
function toDate(value) {
	if (value instanceof Date) return value;
	return new Date(value);
}
/**
* Returns views array with disallowed values cut off.
*/
function getLimitedViews(minDetail, maxDetail) {
	return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
}
/**
* Determines whether a given view is allowed with currently applied settings.
*/
function isViewAllowed(view, minDetail, maxDetail) {
	return getLimitedViews(minDetail, maxDetail).indexOf(view) !== -1;
}
/**
* Gets either provided view if allowed by minDetail and maxDetail, or gets
* the default view if not allowed.
*/
function getView(view, minDetail, maxDetail) {
	if (!view) return maxDetail;
	if (isViewAllowed(view, minDetail, maxDetail)) return view;
	return maxDetail;
}
/**
* Returns value type that can be returned with currently applied settings.
*/
function getValueType(view) {
	return allValueTypes[allViews.indexOf(view)];
}
function getValue(value, index) {
	const rawValue = Array.isArray(value) ? value[index] : value;
	if (!rawValue) return null;
	const valueDate = toDate(rawValue);
	if (Number.isNaN(valueDate.getTime())) throw new Error(`Invalid date: ${value}`);
	return valueDate;
}
function getDetailValue({ value, minDate, maxDate, maxDetail }, index) {
	const valuePiece = getValue(value, index);
	if (!valuePiece) return null;
	const valueType = getValueType(maxDetail);
	return between((() => {
		switch (index) {
			case 0: return getBegin(valueType, valuePiece);
			case 1: return getEnd(valueType, valuePiece);
			default: throw new Error(`Invalid index value: ${index}`);
		}
	})(), minDate, maxDate);
}
var getDetailValueFrom = (args) => getDetailValue(args, 0);
var getDetailValueTo = (args) => getDetailValue(args, 1);
var getDetailValueArray = (args) => [getDetailValueFrom, getDetailValueTo].map((fn) => fn(args));
function getActiveStartDate({ maxDate, maxDetail, minDate, minDetail, value, view }) {
	return getBegin(getView(view, minDetail, maxDetail), getDetailValueFrom({
		value,
		minDate,
		maxDate,
		maxDetail
	}) || /* @__PURE__ */ new Date());
}
function getInitialActiveStartDate({ activeStartDate, defaultActiveStartDate, defaultValue, defaultView, maxDate, maxDetail, minDate, minDetail, value, view }) {
	const rangeType = getView(view, minDetail, maxDetail);
	const valueFrom = activeStartDate || defaultActiveStartDate;
	if (valueFrom) return getBegin(rangeType, valueFrom);
	return getActiveStartDate({
		maxDate,
		maxDetail,
		minDate,
		minDetail,
		value: value || defaultValue,
		view: view || defaultView
	});
}
function getIsSingleValue(value) {
	return value && (!Array.isArray(value) || value.length === 1);
}
function areDatesEqual(date1, date2) {
	return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}
var Calendar = (0, import_react.forwardRef)(function Calendar(props, ref) {
	const { activeStartDate: activeStartDateProps, allowPartialRange, calendarType, className, "data-testid": dataTestId, defaultActiveStartDate, defaultValue, defaultView, formatDay, formatLongDate, formatMonth, formatMonthYear, formatShortWeekday, formatWeekday, formatYear, goToRangeStartOnSelect = true, inputRef, locale, maxDate = defaultMaxDate, maxDetail = "month", minDate = defaultMinDate, minDetail = "century", navigationAriaLabel, navigationAriaLive, navigationLabel, next2AriaLabel, next2Label, nextAriaLabel, nextLabel, onActiveStartDateChange, onChange: onChangeProps, onClickDay, onClickDecade, onClickMonth, onClickWeekNumber, onClickYear, onDrillDown, onDrillUp, onViewChange, prev2AriaLabel, prev2Label, prevAriaLabel, prevLabel, returnValue = "start", selectRange, showDoubleView, showFixedNumberOfWeeks, showNavigation = true, showNeighboringCentury, showNeighboringDecade, showNeighboringMonth = true, showWeekNumbers, tileClassName, tileContent, tileDisabled, value: valueProps, view: viewProps } = props;
	const [activeStartDateState, setActiveStartDateState] = (0, import_react.useState)(defaultActiveStartDate);
	const [hoverState, setHoverState] = (0, import_react.useState)(null);
	const [valueState, setValueState] = (0, import_react.useState)(Array.isArray(defaultValue) ? defaultValue.map((el) => el !== null ? toDate(el) : null) : defaultValue !== null && defaultValue !== void 0 ? toDate(defaultValue) : null);
	const [viewState, setViewState] = (0, import_react.useState)(defaultView);
	const activeStartDate = activeStartDateProps || activeStartDateState || getInitialActiveStartDate({
		activeStartDate: activeStartDateProps,
		defaultActiveStartDate,
		defaultValue,
		defaultView,
		maxDate,
		maxDetail,
		minDate,
		minDetail,
		value: valueProps,
		view: viewProps
	});
	const value = (() => {
		const rawValue = (() => {
			if (selectRange && getIsSingleValue(valueState)) return valueState;
			return valueProps !== void 0 ? valueProps : valueState;
		})();
		if (!rawValue) return null;
		return Array.isArray(rawValue) ? rawValue.map((el) => el !== null ? toDate(el) : null) : rawValue !== null ? toDate(rawValue) : null;
	})();
	const valueType = getValueType(maxDetail);
	const view = getView(viewProps || viewState, minDetail, maxDetail);
	const views = getLimitedViews(minDetail, maxDetail);
	const hover = selectRange ? hoverState : null;
	const drillDownAvailable = views.indexOf(view) < views.length - 1;
	const drillUpAvailable = views.indexOf(view) > 0;
	const getProcessedValue = (0, import_react.useCallback)((value) => {
		return (() => {
			switch (returnValue) {
				case "start": return getDetailValueFrom;
				case "end": return getDetailValueTo;
				case "range": return getDetailValueArray;
				default: throw new Error("Invalid returnValue.");
			}
		})()({
			maxDate,
			maxDetail,
			minDate,
			value
		});
	}, [
		maxDate,
		maxDetail,
		minDate,
		returnValue
	]);
	const setActiveStartDate = (0, import_react.useCallback)((nextActiveStartDate, action) => {
		setActiveStartDateState(nextActiveStartDate);
		const args = {
			action,
			activeStartDate: nextActiveStartDate,
			value,
			view
		};
		if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) onActiveStartDateChange(args);
	}, [
		activeStartDate,
		onActiveStartDateChange,
		value,
		view
	]);
	const onClickTile = (0, import_react.useCallback)((value, event) => {
		const callback = (() => {
			switch (view) {
				case "century": return onClickDecade;
				case "decade": return onClickYear;
				case "year": return onClickMonth;
				case "month": return onClickDay;
				default: throw new Error(`Invalid view: ${view}.`);
			}
		})();
		if (callback) callback(value, event);
	}, [
		onClickDay,
		onClickDecade,
		onClickMonth,
		onClickYear,
		view
	]);
	const drillDown = (0, import_react.useCallback)((nextActiveStartDate, event) => {
		if (!drillDownAvailable) return;
		onClickTile(nextActiveStartDate, event);
		const nextView = views[views.indexOf(view) + 1];
		if (!nextView) throw new Error("Attempted to drill down from the lowest view.");
		setActiveStartDateState(nextActiveStartDate);
		setViewState(nextView);
		const args = {
			action: "drillDown",
			activeStartDate: nextActiveStartDate,
			value,
			view: nextView
		};
		if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) onActiveStartDateChange(args);
		if (onViewChange && view !== nextView) onViewChange(args);
		if (onDrillDown) onDrillDown(args);
	}, [
		activeStartDate,
		drillDownAvailable,
		onActiveStartDateChange,
		onClickTile,
		onDrillDown,
		onViewChange,
		value,
		view,
		views
	]);
	const drillUp = (0, import_react.useCallback)(() => {
		if (!drillUpAvailable) return;
		const nextView = views[views.indexOf(view) - 1];
		if (!nextView) throw new Error("Attempted to drill up from the highest view.");
		const nextActiveStartDate = getBegin(nextView, activeStartDate);
		setActiveStartDateState(nextActiveStartDate);
		setViewState(nextView);
		const args = {
			action: "drillUp",
			activeStartDate: nextActiveStartDate,
			value,
			view: nextView
		};
		if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) onActiveStartDateChange(args);
		if (onViewChange && view !== nextView) onViewChange(args);
		if (onDrillUp) onDrillUp(args);
	}, [
		activeStartDate,
		drillUpAvailable,
		onActiveStartDateChange,
		onDrillUp,
		onViewChange,
		value,
		view,
		views
	]);
	const onChange = (0, import_react.useCallback)((rawNextValue, event) => {
		const previousValue = value;
		onClickTile(rawNextValue, event);
		const isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);
		let nextValue;
		if (selectRange) if (isFirstValueInRange) nextValue = getBegin(valueType, rawNextValue);
		else {
			if (!previousValue) throw new Error("previousValue is required");
			if (Array.isArray(previousValue)) throw new Error("previousValue must not be an array");
			nextValue = getValueRange(valueType, previousValue, rawNextValue);
		}
		else nextValue = getProcessedValue(rawNextValue);
		const nextActiveStartDate = !selectRange || isFirstValueInRange || goToRangeStartOnSelect ? getActiveStartDate({
			maxDate,
			maxDetail,
			minDate,
			minDetail,
			value: nextValue,
			view
		}) : null;
		event.persist();
		setActiveStartDateState(nextActiveStartDate);
		setValueState(nextValue);
		const args = {
			action: "onChange",
			activeStartDate: nextActiveStartDate,
			value: nextValue,
			view
		};
		if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) onActiveStartDateChange(args);
		if (onChangeProps) if (selectRange) {
			if (!getIsSingleValue(nextValue)) onChangeProps(nextValue || null, event);
			else if (allowPartialRange) {
				if (Array.isArray(nextValue)) throw new Error("value must not be an array");
				onChangeProps([nextValue || null, null], event);
			}
		} else onChangeProps(nextValue || null, event);
	}, [
		activeStartDate,
		allowPartialRange,
		getProcessedValue,
		goToRangeStartOnSelect,
		maxDate,
		maxDetail,
		minDate,
		minDetail,
		onActiveStartDateChange,
		onChangeProps,
		onClickTile,
		selectRange,
		value,
		valueType,
		view
	]);
	function onMouseOver(nextHover) {
		setHoverState(nextHover);
	}
	function onMouseLeave() {
		setHoverState(null);
	}
	(0, import_react.useImperativeHandle)(ref, () => ({
		activeStartDate,
		drillDown,
		drillUp,
		onChange,
		setActiveStartDate,
		value,
		view
	}), [
		activeStartDate,
		drillDown,
		drillUp,
		onChange,
		setActiveStartDate,
		value,
		view
	]);
	function renderContent(next) {
		const commonProps = {
			activeStartDate: next ? getBeginNext(view, activeStartDate) : getBegin(view, activeStartDate),
			hover,
			locale,
			maxDate,
			minDate,
			onClick: drillDownAvailable ? drillDown : onChange,
			onMouseOver: selectRange ? onMouseOver : void 0,
			tileClassName,
			tileContent,
			tileDisabled,
			value,
			valueType
		};
		switch (view) {
			case "century": return (0, import_jsx_runtime.jsx)(CenturyView, {
				formatYear,
				showNeighboringCentury,
				...commonProps
			});
			case "decade": return (0, import_jsx_runtime.jsx)(DecadeView, {
				formatYear,
				showNeighboringDecade,
				...commonProps
			});
			case "year": return (0, import_jsx_runtime.jsx)(YearView, {
				formatMonth,
				formatMonthYear,
				...commonProps
			});
			case "month": return (0, import_jsx_runtime.jsx)(MonthView, {
				calendarType,
				formatDay,
				formatLongDate,
				formatShortWeekday,
				formatWeekday,
				onClickWeekNumber,
				onMouseLeave: selectRange ? onMouseLeave : void 0,
				showFixedNumberOfWeeks: typeof showFixedNumberOfWeeks !== "undefined" ? showFixedNumberOfWeeks : showDoubleView,
				showNeighboringMonth,
				showWeekNumbers,
				...commonProps
			});
			default: throw new Error(`Invalid view: ${view}.`);
		}
	}
	function renderNavigation() {
		if (!showNavigation) return null;
		return (0, import_jsx_runtime.jsx)(Navigation, {
			activeStartDate,
			drillUp,
			formatMonthYear,
			formatYear,
			locale,
			maxDate,
			minDate,
			navigationAriaLabel,
			navigationAriaLive,
			navigationLabel,
			next2AriaLabel,
			next2Label,
			nextAriaLabel,
			nextLabel,
			prev2AriaLabel,
			prev2Label,
			prevAriaLabel,
			prevLabel,
			setActiveStartDate,
			showDoubleView,
			view,
			views
		});
	}
	return (0, import_jsx_runtime.jsxs)("div", {
		className: clsx(baseClassName, selectRange && (Array.isArray(value) ? value : [value]).length === 1 && `${baseClassName}--selectRange`, showDoubleView && `${baseClassName}--doubleView`, className),
		"data-testid": dataTestId,
		ref: inputRef,
		children: [renderNavigation(), (0, import_jsx_runtime.jsxs)("div", {
			className: `${baseClassName}__viewContainer`,
			onBlur: selectRange ? onMouseLeave : void 0,
			onMouseLeave: selectRange ? onMouseLeave : void 0,
			children: [renderContent(), showDoubleView ? renderContent(true) : null]
		})]
	});
});
//#endregion
//#region node_modules/react-calendar/dist/index.js
var dist_default = Calendar;
//#endregion
export { Calendar, CenturyView, DecadeView, MonthView, Navigation, YearView, dist_default as default };

//# sourceMappingURL=react-calendar.js.map