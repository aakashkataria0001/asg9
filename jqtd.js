$().ready(function(){
  var obj;
  var todos = [];
  var counter;
  if(localStorage.getItem('counter') == null)
    counter = 1;
  else
    counter = localStorage.getItem('counter');
  function classfunc(checked, data, counter){
    this.checked = checked;
    this.data = data;
    this.counter = counter;
  }
  $("#addbut").click(function(){
    obj = new classfunc(false, $("#inptext").val().toString(), counter);
    todos.push(obj);
    $("#todolist")[0].innerHTML += '<li id="count' + counter.toString() + '"class="listitem" onclick="setstrinke(this)"><input id="count' + counter.toString() + '" class="ckbox" type="checkbox">' + $("#inptext")[0].value.toString() + '</li>';
    $("#inptext")[0].value = "";
    savetodo();
    counter++;
    console.log(todos);
  })
  setstrinke = function(s){
    s.setAttribute('style' , 'text-decoration: line-through;');
    deleter(s);
    savetodo();
    console.log(todos);
  }
  deleter = function(s){
    var t;
    for(var i = 0; i < todos.length; i++){
      if('count' + todos[i].counter.toString() === s.id.toString()){
        t = i;
        break;
      }
    }
    (todos[i].checked === true)?(todos[i].checked = false):(todos[i].checked = true);
  }
  savetodo = function(){
    localStorage.setItem("counter", counter);
    localStorage.setItem("todo", JSON.stringify(todos));
  }
  chkr = function(todos, i){
    var str = "checked";
    var str0 = "notchecked";
    if(todos[i].checked.toString() === 'true')
      return str;
    else
      return str0;
  }
  showtodo = function(){
    var a = "";
    if(localStorage.getItem("todo") != null){
      todos = JSON.parse(localStorage.getItem("todo"));
      for(var i = 0; i < todos.length; i++)
        a += '<li id="count' + todos[i].counter.toString() + '" class="listitem" onclick="setstrinke(this)"><input ' + chkr(todos, i) + ' id="count' + todos[i].counter.toString() + '" class="ckbox" type="checkbox">' + todos[i].data.toString() + '</li>';
      $("#todolist")[0].innerHTML = a.toString();
    }
  }
  $("#clearbutton").click(function(){
    for(var i = 0; i < todos.length; i++){
      if(todos[i].checked.toString() === 'true'){
        todos.splice(i, i + 1);
      }
    }
    localStorage.removeItem("todo");
    savetodo();
    showtodo();
  })
  showtodo();
})
