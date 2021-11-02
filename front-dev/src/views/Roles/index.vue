<template>
  <Content>
    <div class="uk-margin-top uk-margin-bottom">
      <router-link :to="{name: 'RoleCreate'}" class="uk-button uk-button-primary"><span uk-icon="copy"></span> Добавить</router-link>
    </div>
    <div class="uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div v-for="role in roles" :key="role._id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ role.name }}
            </h3>
            <p>{{role.description}}</p>
          </div>
          <div class="uk-card-footer uk-padding-remove-left uk-padding-remove-bottom">
            <router-link :to="{name: 'RoleEdit', params: {roleId: role._id}}"><button class="uk-button uk-button-primary uk-button-small"><span uk-icon="pencil"></span></button></router-link>
            <button class="uk-button uk-button-danger uk-button-small"><span uk-icon="trash" @click="deleteDocument(role._id, role.name)"></span></button>
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
  name: "Roles",
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      roles: null
    };
  },
  methods: {
    deleteDocument(id, name) {
      UIkit.modal.confirm(`Действителньо хотите удалить роль ${name} ?`)
        .then(() => {
          axios.delete(`${process.env.VUE_APP_API}/role/${id}`, requestOptions.headersData())
            .then(response => {
              if(response.status === 200){
                this.roles = this.roles.filter(item => item._id != id)
                this.toast.warning(`Удалена роль: ${name}`)
              }
            })
        .catch(err => handleError(err))
      })
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.headersData())
      .then((response) => {
        this.roles = response.data.data;
      })
      .catch(err => {
        handleError(err)
      });
  },
};
</script>
