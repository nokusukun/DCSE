//META{"name":"discordCSE"}*//

var discordCSE = function () {};

discordCSE.prototype.getName = function () { return "DiscordCSE"};
discordCSE.prototype.getDescription = function () {return "Discord Client Side Encryption for Private Messages"};
discordCSE.prototype.getVersion = function () {return "0.1.3"};
discordCSE.prototype.getAuthor = function () {return "Noku#1934"};
discordCSE.prototype.headerFormat =  "dCSE";
discordCSE.prototype.cseFormat = "cse1";
discordCSE.prototype.defpassphrase = "default"; //デフォルト値を使用しないでください
discordCSE.prototype.passlist = {};


discordCSE.prototype.stop = function () {
	$("#dcse-passphrase").remove();
	$(document).off("keyup.cse");
};

discordCSE.prototype.loadPassphrase = function () {
	this.passlist = localStorage.discordCSE ? JSON.parse(localStorage.discordCSE) : {};
};

discordCSE.prototype.savePassphrase = function() {
	localStorage.discordCSE = JSON.stringify(this.passlist);
};

discordCSE.prototype.chanID = function() {
	return window.location.pathname.split("/")[window.location.pathname.split("/").length - 1];
};

discordCSE.prototype.decrypt = function(msg, key) {
	dec = CryptoJS.AES.decrypt(msg, key);
	console.log(dec)
	try{
		return dec.toString(CryptoJS.enc.Utf8);
	}catch(err){
		return "";
	}
	
};

discordCSE.prototype.encrypt = function(msg, key) {
	return CryptoJS.AES.encrypt(msg, key);
};


discordCSE.prototype.process = function (force) {
	t = this;
	passphrase = this.passlist[t.chanID()] ? this.passlist[this.chanID()] : this.defpassphrase;
	$(".markup").each(function () {
		message = $(this);
		if(message.data("decrypted") != undefined && force == undefined) return;
		datax = message.text().replace(" ", "").split("!@!");
		if(datax[0] == t.headerFormat){
			if(datax[1] == t.cseFormat){
				console.log("Processing... " + datax[2])
				//if(passphrase == undefined) passphrase = t.defpassphrase;
				console.log(passphrase)
				dmsg = t.decrypt(datax[2].split("(edited)")[0], passphrase);
				if(dmsg != "" && dmsg != undefined){
					message.text("[E]" + dmsg)
					this.style.color = "#55FF55";
				}else{
					message.text("[?!]")
					this.style.color = "FF5555";
				}

			}else{
				message.text("Incompatible dCSE format.");
			}
		}else{
		}

		message.data("decrypted", true);

	});
};

discordCSE.prototype.onSwitch = function() {
	if($(".dcse-passphrase").length == 0){
		$(".noTopic-2b04lB, .topic-2QX7LI").append("<input class='dcse-passphrase' id='dcse-passphrase' style='float: right;'>");
		//$("#dcse-passphrase").css("border-radius", "5px");
		$("#dcse-passphrase").attr("placeholder", "DCSE Passphrase");
		$("#dcse-passphrase").blur(function () {
			t.saveP();
		});
	}
	if(this.passlist[this.chanID()] != undefined){
		$("#dcse-passphrase").css("background", "#343434");
	}else{
		$("#dcse-passphrase").css("background", "white");
	}

	setTimeout(function() {
		discordCSE.prototype.process();
	}, 50);
};

discordCSE.prototype.onMessage = function() {
	setTimeout(function() {
		this.process();
	}, 50);
};

discordCSE.prototype.saveP = function(){
	console.log("saving... " + $("#dcse-passphrase")[0].value);
	channelid = t.chanID();
	t.passlist[channelid] = $("#dcse-passphrase")[0].value; //this will break, there's somehow a bug in jquery that prevents me from using ("#dcse-passphrase").
	console.log("saving... A " + channelid);
	t.savePassphrase();
	console.log("saving... B");
	t.process("force");
	console.log("saving... C");
	$("#dcse-passphrase")[0].value = "";
	$("#dcse-passphrase").css("background", "#343434")
	$("#dcse-passphrase").attr("placeholder", "Passphrase is set")
	}

discordCSE.prototype.load = function() {
	console.log("Load Plugin");
	t = this;
	$("head").append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>');			
	$(".noTopic-2b04lB, .topic-2QX7LI").append("<input class='dcse-passphrase' id='dcse-passphrase' style='float: right;'>");
	passArea = $("#dcse-passphrase");
	//passArea.css("border-radius", "0px");
	passArea.attr("placeholder", "DCSE Passphrase");
	passArea.blur(function () {
		t.saveP();
	});

};

discordCSE.prototype.start = function ()
{
	console.log("Start Plugin");
	if($(".dcse-passphrase").length == 0){
		$(".noTopic-2b04lB, .topic-2QX7LI").append("<input class='dcse-passphrase' id='dcse-passphrase' style='float: right;'>");
	}
	if(this.passlist[this.chanID()] != undefined){
		$("#dcse-passphrase").attr("placeholder", "Passphrase is set")
		$("#dcse-passphrase").css("background", "#343434")
	}
	setTimeout(function() {
		discordCSE.prototype.loadPassphrase();
		discordCSE.prototype.process();
	}, 1000);
	var t = this;
	$(document).on("keyup.cse", function(e) {
			if(e.keyCode == 69){ //we only need to execute the rest of it on the 'e' keypress.
			item = $(".textArea-2Spzkt");
			txt = item[0];
			console.log(txt.value);
			message = txt.value.split("..");
			if(message.length > 1){
				if(message[ message.length - 1] == "cse"){
					message.pop();
					cleaned = message.join("..");
					passphrase = t.passlist[t.chanID()] ? t.passlist[t.chanID()] : t.defpassphrase;
					txt.value = t.headerFormat + "!@!" + t.cseFormat + "!@!" + t.encrypt(cleaned, passphrase);
					txt.innerHTML = t.headerFormat + "!@!" + t.cseFormat + "!@!" + t.encrypt(cleaned, passphrase);
					setTimeout(function () { t.process()}, 2000);
				}
			}
		}

	});


		/*
	new MutationObserver
		(
		function(m)
			{
			if(m[0].addedNodes.length)
				{
				audio.play();
				}
			}
			).observe(document.getElementsByClassName('dms')[0],{childList:1});*/
		};
