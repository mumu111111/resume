//初始化
var APP_ID = 'GWfi9fhTHwDXWLM3d4EgG55U-gzGzoHsz';
var APP_KEY = 'SXooYjn7hAezypGDNf5Jbv5K';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

//获取数据
var query = new AV.Query('Message');
query.find()
  .then(function (messages) {
    let array = messages.map((item) => item.attributes)
    array.forEach((item) => {
      let li = document.createElement('li')
      li.innerText =`${item.name} : ${item.content}`
      let messageList = document.querySelector('#messageList')
      messageList.appendChild(li)
    })
  })







//提交数据
let myForm = document.querySelector('#postMessageForm')
myForm.addEventListener('submit', function (e) {
  e.preventDefault()//表单提交会自动刷新，阻止默认事件
  let name = myForm.querySelector('input[name=name]').value
  let content = myForm.querySelector('input[name=content]').value
  var Message = AV.Object.extend('Message');
  var message = new Message()
  message.save({
    'name': name,
    'content': content
  }).then(function (object) {
    window.location.reload()//提交成功就替用户刷新页面
    console.log(object)
  })


})
// //创建一个TextObject表
// var TestObject = AV.Object.extend('TestObject');
// //新建一条数据
// var testObject = new TestObject();
// //存储的数据，存储后执行函数
// testObject.save({
//   'words': content
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })





