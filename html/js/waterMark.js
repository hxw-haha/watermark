function waterMark(username, pageId) {
	// 旋转角度大小
	var rotateAngle = Math.PI / 6;

	var labels = new Array();
	labels.push("工号：" + username);
	labels.push("日期：" + getNowFormatDate());
	labels.push("不可扩散");

	var xwidth = window.screen.availWidth;
	var yheight = window.screen.availHeight;

	var canvas = document.createElement('canvas');
	canvas.color = "#40F3F5F9";
	canvas.width = xwidth;
	canvas.height = yheight;

	var context = canvas.getContext('2d');
	context.color = "#50AEAEAE";
	context.font = "15px Arial";
	// 先平移到画布中心
	context.translate(xwidth / 2, yheight / 2);
	// 在绕画布逆方向旋转30度
	context.rotate(-rotateAngle);
	// 在还原画布的坐标中心
	context.translate(-xwidth / 2, -yheight / 2);

	var textWidth = _getMax(context.measureText(labels[0]).width,
		context.measureText(labels[1]).width,
		context.measureText(labels[2]).width);

	var positionSizeY = 20;
	for (var positionY = 0; positionY <= yheight; positionY += positionSizeY * 5) {
		context.translate(-Math.sin(rotateAngle) * positionY / 2, 0);
		for (var positionX = 0; positionX < xwidth; positionX += textWidth + textWidth / 2) {
			var spacing = 0;
			for (var label = 0; label < labels.length; label++) {
				context.fillText(labels[label], positionX, positionY + spacing);
				spacing = spacing + positionSizeY;
			}
		}
		context.translate(Math.sin(rotateAngle) * positionY / 2, 0);
		context.restore();
	}

	var dataUrl = canvas.toDataURL('image/png');

	var waterMarkPage = document.createElement('div');
	var style = waterMarkPage.style;
	style.position = 'absolute';
	style.overflow = "hidden";
	style.left = 0;
	style.top = 0;
	style.opacity = '0.4';
	style.background = "url(" + dataUrl + ")";
	style.zIndex = 9999999991;
	style.pointerEvents = "none";
	if (pageId == undefined || pageId == null) {
		style.width = '100%';
		style.height = '100%';
		document.body.appendChild(waterMarkPage);
	} else {
		var page = document.getElementById(pageId);
		var pageWidth = page.offsetWidth / xwidth * 100 + "%";
		var pageHeight = page.offsetHeight / yheight * 100 + "%"
		style.width = pageWidth;
		style.height = pageHeight;
		page.appendChild(waterMarkPage);
	}

}

function _getMax(num1, num2, num3) { 
	var max = Math.max(num1, num2); 
	return Math.max(max, num3);
}

/**
 * 获取当前时间，格式YYYY-MM-DD
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}
