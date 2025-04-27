var toastrDemo = function() {
    toastr.options = {
        "progressBar": true,
        "positionClass": "toast-top-center"
    }

    setTimeout(function () {
        toastr.success('Let your ideas fly high!');
    }, 2000);

    setTimeout(function () {
        toastr.info('You have 7 unread message.');
    }, 4000);

    setTimeout(function () {
        toastr.warning('You have an upcomming appointment with Dr. iDea in 1 hour!');
    }, 10000);
}
