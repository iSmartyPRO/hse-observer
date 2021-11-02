<template>
		<!-- LEFT BAR -->
		<aside id="left-col" class="uk-light uk-visible@m">
			<div class="left-logo uk-flex uk-flex-middle">
				<img class="custom-logo" src="img/dashboard-logo.svg" alt="">
			</div>
			<div class="left-content-box  content-box-dark">
				<img src="img/avatar.svg" alt="" class="uk-border-circle profile-img">
				<h4 class="uk-text-center uk-margin-remove-vertical text-light">{{ name }}</h4>

				<div class="uk-position-relative uk-text-center uk-display-block">
				    <a href="#" class="uk-text-small uk-text-muted uk-display-block uk-text-center" data-uk-icon="icon: triangle-down; ratio: 0.7">{{position}}</a>
				    <!-- user dropdown -->
				    <div class="uk-dropdown user-drop" data-uk-dropdown="mode: click; pos: bottom-center; animation: uk-animation-slide-bottom-small; duration: 150">
				    	<ul class="uk-nav uk-dropdown-nav uk-text-left">
								<li><a href="#"><span data-uk-icon="icon: info"></span> Summary</a></li>
								<li><a href="#"><span data-uk-icon="icon: refresh"></span> Edit</a></li>
								<li><a href="#"><span data-uk-icon="icon: settings"></span> Configuration</a></li>
								<li class="uk-nav-divider"></li>
								<li><a href="#"><span data-uk-icon="icon: image"></span> Your Data</a></li>
								<li class="uk-nav-divider"></li>
								<li><a href="#"><span data-uk-icon="icon: sign-out" @click="logout"></span> Sign Out </a></li>
					    </ul>
				    </div>
				    <!-- /user dropdown -->
				</div>
			</div>

			<div class="left-nav-wrap">
				<ul class="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
					<li class="uk-nav-header">Действия</li>
					<li><router-link :to="{name: 'Dashboard'}"><span data-uk-icon="icon: home" class="uk-margin-small-right"></span>Дашборд</router-link>						</li>
					<li><router-link :to="{name: 'Observes'}"><span data-uk-icon="icon: comments" class="uk-margin-small-right"></span>Наблюдение</router-link>						</li>
					<li><router-link :to="{name: 'Branches'}"><span data-uk-icon="icon: users" class="uk-margin-small-right" class-active="active"></span>Объекты</router-link>						</li>
					<li><router-link :to="{name: 'Departments'}"><span data-uk-icon="icon: users" class="uk-margin-small-right"></span>Отделы</router-link>						</li>
					<li><router-link :to="{name: 'Roles'}"><span data-uk-icon="icon: users" class="uk-margin-small-right"></span>Роли</router-link>						</li>
					<li><router-link :to="{name: 'Users'}"><span data-uk-icon="icon: users" class="uk-margin-small-right"></span>Пользователи</router-link>						</li>
				</ul>
				<div class="left-content-box uk-margin-top">

						<h5>Краткая статистика</h5>
						<div>
							<span class="uk-text-small">Traffic <small>(+50)</small></span>
							<progress class="uk-progress" value="50" max="100"></progress>
						</div>
						<div>
							<span class="uk-text-small">Income <small>(+78)</small></span>
							<progress class="uk-progress success" value="78" max="100"></progress>
						</div>
						<div>
							<span class="uk-text-small">Feedback <small>(-12)</small></span>
							<progress class="uk-progress warning" value="12" max="100"></progress>
						</div>

				</div>

			</div>
			<div class="bar-bottom">
				<ul class="uk-subnav uk-flex uk-flex-center uk-child-width-1-5" data-uk-grid>
					<li>
						<router-link :to="{name: 'Dashboard'}"><span class="uk-icon-link" data-uk-icon="icon: home"></span></router-link>
					</li>
					<li>
						<a href="#" class="uk-icon-link" data-uk-icon="icon: settings" title="Settings" data-uk-tooltip></a>
					</li>
					<li>
						<a href="#" class="uk-icon-link" data-uk-icon="icon: social"  title="Social" data-uk-tooltip></a>
					</li>

					<li>
						<a href="#" class="uk-icon-link" data-uk-tooltip="Sign out" data-uk-icon="icon: sign-out" @click="logout"></a>
					</li>
				</ul>
			</div>
		</aside>
		<!-- /LEFT BAR -->
</template>

<script>
import {authService} from "../../components/auth"
import {requestOptions} from "../../_helpers/request-options"
import {handleResponse} from "../../_helpers/handle-response"
import axios from "axios"

export default {
	setup() {
	},
	mounted() {
		axios
			.get(`${process.env.VUE_APP_API}/user/${authService.currentUserValue.uid}`, requestOptions.get())
			.then(response => {
				this.user = response.data.data
				this.name = this.user.name
				this.position = this.user.position
				})
			.catch(err => authService.logout())
	},
	data() {
		return {
			user: null,
			name: '',
			position: ''
		}
	},
	methods: {
		logout() {
			this.$router.push('/logout')
		}
	}

}
</script>

<style scope>
/* Active Navbar Link */
.router-link-active {
	border-left: 3px solid red
}
</style>