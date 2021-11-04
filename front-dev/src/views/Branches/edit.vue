<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <button class="uk-button uk-button-primary" @click="handlePrevPage">{{$t('back')}}</button>
        <form @submit.prevent>
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('branch.edit')}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('branch.name')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
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
                  :placeholder="$t('branch.enterAddress')"
                  v-model="location"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button class="uk-button uk-button-primary" @click="update">
                  {{$t('updateData')}}
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
  name: "UserEdit",
  data() {
    return {
      branch: {},
      name: null,
      location: null
    };
  },
  methods: {
    update () {
      let updatedData = {
        name: this.name,
        location: this.location
      }
      axios.patch(`${process.env.VUE_APP_API}/branch/` + this.$route.params.branchId, JSON.stringify(updatedData), requestOptions.headersData())
        .then(request => {
          if(request.status === 200) {
            this.$router.push("/branches")
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
      .get(`${process.env.VUE_APP_API}/branch/` + this.$route.params.branchId, requestOptions.get())
      .then((response) => {
          this.branch = response.data.data
          this.name = this.branch.name
          this.location = this.branch.location
         })
      .catch((err) => handleError(err))
  }
};
</script>

<style>
</style>