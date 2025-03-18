# maptalks.gridlayer

[![CircleCI](https://circleci.com/gh/maptalks/maptalks.gridlayer.svg?style=shield)](https://circleci.com/gh/maptalks/maptalks.gridlayer)
[![NPM Version](https://img.shields.io/npm/v/maptalks.gridlayer.svg)](https://github.com/maptalks/maptalks.gridlayer)

GridLayer plugin for maptalks.js. A layer draws grids.

![screenshot](https://user-images.githubusercontent.com/13678919/33376245-ec78e626-d547-11e7-8280-ef4693d416fd.png)

## Examples

* [Random square grids](https://maptalks.github.io/maptalks.gridlayer/demo/random.html).
* [Customer analysis grid](https://maptalks.github.io/maptalks.gridlayer/demo/grid.html).
* [1KM grid of rainfall forecast of 2017-06-07](https://maptalks.github.io/maptalks.gridlayer/demo/micapse.html).

## Install
  
* Install with npm: ```npm install maptalks.gridlayer```. 
* Download from [dist directory](https://github.com/maptalks/maptalks.gridlayer/tree/gh-pages/dist).
* Use unpkg CDN: ```https://cdn.jsdelivr.net/npm/maptalks.gridlayer/dist/maptalks.gridlayer.min.js```

## Usage

As a plugin, `maptalks.gridlayer` must be loaded after `maptalks.js` in browsers.
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/maptalks/dist/maptalks.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/maptalks.gridlayer/dist/maptalks.gridlayer.min.js"></script>
<script>
var grids = [
    {
        center : [0, 0],     // center of the grid
        width  : 100,        // width of the grid cell
        height : 100,        // height of the grid cell
        // unit of cell width/height, possible values: 
        //   * projection : projected coordinate
        //   * meter : meters of geographic distance
        //   * degree : longtitude/latitude degrees
        altitude : 0,        // altitude of grid in meter
        unit : 'projection',
        cols      : [-1, Infinity],
        rows      : [-2, 5],
        data   : [
            //Each item is an array, arr[0] is cell idx on X axis, arr[1] is cell idx on Y axis, arr[2] is the data object, properties is data, symbol is cell style
            [1, 2, { properties : { foo : 1, foo2 : 'foo' }, symbol : { ... } }],
            //if arr[0] is an array, it means a range of cell on X axis, from cell[0][0] to cell [0][1]
            [[2, 4] , 5, { symbo : {...} }] //[]
        ]
    }
];
var options = {
    symbol : {
        lineWidth : 2
    }  
};
var gridLayer = new maptalks.GridLayer('grid', grids, options);
gridLayer.addTo(map);
</script>
```
## Supported Browsers

Chrome, Firefox, other modern and mobile browsers.

## API Reference

```GridLayer``` is a subclass of [maptalks.Layer](https://maptalks.github.io/docs/api/Layer.html) and inherits all the methods of its parent.

### `Constructor`

```javascript
new maptalks.GridLayer(id, data, options)
```

* id **String** layer id
* data **Object[] | Object** see data format below
* options **Object** options
    * renderer **String** renderer, canvas or gl, gl by default
    * symbol **Object** symbol of the grid, supported properties: `lineWidth` (fixed to 1 in gl renderer on windows [due to ANGLE](https://bugs.chromium.org/p/angleproject/issues/detail?id=334)), `lineColor`, `polygonFill`, `polygonOpacity`
    * Other options defined in [maptalks.Layer](https://maptalks.github.io/docs/api/Layer.html)

```javascript
[
    {
        center : [0, 0],     // center of the grid
        width  : 100,        // width of the grid cell
        height : 100,        // height of the grid cell
        // unit of cell width/height, possible values: 
        //   * projection : projected coordinate
        //   * meter : meters of geographic distance
        //   * degree : longtitude/latitude degrees
        altitude : 0,        // altitude of grid in meter
        unit   : 'projection',   
        cols      : [1, Infinity],
        rows      : [2, 5],
        // data format
        data : [
            //[col, row, { properties : properties, symbol : symbol}]
            //supported symbol properties : polygonFill, polygonOpacity
            //col: col_index or [beginIndex, endIndex]
            //row: col_index or [beginIndex, endIndex]
            // col is 1, row is 2
            [1, 2, { properties : { foo : 1, foo2 : 'foo' }, symbol : { polygonFill : '#f00' } }],
            //col is from 2 to 4 (3 columns), row is 5
            [[2, 4] , 5, { symbol : { polygonFill : '#f00' } }],
            //col is from 2 to 4 (3 columns), row is from 7 to 8 (2 rows)
            [[2, 4] , [7, 8], { symbol : { polygonFill : '#f00' } }]
        ]
    }
]
```

### `getGrid(gridIndex = 0)`

get layer's grid value
* gridIndex **Number** grid's index, default is 0

**Returns** `Object`

### `setGrid(grid, gridIndex = 0)`

set a new grid value to the layer

* grid **Object** new grid value
* gridIndex **Number** grid's index, default is 0

### `setGridData(data, gridIndex = 0)`

update layer's grid data

* data **Array** set new data

**Returns** `this`

### `redraw()`

redraw the layer

**Returns** `this`

### `isEmpty()`

If the layer is empty

**Returns** `Boolean`

### `clear()`

clear the layer

**Returns** `this`

### `getGridExtent(gridIndex = 0)`

Get grid's geographic extent

* gridIndex **Number** grid's index, default is 0

**Returns** `maptalks.Extent`

### `GetCellAt(coordinate, gridIndex = 0)`

Get cell index at coordinate

* coordinate **maptalks.Coordinate** coordinate
* gridIndex **Number** grid's index, default is 0

**Returns** `Number[]` [col, row]

### `GetCellGeometry(col, row, gridIndex = 0)`

Get cell's geometry

* col **Number** cell's col
* row **Number** cell's row
* gridIndex **Number** grid's index, default is 0

**Returns** `maptalks.Geometry` cell geometry

### `VisitAround(coordinate, cb, gridIndex = 0)`

Visit data cells around given coordinate

* coordinate **maptalks.Coordinate** coordinate
* cb **Function** callback function, parameter is [col, row, { properties, symbol }]， return false to break the visiting
* gridIndex **Number** grid's index, default is 0

### `identify(coordinate, gridIndex = 0)`

Return cell index and cell geometry at coordinate

* coordinate **maptalks.Coordinate** coordinate
* gridIndex **Number** grid's index, default is 0

**Returns** `Object` { col : col, row : row, geometry : cellGeometry }

### `toJSON()`

export the GridLayer's JSON.

```javascript
var json = gridlayer.toJSON();
```

**Returns** `Object`

## Contributing

We welcome any kind of contributions including issue reportings, pull requests, documentation corrections, feature requests and any other helps.

## Develop

The only source file is ```index.js```.

It is written in ES6.

### Scripts

* Install dependencies
```shell
$ pnpm i
```

* Watch source changes and generate runnable bundle repeatedly
```shell
$ npm run dev
```

* Tests
```shell
$ npm test
```

* Watch source changes and run tests repeatedly
```shell
$ npm run dev
```

* Package and generate minified bundles to dist directory
```shell
$ npm run build
```

* Lint
```shell
$ npm run lint
```
