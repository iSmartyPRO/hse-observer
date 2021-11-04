<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <button class="uk-button uk-button-primary" @click="handlePrevPage">{{ $t('back') }}</button>
        <form @submit.prevent>
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{ $t('department.edit') }}</h2>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{ $t('department.name') }} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  type="text"
                  :placeholder="$t('department.enterName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <div class="uk-form-controls">
                <button class="uk-button uk-button-primary" @click="update">
                  {{ $t('updateData')}}
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
  name: "DepartmentEdit",
  data() {
    return {
      department: {},
      name: null
    };
  },
  methods: {
    update () {
      let updatedData = {
        name: this.name
      }
      axios.patch(`${process.env.VUE_APP_API}/department/` + this.$route.params.departmentId, JSON.stringify(updatedData), requestOptions.headersData())
        .then(request => {
          if(request.status === 200) {
            this.$router.push("/departments")
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
      .get(`${process.env.VUE_APP_API}/department/` + this.$route.params.departmentId, requestOptions.get())
      .then((response) => {
          this.department = response.data.data
          this.name = this.department.name
         })
      .catch((err) => handleError(err))
  }
};
</script>

<style>
</style>