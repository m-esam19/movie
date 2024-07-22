let searchInput = $("#searchInput");
let nameInput = $("#name");
let passwordInput = $("#password");
let rePasswordInput = $("#rePassword");
let showPassword = $("#showPassword");
let nav = $("nav");
let sideMenu = $("#side-menu");
let link = $(".main-links li");
let openSideMenuBtn = $("#openSideMenuBtn");
let closeSideMenuBtn = $("#closeSideMenuBtn");
let errorSpan = $(".error");
let submitBtn = $(".submit");
let nameRegex = /^[a-zA-Z \t]{1,30}$/;
let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
let phoneRegx = /^0(12|11|15)\d{8}$/;
let ageRegx =/^([1-9][7-9]|[2-9]\d)$/;
let passwordRegx =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;



openSideMenuBtn.click(function() {
    nav.css("margin-left","250px");
    sideMenu.css("margin-left","0");
    link.addClass("animate__bounceInUp")
    link.removeClass("animate__fadeOutBottomLeft");

    openSideMenuBtn.toggleClass("d-none");
    closeSideMenuBtn.toggleClass("d-none");

})


closeSideMenuBtn.click(function() {
    nav.css("margin-left","0");
    sideMenu.css("margin-left","-250px");
    openSideMenuBtn.toggleClass("d-none");
    closeSideMenuBtn.toggleClass("d-none");
    link.removeClass("animate__bounceInUp");
    link.addClass("animate__fadeOutBottomLeft");

})




$(".main-links li a").click(function(e) {
    e.preventDefault();
    let sec = $(this).attr("sec");
    getMovies(sec);
});

let moviesArr = [];

async function getMovies (section = "now_playing") {

    let data = await fetch(`https://api.themoviedb.org/3/movie/${section}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    data =  await data.json();
    moviesArr = Array.from(data.results);
    displayMovies();
}



function displayMovies() {
    let cartoona = "";
    for(let i = 0; i < moviesArr.length; i++) {
        cartoona += `
            <div class="col-lg-4 col-md-6">
                <div class="item position-relative py-3" id="item">
                    <div class="image-container rounded-2 overflow-hidden position-relative">
                        <img src="https://image.tmdb.org/t/p/w500${ moviesArr[i].poster_path}" class="w-100" alt="">
                    </div>
                    <div class="caption position-absolute start-0 top-0 p-3">
                        <h1 class="text-center animate__animated animate__fadeInDown fw-semibold pt-3">${moviesArr[i].title != undefined ? moviesArr[i].title : moviesArr[i].name }</h1>
                        <p class="animate__animated animate__fadeIn">${moviesArr[i].overview}</p>
                        <div class="stars animate__animated animate__fadeInUp">
                            <span class="none-selected release-date">Release Date: ${moviesArr[i].release_date != undefined ? moviesArr[i].release_date : moviesArr[i].first_air_date }</span>
                            <div class="icons">
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                            </div>
                            <h3 class="evaluate">${Math.round(moviesArr[i].vote_average * 10) / 10}</h3>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    $("#movies").html(cartoona);
}

getMovies();

/* Start Animation */
$("#movies").on("mouseenter", ".item", function() {
    $(this).find(".caption h1").removeClass("animate__fadeOutLeft").addClass("animate__animated animate__fadeInDown");
    $(this).find(".caption p").removeClass("animate__fadeOutLeft").addClass("animate__animated animate__fadeIn");
    $(this).find(".stars").removeClass("animate__fadeOutLeft").addClass("animate__animated animate__fadeInUp");
    $(this).find(".caption").show();
});

$("#movies").on("mouseleave", ".item", function() {
    $(this).find(".caption h1").removeClass("animate__fadeInDown").addClass("animate__animated animate__fadeOutLeft");
    $(this).find(".caption p").removeClass("animate__fadeIn").addClass("animate__animated animate__fadeOutLeft");
    $(this).find(".stars").removeClass("animate__fadeInUp").addClass("animate__animated animate__fadeOutLeft");
});
/* End Animation */


/*Start Search Section*/
searchInput.keyup(function() {
    searchMovies(searchInput.val())
})

async function searchMovies (search) {
    let data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    data =  await data.json();
    moviesArr = Array.from(data.results);
    displayMovies();
}
/*End Search Section*/
$("input").keyup(function(e) {
    let that = $(this);
    if($(this).attr("id") == 'name') {
        if(!nameRegex.test($(this).val())) {
            errorValidation(that)
        }else {
            successValidation(that);
        }
    }
    if($(this).attr("id") == 'email') {
        if(!emailRegex.test($(this).val())) {
            errorValidation(that);
        }else {
            successValidation(that);
        }
    }
    if($(this).attr("id") == 'Phone') {
        if(!phoneRegx.test($(this).val())) {
            errorValidation(that);
        }else {
            successValidation(that);
        }
    }
    if($(this).attr("id") == 'age') {
        if(!ageRegx.test($(this).val())) {
            errorValidation(that);
        }else {
            successValidation(that);
        }
    }
    if($(this).attr("id") == 'password') {
        if(!passwordRegx.test($(this).val())) {
            errorValidation(that);
        }else {
            successValidation(that);
        }
    }
    if($(this).attr("id") == 'rePassword') {
        if((passwordInput.val() == rePasswordInput.val())) {
            successValidation(that);
        }else {
            errorValidation(that);
        }
    }
});

function successValidation(that) {
    that.css("border-bottom-color" , "#fff");
    that.next("span").css("display", "none");
    
    that.next("span").css("visibility", "hidden");

    if(errorSpan.css("visibility") === "visible") {
        if (submitBtn.hasClass('btn-dark')) {
            submitBtn.addClass('btn-danger');
            submitBtn.removeClass('btn-dark');
        }
    }else {
        submitBtn.removeClass('btn-danger');
        submitBtn.addClass('btn-dark');
    }


}

function errorValidation(that) {
    that.css("border-bottom-color" , "#B02A37");
    that.next("span").css("visibility", "visible");
    
    if (!submitBtn.hasClass('btn-danger')) {
        submitBtn.addClass('btn-danger');
        submitBtn.removeClass('btn-dark');
    }
    if (!submitBtn.hasClass('animate__shakeX')) {
        submitBtn.addClass('animate__shakeX');
    }
}

passwordInput.focus(function() {
    $(this).nextAll("i.show-password").css({
        "opacity": "1",
        "top": "15px"
    });
});

// عند التركيز على حقل الإدخال
passwordInput.focus(function() {
    $(this).nextAll("i.show-password").css({
        "opacity": "1",
        "bottom": "5px"
    });
});

// عند النقر على الأيقونة لتبديل الإظهار/الإخفاء
showPassword.mousedown(function() {
    passwordInput.focus(); // للحفاظ على التركيز على حقل الإدخال
});

showPassword.click(function() {
    if (passwordInput.attr("type") === "password") {
        passwordInput.attr("type", "text");
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
        passwordInput.attr("type", "password");
        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    }
});

$(function() {
    setTimeout(() => {
        $('.loading').hide();
    }, 800);


    var backToTop = $("#back-to-top");

    $(window).scroll(function() {
        if ($(window).scrollTop() > 100) {
            backToTop.addClass("active");
        } else {
            backToTop.removeClass("active");
        }
    });

    backToTop.click(function(e) {
        e.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, 500);
    });

})



