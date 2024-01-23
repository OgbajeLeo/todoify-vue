<template>
<div>
   <div v-for="todo in todos" :key="todo.id"
   class="group flex items-center justify-between p-2 mb-4 rounded-md w-full h-16 $
   
    bg-slate-100 hover:bg-slate-200 shadow-md">
            
            
            <div class='flex text-center items-center justify-center gap-2'>
            <span class="text-gray-500 animate-pulse"
            v-if="todo.status === 'Done'" >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="green" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg></span>
            <span v-else><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="orange" class="bi bi-circle-fill" viewBox="0 0 16 16"><circle cx="8" cy="8" r="8"/></svg></span>
            <button id='ok' onclick="todoToProview('${todo.uuid}')" class="font-bold text-black truncate" style='max-width:200px;'>{{todo.title}}</button>
             </div>
            <section class="flex hidden gap-6 group-hover:block">
                <button @click="handleEditMode(todo.id)" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />   
                </svg>
                </button>
                  
                <button class='pl-4' v-on:click="deleteTodo(todo.id)" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
                </button>    
            </section>

           </div> 
          </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    name:'RenderTodos',
    props:{
      
    },
            
    data(){return{
            todos:Array,
            todoField:'',
    }},
    methods:{
    
    deleteTodo(id){
    Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const filteredDB =(JSON.parse(localStorage.getItem('DB') )|| []) .filter((todo) => todo.id !== id);
      localStorage.setItem('DB', JSON.stringify(filteredDB))
     

      Swal.fire("Deleted!", "Your Todo has been deleted.", "success");
    }
  });
},
handleEditMode(id){
  console.log(id)


},

},
    created() {
        const sortedTodo=(JSON.parse(localStorage.getItem('DB') )|| [])
        this.todos = sortedTodo.sort((a, b) => { 
          if (a.created_on > b.created_on) return -1; 
          if (a.created_on < b.created_on) return 1; 
          return 0; 
          });

       
},

}
</script>

<style>

</style>