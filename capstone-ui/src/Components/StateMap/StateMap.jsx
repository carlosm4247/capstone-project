import { useState, useEffect, useRef } from 'react';
import * as topojson from 'topojson-client';
import usData from '../../data/us.json';
import "./StateMap.css";
import ResultsBox from '../ResultsBox/ResultsBox';
import { FIPSfromStateName } from '../../constants';

export default function StateMap({ stateName }) {

    const stateFIPS = FIPSfromStateName[stateName];

    const mapRef = useRef(null);
    const [hoveredCounty, setHoveredCounty] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

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
    
        const counties = topojson.feature(usData, {
          type: 'GeometryCollection',
          geometries: usData.objects.counties.geometries.filter((county) => String(county.id).length - String(stateFIPS).length === 3 && String(county.id).substring(0, String(stateFIPS).length) === String(stateFIPS))
        }).features;
    
        svg.selectAll('.county')
          .data(counties)
          .enter().append('path')
          .attr('class', 'county')
          .attr('d', path)
          .on('mouseover', function(d, i, nodes) {
            const [x, y] = d3.mouse(nodes[i]);
            setHoveredCounty(d);
            setPopupPosition({ x, y });
          })
          .on('mouseout', function() {
            setHoveredCounty(null);
          });
    
        return () => {
          svg.remove();
        };
      }, []);

    return (
        <div className="state-map-container">
            <div ref={mapRef} className="map-svg-container"></div>
            {hoveredCounty && (
                <div className="popup-container" style={{ left: popupPosition.x, top: popupPosition.y }}>
                    <ResultsBox locationLevel={3} countyFIPS={hoveredCounty.id} stateName={stateName}/>
                </div>
                )
            }
        </div>
    )
}