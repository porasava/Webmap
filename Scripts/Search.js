import { WFS , GeoJSON} from "ol/format";
import { and, equalTo } from "ol/format/filter";
import {Vector}from "ol/layer";
import VectorSource from "ol/source/Vector";
import {Style,Stroke} from "ol/style";

const map=$('#map').data('map');

const searchBtn= $('#search');

const wfsUrl='http://localhost:5000/geoserver/Training/wfs';

const vectorSource= new VectorSource();
const style = new Style({
   stroke:new Stroke ({
    color: 'blue',
    width:2
   })
})
const vector=new Vector ({
source: vectorSource,
style:style

});
map.addLayer(vector);

searchBtn.click(function(){
const crimeTAInput =$('#TAInput').val().toString();
const crimeAreaInput =$('#AreaNameInput').val().toString();
if(crimeTAInput.length==0)
{
window.alert('Please enter City Name')
}
if(crimeAreaInput.length==0)
{
window.alert('Please enter Suburb Name')
}

const featureRequest = new WFS().writeGetFeature({
    srsName: 'EPSG:4326',
    featureNS:  "http://localhost:5000/geoserver/Training",
    featurePrefix: 'CrimeTA',
    featureTypes: ['CrimeTA'],
    outputFormat: 'application/json',
    filter: and (
        equalTo('ta2022_v1_',crimeTAInput),
        equalTo('ta2022_v_1',crimeTAInput),
    )
});

fetch(wfsUrl,{
    method:'POST',
    body: new XMLSerializer().serializeToString(featureRequest)
}).then(function(response){
    return response.json();
}).then(function(json){
    if(json.features.length>0)
    {
     const features = new GeoJSON().readFeatures(json);
     vectorSource.clear(true);
     vectorSource.addFeatures(features);

     map.getView().fit(vectorSource.getExtent(),{'padding':[100,100,100,100]});
    }
    else
    {
       window.alert('No features found');
    }
})

})