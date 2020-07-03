'use strict';

define(['modules/default/defaultmodel', 'src/util/datatraversing'], function (Default, Traversing) {
  function Model() {
  }
  
  $.extend(true, Model.prototype, Default, {
    getValue: function () {
      return this.dataValue;
    },
    getjPath: function () {
      const wellsList = this.module.getDataFromRel('wellsList');
      let jpaths = [];
      if (!wellsList || wellsList == null) {
        return jpaths;
      }
      Traversing.getJPathsFromElement(wellsList, jpaths);
      if (jpaths.length !== 0) jpaths = jpaths[0].children[0].children;
      return jpaths;
    }
  });
  return Model;
});
