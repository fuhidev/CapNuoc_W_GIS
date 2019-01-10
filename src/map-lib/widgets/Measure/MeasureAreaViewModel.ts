import Draw = require('esri/views/2d/draw/Draw');
import GraphicsLayer = require('esri/layers/GraphicsLayer');
import Graphic = require('esri/Graphic');
import Polygon = require('esri/geometry/Polygon');
import geometryEngine = require('esri/geometry/geometryEngine');

export default class MeasureAreaViewModel
// extends React.Component<Props, {}> 
{
  private draw: Draw;
  private graphicsLayer: GraphicsLayer;
  private view: __esri.MapView | __esri.SceneView
  private unit = 'square-miles';
  constructor(props: {
    view: __esri.MapView | __esri.SceneView,
    unit?: 'acres' | 'ares' | 'hectares' | 'square-feet' | 'square-meters' | 'square-yards' |
    'square-kilometers' | 'square-miles';
  }) {
    this.view = props.view;
    this.draw = new Draw({
      view: this.view
    });
    this.graphicsLayer = new GraphicsLayer({ listMode: 'hide' });
    this.view.map.add(this.graphicsLayer);
  }

  public measure() {
    // create() will return a reference to an instance of PolygonDrawAction
    var action = this.draw.create('polygon');

    // focus the view to activate keyboard shortcuts for drawing polygons
    this.view.focus();

    // listen to vertex-add event on the action
    action.on('vertex-add', this.drawPolygon.bind(this));

    // listen to cursor-update event on the action
    action.on('cursor-update', this.drawPolygon.bind(this));

    // listen to vertex-remove event on the action
    action.on('vertex-remove', this.drawPolygon.bind(this));

    // *******************************************
    // listen to draw-complete event on the action
    // *******************************************
    action.on('draw-complete', this.drawPolygon.bind(this));
  }

  public clearMeasure() {
    this.graphicsLayer.removeAll();
  }


  // this function is called from the polygon draw action events
  // to provide a visual feedback to users as they are drawing a polygon
  private drawPolygon(evt: any) {
    var vertices = evt.vertices;

    //remove existing graphic
    this.graphicsLayer.removeAll();

    // create a new polygon
    var polygon = this.createPolygon(vertices);

    // create a new graphic representing the polygon, add it to the view
    var graphic = this.createGraphic(polygon);
    this.graphicsLayer.add(graphic);

    var area = geometryEngine.geodesicArea(polygon, this.unit);
    if (area < 0) {
      // simplify the polygon if needed and calculate the area again
      var simplifiedPolygon: Polygon = geometryEngine.simplify(polygon) as Polygon;
      if (simplifiedPolygon) {
        area = geometryEngine.geodesicArea(simplifiedPolygon, this.unit);
      }
    }
    this.labelAreas(polygon.centroid, area);
  }

  // create a polygon using the provided vertices
  private createPolygon(vertices: number[][]) {
    return new Polygon({
      rings: vertices as any,
      spatialReference: this.view.spatialReference
    });
  }

  // create a new graphic representing the polygon that is being drawn on the view
  private createGraphic(polygon: __esri.Polygon) {
    var graphic = new Graphic({
      geometry: polygon,
      symbol: {
        type: 'simple-fill', // autocasts as SimpleFillSymbol
        color: [178, 102, 234, 0.8],
        style: 'solid',
        outline: { // autocasts as SimpleLineSymbol
          color: [255, 255, 255],
          width: 2
        }
      }
    });
    return graphic;
  }

  private labelAreas(geom: __esri.Geometry, length: number) {
    var graphic = new Graphic({
      geometry: geom,
      symbol: {
        type: 'text',
        color: 'white',
        haloColor: 'black',
        haloSize: '1px',
        text: length.toFixed(2) + ' ' + this.unit,
        xoffset: 3,
        yoffset: 3,
        font: { // autocast as Font
          size: 14,
          family: 'sans-serif'
        }
      }
    });
    this.graphicsLayer.add(graphic);
  }
}