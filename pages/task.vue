<template>
  <div class="container">
    <h6 class="pageTitle">Список задач</h6>
    <div class="pageContent">
      <div class="taskText taskHeader">
        <span>Задача</span>
        <span class="taskStatus">Статус</span>
      </div>
      <div v-for="task in tasks" :key="task.id" class="taskText taskItem">
        <span class="task">{{ task.title }}</span>
        <div class="taskCheck">
          <input
            :id="task.id"
            :v-model="task.completed"
            class="taskcheckBox"
            type="checkbox"
          />
          <label :for="task.id" class="taskCheckText">Выполнено</label>
        </div>
      </div>
      <span v-if="tasks.length === 0" class="FalseTask"
        >На сегодня заданий нет</span
      >
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    check: true,
  }),
  async mounted() {
    await this.$store.dispatch('tasks/FeatchPost')
  },
  computed: {
    ...mapGetters({
      tasks: 'tasks/allPosts',
    }),
  },
}
</script>

<style lang="scss" scoped>
.taskText {
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #eff1f9;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
}
.taskStatus {
  margin-right: 70px;
}
.FalseTask {
  text-align: center;
}
.taskHeader {
  color: #bababa;
}
.taskItem {
  color: #303136;
}
.taskCheck {
  display: flex;
  align-items: center;
}
.taskCheckText {
  color: #51cb3d;
  margin: 0 11px;
}
.taskcheckBox {
  width: 24px;

  height: 24px;
}
.taskcheckBox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.taskcheckBox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.taskcheckBox + label::before {
  content: '';
  display: inline-block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 80% 80%;
}

.taskcheckBox:checked + label::before {
  background-image: url('../assets/images/check.svg');
}
@media screen and (max-width: 450px) {
  .pageContent {
    padding: 24px 16px;
  }
  .task {
    width: 136px;
  }
}
</style>
