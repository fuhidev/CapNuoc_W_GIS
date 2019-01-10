import Draw = require('esri/views/2d/draw/Draw');
import TextSymbol = require('esri/symbols/TextSymbol');
import Polyline = require('esri/geometry/Polyline');
import Point = require('esri/geometry/Point');
import GraphicsLayer = require('esri/layers/GraphicsLayer');
import Graphic = require('esri/Graphic');
import geometryEngine = require('esri/geometry/geometryEngine');

export default class MeasureDistanceViewModel
// extends React.Component<Props, {}> 
{
  private draw: Draw;
  private graphicsLayer: GraphicsLayer;
  private labelGraphicsLayer: GraphicsLayer;
  private view: __esri.MapView | __esri.SceneView
  private unit: string = 'meters';
  constructor(props: {
    view: __esri.MapView | __esri.SceneView,
    unit?: 'meters' | 'feet' | 'kilometers' | 'miles' | 'nautical-miles' | 'yards';
  }) {
    this.view = props.view;
    this.unit = props.unit || this.unit;
    this.draw = new Draw({
      view: this.view
    });
    this.graphicsLayer = new GraphicsLayer({ listMode: 'hide' });
    this.labelGraphicsLayer = new GraphicsLayer({ listMode: "hide" });
    this.view.map.addMany([this.graphicsLayer, this.labelGraphicsLayer]);
  }

  public measure() {
    // create() will return a reference to an instance of PolygonDrawAction
    var action = this.draw.create('polyline');

    // focus the view to activate keyboard shortcuts for drawing polygons
    this.view.focus();

    // listen to vertex-add event on the action
    action.on('vertex-add', this.updateVertices.bind(this));

    // listen to cursor-update event on the action
    action.on('cursor-update', this.updateVertices.bind(this));

    // listen to vertex-remove event on the action
    action.on('vertex-remove', this.updateVertices.bind(this));

    // *******************************************
    // listen to draw-complete event on the action
    // *******************************************
    action.on('draw-complete', this.updateVertices.bind(this));
  }

  public clearMeasure() {
    this.graphicsLayer.removeAll();
    this.labelGraphicsLayer.removeAll();
  }

  private getLastPointFromVertices(vertices: number[][]): __esri.Point | null {
    if (vertices.length > 0) {
      let lastVer = vertices[vertices.length - 1];
      let point = new Point({
        x: lastVer[0], y: lastVer[1], spatialReference: this.view.spatialReference
      });
      return point;
    }
    else {
      return null;
    }
  }
  private displayLabel(geom: __esri.Geometry, txt: number, type: string) {
    let isLargeSize = type === 'draw-complete' || type === 'vertex-add';
    let symbolProperties = {
      color: '#005eb5',
      text: txt + ' ' + this.unit,
      xoffset: 3,
      yoffset: 3,
      font: { // autocast as Font
        size: isLargeSize ? 17 : 12,
        family: 'sans-serif'
      }
    } as __esri.TextSymbolProperties;
    let symbol = new TextSymbol(symbolProperties);

    var graphic = new Graphic({
      geometry: geom,
      symbol: symbol
    });
    if (isLargeSize)
      this.labelGraphicsLayer.add(graphic)
    else
      this.graphicsLayer.add(graphic);
  }
  private getDistance(geometry: __esri.Geometry): number {
    let distance = geometryEngine.geodesicLength(geometry, this.unit);
    distance = Math.round(distance * 10000) / 10000;
    return distance;
  }
  private updateVertices(evt: any) {
    this.graphicsLayer.removeAll();
    let graphic = this.createGraphic(evt.vertices);
    let lastPoint = this.getLastPointFromVertices(evt.vertices);
    if (lastPoint) {
      this.displayLabel(lastPoint, this.getDistance(graphic.geometry), evt.type);
    }
    this.graphicsLayer.add(graphic);
  }
  private createGraphic(vertices: number[][]) {
    var graphic = new Graphic({
      geometry: new Polyline({
        paths: [vertices],
        spatialReference: this.view.spatialReference
      }),
      symbol: {
        type: 'simple-line',
        style: 'dash',
        color: '#000',
        width: 1,
        cap: 'round',
        join: 'round'
      }
    });
    return graphic;
  }

}