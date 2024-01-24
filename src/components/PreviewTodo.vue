<template>
  <div
    class="container mx-auto max-w-3xl mt-8 p-4 bg-slate-800 rounded-md shadow-md md:w-full"
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

    <!-- Edit Description Section-->
    <div class="flex flex-col mt-4" v-if="isEdit">
      <label class="font-bold text-gray-100">Title</label>
      <input
        type="text"
        v-model="newTitle"
        class="form-input w-full p-2 border rounded-md mb-4"
        placeholder="Edit title..."
      />
      <label class="font-bold text-gray-100">Description</label>
      <textarea
        class="form-input w-full h-24 p-2 border rounded-md mb-4"
        contenteditable="true"
        placeholder="Add description..."
        v-model="newDescription"
      ></textarea>
      <p v-show="isDissabled" class="text-red-500 text-center">{{ error }}</p>
      <button
        class="bg-yellow-500 mb-4 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-700"
        @click="update"
      >
        Update
      </button>
    </div>

    <!-- Todo Preview and description -->
    <div
      class="items-center justify-between p-2 mb-4 rounded-md w-full bg-slate-100 shadow-md"
      v-if="isHeading"
    >
      <div class="flex justify-between items-center">
        <div
          id="title"
          class="font-bold text-slate-900 container inline text-lg truncate"
          style="max-width: 200px"
        >
          {{ previewTodo.title }}
        </div>

        <section class="flex gap-4">
          <button @click="handleEdit" title="Edit">
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
            @click="statusToggle"
            title="Mark done or Pending"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
              />
            </svg>
          </button>

          <button class="" @click="deleteTodo" title="Delete">
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
      </div>
    </div>

    <!--Description Section-->
    <div
      v-if="isHeading"
      class="items-center bg-gray-300 border border-b-slate-300 mt-4 p-2 group"
    >
      <b class="text-gray-700">Description:</b><br />
      <code id="description">{{ description }}</code>
    </div>

    <div
      v-if="isHeading"
      class="flex my-2 items-center justify-between"
    >
      <div class="text-gray-300 text-[10px]">Added On {{ todoDate() }}</div>
    </div>

    <router-link
      to="/"
      class="flex justify-center items-center text-xs border-2 border-gray-400 rounded-full p-1 text-gray-400 w-[80px] hover:text-blue-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
      See all
    </router-link>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "PreviewTodo",
  data() {
    //Variables Declaration
    return {
      isEdit: false,
      isHeading: true,
      isDissabled: false,
      error: "Title or Description cannot be empty",
      newTitle: "",
      newDescription: "",
      previewID: this.$route.params.id,
      allTodo: JSON.parse(localStorage.getItem("DB")) || [],
    };
  },
  methods: {
    todoDate() {
      const currentDate = new Date(this.previewTodo.created_on);

      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      let hours = currentDate.getHours().toString().padStart(2, "0");
      const minutes = currentDate.getMinutes().toString().padStart(2, "0");
      let amOrPm = "AM";

      // Convert hours to 12-hour format and set AM or PM
      if (hours >= 12) {
        amOrPm = "PM";
        hours = hours % 12 || 12; // If hours is 0, set it to 12
      }

      const formattedDate = `${year}/${month}/${day} at ${hours}:${minutes}${amOrPm}`;
      return formattedDate;
    },

    handleEdit() {
      //Triggers the Edit mode
      this.isEdit = true;
      this.isHeading = false;
      this.newTitle = this.title;
      this.newDescription = this.description;
    },
    statusToggle(){
      //Toggle the status to Done or Pending
      const db = JSON.parse(localStorage.getItem("DB"));
      const todoToUpdate = db.map((todo) => {
    if (todo.id === this.$route.params.id) {
      return { ...todo, status: this.status === "Done" ? "Pending" : "Done" };
    } else {
      return todo;
    }
  });
  // const sound = new Audio("https://res.cloudinary.com/duw4jtxls/video/upload/v1706059903/tone_ohybtl.mp3");
  // sound.play();

    Swal.fire( todoToUpdate.find((todo) => todo.id === this.$route.params.id).status ===
"Done" ? "Marked as Done!" : "Marked as Pending!", "", "success" );
localStorage.setItem("DB", JSON.stringify(todoToUpdate));


    },
    deleteTodo(){
      //Function to Delete Todo
      const db = JSON.parse(localStorage.getItem("DB"));
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
      const filteredDB = db.filter((todo) => todo.id != this.$route.params.id);
      localStorage.setItem("DB", JSON.stringify(filteredDB));
      Swal.fire("Deleted!", "Your Todo has been deleted.", "success");
      window.location.href = "/";
    }
  });
    },


    update() {
      //Main update function that update the title and description
      if (this.newTitle === "" || this.newDescription === "") {
        this.isDissabled = true;
        setInterval(() => {
          this.isDissabled = false;
        }, 3000);
      
      } else {
        const db = JSON.parse(localStorage.getItem("DB"));
        const updatedDescription = db.map((todo) => {
          if (todo.id === this.$route.params.id) {
            return {
              ...todo,
              title: this.newTitle,
              description: this.newDescription,
            };
          } else {
            return todo;
          }
        });
        Swal.fire("Updated!", "Your Todo has been Updated.", "success");
        localStorage.setItem("DB", JSON.stringify(updatedDescription));
        this.isEdit = false;
        this.isHeading = true;

        const allTodo = JSON.parse(localStorage.getItem("DB")) || [];
        this.previewTodo = allTodo.find(
          (todo) => todo.id === this.$route.params.id
        );
        this.title = this.previewTodo.title;
        this.description = this.previewTodo.description;
        this.status = this.previewTodo.status;
      }
    },
  },
  beforeCreate() {
    const allTodo = JSON.parse(localStorage.getItem("DB")) || [];

    this.previewTodo = allTodo.find(
      (todo) => todo.id === this.$route.params.id
    );
    this.title = this.previewTodo.title;
    this.description = this.previewTodo.description;
    this.status = this.previewTodo.status;
  },
};
</script>
