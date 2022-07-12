import 'ol/ol.css';
import {Map, View} from 'ol';
import {Image as ImageLayer}from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS'
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import Projection from 'ol/proj/Projection';

const serverUrl="http://172.19.16.1:5000/geoserver/wms";
const mapProjection = new Projection({
    code:'EPSG:4326',
    units:'m',
    axisOrientation:'nue',
    global:false
});


const CrimeTASource = new ImageWMS({
    url:serverUrl,
    // layer:layer name
    params:{"LAYERS":"TA_rename","VERSION":"1.1.1","FORMAT":"image/png"}
 
});

const CrimeTALayer = new ImageLayer({
    source:CrimeTASource,
    // @ts-ignore
    name:'City'
});


// const CrimeAreaSource = new ImageWMS({
//     url:serverUrl,
//     // layer:layer name
//     params:{"LAYERS":"Crime by area Renamed","VERSION":"1.1.1","FORMAT":"image/png"}

// });

// const CrimeAreaLayer = new ImageLayer({
//     source: CrimeAreaSource,
//     // @ts-ignore
//     name:'Suburb'
// });

const GGmapSource = new ImageWMS({
    url:serverUrl,
    // layer:layer name
    params:{"LAYERS":"gg18","VERSION":"1.1.1","FORMAT":"image/png"}

});

const GGmapLayer = new ImageLayer({
    source: GGmapSource,
    // @ts-ignore
    name:'Google'
});

const view=new View({
    extent:[-177.35791015625, -47.72404861450195, 178.83621215820312, -33.95849609375],
    // extent:[-176.54006958007812, -46.98520278930664, 178.5046844482422, 54.63124465942383],
    // มาจากรูปแผนที่ตัวจริงว่าอยากให้โชว์จุดไหน
    center:[174.8336,-36.35101],
    zoom:0,
projection:mapProjection
});
const map = new Map({
    
target:"map",
layers:[GGmapLayer,CrimeTALayer],
view:view
})

// jquery
$('#map').data('map',map);