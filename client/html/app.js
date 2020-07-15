Vue.config.devtools = true;
Vue.prototype.window = window;

const app = new Vue({
    el: '#app',
    data() {
        return {
            show: false,
            info: `This server utilizes Discord for its Authentication service. Clicking the button below will open your browser to begin the authentication process.`,
        };
    },
    methods: {
        setReady(url) {
            this.show = true;
            this.url = url;
        },
        beginAuth() {
            if (!this.url) {
                return;
            }

            this.show = false;
            window.open(this.url);
        },
    },
    mounted() {
        if ('alt' in window) {
            alt.on('discord:Ready', this.setReady);
            alt.emit('discord:Ready');
        } else {
            this.setReady();
        }
    },
});
