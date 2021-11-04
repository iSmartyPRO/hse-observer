<template>
  <Content>
    <div class="uk-margin-top uk-margin-bottom">
      <router-link :to="{name: 'DepartmentCreate'}" class="uk-button uk-button-primary"><span uk-icon="copy"></span> {{ $t('add') }}</router-link>
    </div>
    <h2 class="uk-text-bold">{{$t('menu.departments')}}</h2>
    <div class="uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div v-for="department in departments" :key="department._id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ department.name }}
            </h3>
          </div>
          <div class="uk-card-footer uk-padding-remove-left uk-padding-remove-bottom">
            <router-link :to="{name: 'DepartmentEdit', params: {departmentId: department._id}}"><button class="uk-button uk-button-primary uk-button-small"><span uk-icon="pencil"></span></button></router-link>
            <button class="uk-button uk-button-danger uk-button-small"><span uk-icon="trash" @click="deleteDocument(department._id, department.name)"></span></button>
          </div>
        </div>
      </div>
    </div>
  </Content>
</template>

<script>
import Content from "../Dashboard/Content.vue";
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers";
import {useToast} from 'vue-toastification'

export default {
  components: {
    Content
 },
  name: "Departmets",
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      departments: null
    };
  },
  methods: {
    deleteDocument(id, name) {
      UIkit.modal.confirm(this.$t('areYouSureDelete',{name}))
        .then(() => {
          axios.delete(`${process.env.VUE_APP_API}/department/${id}`, requestOptions.headersData())
            .then(response => {
              if(response.status === 200){
                this.departments = this.departments.filter(item => item._id != id)
                this.toast.warning(`Удален отдел: ${name}`)
              }
            })
        .catch(err => handleError(err))
      })
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.headersData())
      .then((response) => {
        this.departments = response.data.data;
      })
      .catch(err => {
        handleError(err)
      });
  },
};
</script>
