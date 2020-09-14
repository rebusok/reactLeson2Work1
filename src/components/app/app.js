import React, { Component } from 'react';
import AppHeader from '../app-header';
import TodoList from '../todo-list';
import SeachPanel from '../seachpanel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';
import TrashBasket from '../trash-basket';
import './app.css';

export default class App extends Component {
	maxId = 100;

	state = {
		todoData : [
			this.createTodoItem('Drink Coffee'),
			this.createTodoItem('Make Awesome App'),
			this.createTodoItem('Have a lunch')        
		],
		term: '',
		trashData: [],
		filter: 'all'
	}

	createTodoItem(label){
		return{
			label: label,
			important: false,
			done:false,
			id:this.maxId++
		}
	}
	addItem = (text) => {
		const newItem = this.createTodoItem(text);

		this.setState(({todoData}) => {
			const newArr = [...todoData, newItem];
			return{
				todoData: newArr
				}        
		})

	}
	deleteItem = (id) => {
		this.setState(({todoData, trashData}) =>{
			const inx = todoData.findIndex((el) => el.id === id);
			const delItem = todoData.filter((el) => el.id === id);

			const newArray = [
			...todoData.slice(0, inx),
			...todoData.slice(inx + 1)
			];
			delItem[0].idx = inx;

            const delArray = [
                ...trashData,
                ...delItem,
            ];


			return{
				todoData: newArray,
				trashData: delArray
				}
		});
	};
	
	toggleProperti(arr, id, property){
		const inx = arr.findIndex((el) => el.id === id);
		const oldItem = arr[inx];
		const newItem = {...oldItem, 
			[property]: !oldItem[property]};
		return [
				...arr.slice(0, inx),
				newItem,
				...arr.slice(inx + 1)
		];
			
	}

	onToggleImportant = (id) => {
		this.setState(({todoData}) => {
			return{
				todoData: this.toggleProperti(todoData, id, 'important')
			}
		})
	}
	onToggleDone = (id) => {
		this.setState(({todoData}) => {
			return{
				todoData: this.toggleProperti(todoData, id, 'done')
			}
		})
		
	}
	search(items, term){
		if (term.length === 0){
			return items;
		}
		return items.filter((item) => {
			return item.label
			.toLowerCase().indexOf(term.toLowerCase()) > - 1;
		})
	}
	onSearchChange = (term) => {
		this.setState({term});
	}
	onFilterChange = (filter) => {
		this.setState({filter});
	}
	filter(items, filter){
		switch(filter){
			case 'all':
				return items;
			case 'active':
				return items.filter((item) => !item.done);
			case 'done':
				return items.filter((item) => item.done);
			default:
				return items;
		}
	}
	onRestoreItem = (id) => {
        this.setState(({todoData, trashData}) => {            
            const returnIdx = trashData.findIndex((el) => el.id === id);
            const returnItem = { ...trashData[returnIdx] };
            const idx = returnItem.idx;            
            delete returnItem.idx;
            
            const newTodoArray = [
                ...todoData.slice(0, idx),
                returnItem,
                ...todoData.slice(idx)
            ];

            const newTrashData = [
                ...trashData.slice(0, returnIdx),
                ...trashData.slice(returnIdx+1)
            ];

            return {
                todoData: newTodoArray,
                trashData: newTrashData
            }

        });
	};
	onClearBasket = () => {
        this.setState(({trashData}) => {
            return {
                trashData: []
            }
        });
    }
	render(){
		const {todoData, term, filter, trashData} = this.state;
		const visibleItems = this.filter(
			this.search(todoData, term), filter)
		const doneCount = todoData
							.filter((el) => el.done).length;
		const todoCount = todoData.length - doneCount;
		const trashCount = trashData.length;
		return (
			<div className="todo-app">
				<AppHeader toDo={todoCount} done={doneCount} />
				<div className="top-panel d-flex">
					<SeachPanel 
					onSearchChange={this.onSearchChange}/>
					<ItemStatusFilter 
					filter={filter}
					onFilterChange={this.onFilterChange}/>
				</div>

				<TodoList 
					todos={visibleItems}
					onDeleted={ this.deleteItem} 
					onToggleImportant={this.onToggleImportant}
					onToggleDone={this.onToggleDone}/>
				<ItemAddForm onItemAdd={this.addItem}/>
				<TrashBasket
                    trash = { trashCount }
                    trashList = { trashData }       
                    onRestoreItem = { this.onRestoreItem }    
                    onClearBasket = { this.onClearBasket }         
                />
			</div>
		);
	}
};

