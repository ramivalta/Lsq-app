/* Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}; */

function viewModel () {
	var self = this;
	
	self.playerOne = ko.observable("Pelaaja 1");
	self.playerTwo = ko.observable("Pelaaja 2");
	self.playerOneScore = ko.observable(0);
	self.playerTwoScore = ko.observable(0);
	
	self.playerOneSlider = ko.observable(0);
	self.playerTwoSlider = ko.observable(0);
	
//	self.playerOneGamesWon = ko.observable(0);
//	self.playerTwoGamesWon = ko.observable(0);
	
	self.currentGameNumber = ko.observable(1);
	
	self.bestOf = ko.observable("5");
	
/*	var el = {
		playerOneScore :  ko.observable(0),
		playerTwoScore : ko.observable(0),
		gameNumber : ko.observable(0),
		stroke : ko.observable(0),
		yesLet : ko.observable(0),
		noLet : ko.observable(0),
		serveSide : ko.observable(0),
		handOut : ko.observable(0),
		server : ko.observable(0),
		playerOneGamesWon : ko.observable(0),
		playerTwoGamesWon : ko.observable(0),
		gameBall : ko.observable(false),
		gameOver : ko.observable(false)
	}; */

	
	self.scoreBoard = ko.observableArray([]);
//	self.scoreBoard().push(el);
/*		playerOneScore =  ko.observable(0),
		playerTwoScore = ko.observable(0),
		gameNumber = ko.observable(0),
		stroke = ko.observable(0),
		yesLet = ko.observable(0),
		noLet = ko.observable(0),
		serveSide = ko.observable(0),
		handOut = ko.observable(0),
		server = ko.observable(0),
		playerOneGamesWon = ko.observable(0),
		playerTwoGamesWon = ko.observable(0),
		gameBall = ko.observable(false),
		gameOver = ko.observable(false)
	]); */
	
	self.myScroll = [];
	var sliderMoved = false;	


	self.sliderMove = function () {
		
	};

	self.gameScores = ko.observableArray([]);
	
	self.playerOneUpScore = function(tuomio) {
	
		if (tuomio !== 'undefined') {
			self.closeCallsPopup();
		}
	
//		console.log(tuomio);
	
		var yeslet = false;
		var nolet = false;		
		var stroke = false;		
	
		if (tuomio === "yeslet") {
			yeslet = true;
		}
		if (tuomio === "nolet") {
			nolet = true;
		}
		if (tuomio === "stroke") {
			stroke = true;
		}

		var l = self.scoreBoard().length;
		var score, p2score;
			
		if (l === 0) {
			if (yeslet === true) {
				score = 0;
				p2score = 0;
			}

			else if (nolet === true) {
				score = 0;
				p2score = 1;
			}
			
			else {
				score = 1;
				p2score = 0;
			}
		}
		else {
			if (self.scoreBoard()[l -1].gameOver() === true) {
				if (nolet === true) {
					score = 0;
					p2score = 1;
				}
				else if (yeslet === true) {
					score = 0;
					p2score = 0;
				}
				else {
					score = 1;
					p2score = 0;
				}
			}
			else {
				if (yeslet === true) {
					score = self.scoreBoard()[l -1].playerOneScore();
					p2score = self.scoreBoard()[l - 1].playerTwoScore();	
				}
				else if (nolet === true) {
					score = self.scoreBoard()[l - 1].playerOneScore();
					p2score = self.scoreBoard()[l - 1].playerTwoScore() + 1;
				}
				else { 
					score = self.scoreBoard()[l -1].playerOneScore() + 1;
					p2score = self.scoreBoard()[l - 1].playerTwoScore();	
				}
			}
				
			if (self.matchSet() === "p1" || self.matchSet() === "p2") return;
		}
			
		self.playerOneScore(score);
		self.playerTwoScore(p2score);
				
		var el = {};
		el.playerOneScore = ko.observable(score);
		el.playerTwoScore = ko.observable(p2score);
		el.gameNumber = ko.observable(self.currentGameNumber());

		el.playerOneStroke = ko.observable(stroke);
		el.playerOneYesLet = ko.observable(yeslet);
		el.playerOneNoLet = ko.observable(nolet);
		el.playerTwoStroke = ko.observable();
		el.playerTwoYesLet = ko.observable();
		el.playerTwoNoLet = ko.observable();					

		el.serveSide = ko.observable();
		el.handOut = ko.observable();
		el.server = ko.observable();
		el.playerOneGamesWon = ko.observable(self.playerOneGamesWon());
		el.playerTwoGamesWon = ko.observable(self.playerTwoGamesWon());
		el.gameBall = ko.observable(false);
		el.gameOver = ko.observable(false);
		
//		console.log(el.playerOneYesLet());
			
		if (self.gameBall() === true)  el.gameBall(true);
				
		if (self.gameSet() === "p1") {
			var games = {};
			games.p1score = self.playerOneScore();
			games.p2score = self.playerTwoScore();
			self.gameScores.push(games);
//			self.playerOneGamesWon(self.playerOneGamesWon() + 1);
			el.playerOneGamesWon(self.playerOneGamesWon() + 1);
			el.playerTwoGamesWon(self.playerTwoGamesWon());
			self.playerOneScore(0);
			self.playerTwoScore(0);
			el.playerOneScore(score);
			el.playerTwoScore(p2score);
			el.gameOver(true);
			
			
		}
		
		if (self.gameSet() === "p2") {
			var games = {};
			games.p1score = self.playerOneScore();
			games.p2score = self.playerTwoScore();
			self.gameScores.push(games);			
//			self.playerTwoGamesWon(self.playerTwoGamesWon() + 1);
			el.playerTwoGamesWon(self.playerTwoGamesWon() + 1);			
			el.playerOneGamesWon(self.playerOneGamesWon());
			self.playerOneScore(0);
			self.playerTwoScore(0);
			el.playerOneScore(score);
			el.playerTwoScore(p2score);
			el.gameOver(true);
		}
		

				
		self.scoreBoard.push(el);
		
	};
	
	self.playerTwoUpScore = function (tuomio) {
	
		if (tuomio !== 'undefined') {
			self.closeCallsPopup();
		}
	
		var yeslet = false;
		var nolet = false;		
		var stroke = false;		
	
		if (tuomio === "yeslet") {
			yeslet = true;
		}
		if (tuomio === "nolet") {
			nolet = true;
		}
		if (tuomio === "stroke") {
			stroke = true;
		}
	
		var l = self.scoreBoard().length;
	
		var score, p1score;
	
		if (l === 0) {
			if (yeslet === true) {
				score = 0;
				p1score = 0;
			}

			else if (nolet === true) {
				score = 0;
				p1score = 1;
			}
			
			else {
				score = 1;
				p1score = 0;
			}
		}
		else {
			if (self.scoreBoard()[l -1].gameOver() === true) {
				if (nolet === true) {
					score = 0;
					p1score = 1;
				}
				else if (yeslet === true) {
					score = 0;
					p1score = 0;
				}
				else {
					score = 1;
					p1score = 0;
				}
			}
			else {
				if (yeslet === true) {
					score = self.scoreBoard()[l -1].playerTwoScore();
					p1score = self.scoreBoard()[l - 1].playerOneScore();	
				}
				else if (nolet === true) {
					score = self.scoreBoard()[l - 1].playerTwoScore();
					p1score = self.scoreBoard()[l - 1].playerOneScore() + 1;
				}
				else { 
					score = self.scoreBoard()[l -1].playerTwoScore() + 1;
					p1score = self.scoreBoard()[l - 1].playerOneScore();	
				}
			}
				
			if (self.matchSet() === "p1" || self.matchSet() === "p2") return;
		}
			
		self.playerOneScore(p1score);
		self.playerTwoScore(score);
		
		var el = {};
			el.playerTwoScore = ko.observable(score);
			el.playerOneScore = ko.observable(p1score);
			el.gameNumber = ko.observable(self.currentGameNumber());

			el.playerOneStroke = ko.observable();
			el.playerOneYesLet = ko.observable();
			el.playerOneNoLet = ko.observable();
			
			el.playerTwoStroke = ko.observable(stroke);
			el.playerTwoYesLet = ko.observable(yeslet);
			el.playerTwoNoLet = ko.observable(nolet);					
			
			el.serveSide = ko.observable();
			el.handOut = ko.observable();
			el.server = ko.observable();
			el.playerOneGamesWon = ko.observable(self.playerOneGamesWon());
			el.playerTwoGamesWon = ko.observable(self.playerTwoGamesWon());
			el.gameBall = ko.observable(false);
			el.gameOver = ko.observable(false);
			
		
		if (self.gameBall() === true) 
			el.gameBall(true);
		
		if (self.gameSet() === "p1") {
//			self.playerOneGamesWon(self.playerOneGamesWon() + 1);
			el.playerOneGamesWon(self.playerOneGamesWon() + 1);
			el.playerTwoGamesWon(self.playerTwoGamesWon());
			self.playerOneScore(0);
			self.playerTwoScore(0);
			el.playerOneScore(p1score);
			el.playerTwoScore(score);

			el.gameOver(true);
		}
		
		if (self.gameSet() === "p2") {
//			self.playerTwoGamesWon(self.playerTwoGamesWon() + 1);
			el.playerTwoGamesWon(self.playerTwoGamesWon() + 1);			
			el.playerOneGamesWon(self.playerOneGamesWon());
			self.playerOneScore(0);
			self.playerTwoScore(0);
			el.playerOneScore(p1score);
			el.playerTwoScore(score);

			el.gameOver(true);
		}
		
		self.scoreBoard.push(el);		
	}
	
	self.refreshScroll = ko.computed(function() {
		var l = ko.observable(self.scoreBoard().length);
		
		setTimeout(function () {
			if ($.mobile.activePage[0].id in self.myScroll) {
				self.myScroll['main'].refresh();
//						self.myScroll['main'].scrollTo(0, 23, 50, true);
				var wrapH = $("#scroller").height();
				var y = self.myScroll['main'].maxScrollY;
//				console.log("computed refresh");
						
				if (y < 0) {
					self.myScroll['main'].scrollTo(0, self.myScroll['main'].maxScrollY, 350);
					}
				}
		}, 0);
		
	}).extend( { throttle: 1 });
	
	self.playerOneSliderMove = function () {
		if (sliderMoved == false) {
			var sVal = parseInt(self.playerOneSlider(), 10);
			
			if (sVal <50 && sVal >= 20){
				self.playerOneUpScore();
				sliderMoved = true;
			}
		}
	}

	self.playerTwoSliderMove = function () {
		if (sliderMoved == false) {

			
			var sVal = parseInt(self.playerTwoSlider(), 10);
			
			if (sVal <50 && sVal >= 20){
				self.playerTwoUpScore();
				sliderMoved = true;
			}
		}
	}	
	
	self.resetSlider = function() {
		self.playerOneSlider = ko.observable(0);
		self.playerTwoSlider = ko.observable(0);
		$(".slaidi").slider('option', 'value', 0); 
		sliderMoved = false;
	}
	
	self.gameBall = ko.computed(function () {
		var p1 = self.playerOneScore();
		var p2 = self.playerTwoScore();
		
/*		var l = self.scoreBoard().length;
		if (l > 0) {
			p1 = self.scoreBoard()[l - 1].playerOneScore();
			p2 = self.scoreBoard()[l - 1].playerTwoScore();			
		} */
		
		if ((p1 === 10 && p2 < 10) || (p2 === 10 && p1 < 10)) {
			var x = Math.abs(p1 - p2);
//			console.log("game ball: p1: " + p1 + " p2: " + p2 + " ero: " + x);
			if (x >= 1) {
				return true;
			}
			else return false;
		}
		
		else if (p1 >= 10 && p2 >= 10) {
			var y = Math.abs(p1 - p2);
//			console.log("asasd " + y);
			if (y >= 1) {
				return true;
			}
			else return false;
		}
		else return false;
	});
	
	self.gameSet = ko.computed(function() {
		var p1 = self.playerOneScore();
		var p2 = self.playerTwoScore();

		var l = self.scoreBoard().length;
		
/*		if (l > 0) {
			console.log(p1 + " " + p2);
			p1 = self.scoreBoard()[l - 1].playerOneScore();
			p2 = self.scoreBoard()[l - 1].playerTwoScore();			
			console.log(p1 + " " + p2);
		} */
		
		if (p1 >= 11 || p2 >= 11) {
			if (p1 - p2 >= 2) {
				return("p1");
			}
			else if (p2 - p1 >= 2) {
				return ("p2");
			}
		}
		else return;
	});
	
	
	self.undo = function() {
		if (self.scoreBoard().length > 1) {
			var x = self.scoreBoard().length;
			
/*			console.log("length: " + x);
			console.log("index: " + (x - 1)); */
			
//			self.scoreBoard.splice(x - 1, 1);
			self.scoreBoard.pop();
			
			x = self.scoreBoard().length;
			
			if (self.gameSet() === "p1" || self.gameSet() === "p2") {
//				self.playerOneGamesWon(self.scoreBoard()[x - 1].playerOneGamesWon());
//				self.playerTwoGamesWon(self.scoreBoard()[x - 1].playerTwoGamesWon());
				self.playerOneScore(0);
				self.playerTwoScore(0);
			}
			
			else {
//				self.playerOneGamesWon(self.scoreBoard()[x - 1].playerOneGamesWon());
//				self.playerTwoGamesWon(self.scoreBoard()[x - 1].playerTwoGamesWon());
				self.playerOneScore(self.scoreBoard()[x - 1].playerOneScore());
				self.playerTwoScore(self.scoreBoard()[x - 1].playerTwoScore());
			}

		}
		else if (self.scoreBoard().length === 1) {
//			self.playerOneGamesWon(0);
//			self.playerTwoGamesWon(0);
			self.playerOneScore(0);
			self.playerTwoScore(0);
			
			self.scoreBoard.pop();
			
		}
	};
	
	self.playerOneGamesWon = ko.computed(function() {
		var l = self.scoreBoard().length;
		if (l === 0) return 0;
		else return (self.scoreBoard()[l - 1].playerOneGamesWon());
	});
	
	self.playerTwoGamesWon = ko.computed(function()  {
		var l = self.scoreBoard().length;
		if (l === 0) return 0;
		else return (self.scoreBoard()[l - 1].playerTwoGamesWon());
	});
	
	self.matchSet = ko.computed(function() {
		var p1games = self.playerOneGamesWon();
		var p2games = self.playerTwoGamesWon();
		
		var bestof = parseInt(self.bestOf());
		var toWin;
		
		if (bestof === 3) toWin = 2;
		else toWin = 3;
				

		
		if (p1games === toWin) {
//			$(".slaidi").slider("disable");
			return ("p1");
			
		}
		else if (p2games === toWin)	{
//			$(".slaidi").slider("disable");
			return ("p2");
		}
		else {
//			$(".slaidi").slider();
			return;
		}
	});	
	
	self.resetScore = function() {
		self.scoreBoard.removeAll();
		
//		$("#options").popup( "close", { transition: "flow", reverse: true });
		
	}
	
	self.openCallsPopup = function() {
		$("#calls").popup( "open", { transition: "slidedown", shadow: true, positionTo: "#doomings" });
		
	};
	
	self.openOptionsPopup = function() {
		$("#options").popup( "open", { transition: "flow", shadow: true, positionTo: "#asetukset" });
	};
	
	self.closeCallsPopup = function() {
		$("#calls").popup( "close", { transition: "slidedown", shadow: true, reverse: true });
	}
	
    ko.bindingHandlers.mobileradio = {
		init: function (element, valueAccessor) {
		},
		update: function (element, valueAccessor) {
			var value = valueAccessor();
			var valueUnwrapped = ko.utils.unwrapObservable(value);
			if (valueUnwrapped === $(element).val()) {
				$(element).prop("checked", true).checkboxradio("refresh");
			} else {
				$(element).removeProp("checked").checkboxradio("refresh");
			}
		}
	};
	
	
	ko.bindingHandlers.uislider = {
		init: function (element, valueAccessor, allBindingsAccessor) {
			var options = allBindingsAccessor().sliderOptions || {};
			
			$(element).slider(options);
//			$(element).slider( { value: 0, min: 0, max: 50, step : 1, animate: 'true' });
			
	//		$(element).slider( { animate: 'slow' });

			ko.utils.registerEventHandler(element, "slidechange", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
				$(element).slider("destroy");
			});
			ko.utils.registerEventHandler(element, "slide", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			
			ko.utils.registerEventHandler(element, "slidestop", function (event, ui) {
				var observable = valueAccessor();
				observable(ui.value);
			});
			
		},
		update: function (element, valueAccessor) {
			var value = ko.utils.unwrapObservable(valueAccessor());
			if (isNaN(value)) {
				value = 0;
			}
			
			
			$(element).slider("value", value);
		}
	};
	
	ko.bindingHandlers.fadeVisible = {
		init: function(element, valueAccessor) {
			// Initially set the element to be instantly visible/hidden depending on the value
			var value = valueAccessor();
			$(element).toggle(ko.utils.unwrapObservable(value)); // Use "unwrapObservable" so we can handle values that may or may not be observable
		},
		update: function(element, valueAccessor) {
			// Whenever the value subsequently changes, slowly fade the element in or out
			var value = valueAccessor();
/*			ko.utils.unwrapObservable(value) ? $(element).fadeIn() : $(element).fadeOut(); */
		//	$(element).fadeIn();
		}
	};
 
}


$(document).on('pageinit', function() {
	window.vm = new viewModel();
	ko.virtualElements.allowedBindings.mobileTable = true; // 
	ko.applyBindings(vm, document.getElementById("main"));
	
	$('body').on('touchmove', function (e) {
		e.preventDefault();
	});
	
	$("input").blur(function() {
	    $("#scoreBar").show();
	    $("#slaidiDiv").show();
	});

	$("input").focus(function() {
	    $("#scoreBar").hide();
	    $("#slaidiDiv").hide();
	});
	
	$('#main').on('pageshow', function() {
		if ($.mobile.activePage.find('#scroller').length > 0) {
			if (this.id in vm.myScroll) {
				vm.myScroll[this.id].refresh();
			} else {
				vm.myScroll[this.id] = new iScroll($.mobile.activePage.find('#scroller')[0].id, {
					hScroll        : false,
					vScroll        : true,
					hScrollbar     : false,
					vScrollbar     : true,
					fixedScrollbar : true,
					fadeScrollbar  : false,
					hideScrollbar  : false,
					bounce         : true,
					momentum       : true,
					lockDirection  : true
				});
			}
		}
		
	});
	
	$(window).bind('orientationchange', function () {
		if ($.mobile.activePage[0].id in vm.myScroll) {
			vm.myScroll[$.mobile.activePage[0].id].refresh();
		}
	});

	
	$(document).off('pageinit');
});

