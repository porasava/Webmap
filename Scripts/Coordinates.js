import MousePosition from 'ol/control/MousePosition';
import {createStringXY} from 'ol/coordinate';

const map = $("#map").data("map");
const mousePosition = new MousePosition({
    coordinateFormat:createStringXY(5),
    className: "badge-pill badge-warning",
    target: "coordinates"
});

map.addControl(mousePosition);