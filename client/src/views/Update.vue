<template>
      <div class="container my-5">
      <div class="row justify-content-center">
          <div class="col-8">
              <router-link :to="{name:'tasks.index'}"
              class="btn btn-primary btn-sm rounded shadow mb-3"
              >Back</router-link>
              <div class="card rounded shadow">
                  <div class="card-header">
                      Edit Task
                  </div>
                  <div class="card-body">
                      <form @submit.prevent="update()">
                            <div class="mb-3">
                                <label for="" class="form-label">Title</label>
                                <input type="text" class="form-control" v-model="task.title">
                            </div>
                            <div class="mb-3">
                                <label for="" class="form-label">Description</label>
                                <input type="text" class="form-control" v-model="task.description">
                            </div>
                            <button class="btn btn-outline-primary">Update</button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const task = reactive({
      title: '',
      description: '',
    });

    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      axios.get(`http://localhost:8000/api/tasks/${route.params.id}`)
        .then((result) => {
          task.title = result.data.title;
          task.description = result.data.description;
        }).catch((err) => {
          console.log(err.response.data);
        });
    });

    function update() {
      axios.put(
        `http://localhost:8000/api/tasks/${route.params.id}`,
        task,
      )
        .then(() => {
          router.push({
            name: 'tasks.index',
          });
        }).catch((err) => {
          console.log(err.response.data);
        });
    }
    return {
      task,
      router,
      update,
    };
  },

};
</script>
