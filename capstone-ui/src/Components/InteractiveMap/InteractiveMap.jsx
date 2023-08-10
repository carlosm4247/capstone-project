import { useEffect, useRef } from 'react';
import * as topojson from 'topojson-client';
import usData from '../../data/us.json';
import "./InteractiveMap.css";
import { fipsStateCodes, presidentialStateWins } from '../../constants';
import StateMap from '../StateMap/StateMap';

export default function InteractiveMap({ handleLocation, handleState, handleBackButton, selectedState, setSelectedState }) {

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
          .attr('class', (d) => `state ${presidentialStateWins[fipsStateCodes[d.id]] == "democrat" ? 'democrat' : 'republican'}`)
          .attr('d', path)
          .on('click', function(d) {
            const stateName = fipsStateCodes[d.id];
            setSelectedState(stateName);
            handleLocation(2);
            handleState(stateName);
            handleBackButton(true);
          });
    
        return () => {
          svg.remove();
        };
      }, [selectedState]);

    return (
        <div ref={mapRef} className="interactive-map-container">
            <div ref={mapRef}></div>
            {selectedState && <StateMap stateName={selectedState} />}
        </div>
        )
}