import { scaleLinear, scaleLog } from "d3";
/**
 * Creates a d3 scale from config
 */
export function createScale(type, domain) {
    if (type === "linear") {
        return scaleLinear().domain(domain);
    }
    if (type === "log") {
        return scaleLog().domain(domain);
    }
    throw Error("Invalid input!");
}
//# sourceMappingURL=factory.js.map