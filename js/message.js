!function () {
  var view = document.querySelector('section.message')
  var model = {
    //初始化
    init: function () {
      var APP_ID = 'GWfi9fhTHwDXWLM3d4EgG55U-gzGzoHsz';
      var APP_KEY = 'SXooYjn7hAezypGDNf5Jbv5K';
      AV.init({
        appId: APP_ID,
        appKey: APP_KEY
      });
    },
    //获取数据
    fetch: function () {
      var query = new AV.Query('Message');
      return query.find()  //promise对象
    },
    //保存数据
    save: function (name, content) {
      var Message = AV.Object.extend('Message');
      var message = new Message()
      return message.save({  //promise对象
        'name': name,
        'content': content
      })
    }
  }
  var controller = {
    view: null,
    model: null,
    form: null,
    messageList: null,
    init: function (view) {
      this.view = view
      this.model = model
      this.form = view.querySelector('form')
      this.messageList = view.querySelector('#messageList')
      this.model.init()
      this.loadMessages()
      this.bindEvents()
    },
    //获取数据添加到view
    loadMessages: function(){
      this.model.fetch().then(
        (messages) => {
          let array = messages.map((item) => item.attributes)
          array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name} : ${item.content}`
            this.messageList.appendChild(li)
          })
        })
    },
    bindEvents: function(){
      this.form.addEventListener('submit', (e)=>{
        e.preventDefault()
        this.saveMessage()
      })
    },
    saveMessage: function(){
      let myForm = this.form
      let content = myForm.querySelector('input[name=content]').value
      let name = myForm.querySelector('input[name=name]').value
      if(name==='' || content===''){
        alert('请输入内容再提交')
        return 
      }else{
        this.model.save(name, content).then(function(object) {
          let li = document.createElement('li')
          li.innerText = `${object.attributes.name}: ${object.attributes.content}`
          let messageList = document.querySelector('#messageList')
          this.messageList.appendChild(li)
          myForm.querySelector('input[name=content]').value = ''
          console.log(object)
        })
      }
    
    }
  }
  controller.init(view, model)
}.call()









