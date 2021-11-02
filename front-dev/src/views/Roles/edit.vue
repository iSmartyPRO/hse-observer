<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <button class="uk-button uk-button-primary" @click="handlePrevPage">Назад</button>
        <form @submit.prevent>
          <fieldset class="uk-fieldset">
            <legend class="uk-legend">Редактирование роли</legend>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Название роли *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  placeholder="Введите название роли"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Описание роли *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="description"
                  type="text"
                  placeholder="Опишите роль"
                  v-model="description"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary" @click="update">
                  Обновить роль
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </Content>
</template>

<script>
import Content from "../../views/Dashboard/Content.vue";
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers"
import {useToast} from 'vue-toastification'


export default {
    setup() {
        const toast = useToast()
        return {toast}
    },
  components: { Content },
  name: "RoleEdit",
  data() {
    return {
      role: {},
      name: null,
      description: null,
    };
  },
  methods: {
    update () {
      let updatedData = {
        name: this.name,
        description: this.description
      }
      axios.patch(`${process.env.VUE_APP_API}/role/` + this.$route.params.roleId, JSON.stringify(updatedData), requestOptions.headersData())
        .then(request => {
          if(request.status === 200) {
            this.$router.push("/roles")
            this.toast.success(`Обновлена информация для "${request.data.data.name}"`)
          }
        })
        .catch(err => handleError(err) )
    },
    handlePrevPage() {
      this.$router.go(-1)
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API}/role/` + this.$route.params.roleId, requestOptions.get())
      .then((response) => {
          this.role = response.data.data
          this.name = this.role.name
          this.description = this.role.description
         })
      .catch((err) => handleError(err))
  }
};
</script>

<style>
</style>