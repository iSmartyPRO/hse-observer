<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t("role.new")}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t("role.name")}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  :placeholder="$t('role.enterName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('role.description')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="description"
                  type="text"
                  :placeholder="$t('role.describe')"
                  v-model="description"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary">
                  {{ $t('role.create') }}
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
            this.toast.success(this.$t('created',{name: request.data.data.name}))
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