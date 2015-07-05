function LayerSwitcherButton(opt_options) {

  var options = opt_options || {};
  var handler = options.clickHandler || function() {};

  var button = document.createElement('button');
  button.innerHTML = 'Layers';

  button.addEventListener('click', handler, false);
  button.addEventListener('touchstart', handler, false);

  var element = document.createElement('div');
  element.className = 'mg-layer-switcher-btn ol-unselectable ol-control';
  element.appendChild(button);

  ol.control.Control.call(this, {
    element: element,
    target: options.target
  });
};
ol.inherits(LayerSwitcherButton, ol.control.Control);