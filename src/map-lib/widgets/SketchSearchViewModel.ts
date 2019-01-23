import SketchViewModel = require('esri/widgets/Sketch/SketchViewModel');
import Graphic = require('esri/Graphic');
import GraphicsLayer = require('esri/layers/GraphicsLayer');
import Polyline = require('esri/geometry/Polyline');
import geometryEngine = require('esri/geometry/geometryEngine');

type Props = {
  view: __esri.View
};

export default class SketchSearchViewModel {
  private tempGraphicsLayer: __esri.GraphicsLayer | undefined;
  private sketchViewModel: __esri.SketchViewModel | undefined;
  private editGraphic: __esri.Graphic | undefined;
  private handleViewClick: IHandle | undefined;
  private view: __esri.View;
  private sketchCircleCentroid: SketchSearchCircleWithCentroid | undefined;

  constructor(options: Props) {
    this.view = options.view;
    this.init();
    if (this.sketchViewModel) {
      this.sketchCircleCentroid = new SketchSearchCircleWithCentroid({
        sketchViewModel: this.sketchViewModel,
        view: this.view as any
      });
    }
  }

  public get graphicsSearch() {
    if (this.tempGraphicsLayer) {
      return this.tempGraphicsLayer.graphics.map(m => m.geometry);
    }
    return null;
  }

  destroy() {
    if (this.tempGraphicsLayer) {
      this.view.map.remove(this.tempGraphicsLayer);
    }
    if (this.sketchViewModel) {
      this.sketchViewModel.reset();
    }
    if (this.handleViewClick) {
      this.handleViewClick.remove();
    }
  }

  private init() {
    this.tempGraphicsLayer = new GraphicsLayer({
      listMode: 'hide'
    });

    this.view.map.add(this.tempGraphicsLayer);
    // create a new sketch this.view model
    this.sketchViewModel = new SketchViewModel({
      view: this.view,
      layer: this.tempGraphicsLayer,
      polylineSymbol: {
        type: 'simple-line', // autocasts as new SimpleLineSymbol()
        color: '#8A2BE2',
        width: '4',
        style: 'dash'
      } as any,
      polygonSymbol: {
        type: 'simple-fill', // autocasts as new SimpleFillSymbol()
        color: 'rgba(138,43,226, 0.2)',
        style: 'solid',
        outline: {
          color: 'white',
          width: 1
        }
      } as any
    });

    // this.handleViewClick = this.setUpClickHandler();

    // Listen to create-complete event to add a newly created graphic to this.view
    this.sketchViewModel.on('create-complete', this.addGraphic.bind(this));

    // Listen the this.sketchViewModel's update-complete and update-cancel events
    this.sketchViewModel.on('update-complete', this.updateGraphic.bind(this));
    this.sketchViewModel.on('update-cancel', this.updateGraphic.bind(this));

  }

  private addGraphic(event: any) {
    // Create a new graphic and set its geometry to
    // `create-complete` event geometry.
    if (this.sketchViewModel && this.tempGraphicsLayer) {
      const graphic = new Graphic({
        geometry: event.geometry,
        symbol: this.sketchViewModel.graphic.symbol
      });
      this.tempGraphicsLayer.add(graphic);
    }
  }

  private updateGraphic(event: any) {
    // event.graphic is the graphic that user clicked on and its geometry
    // has not been changed. Update its geometry and add it to the layer
    event.graphic.geometry = event.geometry;
    if (this.tempGraphicsLayer) {
      this.tempGraphicsLayer.add(event.graphic);
    }

    // set the this.editGraphic to null update is complete or cancelled.
    delete this.editGraphic;
  }

  // ************************************************************************************
  // set up logic to handle geometry update and reflect the update on 'this.this.tempGraphicsLayer'
  // ************************************************************************************

  public onDrawPolygonClick() {
    this.sketchViewModel && this.sketchViewModel.create('polygon');
  }

  public onDrawRectangleClick() {
    this.sketchViewModel && this.sketchViewModel.create('rectangle');
  }

  public onDrawCircleClick() {
    this.sketchViewModel && this.sketchViewModel.create('circle');
  }

  public onDrawCircleWithCentroidClick() {
    let handle = (this.view as __esri.MapView).on('click', (e) => {
      e.stopPropagation();
      this.sketchCircleCentroid && this.sketchCircleCentroid.draw(e.mapPoint);
      handle.remove();
    });
  }

  public onDrawPolylineClick() {
    this.sketchViewModel && this.sketchViewModel.create('polyline');
  }

  public onClearClick() {
    this.sketchViewModel && this.sketchViewModel.reset();
    this.tempGraphicsLayer && this.tempGraphicsLayer.removeAll();
    delete this.editGraphic;
  }
}

class SketchSearchCircleWithCentroid {
  private sketchViewModel: SketchViewModel;
  private centerGraphic: Graphic | undefined;
  private edgeGraphic: Graphic | undefined;
  private polylineGraphic: Graphic | undefined;
  private bufferGraphic: Graphic | undefined;
  private labelGraphic: Graphic | undefined;
  private view: __esri.MapView;
  private unit: string = 'kilometers';
  constructor(props: { view: __esri.MapView, sketchViewModel: SketchViewModel, unit?: string }) {
    this.view = props.view;
    this.unit = props.unit || this.unit;
    this.sketchViewModel = props.sketchViewModel;
    this.sketchViewModel.on('move-start', this.bufferMoveHandler.bind(this));
    this.sketchViewModel.on('move', this.bufferMoveHandler.bind(this));
    this.sketchViewModel.on('move-complete', this.bufferMoveHandler.bind(this));
  }
  private createGraphic(geometry: __esri.Geometry, symbolType: string) {
    return symbolType === 'handle' ? new Graphic({
      geometry: geometry,
      attributes: {
        edge: 'edge'
      },
      symbol: {
        type: 'simple-marker',
        style: 'circle',
        size: 12,
        color: [255, 0, 255],
        outline: {
          color: [255, 255, 255],
          width: 1
        }
      }
    }) :
      symbolType === 'center' ? new Graphic({
        geometry: geometry,
        attributes: {
          center: 'center'
        },
        symbol: {
          type: 'simple-marker',
          style: 'circle',
          size: 12,
          color: '#e7903c',
          outline: {
            color: [255, 255, 255],
            width: 1
          }
        }
      }) :
        symbolType === 'line' ? new Graphic({
          geometry: geometry,
          symbol: {
            type: 'simple-line',
            color: [254, 254, 254, 1],
            width: 2.5
          }
        }) :
          new Graphic({
            geometry: geometry,
            symbol: {
              type: 'simple-fill',
              color: [150, 150, 150, 0.2],
              outline: {
                color: '#FFEB00',
                width: 2
              }
            }
          });
  }

  public draw(centroid: __esri.Point) {
    const centerScreenPoint = this.view.toScreen(centroid);
    const centerPoint = this.view.toMap({
      x: centerScreenPoint.x,
      y: centerScreenPoint.y
    });
    const edgePoint = this.view.toMap({
      x: centerScreenPoint.x + 120,
      y: centerScreenPoint.y
    });
    const vertices = [
      [centerPoint.x, centerPoint.y],
      [edgePoint.x, edgePoint.y]
    ];

    // drawBufferPolygon() function is called for the first time in app load. Create
    // center, edge, polyline and buffer graphics for the first time
    if (!this.centerGraphic) {
      const polyline = new Polyline({
        paths: vertices as any,
        spatialReference: this.view.spatialReference
      });

      // get the length of the initial polyline and create buffer
      const length = geometryEngine.geodesicLength(polyline, this.unit);
      const buffer = geometryEngine.geodesicBuffer(centerPoint, length, this.unit) as __esri.Geometry;
      // create the graphics representing the line and buffer
      this.centerGraphic = this.createGraphic(centerPoint, 'center');
      this.edgeGraphic = this.createGraphic(edgePoint, 'handle');
      this.polylineGraphic = this.createGraphic(polyline, 'line');
      this.bufferGraphic = this.createGraphic(buffer, 'buffer');
      this.labelGraphic = this.labelLength(edgePoint, length);
      this.sketchViewModel.layer.addMany([
        this.bufferGraphic, this.polylineGraphic,
        this.centerGraphic, this.edgeGraphic, this.labelGraphic
      ]);
    }
    // drawBufferPolygon() function ic called from search widget's search-complete event
    // just move the center and edge graphics to the new location returned from search
    else {
      this.centerGraphic.geometry = centerPoint;
      if (this.edgeGraphic) { this.edgeGraphic.geometry = edgePoint; }
    }

    // query features that intersect the buffer
    this.calculateBuffer(vertices);
  }

  private bufferMoveHandler(event: any) {
    let vertices: number[][] = [];
    if (event.graphic.attributes && event.graphic.attributes.center && this.centerGraphic && this.edgeGraphic) {
      this.centerGraphic.geometry = event.geometry;

      const edgeScreenPoint = this.view.toScreen(this.edgeGraphic.geometry as __esri.Point);
      const adjustedGeometry =
        this.view.toMap({
          x: edgeScreenPoint.x + event.dx,
          y: edgeScreenPoint.y + event.dy
        });
      this.edgeGraphic.geometry = adjustedGeometry;

      // updated vertices for the polyline
      vertices = [
        [(this.centerGraphic.geometry as __esri.Point).x, (this.centerGraphic.geometry as __esri.Point).y],
        [adjustedGeometry.x, adjustedGeometry.y]
      ];
    }
    // user is moving on the EDGE graphic. Resize the polyline graphic
    // and recalculate the buffer polygon
    else if (event.graphic.attributes && event.graphic.attributes.edge && this.edgeGraphic && this.centerGraphic) {
      // EdgeGraphic is initially created in drawBufferPolygon() function when view is loaded
      this.edgeGraphic.geometry = event.geometry;
      vertices = [
        [(this.centerGraphic.geometry as __esri.Point).x, (this.centerGraphic.geometry as __esri.Point).y],
        [(this.edgeGraphic.geometry as __esri.Point).x, (this.edgeGraphic.geometry as __esri.Point).y]
      ];
    }
    // client-side stats query of features that intersect the buffer
    this.calculateBuffer(vertices);
  }

  private labelLength(geom: __esri.Geometry, length: number) {
    return new Graphic({
      geometry: geom,
      symbol: {
        type: 'text',
        color: '#FFEB00',
        text: length.toFixed(2) + ' kilometers',
        xoffset: 13,
        yoffset: 3,
        font: { // autocast as Font
          size: 14,
          family: 'sans-serif'
        }
      }
    });
  }

  private calculateBuffer(vertices: number[][]) {
    // update the geometry of the polyline based on location of edge and center points
    if (this.polylineGraphic && this.centerGraphic && this.labelGraphic && this.bufferGraphic && this.edgeGraphic) {
      this.polylineGraphic.geometry = new Polyline({
        paths: vertices as any,
        spatialReference: this.view.spatialReference
      });
      // recalculate the polyline length and buffer polygon
      const length = geometryEngine.geodesicLength(this.polylineGraphic.geometry, this.unit);
      const buffer = geometryEngine.geodesicBuffer(this.centerGraphic.geometry, length, this.unit) as __esri.Geometry;

      // query female and male age groups of the census tracts that intersect
      // the buffer polygon on the client
      // queryLayerViewAgeStats(buffer).then(function(newData) {
      //   // create a population pyramid chart from the returned result
      //   updateChart(newData);
      // });

      // label graphic shows the length of the polyline
      this.labelGraphic.geometry = this.edgeGraphic.geometry;
      (this.labelGraphic.symbol as __esri.TextSymbol).text = length.toFixed(2) + this.unit;
      this.bufferGraphic.geometry = buffer;
    }
  }

  public clear() {
    let graphics = [];
    this.bufferGraphic && graphics.push(this.bufferGraphic);
    this.polylineGraphic && graphics.push(this.polylineGraphic);
    this.centerGraphic && graphics.push(this.centerGraphic);
    this.edgeGraphic && graphics.push(this.edgeGraphic);
    this.labelGraphic && graphics.push(this.labelGraphic);
    this.sketchViewModel.layer.removeMany(graphics);
    delete this.centerGraphic;
    delete this.edgeGraphic;
    delete this.polylineGraphic;
    delete this.bufferGraphic;
    delete this.labelGraphic;
  }
}