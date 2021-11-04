<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <h2 class="uk-text-bold">{{$t('user.new')}}</h2>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{$t('user.lfName')}} *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
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
                  <label v-for="branch in branches" :key="branch._id">
                    <input
                      v-model="selectedBranches"
                      class="uk-check"
                      type="checkbox"
                      :value="branch.name"
                    />
                    {{ branch.name }}
                  </label>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('branch.singular')}} *
              </label>
              <div class="uk-form-controls">
                <select
                  v-model="department"
                  name="department"
                  id="department"
                  class="uk-select"
                >
                  <option
                    v-for="department in departments"
                    :key="department._id"
                    :value="department.name"
                  >
                    {{ department.name }}
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
                  placeholder="Должность"
                  v-model="position"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >{{ $t('email') }} *</label
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
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                {{$t('password')}} *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="password"
                  type="password"
                  :placeholder="$t('enterPassword')"
                  v-model="password"
                  autocomplete="current-password"
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
                      :checked="lang.name === 'ru'"
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
                  <label v-for="role in roles" :key="role._id">
                    <input
                      class="uk-check"
                      type="checkbox"
                      name="authType"
                      :value="role.name"
                      v-model="selectedRoles"
                    />
                    {{ role.description }} ({{ role.name }})
                  </label>
                </div>
              </div>
            </div>

            <div class="uk-margin">
              <div class="uk-form-controls">
                <button type="submit" class="uk-button uk-button-primary">
                  {{ $t('user.create') }}
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
  name: "UserCreate",
  data() {
    return {
      languages,
      name: null,
      email: null,
      position: null,
      department: null,
      selectedBranches: [],
      password: null,
      authType: "local",
      selectedRoles: [],

      departments: null,
      branches: null,
      roles: null,
    };
  },
  methods: {
    handleSubmit() {
      let newUser = {
          name: this.name,
          email: this.email,
          authType: this.authType,
          password: this.password,
          position: this.position,
          branches: this.selectedBranches,
          department: this.department,
          roles: this.selectedRoles
      }
      axios.post(`${process.env.VUE_APP_API}/users`, JSON.stringify(newUser), requestOptions.headersData())
        .then(request => {
          if(request.status === 201) {
            this.$router.push("/users")
            this.toast.success(this.$t('created', {name: request.data.data.name}))
          }
        })
        .catch(err => handleError(err) )
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.get())
      .then((response) => (this.branches = response.data.data))
      .catch((err) => handleError(err));
    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.get())
      .then((response) => (this.departments = response.data.data))
      .catch((err) => handleError(err));
    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.get())
      .then((response) => (this.roles = response.data.data))
      .catch((err) => handleError(err));
  },
};
</script>

<style>
</style>