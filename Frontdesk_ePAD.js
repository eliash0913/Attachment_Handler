app.addMenuItem({cName:"Work Order Checkout", cParent: "File", nPos: 1,    
    cExec: "WOFRONT(this)"});


function WOFRONT(doc)
{
for (var i=0; i<800; i++)
{
var tmp = this.getPageNthWordQuads(0,i);
if (tmp == "66.00045776367188,731.4408569335938,96.21112060546875,731.4408569335938,66.00045776367188,717.944091796875,96.21112060546875,717.944091796875")
{
var ECN = this.getPageNthWord(0,i);
}
}
var quest = app.alert("Do you want to sign with your CAC card?", 2, 2, "CAC")
if (quest == 4)
{
var FYtemp=new Date();
var FY=FYtemp.getFullYear();
WONUMBER=this.getPageNthWord(0,6)
var cPath = "../"+FY+"/"+WONUMBER+"_ECN"+ECN+".pdf";
var name = "DC";
var type = "signature";
var page = 0;
var rb = this.addField(name, type, page, [120, 35, 240, 10]);
var click = this.getField("DC");
var currentTime = new Date()
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
var signingTime = day +"/"+month+"/"+year
var f = this.addField("date", "text", 0,[460, 32, 520, 16])
f.value = signingTime;
this.getField("date").readonly = true;
var f = this.getField( "DC" );
try
{
f.signatureSign({bUI: true});
if (f.signatureValidate() ==4)
{
try{
this.saveAs({cPath: cPath, bPromptToOverwrite: true});
}
catch (e)
{
app.execMenuItem("SaveAs")
}
}
else
{
this.removeField("DC");
this.removeField("date");
}
}
catch(e)
{
this.removeField("DC");
this.removeField("date");
}
}
else if (quest == 3)
{
var CNAME = app.response("Enter the Customer Name");
var hsb = this.addField("NAME", "text", 0, [120, 32, 240, 16]);
hsb.value=CNAME;
hsb.readonly=true;
var FYtemp=new Date();
var FY=FYtemp.getFullYear();
WONUMBER=this.getPageNthWord(0,6)
var cPath = "../"+FY+"/"+WONUMBER+"_ECN"+ECN+".pdf";
var name = "DC";
var type = "signature";
var page = 0;
var rb = this.addField(name, type, page, [120, 55, 240, 30]);
var click = this.getField("DC");
var currentTime = new Date()
var month = currentTime.getMonth() + 1
var day = currentTime.getDate()
var year = currentTime.getFullYear()
var signingTime = day +"/"+month+"/"+year
var f = this.addField("date", "text", 0,[460, 32, 520, 16])
f.value = signingTime;
this.getField("date").readonly = true;
var f = this.getField( "DC" );
try
{
f.signatureSign({bUI: true});
if (f.signatureValidate() ==4)
{
try{
this.saveAs({cPath: cPath, bPromptToOverwrite: true});
}
catch (e)
{
app.execMenuItem("SaveAs")
}
}
else
{
this.removeField("DC");
this.removeField("date");
}
}
catch(e)
{
this.removeField("DC");
this.removeField("date");
}
}
}
