import React, { Component } from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SeachPanel from '../seachpanel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import './app.css';

export default class App extends Component {
  maxId = 100;

    state = {
      todoData : [
        { label: 'Drink Coffee', id: 1 },
        { label: 'Make Awesome App', id: 2 },
        { label: 'Have a lunch', id: 3 }
      ]
    }
    addItem = (text) => {
      const newItem = {
        label: text,
        important: false,
        id:this.maxId++
      }

      this.setState(({todoData}) => {
        const newArr = [...todoData, newItem];
        return{
          todoData: newArr
        }        
      })
      
    }
    deleteItem = (id) => {
      this.setState(({todoData}) =>{
		const inx = todoData.findIndex((el) => el.id === id);
		
		const newArray = [
			...todoData.slice(0, inx),
			...todoData.slice(inx + 1)
		];
		
		return{
			todoData: newArray
		}
      });
    };
  
    render(){
      return (
        <div className="todo-app">
          <AppHeader toDo={1} done={3} />
          <div className="top-panel d-flex">
            <SeachPanel />
            <ItemStatusFilter />
          </div>
    
          <TodoList 
          todos={this.state.todoData}
          onDeleted={ this.deleteItem} />
          <ItemAddForm onItemAdd={this.addItem}/>
        </div>
      );
    }
  };

