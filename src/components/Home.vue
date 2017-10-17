<template>
  <section>
    <div class="columns mt-3">
      <div class="column is-4">
        <button class="button is-primary is-medium"
                @click="modalActive = true">
          Add todo
        </button>

        <b-modal :active.sync="modalActive" has-modal-card>
          <todo-modal-form> </todo-modal-form>
        </b-modal>
      </div>
      <div class="column is-4 is-offset-4 flex-center justify-content-end">
        <b-checkbox v-model="onlyCompleted">
          Only completed
        </b-checkbox>
        <div class="ml-10">
          <b-dropdown v-model="sortAlphabetically">
            <button class="button is-info" slot="trigger">
              <span>Sort</span>
              <b-icon icon="arrow_drop_down"></b-icon>
            </button>

            <b-dropdown-item :value="false">
              <b-icon icon="access_time"></b-icon> Chronologically
            </b-dropdown-item>
            <b-dropdown-item :value="true">
              <b-icon icon="sort_by_alpha"></b-icon> Alphabetically
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>

    <todo-card v-for="(todo,index) in todos" :key="todo.id" :todo="todo"/>
    <div v-if="todos.length === 0">No todos</div>
  </section>
</template>

<script>
import TodoModalForm from '@/components/todo/TodoModalForm';
import TodoCard from '@/components/todo/TodoCard';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      modalActive: false,
    };
  },
  computed: {
    ...mapGetters(['todos']),
    onlyCompleted: {
      get() {
        return this.$store.state.onlyCompleted;
      },
      set(value) {
        this.$store.commit('onlyCompleted', value);
      },
    },
    sortAlphabetically: {
      get() {
        return this.$store.state.sortAlphabetically;
      },
      set(value) {
        this.$store.commit('sortAlphabetically', value);
      },
    },
  },
  methdos: {
    close() {
      this.modalActive = false;
    },
  },
  components: {
    'todo-modal-form': TodoModalForm,
    'todo-card': TodoCard,
  },
};
</script>

