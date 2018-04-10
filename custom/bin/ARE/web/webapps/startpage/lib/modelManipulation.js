function setPropertyValueInXMLModel(componentKey, propertyKey, propertyValue, xmlDoc) {
	var commandPanel=xmlDoc.getElementsByTagName('component');

	var found=false;
	for(var i=0;i<commandPanel.length; i++) {
		var currentValue=commandPanel.item(i);
		if(currentValue.attributes.getNamedItem('id').textContent == componentKey) {
			
			var commandPanelProperties=currentValue.getElementsByTagName('property');
			
			for(var j=0;j<commandPanelProperties.length; j++) {
				var curProperty=commandPanelProperties.item(j);
				if(curProperty.getAttribute("name")==propertyKey) {
					curProperty.setAttribute("value",propertyValue);
					console.log("Property ["+componentKey+"."+propertyKey+"="+propertyValue+"] set");											
					found=true;
				}
			}					
		} 
	}
	if(!found) {
		console.log("Property ["+componentKey+"."+propertyKey+"="+propertyValue+"] not set");				
	}
}

function getPropertyValueFromXMLModel(componentKey, propertyKey, xmlDoc) {
	var commandPanel=xmlDoc.getElementsByTagName('component');

	for(var i=0;i<commandPanel.length; i++) {
		var currentValue=commandPanel.item(i);
		if(currentValue.attributes.getNamedItem('id').textContent == componentKey) {
			
			var commandPanelProperties=currentValue.getElementsByTagName('property');
			
			for(var j=0;j<commandPanelProperties.length; j++) {
				var curProperty=commandPanelProperties.item(j);
				if(curProperty.getAttribute("name")==propertyKey) {
					var propVal=curProperty.getAttribute("value");
					console.log("Property ["+componentKey+"."+propertyKey+"="+propVal+"]");
					return propVal;
				}
			}					
		} 
	}
	console.log("Property ["+componentKey+"."+propertyKey+"] not found");
	return undefined;
}

function updateModelPropertiesFromWidgets(modelInXML) {
	//parse template modelInXML to document object
	var xmlDoc = $.parseXML( modelInXML );
	
	//Update property values with values of input widgets.
	for(var i=0;i<widgetIdToPropertyKeyMap.length;i++) {
		setPropertyValueInXMLModel(widgetIdToPropertyKeyMap[i]["componentKey"],widgetIdToPropertyKeyMap[i]["propertyKey"],$(widgetIdToPropertyKeyMap[i]["widgetId"]).val(),xmlDoc);				
	}
	
	//Convert back XML document to XML string.
	modelInXML=xmlToString(xmlDoc);
	return modelInXML;
}

function updateWidgetsFromModelProperties(modelInXML) {
	//parse template modelInXML to document object
	var xmlDoc = $.parseXML( modelInXML );
	
	//Update property values with values of input widgets.
	for(var i=0;i<widgetIdToPropertyKeyMap.length;i++) {
		var propVal=getPropertyValueFromXMLModel(widgetIdToPropertyKeyMap[i]["componentKey"],widgetIdToPropertyKeyMap[i]["propertyKey"],xmlDoc);
		if(propVal!=undefined) {
			console.log("Updating widget["+widgetIdToPropertyKeyMap[i]["widgetId"]+"]: "+propVal);
			$(widgetIdToPropertyKeyMap[i]["widgetId"]).val(propVal);					
		}
	}			
}		

function xmlToString(xmlData) { 
    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}