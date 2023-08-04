import React, { useEffect, useRef } from 'react';
import * as topojson from 'topojson-client';
import usData from '../../data/us.json';
import "./InteractiveMap.css";
import { fipsStateCodes } from '../../constants';

export default function InteractiveMap({ raceType }) {

      const mapRef = useRef(null);

      useEffect(() => {
        const margin = { top: 50, left: 50, right: 50, bottom: 50 };
        const height = 400 - margin.top - margin.bottom;
        const width = 800 - margin.left - margin.right;
    
        const mapContainer = d3.select(mapRef.current);
    
        mapContainer.selectAll('svg').remove();
    
        const svg = mapContainer
          .append('svg')
          .attr('height', height + margin.top + margin.bottom)
          .attr('width', width + margin.left + margin.right)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
    
        const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale(800);

        const path = d3.geoPath().projection(projection);

        const states = topojson.feature(usData, usData.objects.states).features;
    
        svg.selectAll('.state')
          .data(states)
          .enter().append('path')
          .attr('class', 'state')
          .attr('d', path)
          .on('click', function(d) {
            const stateName = fipsStateCodes[d.id];
            window.location.href = `/${raceType}/${stateName}`;
          });
    
        return () => {
          svg.remove();
        };
      }, []);

    return (
        <div ref={mapRef} className="interactive-map-container"></div>
        )
}