<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <legend class="uk-legend">Новая роль</legend>

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
                <button type="submit" class="uk-button uk-button-primary">
                  Создать роль
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
  name: "RoleCreate",
  data() {
    return {
      name: null,
      description: null
    };
  },
  methods: {
    handleSubmit() {
      let newData = {
          name: this.name,
          description: this.description
      }
      axios.post(`${process.env.VUE_APP_API}/role`, JSON.stringify(newData), requestOptions.headersData())
        .then(request => {
          if(request.status === 201) {
            this.$router.push("/roles")
            this.toast.success(`Новая роль "${request.data.data.name}" создана`)
          }
        })
        .catch(err => handleError(err) )
    },
  },
  mounted() {

  },
};
</script>

<style>
</style>