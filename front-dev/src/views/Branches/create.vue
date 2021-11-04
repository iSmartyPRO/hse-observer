<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('branch.new')}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('branch.name')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  :placeholder="$t('branch.enterName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('branch.location')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="location"
                  type="text"
                  :placeholder="$t('branch.enterName')"
                  v-model="location"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary">
                  {{$t('branch.create')}}
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
  name: "BranchCreate",
  data() {
    return {
      name: null,
      location: null
    };
  },
  methods: {
    handleSubmit() {
      let newBranch = {
          name: this.name,
          location: this.location
      }
      axios.post(`${process.env.VUE_APP_API}/branch`, JSON.stringify(newBranch), requestOptions.headersData())
        .then(request => {
          if(request.status === 201) {
            this.$router.push("/branches")
            this.toast.success(`New branch "${request.data.data.name}" created`)
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