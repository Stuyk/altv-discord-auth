$(document).ready(function() {
    alt.on('show', url => {
        $('#spinner').css('display', 'none');
        if ($('#discord').css('display') === 'none') {
            $('#discord').css('display', '');
        }
        $('#btn-register').attr('href', url);
    });
});

window.onload = () => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    if (fragment.has('access_token')) {
        const accessToken = fragment.get('access_token');
        const tokenType = fragment.get('token_type');

        fetch('https://discordapp.com/api/users/@me', {
            headers: {
                authorization: `${tokenType} ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(response => {
                delete response.flags;
                delete response.locale;
                delete response.mfa_enabled;
                delete response.public_flags;
                delete response.verified;
                delete response.discriminator;
                alt.emit('discord:connected:user', response);
            })
            .catch(() => {
                alt.emit('discord:destroy:failed');
            });
    }
};
