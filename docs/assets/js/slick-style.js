$('.popular-dishes').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });