import React, { useMemo } from "react";
import * as d3 from "d3";

import Axis from "./Axis";

// <circle cx={x} cy={y} r={3} />

const Scatterplot = ({ x, y, width, height, data, datapoint, callback, callbackColor }) => {
  const xScale = d3.scaleLinear()
    .domain([0, 100]) // TODO: change to parameter?
    .range([0, width]);

  // const yScale = useMemo(
  //   () =>
  //     d3
  //       .scaleLinear()
  //       .domain([0, 100])
  //       .range([0, height]),
  //   [height]
  // );
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, height]);

  return (
    <g transform={`translate(${x}, ${y})`}>
      {data.map(d => (
        <circle key={d.id} cx={xScale(d.x)} cy={yScale(d.y)} r={7} fill={d.color} onClick={()=>{d['color'] === callbackColor && callback()}}/>
      ))}
      <Axis x={0} y={height} scale={xScale} />
      <Axis x={0} y={0} scale={yScale} type={"Left"} />
    </g>
  );
};

export default Scatterplot;
