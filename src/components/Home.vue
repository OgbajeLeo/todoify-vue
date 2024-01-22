<template>
   <div class="container mx-auto max-w-xl mt-8 p-4 bg-slate-800 rounded-md shadow-md md:w-full sm:w-auto">
   
    <div class="flex mb-10 items-center">
      <img class="w-20 h-20 mb-2" src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png" alt="Logo">
      <div class="text-left"><h1 class="text-3xl font-bold text-slate-300 md:text-2xl text-left">TODOIFY</h1>
        <small class="text-[10px] text-white">...ensuring important things are never forgotten !</small>
      </div>
    </div>

    <div class="flex flex-col md:flex-row mb-4 md:text-center gap-2">
      <input type="text" v-model="Todo.title" ref="inputField" class="flex-1 border p-2 placeholder-blue-900 placeholder-opacity-90 rounded-l focus:outline-none mb-2 md:mb-0 md:mr-2"
        placeholder="Add a todo ...">

      <button class="bg-green-700 w-[150px] rounded-md p-2 text-white hover:bg-green-400 mx-auto md:w-auto"
        type="button" id="add-todo-Btn" @click="addTodo">Add Todo</button>
      <button class="hidden bg-yellow-500 w-[150px] rounded-md p-2 text-white hover:bg-yellow-700 mx-auto md:w-auto"
        type="button" v-show="false" onclick="updateTodo()">Update Todo</button>

    </div>
    <!-- {{allTodos}} -->

    <!-- display error prompt on the UI -->
    <p v-if="isError" class="text-center text-red-400">{{errorMessage}}</p>

    <!-- TodoList Container  -->
    <section class="mt-12  m-auto" id="todoContainer"> 
    <div v-if='!loading'><RenderTodos /></div>
    <!-- setting Loading state -->
    <div v-else>
    <LoadingState />
    <LoadingState />
    <LoadingState />
    <LoadingState />
    </div>

    </section>
    

    <!-- display count of todo -->
    <div class="flex justify-center items-center  rounded-full p-1.5 text-gray-400 w-[100px] hover:text-blue-200" id="count"></div>

  </div>

    
</template>


<script>
import RenderTodos from './RenderTodos.vue'
import LoadingState from './LoadingState.vue'
import Swal from 'sweetalert2'

export default {
  name: 'Home-page',
  components:{RenderTodos,LoadingState},

  //All variable declarations
  data(){
    return{
      todoInput:'',
      errorMessage:'Input field cannot be empty...',
      isError:false,
      todoDB:'',
      allTodos:'',
      loading:false,

      //New Todo Object
      Todo:{
      id:this.uuid(),
      description:'Add a description...',
      title: '',
      status:'Pending',
      created_on: Date.now(),
  }


    }
  },
  methods:{
     uuid() {
      //Generate a unique ID for each Todo
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
},
    addTodo(){
      // Checks if input field is empty
      if(this.$refs.inputField.value===""){
        this.isError=true
        setTimeout(()=>{
          this.isError=false
        },3000)
      }
      else{
        //Saving the todo to Local Storage
         Swal.fire("Success!", "Your Todo has been Created.", "success");  
        this.todoDB= [...(JSON.parse(localStorage.getItem('DB') )|| []), this.Todo]
        localStorage.setItem('DB', JSON.stringify(this.todoDB))
        this.Todo.title=''
        
      }
    },

    created(){

    // Use setTimeout to set loading to false after 3 seconds
    setTimeout(() => {
      this.loading = true;
    }, 3000);



    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
