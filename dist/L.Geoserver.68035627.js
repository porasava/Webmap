// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"lib/L.Geoserver.js":[function(require,module,exports) {
L.Geoserver = L.FeatureGroup.extend({
  //Some of the default options
  options: {
    layers: "",
    format: "image/png",
    transparent: true,
    CQL_FILTER: "INCLUDE",
    zIndex: 1000,
    version: "1.1.0",
    srsname: "EPSG:4326",
    attribution: "layer",
    fitLayer: true,
    style: "",
    onEachFeature: function onEachFeature(feature, layer) {},
    wmsLayers: [],
    wmsCQL_FILTER: [],
    wmsStyle: [],
    width: 500,
    height: 500
  },
  // constructor function
  initialize: function initialize(baseLayerUrl, options) {
    this.baseLayerUrl = baseLayerUrl;
    L.setOptions(this, options);
    this._layers = {};
    this.state = {
      exist: "exist"
    };
  },
  //wms layer function
  wms: function wms() {
    return L.tileLayer.wms(this.baseLayerUrl, this.options);
  },
  //wfs layer fetching function
  //Note this function will work only for vector layer
  wfs: function wfs() {
    var that = this; //Geoserver Web Feature Service

    $.ajax(this.baseLayerUrl, {
      type: "GET",
      data: {
        service: "WFS",
        version: "1.1.0",
        request: "GetFeature",
        typename: this.options.layers,
        CQL_FILTER: this.options.CQL_FILTER,
        srsname: this.options.srsname,
        outputFormat: "text/javascript",
        format_options: "callback: getJson"
      },
      dataType: "jsonp",
      jsonpCallback: "getJson",
      success: function success(data) {
        var layers = []; // push all the layers to the layers array

        for (var i = 0; i < data.features.length; i++) {
          var layer = L.GeoJSON.geometryToLayer(data.features[i], that.options || null);
          layer.feature = data.features[i];
          layer.options.onEachFeature = that.options.onEachFeature(layer.feature, layer);
          layers.push(layer);
        } // for adding styles to the geojson feature


        if (typeof that.options.style === "function") {
          for (i = 0; i < layers.length; i++) {
            that.addLayer(layers[i]);

            if (i.setStyle) {
              i.setStyle(that.options.style(i.feature));
            }
          }
        } else {
          for (i = 0; i < layers.length; i++) {
            that.addLayer(layers[i]);
            that.setStyle(that.options.style);
          }
        }

        if (that.options.fitLayer) {
          that._map.fitBounds(that.getBounds());
        }
      }
    }).fail(function (jqXHR, textStatus, error) {
      console.log(jqXHR, textStatus, error);
    });
    return that;
  },
  //Legend of the map
  legend: function legend() {
    var that = this;
    var legend = L.control({
      position: "bottomleft"
    });

    legend.onAdd = function (map) {
      var div = L.DomUtil.create("div", "info Legend");
      var url = "".concat(that.baseLayerUrl, "/wms?REQUEST=GetLegendGraphic&VERSION=1.1.0&FORMAT=image/png&LAYER=").concat(that.options.layers, "&style=").concat(that.options.style);
      div.innerHTML += "<img src=" + url + ' alt="legend" data-toggle="tooltip" title="Map legend">';
      return div;
    };

    return legend;
  },
  //This function is used for zooming the raster layer using specific vector data
  wmsImage: function wmsImage() {
    var that = this;
    $.ajax({
      url: "".concat(that.baseLayerUrl, "/ows?service=WFS&version=1.0.0&request=GetFeature&cql_filter=").concat(that.options.wmsCQL_FILTER[0], "&typeName=").concat(that.options.wmsLayers[0], "&srsName=EPSG:4326&maxFeatures=50&outputFormat=text%2Fjavascript"),
      dataType: "jsonp",
      jsonpCallback: "parseResponse",
      success: function success(data) {
        // bounding box for the selected vector layer
        selectedArea = L.geoJson(data);
        bboxX1 = selectedArea.getBounds()._southWest.lng;
        bboxX2 = selectedArea.getBounds()._northEast.lng;
        bboxY1 = selectedArea.getBounds()._southWest.lat;
        bboxY2 = selectedArea.getBounds()._northEast.lat;
        bboxList = [bboxX1, bboxX2, bboxY1, bboxY2];
        bufferBbox = Math.min((bboxX2 - bboxX1) * 0.1, (bboxY2 - bboxY1) * 0.1);
        maxValue = Math.max(bboxX2 - bboxX1, bboxY2 - bboxY1) / 2.0;
        var otherLayers = "";
        var otherStyle = "";
        var otherCqlFilter = "";

        for (var i = 1; i < that.options.wmsLayers.length; i++) {
          otherLayers += that.options.wmsLayers[i];
          otherStyle += that.options.wmsStyle[i];
          otherCqlFilter += that.options.wmsCQL_FILTER[i];

          if (i != that.options.wmsLayers.length - 1) {
            otherLayers += ",";
            otherStyle += ",";
            otherCqlFilter += ';';
          }
        } //final wmsLayerUrl


        var wmsLayerURL = "".concat(that.baseLayerUrl, "/wms?service=WMS&version=1.1.0&request=GetMap&layers=").concat(otherLayers, "&styles=").concat(otherStyle, "&cql_filter=").concat(otherCqlFilter, "&bbox=").concat((bboxX1 + bboxX2) * 0.5 - maxValue - bufferBbox, ",").concat((bboxY1 + bboxY2) * 0.5 - maxValue - bufferBbox, ",").concat((bboxX1 + bboxX2) * 0.5 + maxValue + bufferBbox, ",").concat((bboxY1 + bboxY2) * 0.5 + maxValue + bufferBbox, "&width=").concat(that.options.width, "&height=").concat(that.options.height, "&srs=EPSG%3A4326&format=image/png");
        $("#".concat(that.options.wmsId)).attr("src", wmsLayerURL);
        return that;
      }
    });
    return that;
  }
});

L.Geoserver.wms = function (baseLayerUrl, options) {
  var req = new L.Geoserver(baseLayerUrl, options);
  return req.wms();
};

L.Geoserver.wfs = function (baseLayerUrl, options) {
  var req = new L.Geoserver(baseLayerUrl, options);
  return req.wfs();
};

L.Geoserver.legend = function (baseLayerUrl, options) {
  var req = new L.Geoserver(baseLayerUrl, options);
  return req.legend();
};

L.Geoserver.wmsImage = function (baseLayerUrl, options) {
  var req = new L.Geoserver(baseLayerUrl, options);
  return req.wmsImage();
};
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56533" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","lib/L.Geoserver.js"], null)
//# sourceMappingURL=/L.Geoserver.68035627.js.map