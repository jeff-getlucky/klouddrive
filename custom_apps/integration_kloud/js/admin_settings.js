(function(OC, OCA) {
    function saveSetting(id, value) {
        var xhr = new XMLHttpRequest()

        if (id === 'checked') {
            value = document.querySelector('#checked').checked
            xhr.open('POST', OC.generateUrl('/apps/integration_kloud/enabled'))
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send('checked=' + value)
        } else if (id === 'regenerate') {
            xhr.onreadystatechange = function(data) {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 300)) {
                        document.querySelector('#accesskey').value = JSON.parse(xhr.responseText)
                    }
                }
            }
            xhr.open('POST', OC.generateUrl('/apps/integration_kloud/regenerate'))
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send()
        }
    }

    OCA.Kloud = {
        initSettings: function() {
            const btn = document.querySelector('#copy');
            btn.addEventListener('click', () => {
                const input = document.querySelector('#accesskey');
                input.select();
                if (document.execCommand('copy')) {
                    document.execCommand('copy');
                    OC.dialogs.info(t('kloud', 'Copy successfully'), 'Kloud');
                }
            })
            const inputHandler = function(evt) { saveSetting(this.id, this.value) }
            document.querySelector('#checked').addEventListener('change', inputHandler)
            document.querySelector('#regenerate').addEventListener('click', inputHandler)
        }


    }

    document.addEventListener('DOMContentLoaded', OCA.Kloud.initSettings)
})(OC, OCA)
