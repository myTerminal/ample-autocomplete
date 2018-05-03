# ample-autocomplete

[![npm version](https://badge.fury.io/js/ample-autocomplete.svg)](https://badge.fury.io/js/ample-autocomplete)
[![npm downloads](https://img.shields.io/npm/dt/ample-autocomplete.svg)](https://www.npmjs.com/package/ample-autocomplete)  
[![Build Status](https://travis-ci.org/myTerminal/ample-autocomplete.svg?branch=master)](https://travis-ci.org/myTerminal/ample-autocomplete)
[![Code Climate](https://codeclimate.com/github/myTerminal/ample-autocomplete.png)](https://codeclimate.com/github/myTerminal/ample-autocomplete)
[![Coverage Status](https://img.shields.io/coveralls/myTerminal/ample-autocomplete.svg)](https://coveralls.io/r/myTerminal/ample-autocomplete?branch=master)  
[![Dependency Status](https://david-dm.org/myTerminal/ample-autocomplete.svg)](https://david-dm.org/myTerminal/ample-autocomplete)
[![devDependency Status](https://david-dm.org/myTerminal/ample-autocomplete/dev-status.svg)](https://david-dm.org/myTerminal/ample-autocomplete#info=devDependencies)
[![peer Dependency Status](https://david-dm.org/myTerminal/ample-autocomplete/peer-status.svg)](https://david-dm.org/myTerminal/ample-autocomplete#info=peerDependencies)  
[![License](https://img.shields.io/badge/LICENSE-GPL%20v3.0-blue.svg)](https://www.gnu.org/licenses/gpl.html)  
[![NPM](https://nodei.co/npm/ample-autocomplete.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ample-autocomplete/)

A simple autocomplete dropdown for React

## Features

* A simple & ready-to-use autocomplete component for React.js
* Fast, light-weight and uses minimal DOM elements
* Smart dropdown with mouse and keyboard actions
* Supports case-insensitive search
* Can be easily themed for any host web application

## How to Use

### Directly from a web page

One can use *ample-autocomplete* directly from a web-page by attaching the *ample-autocomplete.js* and *ample-autocomplete.css* to the DOM.

    <!-- Attaching the ample-autocomplete stylesheet -->
    <link type="text/javascript" rel="stylesheet" href="path/to/library/ample-autocomplete.css" />
    
    <!-- Attaching the ample-autocomplete script -->
    <script type="text/javascript" src="path/to/library/ample-autocomplete.js"></script>
    
    <!-- Usage -->
    <script type="text/javascript">
        var AmpleAutocomplete = ampleAutocomplete.default,
            options = [1, 2, 3];

        ReactDOM.render(<AmpleAutocomplete options={options} />, document.getElementById('page'));
    </script>

### With Browserify or Webpack

One can use *ample-autocomplete* with [Browserify](http://browserify.org) or [Webpack](https://webpack.js.org).

Install *ample-autocomplete* from Npm

    npm install ample-autocomplete --save-dev

#### With Browserify

    var AmpleAutocomplete = require('ample-autocomplete');

The above will let you use the scripts but you will have to attach the stylesheet separately.

#### With Webpack

    import AmpleAutocomplete from 'ample-autocomplete';
    import from '../styles/ample-autocomplete.css';

You may have to use [Babel](https://babeljs.io) for ES6 transpilation.

### On the server

*ample-autocomplete* can also be used at the server as a regular CommonJS module.

Install *ample-autocomplete* from Npm

    npm install ample-autocomplete --save-dev

Then `require` it as a regular CommonJS module

    var ampleAutocomplete = require('ample-autocomplete');

How you consume it depends upon your implementation.

### Options

Options can be passed as attributes(props) to the React component on use.

* `placeholder` - to provide a custom placeholder to the input box
* `onSelect` - to provide a handler to be run everytime a value is selected from the dropdown
* `selectOnEnter` - set to `true` if you want the user to be able to select an option using the Enter key
* `caseInsensitive` - set to `true` for a case-insensitive search

## Demo

You can view a demo [here](https://myterminal.github.io/ample-autocomplete/examples).

## Dependency

* [react](https://www.npmjs.com/package/react)

## To-do

* Unit tests
