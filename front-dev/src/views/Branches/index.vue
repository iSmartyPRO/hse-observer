<template>
  <Content>
    <div class="uk-margin-top uk-margin-bottom">
      <router-link :to="{name: 'BranchCreate'}" class="uk-button uk-button-primary"><span uk-icon="copy"></span> {{ $t('add') }}</router-link>
    </div>
    <h2 class="uk-text-bold">{{$t("menu.branches")}}</h2>
    <div class="uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
      <div v-for="branch in branches" :key="branch._id">
        <div class="uk-card uk-card-default uk-card-body">
          <div class="uk-card-body uk-padding-remove">
            <h3 class="uk-card-title uk-margin-remove-bottom">
              {{ branch.name }}
            </h3>
          </div>
          <div class="uk-card-footer uk-padding-remove-left uk-padding-remove-bottom">
            <router-link :to="{name: 'BranchEdit', params: {branchId: branch._id}}"><button class="uk-button uk-button-primary uk-button-small"><span uk-icon="pencil"></span></button></router-link>
            <button class="uk-button uk-button-danger uk-button-small"><span uk-icon="trash" @click="deleteBranch(branch._id, branch.name)"></span></button>
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
  name: "Branches",
  components: {
    Content
  },
  setup() {
    const toast = useToast()
    return {toast}
  },
  data() {
    return {
      title: 'Hello Branches',
      branches: null
    };
  },
  methods: {
    deleteBranch(id, name) {
      UIkit.modal.confirm(this.$t('areYouSureDelete', {name}))
        .then(() => {
          axios.delete(`${process.env.VUE_APP_API}/branch/${id}`,requestOptions.delete({id}))
            .then(response => {
              if(response.status === 200){
                this.branches = this.branches.filter(item => item._id != id)
                this.toast.warning(response.data.message)
              }
            })
        .catch(err => {
          handleError(err)})
      })
    },
  },
  mounted() {
    this.$route.meta.title = this.title
    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.headersData())
      .then((response) => {
        this.branches = response.data.data;
      })
      .catch(err => {
        handleError(err)
      });
  },

};
</script>
