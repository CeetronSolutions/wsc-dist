export default class FlowMap extends Map2D {
    constructor({ canvasSelector, layers, ...rest }: {
        [x: string]: any;
        canvasSelector: any;
        layers: any;
    });
    _canvas: d3.Selection<d3.BaseType, any, HTMLElement, any> | undefined;
    _canvasNode: d3.BaseType | undefined;
    _flowAnimation: FlowAnimation;
    _setNormalizedFlux(): void;
    _createCells(i: any): any[];
    _setLayer(i: any): void;
    _particleGenerator: ParticleGenerator | undefined;
}
import Map2D from "./map2d";
import * as d3 from "d3";
import FlowAnimation from "./flow_animation";
import ParticleGenerator from "./particle_generator";
