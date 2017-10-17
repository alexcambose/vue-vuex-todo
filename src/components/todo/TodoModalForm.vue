<template>
  <form @submit="saveTodo">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{this.todo ? `Edit ${this.todo.title}` : 'Add todo'}}</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Title">
          <b-input
              type="text"
              v-model="title"
              placeholder="Title..."
              required>
          </b-input>
        </b-field>
        <b-field label="Description">
          <b-input
              type="textarea"
              v-model="description"
              placeholder="Description..."
              required>
          </b-input>
        </b-field>
        <b-field label="Select a deadline">
          <b-datepicker
              placeholder="Click to select..."
              icon="today"
              v-model="deadline"
              :disabled="!enableDeadline"
              :required="enableDeadline">
          </b-datepicker>
        </b-field>
        <b-checkbox v-model="enableDeadline">Enable deadline</b-checkbox>
        <b-field label="Password">
          <b-input
              type="password"
              v-model="password"
              password-reveal
              placeholder="Your password"
              :required="enablePassword"
              :disabled="!enablePassword">
          </b-input>
        </b-field>

        <b-checkbox v-model="enablePassword">Enable password protection</b-checkbox>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button class="button is-primary">Save todo</button>
      </footer>
    </div>
  </form>
</template>
<script>
  import { mapMutations } from 'vuex';

  export default {
    props: ['todo'],
    data() {
      if (this.todo) {
        return {
          ...this.todo,
        };
      }
      return {
        title: '',
        description: '',
        deadline: null,
        enableDeadline: false,
        password: '',
        enablePassword: false,
      };
    },
    methods: {
      ...mapMutations(['addTodo', 'updateTodo']),
      saveTodo(e) {
        e.preventDefault();

        if (this.todo) {
          this.updateTodo(this);
        } else {
          this.addTodo(this);
        }
        this.$parent.close();
        this.$toast.open({ message: 'Todo saved!', type: 'is-success' });
      },
    },
  };
</script>
