document.addEventListener('deviceready', onDeviceReady, false);
let slideIndex = 0;

function onDeviceReady() {
  $('#sld1').hide();
  var myPath = cordova.file.externalRootDirectory + "/Meds";
  console.log(myPath);

  window.resolveLocalFileSystemURL(myPath, function (dirEntry) {
    console.log("opended directory");
    var directoryReader = dirEntry.createReader();
    directoryReader.readEntries(onSuccessCallback, onFailCallback);
  });


  function onSuccessCallback(entries) {
    console.log(entries);
    window.kk = entries;
    for (var j = 0; j < entries.length; j++) {

      if (entries[j].isFile) {
        console.log("inn1");
        for (var k = j + 1; k < entries.length; k++) {
          if (entries[k].isFile) {
            console.log("inn2")
            if (entries[j].name > entries[k].name) {
              console.log("swapping");
              var temp = entries[j];
              entries[j] = entries[k];
              entries[k] = temp;
            }
          }
        }
      }
    }
    console.log(entries);
    for (var i = 0; i < entries.length; i++) {
      var entrie = entries[i];
      if (entrie.isFile) {
        console.log(entrie.nativeURL);
        var imgTag = document.createElement('img');
        imgTag.src = entrie.toURL();
        imgTag.setAttribute("iname", entrie.name);
        imgTag.onclick
        console.log('ADDITION');
        document.getElementById('img-container').append(imgTag);
      }
    }
  }

  function onFailCallback() {

  }

  let count = 0;
  $('.cat').click(function () {
    console.log("CATEGORIZING");
    var cat = this.value;
    var k;
    console.log(cat);
    console.log(index);
    var imag = document.getElementsByTagName("img");
    console.log(imag);
    for (var j = 0; j < imag.length; j++) {
      var imag_src = imag[j].getAttribute("src");
      var src_splt = imag_src.split('/');
      var name_str = src_splt[(src_splt.length) - 1];
      var dot_splt = name_str.split('.');
      var filename = dot_splt[0];
      var categories = filename.split('-');
      console.log(categories);
      for (k = 1; k < categories.length; k++) {
        categories[k].trim();
        if (categories[k] == cat) {
          console.log('EXIST');
          if (($(imag[j]).hasClass('selected')) == false) {
            $(imag[j]).addClass('selected');
            count = count + 1;
            $('#select_count').html(count);
          }
        }
      }
    }
  });

  $('#img-container').on("click", "img", function () {
    console.log('img onclick');

    if ($(this).hasClass("selected")) {
      $(this).removeClass("selected");
      count = count - 1;
      $('#select_count').html(count);
    }
    else {
      $(this).addClass("selected");
      count = count + 1;
      $('#select_count').html(count);
    }

  });
  let order = 0;
  let srcs = [];
  let index = 0;
  let slides;
  let i;

  $('#setSelection').click(function () {
    var imgs = document.getElementsByTagName('img');
    console.log(imgs);
    for (i = 0; i < imgs.length; i++) {
      $(imgs[i]).addClass("selected");
    }
    count = imgs.length
    $('#select_count').html(count);
  });

  $('#rst').click(function () {
    window.location.reload();
  });

  $('#bck1').click(function () {
    $('#sld1').hide();
    $('#nav-bar').show();
    $('.app').show();
    $('#img-container').show();
    slides = [];
    console.log(slides[0]);
    order = 0;
  });

  $('#bck2').click(function () {
    $('#sld1').show();
    $('.app').hide();
    $('#img-container').hide();
    $('#sldshow').hide();
    $('#slides').html("");
    slideIndex = 0;
  });

  $('#ord').click(function () {
    $('.app').hide();
    $('#img-container').hide();
    $('#nav-bar').hide();
    $('#sld1').show();
    srcs = [];
    var selected = $('#img-container .selected');
    $('#sorted_div').html("");
    for (var i = 0; i < selected.length; i++) {
      // temp_div1.append(selected[i]);
      var temp_div = document.createElement("div");
      temp_div.setAttribute("class", "selected_div");
      var img_src = selected[i].getAttribute("src");
      var temp_img = document.createElement("img");
      temp_img.setAttribute("src", img_src);
      temp_img.setAttribute("class", "mov_selected")
      temp_div.appendChild(temp_img);
      $('#sorted_div').append(temp_div);
    }

    $('.selected_div').click(function () {

      console.log("Click!");
      var div_elemt = $(this);
      var checker = div_elemt[0].getAttribute("style");
      var temp = div_elemt[0].childNodes;
      if (checker) {
        console.log("checked!");
        return;
      }
      else {
        console.log("numberedInn!");
        srcs.push(div_elemt);
        console.log(srcs);
        order = order + 1;
        div_elemt[0].setAttribute("style", "--me-text-number:" + order + ";");
      }
    });
  }
  );

  $('#srt').click(function () {
    for (i = (srcs.length) - 1; i >= 0; i--) {
      $('#sorted_div').prepend(srcs[i]);
      srcs[i].removeAttr("style");
    }
    srcs = [];
    order = 0;
  });
  function add_title()
  {
      var temp_div = document.createElement("div");
      temp_div.setAttribute("class", "sel");
      var temp_img = document.createElement("img");
      temp_img.setAttribute("src", "../img/Title.jpg");
      temp_div.appendChild(temp_img);
      $('#slides').append(temp_div);
      temp_img = document.createElement("img");
      temp_img.setAttribute("src", "../img/Title.jpg");
      temp_img.setAttribute("sld-id", '0');
      $('#film').append(temp_img);
  }
  $('#shw').click(function () {
    $('.app').hide();
    $('#img-container').hide();
    $('#sld1').hide();
    $('#sldshow').show();
    $('#film').html('');
    var selected = $('#sorted_div img');
    console.log(selected);
    add_title();
    for (var i = 0; i < selected.length; i++) 
    {
      var temp_div = document.createElement("div");
      temp_div.setAttribute("class", "sel");
      var img_src = selected[i].getAttribute("src");
      var temp_img = document.createElement("img");
      temp_img.setAttribute("src", img_src);
      temp_img.setAttribute("sld-id", i+1);
      temp_div.appendChild(temp_img);
      $('#slides').append(temp_div);
      temp_img = document.createElement("img");
      temp_img.setAttribute("src", img_src);
      temp_img.setAttribute("sld-id", i+1);
      $('#film').append(temp_img);
    }
    slides = document.getElementsByClassName("sel");
    showSlides(slideIndex);
  });

  $("#sldshow").on("swipeup", function () {
    console.log("SWIPEUP!");
  });

  // $(document).on("pagecreate","#sldshow",function() {
  $("#slides").on("swipeleft", function () {
    showSlides(slideIndex + 1);
  });

  $("#slides").on("swiperight", function () {
    showSlides(slideIndex - 1);
  });
  $("#sldshow").dblclick(function () {
    var flm = $('#film-outer');
    if (flm.is(':visible')) {
      flm.hide();
    } else {
      flm.show();
    }
  });

  $('#plusSlides').click(function () {
    showSlides(slideIndex + 1);
  });

  $('#minusSlides').click(function () {
    showSlides(slideIndex - 1);
  });

  function showSlides(n) {

    if (n >= slides.length || n < 0) {
      return;
    }
    slideIndex = n;
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    $('#film .brdr').removeClass('brdr');
    $($('#film [sld-id]')[n]).addClass('brdr');
  }
  $('#film').on('click', '[sld-id]', function () {
    showSlides(parseInt($(this).attr('sld-id')));
  });

  $('#srch').click(function () {
    let i;
    let element;
    var imagesArray = $('[iname]');
    var search_input = $('#myInput');
    var searched = search_input.val();
    var search_for = searched.toUpperCase();
    console.log(imagesArray);
    console.log(search_for);
    for (i = 0; i < imagesArray.length; i++) {
      element = imagesArray[i];
      var filename = element.getAttribute('iname');
      var fetched = filename.toUpperCase();
      if (search_for === fetched) {
        $(element).addClass("selected");
      }
    }
  });

}


