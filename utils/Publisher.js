//发布者类
export default class Publisher {
  constructor() {
    this.observers = []
    this.state = ''
  }

  addObserver(observer) {
    var flag = true
    for (var i = this.observers.length - 1; i >= 0; i--) {
      if (this.observers[i] === observer) {
        flag == false
      }
    }

    if (flag) {
      this.observers.push(observer)
    }
  }

  removeObserver(observer) {
    for (var i in this.observers) {
      if (this.observers[i] === observer) {
        observers.splice(i, 1)
      }
    }
  }


  notice(){
    var observers = this.observers
    for(var i in this.observers){
      observers[i].update(this.state)
    }
  }

}