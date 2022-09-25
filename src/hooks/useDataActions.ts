import { useState, useEffect } from 'react';
import {v4 as uuid} from 'uuid'

export const useDataActions = () => {
    const storedData = localStorage.getItem('tasks')
    const storedFilterBy = localStorage.getItem('filterBy')
    const [data, setData] = useState<
    { id: string; status: string; task: string }[]
        >([]);
    const [filterBy, setFilterBy] = useState<'all'|'active'|'completed'>(storedFilterBy as 'all'|'active'|'completed'||'all')
    
    const createTask = (task: string) => {
        const newData = [...data]
        newData.unshift({ id: uuid(), task, status: "active" })
        setData(newData)
    }
    const clearCompleted = () => { 
        const activeTasks = data.filter(task => task.status !== 'completed')
        setData(activeTasks)
    }
    
    const filterData = (by: 'all' | 'active' | 'completed') => { 
        setFilterBy(by)
        localStorage.setItem('filterBy', filterBy)
    }
    
    const deleteTask = (id: string) => {
        const rest = data.filter(task => task.id !== id)
        setData(rest)
    }

    const markCompleted = (id: string) => {
        const newData = [...data]
        const taskIndex = newData.findIndex(task => task.id === id);
        const task = newData.find(task => task.id === id)
        if (task) {
            task.status = task.status === 'active' ? 'completed' : 'active';
            newData.splice(taskIndex, 1, task)
            setData(newData)
        }
    }
    
    useEffect(() => {
        !storedData?(async()=>{
            const res = await fetch(`${window.location.origin}/data.json`)
            const data = await res.json()
            setData(data.tasks)
        })(): setData(JSON.parse(storedData))
    }, [])

    useEffect(() => {
        localStorage.setItem('tasks', data.length!==0?JSON.stringify(data):'')
    }, [data])

    useEffect(() => {
        localStorage.setItem('filterBy', filterBy)
    },[filterBy])
    
    return {data, clearCompleted, filterData, deleteTask, createTask, markCompleted, filterBy}
}