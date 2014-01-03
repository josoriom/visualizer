Visualizer
==========

The visualizer is a tool developped by the cheminformatics department of the Swiss Federal Institute of Technology. We promote the development of open source projects that we use internally for our daily research.

The visualizer aims at the rendering of complex datasets. It is suited to display and interact in a multiple of ways thanks to modules that can be placed on your browser page. The modules display some type of information in some way, and they can interact with each other through a central API. The visualization is started by passing only three URLs in the browser address bar.

The visualizer works by modules which have the task to render one specific kind of information (table, chart, values, ...) to the screen, while being able to send out event and actions to other modules through the user interaction.
Modules may be added, moved, duplicated, resized and removed. Each module can be configured with built-in options to allow customization of your visualizer page.


Visualize your data
==========

To get started, you need three json files located anywhere accessible by XHR requests.

* view.json
* data.json
* config.json

The view file will contain information about the visualization, which modules should be present and how, which mouse interactions should be defined, etc.
The data fill contains the data to visualize in a JSON format. The user is responsible to generate that file according to a few guidelines.

The strength of this approach is that a view can be used to visualize multiple datasets by only changing the data file.

The config file is typically common to your projects. It will define which modules should be available (built-in or not), which buttons should be displayed in the header, which variable filters and action files should be available to the visualizer.


view.json
---------

The view.json file contains essentially the configuration of your visualization instance and is *independant on the dataset you want to visualize*. In the view file will be defined which modules should be displayed and which initial variables from the dataset should be readily available to the modules.

The view.json file can be empty as the visualizer can be manually configured. The visualizer will himself generate the view.json file that you may copy or store automatically through CouchDB.


```Javascript
{
	"modules": [ /* List of modules */ ],
	"configuration": {
		"title": "Visualizer title"
	},
	"variables": [ // List of entry variables
		{
			"varname": "Variable name",
			"jpath": "Variable access path" // ex: element.abc.0.def
		}
		// ...
	],
	"_version": "2.2" // Latest visualizer version
}
```




Defining a module in the view
-----------------------------

Here's an example of how you may create a module litterally. One should however keep in mind that the visualizer takes care of generating the appropriate JSON for you through the UI.

```JSON
{
		"url": "./modules/types/canvas_matrix/",
		"title": "Distance matrix",
		"position": {
			"left": 0,
			"right": 1,
			"top": 0
		},
		"size": { // In grid unit
			"width": 66,
			"height": 56
		},
		"configuration": {
			
		},
		"bgColor": [
			255,
			255,
			255,
			0
		],
		"displayWrapper": true,
		"id": 1,
		"vars_in": [
			{
				"rel": "matrix",
				"name": "distanceMatrix"
			}
		],
		"actions_in": [
			{}
		],
		"vars_out": [
			{
				"event": "onPixelHover",
				"rel": "row",
				"jpath": "element.jcamp",
				"name": "row"
			}
		],
		"actions_out": [
			{}
		]
	}
```
	
A module is defined by the following parameters

* *url* : The URL of the module. It should be a folder which contains view.js, model.js and controller.js (more on that later). This may be a relative URL pointing to a built-in module or you may use your own module
* *title* : The displayed title of your module
* *position* : Position in grid units. Top represents the z-index of the module
* *size* : Size of the module in grid units.
* *configuration* : The is an automatically created json file that contains the specific configuration of the module. Usually it is generated by the visualizer only.
* *bgColor* : the RGBA colors of the background of the module
* *displayWrapper* : If the borders of the module should be displayed
* *id* : A unique ID of the module (within the view.json file). If absent, it will be automatically generated
* *vars_in* : An array of variables that the visualizer accepts, paired with what the variable represents in the scope of the module (more on this on variable inputs)
* *vars_out* : An array of variables that the module can send. Paired with an event name, a reference (to access the data itself), a jpath (access to a subelement of the data) and a variable name.
* *actions_out* : An array of actions that the module sends on specific events (more on that later)

data.json
---------

Data.json should contain the data you want to visualize.

You may chose your own file structure, however to display certain kind of specific information, your object need to have a type. You will then be responsible that the type matches the data structure.



Data structure and typing
---------

Example

```JSON
{
  "type": "chemicalMF",
  "value": "C6H12O6"
}

```

is a simple definition of a chemical formula. The formula could also be specified as a string however you would not have access to specific features of the chemicalMF type, such as appropriate rendering of text (subscript, superscript) or tools to play with the formula.

Another, more complex example could be the definition of a distance matrix :

```JSON
{
	"type" : "matrix",
	"yLabel" : [
		{
			"Subclass":"Nylon6",
			"code":"84A0210"
		},
		{
			"Subclass":"Nylon6",
			"code":"87A0422",
		}
	],

	"xLabel" : [
		{
			"Subclass":"Nylon6",
			"code":"84A0210"
		},
		{
			"Subclass":"Nylon6",
			"code":"87A0422",
		}
	],

	"data": [
		[ 1, 0.97807 ],
		[ 0.97807, 1 ]
	]
}
```

which will be suitable to be displayed by the matrix module.


Variables and Actions
----------------------

The visualizer allows the modules to comminucate via a central repository of variables and actions. When an event is triggered on a module ( mouse click, mouse hover, resize, ... ), a variable or an action is sent towards the repository.

The fundamental difference between variables and actions is that actions are never stored in the memory of the framework, they are merely dispatched to the target modules. You can view the actions as a sort of a messaging system between modules. The variable corresponds rather to a status. The variable called "myVar" contains at all times "myValue" unless it is overridden by a module, in which case the variable is changed. It's a temporary information storage that all modules can access if they want to listen for it.

When the action is passed to the ActionHandler, then three things can happen :

* A web worker is created and launched. You may program your own worker and leave it somewhere accessible on the same domain. In the worker, you may ask for variables, set variables or event trigger actions.

* An AMD module is instanciated. The module should return a function that will be executed directly with the action name and action value as parameters. The module may require the API or the UTIL package to execute complex actions.

* The action is triggered on a target module. For instance, you may have a button which, when clicked, triggers the action named "deleteLastRow". If, for instance, a table is listening for the name "deleteLastRow", you may execute an action of the target module (i.e. remove the last row)

When a variable is set, before it reaches the VariableHandler, a filter can be optionnally used to modify this variable. Say you have a form with a field "number". You may define a function that will take this number and multiply it by 10 for example. The function must, just like the action, be an AMD module. Although you may technically require and execute anything through variables filters, they are actually solely intended as variable modifiers. The new variable must be returned in the function. For example :

```Javascript

define([], function() {

	return function( variableInput ) {
		return variableInput * 10; // Returns x * 10
	}

});

```

The variable is then registered in the VariableHandler and any module that are listening for this variable name will have their function update called.

