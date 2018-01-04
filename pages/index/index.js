//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputText: '',
    todos: [],
    leftItems: 0,

  },
  onLoad: function() {
    let storageTodos = wx.getStorageSync('todos');
    let storageItems = wx.getStorageSync('leftItems');
    // let storageTodos;
    // let storageItems;
    // wx.getStorage({
    //   key: 'todos',
    //   success: function(res) {
    //     storageTodos = res.data;
    //   }
    // })
    // wx.getStorage({
    //   key: 'storageItems',
    //   success: function(res) {
    //     storageItems = res.data;
    //   }
    // })
    if(storageTodos) {
      this.setData({
        todos: storageTodos,
        leftItems: storageItems
      })
    }
  },
  changeInput: function(e) {
    this.setData({
      inputText: e.detail.value
    })
  },
  addTodo: function() {
    let input = this.data.inputText;
    if(!input.trim()) return ;
    let todos = this.data.todos;
    todos.push({name: input, completed: false});
    this.setData({
      inputText: '',
      todos: todos,
      leftItems: this.data.leftItems + 1
    });
    // wx.setStorage({
    //   key: 'todos',
    //   value: todos
    // });
    // wx.setStorage({
    //   key: 'leftItems',
    //   value: this.data.leftItems
    // });
    wx.setStorageSync('todos',todos);
    wx.setStorageSync('leftItems', this.data.leftItems);
  },
  toggleTodo: function(e) {
    let index = e.currentTarget.dataset.index;
    let leftItems = this.data.leftItems;
    let todos = this.data.todos;
    todos[index].completed = !todos[index].completed;
    if(todos[index].completed === false) {
      leftItems++;
    } else {
      leftItems--;
    }
    this.setData({
      todos: todos,
      leftItems: leftItems
    });
    wx.setStorageSync('todos', todos);
    wx.setStorageSync('leftItems', leftItems);
  },
  removeItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let todos = this.data.todos;
    let leftItems = this.data.leftItems;
    if (todos[index].completed === false) {
      leftItems--;
    }
    todos.splice(index, 1);
    this.setData({
      todos: todos,
      leftItems: leftItems
    });
    wx.setStorageSync('todos', todos);
    wx.setStorageSync('leftItems', leftItems);
  },
  completeAll: function() {
    let todos = this.data.todos;
    let leftItems = this.data.leftItems;
    let newTodos = [];
    if (leftItems === 0) {
      newTodos = todos.map(ele => {
        return {
          name: ele.name,
          completed: false
        };
      })
    }else {
      newTodos = todos.map(ele => {
        return {
          name: ele.name,
          completed: true
        };
      })
    }
    if (newTodos[0].completed) {
      leftItems = 0;
    } else {
      leftItems = newTodos.length;
    }
    this.setData({
      leftItems: leftItems,
      todos: newTodos
    });
    wx.setStorageSync('todos', this.data.todos);
    wx.setStorageSync('leftItems', leftItems);
  },
  clearCompleted: function() {
    let todos = this.data.todos;
    let remain = [];
    todos.forEach((ele) => {
      if(ele.completed === false) {
        remain.push(ele);
      }
    });
    this.setData({
      todos: remain
    });
    wx.setStorageSync('todos', this.data.todos);
  }
})
