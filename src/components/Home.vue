<template>
  <div
    class="container mx-auto max-w-xl mt-8 p-4 bg-slate-800 rounded-md shadow-md md:w-full sm:w-auto"
  >
    <div class="flex mb-10 items-center">
      <img
        class="w-20 h-20 mb-2"
        src="https://cdn-icons-png.flaticon.com/512/6194/6194029.png"
        alt="Logo"
      />
      <div class="text-left">
        <h1 class="text-3xl font-bold text-slate-300 md:text-2xl text-left">
          TODOIFY
        </h1>
        <small class="text-[10px] text-white"
          >...ensuring important things are never forgotten !</small
        >
      </div>
    </div>

    <div class="flex flex-col md:flex-row mb-4 md:text-center gap-2">
      <input
        type="text"
        v-model="Todo.title"
        ref="inputField"
        class="flex-1 border p-2 placeholder-blue-900 placeholder-opacity-90 rounded-l focus:outline-none mb-2 md:mb-0 md:mr-2"
        placeholder="Add a todo ..."
      />

      <button
        v-if="addBtn"
        class="bg-green-700 w-[150px] rounded-md p-2 text-white hover:bg-green-400 mx-auto md:w-auto"
        type="button"
        id="add-todo-Btn"
        @click="addTodo"
      >
        Add Todo
      </button>
      <button
        v-else
        class="bg-yellow-500 w-[150px] rounded-md p-2 text-white hover:bg-yellow-700 mx-auto md:w-auto"
        type="button"
        @click="updateTodo()"
      >
        Update Todo
      </button>
    </div>
    <!-- {{allTodos}} -->

    <!-- display error prompt on the UI -->
    <p v-if="isError" class="text-center text-red-400">{{ errorMessage }}</p>

    <!-- TodoList Container  -->
    <section class="mt-12 m-auto" id="todoContainer">
      <div v-if="loading">
        <!-- <RenderTodos /> -->

<div v-if="todos.length>0">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="group flex items-center justify-between p-2 mb-4 rounded-md w-full h-16 $ bg-slate-100 hover:bg-slate-200 shadow-md"
        >
          <div class="flex text-center items-center justify-center gap-2">
            <span
              class="text-gray-500 animate-pulse"
              v-if="todo.status === 'Done'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="green"
                class="bi bi-circle-fill"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" /></svg
            ></span>
            <span v-else
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="orange"
                class="bi bi-circle-fill"
                viewBox="0 0 16 16"
              >
                <circle cx="8" cy="8" r="8" /></svg
            ></span>
            <router-link
              :to="{name: 'PreviewTodo', params:{id:todo.id}}"
              class="font-bold text-black truncate"
              style="max-width: 200px"
            >
              {{ todo.title }}
            </router-link>
          </div>
          <section class="flex hidden gap-6 group-hover:block">
            <button @click="handleEditMode(todo.id)" title="Edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>

            <button
              class="pl-4"
              v-on:click="deleteTodo(todo.id)"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="red"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </section>
        </div></div>
        <!-- Handle Default State of Empty DB -->
        <div v-else><p class="text-center text-slate-400">TODOLIST IS EMPTY, Add now 👆🏾
👆🏾...</p>
</div>

      </div>
      <!-- setting Loading state -->
      <div v-else>
        <LoadingState />
        <LoadingState />
        <LoadingState />
      </div>
    </section>

    <!-- display count of todo -->
    <div
      v-show="loading"
      class="sm:text-xs flex justify-center items-center rounded-full p-1.5 text-gray-400 w-[100px] hover:text-blue-200"
      id="count"
    >
    </div>
  </div>
</template>

<script>
// import RenderTodos from './RenderTodos.vue'
import LoadingState from "./LoadingState.vue";
import Swal from "sweetalert2";

export default {
  name: "Home-page",
  components: { LoadingState },

  //All variable declarations
  data() {
    return {
      todoToEdit: "",
      errorMessage: "Input field cannot be empty...",
      isError: false,
      todoDB: "",
      loading: false,
      todos: "",
      addBtn: true,
      count: Number,

      //New Todo Object
      Todo: {
        id: "",
        description: "Add a description...",
        title: "",
        status: "Pending",
        created_on: Date.now(),
      },
    };
  },
  methods: {
    uuid() {
      //Generate a unique ID for each Todo
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    addTodo() {
      // Checks if input field is empty
      if (this.$refs.inputField.value === "") {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      } else {
        //Saving the todo to Local Storage
        this.Todo.id = this.uuid();
        const getDB = JSON.parse(localStorage.getItem("DB")) || [];
        console.log(this.todoDB);
        this.todoDB = [...getDB, this.Todo];
        localStorage.setItem("DB", JSON.stringify(this.todoDB));
        this.Todo.title = "";
      }
    },
    handleEditMode(id) {
      this.todoToEdit = id;
      //Finding the todo that matches the ID
      const todoEdit = this.todos.find((todo) => todo.id === id);
      //setting the input to contain the Todo title
      this.Todo.title = todoEdit.title;
      this.addBtn = false;
    },

    updateTodo() {
      // Updating the todo 
      if (this.$refs.inputField.value === "") {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      } else {
        const updatedTodo = this.todos.map((todo) => {
          if (todo.id === this.todoToEdit) {
            return { ...todo, title: this.Todo.title };
          } else {
            return todo;
          }
        });
        localStorage.setItem("DB", JSON.stringify(updatedTodo));
        this.Todo.title = "";
        this.addBtn = true;

        console.log(updatedTodo);
      }
    },

    deleteTodo(id) {
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
          const filteredDB = (
            JSON.parse(localStorage.getItem("DB")) || []
          ).filter((todo) => todo.id !== id);
          localStorage.setItem("DB", JSON.stringify(filteredDB));
          Swal.fire("Deleted!", "Your Todo has been deleted.", "success");
          setInterval(() => {
            window.location.reload();

          }, 2000);
          

        }
      });
      this.todos = JSON.parse(localStorage.getItem("DB")) || [];
    },
  },
  mounted() {
    // Use setTimeout to set loading to false after 3 seconds
    setTimeout(() => {
      this.loading = true;
    }, 3000);
  },

  beforeUpdate() {
    const sortedTodo = JSON.parse(localStorage.getItem("DB")) || [];
    this.todos = sortedTodo.sort((a, b) => b>a?1:a>b?-1:0);
    console.log('Before Update',this.todos)


  },
//   beforeCreate() {
//     const sortedTodo = JSON.parse(localStorage.getItem("DB")) || [];
//     this.todos = sortedTodo.sort((a, b) => b>a?1:a>b?-1:0
// );
// console.log('Before Create',this.todos)
//   },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
