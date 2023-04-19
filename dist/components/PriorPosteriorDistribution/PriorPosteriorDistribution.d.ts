export default PriorPosteriorDistribution;
declare class PriorPosteriorDistribution extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    d3priorposterior: D3PriorPosterior | undefined;
}
declare namespace PriorPosteriorDistribution {
    namespace defaultProps {
        const height: number;
        namespace data {
            const iterations: never[];
            const labels: never[];
            const values: never[];
        }
    }
    namespace propTypes {
        export const id: PropTypes.Validator<string>;
        const height_1: PropTypes.Requireable<number>;
        export { height_1 as height };
        const data_1: PropTypes.Requireable<object>;
        export { data_1 as data };
    }
}
import React from "react";
import D3PriorPosterior from "./utils/prior_posterior_distribution";
import PropTypes from "prop-types";
