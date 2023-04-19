/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
const perf_metrics = [];
const logTimes = (id, phase, actualDuration, baseDuration) => {
    console.log(`${id}'s phase: ${phase}\nActual time: ${actualDuration} \nBase time: ${baseDuration}`);
    perf_metrics.push([id, phase, actualDuration, baseDuration]);
};
export default logTimes;
export const obj = {
    perf_metrics,
};
//# sourceMappingURL=onRenderFunction.js.map