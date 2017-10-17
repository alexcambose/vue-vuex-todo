<template>
  <b-collapse class="card" :open.sync="isOpen" animation="">
      <div slot="trigger" class="card-header">
          <p class="card-header-title">
            {{todo.title}}
            <b-icon type="is-success" size="is-small" :icon="todo.completed ?'done' : ''"></b-icon>
          </p>
        <span class="card-header-icon">
          <b-icon :type="wrongPassword ? 'is-danger' : (accessGranted ? 'is-success' : 'is-dark') " :icon="todo.enablePassword ? (accessGranted ? 'lock_open' : 'lock_outline') : ''"></b-icon>
          <small>{{dateDiff}}</small>
        </span>
        <a class="card-header-icon">
          <b-icon :icon="isOpen ?
              'arrow_drop_down' : 'arrow_drop_up'">
          </b-icon>
        </a>
      </div>
      <div class="card-content">
          <div class="content" v-if="accessGranted">
            {{todo.description}}

            <hr>
            <div class="td" v-if="todo.enableDeadline">Deadline on <strong>{{deadlineDate}}</strong></div>
          </div>
          <div v-else>
            <form @submit="checkPassword">
              <b-field label="Enter Password"
               :type="wrongPassword ? 'is-danger' : '' "
                :message="wrongPassword ? 'Incorrect password' : '' ">
                <b-input
                    type="password"
                    v-model="password"
                    required>
                </b-input>
              </b-field>
              <button class="button is-primary">Submit</button>
            </form>
          </div>
      </div>
      <footer class="card-footer" v-if="accessGranted">
        <a class="card-footer-item" @click="toggleCompleted(todo.id)">Mark as {{todo.completed ? 'undone' : 'done'}}</a>
        <a class="card-footer-item" @click="modalActive = true">Edit</a>
        <a class="card-footer-item" @click="showDeleteConfirm()">Delete</a>
      </footer>


    <b-modal :active.sync="modalActive" has-modal-card>
      <todo-modal-form :todo="todo"> </todo-modal-form>
    </b-modal>

  </b-collapse>
</template>
<script>
  import { mapMutations } from 'vuex';
  import moment from 'moment';
  import TodoModalForm from './TodoModalForm';

  export default {
    props: ['todo'],
    data() {
      return {
        modalActive: false,
        isOpen: false,
        password: '',
        wrongPassword: false,
        accessGranted: !this.todo.enablePassword,
      };
    },
    computed: {
      dateDiff() {
        return moment(this.todo.date).fromNow();
      },
      deadlineDate() {
        return this.todo.deadline ? moment(this.todo.deadline).format('LL') : null;
      },
    },
    methods: {
      ...mapMutations(['toggleCompleted', 'delete']),
      checkPassword(e) {
        e.preventDefault();
        if (this.todo.password === this.password) {
          this.accessGranted = true;
          this.wrongPassword = false;
        } else {
          this.wrongPassword = true;
        }
      },
      showDeleteConfirm() {
        this.$dialog.confirm({
          title: 'Delete todo',
          message: `Are you sure you want to delete <strong>${this.todo.title}</strong> ? This action cannot be undone.`,
          confirmText: 'Delete Todo',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.$toast.open('Todo deleted!');
            this.delete(this.todo.id);
          },
        });
      },
    },
    components: {
      'todo-modal-form': TodoModalForm,
    },
  };
</script>
