$(document).ready(function(){

	var isAjaxMocked=true;
	var brand;
	var brandSelect;
	var cheXiSelect;
	var paiLiangSelect;
	var shengchanriqiSelect;

	//函数定义区
	function step1(){
		$("#layerBackground").css({"display":"block"});
		$(".carStepLayer").css({display:"block"});

		//隐藏第二步
		$(".brandCrumb").css({display:"none"});
		$(".carNature").css({display:"none"});

		if ($(".carStepLayer").length > 0) {

			//增加字母索引
			if (isAjaxMocked) {
				$.mockjax({
					url:'/letter/letter.json',
					dataType:"json",
					responseText:
						[{"letterIndex":"热门",
						"imgUrls":
						[
						{"name":"大众","imgUrl":"dazhong.jpg"},
						{"name":"别克","imgUrl":"bieke.jpg"},
						{"name":"雪佛兰","imgUrl":"xuefulan.jpg"},
						{"name":"奥迪","imgUrl":"aodi.jpg"},
						{"name":"福特","imgUrl":"fute.jpg"}
						]}
						,
						{"letterIndex":"A",
						"imgUrls":
						[
						{"name":"奥迪","imgUrl":"aodi.jpg"}
						]}
						,
						{"letterIndex":"B",
						"imgUrls":
						[
						{"name":"保时捷","imgUrl":"baoshijie.jpg"},
						{"name":"别克","imgUrl":"bieke.jpg"},
						{"name":"北汽","imgUrl":"beiqi.jpg"},
						{"name":"奔腾","imgUrl":"benteng.jpg"},
						{"name":"奔驰","imgUrl":"benchi.jpg"}
						]}]
				});
			};

			$.ajax({url:"/letter/letter.json",
				dataType:"json",
				async:true,
				success:function(data) {
					brand=data;
					var letterHtml = "" ;
					var brandHtml = "";
					for (var i = 0; i < data.length; i++) {
						if (data[i].letterIndex == "热门") {
							letterHtml += "<li class='hotb chooseCur'>\
									<a href='#'>" + data[i].letterIndex + "</a>\
									<span></span>\
								</li>";
							for (var j= 0; j < data[i].imgUrls.length; j++) {

								brandHtml += "<li>\
										<a href='#'>\
											<dl>\
												<dt>\
													<img width='36' height='36' src='images/pinpai/" + data[i].imgUrls[j].imgUrl + "'>\
												</dt>\
												<dd>" + data[i].imgUrls[j].name + "</dd>\
											</dl>\
										</a>\
										</li>";
								
							};
							continue;
						};
						letterHtml += "<li class>\
									<a href='#'>" + data[i].letterIndex + "</a>\
									<span></span>\
								</li>";

					};
					$(".brandChoose ul").append(letterHtml);

					//添加热门列表
					$(".brandCompany ul").append(brandHtml);
			}});
		};
	}

	function step2(){

		$(".layerStep").attr("class","layerStep layerStep1");
		
		$(".brandChoose").css({display:"none"});
		$(".brandCompany").css({display:"none"});
		$(".brandCrumb").css({display:"block"});
		$(".carNature").css({display:"block"});
		$(".brandCrumb")

		if (isAjaxMocked) {
			$.mockjax({
				url:'/yaoche/chexi.json',
				dataType:"json",
				responseText:["GL1","GL2","GL3","GL4","GL5","GL6","GL7","GL8"]
			});
		};

		$.ajax({
			url:'/yaoche/chexi.json',
			dataType:"json",
			success:function(data){
				var chexiHtml = "";
				for (var i = 0; i < data.length; i++) {
					chexiHtml += "<li>\
							<a href='#'>" + data[i] + "</a>\
						</li>";
				};
				$(".carNature ul").append(chexiHtml);
			}
		});
	}

	function step3(){
		if ($(".layerStep").hasClass("layerStep1")) {
			$(".layerStep").removeClass("layerStep1").addClass("layerStep2");
		}else if($(".layerStep").hasClass("layerStep3")){
			$(".layerStep").removeClass("layerStep3").addClass("layerStep2");
		};

		$(".carNature ul").empty();

		if (isAjaxMocked) {
			$.mockjax({
				url:'/yaoche/pailiang.json',
				dataType:"json",
				responseText:["1.5L","1.6L","1.7L"]
			});
		};

		$.ajax({
			url:'/yaoche/pailiang.json',
			dataType:"json",
			success:function(data){
				var chexiHtml = "";
				for (var i = 0; i < data.length; i++) {
					chexiHtml += "<li>\
							<a href='#'>" + data[i] + "</a>\
						</li>";
				};
				$(".carNature ul").append(chexiHtml);
			}
		});
	}

	function init() {
		$(".layerStep").attr("class","layerStep");
		$(".brandChoose ul").empty();
		$(".brandCrumb p").remove();
		$(".brandCompany ul").empty();
		$(".carNature ul").empty();
	}

	function showLayer(){

	}

	function hideLayer(){
		$("#layerBackground").css({display:"none"});
		$(".carStepLayer").css({display:"none"});
	}

	function showStep1Brand() {
		$(".brandChoose").css({display:"block"});
		$(".brandCompany").css({display:"block"});
	}

	function hideStep1Brand(){
		$(".brandChoose").css({display:"none"});
		$(".brandCompany").css({display:"none"});
	}

	$("#layerBackground").css({display:"none"});
	$(".carStepLayer").css({display:"none"});
	$("a.carclose").css({display:"none"});

	$(".carName span").click(function(){
		init();
		showStep1Brand();
		step1();
	});

	//为字母索引添加事件监听
	$(".brandChoose ul").on('click','a',function() {
		$(this).parent().addClass("chooseCur").siblings().removeClass("chooseCur");
		var currentElement = $(this);
		for (var i = 0; i < brand.length; i++) {
			if(brand[i].letterIndex == currentElement[0].innerText){
				$(".brandCompany ul").empty();

				var brandHtml = "";
				for (var j= 0; j < brand[i].imgUrls.length; j++) {

							brandHtml += "<li>\
									<a href='#'>\
										<dl>\
											<dt>\
												<img width='36' height='36' src='images/pinpai/" + brand[i].imgUrls[j].imgUrl + "'>\
											</dt>\
											<dd>" + brand[i].imgUrls[j].name + "</dd>\
										</dl>\
									</a>\
									</li>";
							
						};
				$(".brandCompany ul").append(brandHtml);
				break;
			}
		};
	});

	//为第一步每个选项添加事件监听
	$(".brandCompany ul").on('click','a',function() {
		brandSelect=$(this)[0].innerText;

		var addHtml = "<p>" + brandSelect + "<a></a></p>";
		$(".c").before(addHtml);

		step2();
	});

	//为第二步每个选项添加事件监听
	$(".carNature ul").on('click','a',function() {

		if ($(".layerStep").hasClass("layerStep1")) {
			cheXiSelect=$(this)[0].innerText;

			var addHtml = "<p>" + cheXiSelect + "<a></a></p>";
			$(".c").before(addHtml);

			step3();
		}else if($(".layerStep").hasClass("layerStep2")){
			//为第三步每个选项添加事件监听
			$(".layerStep").removeClass("layerStep2").addClass("layerStep3");

			paiLiangSelect=$(this)[0].innerText;

			var addHtml = "<p>" + paiLiangSelect + "<a></a></p>";
			$(".c").before(addHtml);

			$(".carNature ul").empty();

			if (isAjaxMocked) {
				$.mockjax({
					url:'/yaoche/shengchanriqi.json',
					dataType:"json",
					responseText:["2010","2011","2012"]
				});
			};

			$.ajax({
				url:'/yaoche/shengchanriqi.json',
				dataType:"json",
				success:function(data){
					var chexiHtml = "";
					for (var i = 0; i < data.length; i++) {
						chexiHtml += "<li>\
								<a href='#'>" + data[i] + "</a>\
							</li>";
					};
					$(".carNature ul").append(chexiHtml);
				}
			});
		}else if($(".layerStep").hasClass("layerStep3")){

			$(".layerStep").attr("class","layerStep");

			shengchanriqiSelect=$(this)[0].innerText;

			$("#layerBackground").css({display:"none"});
			$(".carStepLayer").css({display:"none"});
			$(".brandChoose ul").empty();
			$(".carName span").html(brandSelect + " " + cheXiSelect + " " + paiLiangSelect + " " + shengchanriqiSelect);
			$("a.carclose").css({display:"block"});
		};

	});

	//为每一步的关闭符号添加响应事件
	$(".brandCrumb").on('click','a',function() {
		var index = $(this).parent().index();
		if (index == 1) {
			init();
			step1();
			showStep1Brand();
		}else if (index == 2) {
			$(".carNature ul").empty();
			var thisp=$(this).parent()
			thisp.nextAll("p").remove();
			thisp.remove();
			step2();
		}else if (index == 3) {
			$(this).parent().remove();
			step3();
		};
	});

	//操作完成后的重新选择
	$("a.carclose").click(function() {
		$(this).css({display:"none"});
		$(".carName span").html('<a href="javascript:void(0);" class="addcar" id="myam_btnshowchoosecar">新增车型</a>');
		$(".brandChoose").css({display:"block"});
		$(".brandCompany").css({display:"block"});

		$(".brandCompany ul").empty();
		$(".carNature ul").empty();
		$(".brandCrumb p").remove();

	});

	//点击关闭按钮的响应
	$("a.stepClose").click(function(){
		init();
		hideLayer();
		showStep1Brand();
	});
});