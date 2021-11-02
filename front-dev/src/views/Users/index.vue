<template>
  <Content>
    <div class="uk-margin-top uk-margin-bottom">
      <router-link :to="{name: 'UserCreate'}" class="uk-button uk-button-primary"><span uk-icon="copy"></span> Добавить</router-link>
    </div>
    <div class="uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div v-for="user in users" :key="user._id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ user.name }}
            </h3>
            <p class="uk-text-meta uk-margin-remove-top">
              <time datetime="2016-04-01T19:00">{{ user.position }}</time>
            </p>
            <p>{{ user.email }}</p>
          </div>
          <div class="uk-card-footer uk-padding-remove-left uk-padding-remove-bottom">
            <router-link :to="{name: 'UserEdit', params: {userId: user._id}}"><button class="uk-button uk-button-primary uk-button-small"><span uk-icon="pencil"></span></button></router-link>
            <button class="uk-button uk-button-danger uk-button-small"><span uk-icon="trash" @click="deleteDocument(user._id, user.name)"></span></button>
          </div>
        </div>
      </div>
    </div>
  </Content>



</template>

<script>
import Content from "../../views/Dashboard/Content.vue";
import axios from "axios";
import { requestOptions, handleError } from "../../_helpers";
import {useToast} from 'vue-toastification'

export default {
  components: {
    Content
 },
  name: "Users",
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      users: null

    };
  },
  methods: {
    deleteDocument(id, name){
      UIkit.modal.confirm(`Действителньо хотите удалить роль ${name} ?`)
        .then(() => {
          axios.delete(`${process.env.VUE_APP_API}/user/${id}`, requestOptions.headersData())
            .then(response => {
              if(response.status === 200){
                this.users = this.users.filter(item => item._id != id)
                this.toast.warning(`Удален пользователь: ${name}`)
              }
            })
            .catch(err => handleError(err))
        })
    }
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/user`, requestOptions.headersData())
      .then((response) => {
        this.users = response.data.data;
      })
      .catch(err => {
        console.log(err)
      });
  },
};
</script>
