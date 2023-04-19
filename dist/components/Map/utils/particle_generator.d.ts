/**
 * Generates particles in the given field.
 */
export default class ParticleGenerator {
    constructor(field: any);
    field: any;
    /**
     * @returns a randomly generated particle.
     */
    generate(): Particle;
}
import Particle from "./particle";
