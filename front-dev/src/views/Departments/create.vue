<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{ $t('department.new')}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{ $t('department.name') }} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  :placeholder="$t('department.enterName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary">
                  {{ $t('department.create') }}
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
  name: "DepartmentCreate",
  data() {
    return {
      name: null
    };
  },
  methods: {
    handleSubmit() {
      let newData = {
          name: this.name
      }
      axios.post(`${process.env.VUE_APP_API}/department`, JSON.stringify(newData), requestOptions.headersData())
        .then(request => {
          if(request.status === 201) {
            this.$router.push("/departments")
            this.toast.success(`New department "${request.data.data.name}" created`)
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