<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <button class="uk-button uk-button-primary" @click="handlePrevPage">{{$t('back')}}</button>
        <form @submit.prevent>
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('user.edit')}}</h2>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('user.lfName')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  type="text"
                  :placeholder="$t('user.enterlfName')"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('branch.singular')}}</label
              >
              <div class="uk-form-controls">
                <div
                  class="uk-margin uk-grid-small uk-child-width-auto uk-grid"
                >
                  <label v-for="b in branchList" :key="b._id">
                    <input
                      v-model="branches"
                      :value="b.name"
                      class="uk-check"
                      type="checkbox"
                      :checked="branches.includes(b.name)"
                    />
                    {{ b.name }}
                  </label>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('department.singular')}} *
              </label>
              <div class="uk-form-controls">
                <select
                  v-model="department"
                  name="department"
                  id="department"
                  class="uk-select"
                >
                  <option
                    v-for="d in departmentList"
                    :key="d._id"
                    :value="d.name"
                    :selected="department === d.name"
                  >
                    {{ d.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('position')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="position"
                  type="text"
                  :placeholder="$t('position')"
                  v-model="position"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('email')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="email"
                  type="text"
                  :placeholder="$t('email')"
                  v-model="email"
                  autocomplete="username"
                />
              </div>
            </div>
            <button class="uk-button uk-button-secondary" v-if="!ShowPasswordField" @click="handleShowPasswordField">Изменить пароль</button>
            <div class="uk-margin" v-else>
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('password')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="updatePassword"
                  type="password"
                  autocomplete="current-password"
                  :placeholder="$t('enterPassword')"
                  v-model="updatePassword"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('language')}}
              </label>
              <div class="uk-form-controls">
                <div
                  class="uk-margin uk-grid-small uk-child-width-auto uk-grid"
                >
                  <label v-for="lang in languages" :key="lang.name"
                    ><input
                      class="uk-radio"
                      type="radio"
                      name="selectedLanguage"
                      v-model="selectedLanguage"
                      :value="lang.name"
                      :checked="lang.name === selectedLanguage"
                    />
                    {{lang.displayName}}
                  </label>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('authType')}}
              </label>
              <div class="uk-form-controls">
                <div
                  class="uk-margin uk-grid-small uk-child-width-auto uk-grid"
                >
                  <label
                    ><input
                      class="uk-radio"
                      type="radio"
                      name="authType"
                      v-model="authType"
                      value="local"
                      :checked="authType === 'local'"
                    />
                    {{$t('local')}}
                  </label>
                  <label>
                    <input
                      class="uk-radio"
                      type="radio"
                      name="authType"
                      value="ad"
                      v-model="authType"
                      :checked="authType === 'ad'"
                    />
                    {{$t('ad')}}
                  </label>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">{{$t('role.singular')}}</label>
              <div class="uk-form-controls">
                <div
                  class="uk-margin uk-grid-small uk-child-width-auto uk-grid"
                >
                <div v-for="r in roleList" :key="r._id" class="">
                  <label>
                    <input
                      class="uk-check"
                      type="checkbox"
                      name="authType"
                      :value="r.name"
                      v-model="roles"
                      :checked="roles.includes(r.name)"
                    />
                    {{ r.description }} ({{ r.name }})
                  </label>
                  </div>
                </div>
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
import { requestOptions, handleError, languages } from "../../_helpers"
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
      languages,
      user: {},

      branchList: [],
      departmentList: [],
      roleList: [],
      selectedLanguage: null,

      name: null,
      branches: [],
      department: null,
      position: null,
      email: null,
      password: null,
      authType: null,
      roles: [],

      updatePassword: null,

      ShowPasswordField: false
    };
  },
  methods: {
    update () {
      let updatedData = {
        name: this.name,
        branches: this.branches,
        department: this.department,
        position: this.position,
        email: this.email,
        authType: this.authType,
        roles: this.roles,
        language: this.selectedLanguage
      }
      if(this.updatePassword) {
        updatedData.password = this.updatePassword
      }
      axios.patch(`${process.env.VUE_APP_API}/user/` + this.$route.params.userId, JSON.stringify(updatedData), requestOptions.headersData())
        .then(request => {
          if(request.status === 200) {
            this.$router.push("/users")
            this.toast.success(this.$t('updatedFor', {name: request.data.data.name}))
          }
        })
        .catch(err => handleError(err) )
    },
    handleShowPasswordField() {
      this.ShowPasswordField = true
    },
    handlePrevPage() {
      this.$router.go(-1)
    }
  },
  created() {
    axios
      .get(`${process.env.VUE_APP_API}/user/` + this.$route.params.userId, requestOptions.get())
      .then((response) => {
          this.user = response.data.data
          this.name = this.user.name
          this.branches = this.user.branches.map((item) => {return item.name})
          this.department = this.user.department.name
          this.position = this.user.position
          this.email = this.user.email
          this.password = null
          this.authType = this.user.authType
          this.selectedLanguage = this.user.language
          this.roles = this.user.roles.map(item => item.name)
         })
      .catch((err) => console.log(err))
    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.get())
      .then((response) => {
        this.branchList = response.data.data
      } )
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.get())
      .then((response) => {
        this.departmentList = response.data.data
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.get())
      .then((response) => (this.roleList = response.data.data))
      .catch((err) => handleError(err));
  }
};
</script>

<style>
</style>