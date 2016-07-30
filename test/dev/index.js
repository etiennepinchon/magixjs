App.run(function() {
  var Playground, a, hello;
  Playground = new Page({
    parent: App
  });
  Fonts([
    {
      name: 'Raleway',
      weight: '600,500,400,300,100'
    }, {
      name: 'Roboto Mono',
      weight: '400'
    }, {
      name: 'Montserrat',
      weight: '600,500,400,300,100'
    }
  ]);
  Playground.background = Color.gradient(Color.random(), Color.random(), Color.random(), Color.random(), Color.random(), Color.random());
  hello = new Text({
    text: 'Hello',
    width: 300,
    fontSize: 90,
    fontWeight: 300,
    color: black,
    spacing: 4,
    parent: Playground
  });
  hello.center();
  a = new View({
    props: {
      bc: red
    },
    parent: Playground
  });
  Below(Tablet, hello, {
    fontSize: 32,
    bc: clear
  });
  Below(Mobile, hello, {
    fontSize: 16,
    bc: green
  });
  return Above(TV, hello, {
    fontSize: 64,
    bc: blue
  });
});
