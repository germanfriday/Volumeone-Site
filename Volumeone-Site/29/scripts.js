function launchWin() {
		newW = window.open("http://www.adidas.com/us/register/skateboarding/register.asp","lauchWin","toolbar=no,width=610,height=475,directories=no,status=no,scrollbars=no,resize=no,menubar=no,location=no,copyhistory=no");
		if (navigator.userAgent.substring(0,9) >= "Mozilla/4") {
			setTimeout("newW.moveTo((screen.width/2 - 305), (screen.height/2-240))",300);
		}
}

function writeFlashContent() {
	// This function is a work-around to address the changes in
	// ActiveX content in Internet Explorer
	// 
	// For more info, visit: http://www.adobe.com/devnet/activecontent/articles/devletter.html
	//
	
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="100%" height="100%" id="main">');
	document.write('<param name="allowScriptAccess" value="sameDomain" />');
	document.write('<param name="movie" value="main.swf" />');
	document.write('<param name="quality" value="high" />');
	document.write('<param name="scale" value="noscale" />');
	document.write('<param name="bgcolor" value="#151515" />');
	document.write('<param name="salign" value="t" />');	
	document.write('<embed src="main.swf" quality="high" width="100%" height="100%" scale="noscale" bgcolor="#151515" width="100%" height="100%" name="main" salign="t" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write('</object>');
	
}
