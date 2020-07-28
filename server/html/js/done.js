Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            info: `Authorization Complete. You may now close this window and return to your game.`,
        };
    },
    mounted() {
        window.history.replaceState(null, null, window.location.pathname);
    },
});
