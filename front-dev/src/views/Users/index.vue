<template>
  <Content>

<div class="uk-child-width-1-3@m uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
    <div v-for="user in users" :key="user._id">
        <div class="uk-card uk-card-default uk-card-body">
            <div class="uk-card-badge uk-label">Delete</div>
            <h3 class="uk-card-title">{{user.name}}</h3>
            <p>{{user.position}}<br>{{user.email}}</p>
        </div>
    </div>
</div>
  </Content>
</template>

<script>

import Content from '../../views/Dashboard/Content.vue'
import axios from 'axios'
import {authService} from '../../components/auth'

export default {
  components: { Content },
  name: 'Users',
  data() {
    return {
      users: null
    }
  },
  mounted() {
    axios
			.get(`http://localhost:9090/api/user`, authService.httpHeader)
			.then(response => {
				this.users = response.data.data
				})
  }
}
</script>
