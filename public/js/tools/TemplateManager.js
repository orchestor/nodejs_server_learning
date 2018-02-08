var TemplateManager = {
    load : function(templateName){
        var stringToReturn = '';
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange =function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                stringToReturn = this.responseText;
            }else
                stringToReturn = this.response;
        };
        xhr.open("GET", "../template/" + templateName + ".html", false);
        xhr.send();

        if(stringToReturn.length > 0)
        {
            return stringToReturn;
        }else
            {
                return "Template cannot be loaded";
            }
    }
}