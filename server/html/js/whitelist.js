Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            info: `Looks like you're not authorized to join this server. Visit our website to get whitelisted.`,
            url: `https://stuyk.com/`,
        };
    },
    methods: {
        openWebsite() {
            window.open(this.url);
        },
    },
    mounted() {
        window.history.replaceState(null, null, window.location.pathname);
    },
});
