import $ from 'jquery';

export default function Scripts() {

  $(function () {

    // variables
    let $window = $(window);
    // let $html = $("html");
    // let $body = $("body");
    // let $header = $(".header");
    let width_max = 1600;
    let width_xl = 1200;
    let width_lg = 992;
    let width_md = 768;
    let width_sm = 576;

    // all

    // max
    if ($window.width() >= width_max) {
    }
    // xl
    if ($window.width() < width_max) {
    }
    // lg
    if ($window.width() < width_xl) {
    }
    // md
    if ($window.width() < width_lg) {
      $('.navbar-nav').find('.nav-link').on('click', function() {
        console.log('click')
        $('.navbar-toggler').trigger('click');
      });
    }
    // sm
    if ($window.width() < width_md) {
    }
    // xs
    if ($window.width() < width_sm) {
    }

  });

}