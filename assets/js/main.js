import Ractive from 'ractive';

var r = new Ractive({
  el: '#app',
  template: '#template',
  data: {
    user: {
      name: 'john'
    }
  }
});
