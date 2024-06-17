$(document).ready(function() {
    $('.passwordToggle').click(() => {
        $('.passwordToggle').toggleClass('fa-eye-slash')
        $('.passwordToggle').toggleClass('fa-eye')
        toggle_password()
    })
})

function toggle_password() {
    if($('.pwd').attr('type') == 'password')
    {
        $('.pwd').attr('type', 'text')
    }
    else
    {
        $('.pwd').attr('type', 'password')
    }
}