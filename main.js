var yourDay = {};

// THIS IS THE TOP STORY API KEY
yourDay.apikey = '7aa5e80dc39a69657c4cd1c4cad7ba25:11:73218257';

yourDay.getinfo = function (theUserDate) {

	// http://api.nytimes.com/svc/search/v2/articlesearch.response-format?[q=search term&fq=filter-field:(filter-term)&additional-params=values]&api-key=####
	// var apiurl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
	$.ajax({
		url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news desk:("front-page")&api-key=7aa5e80dc39a69657c4cd1c4cad7ba25:11:73218257',
		// url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:("Front-Page")&fq=source:("The New York Times")&api-key=7aa5e80dc39a69657c4cd1c4cad7ba25:11:73218257',

		method: 'GET',
		dataType: 'json',
		data: {
			// 'fq': 'section_name("Front Page")',
			begin_date: theUserDate,
			end_date: theUserDate,
			// 'facet_filter': 'true',
			// 'source': 'The New York Times',
			// 'print_page': 1,
		}
		
	}).then(function(res) {
		// console.log(res);
		yourDay.displayInfo(res.response.docs[0]);
	});
};

yourDay.displayInfo = function (importantInfo) {
	$('.your_date').text(importantInfo.headline.main);
	$('.your_snippet').text(importantInfo.snippet);
};


yourDay.formSumbit = function () {
	$('.find_date').on('submit', function(event) {
		event.preventDefault();
		var theUserDate = $('#birthyear').val()+$('#birthmonth').val()+$('#birthday').val();
		$('.reply').removeClass('hide');	
		yourDay.getinfo(theUserDate);
	});
};


$('.close').click (function() {
	$('.reply').addClass('hide');
});



yourDay.init = function() {
	yourDay.getinfo();
	yourDay.formSumbit();
};



$(document).ready(function() {
	yourDay.init();
});