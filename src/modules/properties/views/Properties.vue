<template>
	<div class="text-secondary px-4 text-center">
		<div class="py-3">
			<h1 class="display-5 custom-title">Deseja anunciar um imóvel para contato ou avaliação?</h1>
			<div class="col-lg-8 mx-auto">
				<p class="fs-5 mb-4 custom-subtitle">Anuncie gratuitamente imóveis no WebQuartinho. Iremos encontrar pessoas
					que
					estejam interessadas em avaliar ou entrar em contato.</p>
				<div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
					<a class="link-underline link-underline-opacity-0" href="/properties/add">
						<button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">
							Quero Anunciar
						</button>
					</a>
				</div>
			</div>
		</div>
	</div>
	<hr class="mt-4 mb-8" id="">
	<div class="row text-center">
		<div class="col-xs-12">
			<h3 class="fw-semibold custom-section">Anúncios em Destaque</h3>
			<div class="custom-border"></div>
			<p class="text-muted">No WebQuartinho você encontra anúncios de imóveis para entrar em contato ou avaliar.
				Encontre um que combine com você. </p>
		</div>
	</div>
	<FilterBar :options="optionsFilter" @filter-applied="applyFilter" />
	<ListProperties :properties="propertiesList" />
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions, mapGetters } from 'vuex';
import FilterBar from '../../../components/filterBar/FilterBar.vue';
import ListProperties from '../../../components/list/List.vue'

export default {
	name: 'PropertiesPage',
	components: {
		ListProperties,
		FilterBar,
	},
	data() {
		return {
			optionsFilter: [
				{ value: 'highest_rating', text: 'Maiores notas' },
				{ value: 'lowest_rating', text: 'Menores notas' },
				{ value: 'most_comments', text: 'Mais comentados' },
				{ value: 'least_comments', text: 'Menos comentados' },
				{ value: 'highest_price', text: 'Maiores Preços' },
				{ value: 'lowest_price', text: 'Menores Preços' },
			]
		};
	},
	setup() {
		const toast = useToast();
		return { toast };
	},
	computed: {
		propertiesList() {
			return this.properties()
		}
	},
	async created() {
		try {
			await this.getProperties();
		} catch (error) {
			throw new Error(error)
		}
		if (this.$route.query.loginNow === 'true') {
			this.toast.success("Login Realizado com Sucesso!");
			this.$router.replace({ query: { ...this.$route.query, loginNow: undefined } });
		}
		if (this.$route.query.permission === 'denied') {
			this.toast.error("Você não tem permissão para acessar esse recurso!");
			this.$router.replace({ query: { ...this.$route.query, permission: undefined } });
		}
	},
	methods: {
		...mapActions(['getProperties']),
		...mapGetters(['properties']),
		async applyFilter(filterValue) {
			try {
				await this.getProperties({ filter: filterValue });
				if (filterValue === '') {
					this.toast.success("O filtro foi limpo com sucesso!");
				} else {
					this.toast.success("Filtro Aplicado!");
				}
			} catch (error) {
				console.error(error);
				this.toast.error("Erro ao aplicar o filtro.");
			}
		},
	},
}
</script>

<style scoped>
.custom-border {
	height: 4px;
	width: 48px;
	border-radius: 5px;
	background-color: #7fc1fc;
	display: block;
	margin-right: auto;
	margin-left: auto;
	margin-bottom: 30px;
}

.custom-section {
	font-size: 24px;
	color: #505458;
	margin: 10px 0;
}

.custom-title {
	opacity: 1;
	font-size: 46px;
	color: #505458;
	font-weight: 600;
}

.custom-subtitle {
	opacity: 1;
	text-align: center;
	margin-top: 0;
	color: #505458;
	font-weight: 600;
}
</style>
