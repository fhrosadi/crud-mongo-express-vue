<template>
      <div class="container my-5">
      <div class="row justify-content-center">
          <div class="col-8">
              <router-link :to="{name:'tasks.index'}"
              class="btn btn-primary btn-sm rounded shadow mb-3"
              >Back</router-link>
              <div class="card rounded shadow">
                  <div class="card-header">
                      Create Task
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="store()">
                            <div class="mb-3">
                                <label for="" class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="task.title">
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Description</label>
                                <input type="text" class="form-control" v-model="task.description">
                            </div>
                            <button class="btn btn-outline-primary">Save</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const task = reactive({
      title: '',
      description: '',
    });

    const router = useRouter();

    function store() {
      axios.post(
        'http://localhost:8000/api/tasks',
        task,
      )
        .then(() => {
          router.push({
            name: 'tasks.index',
          });
        }).catch((err) => {
          console.log(err.response.message);
        });
    }
    return {
      task,
      router,
      store,
    };
  },

};
</script>
