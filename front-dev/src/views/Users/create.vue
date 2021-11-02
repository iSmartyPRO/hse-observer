<template>
  <Content>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <form @submit.prevent="handleSubmit">
          <fieldset class="uk-fieldset">
            <legend class="uk-legend">Новый пользователь</legend>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Фамилия и Имя *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="name"
                  type="text"
                  placeholder="Введите фамилию и имя"
                  v-model="name"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Объект</label
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
                Отдел *
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
                Должность *
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
                >E-mail *</label
              >
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="email"
                  type="text"
                  placeholder="E-mail"
                  v-model="email"
                  autocomplete="username"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                Пароль *
              </label>
              <div class="uk-form-controls">
                <input
                  class="uk-input"
                  id="password"
                  type="password"
                  placeholder="Введите пароль для пользователя"
                  v-model="password"
                  autocomplete="current-password"
                />
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">
                Тип авторизации
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
                    Локальная
                  </label>
                  <label>
                    <input
                      class="uk-radio"
                      type="radio"
                      name="authType"
                      value="ad"
                      v-model="authType"
                    />
                    Active Directory
                  </label>
                </div>
              </div>
            </div>
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Роль</label>
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
                  Создать пользователя
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
  name: "UserCreate",
  data() {
    return {
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
            this.toast.success(`New user "${request.data.data.name}" created`)
          }
        })
        .catch(err => handleError(err) )
    },
  },
  mounted() {
    axios
      .get(`${process.env.VUE_APP_API}/branch`, requestOptions.get())
      .then((response) => (this.branches = response.data.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/department`, requestOptions.get())
      .then((response) => (this.departments = response.data.data))
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.VUE_APP_API}/role`, requestOptions.get())
      .then((response) => (this.roles = response.data.data))
      .catch((err) => handleError(err));
  },
};
</script>

<style>
</style>