 /*
 * view.js
 * version: dev
 *
 * Copyright 2012 Norman Pellet - norman.pellet@epfl.ch
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */


if(typeof CI.Module.prototype._types.spectra_displayer == 'undefined')
	CI.Module.prototype._types.spectra_displayer = {};

CI.Module.prototype._types.spectra_displayer.View = function(module) {
	this.module = module;
}

CI.Module.prototype._types.spectra_displayer.View.prototype = {
	
	init: function() {
		this.series = [];
		this.colorvars = [];
		this.dom = $('<div />');
		this.zones = {};
		this._currentHighlights = {};
		this.module.getDomContent().html(this.dom);
	},
	
	inDom: function() {
	
		var self = this;
		var graph = new Graph(this.dom.get(0), {
			closeRight: false, 
			closeTop: false, 
			zoomMode: 'x',

			onMouseMoveData: function(e, val) {

				for(var k in self.zones) {

					if(!val[k])
						continue;

					for(var i in self.zones[k]) {

						min = Math.min(self.zones[k][i][0], self.zones[k][i][1]);
						max = Math.max(self.zones[k][i][0], self.zones[k][i][1]);
						console.log(min, max, val);

						if(min < x1 && max > x1) {
							
							CI.RepoHighlight.set(i, 1);
							self._currentHighlights[i] = 1;

						} else if(this._currentHighlights[i]) {

							CI.RepoHighlight.set(i, 0);
							self._currentHighlights[i] = 0;
						}
					}
				}

			}});

		graph.getLeftAxis(0).setDisplay(false);
		graph.getXAxis().setLabel('ppm');
		graph.redraw();

		var series = [];
		this.graph = graph;
		
	},
	
	onResize: function(width, height) {
		this.width = width;
		this.height = height;
		if(this.graph)
			this.graph.resize(width, height);
		this.graph.redraw();
		this.graph.drawSeries();
	},
	
	onProgress: function() {
		this.dom.html("Progress. Please wait...");
	},

	blank: function() {

		this.dom.get(0).width = this.dom.get(0).width;
	},

	doZone: function(varname, zone) {


	},

	update2: { 

		'fromTo': function(moduleValue) {
			var view = this;

			if(!moduleValue || !moduleValue.value)
				return;

			if(view.dom.data('spectra'))
				view.dom.data('spectra').setBoundaries(moduleValue.value.from, moduleValue.value.to);
			return;
		},

		'jcamp': function(moduleValue, varname) {

			CI.RepoHighlight.kill(this.module.id + varname);

			if(!this.graph)
				return;
			this.zones[varname] = moduleValue._zones;
			var cfgM = this.module.getConfiguration();			
			var color;

			if(!moduleValue)
				return this.blank();

			if(cfgM.plotinfos)
				for(var i = 0, l = cfgM.plotinfos.length; i < l; i++) {
					if(varname == cfgM.plotinfos[i].variable) {
						color = cfgM.plotinfos[i].plotcolor;
						continuous = cfgM.plotinfos[i].plotcontinuous;
					}	
				}
/*
			var highlightZones = [];
			if(moduleValue._highlights) {
				for(var i in moduleValue._highlights) {
					if(moduleValue._highlights[i] == 1) {
							for(var j in zones) {
								if(zones[j][i])
									highlightZones.push({zone: zones[j][i], color: all[j].plots_color });
						}
					}
				}
			}
*/

			CI.RepoHighlight.listen(moduleValue._highlights, function(value, commonKeys) {
				for(var i = 0; i < commonKeys.length; i++) 
					if(self.zones[varname][commonKeys[i]])
						self.doZone(varname, self.zones[varname][commonKeys[i]]);
			}, true, this.module.id + varname);

			/*
			var index;				
			this._jcampValue = moduleValue;
			var view = this;
			var cfgM = this.module.getConfiguration();

			var color = '#000000', continuous = false;

			
			

			var cfg = {
				continuous:  continuous,
				flipX: cfgM.flipX, 
				flipY: cfgM.flipY, 
				plotcolor: color,
				dom: this.dom,
				spectraid: varname
			};
			// Display the jcamp to the screen using the value and the module ref

			CI.DataType.toScreen(moduleValue, this.module, cfg).done(function(val) {
				
				if(view.dom.data('spectra'))
					view.dom.data('spectra').onZoomChange = function(minX, maxX) {
						view.module.controller.zoomChanged(minX, maxX);
					};

				view.module.updateView('fromTo');
				//view.update2.fromTo(CI.Repo.getValue(''));
				//CI.Util.ResolveDOMDeferred(view.module.getDomContent());
				CI.Grid.moduleResize(view.module);			
			});*/

			this.series[varname] = this.series[varname] || [];

 			if(cfgM.flipX)
 				this.graph.getXAxis().flip(true);

 			if(cfgM.flipY)
 				this.graph.getLeftAxis().flip(true);

 			//if(typeof moduleValue.value !== 'object') {
 				var spectra = CI.converter.jcampToSpectra(moduleValue.value, {lowRes: 1024});
 			//	moduleValue.value = spectra;
 			//} else 
 			//	spectra = moduleValue.value;
			
			for(var i = 0, l = this.series[varname].length; i < l; i++)
				this.series[varname][i].kill();
			
			this.series[varname] = [];

			for (var i=0; i<spectra.length; i++) {
				
				serie = this.graph.newSerie(varname, {trackMouse: true});
				serie.setData(spectra[i].data[1]);
				serie.autoAxis();

				if(color)
					serie.setLineColor(color);

				this.series[varname].push(serie);
				break;
			}
			//this.graph.drawSeries();

			this.onResize(this.width || this.module.getWidthPx(), this.height || this.module.getHeightPx());

		}
	},



	onActionReceive: {
		fromto: function(value, name) {
			if(this.dom.data('spectra'))
				this.dom.data('spectra').setBoundaries(value.value.from, value.value.to);
		}
	},

	
	getDom: function() {
		return this.dom;
	},
	
	typeToScreen: {
		
	}
}
 
