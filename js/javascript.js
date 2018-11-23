//Config
let elem = document.getElementById("background");
const params = {
  //params here
  autostart: true,
  width: $(window).width(),
  height: $(window).height()
};
const colors = [
  "#18A8DE",
  "#EE586E",
  "#1ED5C8",
  "#FF9CA8",
  "#38C555"
];
const shapes = []; //list of all different shapes
const particles = []; //list of all unique particles from shapes

//start this shit
const two = new Two(params).appendTo(elem);

//find all shapes
const objects = $('#shapes object');
let count = objects.length;
objects.each(function(i, el) {
  el.onload = function() {
    const shape = two.interpret($(el).contents().find('svg')[0]);
    shape.visible = false;
    shapes.push(shape);
    if (!--count) generateShapes();
  }
});
//generate random shapes
function generateShapes() {
  _(20).times(function(n) {
    const shape = _.sample(shapes).clone();

    shape.fill = _.sample(colors);
    shape.scale = _.random(10,20)*.01; //The original SVGs are just this massive!
    shape.opacity = 0;
    shape.visible = true;

    let opacity, step, stepX, stepY, initialX, initialY;
    shape.start = function() {
      stepX = _.random(-10,10)/5;
      stepY = _.random(-10,10)/5;
      step = _.random(10,100)/10000;
      initialX = _.random(0,two.width);
      initialY = _.random(0,two.height);
      shape.translation.set(initialX,initialY);
      opacity = -1.0;
    };
    shape.step = function() {
      if (shape.opacity <= 0) shape.start();
      opacity += step;
      shape.translation.x += stepX;
      shape.translation.y += stepY;
      shape.rotation += step;
      shape.opacity = 1 - Math.abs(opacity);
    };
    particles.push(shape);
  });
}
//main animation
two.bind('update',function() {
  _.each(particles,function(child) {
    child.step();
  });
});

/*//make sure it runs after dom
$(function() {
  if(!navigator.userAgent.match('CriOS')) {
    //make things reveal when you scroll to it.
    window.scrollReveal = ScrollReveal({
      reset: true
    });
    scrollReveal.reveal('.rev');

    //make navbar transition
    $('#navbar').onePageNav({
      currentClass: 'active'
    });
  }
});*/
