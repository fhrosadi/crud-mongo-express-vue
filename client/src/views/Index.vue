<template>
  <div class="container my-5">
      <div class="row justify-content-center">
          <div class="col-8">
              <router-link :to="{name:'tasks.create'}"
              class="btn btn-primary btn-sm rounded shadow mb-3"
              >Add</router-link>
              <div class="card rounded shadow">
                  <div class="card-header">
                      Task List
                  </div>
                  <div class="card-body">
                      <table class="table">
                          <thead>
                              <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Action</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(task, index) in tasks.data" :key="index">
                                <td>{{task.title}}</td>
                                <td>{{task.description}}</td>
                                <td>
                                    <div class="btn-group">
                                      <router-link :to="{name:'tasks.update',params:{id:task.id}}"
                                      class="btn btn-sm btn-outline-info"
                                      >Edit</router-link>
                                      <button class="btn btn-sm btn-outline-danger"
                                        @click.prevent="destroy(task.id, index)"
                                      >
                                          Delete
                                      </button>
                                    </div>
                                </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const tasks = ref([]);

    onMounted(() => {
      axios.get('http://localhost:8000/api/tasks')
        .then((result) => {
          tasks.value = result;
        }).catch((err) => {
          console.log(err.response.message);
        });
    });

    function destroy(id, index) {
      axios.delete(
        `http://localhost:8000/api/tasks/${id}`,
      )
        .then(() => {
          tasks.value.data.splice(index, 1);
        }).catch((err) => {
          console.log(err.response.data);
        });
    }
    return {
      tasks,
      destroy,
    };
  },
};
</script>
