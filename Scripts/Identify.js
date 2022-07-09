import 'ol/ol.css';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import XYZ from 'ol/source/XYZ';
import {toLonLat} from 'ol/proj';
import {toStringHDMS} from 'ol/coordinate';
import {getLayerByName} from './customFunctions';

const map = $('#map').data('map');
/**
 * Elements that make up the popup.
 */
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new Overlay({
  element: container,
  autoPan: true,
    autoPanAnimation: {
      duration: 250
  },
});

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = 'Get your own API key at https://www.maptiler.com/cloud/';
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

/**
 * Create the map.
 */
map.addOverlay(overlay);
/**
 * Add a click handler to the map to render the popup.
 */
map.on('singleclick', function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));
//Getting The Layer Source: getting the layer itself, and then getting its sourcw
//Create a function to get the layer by name

//Get The Layer by its name
const CrimeTALayer=getLayerByName('CrimeTA');
const CrimeTASource=CrimeTALayer.getSource();
const CrimeAreaLayer=getLayerByName('CrimeArea');
const CrimeAreaSource=CrimeAreaLayer.getSource();
const view=map.getView();
const resolution=view.getResolution();
const projection=view.getProjection();


//แสดง pop up เมื่อคลิ๊ก

const CrimeTAInfo =$('#Crime-Info');
CrimeTAInfo.html('');
const CrimeAreaInfo =$('#Crime-Area-Info');
CrimeAreaInfo.html('');
const noFeatures=$('no-features-Info');
noFeatures.html('<p>No features info</p>')

const CrimeTAUrl=CrimeTASource.getFeatureInfoUrl(coordinate,resolution,projection,
{'INFO_FORMAT':'application/json'});

const CrimeAreaUrl=CrimeAreaSource.getFeatureInfoUrl(coordinate,resolution,projection,
    {'INFO_FORMAT':'application/json'});

if(CrimeTAUrl)
{
    $.ajax({
        url:CrimeTAUrl,
        method: 'GET',
        success:function(result){
            console.log(result);
            const CrimeTA=result.features[0];
            if(CrimeTA){

            
            const CrimeTAName=CrimeTA.properties.ta2022_v1_;
            const CrimeTAName2=CrimeTA.properties.ta2022_v_1;
            const CrimeTAArea=CrimeTA.properties.land_area_;

            // const CrimeTAInfo =$('#Crime-Info');
            CrimeTAInfo.html(`<h5>Crime TA Info</h5>
            <p>Crime TA Name: ${CrimeTAName}</p> 
            <p>Crime TA Name2: ${CrimeTAName2}</p>
            <p>Crime TA Area (sqm): ${CrimeTAArea.toFixed(2)}</p>`);
            noFeatures.html('');
        }
        }
    })

    if(CrimeAreaUrl)
    {
        $.ajax
        ({
            url:CrimeAreaUrl,
            method: 'GET',
            success:function(result)
            {
                console.log(result);
                const CrimeArea=result.features[0];
                if(CrimeArea){
                const CrimeAreaName=CrimeArea.properties.areaunitna;
                const CrimeAreaName2=CrimeArea.properties.tlaname;
                // const CrimeAreaArea=CrimeArea.properties.land_area_;
                // const CrimeAreaInfo =$('#Crime-Area-Info');
                CrimeAreaInfo.html(`<h5>Crime Area Info</h5>
                <p>Crime Area Name: ${CrimeAreaName}</p> 
                <p>Crime Area Name2: ${CrimeAreaName2}</p>
                `);
                noFeatures.html('');
                }
            }
        })
    }
    



}
{

   



}
//   content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
  overlay.setPosition(coordinate);
});
