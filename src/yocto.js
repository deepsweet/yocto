;(function(win, doc) {

    'use strict';

    var regCreateElement = /^<(.+?)\/?>$/;

    /**
     * Create a new Yocto.
     *
     * @constructor
     * @param {*} selector
     */
    function Yocto(selector) {

        // init
        if(!(this instanceof Yocto)) {
            return new Yocto(selector);
        }

        // no selector – no results
        if(!selector) {
            return;
        }

        // single element
        if(selector.nodeType === 1) {
            this[0] = selector;
            this.length = 1;
            return;
        }

        // string
        if(typeof selector === 'string') {
            var match;

            // create element
            if(match = selector.match(regCreateElement)) {
                return Yocto(doc.createElement(match[1]));
            }

            // query
            selector = doc.querySelectorAll(selector);
        }

        // elements list
        if(isList(selector)) {
            this.push.apply(this, normalizeList(selector));
        }

    }

    Yocto.prototype = [];
    Yocto.prototype.constructor = Yocto;

    // extend Yocto.prototype with HTMLDivElement prototype
    for(var k in doc.createElement('div')) {
        (function(k) {
            Yocto.prototype[k] = function(arg) {
                var collected = [],
                    i = 0,
                    elem,
                    prop,
                    result;

                for(; i < this.length; i++) {
                    elem = this[i];
                    prop = elem[k];
                    // if prop is function and there are args – apply it
                    result = prop.call ? prop.apply(elem, arguments) : prop;

                    // if prop is function or
                    // prop is not function and there is an argument
                    if(
                       (result && result !== prop) ||
                       (!prop.call && arg === undefined)
                    ) {
                        // is Element
                        // parentNode()
                        if(result && result.nodeType) {
                            collected.push(result);
                        // is List
                        // childNodes()
                        } else if(isList(result)) {
                            collected = collected.concat(normalizeList(result));
                        // just return the first result
                        // getAttribute()
                        } else if(result !== undefined) {
                            return result;
                        }
                    }

                    // not function and there is an argument
                    if(!prop.call && arg) {
                        // style({background: 'red'})
                        if(typeof arg === 'object') {
                            for(var l in arg) {
                                prop[l] = arg[l];
                            }
                        // innerHTML = '<br/>'
                        } else {
                            elem[k] = arg;
                        }
                    }
                }

                return collected.length ? Yocto(collected) : this;
            };
        })(k);
    }

    /**
     * Check if target is array-like object.
     *
     * @param {Object} target target object
     * @return {Boolean}
     */
    function isList(target) {
        return target instanceof Object && 'length' in target;
    }

    /**
     * Normalize array-like objects,
     * leave only elements and remove duplicates.
     *
     * @param {Object} list input list
     * @return {Array} output array
     */
    function normalizeList(list) {
        var out = [],
            i = 0,
            item;

        for(i = 0; i < list.length; i++) {
            item = list[i];

            if(item.nodeType === 1 && !~out.indexOf(item)) {
                out.push(item);
            }
        }

        return out;
    }

    win.Yocto = win.$$$ = Yocto;

})(window, window.document);
