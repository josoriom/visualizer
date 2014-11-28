'use strict';

define(['src/util/api', 'src/util/util'], function (API, Util) {

    return {

        setModule: function (module) {
            this.module = module;
        },

        init: function () {
            this.initImpl();
        },

        initImpl: function () {
            this.resolveReady();
        },

        inDom: Util.noop,

        sendAction: function (rel, value, event) {

            var actionsOut = this.module.actions_out(),
                i,
                jpath,
                actionname;

            if (!actionsOut) {
                return;
            }

            i = actionsOut.length - 1;

            for (; i >= 0; i--) {

                if (actionsOut[i].rel === rel && ((event && event === actionsOut[i].event) || !event)) {

                    actionname = actionsOut[i].name;
                    jpath = actionsOut[i].jpath;

                    if (value && jpath && value.getChild) {
                        (function (actionname) {
                            value.getChild(jpath).then(function (returned) {

                                API.executeAction(actionname, returned);
                                API.doAction(actionname, returned);

                            });
                        })(actionname);
                    } else {
                        API.executeAction(actionname, value);
                        API.doAction(actionname, value);
                    }
                }
            }
        },

        setVarFromEvent: function (event, rel, relSource, jpath, callback) {

            var varsOut, i = 0, first = true;

            if (!( varsOut = this.module.vars_out() )) {
                return;
            }

            for (; i < varsOut.length; i++) {

                if (varsOut[i].event == event && ( varsOut[i].rel == rel || !rel )) {

                    if (first && callback) {
                        first = false;
                        callback.call(this);
                    }

                    varsOut[i].jpath = varsOut[i].jpath || []; // Need not be undefined

                    if (typeof varsOut[i].jpath == "string") {
                        varsOut[i].jpath = varsOut[i].jpath.split('.');
                        varsOut[i].jpath.shift();
                    }

                    API.setVar(varsOut[i].name, this.module.getVariableFromRel(relSource), jpath.concat(varsOut[i].jpath), varsOut[i].filter);
                }
            }
        },

        createDataFromEvent: function (event, rel, data, callback) {

            var varsOut, i = 0, first = true;

            if (!( varsOut = this.module.vars_out() )) {
                return;
            }

            for (; i < varsOut.length; i++) {

                if (varsOut[i].event == event && ( varsOut[i].rel == rel || !rel )) {

                    if (first && callback) {
                        first = false;
                        data = callback.call(this);
                    }

                    API.createDataJpath(varsOut[i].name, data, varsOut[i].jpath, varsOut[i].filter);
                }
            }
        },

        allVariablesFor: function (event, rel, callback) {

            var varsOut, i = 0;

            if (!( varsOut = this.module.vars_out() )) {
                return;
            }

            for (; i < varsOut.length; i++) {

                if (varsOut[i].event == event && ( varsOut[i].rel == rel || !rel )) {

                    callback(varsOut[i]);
                }
            }
        },

        'export': Util.noop,

        print: function () {
            return this.module.getDomContent()[0].innerHTML;
        },

        configurationStructure: Util.noop,

        configFunctions: {},

        configAliases: {},

        events: {},

        variablesIn: [],

        actionsIn: {
            _editPreferences: 'Edit preferences'
        },

        resolveReady: function () {
            this.module._resolveController();
        },

        onBeforeRemove: function () {
            return true;
        },

        onRemove: Util.noop

    };

});