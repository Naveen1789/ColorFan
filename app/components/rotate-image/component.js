import Ember from 'ember';

export default Ember.Component.extend({
  isRotating: false,
  zAngle: 0,
  rotateBy: 18,
  waitTime: 25,


  init(){
      this._super(...arguments);
  },
  startRotation(){
    if(this.get('isRotating')){
      let newZAngle = (this.get('zAngle') + this.get('rotateBy')) % 360;
      this.set('zAngle', newZAngle);
      Ember.run.later(()=>{
        this.startRotation();
      }, this.get('waitTime'));
    }
  },
  myStyle: Ember.computed('zAngle', function() {
    var zAngle = (this.get('zAngle'));
    return Ember.String.htmlSafe("width:304px;height:228px;transform:rotateZ(" + zAngle + "deg)");
  }),

    actions: {
      slower(){
        this.set('waitTime', 100);
      },
      slow(){
        this.set('waitTime', 50);
      },
      steady(){
        this.set('waitTime', 25);
      },
      fast(){
        this.set('waitTime', 10);
      },
      faster(){
        this.set('waitTime', 1);
      },
      rotate(){
        if(!this.get('isRotating')){
          this.set('isRotating', true);
          this.startRotation();
        }
      },
      rest(){
        this.set('isRotating', false);
      },
      reset(){
        this.set('isRotating', false);
        this.set('zAngle', 0);
        this.set('waitTime', 25);
      }
    }
});
