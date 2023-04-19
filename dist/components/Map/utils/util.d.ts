/**
 * Utility class for handling transform attribute in an svg element
 */
export default class SVGTransform {
    constructor(transform: any);
    TRANSFORM_REGEX: RegExp;
    transform: {};
    /**
     * Parse the transform attribute into a convenient object for manipulation.
     *
     * e.g. "translate(10,50)" => { translate: ['10', '50'] }
     *
     * @param { string } transformString
     */
    parseTransform(transformString: string): {};
    addTransform(type: any, params: any): void;
    /**
     * Outputs the convenience transforms object back into string (which is put inside the SVG transform attribute)
     */
    toString(): string;
}
export function range(num: any): number[];
